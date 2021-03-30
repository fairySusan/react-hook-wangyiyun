import React from 'react'
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router'
import LazyLoad from 'react-lazyload'
import { getCount } from 'src/api/util'
import {RecommendItemI} from 'src/api/type'
import { 
  ListWrapper,
  ListItem,
  List
} from './style';

interface Props extends RouteComponentProps{
  recommendList: RecommendItemI[]
}

function RecommendList (props: Props) {

  const enterDetail = (id: number) => {
    props.history.push(`/recommend/${id}`)
  }

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
      {
          props.recommendList.map(item => {
            return (
              <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music"/>}>
                    <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{getCount(item.playCount)}</span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default withRouter(React.memo(RecommendList))