import React from 'react'
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/components/pagination/pagination.less';
import { SliderContainer } from './style'

interface Props {
  bannerList: {imageUrl: string}[]
}

SwiperCore.use([Pagination]);

function Slider (props: Props) {
  const {bannerList} = props
  return (
    <SliderContainer>
      <div className="before"></div>
      {
        bannerList.length > 0
        &&
        <Swiper
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          pagination={{ clickable: true }}
          autoplay={{delay: 3000,disableOnInteraction: false,}}
        >
          {
              bannerList.map((slider, index) => {
                return (
                  <SwiperSlide key={index}>
                    <img className="slide-img" src={slider.imageUrl} alt="推荐" />
                  </SwiperSlide>
                );
              })
            }
        </Swiper>
      }
    </SliderContainer>
  )
}

export default React.memo(Slider)