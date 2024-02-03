import { Item as ItemInterface } from '../interfaces/invoice';
export default class Itme implements ItemInterface{
  constructor({name='', quantity=0, price=0, total=0}) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.total = price * quantity;
  }
  name: string;
  quantity: number;
  price: number;
  total: number;
}