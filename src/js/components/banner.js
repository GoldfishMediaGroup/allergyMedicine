function banner() {
    const items = document.querySelectorAll('.banner__content-item');

    function handlePopupAttrs() {
      items.forEach(item => {
        const mobPopup = item.getAttribute('data-mob-popup');
    
        if (!mobPopup) return; // если нет атрибута — пропускаем
    
        if (window.innerWidth < 768) {
          item.setAttribute('data-popup', mobPopup);
        } else {
          item.removeAttribute('data-popup');
        }
      });
    }
    
    // при загрузке
    handlePopupAttrs();
    
    // и при ресайзе
    window.addEventListener('resize', handlePopupAttrs);

}

export default banner;