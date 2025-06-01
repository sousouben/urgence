import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
    import { Lock } from 'lucide-react';

    export const PasswordModal = ({ isOpen, onClose, passwordInput, setPasswordInput, onSubmit, username, onForgotPassword }) => {
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
      };

      return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="bg-white/90 backdrop-blur-lg text-gray-800 w-[90vw] max-w-sm border-2 border-yellow-400 shadow-2xl rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-red-600 flex items-center">
                <Lock className="mr-2 h-5 w-5 sm:h-6 sm:w-6"/> Confirmation Requise
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-sm sm:text-base">
                {username ? `Veuillez entrer le mot de passe pour ${username} pour confirmer.` : "Veuillez entrer le mot de passe pour continuer."}
                 Si aucun mot de passe n'a été défini, cette étape peut ne pas être nécessaire.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-3 sm:gap-4 py-4 px-1">
                <div className="grid grid-cols-4 items-center gap-3 sm:gap-4">
                  <Label htmlFor="password-login" className="text-right text-gray-700 text-xs sm:text-sm">Mot de passe</Label>
                  <Input 
                    id="password-login" 
                    type="password" 
                    value={passwordInput} 
                    onChange={(e) => setPasswordInput(e.target.value)} 
                    className="col-span-3 border-gray-300 focus:border-red-500 focus:ring-red-500 text-sm sm:text-base" 
                    placeholder="********"
                  />
                </div>
                {onForgotPassword && (
                    <div className="col-span-4 flex justify-end mt-0.5 sm:mt-1">
                        <Button type="button" variant="link" onClick={onForgotPassword} className="text-xs text-red-600 hover:text-red-700 p-0 h-auto">
                            Mot de passe oublié ?
                        </Button>
                    </div>
                )}
              </div>
              <DialogFooter className="mt-2 px-1 pb-1 flex-col sm:flex-row">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="text-gray-700 border-gray-400 hover:bg-gray-200 w-full sm:w-auto mb-2 sm:mb-0 text-sm sm:text-base">Annuler</Button>
                </DialogClose>
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto text-sm sm:text-base">Confirmer</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
    };