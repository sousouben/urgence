import React, { useState, useEffect } from 'react';
    import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';
    import { ShieldAlert, PlusCircle, FileText, Info, ShieldCheck, AlertTriangle, Printer, MapPin, MessageSquare, PhoneCall, HeartPulse, Siren } from 'lucide-react';
    import { motion } from 'framer-motion';

    import HomePage from '@/pages/HomePage';
    import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
    import LegalNoticePage from '@/pages/LegalNoticePage';
    import AboutPage from '@/pages/AboutPage';
    import MedicalInfoPage from '@/pages/MedicalInfoPage';
    import NearbyServicesPage from '@/pages/NearbyServicesPage';
    
    import { ContactModal } from '@/components/modals/ContactModal';
    import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
    import { QuickMessageModal } from '@/components/modals/QuickMessageModal';
    import { SetPrincipalContactModal } from '@/components/modals/SetPrincipalContactModal';

    import { useContactsSimple } from '@/hooks/useContactsSimple';
    import { useGeolocation } from '@/hooks/useGeolocation';

    const predefinedContactsData = [
      { id: 'predefined-1', name: 'Numéro d’urgence européen', role: 'Urgence Européenne', phone: '112', icon: '🇪🇺', nonDeletable: true, nonEditable: true, address: '' },
      { id: 'predefined-2', name: 'SAMU', role: 'Urgences Médicales', phone: '15', icon: '🚑', nonDeletable: true, nonEditable: true, address: '' },
      { id: 'predefined-3', name: 'Police / Gendarmerie', role: 'Secours Police', phone: '17', icon: '🚓', nonDeletable: true, nonEditable: true, address: '' },
      { id: 'predefined-4', name: 'Pompiers', role: 'Secours Incendie', phone: '18', icon: '🚒', nonDeletable: true, nonEditable: true, address: '' },
      { id: 'predefined-5', name: 'Urgences par SMS', role: 'Sourds/Malentendants', phone: '114', icon: '💬', nonDeletable: true, nonEditable: true, address: '' },
    ];
    
    function App() {
      const { toast } = useToast();
      
      const {
        contacts,
        showAddModal,
        showEditModal,
        currentContact,
        addContact,
        editContact,
        deleteContactWithConfirmation,
        openEditModal,
        setShowAddModal,
        setShowEditModal,
        setCurrentContact,
        showConfirmDeleteModal,
        setShowConfirmDeleteModal,
        contactToDelete,
        confirmDeleteHandler,
        principalContact,
        setPrincipalContactId, // This is the correctly named function from the hook
      } = useContactsSimple(predefinedContactsData, toast);

      const { location, error: geoError, getLocation } = useGeolocation();
      const [showQuickMessageModal, setShowQuickMessageModal] = useState(false);
      const [showSetPrincipalContactModal, setShowSetPrincipalContactModal] = useState(false);


      useEffect(() => {
        const storedPrincipalContactId = localStorage.getItem('principalContactId');
        if (storedPrincipalContactId) {
          // No need to call setPrincipalContactId here if the hook already initializes from localStorage
          // The hook's useEffect for principalContactIdState will handle this.
        }
      }, []); // Removed setPrincipalContactId from dependency array as it could cause loops if not memoized by the hook


      const handlePrint = () => {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);
      
        const printDocument = iframe.contentWindow.document;
        
        const contactsHtml = contacts.map(contact => `
          <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; page-break-inside: avoid;">
            <h2>${contact.icon || '👤'} ${contact.name} (${contact.role})</h2>
            <p>Téléphone: ${contact.phone}</p>
            ${contact.address ? `<p>Adresse: ${contact.address}</p>` : ''}
          </div>
        `).join('');
      
        printDocument.open();
        printDocument.write(`
          <html>
            <head>
              <title>Répertoire d'Urgence - Impression</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { text-align: center; border-bottom: 1px solid #eee; padding-bottom: 10px; }
                h2 { font-size: 1.2em; margin-bottom: 5px;}
                p { margin: 3px 0; }
                @media print {
                  body { margin: 0.5in; } /* Adjust print margins */
                  div { page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <h1>Répertoire d'Urgence</h1>
              ${contactsHtml}
              <footer style="text-align:center; font-size:0.8em; margin-top:20px; border-top: 1px solid #eee; padding-top:10px;">
                &copy; ${new Date().getFullYear()} Répertoire d'Urgence par wpdevdesigns.
              </footer>
            </body>
          </html>
        `);
        printDocument.close();
      
        iframe.contentWindow.focus(); 
        setTimeout(() => {
            try {
                const success = iframe.contentWindow.document.execCommand('print', false, null);
                if (!success) { 
                    iframe.contentWindow.print();
                }
            } catch (e) { 
                iframe.contentWindow.print(); 
            } finally {
                 setTimeout(() => document.body.removeChild(iframe), 1000); 
            }
        }, 500); 
      };

      const handleGlobalEmergencyCall = () => {
        if (principalContact) {
          window.location.href = `tel:${principalContact.phone}`;
        } else {
          const samu = contacts.find(c => c.phone === '15'); 
          if (samu) {
            window.location.href = `tel:${samu.phone}`;
          } else {
            toast({ title: "Erreur", description: "Aucun contact principal défini et SAMU non trouvé. Veuillez définir un contact principal.", variant: "destructive" });
          }
        }
      };

      const handleSOS = () => {
        if (principalContact) {
          let message = `SOS: J'ai besoin d'aide.`;
          if (location) {
            message += ` Ma position: https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
          } else {
            message += ` Position non disponible.`;
          }
          const smsLink = `sms:${principalContact.phone}?body=${encodeURIComponent(message)}`;
          window.open(smsLink, '_self');
        } else {
          toast({ title: "Erreur", description: "Aucun contact principal défini pour le SOS. Veuillez en définir un.", variant: "destructive" });
        }
      };
      
      return (
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 p-2 sm:p-4 flex flex-col items-center text-white print:bg-white print:text-black">
            <div className="w-full print:hidden">
              <header className="w-full max-w-7xl mx-auto mb-6 sm:mb-8 text-center ">
                <motion.div 
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center mb-2"
                >
                  <ShieldAlert size={32} className="sm:size-12 mr-2 sm:mr-3 text-yellow-300" />
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">Répertoire d'Urgence</h1>
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base sm:text-xl text-yellow-200"
                >
                  Accès rapide aux numéros importants et outils d'urgence.
                </motion.p>
                
                 <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 place-items-stretch max-w-5xl mx-auto">
                    <Button onClick={() => setShowAddModal(true)} className="bg-yellow-400 hover:bg-yellow-500 text-red-700 font-semibold w-full text-xs sm:text-sm py-2">
                      <PlusCircle className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Ajouter Contact
                    </Button>
                    <Button onClick={handlePrint} variant="outline" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-red-700 w-full text-xs sm:text-sm py-2">
                      <Printer className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Imprimer
                    </Button>
                    <Button onClick={getLocation} variant="outline" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-red-700 w-full text-xs sm:text-sm py-2">
                      <MapPin className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> {location ? `GPS Actif` : (geoError ? `Erreur GPS` : 'Activer GPS')}
                    </Button>
                    <Button onClick={() => setShowQuickMessageModal(true)} variant="outline" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-red-700 w-full text-xs sm:text-sm py-2">
                      <MessageSquare className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Message
                    </Button>
                    <Button onClick={() => setShowSetPrincipalContactModal(true)} variant="outline" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-red-700 w-full text-xs sm:text-sm py-2 col-span-2 sm:col-span-1">
                       <ShieldCheck className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Contact Principal
                    </Button>
                     <Link to="/infos-medicales" className="w-full col-span-1">
                        <Button variant="outline" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-red-700 w-full text-xs sm:text-sm py-2">
                        <HeartPulse className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Infos Médicales
                        </Button>
                    </Link>
                    <Link to="/services-proximite" className="w-full col-span-1">
                        <Button variant="outline" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-red-700 w-full text-xs sm:text-sm py-2" disabled={!location}>
                            <Siren className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Services Proches
                        </Button>
                    </Link>
                </div>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <Button onClick={handleGlobalEmergencyCall} size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg w-full sm:w-auto">
                        <PhoneCall className="mr-1 sm:mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Appel Urgence Global
                    </Button>
                    <Button onClick={handleSOS} size="lg" variant="destructive" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg w-full sm:w-auto">
                        <AlertTriangle className="mr-1 sm:mr-2 h-5 w-5 sm:h-6 sm:w-6" /> SOS Discret
                    </Button>
                </div>
              </header>

              <main className="w-full px-2 sm:px-0 max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<HomePage contacts={contacts} openEditModal={openEditModal} deleteContact={deleteContactWithConfirmation} />} />
                  <Route path="/confidentialite" element={<PrivacyPolicyPage />} />
                  <Route path="/mentions-legales" element={<LegalNoticePage />} />
                  <Route path="/a-propos" element={<AboutPage />} />
                  <Route path="/infos-medicales" element={<MedicalInfoPage />} />
                  <Route path="/services-proximite" element={<NearbyServicesPage location={location} />} />
                </Routes>
              </main>

              <ContactModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={addContact}
                title="Ajouter un Nouveau Contact"
                submitText="Ajouter"
              />

              {currentContact && (
                <ContactModal
                  isOpen={showEditModal}
                  onClose={() => { setShowEditModal(false); setCurrentContact(null); }}
                  onSubmit={editContact}
                  contactData={currentContact}
                  title="Modifier le Contact"
                  submitText="Enregistrer"
                />
              )}
              
              <ConfirmDialog
                isOpen={showConfirmDeleteModal}
                onClose={() => setShowConfirmDeleteModal(false)}
                onConfirm={confirmDeleteHandler}
                title="Confirmer la Suppression"
                description={`Êtes-vous sûr de vouloir supprimer le contact "${contactToDelete?.name}" ? Cette action est irréversible.`}
              />

              <QuickMessageModal
                isOpen={showQuickMessageModal}
                onClose={() => setShowQuickMessageModal(false)}
                contacts={contacts.filter(c => !c.nonDeletable)} 
                location={location}
              />

              <SetPrincipalContactModal
                isOpen={showSetPrincipalContactModal}
                onClose={() => setShowSetPrincipalContactModal(false)}
                contacts={contacts.filter(c => !c.nonDeletable)}
                currentPrincipalId={principalContact?.id}
                onSetPrincipal={setPrincipalContactId} // Passed correctly from the hook
                toast={toast}
              />


              <Toaster />
              <footer className="w-full max-w-7xl mx-auto mt-8 sm:mt-12 text-center text-xs sm:text-sm text-white/70">
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-3 md:space-x-4 mb-2">
                  <Link to="/confidentialite" className="hover:text-yellow-300 transition-colors flex items-center">
                    <ShieldCheck className="mr-1 h-4 w-4" /> Politique de Confidentialité
                  </Link>
                  <Link to="/mentions-legales" className="hover:text-yellow-300 transition-colors flex items-center">
                    <FileText className="mr-1 h-4 w-4" /> Mentions Légales
                  </Link>
                  <Link to="/a-propos" className="hover:text-yellow-300 transition-colors flex items-center">
                    <Info className="mr-1 h-4 w-4" /> À Propos
                  </Link>
                </div>
                <p>&copy; {new Date().getFullYear()} Répertoire d'Urgence par wpdevdesigns. Tous droits réservés.</p>
                <p>Conçu pour un accès rapide et facile en cas de besoin.</p>
              </footer>
            </div>
          </div>
        </Router>
      );
    }

    export default App;