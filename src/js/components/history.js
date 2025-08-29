import Swiper from 'swiper/bundle';

function history() {
  function historySwiper() {
    const prevBtn = document.querySelector('.history__swiper-btn--prev');
    const nextBtn = document.querySelector('.history__swiper-btn--next');
    const fraction = document.querySelector('.history__swiper-fraction');

    const options = {
      speed: 2000,
      slidesPerView: 1,
      // spaceBetween: `${remToPx(1.5)}rem`,
      // pagination: {
      //   el: '.home-review-pagination'
      // },
      //   allowTouchMove: false,
      // loop: true,
      grabCursor: true,
      effect: 'creative',

      creativeEffect: {
        prev: {
          // shadow: true,
          translate: ['-20%', 0, -1]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }
    };

    const sliderImg = new Swiper('.history__img-swiper', options);
    const sliderContent = new Swiper('.history__content-swiper', {
      ...options,
      pagination: {
        el: fraction,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return (
            '<span class="' +
            currentClass +
            '"></span>' +
            ' <span class="gray"> | ' +
            '<span class="' +
            totalClass +
            '"></span> </span> '
          );
        }
      },
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn
      }
    });

    // nextBtn &&
    //   nextBtn.addEventListener('click', () => {
    //     sliderContent && sliderContent.slideNext();
    //   });
    // prevBtn.addEventListener('click', () => {
    //   sliderContent && sliderContent.slidePrev();
    // });

    sliderContent.controller.control = sliderImg;
    sliderImg.controller.control = sliderContent;
  }
  historySwiper();

  function historyAccordeon() {
    const tabs = document.querySelectorAll('.history__tab');

    tabs.forEach((item) => {
      const btn = item.querySelector('.history__tab-show-more-btn');
      const btnText = btn.querySelector('.history__tab-show-more-btn-text');

      const parent = btn.parentElement;
      const text = item.querySelector('.history__tab-text');

      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('history__tab-header')) {
          item.classList.toggle('isActive');
          parent.classList.contains('isActive') ? showMore() : hideMore();

          $(item).find('.history__tab-content').slideToggle();
          tabs.forEach((innerItem) => {
            if (item != innerItem) {
              $(innerItem).find('.history__tab-content').slideUp();
              innerItem.classList.remove('isActive');
            }
          });
        }
      });

      btn.addEventListener('click', () => {
        parent.classList.toggle('isActive');
        parent.classList.contains('isActive') ? showMore() : hideMore();
      });

      function showMore() {
        setTimeout(() => {
          text.style.display = 'block';
          text.style.maxHeight = `${text.scrollHeight + 600}px`;
          btnText.textContent = 'Свернуть';
        }, 100);
      }

      function hideMore() {
        text.style.removeProperty('max-height');
        setTimeout(() => {
          text.style.display = '-webkit-box';
          btnText.textContent = 'Показать полностью';
        }, 500);
      }
    });

    window.addEventListener('resize', () => {
      const text = document.querySelector('.history__tab.isActive .history__tab-text-box.isActive .history__tab-text');
      if (window.innerWidth < 1024) {
        if (text) text.style.maxHeight = `${text.scrollHeight}px`;
      }
    });
  }
  historyAccordeon();
}

export default history;
