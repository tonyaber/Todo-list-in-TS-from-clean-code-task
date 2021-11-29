import Control from "../common/control";
import style from '../style/add-new-task.css';
import Model from "./model";

export default class AddNewTask extends Control{
  label: Control<HTMLLabelElement>;
  container: Control<HTMLElement>;
  text: Control<HTMLInputElement>;
  button: Control<HTMLButtonElement>;

  constructor(parentNode: HTMLElement, model:Model) {
    super(parentNode, 'div', 'top-section');
    
    this.label = new Control<HTMLLabelElement>(this.node, 'label', '', 'Add Item');
    this.label.node.htmlFor = 'new-task';

    this.container = new Control(this.node, 'div', style['task-row-wrap']);
    this.text = new Control<HTMLInputElement>(this.container.node, 'input', 'task');
    this.text.node.id = style['new-task'];
    this.button = new Control<HTMLButtonElement>(this.container.node, 'button', '', 'Add');
    this.button.node.onclick = () => {
      model.addNewTask(this.text.node.value);
      this.text.node.value = '';
    }
  }
}