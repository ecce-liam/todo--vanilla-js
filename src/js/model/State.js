import Users from './Users';
import Todos from './Todos';

export default class State {
  constructor() {
    this.users = new Users();
    this.todos = new Todos();
  }
}
