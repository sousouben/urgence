import React, { useEffect, useState } from 'react';
    import { ShieldAlert } from 'lucide-react';

    const PrintPage = () => {
      const [contactsToPrint, setContactsToPrint] = useState([]);

      useEffect(() => {
        const storedContacts = localStorage.getItem('contactsToPrint');
        if (storedContacts) {
          setContactsToPrint(JSON.parse(storedContacts));
        }
      }, []);

      if (contactsToPrint.length === 0) {
        return (
          <div className="p-8 text-center print-black-text">
            <h1 className="text-2xl font-bold mb-4">Préparation de l'impression...</h1>
            <p>Si la page reste vide, veuillez retourner à l'accueil et réessayer.</p>
          </div>
        );
      }

      return (
        <div className="p-4 sm:p-6 md:p-8 print-black-text">
          <header className="mb-8 text-center border-b-2 border-gray-300 pb-4">
            <div className="flex items-center justify-center mb-2">
              <ShieldAlert size={32} className="mr-3 text-red-600" />
              <h1 className="text-3xl font-bold text-gray-800">Répertoire d'Urgence</h1>
            </div>
            <p className="text-sm text-gray-600">Liste des contacts d'urgence - {new Date().toLocaleDateString()}</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactsToPrint.map(contact => (
              <div key={contact.id} className="print-card p-4 border border-gray-200 rounded-lg break-inside-avoid">
                <div className="print-card-header pb-2 mb-2 border-b border-gray-200">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{contact.icon || '👤'}</span>
                    <div>
                      <h2 className="print-card-title text-xl font-semibold text-gray-700">{contact.name}</h2>
                      <p className="print-card-description text-xs text-gray-500">{contact.role}</p>
                    </div>
                  </div>
                </div>
                <div className="print-card-content">
                  <p className="text-lg font-medium text-gray-700">
                    <span className="font-semibold">Tél:</span> {contact.phone}
                  </p>
                  {contact.address && contact.address.trim() !== "" && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-semibold">Adresse:</span> {contact.address}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {contactsToPrint.length === 0 && (
            <p className="text-center text-gray-500 mt-10">Aucun contact à imprimer.</p>
          )}

          <footer className="mt-12 text-center text-xs text-gray-500 pt-4 border-t border-gray-300">
            <p>&copy; {new Date().getFullYear()} Répertoire d'Urgence par wpdevdesigns. Généré le {new Date().toLocaleString()}.</p>
          </footer>
        </div>
      );
    };

    export default PrintPage;