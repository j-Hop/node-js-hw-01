import yargs from 'yargs';
import {
  getContactById,
  listContacts,
  addContact,
  removeContact,
} from './contacts.js';

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      return console.table(allContacts);
      break;
    case 'get':
      const oneContact = await getContactById(id);
      return console.log(oneContact);
      break;
    case 'add':
      const addNewContact = await addContact({ name, email, phone });
      return console.log(addNewContact);
      break;
    case 'remove':
      const deleteContact = await removeContact(id);
      return console.log(deleteContact);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: 'vza2RIzNGIwutCVCs4mCL' });
// invokeAction({
//   action: 'add',
//   name: 'Mango ',
//   email: 'mango@gmail.com',
//   phone: '322-22-22',
// });
// invokeAction({ action: 'remove', id: 'vza2RIzNGIwutCVCs4mCL' });
const { argv } = yargs(process.argv.slice(2));
invokeAction(argv);