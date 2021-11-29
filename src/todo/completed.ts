import Control from '../common/control';
import style from '../style/todo-list.css';
import Model from './model';
import IData from './interface';
import Todo from './todo-task'

export default class Completed extends Control {
  private _todoList: Todo[] = [];
  model: Model;
  
  constructor(parentNode:HTMLElement, model:Model) {
    super(parentNode, 'ul', style['compl-tasks']);
    model.onUpdate.add(() => {
        this.update(model);
    })
  
  this.update(model);
    this.model = model;
  }

  update(model: Model) {    
    this.createTodo(model.getDataChecked());    
  }

  createTodo(data: IData[]) {
    while (data.length < this._todoList.length) {
      const item = this._todoList.pop();
      item.destroy();
    }
    while (data.length > this._todoList.length) {
      const todo = new Todo(this.node);
      todo.onChangeState = (id, text) => {
        this.model.changeState(id, text, true);
      }
      todo.onDelete = (id) => {
          this.model.delete(id)
      }
      todo.onEdit = (id, value) => {
       this.model.edit(id, value)
      }
       this._todoList.push(todo);
    }

    data.forEach((element, index) => {
      this._todoList[index].update(element);    
    });
  }
}