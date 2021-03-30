import styled from 'styled-components';
import globalStyle from 'src/assets/global-style';

export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 24vh;
  overflow: hidden; // 用于隐藏.before的div超出父组件的部分
  .before{
    position: absolute;
    top: -300px;
    height: 400px;
    width: 100%;
    background: ${globalStyle["theme-color"]};
    z-index: 1;
  }
  .swiper-container{
    height: 100%;
    width: 98%;
    margin: 0 auto;
    border-radius: 6px;
    .slide-img {
      height: 100%;
      object-fit: contain;
    }
    .swiper-pagination-bullet-active{
      background: ${globalStyle["theme-color"]};
    }
  }
`