import { createSelector } from "@reduxjs/toolkit";

const getFilter = (state) => state.phonebook.filter;

const getAllContacts = (state) => state.phonebook.contacts;

const getVisibleContacts = createSelector(
  [getAllContacts, getFilter],

  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllContacts, getFilter, getVisibleContacts };
