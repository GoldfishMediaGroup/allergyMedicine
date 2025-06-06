// body lock
import { modules } from '../dev/kuloverova';
import { bodyLockStatus, bodyUnlock, bodyLock } from '../utils/constants';

const popup = () => {
  // launch ======================================================================
  class Popup {
    constructor(options) {
      let config = {
        logging: true,
        init: true,
        attributeOpenButton: 'data-popup',
        attributeCloseButton: 'data-close',
        fixElementSelector: '[data-lp]',
        youtubeAttribute: 'data-popup-youtube',
        youtubePlaceAttribute: 'data-popup-youtube-place',
        setAutoplayYoutube: true,
        classes: {
          popup: 'popup',
          // popupWrapper: 'popup__wrapper',
          popupContent: 'popup__content',
          popupActive: 'popup_show',
          bodyActive: 'popup-show'
        },
        focusCatch: true,
        closeEsc: true,
        bodyLock: true,
        hashSettings: {
          location: true,
          goHash: true
        },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {}
        }
      };
      this.youTubeCode;
      this.isOpen = false;
      this.targetOpen = {
        selector: false,
        element: false
      };
      this.previousOpen = {
        selector: false,
        element: false
      };
      this.lastClosed = {
        selector: false,
        element: false
      };
      this._dataValue = false;
      this.hash = false;

      this._reopen = false;
      this._selectorOpen = false;

      this.lastFocusEl = false;
      this._focusEl = [
        'a[href]',
        'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
        'button:not([disabled]):not([aria-hidden])',
        'select:not([disabled]):not([aria-hidden])',
        'textarea:not([disabled]):not([aria-hidden])',
        'area[href]',
        'iframe',
        'object',
        'embed',
        '[contenteditable]',
        '[tabindex]:not([tabindex^="-"])'
      ];
      //this.options = Object.assign(config, options);
      this.options = {
        ...config,
        ...options,
        classes: {
          ...config.classes,
          ...options?.classes
        },
        hashSettings: {
          ...config.hashSettings,
          ...options?.hashSettings
        },
        on: {
          ...config.on,
          ...options?.on
        }
      };
      this.bodyLock = false;
      this.options.init ? this.initPopups() : null;
    }
    initPopups() {
      this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        'click',
        function (e) {
          const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (buttonOpen) {
            e.preventDefault();
            this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton)
              ? buttonOpen.getAttribute(this.options.attributeOpenButton)
              : 'error';
            this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute)
              ? buttonOpen.getAttribute(this.options.youtubeAttribute)
              : null;
            if (this._dataValue !== 'error') {
              if (!this.isOpen) this.lastFocusEl = buttonOpen;
              this.targetOpen.selector = `${this._dataValue}`;
              this._selectorOpen = true;
              this.open();
              return;
            }

            return;
          }
          // const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
          // if (buttonClose || (!e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen)) {
          //   e.preventDefault();
          //   this.close();
          //   return;
          // }
          // const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
          // const clickedOutsideContent = !e.target.closest(`.${this.options.classes.popupContent}`);
          // const isProtected = this.targetOpen.element?.hasAttribute('data-popup-no-close');

          // if (buttonClose || (clickedOutsideContent && this.isOpen && !isProtected)) {
          //   e.preventDefault();
          //   this.close();
          //   return;
          // }

          const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
          const clickedOutsideContent = !e.target.closest(`.${this.options.classes.popupContent}`);
          const el = this.targetOpen?.element;
          const isProtected = el instanceof Element && el.hasAttribute('data-popup-no-close');

          if (buttonClose || (clickedOutsideContent && this.isOpen && !isProtected)) {
            e.preventDefault();
            this.close();
            return;
          }
        }.bind(this)
      );
      document.addEventListener(
        'keydown',
        function (e) {
          // if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
          //   e.preventDefault();
          //   this.close();
          //   return;
          // }

          // if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
          //   const isProtected = this.targetOpen.element?.hasAttribute('data-popup-no-close');
          //   if (!isProtected) {
          //     e.preventDefault();
          //     this.close();
          //   }
          //   return;
          // }
          if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
            const el = this.targetOpen?.element;
            if (el instanceof Element) {
              const isProtected = el.hasAttribute('data-popup-no-close');
              if (!isProtected) {
                e.preventDefault();
                this.close();
              }
            }
            return;
          }
          if (this.options.focusCatch && e.which == 9 && this.isOpen) {
            this._focusCatch(e);
            return;
          }
        }.bind(this)
      );

      if (this.options.hashSettings.goHash) {
        window.addEventListener(
          'hashchange',
          function () {
            if (window.location.hash) {
              this._openToHash();
            } else {
              this.close(this.targetOpen.selector);
            }
          }.bind(this)
        );

        window.addEventListener(
          'load',
          function () {
            if (window.location.hash) {
              this._openToHash();
            }
          }.bind(this)
        );
      }
    }
    open(selectorValue) {
      if (bodyLockStatus) {
        this.bodyLock = document.documentElement.classList.contains('lock') && !this.isOpen ? true : false;

        if (selectorValue && typeof selectorValue === 'string' && selectorValue.trim() !== '') {
          this.targetOpen.selector = selectorValue;
          this._selectorOpen = true;
        }
        if (this.isOpen) {
          this._reopen = true;
          this.close();
        }
        if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
        if (!this._reopen) this.previousActiveElement = document.activeElement;

        this.targetOpen.element = document.querySelector(this.targetOpen.selector);

        if (this.targetOpen.element) {
          if (this.youTubeCode) {
            const codeVideo = this.youTubeCode;
            const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
            const iframe = document.createElement('iframe');
            iframe.setAttribute('allowfullscreen', '');

            const autoplay = this.options.setAutoplayYoutube ? 'autoplay;' : '';
            iframe.setAttribute('allow', `${autoplay}; encrypted-media`);

            iframe.setAttribute('src', urlVideo);

            if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
              const youtubePlace = this.targetOpen.element
                .querySelector('.popup__text')
                .setAttribute(`${this.options.youtubePlaceAttribute}`, '');
            }
            this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
          }
          if (this.options.hashSettings.location) {
            this._getHash();
            this._setHash();
          }

          this.options.on.beforeOpen(this);
          document.dispatchEvent(
            new CustomEvent('beforePopupOpen', {
              detail: {
                popup: this
              }
            })
          );

          this.targetOpen.element.classList.add(this.options.classes.popupActive);
          document.documentElement.classList.add(this.options.classes.bodyActive);

          if (!this._reopen) {
            !this.bodyLock ? bodyLock() : null;
          } else this._reopen = false;

          this.targetOpen.element.setAttribute('aria-hidden', 'false');

          this.previousOpen.selector = this.targetOpen.selector;
          this.previousOpen.element = this.targetOpen.element;

          this._selectorOpen = false;

          this.isOpen = true;

          setTimeout(() => {
            this._focusTrap();
          }, 50);

          this.options.on.afterOpen(this);
          document.dispatchEvent(
            new CustomEvent('afterPopupOpen', {
              detail: {
                popup: this
              }
            })
          );
        }
      }
    }
    close(selectorValue) {
      if (selectorValue && typeof selectorValue === 'string' && selectorValue.trim() !== '') {
        this.previousOpen.selector = selectorValue;
      }
      if (!this.isOpen || !bodyLockStatus) {
        return;
      }
      this.options.on.beforeClose(this);
      document.dispatchEvent(
        new CustomEvent('beforePopupClose', {
          detail: {
            popup: this
          }
        })
      );

      if (this.youTubeCode) {
        if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`))
          this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = '';
      }
      this.previousOpen.element.classList.remove(this.options.classes.popupActive);
      // aria-hidden
      this.previousOpen.element.setAttribute('aria-hidden', 'true');
      if (!this._reopen) {
        document.documentElement.classList.remove(this.options.classes.bodyActive);
        !this.bodyLock ? bodyUnlock() : null;
        this.isOpen = false;
      }
      this._removeHash();
      if (this._selectorOpen) {
        this.lastClosed.selector = this.previousOpen.selector;
        this.lastClosed.element = this.previousOpen.element;
      }
      this.options.on.afterClose(this);
      document.dispatchEvent(
        new CustomEvent('afterPopupClose', {
          detail: {
            popup: this
          }
        })
      );

      setTimeout(() => {
        this._focusTrap();
      }, 50);
    }
    _getHash() {
      if (this.options.hashSettings.location) {
        this.hash = this.targetOpen.selector.includes('#')
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace('.', '#');
      }
    }
    _openToHash() {
      const elementInPage = document.querySelector(window.location.hash);

      if (elementInPage) {
        // Это якорная ссылка, не открываем попап
        return;
      }

      let classInHash = document.querySelector(`.${window.location.hash.replace('#', '')}`)
        ? `.${window.location.hash.replace('#', '')}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;

      // const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`)
      //   ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`)
      //   : document.querySelector(
      //       `[${this.options.attributeOpenButton} = "${classInHash.replace('.', '#')}"]`
      //     );

      //     console.log(buttons)
      //     console.log(classInHash)
      if (classInHash) this.open(classInHash);
      // buttons &&
    }
    _setHash() {
      history.pushState('', '', this.hash);
    }
    _removeHash() {
      history.pushState('', '', window.location.href.split('#')[0]);
    }
    _focusCatch(e) {
      const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
        focusArray[focusArray.length - 1].focus();
        e.preventDefault();
      }
      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
        focusArray[0].focus();
        e.preventDefault();
      }
    }
    _focusTrap() {
      const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
      if (!this.isOpen && this.lastFocusEl) {
        this.lastFocusEl.focus();
      } else {
        focusable[0].focus();
      }
    }
  }
  modules.popup = new Popup({});
};

export default popup;
