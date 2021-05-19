import React from 'react'
import {HeaderContainer, Marquee} from './style'
interface Props {
    handleClick: () => void,
    title: string,
    isMarquee?: boolean
}
const Header = React.forwardRef((props: Props, ref: any ) => {
    const { handleClick, title, isMarquee = false} = props;
    return  (
        <HeaderContainer ref={ref}>
            <i className="iconfont back"  onClick={handleClick}>&#xe655;</i>
            <div className="marquee-wrap">
             <Marquee isMarquee={isMarquee}>{title}</Marquee>
            </div>
        </HeaderContainer>
    )
})

export default Header