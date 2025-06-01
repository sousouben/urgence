import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { ArrowLeft, HeartPulse, Save, Edit3, Info, User, Home } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Label } from '@/components/ui/label';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { useToast } from '@/components/ui/use-toast';

    const MedicalInfoPage = () => {
      const { toast } = useToast();
      const [isEditing, setIsEditing] = useState(false);
      const [medicalInfo, setMedicalInfo] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        address: '',
        bloodType: '',
        allergies: '',
        medications: '',
        conditions: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        notes: ''
      });

      useEffect(() => {
        const storedInfo = localStorage.getItem('medicalInfo');
        if (storedInfo) {
          setMedicalInfo(JSON.parse(storedInfo));
        } else {
            setIsEditing(true);
        }
      }, []);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMedicalInfo(prev => ({ ...prev, [name]: value }));
      };

      const handleSave = () => {
        localStorage.setItem('medicalInfo', JSON.stringify(medicalInfo));
        setIsEditing(false);
        toast({
          title: "Informations Enregistrées",
          description: "Vos informations personnelles et médicales ont été sauvegardées localement.",
          className: "bg-green-500 text-white"
        });
      };
      
      const personalFields = [
        { name: 'firstName', label: 'Prénom', placeholder: 'Ex: Jean', type: 'text', icon: <User className="h-4 w-4 text-gray-500 mr-2"/> },
        { name: 'lastName', label: 'Nom', placeholder: 'Ex: Dupont', type: 'text', icon: <User className="h-4 w-4 text-gray-500 mr-2"/> },
        { name: 'birthDate', label: 'Date de Naissance', type: 'date', icon: <User className="h-4 w-4 text-gray-500 mr-2"/>},
        { name: 'address', label: 'Adresse', placeholder: 'Ex: 123 Rue de la Paix, Paris', type: 'textarea', icon: <Home className="h-4 w-4 text-gray-500 mr-2"/> },
      ];

      const medicalFields = [
        { name: 'bloodType', label: 'Groupe Sanguin', placeholder: 'Ex: O+, A-', type: 'text' },
        { name: 'allergies', label: 'Allergies', placeholder: 'Ex: Pénicilline, Arachides', type: 'textarea' },
        { name: 'medications', label: 'Traitements Médicaux', placeholder: 'Ex: Insuline, Ventoline', type: 'textarea' },
        { name: 'conditions', label: 'Pathologies Connues', placeholder: 'Ex: Diabète Type 1, Asthme', type: 'textarea' },
        { name: 'emergencyContactName', label: 'Contact d\'Urgence (Nom)', placeholder: 'Ex: Jeanne Dupont', type: 'text' },
        { name: 'emergencyContactPhone', label: 'Contact d\'Urgence (Tél)', placeholder: 'Ex: 0601020304', type: 'tel' },
        { name: 'notes', label: 'Notes Supplémentaires', placeholder: 'Instructions spécifiques, médecin traitant...', type: 'textarea' },
      ];

      const isEmpty = Object.values(medicalInfo).every(value => value === '');


      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-3xl mx-auto bg-white/20 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl text-white"
        >
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <Link to="/" className="inline-block">
              <Button variant="outline" className="text-yellow-300 border-yellow-300 hover:bg-yellow-300 hover:text-red-700 text-xs sm:text-sm">
                <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Retour
              </Button>
            </Link>
            <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className={`bg-yellow-400 hover:bg-yellow-500 text-red-700 font-semibold ${isEditing ? 'animate-pulse' : ''} text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2`}>
              {isEditing ? <Save className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> : <Edit3 className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />}
              {isEditing ? 'Enregistrer' : 'Modifier'}
            </Button>
          </div>
          
          <Card className="bg-white/10 border-yellow-400/50">
            <CardHeader className="text-center pb-3 sm:pb-4">
              <HeartPulse className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-yellow-300 mb-2" />
              <CardTitle className="text-yellow-300 text-xl sm:text-2xl md:text-3xl">Mes Informations Clés</CardTitle>
              <CardDescription className="text-white/80 text-xs sm:text-sm">
                Ces informations sont stockées localement et peuvent être cruciales en cas d'urgence.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-4 sm:pb-6">
              <h4 className="text-lg sm:text-xl font-semibold text-yellow-300 border-b border-yellow-400/50 pb-1 mb-2 sm:mb-3">Informations Personnelles</h4>
              {isEditing ? (
                personalFields.map(field => (
                  <div key={field.name}>
                    <Label htmlFor={field.name} className="text-yellow-200 font-semibold flex items-center text-sm sm:text-base">
                      {field.icon}{field.label}
                    </Label>
                    {field.type === 'textarea' ? (
                      <Textarea id={field.name} name={field.name} value={medicalInfo[field.name]} onChange={handleInputChange} placeholder={field.placeholder} className="mt-1 bg-white/20 border-yellow-400/50 text-white placeholder-white/60 focus:ring-yellow-300 focus:border-yellow-300 min-h-[70px] text-sm sm:text-base" />
                    ) : (
                      <Input id={field.name} name={field.name} type={field.type} value={medicalInfo[field.name]} onChange={handleInputChange} placeholder={field.placeholder} className="mt-1 bg-white/20 border-yellow-400/50 text-white placeholder-white/60 focus:ring-yellow-300 focus:border-yellow-300 text-sm sm:text-base" />
                    )}
                  </div>
                ))
              ) : (
                 personalFields.map(field => medicalInfo[field.name] ? (
                    <div key={field.name} className="py-1.5 sm:py-2 border-b border-white/20 last:border-b-0">
                      <p className="text-xs sm:text-sm font-semibold text-yellow-200 flex items-center">{field.icon}{field.label}:</p>
                      <p className="text-white/90 whitespace-pre-wrap text-sm sm:text-base pl-6">{medicalInfo[field.name]}</p>
                    </div>
                  ) : null)
              )}
              
              <h4 className="text-lg sm:text-xl font-semibold text-yellow-300 border-b border-yellow-400/50 pb-1 mb-2 sm:mb-3 pt-3 sm:pt-4">Informations Médicales</h4>
              {isEditing ? (
                medicalFields.map(field => (
                  <div key={field.name}>
                    <Label htmlFor={field.name} className="text-yellow-200 font-semibold text-sm sm:text-base">{field.label}</Label>
                    {field.type === 'textarea' ? (
                      <Textarea id={field.name} name={field.name} value={medicalInfo[field.name]} onChange={handleInputChange} placeholder={field.placeholder} className="mt-1 bg-white/20 border-yellow-400/50 text-white placeholder-white/60 focus:ring-yellow-300 focus:border-yellow-300 min-h-[70px] text-sm sm:text-base" />
                    ) : (
                      <Input id={field.name} name={field.name} type={field.type} value={medicalInfo[field.name]} onChange={handleInputChange} placeholder={field.placeholder} className="mt-1 bg-white/20 border-yellow-400/50 text-white placeholder-white/60 focus:ring-yellow-300 focus:border-yellow-300 text-sm sm:text-base" />
                    )}
                  </div>
                ))
              ) : (
                 isEmpty && !isEditing && personalFields.every(pf => !medicalInfo[pf.name])? (
                    <div className="text-center py-6 sm:py-8">
                        <Info className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-yellow-300 mb-2 sm:mb-3" />
                        <p className="text-base sm:text-lg text-white/90">Aucune information enregistrée.</p>
                        <p className="text-xs sm:text-sm text-white/70">Cliquez sur "Modifier" pour ajouter vos informations.</p>
                    </div>
                 ) : (
                    medicalFields.map(field => medicalInfo[field.name] ? (
                        <div key={field.name} className="py-1.5 sm:py-2 border-b border-white/20 last:border-b-0">
                        <p className="text-xs sm:text-sm font-semibold text-yellow-200">{field.label}:</p>
                        <p className="text-white/90 whitespace-pre-wrap text-sm sm:text-base">{medicalInfo[field.name]}</p>
                        </div>
                    ) : null)
                 )
              )}
               {!isEditing && !isEmpty && Object.values(medicalInfo).filter(v=>v).length === 0 && (
                 <div className="text-center py-6 sm:py-8">
                    <Info className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-yellow-300 mb-2 sm:mb-3" />
                    <p className="text-base sm:text-lg text-white/90">Aucune information médicale spécifique enregistrée.</p>
                    <p className="text-xs sm:text-sm text-white/70">Cliquez sur "Modifier" pour en ajouter.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default MedicalInfoPage;