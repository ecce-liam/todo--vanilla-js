import { ELEMENTS } from './base';

export const addLoadingState = () => {
  ELEMENTS.todoList.innerHTML = `<div class="spinner-border text-success todo-list__loading" role="status"><span class="sr-only">Loading...</span></div>`;
};

const renderSingleTodo = (item) => {
  return `<button type="button" class="list-group-item list-group-item-action ${
    item.completed === true ? 'list-group-item-success' : 'list-group-item-secondary'
  } js-todo-item" data-id="${item.id}">${item.title}</button>`;
};

const renderTodosList = (list, pagination) => {
  if (list.length > 0) {
    return `<div class="list-group" style="min-height: 393px;">${list
      .map((el, i) => {
        const BOTTOM_VALUE_IN_PAGE = pagination.currentPage * pagination.amountPerPage - pagination.amountPerPage;
        const TOP_VALUE_IN_PAGE = pagination.currentPage * pagination.amountPerPage - 1;

        if (i >= BOTTOM_VALUE_IN_PAGE && i <= TOP_VALUE_IN_PAGE) {
          return renderSingleTodo(el);
        }
      })
      .join('')}</div>`;
  } else {
    return `<div class="list-group"><p class="list-group-item">You currently have no todos. Why not try adding some above.</p></div>`;
  }
};

const renderPaginationButtons = (pagination) => {
  const PREVIOUS = `<li class="page-item"><button class="page-link js-pagination-button" data-pagination="${
    pagination.currentPage - 1
  }"><<span class="sr-only">(previous)</span></button></li>`;
  const CURRENT = `<li class="page-item"><a class="page-link" href="#" tabindex="-1" aria-disabled="true" disabled>${pagination.currentPage}<span class="sr-only">(current)</span></a></li>`;
  const NEXT = `<li class="page-item"><button class="page-link js-pagination-button" data-pagination="${
    pagination.currentPage + 1
  }">><span class="sr-only">(next)</span></button></li>`;

  return `${pagination.currentPage > 1 ? PREVIOUS : ''}${CURRENT}${pagination.currentPage < pagination.totalPages ? NEXT : ''}`;
};

const renderPaginationGroup = (pagination) => {
  return `<nav class="mt-3"><ul class="pagination justify-content-center">${renderPaginationButtons(pagination)}</ul></nav>`;
};

export const renderTodos = (list, pagination) => {
  const LIST = renderTodosList(list, pagination);
  const PAGINATION = renderPaginationGroup(pagination);

  ELEMENTS.todoList.innerHTML = `${LIST}${PAGINATION}`;
};
