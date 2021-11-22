import { Selector, t} from 'testcafe';

fixture `Router Link Test Suite On Header Bar`
    .page (`http://localhost:4200`);

test("Router link should be accessible", async (t) => {
  await t.click(Selector('a').withText('Login')).navigateTo("/login-page").takeScreenshot().wait(1000);
  await t.click(Selector('a').withText('Register')).navigateTo("/register-page").takeScreenshot().wait(1000);
});

