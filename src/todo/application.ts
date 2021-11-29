import Control from "../common/control"
import Header from './header';
import Main from './main';
import initialData from './initialData';
import Model from './model';

export default class Application extends Control{
  constructor(parentNode:HTMLElement) {
    super(parentNode);
    const data = new initialData();
    const model = new Model(data.getData());
    const header = new Header(this.node);
    const main = new Main(this.node, model);
  }
}

