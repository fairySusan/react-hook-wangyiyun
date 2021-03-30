import React, {useEffect} from 'react'
import Slider from 'src/components/Slider'
import RecommendList from 'src/components/RecommendList'
import Scroll from 'src/baseUI/scroll'
import { forceCheck } from 'react-lazyload';
import {Content} from './style'
import {PropsFromRedux, connector} from './type'

interface Props extends PropsFromRedux {

}

function Recommend (props:Props) {
  const {bannerList, recommendList} = props
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
    </Content>
  )
}

export default connector(React.memo(Recommend))