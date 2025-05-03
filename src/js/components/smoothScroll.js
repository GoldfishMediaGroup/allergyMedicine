import Lenis from '@studio-freight/lenis';

import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
export let lenis;
function smoothScroll() {
  gsap.registerPlugin(ScrollTrigger);

  lenis = new Lenis();
  //   {
  //   smooth: true,
  //   duration: 0.5, // Длительность скролла
  //   easing: (t) => t, // Функция easing для плавности
  //   direction: 'vertical' // Вертикальный или горизонтальный скролл
  // }

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}
export default smoothScroll;
