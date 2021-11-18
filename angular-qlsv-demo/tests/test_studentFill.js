import { Selector, ClientFunction } from 'testcafe';
import studentFill from '../page_object/studentFill';

fixture `DatePicker`;

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
  });



/* test redirect to detail of student */
test
  .page `http://localhost:4200/list-student`
  ('Redirect to detail page', async (t)=>{
      await t
            .click(Selector('a').withAttribute('id', 'detail2'))
            .navigateTo('/detail/2')
            .click(Selector('input').withAttribute('name', 'fullName'))
            .wait(5000)
            .pressKey('ctrl+a backspace')
            .wait(5000)
            .typeText(Selector('input').withAttribute('name', 'fullName'), 'This action will be fill fullname!')
  });
