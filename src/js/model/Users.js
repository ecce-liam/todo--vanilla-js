import axios from 'axios';

export default class Users {
  constructor() {
    this.list = [];
  }

  async getList() {
    try {
      const REQUEST = await axios.get('http://jsonplaceholder.typicode.com/users');
      this.list = [...REQUEST.data];

      return this.list;
    } catch (e) {
      throw e;
    }
  }
}
