import { useState, useEffect, useCallback } from 'react';

    export const useContacts = (predefinedContactsData, requestPasswordCallback, toast) => {
      const [contacts, setContacts] = useState([]);
      const [showAddModal, setShowAddModal] = useState(false);
      const [showEditModal, setShowEditModal] = useState(false);
      const [currentContact, setCurrentContact] = useState(null);
      const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
      const [contactToDelete, setContactToDelete] = useState(null);
      const [principalContactId, setPrincipalContactIdState] = useState(null);

      useEffect(() => {
        const storedContacts = localStorage.getItem('emergencyContacts');
        let initialContacts;
        if (storedContacts) {
          const parsedStoredContacts = JSON.parse(storedContacts);
          const personalContacts = parsedStoredContacts.filter(c => !c.nonDeletable);
          initialContacts = [...predefinedContactsData, ...personalContacts];
        } else {
          initialContacts = [...predefinedContactsData];
        }
        setContacts(initialContacts);

        const storedPrincipalId = localStorage.getItem('principalContactId');
        if (storedPrincipalId) {
          setPrincipalContactIdState(storedPrincipalId);
        }
      }, [predefinedContactsData]);

      useEffect(() => {
        if (contacts.length > 0) {
            localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
        }
      }, [contacts]);

      const setPrincipalContactId = useCallback((id) => {
        localStorage.setItem('principalContactId', id);
        setPrincipalContactIdState(id);
      }, []);
      
      const principalContact = contacts.find(c => c.id === principalContactId);


      const addContact = (contact) => {
        const newContact = { ...contact, id: Date.now().toString(), nonDeletable: false, nonEditable: false };
        setContacts(prevContacts => [...prevContacts, newContact]);
        toast({ title: "Contact Ajouté", description: `${contact.name} a été ajouté avec succès.`, className: "bg-green-500 text-white" });
        setShowAddModal(false);
      };

      const editContact = (updatedContact) => {
        if (updatedContact.nonEditable) {
            toast({ title: "Action Interdite", description: "Ce contact ne peut pas être modifié.", variant: "destructive" });
            return;
        }
        setContacts(prevContacts => 
          prevContacts.map(c => (c.id === updatedContact.id ? updatedContact : c))
        );
        toast({ title: "Contact Modifié", description: `${updatedContact.name} a été modifié avec succès.`, className: "bg-blue-500 text-white" });
        setShowEditModal(false);
        setCurrentContact(null);
      };

      const deleteContactWithConfirmation = (contact) => {
        if (contact.nonDeletable) {
          toast({ title: "Action Interdite", description: "Ce contact ne peut pas être supprimé.", variant: "destructive" });
          return;
        }
        setContactToDelete(contact);
        setShowConfirmDeleteModal(true);
      };

      const confirmDeleteHandler = () => {
        if (!contactToDelete) return;
        
        requestPasswordCallback(() => {
          setContacts(prevContacts => {
            const updatedContacts = prevContacts.filter(c => c.id !== contactToDelete.id);
            if (contactToDelete.id === principalContactId) {
              setPrincipalContactId(null); 
              localStorage.removeItem('principalContactId');
              toast({ title: "Attention", description: "Le contact principal a été supprimé. Veuillez en définir un nouveau.", variant: "destructive", duration: 7000 });
            }
            return updatedContacts;
          });
          toast({ title: "Contact Supprimé", description: `Le contact "${contactToDelete.name}" a été supprimé.`, className: "bg-red-600 text-white" });
          setShowConfirmDeleteModal(false);
          setContactToDelete(null);
        });
      };


      const openEditModal = (contact) => {
        if (contact.nonEditable) {
             toast({ title: "Action Interdite", description: "Ce contact ne peut pas être modifié.", variant: "destructive" });
            return;
        }
        setCurrentContact(contact);
        setShowEditModal(true);
      };

      return {
        contacts,
        setContacts,
        showAddModal,
        setShowAddModal,
        showEditModal,
        setShowEditModal,
        currentContact,
        setCurrentContact,
        addContact,
        editContact,
        deleteContactWithConfirmation,
        openEditModal,
        showConfirmDeleteModal,
        setShowConfirmDeleteModal,
        contactToDelete,
        setContactToDelete,
        confirmDeleteHandler,
        principalContact,
        setPrincipalContactId,
      };
    };