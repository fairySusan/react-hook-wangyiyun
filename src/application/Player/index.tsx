import React, {useState, useRef, useEffect} from 'react'
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer'
import {connector, PropsFromRedux} from './type'
import { getSongUrl } from 'src/api/util'

interface Props extends PropsFromRedux {

}

function Player(props: Props) {
    const {
        fullScreen,
        playing,
        setFullScreen,
        setPlaying,
        currentSong,
        currentIndex,
        setCurrentIndex,
        setCurrentSong,
        playList
    } = props

    const playListJS = playList.toJS()

    //目前播放时间
    const [currentTime, setCurrentTime] = useState<number>(0);
    //歌曲总时长
    const [duration, setDuration] = useState(0);
    //歌曲播放进度
    let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

    const audioRef: any = useRef();

    useEffect(() => {
        if(!currentSong || playList.size === 0) return;
        setCurrentIndex(0);
        let current = playListJS[0];
        audioRef.current.src = getSongUrl(current.id);

        setTimeout(() => {
            audioRef.current.play();
        });

        setPlaying(true)
        setCurrentTime(0);//从头开始播放
        setDuration((current.dt / 1000) | 0);//时长
    }, [currentSong]);

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
                    />
                :
                    false
            }
            <audio ref={audioRef}  onTimeUpdate={updateTime}></audio>
        </div>
    )
}

export default connector(Player)