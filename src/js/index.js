import Todos from './model/Todos';
import * as todosView from './view/todosView';
import { ELEMENTS } from './view/base';

const STATE = {
  todos: new Todos(),
};

window.addEventListener('load', async () => {
  todosView.addLoadingState();

  try {
    await STATE.todos.getList();
    await STATE.todos.setPagination();
    await todosView.renderTodos(STATE.todos.list, STATE.todos.pagination);
  } catch (e) {
    console.error(e);
  }
});

ELEMENTS.todoList.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.matches('.js-pagination-button')) {
    STATE.todos.paginationNavigation(Number(e.target.dataset.pagination));
    todosView.renderTodos(STATE.todos.list, STATE.todos.pagination);
  }
});
