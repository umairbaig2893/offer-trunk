import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Banner() {
  const banners = [
    "https://www.offertrunk.com/images/banners/13.png",
    "https://www.offertrunk.com/images/banners/13.png",
    "https://www.offertrunk.com/images/banners/16.jpg",
    "https://www.offertrunk.com/images/banners/13.png",
    "https://www.offertrunk.com/images/banners/1.gif",
    "https://www.offertrunk.com/images/banners/2.jpg",
    "https://www.offertrunk.com/images/banners/3.gif",
    "https://www.offertrunk.com/images/banners/4.jpg",
    "https://www.offertrunk.com/images/banners/5.jpg",
  ];

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gradient-to-r from-[#295F98] to-[#E1D7C6] text-white p-3 rounded-full cursor-pointer z-10 shadow-lg"
      onClick={onClick}
    >
      <FaArrowRight size={20} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gradient-to-r from-[#E1D7C6] to-[#295F98] text-white p-3 rounded-full cursor-pointer z-10 shadow-lg"
      onClick={onClick}
    >
      <FaArrowLeft size={20} />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative p-4">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="px-2">
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;
