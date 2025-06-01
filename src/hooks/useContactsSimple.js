import { useState, useEffect } from 'react';

    export const useContactsSimple = (predefinedContactsData, toast) => {
      const [contacts, setContacts] = useState([]);
      const [showAddModal, setShowAddModal] = useState(false);
      const [showEditModal, setShowEditModal] = useState(false);
      const [currentContact, setCurrentContact] = useState(null);
      const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
      const [contactToDelete, setContactToDelete] = useState(null);
      const [principalContactIdState, setPrincipalContactIdState] = useState(null);

      useEffect(() => {
        const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const personalContacts = storedContacts.filter(c => !c.nonDeletable); 
        setContacts([...predefinedContactsData, ...personalContacts]);
        
        const storedPrincipalId = localStorage.getItem('principalContactId');
        if (storedPrincipalId) {
          setPrincipalContactIdState(storedPrincipalId);
        }
      }, [predefinedContactsData]);

      const saveContacts = (updatedContacts) => {
        const personalContacts = updatedContacts.filter(c => !c.nonDeletable);
        localStorage.setItem('contacts', JSON.stringify(personalContacts));
      };

      const addContact = (newContact) => {
        const updatedContacts = [...contacts, { ...newContact, id: `contact-${Date.now()}` }];
        setContacts(updatedContacts);
        saveContacts(updatedContacts);
        setShowAddModal(false);
        toast({ title: "Contact Ajouté", description: `${newContact.name} a été ajouté avec succès.`, className: "bg-green-500 text-white" });
      };

      const editContact = (updatedContactData) => {
        const updatedContacts = contacts.map(contact => 
          contact.id === updatedContactData.id ? { ...contact, ...updatedContactData } : contact
        );
        setContacts(updatedContacts);
        saveContacts(updatedContacts);
        setShowEditModal(false);
        setCurrentContact(null);
        toast({ title: "Contact Modifié", description: `${updatedContactData.name} a été mis à jour.`, className: "bg-blue-500 text-white" });
      };

      const deleteContactWithConfirmation = (contact) => {
        if (contact.nonDeletable) {
          toast({ title: "Action Interdite", description: "Ce contact prédéfini ne peut pas être supprimé.", variant: "destructive" });
          return;
        }
        setContactToDelete(contact);
        setShowConfirmDeleteModal(true);
      };
      
      const confirmDeleteHandler = () => {
        if (contactToDelete) {
          if (contactToDelete.id === principalContactIdState) {
            setPrincipalContact(null);
          }
          const updatedContacts = contacts.filter(contact => contact.id !== contactToDelete.id);
          setContacts(updatedContacts);
          saveContacts(updatedContacts);
          setShowConfirmDeleteModal(false);
          toast({ title: "Contact Supprimé", description: `${contactToDelete.name} a été supprimé.`, className: "bg-red-500 text-white" });
          setContactToDelete(null);
        }
      };

      const openEditModal = (contact) => {
        if (contact.nonEditable) {
          toast({ title: "Action Interdite", description: "Ce contact prédéfini ne peut pas être modifié.", variant: "destructive" });
          return;
        }
        setCurrentContact(contact);
        setShowEditModal(true);
      };

      const setPrincipalContact = (id) => {
        setPrincipalContactIdState(id);
        if (id) {
            localStorage.setItem('principalContactId', id);
            const contact = [...predefinedContactsData, ...JSON.parse(localStorage.getItem('contacts') || '[]')].find(c => c.id === id);
            if (contact) {
                toast({ title: "Contact Principal Défini", description: `${contact.name} est maintenant votre contact principal.`, className: "bg-green-500 text-white" });
            }
        } else {
            localStorage.removeItem('principalContactId');
             toast({ title: "Contact Principal Retiré", description: `Vous n'avez plus de contact principal défini.`, className: "bg-orange-500 text-white" });
        }
      };
      
      const principalContact = contacts.find(c => c.id === principalContactIdState);

      return {
        contacts,
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
        confirmDeleteHandler,
        principalContact,
        setPrincipalContactId: setPrincipalContact,
      };
    };