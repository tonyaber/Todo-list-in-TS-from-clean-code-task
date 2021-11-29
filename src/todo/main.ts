import Control from '../common/control';
import style from '../style/main.css';
import AddNewTask from './add-new-task';
import TodoList from './todo-list';
import Completed from './completed';
import Model from './model';

export default class Main extends Control{
  constructor(parentNode: HTMLElement, model:Model) {
    super(parentNode, 'main', style.main);
    const addNewTask = new AddNewTask(this.node, model);
    const todoListLabel = new Control(this.node, 'h3', '', 'Todo');
    const todoList = new TodoList(this.node, model);
    const CompletedList = new Control(this.node, 'h3', '', 'Completed');

    const completedList = new Completed(this.node, model);
  }
}