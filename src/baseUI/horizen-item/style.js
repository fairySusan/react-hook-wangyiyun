import globalStyle from 'src/assets/global-style';
import styled from 'styled-components';

export const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${globalStyle["font-size-m"]};
    vertical-align: middle;
  }
`

export const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${globalStyle["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${globalStyle["theme-color"]};
    border: 1px solid ${globalStyle["theme-color"]};
    opacity: 0.8;
  }
`