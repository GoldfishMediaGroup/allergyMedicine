function scroll() {
  // const anchors = document.querySelectorAll(`.nav-link`);

  // for (let anchor of anchors) {
  //   anchor.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     const blockId = anchor.getAttribute('href');
  //     document.querySelector('' + blockId).scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start'
  //     });
  //   });
  // }

  const allAnchors = document.querySelectorAll('.nav-link, .nav-link-end');

  allAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      const blockId = href.startsWith('#') ? href : `#${href.split('#')[1]}`;
      const scrollBlock = document.querySelector(blockId);

      // Определяем куда скроллить (start или end)
      const scrollPosition = anchor.classList.contains('nav-link-end') ? 'end' : 'start';

      // Если якорь найден на текущей странице — скроллим
      if (scrollBlock) {
        e.preventDefault();
        scrollBlock.scrollIntoView({
          behavior: 'smooth',
          block: scrollPosition
        });
      }
      // Если нет — даём браузеру перейти на нужную страницу с якорем
    });
  });
}

export default scroll;
