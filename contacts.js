const { v4 } = require('uuid');
const fs = require("fs").promises;

const contactsPath = "./db/contacts.json";

async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    return contacts;
}

async function getContactById(contactId) {
    const contacts = await listContacts();

    const result = contacts.find(({ id }) => id === contactId);
    if (!result) return null;

    return result;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const removedIndex = contacts.findIndex(({ id }) => id === contactId);

    if (removedIndex === -1) return null;
    const [removeContact] = contacts.splice(removedIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return removeContact;
}

async function addContact({ name, email, phone }) {
    const contacts = (await listContacts()) || [];
    const newContact = { id: v4(), name, email, phone  };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};