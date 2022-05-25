import React from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import img1 from '../../assets/images/box-item/green-ottez.png'
import img2 from '../../assets/images/box-item/space-rabbit.png'
import img3 from '../../assets/images/box-item/vr-kid.png'

const SliderComponent = () => {
  const title = 'Discover your next favorite author'
  const description =
    'book NFT Marketplace'
  return (
    <section className="flat-title-page home5">
      <div className="overlay"></div>
      <div className="themesflat-container">
        <div className="wrap-heading flat-slider d-flex align-items-center">
          <div className="content">
            <h1 className="heading">{title}</h1>
            <p className="sub-heading mg-t-7 mg-bt-39">{description}</p>
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
              <img src={img1} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img2} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img3} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img2} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img3} alt="Axies" />
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
              <img src={img2} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img3} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img1} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img3} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img1} alt="Axies" />
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
              <img src={img3} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img1} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img2} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img3} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img1} alt="Axies" />
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
              <img src={img3} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img2} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img3} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img1} alt="Axies" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img2} alt="Axies" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default SliderComponent
