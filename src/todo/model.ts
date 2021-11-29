import IData from './interface';
import Signal from '../common/signal';

export default class Model{
  private _data: IData[];
  private _dataChecked: IData[];
  private _lastId: number = 0;
  onUpdate: Signal<void> = new Signal();

  constructor(data:IData[]) {
    this._data = data.map(item => this.loadTask(item)).filter(item => !item.isPassed);
    this._dataChecked =data.map(item => this.loadTask(item)).filter(item => item.isPassed);
    
  }

  nextId() {
    this._lastId++;
    return this._lastId;
  }

  addNewTask(data: string) {
    this._data.push({
      name: data,
      isPassed: false,
      id: this.nextId()
    });
    this.onUpdate.emit(null);
  }

  delete(id:number) {
    this._data = this._data.filter(item => item.id !== id);
    this._dataChecked = this._dataChecked.filter(item => item.id !== id);
    this.onUpdate.emit(null);
  }

  edit(id: number, text: string) {
    this._data.filter(item => item.id === id).map(item => item.name = text);
    this._dataChecked.filter(item => item.id === id).map(item => item.name = text);
    this.onUpdate.emit(null);
  }

  changeState(id: number, value: string, isPassed: boolean) {
    if (isPassed) {
      this._dataChecked = this._dataChecked.filter(item => item.id !== id);
      this._data.push({
        name: value,
        isPassed: true,
        id: id
      });
    }
    else {
      this._data = this._data.filter(item => item.id != id);
      this._dataChecked.push({
        name: value,
        isPassed: true,
        id: id
      });
    }
    this.onUpdate.emit(null);
  }

  loadTask(data: IData) {
    return { ...data, id: this.nextId() };
  }

  getData() {
    return this._data;
  }

  getDataChecked() {
    return this._dataChecked;
  }
}