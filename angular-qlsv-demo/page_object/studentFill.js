import {Selector, t} from 'testcafe';

class studentFill {

  constructor() {
    this.fullName = Selector('input').withAttribute('name', 'fullName');
    this.birthDate = Selector('input').withAttribute('type', 'date');
    this.address = Selector('input').withAttribute('name', 'address');
  }

  async typeFullName(fullName) {
    await t.typeText(this.fullName, fullName);
  }
  async typeAddress(address) {
    await t.typeText(this.address, address);
  }
  /* select datetime */
  async selectDate(){
    await t.expect(this.birthDate.val).eql('1999-09-09');
  }

  async submitSave() {
    await t
          .click(Selector('form'))
          .click(Selector('button').withText('Save'));
  }
}

export default new studentFill();
