
import * as api from '../../lib/api'

import SectionHead from '../../components/section-head';
import { useEffect } from 'react';

// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export async function getData(preview, locale) {
    const fields = `
    title
    subtitle
    subtitle2
    imagesCollection {
      items {
        ... on Asset {
          url
          title
        }
      }
    }
    `
    const data = (await api.getData(preview, "sliderPage", fields, locale)) ?? []
    return data
}

export default function Slider({ data }) {

    return (
        <>
            <div className="container">
                <SectionHead data={data.slider} />

                <div className="section-body row g-4 justify-content-center m-2 p-2">
                    <div className="col-lg-8 wow fadeInUp">
                        <div className="swiper">
                            <div className="swiper-wrapper">
                              <Swiper
                                      modules={[Navigation, Pagination, Scrollbar, A11y]}
                                      spaceBetween={50}
                                      slidesPerView={1}
                                      navigation
                                      loop={true}
                                      pagination={{ clickable: true }}
                                      scrollbar={{ draggable: true }}                                    
                                      onSlideChange={() => console.log('slide change')}
                                      onSwiper={(swiper) => console.log(swiper)}>
                                  {data.slider.imagesCollection.items?.map((image, index) =>
                                  <SwiperSlide key={index}>
                                      <img src={image.url} alt={image.title} />
                                  </SwiperSlide> 
                                  )}
                              </Swiper>
                            </div>
 
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
