import React, { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
    import { Textarea } from '@/components/ui/textarea';
    import { useToast } from '@/components/ui/use-toast';
    import { UserCircle2 } from 'lucide-react';

    // This modal is now repurposed for general info saving, not profile creation with auth
    export const CreateProfileModal = ({ isOpen, onClose, onSubmit }) => {
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [address, setAddress] = useState('');
      const [birthDate, setBirthDate] = useState('');
      // Username and password fields are removed as per no-auth requirement
      // Avatar selection is also removed for simplification
      const { toast } = useToast();

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !address || !birthDate) {
          toast({ title: "Erreur", description: "Veuillez remplir tous les champs.", variant: "destructive" });
          return;
        }
        
        onSubmit({ firstName, lastName, address, birthDate }); // Only personal info
        
        setFirstName('');
        setLastName('');
        setAddress('');
        setBirthDate('');
      };


      return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="bg-white/90 backdrop-blur-lg text-gray-800 w-[90vw] max-w-md border-2 border-yellow-400 shadow-2xl rounded-xl overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-red-600 flex items-center">
                <UserCircle2 className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Enregistrer Informations
                </DialogTitle>
              <DialogDescription className="text-gray-600 text-sm sm:text-base">
                Ces informations seront stockées localement pour votre usage.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-3 sm:gap-4 py-4 px-1">
                <div className="grid grid-cols-4 items-center gap-3 sm:gap-4">
                  <Label htmlFor="firstName-profile" className="text-right text-gray-700 text-xs sm:text-sm">Prénom*</Label>
                  <Input id="firstName-profile" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="col-span-3 border-gray-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base" placeholder="Ex: Jean" />
                </div>
                <div className="grid grid-cols-4 items-center gap-3 sm:gap-4">
                  <Label htmlFor="lastName-profile" className="text-right text-gray-700 text-xs sm:text-sm">Nom*</Label>
                  <Input id="lastName-profile" value={lastName} onChange={(e) => setLastName(e.target.value)} className="col-span-3 border-gray-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base" placeholder="Ex: Dupont" />
                </div>
                <div className="grid grid-cols-4 items-center gap-3 sm:gap-4">
                  <Label htmlFor="birthDate-profile" className="text-right text-gray-700 text-xs sm:text-sm">Date Naiss.*</Label>
                  <Input id="birthDate-profile" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="col-span-3 border-gray-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base" />
                </div>
                 <div className="grid grid-cols-4 items-start gap-3 sm:gap-4">
                  <Label htmlFor="address-profile" className="text-right text-gray-700 text-xs sm:text-sm pt-1 sm:pt-2">Adresse*</Label>
                  <Textarea id="address-profile" value={address} onChange={(e) => setAddress(e.target.value)} className="col-span-3 border-gray-300 focus:border-red-500 focus:ring-red-500 min-h-[60px] text-sm sm:text-base" placeholder="Ex: 123 Rue de la Paix, 75000 Paris" />
                </div>
              </div>
              <DialogFooter className="mt-2 px-1 pb-1 flex-col sm:flex-row">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="text-gray-700 border-gray-400 hover:bg-gray-200 w-full sm:w-auto mb-2 sm:mb-0 text-sm sm:text-base">Annuler</Button>
                </DialogClose>
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto text-sm sm:text-base">Enregistrer Infos</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
    };