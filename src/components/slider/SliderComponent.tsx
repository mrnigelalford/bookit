import React from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

interface SliderProps {
  title: string;
  description: string;
  data: {
    title_1: string;
    title_2: string;
    title_3: string;
    description: string;
    img: any;
    imgbg: any;
    class: string;
  }[];
}

const SliderComponent = (props: SliderProps) => {
  return (
    <section className="flat-title-page home5">
      <div className="overlay"></div>
      <div className="themesflat-container">
        <div className="wrap-heading flat-slider d-flex align-items-center">
          <div className="content">
            <h1 className="heading">{props.title}</h1>
            <p className="sub-heading mg-t-7 mg-bt-39">{props.description}</p>
            <div className="flat-bt-slider style2 flex">
              <a
                href="/create-book"
                className="sc-button header-slider style style-1 rocket fl-button pri-1"
              >
                <span>Create</span>
              </a>
              <a
                href="/explore"
                className="sc-button header-slider style style-1 note fl-button pri-1"
              >
                <span>Explore</span>
              </a>
            </div>
          </div>

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
            <SwiperSlide>
              <img src={props.data[0].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[1].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[2].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[1].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[2].img} alt="Axies" />
            </SwiperSlide>
          </Swiper>
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
            speed={2100}
          >
            <SwiperSlide>
              <img src={props.data[0].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[2].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[1].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[2].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[1].img} alt="Axies" />
            </SwiperSlide>
          </Swiper>
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
            speed={2200}
          >
            <SwiperSlide>
              <img src={props.data[2].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[1].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[0].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[2].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[1].img} alt="Axies" />
            </SwiperSlide>
          </Swiper>
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
            className="end"
          >
            <SwiperSlide>
              <img src={props.data[2].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[0].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[2].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[1].img} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={props.data[0].img} alt="Axies" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SliderComponent;
