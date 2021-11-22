import { Selector, ClientFunction } from 'testcafe';
import studentFill from '../page_object/studentFill';

fixture (`Student Detail Page Test Suite`);

const setValue = ClientFunction(value => getEl().value = value);
const input = Selector('input[name="birthDay"]');

/* will be failed because datetime picker is not correct payload request */
test
  .page (`http://localhost:4200/list-student`)
  ('Verify add new student should be successful', async t => {
    await studentFill.typeFullName('Nguyen Sinh Vien');
    await setValue.with({ dependencies: { getEl: input } })('2017-05-05');
    await t
        .pressKey('tab')
        .expect(input.value).eql('2017-05-05');
    await studentFill.typeAddress('Binh Duong');
    await studentFill.submitSave();
    await t.takeScreenshot();
    await t.wait(1000);
  });



/* test redirect to detail of student */
test
  .page (`http://localhost:4200/list-student`)
  ('Verify edit a student has id 1 should be successful', async (t)=>{
      await t
            .click(Selector('a').withAttribute('id', 'detail1'))
            // .navigateTo('/detail/1')
            .click(Selector('input').withAttribute('name', 'fullName'))
            .wait(1000)
            .pressKey('ctrl+a backspace')
            .wait(1000)
            .typeText(Selector('input').withAttribute('name', 'fullName'), 'Hoang Nguyen Khoi')
            .click(Selector('input').withAttribute('name', 'birthDay'))
            .wait(1000)
            .pressKey('ctrl+a backspace')
            .wait(1000)
            .typeText(Selector('input').withAttribute('name', 'birthDay'), '11/07/1998')
            .click(Selector('input').withAttribute('name', 'address'))
            .wait(1000)
            .pressKey('ctrl+a backspace')
            .wait(1000)
            .typeText(Selector('input').withAttribute('name', 'address'), 'Hai Phong')
            .wait(1000)
            .click(Selector('form'))
            .setNativeDialogHandler(()=>true)
            .click(Selector('button').withText('Edit'))
            .takeScreenshot()
            .wait(1000);
  });

  test
  .page `http://localhost:4200/list-student`
  ('Verify edit a student info should be failed with do not fill full name', async (t)=>{
      await t
            .click(Selector('a').withAttribute('id', 'detail1'))
            // .navigateTo('/detail/1')
            .click(Selector('input').withAttribute('name', 'fullName'))
            .wait(1000)
            .pressKey('ctrl+a backspace')
            .wait(1000)
            .click(Selector('form'))
            .click(Selector('button').withText('Edit'))
            .wait(1000)
            .expect(Selector('.errorFullName').innerText).notEql(' ')
            .takeScreenshot()
            .wait(1000);
  });

  test
  .page `http://localhost:4200/list-student`
  ('Verify edit a student info should be failed with birth day value do not match the pattern', async (t)=>{
      await t
            .click(Selector('a').withAttribute('id', 'detail1'))
            // .navigateTo('/detail/1')
            .click(Selector('input').withAttribute('name', 'birthDay'))
            .wait(1000)
            .pressKey('ctrl+a backspace')
            .wait(1000)
            .typeText(Selector('input').withAttribute('name', 'birthDay'), '11-10-1999')
            .click(Selector('form'))
            .click(Selector('button').withText('Edit'))
            .wait(1000)
            .expect(Selector('.errorBirthDay').innerText).eql('Date of birth must be matched with format "mm/dd/yyyy"')
            .takeScreenshot()
            .wait(1000);
  });
