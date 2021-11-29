import Control from "../common/control";
import image from '../assets/remove.svg';
import style from '../style/todo-list.css';
import Model from "./model";
import IData from "./interface";

export default class Todo extends Control{
  onEdit: (id:number, text: string) => void;
  onDelete: (id: number) => void;
  onChangeState: (id: number, text: string) => void;
  label: Control<HTMLLabelElement>;
  text: Control<HTMLInputElement>;  
  saveBtn: Control<HTMLButtonElement>;
  private id: number;
 
  
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'li');
    
    const checkbox = new Control<HTMLInputElement>(this.node, 'input', '');
    checkbox.node.type = 'checkbox';
    checkbox.node.onchange = () => {
      checkbox.node.checked = false;
      this.onChangeState(this.id, this.label.node.textContent);
    }
    this.label = new Control<HTMLLabelElement>(this.node, 'label', style.task, '');
    this.text = new Control<HTMLInputElement>(this.node, 'input', style.text);
    this.saveBtn = new Control<HTMLButtonElement>(this.node, 'button', '', 'Edit');
    this.saveBtn.node.onclick = () => {
      this.changeStyle();
      this.text.node.value = this.label.node.textContent;
      this.saveBtn.node.onclick = () => {
        this.changeStyle();
        this.onEdit(this.id, this.text.node.value);
       }      
    }
    const deleteBtn = new Control<HTMLButtonElement>(this.node, 'button', style.delete);
    deleteBtn.node.onclick = () => {
      this.onDelete(this.id);
    }
    const deleteImage = new Control<HTMLImageElement>(deleteBtn.node, 'img');
    deleteImage.node.src = image;
  }

  update(element: IData) {    
    this.label.node.textContent = element.name;
    this.id = element.id;
  }

  changeStyle(){
    this.label.node.classList.toggle(style['edit-mode_label']);
    this.text.node.classList.toggle(style['edit-mode_input']);
    this.saveBtn.node.textContent = this.saveBtn.node.textContent === 'Edit' ?
      'Save' : 'Edit';
  }
}