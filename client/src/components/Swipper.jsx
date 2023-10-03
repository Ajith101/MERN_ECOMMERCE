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
      <div className="h-full w-full">
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
              <SwiperSlide
                key={id}
                className="flex h-[250px] w-[250px] flex-col items-center justify-center rounded-[35px] sm:h-[520px] sm:w-[520px] sm:bg-[#F9F8F8] sm:p-[15px]"
              >
                <img className="h-full w-full object-contain" src={item?.url} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <Swiper
        className="mySwiper pt-[20px]"
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={image?.length}
        watchSlidesProgress={true}
        modules={[Thumbs]}
      >
        {image.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="h-[60px] object-contain"
              src={image?.url}
              alt="product"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Swipper;
