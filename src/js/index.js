import State from './model/State';
import * as formView from './view/formView';
import * as todosView from './view/todosView';
import { ELEMENTS } from './view/base';

const STATE = new State();

window.addEventListener('load', async () => {
  formView.addLoadingState();
  todosView.addLoadingState();

  try {
    await STATE.users.getList();
    formView.addUsersForm(STATE.users.list);
    await STATE.todos.getList();
    STATE.todos.setPagination();
    todosView.renderTodos(STATE.todos.list, STATE.todos.pagination);
  } catch (e) {
    console.error(e);
  } finally {
    formView.removeLoadingState();
  }
});

ELEMENTS.todoFormToggler.addEventListener('click', (e) => {
  e.preventDefault();

  formView.formContainerToggle();
});

ELEMENTS.todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  formView.addLoadingState();
  todosView.addLoadingState();

  try {
    await STATE.todos.formSubmission(
      ELEMENTS.todoFormDescription.value,
      ELEMENTS.todoFormIsComplete.value,
      ELEMENTS.todoFormUser.value
    );
    STATE.todos.setPagination();
    todosView.renderTodos(STATE.todos.list, STATE.todos.pagination);
  } catch (e) {
    console.error(e);
  } finally {
    formView.clearFields();
    formView.removeLoadingState();
  }
});

ELEMENTS.todoList.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    if (e.target.matches('.js-pagination-button')) {
      await STATE.todos.paginationNavigation(Number(e.target.dataset.pagination));
      await todosView.renderTodos(STATE.todos.list, STATE.todos.pagination);
    } else if (e.target.matches('.js-todo-item')) {
      todosView.addLoadingState();
      await STATE.todos.toggleTodoCompletion(Number(e.target.dataset.id));
      await todosView.renderTodos(STATE.todos.list, STATE.todos.pagination);
    }
  } catch (e) {
    console.error(e);
  }
});
