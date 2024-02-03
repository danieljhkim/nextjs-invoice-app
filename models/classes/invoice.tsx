import { Address, Invoice as InvoiceInterface, Item, Status } from '../interfaces/invoice';
import ItemClass from './item';
import AddressClass from './address';

export const generateId = ():string => {
  const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeric = '0123456789';  
  const newAr = [];
  for (let i = 0; i < 6; i++) {
    if (i < 2) {
      newAr.push(alph.charAt(Math.random() * alph.length));
    } else {
      newAr.push(numeric.charAt(Math.random() * numeric.length));
    }
  }
  return newAr.join('');
}

export default class Invoice implements InvoiceInterface {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: Status;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
  constructor({
      id='', 
      createdAt=new Date().toString(), 
      clientName='', 
      clientEmail='', 
      status='draft', 
      total=0, 
      paymentTerms=0, 
      description='', 
      paymentDue='',
      items=[new ItemClass({})],
      senderAddress=new AddressClass({}),
      clientAddress=new AddressClass({}),
  }) {
    this.createdAt = createdAt;
    this.clientName = clientName;
    this.clientEmail = clientEmail;
    this.status = status as Status;
    this.items = items;
    this.total = items.reduce((a, b) => a + b.total, 0);
    this.paymentTerms = paymentTerms;
    this.description = description;
    this.paymentDue = paymentDue;
    this.id = id ? id : generateId();
    this.clientAddress = clientAddress;
    this.senderAddress = senderAddress;
  }

}