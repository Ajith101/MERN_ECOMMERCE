import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Thumbs } from "swiper/modules";

const Swipper = ({ image }) => {
  const [thumbSwipper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        thumbs={{ swiper: thumbSwipper }}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Thumbs, Pagination]}
        className="swiper"
      >
        {image.map((item, id) => {
          return (
            <SwiperSlide key={id}>
              <img
                className="h-[250px] w-[250px] rounded-[35px] object-contain sm:h-[450px] sm:w-[520px] sm:bg-[#F9F8F8] sm:p-[15px]"
                src={item}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        className="mySwiper pt-[20px]"
        onSwiper={setThumbsSwiper}
        spaceBetween={20}
        slidesPerView={image?.length}
        watchSlidesProgress={true}
        modules={[Thumbs]}
      >
        {image.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="h-[60px] object-contain"
              src={image}
              alt="product"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Swipper;
