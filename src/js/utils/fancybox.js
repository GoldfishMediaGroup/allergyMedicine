import { Fancybox } from '@fancyapps/ui';

import { lenis } from '../components/smoothScroll';
const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

function fancybox() {
  Fancybox.bind('[data-fancybox]', {
    caption: (fancybox, slide) => slide.caption || '',
      compact: false,

    animated: true,
    autoStart: false,
    placeFocusBack: false,
    idle: false,

    Images: {
      zoom: false // отключает zoom-анимацию при открытии
    },
    clickContent: false, // отключает zoom при клике
    wheel: false, // отключает zoom при скролле
    Carousel: {
      Panzoom: {
        zoom: false,
        pinchToZoom: false,
        wheel: false,
        touch: false
      }
    },
    Thumbs: false,
    Toolbar: {
      display: {
        middle: [],
        left: [],
        right: ['close']
      },
      items: {
        close: {
          tpl: `
          <button class="f-button f-button-close" data-fancybox-close>
              <svg  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" transform="matrix(0 -1 1 0 0 20)" fill="white" /><path d="M2.45703 2.45539L17.5463 17.5447" stroke="#393C43" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M2.45703 17.5447L17.5463 2.45539" stroke="#393C43" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg> 
          </button>
          `
        }
      }
    },
    on: {
      done: (fancybox) => {
        const fancyboxEl = fancybox.container,
          prevBtn = fancyboxEl.querySelector('.f-button.is-prev'),
          nextBtn = fancyboxEl.querySelector('.f-button.is-next');

        prevBtn &&
          (prevBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" transform="matrix(-1 0 0 -1 20 20)" fill="white" />
          <path d="M17.0705 10.8502L17.9205 10.8502L17.9205 9.15022L17.0705 9.15022L17.0705 10.8502ZM3.81228 9.15022C3.34284 9.15022 2.96228 9.53078 2.96228 10.0002C2.96228 10.4697 3.34284 10.8502 3.81228 10.8502L3.81228 9.15022ZM17.0705 10.0002L17.0705 9.15022H3.81228L3.81228 10.0002L3.81228 10.8502H17.0705L17.0705 10.0002Z" fill="#393C43" />
          <path d="M8.67188 15.7463L2.92663 10.0011L8.67188 4.25586" stroke="#393C43" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        `);

        nextBtn &&
          (nextBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" fill="white" />
        <path d="M2.92947 9.14978L2.07947 9.14978L2.07947 10.8498L2.92947 10.8498L2.92947 9.14978ZM16.1877 10.8498C16.6572 10.8498 17.0377 10.4692 17.0377 9.99978C17.0377 9.53034 16.6572 9.14978 16.1877 9.14978L16.1877 10.8498ZM2.92947 9.99978L2.92947 10.8498H16.1877L16.1877 9.99978L16.1877 9.14978H2.92947L2.92947 9.99978Z" fill="#393C43" />
        <path d="M11.3242 4.25366L17.0695 9.9989L11.3242 15.7441" stroke="#393C43" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
        `);
      },

      init: function () {
        $('.fancybox-bg').fadeIn();
        if (lenis && typeof lenis.stop === 'function') {
          let scrollWith = getScrollbarWidth();
          setTimeout(() => {
            if (document.body.querySelector('.fancybox__container')) {
              document.body.querySelector('.fancybox__container').style.paddingRight = `${scrollWith}px`;
              document.body.querySelector('.fancybox__toolbar').style.paddingRight = `${scrollWith}px`;
            }
            document.body.style.paddingRight = `${scrollWith}px`;
            lenis.stop();
          }, 300);
        }
      },
      close: function () {
        $('.fancybox-bg').fadeOut();
        if (lenis && typeof lenis.start === 'function') {
          document.body.style.paddingRight = ``;
          document.body.querySelector('.fancybox__container').style.paddingRight = ``;
          document.body.querySelector('.fancybox__toolbar').style.paddingRight = ``;
          lenis.start();
        }
      }
    }
  });

  $('.fancybox-bg').on('click', function () {
    Fancybox.close();
  });
}

export default fancybox;
