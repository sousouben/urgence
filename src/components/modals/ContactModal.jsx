import React, { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
    import { Textarea } from '@/components/ui/textarea';
    import { EmojiPicker } from '@/components/EmojiPicker';
    import { useToast } from '@/components/ui/use-toast';
    import { UserCircle, Phone, Briefcase, Home, SmilePlus } from 'lucide-react';

    export const ContactModal = ({ isOpen, onClose, onSubmit, contactData, title, submitText }) => {
      const [name, setName] = useState('');
      const [role, setRole] = useState('');
      const [phone, setPhone] = useState('');
      const [address, setAddress] = useState('');
      const [icon, setIcon] = useState('👤');
      const [showEmojiPicker, setShowEmojiPicker] = useState(false);
      const { toast } = useToast();

      useEffect(() => {
        if (contactData) {
          setName(contactData.name || '');
          setRole(contactData.role || '');
          setPhone(contactData.phone || '');
          setAddress(contactData.address || '');
          setIcon(contactData.icon || '👤');
        } else {
          setName('');
          setRole('');
          setPhone('');
          setAddress('');
          setIcon('👤');
        }
      }, [contactData, isOpen]);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !phone) {
          toast({ title: "Erreur", description: "Le nom et le numéro de téléphone sont obligatoires.", variant: "destructive" });
          return;
        }
        onSubmit({ id: contactData?.id, name, role, phone, icon, address });
        if (!contactData) { 
          setName(''); setRole(''); setPhone(''); setIcon('👤'); setAddress('');
        }
         setShowEmojiPicker(false);
      };

      const handleEmojiSelect = (selectedEmoji) => {
        setIcon(selectedEmoji);
        setShowEmojiPicker(false);
      };
      
      const handleClose = () => {
        setShowEmojiPicker(false);
        onClose();
      }

      return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="bg-white/90 backdrop-blur-lg text-gray-800 sm:max-w-md border-2 border-yellow-400 shadow-2xl rounded-xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-red-600 flex items-center">
                {contactData ? <UserCircle className="mr-2 h-6 w-6" /> : <SmilePlus className="mr-2 h-6 w-6" />}
                {title}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Remplissez les informations du contact.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4 px-1">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-gray-700">Nom*</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 border-gray-300 focus:border-red-500 focus:ring-red-500" placeholder="Ex: Jean Dupont" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right text-gray-700">Rôle</Label>
                  <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} className="col-span-3 border-gray-300 focus:border-red-500 focus:ring-red-500" placeholder="Ex: Papa, Médecin" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right text-gray-700">Téléphone*</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="col-span-3 border-gray-300 focus:border-red-500 focus:ring-red-500" placeholder="Ex: 0612345678" />
                </div>
                 <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="address" className="text-right text-gray-700 pt-2">Adresse</Label>
                  <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="col-span-3 border-gray-300 focus:border-red-500 focus:ring-red-500 min-h-[60px]" placeholder="Facultatif" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="icon" className="text-right text-gray-700">Icône</Label>
                  <div className="col-span-3 flex items-center gap-2">
                     <Input id="icon-display" value={icon} readOnly className="flex-grow border-gray-300 focus:border-red-500 focus:ring-red-500" />
                     <Button type="button" variant="outline" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="px-3">
                       {icon}
                     </Button>
                  </div>
                </div>
                {showEmojiPicker && (
                  <div className="col-span-4">
                    <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                  </div>
                )}
              </div>
              <DialogFooter className="mt-2 px-1 pb-1">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="text-gray-700 border-gray-400 hover:bg-gray-200 w-full sm:w-auto mb-2 sm:mb-0" onClick={() => setShowEmojiPicker(false)}>Annuler</Button>
                </DialogClose>
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">{submitText}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
    };