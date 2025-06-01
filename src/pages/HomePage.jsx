import React from 'react';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Phone, Edit3, Trash2, AlertTriangle } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';

    const HomePage = ({ contacts, openEditModal, deleteContact }) => {
      return (
        <AnimatePresence>
          {contacts.length > 0 ? (
            <motion.div 
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {contacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layout
                  className="flex"
                >
                  <Card className="bg-white/20 backdrop-blur-md border-none shadow-2xl overflow-hidden transform transition-all hover:scale-105 w-full flex flex-col">
                    <CardHeader className="pb-2 pt-4 px-4 bg-black/10">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center min-w-0">
                          <span className="text-3xl sm:text-4xl mr-2 sm:mr-3 flex-shrink-0">{contact.icon || '👤'}</span>
                          <div className="min-w-0 flex-grow">
                            <CardTitle className="text-xl sm:text-2xl font-bold text-yellow-300 truncate" title={contact.name}>{contact.name}</CardTitle>
                            <CardDescription className="text-xs sm:text-sm text-white/80 truncate" title={contact.role}>{contact.role}</CardDescription>
                          </div>
                        </div>
                        {contact.nonDeletable && (
                          <AlertTriangle size={18} className="text-orange-400 flex-shrink-0 ml-2" title="Contact prédéfini non modifiable/supprimable" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 flex flex-col flex-grow">
                      {contact.address && contact.address.trim() !== "" && (
                        <p className="text-xs text-white/70 mb-2 break-words">Adresse: {contact.address}</p>
                      )}
                      <div className="mt-auto">
                        <a href={`tel:${contact.phone}`} className="block w-full">
                          <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-3 text-base sm:text-lg mb-2 sm:mb-3">
                            <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Appeler {contact.phone}
                          </Button>
                        </a>
                        {!contact.nonEditable && !contact.nonDeletable && (
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => openEditModal(contact)} className="text-yellow-300 hover:text-yellow-500 hover:bg-white/20 h-8 w-8 sm:h-9 sm:w-9">
                              <Edit3 size={18} className="sm:size-5" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteContact(contact)} className="text-red-300 hover:text-red-500 hover:bg-white/20 h-8 w-8 sm:h-9 sm:w-9">
                              <Trash2 size={18} className="sm:size-5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-lg sm:text-xl text-yellow-200 mt-10 py-10"
            >
              <AlertTriangle className="mx-auto h-12 w-12 text-yellow-300 mb-4" />
              Aucun contact d'urgence pour le moment, ou aucun ne correspond à votre recherche.
              <br />
              Cliquez sur "Ajouter Contact" pour commencer !
            </motion.div>
          )}
        </AnimatePresence>
      );
    };

    export default HomePage;