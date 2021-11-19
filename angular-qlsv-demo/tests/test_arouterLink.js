import { Selector, t} from 'testcafe';

fixture `Router Link Test Suite`
    .page `http://localhost:4200`;

test("Router link should be accessible", async (t) => {
  await t.click(Selector('a').withText('Login')).navigateTo("/login-page").wait(1000);
  await t.click(Selector('a').withText('Register')).navigateTo("/register-page").wait(1000);
});

