import {Selector, t} from 'testcafe';

/* this class is login form on page login */
class loginFill {

  constructor(){
    this.email = Selector('#emailTxt');
    this.password = Selector('#passwordTxt');
    this.loginBtn = Selector('#loginBtn');
  }

  async typeEmail(email) {
    await t
     .typeText(this.email, email);
  }

  async typePassword(password) {
    await t
      .typeText(this.password, password);
  }

  async submitLogin(){
    await t
      .click(Selector('.form-group'))
      .click(Selector('button').withText('Login'));
  }


}
export default new loginFill();
