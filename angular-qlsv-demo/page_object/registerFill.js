import { Selector, t } from "testcafe";

class registerFill {
  constructor() {
    this.fullNameRegistry = Selector("input").withAttribute(
      "name",
      "full-name"
    );
    this.emailRegistry = Selector("input").withAttribute("type", "email");
    this.passwordRegistry = Selector("input").withAttribute("name", "password");
    this.rePasswordRegistry = Selector("input").withAttribute(
      "name",
      "rePassword"
    );
    this.addressRegistry = Selector("input").withAttribute("name", "address");
  }

  async typeFullName(name) {
    await t.typeText(this.fullNameRegistry, name);
  }
  async typeEmail(mail) {
    await t.typeText(this.emailRegistry, mail);
  }
  async typePassword(pass) {
    await t.typeText(this.passwordRegistry, pass);
  }
  async typeRePassword(pass) {
    await t.typeText(this.rePasswordRegistry, pass);
  }
  async typeAddress(address) {
    await t.typeText(this.addressRegistry, address);
  }

  async submitRegister() {
    await t
      .click(Selector("form"))
      .click(Selector("button").withText("Register"));

  }
}

export default new registerFill();
