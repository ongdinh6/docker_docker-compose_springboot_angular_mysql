import { Selector, ClientFunction } from 'testcafe';
import studentFill from '../page_object/studentFill';

fixture `Student Detail Page Test Suite`;

const setValue = ClientFunction(value => getEl().value = value);
const input = Selector('input[name="birthDay"]');

test
  .page `http://localhost:4200/list-student`
  ('Use ClientFunction', async t => {
    await studentFill.typeFullName('Nguyen Sinh Vien');
    await setValue.with({ dependencies: { getEl: input } })('2017-05-05');

    // await t
    //     .pressKey('tab')
    //     .expect(input.value).eql('2017-05-05');
    await studentFill.typeAddress('Binh Duong');
    await studentFill.submitSave();
    await t.takeScreenshot();
  });



/* test redirect to detail of student */
test
  .page `http://localhost:4200/list-student`
  ('Redirect and fill form student info on detail page', async (t)=>{
      await t
            .click(Selector('a').withAttribute('id', 'detail2'))
            .navigateTo('/detail/2')
            // .click(Selector('input').withAttribute('name', 'fullName'))
            // .wait(1000)
            // .pressKey('ctrl+a backspace')
            // .wait(1000)
            .typeText(Selector('input').withAttribute('name', 'fullName'), 'Hoang Nguyen Khoi', {replace:true})
            .click(Selector('input').withAttribute('name', 'birthDay'))
            .wait(1000)
            // .pressKey('ctrl+a backspace')
            // .wait(1000)
            .typeText(Selector('input').withAttribute('name', 'birthDay'), '11/07/1998', {replace:true})
            .click(Selector('input').withAttribute('name', 'address'))
            .wait(1000)
            // .pressKey('ctrl+a backspace')
            // .wait(1000)
            .typeText(Selector('input').withAttribute('name', 'address'), 'Hai Phong', {replace:true})
            .wait(1000)
            .click(Selector('form'))
            .setNativeDialogHandler(()=>true)
            .click(Selector('button').withText('Edit'))
            .wait(1000);
  });

  test
  .page `http://localhost:4200/list-student`
  ('FullName is not fill', async (t)=>{
      await t
            .click(Selector('a').withAttribute('id', 'detail2'))
            .navigateTo('/detail/2')
            .click(Selector('input').withAttribute('name', 'fullName'))
            .wait(1000)
            .pressKey('ctrl+a backspace')
            .wait(1000)
            .click(Selector('form'))
            .click(Selector('button').withText('Edit'))
            .wait(1000)
            .expect(Selector('.errorFullName').innerText).notEql(' ')
            .wait(1000);
  });

  test
  .page `http://localhost:4200/list-student`
  ('Error birth day does not match pattern', async (t)=>{
      await t
            .click(Selector('a').withAttribute('id', 'detail2'))
            .navigateTo('/detail/2')
            .click(Selector('input').withAttribute('name', 'birthDay'))
            .wait(1000)
            .pressKey('ctrl+a backspace')
            .wait(1000)
            .typeText(Selector('input').withAttribute('name', 'birthDay'), '11-10-1999')
            .click(Selector('form'))
            .click(Selector('button').withText('Edit'))
            .wait(1000)
            .expect(Selector('.errorBirthDay').innerText).eql('Date of birth must be matched with format "mm/dd/yyyy"')
            .wait(1000);
  });
