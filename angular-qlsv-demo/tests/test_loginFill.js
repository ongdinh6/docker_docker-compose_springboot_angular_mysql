import { Selector } from "testcafe";
import loginFill from "../page_object/loginFill";

fixture `Login Page Test Suite`
    .page `http://localhost:4200/login-page`;

test("Fill login form", async (t) => {
  await loginFill.typeEmail('kiem.thu@gmail.com');
  await loginFill.typePassword('123abcA@');
  await loginFill.submitLogin();
  await t.navigateTo('/list-student');
  await t.wait(1000);
});

test('Verify does not fill login form', async (t) =>{
  await loginFill.submitLogin();
  await t.expect(Selector('.error').innerText).eql('Email or password is incorrect!');
  await t.wait(1000);
});

test('Verify login failed', async t => {
  await loginFill.typeEmail('kiem.thu@gmail.com');
  await loginFill.typePassword('123abcA@123');
  await loginFill.submitLogin();
  await t.expect(Selector('.error').innerText).eql('Email or password is incorrect!');
  await t.wait(1000);
});
