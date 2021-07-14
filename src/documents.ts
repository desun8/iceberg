import { worker } from './mocks/browser';
import core from './core';
import form from './scripts/pages/documents/form';
import { loadRecaptcha } from './scripts/form/loadRecaptcha';

core();
loadRecaptcha()
form();

worker.start();

// Fill form
(() => {
  const form = document.querySelector('.document-form');
  const inputElms = form?.querySelectorAll('input');

  inputElms?.forEach((input) => {
    switch (input.name) {
      case 'lastname':
        input.value = 'Иванов';
        break;
      case 'name':
        input.value = 'Иван';
        break;
      case 'patronymic':
        input.value = 'Иванович';
        break;
      case 'birthday':
        input.value = '1993-02-08';
        break;
      case 'email':
        input.value = 'example@mail.com';
        break;
      case 'phone':
        input.inputmask!.setValue('1231231231');
        break;
      case 'series':
        input.value = '1234';
        break;
      case 'number':
        input.value = '123456';
        break;
      case 'document-release':
        input.value = '2008-06-14';
        break;
      case 'document-issued':
        input.value = 'кем выдан';
        break;
      case 'document-registration-address':
        input.value = 'адрес регистрации';
        break;
      case "document-same-residence":
        input.checked = true;
        break;
      case "document-residence":
        input.value = "адрес проживания"
        break;
      default:
        break;
    }
  });
})();
