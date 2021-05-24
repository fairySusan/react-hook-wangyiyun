import React, {useState, useRef, useEffect, useCallback } from 'react'
import {Container, TopDesc, Menu, SongItem, SongList} from './style'
import { CSSTransition } from 'react-transition-group';
import { RouteConfig } from 'react-router-config'
import  Header  from 'src/baseUI/header/index';
import Scroll from 'src/baseUI/scroll/index';
import { getName, getCount } from 'src/api/util';
import SongsList from 'src/application/SongsList'
import style from 'src/assets/global-style';
import Loading from 'src/baseUI/loading'
import { connector, PropsFromRedux } from './type'
import MusicNote from "src/baseUI/music-note";


type MixinProps = PropsFromRedux & RouteConfig

interface Props extends MixinProps{}

export const HEADER_HEIGHT = 45;


function Album (props: Props) {
  const [showStatus, setShowStatus] = useState (true);
  const [title, setTitle] = useState ("歌单");
  const [isMarquee, setIsMarquee] = useState (false);// 是否跑马灯
  const playlist = props.detail?.playlist


  const headerEl = useRef();

  const musicNoteRef: any = useRef ();

   const musicAnimation = (x: number, y: number) => {
      musicNoteRef.current.startAnimation ({ x, y });
   };

   useEffect(() => {
      props.getAlbumDetail(props.match.params.id)
   },[])

   const handleBack = useCallback(() => {
      setShowStatus (false);
   }, []);

   const handleScroll = useCallback((pos: any) => {
      let minScrollY = -HEADER_HEIGHT;
      let percent = Math.abs(pos.y/minScrollY);
      let headerDom: any = headerEl.current;
      // 滑过顶部的高度开始变化
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style["theme-color"];
        // 控制透明度的变化
        headerDom.style.opacity = Math.min(1, (percent-1)/2);
        setTitle (playlist.name);
        setIsMarquee (true);
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = 1;
        setTitle("歌单");
        setIsMarquee(false);
      }
    }, [playlist]);

    const renderTopDesc = () => {
      return (
        <TopDesc background={playlist.coverImgUrl}>
          <div className="background">
            <div className="filter"></div>
          </div>
          <div className="img_wrapper">
            <div className="decorate"></div>
            <img src={playlist.coverImgUrl} alt="" />
            <div className="play_count">
              <i className="iconfont play">&#xe885;</i>
              <span className="count">{getCount (playlist.subscribedCount)}</span>
            </div>
          </div>
          <div className="desc_wrapper">
            <div className="title">{playlist.name}</div>
            <div className="person">
              <div className="avatar">
                <img src={playlist.creator.avatarUrl} alt="" />
              </div>
              <div className="name">{playlist.creator.nickname}</div>
            </div>
          </div>
        </TopDesc>
      )
    }

    const renderSongList = () => {
      return (
        <SongsList
         songs={playlist.tracks}
         collectCount={playlist.subscribedCount}
         showCollect={true}
         showBackground={true}
         musicAnimation={musicAnimation}
        />
      )
    }

    const renderMenu = () => {
      return (
        <Menu>
          <div>
            <i className="iconfont">&#xe6ad;</i>
            评论
          </div>
          <div>
            <i className="iconfont">&#xe86f;</i>
            点赞
          </div>
          <div>
            <i className="iconfont">&#xe62d;</i>
            收藏
          </div>
          <div>
            <i className="iconfont">&#xe606;</i>
            更多
          </div>
        </Menu>
      )
    };

   return (
   <CSSTransition
      in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true} 
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
         <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
         {
          playlist ?
            <Scroll
               bounceTop={false}
               onScroll={handleScroll}
            >
               <div>
                  { renderTopDesc() }
                  { renderMenu() }
                  { renderSongList() }
               </div> 
            </Scroll>
            :
            null
         }
         {
           props.enterLoading ? <Loading></Loading> : false
         }
          <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
   </CSSTransition>
   )
}

export default  connector(React.memo(Album))