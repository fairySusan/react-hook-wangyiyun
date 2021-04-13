import React, { useState, useRef, useEffect, memo, RefObject } from 'react';
import styled from'styled-components';
import Scroll from '../scroll/index'
import {List, ListItem} from './style'

interface Props {
  list: any[], // 为接受的列表数据
  oldVal: string, // 为当前的 item 值
  title: string, // 为列表左边的标题
  handleClick: (key: any) => void // 为点击不同的 item 执行的方法
}
function Horizen (props: Props) {

  const { list, oldVal, title } = props;
  const { handleClick } = props;

  const Category: RefObject<HTMLDivElement> | null = useRef (null);

  // 加入初始化内容宽度的逻辑
  useEffect (() => {
    let categoryDOM = Category.current;
    let tagElems = (categoryDOM as HTMLDivElement).querySelectorAll("span");
    let totalWidth = 0;
    Array.from (tagElems).forEach (ele => {
      totalWidth += ele.offsetWidth;
    });
    (categoryDOM as HTMLDivElement).style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction="horizental">
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {
            list.map((item: any) => (
              <ListItem
                key={item.key}
                className={`${oldVal === item.key ? 'selected': ''}`} 
                onClick={() => handleClick (item.key)}
              >
                {item.name}
              </ListItem>
            ))
          }
        </List>
      </div>
    </Scroll>
  )
}

export default React.memo(Horizen)