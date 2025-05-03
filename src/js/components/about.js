import Swiper from 'swiper/bundle';
import { rem } from '../utils/constants';

function about() {
  const swiperAbout = new Swiper('.about__swiper', {
    speed: 1500,
    slidesPerView: '1',
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    // grabCursor: true,
    allowTouchMove: false,
    spaceBetween: rem(3.2),
    loop: true,
    // allowTouchMove: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  });
}

export default about;
