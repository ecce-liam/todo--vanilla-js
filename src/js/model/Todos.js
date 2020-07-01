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
      console.error(e);
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
}
