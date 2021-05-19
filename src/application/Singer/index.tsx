import React, { useState, useCallback, useRef, useEffect} from 'react'
import { CSSTransition } from "react-transition-group";
import { Container, ImgWrapper, CollectButton, SongListWrapper, BgLayer } from './style'
import { RouteConfig } from 'react-router-config'
import Scroll from 'src/baseUI/scroll/index';
import Header from 'src/baseUI/header/index';
import SongsList from 'src/application/SongsList'
import { HEADER_HEIGHT } from "src/api/config";
import { connector, PropsFromRedux } from './type'
import Loading from 'src/baseUI/loading'



type MixinProps = RouteConfig & PropsFromRedux

interface Props extends MixinProps {}

function Singer (props: Props) {
    const [showStatus, setShowStatus] = useState (true);

    const detail = props.detail

    const collectButton: any = useRef ();
    const imageWrapper: any = useRef ();
    const songScrollWrapper: any = useRef ();
    const songScroll: any = useRef ();
    const header: any = useRef ();
    const layer: any = useRef ()

    // 图片初始高度
    const initialHeight = useRef(0); 

    // 往上偏移的尺寸，露出圆角
    const OFFSET = 5;

    useEffect(() => {
      props.getSingerDetail(props.match.params.id)
      let h = imageWrapper.current.offsetHeight;
      songScrollWrapper.current.style.top = `${h - OFFSET}px`;
      initialHeight.current = h;
      // 把遮罩先放在下面，以裹住歌曲列表
      layer.current.style.top = `${h - OFFSET}px`;
      songScroll.current.refresh();
      //eslint-disable-next-line
    }, []);
    
    
    const handleBack = useCallback(() => {
      setShowStatus (false);
    }, []);

    const setShowStatusFalse = useCallback (() => {
      setShowStatus (false);
    }, [])

    const handleScroll = (pos: any) => {
      let height = initialHeight.current;
      const newY = pos.y;
      const imageDOM = imageWrapper.current;
      const buttonDOM = collectButton.current;
      const headerDOM = header.current;
      const layerDOM = layer.current;
      const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;
  
      // 指的是滑动距离占图片高度的百分比
      const percent = Math.abs(newY / height);

      if (newY > 0) {
        // 向下拉， 图片放大
        imageDOM.style["transform"] = `scale(${1 + percent})`;
        buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
        layerDOM.style.top = `${height - OFFSET + newY}px`;
      } else if (newY >= minScrollY) {
        // 往上滑动，但是遮罩还没超过 Header 部分
        layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
        // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
        layerDOM.style.zIndex = 1;
        imageDOM.style.height = '75vw';
        imageDOM.style.zIndex = -1;
        // 按钮跟着移动且渐渐变透明
        buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
        buttonDOM.style["opacity"] = `${1 - percent * 2}`;
      } else if (newY < minScrollY) {
        // 往上滑动，但是超过 Header 部分
        layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
        layerDOM.style.zIndex = 1;
        // 防止溢出的歌单内容遮住 Header
        headerDOM.style.zIndex = 100;
        // 此时图片高度与 Header 一致
        imageDOM.style.height = `${HEADER_HEIGHT}px`;
        imageDOM.style.zIndex = 99;
      }
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
              {
                props.enterLoading ? <Loading></Loading> : false
              }
              <Header ref={header} title={detail?.artist.name} handleClick={handleBack}></Header>
              <ImgWrapper ref={imageWrapper} bgUrl={detail?.artist.picUrl}>
                <div className="filter"></div>
              </ImgWrapper>
              <CollectButton ref={collectButton}>
                <i className="iconfont">&#xe62d;</i>
                <span className="text"> 收藏 </span>
              </CollectButton>
              <BgLayer ref={layer}></BgLayer>
              <SongListWrapper ref={songScrollWrapper}>
                <Scroll onScroll={handleScroll} ref={songScroll}>
                  <SongsList
                    songs={detail ? detail.hotSongs : []}
                    showCollect={false}
                  ></SongsList>
                </Scroll>
              </SongListWrapper>
            </Container>
        </CSSTransition>
    )
}

export default connector(React.memo(Singer))