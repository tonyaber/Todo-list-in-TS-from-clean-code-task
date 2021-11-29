import IData from './interface';
const TODO_LIST = [
      {
        name: 'Pay Bills',
        isPassed: false
      },
      {
        name:'Go Shopping',
        isPassed: false
      },
      {
        name: 'See the Doctor',
        isPassed: true
      }    
    ]

export default class initialData{
  public _todoData: IData[];

  constructor(){
    this._todoData = TODO_LIST;
  }

  getData() {
    return this._todoData;
  }
}