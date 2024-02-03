import { Address as AddressInterface } from '../interfaces/invoice';

export default class Address implements AddressInterface {
  street: string;
  city: string;
  postCode: string;
  country: string;
  constructor({street="", city="", postCode="", country=""}) {
    this.street = street;
    this.city = city;
    this.postCode = postCode;
    this.country = country;
  }
}