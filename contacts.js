import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');

const updateContacts = contacts =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
  // ...твій код. Повертає масив контактів.
}
export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);
  return contact || null;
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

export async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
  // ...твій код. Повертає об'єкт доданого контакту.
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}; 