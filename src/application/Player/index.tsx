import React, {useState, useRef, useEffect} from 'react'
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer'
import {connector, PropsFromRedux} from './type'
import { getSongUrl, shuffle, findIndex } from 'src/api/util'
import Toast from "src/baseUI/Toast";
import { playMode } from 'src/api/config';

interface Props extends PropsFromRedux {

}

function Player(props: Props) {
    const {
        fullScreen,
        playing,
        mode,
        currentSong: immutableCurrentSong,
        currentIndex,
        sequencePlayList: immutableSequencePlayList,
        playList: immutablePlayList,
        setFullScreen,
        setPlaying,
        setMode,
        setPlayList,
        setCurrentIndex,
        setCurrentSong,
    } = props

    const playList = immutablePlayList.toJS();
    const sequencePlayList = immutableSequencePlayList.toJS();
    const currentSong = immutableCurrentSong ? immutableCurrentSong.toJS() : null;

    //目前播放时间
    const [currentTime, setCurrentTime] = useState<number>(0);
    //歌曲总时长
    const [duration, setDuration] = useState(0);
    //歌曲播放进度
    let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

    const audioRef: any = useRef();

    //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
    const [preSong, setPreSong] = useState<any>({});


    const [modeText, setModeText] = useState("");

    const toastRef: any = useRef();

    useEffect(() => {
        setCurrentIndex(0);
    }, [])

    useEffect(() => {
        if (
            !playList.length ||
            currentIndex === -1 ||
            !playList[currentIndex] ||
            playList[currentIndex].id === preSong.id 
          ) return;
        setCurrentIndex(0);
        let currentSong = playList[currentIndex];
        setPreSong(currentSong);
        setCurrentSong(currentSong)
        audioRef.current.src = getSongUrl(currentSong.id);

        setTimeout(() => {
            audioRef.current.play();
        });

        setPlaying(true)
        setCurrentTime(0);//从头开始播放
        setDuration((currentSong.dt / 1000) | 0);//时长
    }, [playList,currentIndex]);

    // 歌曲的暂停与播放
    useEffect(() => {
        playing ? audioRef.current.play() : audioRef.current.pause();
    }, [playing]);

    const updateTime = (e: any) => {
        setCurrentTime(e.target.currentTime);
    };

    const onProgressChange = (curPercent: number) => {
        const newTime = curPercent * duration;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
        if (!playing) {
          setPlaying(true);
        }
    };


    //一首歌循环
    const handleLoop = () => {
        audioRef.current.currentTime = 0;
        setPlaying(true);
        audioRef.current.play();
    };
    
    const handlePrev = () => {
        //播放列表只有一首歌时单曲循环
        if (playList.length === 1) {
            handleLoop();
            return;
        }
        let index = currentIndex - 1;
        if (index < 0) index = playList.length - 1;
        if (!playing) setPlaying(true);
        setCurrentIndex(index);
    };
    
    const handleNext = () => {
        //播放列表只有一首歌时单曲循环
        if (playList.length === 1) {
            handleLoop();
            return;
        }
        let index = currentIndex + 1;
        if (index === playList.length) index = 0;
        if (!playing) setPlaying(true);
        setCurrentIndex(index);
    };


    const changeMode = () => {
        let newMode = (mode + 1) % 3;
        if (newMode === 0) {
          //顺序模式
          setPlayList(sequencePlayList);
          let index = findIndex(currentSong, sequencePlayList);
          setCurrentIndex(index);
          setModeText("顺序循环");
        } else if (newMode === 1) {
          //单曲循环
          setPlayList(sequencePlayList);
          setModeText("单曲循环");
        } else if (newMode === 2) {
          //随机播放
          let newList = shuffle(sequencePlayList);
          let index = findIndex(currentSong, newList);
          setPlayList(newList);
          setCurrentIndex(index);
          setModeText("随机播放");
        }
        setMode(newMode);
        toastRef.current.show();
      };

    const handleEnd = () => {
        if (mode === playMode.loop) {
            handleLoop();
        } else {
            handleNext();
        }
    };

    return (
        <div>
            {
                currentSong ? 
                    <MiniPlayer
                        song={currentSong}
                        playing={playing}
                        fullScreen={fullScreen}
                        setFullScreen={setFullScreen}
                        setPlaying={setPlaying}
                        percent={percent}//进度
                    />
                :
                    false
            }
            {
                currentSong ?
                    <NormalPlayer
                        song={currentSong}
                        playing={playing}
                        fullScreen={fullScreen}
                        setFullScreen={setFullScreen}
                        setPlaying={setPlaying}
                        duration={duration}//总时长
                        currentTime={currentTime}//播放时间
                        percent={percent}//进度
                        onProgressChange={onProgressChange}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        mode={mode}
                        changeMode={changeMode}
                    />
                :
                    false
            }
            <audio ref={audioRef}  onTimeUpdate={updateTime}  onEnded={handleEnd}></audio>
            <Toast text={modeText} ref={toastRef}></Toast>  
        </div>
    )
}

export default connector(Player)