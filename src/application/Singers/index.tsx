import React, {useState, useEffect} from 'react'
import Horizen from 'src/baseUI/horizen-item'
import Scroll from 'src/baseUI/scroll'
import Loading from 'src/baseUI/loading'
import { categoryTypes, alphaTypes } from 'src/api/config'
import { NavContainer, ListContainer, List, ListItem } from "./style";
import { connector, PropsFromRedux } from './type'
import { RouteConfig, renderRoutes } from 'react-router-config'

type MixinProps = RouteConfig & PropsFromRedux

interface Props extends MixinProps {}


function Singers (props: Props) {
  const { singerList, enterLoading, pullUpLoading, pullDownLoading } = props;
  let [category, setCategory] = useState ('');
  let [alpha, setAlpha] = useState ('');
  let pageCount = 1

  useEffect(() => {
    if (!singerList.size) {
      props.getSingerListFull()
    }
  }, []);

  let handleUpdateAlpha = (val: string) => {
    setAlpha (val);
    props.getSingerListFull(category, alpha)
  }

  let handleUpdateCatetory = (val: string) => {
    setCategory (val);
    props.getSingerListFull(category, alpha)
  }

  // 上拉加载更多
  let handlePullUp = () => {
    pageCount++
    props.getSingerListPullUp(pageCount,category, alpha)
  }

  // 下拉刷新
  let handlePullDown = () => {
    props.getSingerListPullDown(category, alpha)
  }

  const enterDetail = (id: number)  => {
    props.history.push (`/singers/${id}`);
  };


  const renderSingerList = () => {
    const singerListJS = singerList ? singerList.toJS() : [];
    return (
      <List>
        {
          singerListJS.map((item: any, index: number) => (
            <ListItem key={item.accountId+""+index} onClick={() => enterDetail (item.id)}>
              <div className="img_wrapper">
                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          ))
        }
      </List>
    )
  }

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={"分类 (默认热门):"}
          handleClick={val => handleUpdateCatetory(val)}
          oldVal={category}
        />
        <Horizen
          list={alphaTypes}
          title={"首字母:"}
          handleClick={val => handleUpdateAlpha (val)} 
          oldVal={alpha}
        />
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUp={ handlePullUp }
          pullDown = { handlePullDown }
          isRefreshing={pullUpLoading}
          isLoadingMore={pullDownLoading}
        >
          { renderSingerList () }
        </Scroll>
        {
          enterLoading ? <Loading></Loading> : false
        }
      </ListContainer>
      { renderRoutes (props.route.routes) }
    </div>
  )
}

export default connector(React.memo(Singers))