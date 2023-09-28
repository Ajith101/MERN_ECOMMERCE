import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { TypeAnimation } from "react-type-animation";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

const HomeSlider = () => {
  const carouselData = [
    {
      image:
        "https://i.pinimg.com/originals/ef/80/83/ef8083bfe79088dc00bd8eca9c821cd5.jpg",
      sequence: ["BEST", 1000, "LAPTOPS", 2000],
      text: "from ₹37,000",
      link: "/cat-product/laptops",
    },
    {
      image: "https://t2.tudocdn.net/567748?w=1200&h=1200",
      sequence: ["BEST", 1000, "Mobiles", 2000],
      text: "from ₹1,499",
      link: "/cat-product/mobiles",
    },
    {
      image:
        "https://global.beyerdynamic.com/media/catalog/category/beyerdynamic-Katalogbanner-Amiron-Copper-ohne-bubble.jpg",
      sequence: ["BEST", 1000, "Headphones", 2000],
      text: " Upto 20%off",
      link: "/cat-product/headphones",
    },
  ];

  return (
    <div className="my-10  h-[50vh] w-full rounded-lg ">
      <Swiper
        className="h-full w-full"
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Pagination, Autoplay]}
      >
        {carouselData?.map((item, id) => (
          <SwiperSlide key={id} className="relative">
            <div className="absolute inset-0 h-full w-full bg-cover bg-no-repeat ">
              <img
                src={item.image}
                className="h-full w-full rounded-lg object-cover"
                alt="banner"
              />
            </div>
            <div className="absolute  bottom-0 left-2 sm:left-20 sm:top-20">
              <TypeAnimation
                sequence={item.sequence}
                wrapper="div"
                cursor={true}
                repeat={Infinity}
                style={{ fontSize: "2em", color: "white", fontWeight: 700 }}
              />
              <h6 className="text-2xl font-bold uppercase text-white">
                {item.text}
              </h6>
              <Link
                to={item.link}
                className="btn-blue my-4 !w-full animate-bounce uppercase"
              >
                check it now!
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
