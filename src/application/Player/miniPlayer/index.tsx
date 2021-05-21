import React, {useRef} from 'react';
import {getName} from 'src/api/util';
import { MiniPlayerContainer } from './style';
import { CSSTransition } from 'react-transition-group';
import ProgressCircle from 'src/baseUI/progress-circle'


interface Props {
    song: any,
    playing: boolean,
    fullScreen: boolean,
    setFullScreen: (data: boolean) => void,
    setPlaying: (data: boolean) => void,
    percent: number
}

function MiniPlayer (props: Props) {
    const {
        song,
        fullScreen,
        playing,
        percent,
        setFullScreen,
        setPlaying
    } = props;
    const miniPlayerRef: any = useRef();


    const clickPlaying = (e: any, isPlay: boolean) => {
        setPlaying(isPlay)
    }

    return (
        <CSSTransition 
            in={!fullScreen} 
            timeout={400} 
            classNames="mini" 
            onEnter={() => {
             miniPlayerRef.current.style.display = "flex";
            }}
            onExited={() => {
             miniPlayerRef.current.style.display = "none";
            }}
        >
            <MiniPlayerContainer ref={miniPlayerRef} onClick={() => setFullScreen(true)}>
                <div className="icon">
                    <div className="imgWrapper">
                     <img className={`play ${playing ? "": "pause"}`} src={song.al.picUrl} width="40" height="40" alt="img"/>
                    </div>
                </div>
                <div className="text">
                    <h2 className="name">{song.name}</h2>
                    <p className="desc">{getName(song.ar)}</p>
                </div>
                <div className="control">
                    <ProgressCircle radius={32} percent={percent}>
                        { playing ? 
                            <i className="icon-mini iconfont icon-pause" onClick={e => clickPlaying(e, false)}>&#xe650;</i>
                            :
                            <i className="icon-mini iconfont icon-play" onClick={e => clickPlaying(e, true)}>&#xe61e;</i> 
                        }
                    </ProgressCircle>
                </div>
                <div className="control">
                    <i className="iconfont">&#xe640;</i>
                </div>
            </MiniPlayerContainer>
        </CSSTransition>
    )
  }
  
  export default React.memo(MiniPlayer);