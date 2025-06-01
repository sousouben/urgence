import React, { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { useToast } from '@/components/ui/use-toast';
    import { MessageSquare, Send, MapPin } from 'lucide-react';

    const PREDEFINED_MESSAGES = [
      "Je suis en sécurité.",
      "J'ai besoin d'aide.",
      "Je suis en route.",
      "J'arrive bientôt.",
      "Peux-tu m'appeler ?"
    ];

    export const QuickMessageModal = ({ isOpen, onClose, contacts, location }) => {
      const { toast } = useToast();
      const [selectedContactId, setSelectedContactId] = useState('');
      const [message, setMessage] = useState(PREDEFINED_MESSAGES[0]);
      const [customMessage, setCustomMessage] = useState('');
      const [useCustom, setUseCustom] = useState(false);

      const handleSend = () => {
        const contact = contacts.find(c => c.id === selectedContactId);
        if (!contact) {
          toast({ title: "Erreur", description: "Veuillez sélectionner un contact.", variant: "destructive" });
          return;
        }

        let finalMessage = useCustom ? customMessage : message;
        if (location) {
          finalMessage += ` Ma position: https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
        }
        
        const smsLink = `sms:${contact.phone}?body=${encodeURIComponent(finalMessage)}`;
        
        try {
            window.open(smsLink, '_self');
            toast({ title: "Message Prêt", description: `Ouverture de l'application SMS pour envoyer à ${contact.name}.`, className: "bg-green-500 text-white" });
            onClose();
        } catch (e) {
             toast({ title: "Erreur", description: "Impossible d'ouvrir l'application SMS.", variant: "destructive" });
        }
      };

      const renderSelect = () => {
        if (!contacts || contacts.length === 0) {
          return <p className="text-gray-500 text-sm mt-1">Aucun contact personnel disponible.</p>;
        }
        return (
            <select
                id="contact-select-message"
                value={selectedContactId}
                onChange={(e) => setSelectedContactId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-red-500 focus:border-red-500 mt-1"
            >
                <option value="" disabled>Sélectionner un contact</option>
                {contacts.map(contact => (
                    <option key={contact.id} value={contact.id}>{contact.name} ({contact.role})</option>
                ))}
            </select>
        );
      };


      return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="bg-white/90 backdrop-blur-lg text-gray-800 w-[90vw] max-w-lg border-2 border-yellow-400 shadow-2xl rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-red-600 flex items-center"><MessageSquare className="mr-2 h-5 w-5 sm:h-6 sm:w-6"/> Envoyer un Message Rapide</DialogTitle>
              <DialogDescription className="text-gray-600 text-sm sm:text-base">
                Sélectionnez un contact et un message. Votre position sera ajoutée si disponible.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-3 sm:gap-4 py-4 px-1">
              <div>
                <Label htmlFor="contact-select-message" className="text-gray-700 font-semibold">Destinataire</Label>
                {renderSelect()}
              </div>

              <div>
                <Label htmlFor="message-type" className="text-gray-700 font-semibold">Type de Message</Label>
                <div className="flex items-center space-x-2 mt-1">
                    <Button size="sm" variant={!useCustom ? "default" : "outline"} onClick={() => setUseCustom(false)} className={!useCustom ? "bg-red-500 hover:bg-red-600 text-xs sm:text-sm" : "text-xs sm:text-sm"}>Prédéfini</Button>
                    <Button size="sm" variant={useCustom ? "default" : "outline"} onClick={() => setUseCustom(true)} className={useCustom ? "bg-red-500 hover:bg-red-600 text-xs sm:text-sm" : "text-xs sm:text-sm"}>Personnalisé</Button>
                </div>
              </div>

              {useCustom ? (
                <div>
                  <Label htmlFor="custom-message" className="text-gray-700 font-semibold">Message Personnalisé</Label>
                  <Textarea
                    id="custom-message"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Écrivez votre message ici..."
                    className="mt-1 border-gray-300 focus:border-red-500 focus:ring-red-500 min-h-[80px] sm:min-h-[100px]"
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="predefined-message-select" className="text-gray-700 font-semibold">Message Prédéfini</Label>
                   <select
                        id="predefined-message-select"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 mt-1 focus:ring-red-500 focus:border-red-500"
                    >
                        {PREDEFINED_MESSAGES.map((msg, index) => (
                            <option key={index} value={msg}>{msg}</option>
                        ))}
                    </select>
                </div>
              )}
                {location && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <MapPin className="h-3 w-3 mr-1 text-green-600"/> Votre position sera ajoutée au message.
                    </p>
                )}
            </div>

            <DialogFooter className="mt-2 px-1 pb-1 flex-col sm:flex-row">
              <DialogClose asChild>
                  <Button type="button" variant="outline" className="text-gray-700 border-gray-400 hover:bg-gray-200 w-full sm:w-auto mb-2 sm:mb-0">Annuler</Button>
              </DialogClose>
              <Button onClick={handleSend} className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto" disabled={!selectedContactId || (useCustom && !customMessage.trim())}>
                <Send className="mr-2 h-4 w-4"/> Envoyer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    };