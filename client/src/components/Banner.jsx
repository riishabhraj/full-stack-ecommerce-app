import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css/parallax";

const Banner = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      parallax
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide style={{ width: "100%" }}>
        <img
          src="https://via.placeholder.com/1200x400/FF0000/FFFFFF"
          alt="Slide 1"
          style={{
            backgroundSize: "cover",
          }}
        />
      </SwiperSlide>
      <SwiperSlide style={{ width: "100%" }}>
        <img
          src="https://via.placeholder.com/1200x400/00FF00/FFFFFF"
          alt="Slide 2"
          style={{ width: "100%" }}
        />
      </SwiperSlide>
      <SwiperSlide style={{ width: "100%" }}>
        <img
          src="https://via.placeholder.com/1200x400/0000FF/FFFFFF"
          alt="Slide 3"
          style={{ width: "100%" }}
        />
      </SwiperSlide>
      <SwiperSlide style={{ width: "100%" }}>
        <img
          src="https://via.placeholder.com/1200x400/FFFF00/000000"
          alt="Slide 4"
          style={{ width: "100%" }}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
