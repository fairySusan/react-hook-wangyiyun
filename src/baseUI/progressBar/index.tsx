import React, {useEffect, useRef, useState } from 'react';
import styled from'styled-components';
import style from 'src/assets/global-style';
import { prefixStyle } from 'src/api/util';

const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, .3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${style["theme-color"]};
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style["border-color"]};
        border-radius: 50%;
        background: ${style["theme-color"]};
      }
    }
  }
`

interface Props {
    percent: number;
    percentChange: (percent: number) => void
}

function ProgressBar (props: Props) {
    const progressBar: any = useRef();
    const progress: any = useRef();
    const progressBtn: any = useRef();
    const [touch, setTouch] = useState<{initiated: boolean;startX: number;left:number}>({initiated: false,startX:0,left:0});

    const progressBtnWidth = 16;
    const {percentChange, percent} = props;

    const transform = prefixStyle('transform');

    //监听percent
    useEffect(() => {
      if(percent >= 0 && percent <= 1 && !touch.initiated) {
        const barWidth = progressBar.current.clientWidth - progressBtnWidth;
        const offsetWidth = percent * barWidth;
        progress.current.style.width = `${offsetWidth}px`;
        progressBtn.current.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
      }
    }, [percent]);


    const _changePercent = () => {
        const barWidth = progressBar.current.clientWidth - progressBtnWidth;
        const curPercent = progress.current.clientWidth/barWidth;// 新的进度计算
        percentChange(curPercent);// 把新的进度传给回调函数并执行
    }

    // 处理进度条的偏移
    const _offset = (offsetWidth: number) => {
        progress.current.style.width = `${offsetWidth}px`;
        progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    }

    const progressTouchStart = (e: any) => {
        const startTouch: any = {};
        startTouch.initiated = true;//initial 为 true 表示滑动动作开始了
        startTouch.startX = e.touches[0].pageX;// 滑动开始时横向坐标
        startTouch.left = progress.current.clientWidth;// 当前 progress 长度
        setTouch(startTouch)
    }

    const progressTouchMove = (e: any) => {
        if (!touch.initiated) return;
        // 滑动距离   
        const deltaX = e.touches[0].pageX - touch.startX;
        const barWidth = progressBar.current.clientWidth - progressBtnWidth; 
        const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
        _offset(offsetWidth);
    }

    const progressTouchEnd = () => {
        const endTouch = JSON.parse(JSON.stringify(touch));
        endTouch.initiated = false;
        setTouch(endTouch);
        _changePercent();
    }

    const progressClick = (e: any) => {
        const rect = progressBar.current.getBoundingClientRect ();
        const offsetWidth = e.pageX - rect.left;
        _offset (offsetWidth);
        _changePercent();
    };

    return (
      <ProgressBarWrapper>
        <div className="bar-inner" ref={progressBar}>
          <div className="progress" ref={progress} onClick={progressClick}></div>
          <div
            className="progress-btn-wrapper"
            ref={progressBtn}
            onTouchStart={progressTouchStart}
            onTouchMove={progressTouchMove}
            onTouchEnd={progressTouchEnd}
          >
            <div className="progress-btn"></div>
          </div>
        </div>
      </ProgressBarWrapper>
    )
  }

export default ProgressBar