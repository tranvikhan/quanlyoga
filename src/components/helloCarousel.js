import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import helloImage from "../assets/image/helloImage.jpg";
import helloImage2 from "../assets/image/helloImage2.jpg";
import helloImage3 from "../assets/image/helloImage3.jpg";

const items = [
  {
    src: helloImage2,
    altText: "Ảnh 1",
    title: "Xin chào!",
    caption: "Chúc một ngày mới tốt lành",
  },
  {
    src: helloImage3,
    altText: "Ảnh 2",
    title: "Hôm nay thế nào?",
    caption: "Có lỗ hỏng nào trên đường được sửa không?",
  },
  {
    src: helloImage,
    altText: "Ảnh 3",
    title: "Tiếp tục nào!",
    caption:
      "Giúp mọi người an toàn khi phát hiện sớm các lỗ hỏng trên đường nhé",
  },
];

const HelloCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img
          src={item.src}
          alt={item.altText}
          className="rounded w-100"
          style={{ maxHeight: 560 }}
        />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.title}
        />
      </CarouselItem>
    );
  });

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
      </Carousel>
    </div>
  );
};

export default HelloCarousel;
