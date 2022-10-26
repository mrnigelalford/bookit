import React from 'react';
import { Link } from 'react-router-dom';
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

  // <Row data={props.data} />

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
    <section>
      <div className="descriptionBlock">
        <h1 className="heading">{props.title}</h1>
        <div className="style2">
            <Link
              to="/create-book"
              className="sc-button style style-3 note"
            >
              <span>Create</span>
            </Link>
            <a
              href="/explore"
              style={{ display: 'none' }}
            >
              <h3>Explore</h3>
            </a>
        </div>
      </div>
    </section>
  );
};

export default SliderComponent;
