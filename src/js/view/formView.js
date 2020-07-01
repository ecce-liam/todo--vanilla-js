import { ELEMENTS } from './base';

export const addLoadingState = () => {
  ELEMENTS.todoForm.insertAdjacentHTML(
    'afterbegin',
    `<div id="todo-form__loading" class="spinner-border text-success position-absolute todo-form__loading" role="status" style="top: 50%; left: 50%; margin: -16px 0 0 -16p; z-index:5;"><span class="sr-only">Loading...</span></div>`
  );
};

export const removeLoadingState = () => {
  ELEMENTS.todoForm.removeChild(document.getElementById('todo-form__loading'));
};

export const clearFields = () => {
  ELEMENTS.todoFormDescription.value = '';
  ELEMENTS.todoFormIsComplete.value = 'true';
  ELEMENTS.todoFormUser.value = '1';
};

export const addUsersForm = (users) => {
  ELEMENTS.todoFormUser.insertAdjacentHTML('afterbegin', `${users.map((user) => `<option value="${user.id}">${user.name}</option>`).join('')}`);
};
