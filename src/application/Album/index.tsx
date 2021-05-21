import React, {useState, useRef, useEffect, useCallback } from 'react'
import {Container, TopDesc, Menu, SongItem, SongList} from './style'
import { CSSTransition } from 'react-transition-group';
import { RouteConfig } from 'react-router-config'
import  Header  from 'src/baseUI/header/index';
import Scroll from 'src/baseUI/scroll/index';
import { getName, getCount } from 'src/api/util';
import style from 'src/assets/global-style';
import Loading from 'src/baseUI/loading'
import { connector, PropsFromRedux } from './type'


type MixinProps = PropsFromRedux & RouteConfig

interface Props extends MixinProps{}

export const HEADER_HEIGHT = 45;

function Album (props: Props) {
  const [showStatus, setShowStatus] = useState (true);
  const [title, setTitle] = useState ("歌单");
  const [isMarquee, setIsMarquee] = useState (false);// 是否跑马灯
  const playlist = props.detail?.playlist

  const {clickSong} = props

  const headerEl = useRef ();

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
         {
           props.enterLoading ? <Loading></Loading> : false
         }
         <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
         {
          playlist ?
            <Scroll
               bounceTop={false}
               onScroll={handleScroll}
            >
               <div>
                  <TopDesc background={playlist.coverImgUrl}>
                     <div className="background">
                        <div className="filter"></div>
                     </div>
                     <div className="img_wrapper">
                     <div className="decorate"></div>
                     <img src={playlist.coverImgUrl} alt=""/>
                     <div className="play_count">
                        <i className="iconfont play">&#xe885;</i>
                        <span className="count">{Math.floor (playlist.subscribedCount/1000)/10} 万 </span>
                     </div>
                     </div>
                     <div className="desc_wrapper">
                     <div className="title">{playlist.name}</div>
                     <div className="person">
                        <div className="avatar">
                           <img src={playlist.creator.avatarUrl} alt=""/>
                        </div>
                        <div className="name">{playlist.creator.nickname}</div>
                     </div>
                     </div>
                  </TopDesc>
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
                  <SongList>
                     <div className="first_line">
                        <div className="play_all">
                           <i className="iconfont">&#xe6e3;</i>
                           <span > 播放全部 <span className="sum">(共 {playlist.tracks.length} 首)</span></span>
                        </div>
                        <div className="add_list">
                           <i className="iconfont">&#xe62d;</i>
                           <span > 收藏 ({getCount(playlist.subscribedCount)})</span>
                        </div>
                     </div>
                     <SongItem>
                        {
                           playlist.tracks.map((item: any, index: number) => {
                           return (
                              <li key={index} onClick={() => clickSong(item)}>
                                 <span className="index">{index + 1}</span>
                                 <div className="info">
                                 <span>{item.name}</span>
                                 <span>
                                 { getName(item.ar) } - { item.al.name }
                                 </span>
                                 </div>
                              </li>
                           )
                           })
                        }
                     </SongItem>
                  </SongList> 
               </div> 
            </Scroll>
            :
            null
         }
      </Container>
   </CSSTransition>
   )
}

export default  connector(React.memo(Album))