import Swiper from 'swiper/bundle';
window.$ = window.jQuery = require('jquery');

function material() {
  function materialTable() {
    let tablesItems = document.querySelectorAll('.material-body__desc table');
    const tables = document.querySelectorAll('.material-body__table-wrapper');

    if (tablesItems.length <= 0 || tables.length) return;

    for (let i = 0; i < tablesItems.length; i++) {
      let table = tablesItems[i];

      // Пропускаем, если уже обёрнута
      if (table.closest('.material-body__table-wrapper')) continue;

      // Создаём обёртку
      const wrapper = document.createElement('div');
      wrapper.classList.add('material-body__table-wrapper');

      const tableBlock = document.createElement('div');
      tableBlock.classList.add('material-body__table');

      // Создаём scrollbar
      const scrollbar = document.createElement('div');
      scrollbar.classList.add('material-body__table-scrollbar');

      const scrollbarThumb = document.createElement('div');
      scrollbarThumb.classList.add('material-body__table-scrollbar-thumb');

      scrollbar.appendChild(scrollbarThumb);

      // Вставляем wrapper на место таблицы
      table.parentElement.insertBefore(wrapper, table);
      wrapper.appendChild(tableBlock);
      tableBlock.appendChild(table);
      wrapper.appendChild(scrollbar);
    }

    tables.forEach((tableWrapper) => {
      const container = tableWrapper.querySelector('.material-body__table');
      const scrollbar = tableWrapper.querySelector('.material-body__table-scrollbar');
      const thumb = tableWrapper.querySelector('.material-body__table-scrollbar-thumb');

      let isDown = false;
      let startX;
      let scrollLeft;

      let isThumbDown = false;
      let startThumbX;
      let startThumbLeft;

      function updateThumb() {
        const containerWidth = container.clientWidth;
        const scrollWidth = container.scrollWidth;

        scrollbar.classList.toggle('is-hidden', scrollWidth <= containerWidth);

        const scrollLeft = container.scrollLeft;
        const thumbWidth = (containerWidth / scrollWidth) * scrollbar.clientWidth;
        thumb.style.width = thumbWidth + 'px';

        const maxThumbLeft = scrollbar.clientWidth - thumbWidth;
        const thumbLeft = (scrollLeft / (scrollWidth - containerWidth)) * maxThumbLeft || 0;
        thumb.style.left = thumbLeft + 'px';
      }

      // Desktop mouse scroll
      container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('dragging');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      document.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('dragging');
        isThumbDown = false;
      });

      container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
        updateThumb();
      });

      let startY;

      container.addEventListener(
        'touchstart',
        (e) => {
          startX = e.touches[0].pageX - container.offsetLeft;
          startY = e.touches[0].pageY;
          scrollLeft = container.scrollLeft;
          isDown = true;
        },
        { passive: true }
      );

      container.addEventListener(
        'touchmove',
        (e) => {
          if (!isDown) return;

          const currentX = e.touches[0].pageX - container.offsetLeft;
          const currentY = e.touches[0].pageY;

          const deltaX = Math.abs(currentX - startX);
          const deltaY = Math.abs(currentY - startY);

          // Только если горизонтальное движение доминирует
          if (deltaX > deltaY) {
            e.preventDefault();

            const walk = (currentX - startX) * 1.5;
            container.scrollLeft = scrollLeft - walk;
            updateThumb();
          }
        },
        { passive: false }
      );

      document.addEventListener(
        'touchend',
        () => {
          isDown = false;
        },
        { passive: true }
      );
      // Thumb (ползунок)
      thumb.addEventListener('mousedown', (e) => {
        isThumbDown = true;
        startThumbX = e.pageX;
        startThumbLeft = parseInt(window.getComputedStyle(thumb).left, 10);
        e.preventDefault();
      });

      document.addEventListener('mousemove', (e) => {
        if (!isThumbDown) return;
        e.preventDefault();
        const dx = e.pageX - startThumbX;
        let newLeft = startThumbLeft + dx;

        const maxLeft = scrollbar.clientWidth - thumb.clientWidth;
        newLeft = Math.max(0, Math.min(newLeft, maxLeft));

        thumb.style.left = newLeft + 'px';

        const scrollRatio = newLeft / maxLeft;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        container.scrollLeft = scrollRatio * maxScrollLeft;
      });

      window.addEventListener('resize', updateThumb);

      updateThumb();
    });
  }

  function materialSwiper() {
    const sourseSwipers = document.querySelectorAll('.material-body__swiper-box .swiper');
    if (sourseSwipers.length <= 0) return;

    function soursSwiperInit(sourseSwipers) {
      sourseSwipers.forEach((item) => {
        const swiperSoursPrev = item.parentElement.querySelector('.swiper-button-prev');
        const swiperSoursNext = item.parentElement.querySelector('.swiper-button-next');
        const swiper = new Swiper(item, {
          slidesPerView: '1.19',
          speed: 800,
          spaceBetween: 12,
          loop: true,

          navigation: {
            prevEl: swiperSoursPrev,
            nextEl: swiperSoursNext
          },
          breakpoints: {
            1025: {
              slidesPerView: '4',
              spaceBetween: 16
            },
            768: {
              slidesPerView: '2.4',
              spaceBetween: 12
            }
          }
        });
        // swiperSours.push(swiper);
      });
    }

    soursSwiperInit(sourseSwipers);
  }

  function checkOverflowAndAdjust(seleclor) {
    const lists = document.querySelectorAll(seleclor);
    if (lists.length <= 0) return;
    const det = seleclor === '.info-list-det' ? '' : '-det';

    lists.forEach((list) => {
      list.classList.remove('list-overflow');
      const items = list.querySelectorAll(`${seleclor}${det}__item`);

      if (items.length < 2) return; // минимум 2, чтобы был перенос

      const lineHeight = items[0].offsetHeight;
      const totalHeight = list.offsetHeight;

      const isOverflowing = totalHeight > lineHeight; // запас на пиксель

      if (isOverflowing) {
        list.classList.add('list-overflow');
      } else {
        list.classList.remove('list-overflow');
      }
    });
  }

  function materialVideo() {
    const videos = document.querySelectorAll('video');
    if (!videos.length) return;

    videos.forEach((video) => {
      video.addEventListener('play', () => {
        video.parentElement.classList.add('isActive');
      });

      video.addEventListener('pause', () => {
        video.parentElement.classList.remove('isActive');
      });

      // Если нужно запускать по клику на сам контейнер
      video.addEventListener('click', () => {
        if (video.paused) {
          video.parentElement.classList.add('isActive');
        } else {
          video.parentElement.classList.remove('isActive');
        }
      });
    });
  }

  materialTable();
  materialSwiper();
  checkOverflowAndAdjust('.info-list-det');
  checkOverflowAndAdjust('.info-list');
  materialVideo();
  window.addEventListener('resize', () => {
    checkOverflowAndAdjust('.info-list-det');
    checkOverflowAndAdjust('.info-list');
  });
}
export default material;
