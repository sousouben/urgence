import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
    import { AlertTriangle } from 'lucide-react';

    export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, description }) => {
      return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="bg-white/90 backdrop-blur-lg text-gray-800 sm:max-w-[425px] border-2 border-red-500 shadow-2xl rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-red-600 flex items-center">
                <AlertTriangle className="mr-2 h-6 w-6 text-red-600" /> {title}
              </DialogTitle>
              <DialogDescription className="text-gray-600 pt-2">
                {description}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="text-gray-700 border-gray-400 hover:bg-gray-200 w-full sm:w-auto mb-2 sm:mb-0">Annuler</Button>
              </DialogClose>
              <Button 
                type="button" 
                onClick={() => {
                  onConfirm();
                  onClose();
                }} 
                className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
              >
                Confirmer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    };