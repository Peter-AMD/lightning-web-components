import { LightningElement } from 'lwc';

export default class Hello extends LightningElement {
  greeting = 'World';

  handleInput(event) {
    this.greeting = event.target.value;
  }
}
