import React from 'react';
    import { motion } from 'framer-motion';
    import { ArrowLeft } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';

    const LegalNoticePage = () => {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-6">Mentions Légales</h1>

          <section className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-2">Éditeur de l'application</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Nom : wpdevdesigns<br />
              Statut : Entrepreneur Individuel (ou à adapter selon votre statut réel)
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-2">Hébergement</h2>
            <p className="text-white/90 text-sm sm:text-base">
              L'application est une application web front-end qui s'exécute dans le navigateur de l'utilisateur. Les données sont stockées localement sur l'appareil de l'utilisateur via le localStorage du navigateur. Aucun hébergement de données serveur n'est effectué par l'éditeur pour les données personnelles des utilisateurs.
              L'application elle-même est hébergée par Hostinger (si applicable, sinon à adapter).
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-2">Propriété Intellectuelle</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Tous les contenus présents sur l'application, incluant, de façon non limitative, les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme sont la propriété exclusive de wpdevdesigns à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
            </p>
            <p className="text-white/90 mt-2 text-sm sm:text-base">
              Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de wpdevdesigns.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-2">Limitation de responsabilité</h2>
            <p className="text-white/90 text-sm sm:text-base">
              L'application Répertoire d'Urgence est fournie "en l'état". wpdevdesigns ne saurait être tenu pour responsable des erreurs, omissions, ou pour les résultats qui pourraient être obtenus par un mauvais usage de ces informations. L'utilisateur est seul responsable de l'exactitude des informations qu'il saisit et de l'utilisation qu'il fait de l'application.
            </p>
            <p className="text-white/90 mt-2 text-sm sm:text-base">
              L'application vise à fournir un accès rapide à des numéros d'urgence. Elle ne se substitue en aucun cas aux services d'urgence officiels et ne garantit pas la disponibilité ou le fonctionnement des services d'appel téléphonique.
            </p>
          </section>
          
          <section className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-2">Données personnelles</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Pour plus d'informations sur la gestion de vos données personnelles, veuillez consulter notre <Link to="/confidentialite" className="text-yellow-300 hover:underline">Politique de Confidentialité</Link>.
            </p>
          </section>

          <p className="text-xs text-center mt-6 text-white/70">Dernière mise à jour : 31 mai 2025</p>
        </motion.div>
      );
    };

    export default LegalNoticePage;