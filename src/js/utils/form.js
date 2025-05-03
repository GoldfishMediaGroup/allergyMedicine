import './forms';
import { formFieldsInit, formSubmit } from './forms';
import 'inputmask';
const form = () => {
  // form fields
  formFieldsInit({ viewPass: true });
  // submit form
  formSubmit();
  nameValidate();
  phoneMask();
  telValidate();
  // mailValidate();

  function nameValidate() {
    const name = document.querySelectorAll('.input--name');
    name.forEach((item) => {
      item.addEventListener('input', () => {
        const inputValue = item.value.trim();
        const span = item.parentElement.nextElementSibling;
        const parent = item.parentElement.parentElement;

        if (!/^[a-zA-Zа-яА-Я\s\-]+$/.test(inputValue) || inputValue == '') {
          span.classList.add('active');
          parent.classList.add('_form-error');
        } else {
          span.classList.remove('active');
          parent.classList.remove('_form-error');
        }
      });
      item.addEventListener('blur', () => {
        const inputValue = item.value.trim();
        const span = item.parentElement.nextElementSibling;
        const parent = item.parentElement.parentElement;

        if (!/^[a-zA-Zа-яА-Я\s\-]+$/.test(inputValue) || inputValue == '') {
          span.classList.add('active');
          parent.classList.add('_form-error');
        } else {
          span.classList.remove('active');
          parent.classList.remove('_form-error');
        }
      });
    });
  }
  function phoneMask() {
    const mask = new Inputmask('+7 (999) 999-99-99');
    mask.mask($('.phone-mask'));
  }
  function telValidate() {
    const tel = document.querySelectorAll('.input--tel');

    tel.forEach((item) => {
      item.addEventListener('input', () => {
        const inputValue = item.value.trim();
        const span = item.parentElement.nextElementSibling;
        const parent = item.parentElement.parentElement;

        if (!/^\+\d{1} \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(inputValue) && inputValue != '') {
          // span.classList.add('active');
          parent.classList.add('_form-error');
        } else if (inputValue.length < 16) {
          parent.classList.add('_form-error');
        } else {
          // span.classList.remove('active');
          parent.classList.remove('_form-error');
        }
      });
    });
  }
  function mailValidate() {
    const mail = document.querySelectorAll('.input--mail');

    mail.forEach((item) => {
      item.addEventListener('input', () => {
        const inputValue = item.value.trim();
        const span = item.parentElement.nextElementSibling;
        const parent = item.parentElement.parentElement;

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(inputValue) && inputValue != '') {
          // span.classList.add('active');
          parent.classList.add('_form-error');
        } else {
          // span.classList.remove('active');
          parent.classList.remove('_form-error');
        }
      });
    });
  }

  function setupFormListener(formSelector, submitButtonSelector) {
    const form = document.querySelector(formSelector);
    const submitButton = document.querySelector(submitButtonSelector);

    const formElements = form.querySelectorAll('input[data-required], textarea[data-required]');

    const formElementCheckbox = form.querySelectorAll('.popup__input-checkbox');
    const formElementsParents = form.querySelectorAll('.input-group');

    function updateSubmitButtonState() {
      const isEmpty = Array.from(formElements).some((element) => {
        return element.value.trim() === '';
      });
      const formError = Array.from(formElementsParents).some((element) => {
        return element.classList.contains('_form-error');
      });

      const formErrorCheckbox = Array.from(formElementCheckbox).some((element) => {
        return !element.checked;
      });

      if (isEmpty || formError || formErrorCheckbox) {
        submitButton.setAttribute('disabled', 'disabled');
      } else {
        submitButton.removeAttribute('disabled');
      }
    }

    formElements.forEach((element) => {
      element.addEventListener('input', updateSubmitButtonState);
    });

    updateSubmitButtonState();
  }

  setupFormListener('.popup__form--application', '.popup__btn--application');
  setupFormListener('.application__form', '.application__form-btn');
};

export default form;
