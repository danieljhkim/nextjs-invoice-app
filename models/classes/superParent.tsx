

export default class SuperParent {
  self: this;
  constructor() {
    this.self = this;
  }
  isFull = () => {
    for (const [key, value] of Object.entries(this.self)) {
      if (value === undefined || value === '') {
        return false;
      }
    }
  }
}