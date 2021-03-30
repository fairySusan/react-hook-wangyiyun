import React from 'react';
import { Redirect } from "react-router-dom";
import Home from 'src/application/Home';
import Recommend from 'src/application/Recommend';
import Singers from 'src/application/Singers';
import Rank from 'src/application/Rank';

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
        component: Recommend
      },
      {
        path: '/singers',
        component: Singers
      },
      {
        path: '/rank',
        component: Rank
      }
    ]
  }
]

export default routers