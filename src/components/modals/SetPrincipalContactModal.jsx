import React, { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
    import { Label } from '@/components/ui/label';
    import { ShieldCheck } from 'lucide-react';

    export const SetPrincipalContactModal = ({ isOpen, onClose, contacts, currentPrincipalId, onSetPrincipal, toast }) => {
      const [selectedContactId, setSelectedContactId] = useState(currentPrincipalId || '');

      useEffect(() => {
        setSelectedContactId(currentPrincipalId || '');
      }, [currentPrincipalId, isOpen]);

      const handleSubmit = () => {
        if (!selectedContactId) {
          toast({ title: "Sélection Requise", description: "Veuillez sélectionner un contact.", variant: "destructive" });
          return;
        }
        onSetPrincipal(selectedContactId);
        onClose();
      };
      
      const personalContacts = contacts.filter(c => !c.nonDeletable);

      return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="bg-white/90 backdrop-blur-lg text-gray-800 w-[90vw] max-w-md border-2 border-yellow-400 shadow-2xl rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-red-600 flex items-center"><ShieldCheck className="mr-2 h-5 w-5 sm:h-6 sm:w-6"/> Définir Contact Principal</DialogTitle>
              <DialogDescription className="text-gray-600 text-sm sm:text-base">
                Ce contact sera utilisé pour les fonctions "Appel d'Urgence Global" et "SOS Discret".
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <Label htmlFor="principal-contact-select" className="text-gray-700 font-semibold">Sélectionner le Contact Principal</Label>
              {personalContacts.length > 0 ? (
                <select
                    id="principal-contact-select"
                    value={selectedContactId}
                    onChange={(e) => setSelectedContactId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 mt-1 focus:ring-red-500 focus:border-red-500"
                >
                    <option value="" disabled>Choisir un contact...</option>
                    {personalContacts.map(contact => (
                        <option key={contact.id} value={contact.id}>
                            {contact.name} ({contact.role || 'Contact'})
                        </option>
                    ))}
                </select>
              ) : (
                <p className="text-gray-500 text-sm mt-2">Aucun contact personnel disponible. Veuillez d'abord ajouter des contacts.</p>
              )}
            </div>

            <DialogFooter className="flex-col sm:flex-row">
              <DialogClose asChild>
                  <Button type="button" variant="outline" className="text-gray-700 border-gray-400 hover:bg-gray-200 w-full sm:w-auto mb-2 sm:mb-0">Annuler</Button>
              </DialogClose>
              <Button onClick={handleSubmit} className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto" disabled={personalContacts.length === 0}>
                Définir comme Principal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    };