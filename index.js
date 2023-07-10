const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    } = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const allContacts = await listContacts();
            console.table(allContacts);
            break;

        case "get":
            const contact = await getContactById(id);
            console.log(contact);
            if(!contact) {
                throw new Error(`Product with id=${id} not found!`)
            }
            break;

        case "add":
            const addNewContact = await addContact({ name, email, phone });
            console.log("addNewContact: ", addNewContact);
            break;

        case "remove":
            const removeOldContact = await removeContact(id);
            console.log("removeOldContact : ", removeOldContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
        }
};

invokeAction(argv);