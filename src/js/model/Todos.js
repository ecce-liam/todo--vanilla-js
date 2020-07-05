import axios from 'axios';

export default class Todos {
  constructor() {
    this.list = [];
    this.pagination = {
      currentPage: 1,
      totalPages: 0,
      amountPerPage: 8,
      totalItems: 0,
    };
  }

  async getList() {
    try {
      const REQUEST = await axios.get('http://jsonplaceholder.typicode.com/todos');
      this.list = [...REQUEST.data];

      return this.list;
    } catch (e) {
      throw e;
    }
  }

  setPagination() {
    this.pagination.totalItems = this.list.length;
    this.pagination.totalPages = Math.ceil(this.list.length / this.pagination.amountPerPage);
  }

  paginationNavigation(targetPage) {
    this.pagination.currentPage = targetPage;

    return this.pagination.currentPage;
  }

  findTodoIndex(id) {
    return this.list.findIndex((el) => el.id === id);
  }

  async toggleTodoCompletion(id) {
    if (this.findTodoIndex(id) > -1) {
      try {
        const RESPONSE = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          completed: !this.list[this.findTodoIndex(id)].completed,
        });

        this.list[this.findTodoIndex(id)].completed = RESPONSE.data.completed;

        return RESPONSE.data;
      } catch (e) {
        throw e;
      }
    }
  }

  async formSubmission(textarea = '', select = true, number = 1) {
    if (textarea.length > 0) {
      try {
        const RESPONSE = await axios.post(`https://jsonplaceholder.typicode.com/todos`, {
          title: textarea,
          completed: Boolean(select),
          userId: Number(number),
        });

        this.list.push(RESPONSE.data);

        return RESPONSE.data;
      } catch (e) {
        throw e;
      }
    } else {
      return false;
    }
  }
}
