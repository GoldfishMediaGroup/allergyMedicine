function footerCookieDisclamer() {
  const cookie = document.querySelector('.cookie');
  const cookieBtn = document.querySelector('.cookie__btn');

  cookieBtn && cookieBtn.addEventListener('click', () => {
    cookie && cookie.classList.remove('cookie--show');
  });
  const disclaimer = document.querySelector('.disclaimer');
  const disclaimerBtn = document.querySelector('.disclaimer__btn');

  disclaimerBtn && disclaimerBtn.addEventListener('click', () => {
    disclaimer && disclaimer.classList.remove('disclaimer--show');
    cookie &&  cookie.classList.add('cookie--disclamerOf');
  });
}

export default footerCookieDisclamer;
