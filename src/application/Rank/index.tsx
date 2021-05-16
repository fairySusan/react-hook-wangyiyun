import React, {useEffect} from 'react'
import {connector, PropsFromRedux} from './type'
import {filterIndex} from 'src/api/util'
import Scroll from 'src/baseUI/scroll'
import {Container, List, ListItem, SongList} from './style'
import Loading from 'src/baseUI/loading'
import { RouteConfig, renderRoutes } from 'react-router-config'

type MinxinProps = PropsFromRedux & RouteConfig
interface Props extends MinxinProps{}

function Rank (props: Props) {
  const {rankList, enterLoading} = props
  let globalStartIndex = filterIndex (rankList);
  let officialList = rankList.slice (0, globalStartIndex);
  let globalList = rankList.slice (globalStartIndex);

  useEffect(() => {
    props.getRankList()
  }, []);

  const enterDetail = (detail: any) => {
    props.history.push (`/rank/${detail.id}`)
  }

  const renderRankList = (list: any[], global?: boolean) => (
    <List globalRank={global}>
      {
      list.map ((item) => {
        return (
          <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail (item)}>
            <div className="img_wrapper">
              <img src={item.coverImgUrl} alt=""/>
              <div className="decorate"></div>
              <span className="update_frequecy">{item.updateFrequency}</span>
            </div>
            { renderSongList (item.tracks)  }
          </ListItem>
        )
      })
    } 
    </List>
  )

  const renderSongList = (list: any[]) => {
    return list.length ? (
      <SongList>
        {
          list.map ((item, index) => {
            return <li key={index}>{index+1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical"> 官方榜 </h1>
            { renderRankList (officialList) }
          <h1 className="global"> 全球榜 </h1>
            { renderRankList (globalList, true) }
          { enterLoading ?<Loading></Loading> : null }
        </div>
      </Scroll> 
      { renderRoutes (props.route.routes) }
  </Container>
  )
}

export default connector(React.memo(Rank))