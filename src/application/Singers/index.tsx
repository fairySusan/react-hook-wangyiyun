import React, {useState} from 'react'
import Horizen from 'src/baseUI/horizen-item'
import {categoryTypes, alphaTypes} from 'src/api/config'
import { NavContainer } from "./style";

function Singers () {

  let [category, setCategory] = useState ('');
  let [alpha, setAlpha] = useState ('');

  let handleUpdateAlpha = (val: string) => {
    setAlpha (val);
  }

  let handleUpdateCatetory = (val: string) => {
    setCategory (val);
  }

  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类 (默认热门):"}
        handleClick={handleUpdateCatetory}
        oldVal={category}
      />
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        handleClick={val => handleUpdateAlpha (val)} 
        oldVal={alpha}
      />
    </NavContainer>
  )
}

export default React.memo(Singers)