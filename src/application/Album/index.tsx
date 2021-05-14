import React from 'react'
import {Container} from './style'
import { renderRoutes, RouteConfig } from 'react-router-config';

interface Props extends RouteConfig{}

function Album (props: Props) {
   return (<Container>
      { renderRoutes (props.route.routes) }
   </Container>)
}

export default Album