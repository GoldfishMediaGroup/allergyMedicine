import Swiper from 'swiper/bundle';

function history() {
  function historySwiper() {
    const options = {
      speed: 2000,
      slidesPerView: 1,
      // spaceBetween: `${remToPx(1.5)}rem`,
      // pagination: {
      //   el: '.home-review-pagination'
      // },
      allowTouchMove: false,
      loop: true,
      effect: 'creative',
      creativeEffect: {
        prev: {
          // shadow: true,
          translate: ['-20%', 0, 0]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }
    };

    const sliderImg = new Swiper('.history__img-swiper', options);
    const sliderContent = new Swiper('.history__content-swiper', options);
    const nextBtn = document.querySelector('.history__content-swiper-next-btn');

    nextBtn &&
      nextBtn.addEventListener('click', () => {
        sliderContent && sliderContent.slideNext();
      });

    sliderContent.controller.control = sliderImg;
  }
  historySwiper();

  function historyAccordeon() {
    const tabs = document.querySelectorAll('.history__tab');

    tabs.forEach((item) => {
      const btn = item.querySelector('.history__tab-show-more-btn');
      const btnText = btn.querySelector('.history__tab-show-more-btn-text');

      const parent = btn.parentElement;
      const text = item.querySelector('.history__tab-text');

      item.addEventListener('click', () => {
        item.classList.add('isActive');
        parent.classList.contains('isActive') ? showMore() : hideMore();
        console.log(item);
        $(item).find('.history__tab-content').slideDown();
        tabs.forEach((innerItem) => {
          if (item != innerItem) {
            $(innerItem).find('.history__tab-content').slideUp();
            innerItem.classList.remove('isActive');
          }
        });
      });

      btn.addEventListener('click', () => {
        parent.classList.toggle('isActive');
        parent.classList.contains('isActive') ? showMore() : hideMore();
      });

      function showMore() {
        text.style.display = 'block';
        text.style.maxHeight = `${text.scrollHeight + 600}px`;
        btnText.textContent = 'Свернуть';
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
      if (window.innerWidth < 768) {
        const text = document.querySelector('.history__tab.isActive .history__tab-text-box.isActive .history__tab-text');
        if (text) text.style.maxHeight = `${text.scrollHeight}px`;
      }
    });
  }
  historyAccordeon();
}

export default history;
