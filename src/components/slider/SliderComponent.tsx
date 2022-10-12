import React from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import './Slider.scss'

export interface SliderImage {
  title: string;
  img: any;
  class?: string;
}

interface SliderProps {
  title: string;
  description: string;
  data: SliderImage[];
}

const Row = ({ data }) => (
  <Swiper
    modules={[Autoplay]}
    direction={'vertical'}
    spaceBetween={10}
    slidesPerView={5}
    loop
    autoplay={{
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }}
    speed={2000}
  >
    {data?.map((prop: { img: string | undefined; title: string | undefined; }) => (
      <SwiperSlide key={data.title}>
        <img src={prop.img} alt={prop.title} />
      </SwiperSlide>
    ))}
  </Swiper>
);

const SliderComponent = (props: SliderProps) => {
  return (
    <section className="flat-title-page home5">
      <div className="overlay"></div>
      <div className="themesflat-container">
        <div className="wrap-heading flat-slider d-flex align-items-center">
          <div className="descriptionBlock">
            <h1 className="heading">{props.title}</h1>
            {/* <p className="sub-heading mg-t-7 mg-bt-39">{props.description}</p> */}
            <div className="style2">
              <a
                href="/create-book"
                className="sc-button header-slider style style-1 rocket fl-button pri-1"
              >
                <span>Create</span>
              </a>
              <a
                href="/explore"
                className="sc-button header-slider style style-1 note fl-button pri-1"
                style={{display: 'none'}}
              >
                <span>Explore</span>
              </a>
            </div>
          </div>
          <Row data={props.data} />
          <Row data={props.data} />
          <Row data={props.data} />
        </div>
      </div>
    </section>
  );
};

export default SliderComponent;
