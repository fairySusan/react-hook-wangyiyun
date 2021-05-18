import React from 'react';
import { Redirect } from "react-router-dom";
import Home from 'src/application/Home';
import Recommend from 'src/application/Recommend';
import Singers from 'src/application/Singers';
import Rank from 'src/application/Rank';
import Album from 'src/application/Album';
import Singer from 'src/application/Singer'

const routers =  [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (<Redirect to={'/recommend'}/>)
      },
      {
        path: '/recommend',
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            component: Album
          }
        ]
      },
      {
        path: '/singers',
        component: Singers,
        routes: [
          {
            path: "/singers/:id",
            component: Singer
          }
        ]
      },
      {
        path: '/rank',
        component: Rank,
        routes: [
          {
            path: "/rank/:id",
            component: Album
          }
        ]
      }
    ]
  }
]

export default routers