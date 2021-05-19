import styled from 'styled-components';
import globalStyle from '../../assets/global-style';

export const ListWrapper = styled.div`
  max-width: 100%;
  .title{
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
    color: ${globalStyle["font-color"]};
  }
`
export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
` 

export const ListItem = styled.div`
  position: relative;
  width: 30%;
  margin: 0 2.5%;
  &:nth-child(3n-1) {
    margin:0;
  }
  .decorate {
    z-index: 1;
    position: absolute;
    top: 0;
    width: 100%;
    height: 35px;
    border-radius: 3px;
    background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
  }
  .img_wrapper{
    position: relative;
    height: 0;
    padding-bottom: 100%;
    .play_count {
      z-index: 1;
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${globalStyle["font-size-s"]};
      line-height: 15px;
      color: ${globalStyle["font-color-light"]};
      .play{
        vertical-align: top;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
  .desc {
      overflow: hidden;
      margin-top: 2px;
      padding: 0 2px;
      height: 50px;
      text-align: left;
      font-size: ${globalStyle["font-size-s"]};
      line-height: 1.4;
      color: ${globalStyle["font-color-desc"]};
    }
`