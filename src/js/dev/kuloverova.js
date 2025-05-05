import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, ScrollToPlugin } from 'gsap/all';
window.$ = window.jQuery = require('jquery');

import { rem } from '../utils/constants';

import popup from '../utils/popup';
import form from '../utils/form';
import scroll from '../utils/scroll';

import headerBurger from '../components/headerBurger';
import smoothScroll from '../components/smoothScroll';
import footerCookieDisclamer from '../components/footerCookieDisclamer';
import about from '../components/about';
import history from '../components/history';
import banner from '../components/banner';

export const modules = {};

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  try {
    popup();
  } catch {}
  try {
    form();
  } catch {}
  try {
    scroll();
  } catch {}
  try {
    headerBurger();
  } catch {}
  try {
    smoothScroll();
  } catch {}
  try {
    footerCookieDisclamer();
  } catch {}
  try {
    about();
  } catch {}
  try {
    history();
  } catch {}
  try {
    banner();
  } catch {}
});
