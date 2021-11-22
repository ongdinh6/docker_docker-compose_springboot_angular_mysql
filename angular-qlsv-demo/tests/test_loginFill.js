import { Selector } from "testcafe";
import loginFill from "../page_object/loginFill";

fixture `Login Page Test Suite`
    .page (`http://localhost:4200/login-page`);

test("Verify login should be successful", async (t) => {
  await loginFill.typeEmail('kiem.thu@gmail.com');
  await loginFill.typePassword('123abcA@');
  await loginFill.submitLogin();
  await t.navigateTo('/list-student');
  await t.takeScreenshot();
  await t.wait(1000);
});

test('Verify login should be failed with do not fill the login form', async (t) =>{
  await loginFill.submitLogin();
  await t.expect(Selector('.error').innerText).eql('Email or password is incorrect!');
  await t.takeScreenshot();
  await t.wait(1000);
});
 
test('Verify login should be failed with email or password is incorrect', async t => {
  await loginFill.typeEmail('kiem.thu@gmail.com');
  await loginFill.typePassword('123abcA@123');
  await loginFill.submitLogin();
  await t.expect(Selector('.error').innerText).eql('Email or password is incorrect!');
  await t.takeScreenshot();
  await t.wait(1000);
});
