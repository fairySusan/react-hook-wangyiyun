import React, {useEffect} from 'react'
import Slider from 'src/components/Slider'
import RecommendList from 'src/components/RecommendList'
import Scroll from 'src/baseUI/scroll'
import Loading from 'src/baseUI/loading'
import { forceCheck } from 'react-lazyload';
import {Content} from './style'
import { renderRoutes, RouteConfig } from 'react-router-config';
import {PropsFromRedux, connector} from './type'

type parentProp = PropsFromRedux & RouteConfig

interface Props extends parentProp {

}

function Recommend (props:Props) {
  const {bannerList, recommendList, enterLoading} = props
  const {getBanner, getRecommend} = props

  useEffect(() => {
    if(!bannerList.size){
      getBanner();
    }
    if(!recommendList.size){
      getRecommend();
    }
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() :[];

  return (
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {
        enterLoading ? <Loading></Loading> : false
      }
      { renderRoutes (props.route.routes) }
    </Content>
  )
}

export default connector(React.memo(Recommend))