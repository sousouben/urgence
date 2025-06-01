import React from 'react';
    import { motion } from 'framer-motion';
    import { ArrowLeft, Info, Mail, UserCircle, ShieldQuestion } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

    const AboutPage = () => {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl bg-white/20 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl text-white"
        >
          <Link to="/" className="inline-block mb-6">
            <Button variant="outline" className="text-yellow-300 border-yellow-300 hover:bg-yellow-300 hover:text-red-700">
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'accueil
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-6 flex items-center">
            <Info className="mr-3 h-8 w-8 sm:h-10 sm:w-10" /> À Propos de Répertoire d'Urgence
          </h1>

          <Card className="bg-white/10 border-yellow-400/50 mb-6">
            <CardHeader>
              <CardTitle className="text-yellow-200 text-xl sm:text-2xl">Notre Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-sm sm:text-base">
                L'application Répertoire d'Urgence a été conçue pour offrir un moyen simple, rapide et fiable de stocker et d'accéder à vos contacts importants en cas de nécessité. Dans les moments critiques, chaque seconde compte, et notre objectif est de vous aider à joindre rapidement les bonnes personnes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-yellow-400/50 mb-6">
            <CardHeader>
              <CardTitle className="text-yellow-200 text-xl sm:text-2xl">Fonctionnalités Clés</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside ml-4 text-white/90 space-y-1 text-sm sm:text-base">
                <li>Numéros d'urgence essentiels pré-enregistrés et non modifiables.</li>
                <li>Ajout facile de contacts personnels (nom, rôle, téléphone, icône, adresse).</li>
                <li>Modification et suppression sécurisée (avec confirmation) des contacts personnels.</li>
                <li>Recherche rapide pour trouver instantanément le contact désiré.</li>
                <li>Boutons d'appel direct pour une action immédiate.</li>
                <li>Stockage local : vos contacts personnels restent sur votre appareil, accessibles hors ligne.</li>
                <li>Interface épurée et responsive pour une utilisation optimale sur tous les appareils.</li>
                <li>Protection par mot de passe (local) pour la suppression des contacts.</li>
                <li>Choix d'avatar pour votre profil utilisateur.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-yellow-400/50">
            <CardHeader>
              <CardTitle className="text-yellow-200 text-xl sm:text-2xl">Développeur</CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base">
              <div className="flex items-center mb-2">
                <UserCircle className="mr-2 h-5 w-5 text-yellow-300" />
                <p className="text-white/90">Cette application a été développée par <strong className="text-yellow-300">wpdevdesigns</strong>.</p>
              </div>
              <div className="flex items-center">
                <ShieldQuestion className="mr-2 h-5 w-5 text-yellow-300" />
                <p className="text-white/90">Pour toute question ou suggestion, vous pouvez consulter les pages <Link to="/mentions-legales" className="text-yellow-300 hover:underline">Mentions Légales</Link> ou <Link to="/confidentialite" className="text-yellow-300 hover:underline">Politique de Confidentialité</Link>.</p>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-center mt-8 text-white/70">Version 1.1.0 - © {new Date().getFullYear()} wpdevdesigns</p>
        </motion.div>
      );
    };

    export default AboutPage;