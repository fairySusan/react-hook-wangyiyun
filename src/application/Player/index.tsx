import React from 'react'
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer'
import {connector, PropsFromRedux} from './type'

interface Props extends PropsFromRedux {

}

function Player(props: Props) {
    const {fullScreen, setFullScreen} = props

    const currentSong = {
        al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
        name: "木偶人",
        ar: [{name: "薛之谦"}]
      }

    return (
        <div>
            <MiniPlayer
                song={currentSong}
                fullScreen={fullScreen}
                setFullScreen={setFullScreen}
            />
            <NormalPlayer
                song={currentSong}
                fullScreen={fullScreen}
                setFullScreen={setFullScreen}
            />
        </div>
    )
}

export default connector(Player)