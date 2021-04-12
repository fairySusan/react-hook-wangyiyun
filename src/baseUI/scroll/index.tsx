import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  RefObject,
  useMemo
} from 'react'
import {ScrollContainer, PullUpLoading, PullDownLoading } from './style'
import Loading from 'src/baseUI/loading'
import LoadingV2 from 'src/baseUI/loadingV2'
import BScroll from "better-scroll"
import BScrollFactory from "better-scroll/dist/types"
import {debounce} from 'src/api/util'

interface Props {
  children: JSX.Element,
  isRefreshing?: boolean, // 是否显示上拉加载动画
  isLoadingMore?: boolean, // 是否显示下拉加载动画
  direction?: "horizental" | "vertical",
  click?: boolean, // 是否支持点击
  refresh?: boolean, // 是否需要刷新功能
  bounceTop?: boolean,
  bounceBottom?: boolean,
  pullUp?: any, // 上拉加载时调用的函数
  pullDown?: any, // 下拉加载时调用的函数
  onScroll?: any // 滑动时调用的函数
}

const Scroll: React.FC<Props> = forwardRef((props: Props, ref) => {
  const [bScroll, setBScroll] = useState<BScrollFactory | null>();
  const scrollContaninerRef = useRef<HTMLDivElement>();
  const {
    direction = 'vertical',
    click = true,
    refresh = true,
    isRefreshing = false,
    isLoadingMore = false,
    bounceTop = true,
    bounceBottom = true
  } = props;

  const { pullUp, pullDown, onScroll } = props;

  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 500)
  }, [pullUp]);

  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 500)
  }, [pullDown]);

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current as HTMLElement, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    })
    setBScroll(scroll);
    // 组件卸载的时候，需要做的操作
    return () => {
      setBScroll(null);
    }
  }, [])

  // 组件挂载过后监听滚动的动作
  useEffect(() => {
    if(!bScroll || !onScroll) return;
    bScroll.on('scroll', onScroll)
    return () => {
      bScroll.off('scroll', onScroll);
    }
  }, [onScroll, bScroll]);

  useEffect(() => {
    if(refresh && bScroll){
      bScroll.refresh();
    }
  });

  useEffect(() => {
    if(!bScroll || !pullUp) return;
    const handlePullUp = () => {
      //判断是否滑动到了底部
      if(bScroll.y <= bScroll.maxScrollY + 100){
        pullUpDebounce();
      }
    };
    bScroll.on('scrollEnd', handlePullUp);
    return () => {
      bScroll.off('scrollEnd', handlePullUp);
    }
  }, [pullUp, pullUpDebounce, bScroll]);

  useEffect(() => {
    if(!bScroll || !pullDown) return;
    const handlePullDown = (pos: any) => {
      //判断用户的下拉动作
      if(pos.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on('touchEnd', handlePullDown);
    return () => {
      bScroll.off('touchEnd', handlePullDown);
    }
  }, [pullDown, pullDownDebounce, bScroll]);

  //  父组件可以scrollRef.current.refresh()、scrollRef.current.getBScroll()
  useImperativeHandle(ref, () => ({
    refresh() {
      if(bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if(bScroll) {
        return bScroll;
      }
    }
  }));

  const PullUpdisplayStyle = isRefreshing ? { display: "" } : { display: "none" };
  const PullDowndisplayStyle = isLoadingMore ? { display: "" } : { display: "none" };
  return (
    <ScrollContainer ref={scrollContaninerRef as RefObject<HTMLDivElement>}>
      {props.children}
      <PullUpLoading style={PullUpdisplayStyle}>
        <Loading></Loading>
      </PullUpLoading>
      <PullDownLoading style={PullDowndisplayStyle}>
        <LoadingV2></LoadingV2>
      </PullDownLoading>
    </ScrollContainer>
  )
})

export default React.memo(Scroll)