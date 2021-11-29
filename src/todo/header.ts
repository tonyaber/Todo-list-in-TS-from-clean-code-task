import Control from "../common/control";
import style from '../style/header.css';
import image from '../assets/eisenhower-matrix.jpg';

export default class Header extends Control{
  link: Control<HTMLLinkElement>;
  img: Control<HTMLImageElement>;
 
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', style.header, '');
   
    this.img = new Control<HTMLImageElement>(this.node, 'img');
    this.img.node.src = image;
    this.link = new Control<HTMLLinkElement>(this.node, 'a', style['more-inf'], 'Want more detail?');
    this.link.node.href = 'https://goal-life.com/page/method/matrix-eisenhower';
   
  }
}