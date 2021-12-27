import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import ContactForm from "../ContactForm/ContactForm.jsx";
import Filter from "../SearchFilter/SearchFilter.jsx";
import ContactList from "../ContactList/ContactList.jsx";
import {
  contactsActions,
  contactsOperations,
  contactsSelectors,
} from "../../redux/contactSlice";

const { getContacts, addContact, deleteContact } = contactsOperations;

const App = () => {
  const contacts = useSelector(contactsSelectors.getContacts);
  const filter = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const addNewContact = (name, number) => {
    const contactName = { name, number, id: nanoid() };
    const normalizedName = name.toLowerCase();
    const duplicateName = contacts.find(
      (contact) => contact.name.toLowerCase() === normalizedName
    );

    if (duplicateName) {
      alert(`${name} is already in contacts.`);
      return;
    }
    if (name === "") {
      alert("Please type your info in the field. It is empty.");
    } else {
      dispatch(addContact(contactName));
    }
  };

  const removeContact = (id) => {
    dispatch(deleteContact(id));
  };

  const filterContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const updateFilter = (event) => {
    dispatch(contactsActions.updateFilter(event.currentTarget.value));
  };

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addNewContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={updateFilter} />
        <ContactList contacts={filterContacts()} onClick={removeContact} />
      </div>
    </>
  );
};

export default App;
