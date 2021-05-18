import React, { useState, useCallback, useRef, useEffect} from 'react'
import { CSSTransition } from "react-transition-group";
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from './style'
import { RouteConfig } from 'react-router-config'
import Scroll from 'src/baseUI/scroll/index';
import Header from 'src/baseUI/header/index';
import SongsList from 'src/application/SongsList'

type MixinProps = RouteConfig

interface Props extends MixinProps {}

function Singer (props: Props) {
    const [isMarquee, setIsMarquee] = useState (false);// 是否跑马灯
    const [showStatus, setShowStatus] = useState (true);

    const collectButton: any = useRef ();
    const imageWrapper: any = useRef ();
    const songScrollWrapper: any = useRef ();
    const songScroll: any = useRef ();
    const header = useRef ();
    const layer: any = useRef ()

    // 图片初始高度
    const initialHeight = useRef (0); 

    // 往上偏移的尺寸，露出圆角
    const OFFSET = 5;

    useEffect(() => {
      let h = imageWrapper.current.offsetHeight;
      songScrollWrapper.current.style.top = `${h - OFFSET} px`;
      initialHeight.current = h;
      // 把遮罩先放在下面，以裹住歌曲列表
      layer.current.style.top = `${h - OFFSET} px`;
      songScroll.current.refresh ();
      //eslint-disable-next-line
    }, []);
    
    
    const handleBack = useCallback(() => {
      setShowStatus (false);
    }, []);

    const setShowStatusFalse = useCallback (() => {
      setShowStatus (false);
    }, [])
    const artist = {
        picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
        name: "薛之谦",
        hotSongs: [
          {
            name: "我好像在哪见过你",
            ar: [{name: "薛之谦"}],
            al: {
              name: "薛之谦专辑"
            }
          },
          {
            name: "我好像在哪见过你",
            ar: [{name: "薛之谦"}],
            al: {
              name: "薛之谦专辑"
            }
          },
          // 省略 20 条
        ]
      }
    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => props.history.goBack ()}
            >
            <Container play={0}>
              <Header title={"头部"} handleClick={handleBack} isMarquee={isMarquee}></Header>
              <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
                <div className="filter"></div>
              </ImgWrapper>
              <CollectButton ref={collectButton}>
                <i className="iconfont">&#xe62d;</i>
                <span className="text"> 收藏 </span>
              </CollectButton>
              <BgLayer ref={layer}></BgLayer>
              <SongListWrapper ref={songScrollWrapper}>
                <Scroll ref={songScroll}>
                  <SongsList
                    songs={artist.hotSongs}
                    showCollect={false}
                  ></SongsList>
                </Scroll>
              </SongListWrapper>
            </Container>
        </CSSTransition>
    )
}

export default Singer