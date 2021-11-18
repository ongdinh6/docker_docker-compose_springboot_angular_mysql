import { Selector } from "testcafe";
import loginFill from "../page_object/loginFill";
import registerFill from "../page_object/registerFill";
import studentFill from "../page_object/studentFill";

fixture`Login Page Test Suite`;

/* login page test */
test
  .page `http://localhost:4200/login-page`
  ("Fill login form", async (t) => {
  await loginFill.typeEmail("kiem.thu@gmail.com");
  await loginFill.typePassword("123abcA@");
  await loginFill.submitLogin();
});

test
  .page `http://localhost:4200/login-page`
  ("Verify does not fill login form",
  async (t) => {
    await loginFill.submitLogin();
    await t
      .expect(Selector(".error").innerText)
      .eql("Email or password is incorrect!");
    await t.wait(1000);
  }
);

test
  .page `http://localhost:4200/login-page`
  ("Verify login failed",
  async (t) => {
    await loginFill.typeEmail("kiem.thu@gmail.com");
    await loginFill.typePassword("123abcA@123");
    await loginFill.submitLogin();
    await t
      .expect(Selector(".error").innerText)
      .eql("Email or password is incorrect!");
    await t.wait(1000);
  }
);

/* register account */
test
  .page `http://localhost:4200/register-page`
  ("Verify register failed",
  async (t) => {
    await registerFill.typeFullName("test");
    await registerFill.typeEmail("emailRegistry");
    await registerFill.typePassword("passwordRegistry");
    await registerFill.typeRePassword("rePasswordRegistry");
    await registerFill.typeAddress("addressRegistry");
    await registerFill.submitRegister();
    await t.expect(Selector(".errors").innerText).notEql("");
  }
);

const fullNameRegistry = "TestCafe Name";
const emailRegistry = "testcafe.test@gmail.com";
const passwordRegistry = "123abcA@";
const rePasswordRegistry = "123abcA@";
const addressRegistry = "Ben Tre";

test
  .page `http://localhost:4200/register-page`
  ("Verify register successful", async (t) => {
  await registerFill.typeFullName(fullNameRegistry);
  await registerFill.typeEmail(emailRegistry);
  await registerFill.typePassword(passwordRegistry);
  await registerFill.typeRePassword(rePasswordRegistry);
  await registerFill.typeAddress(addressRegistry);
  await registerFill.submitRegister();
});

test
 .page `http://localhost:4200/register-page`
 ("Verify register failed", async (t) => {
  await registerFill.typeFullName(fullNameRegistry);
  await registerFill.typeEmail(emailRegistry);
  await registerFill.typePassword(passwordRegistry);
  await registerFill.typeRePassword(rePasswordRegistry);
  await registerFill.typeAddress(addressRegistry);
  await registerFill.submitRegister();
});

/* create new student */
test
  .page `http://localhost:4200/list-student`
  ('Verify add new student successful', async (t)=>{
    await studentFill.typeFullName();
    await studentFill.selectDate();
    await studentFill.typeAddress();
    await studentFill.submitSave();
  });
