import React from 'react';
    import { motion } from 'framer-motion';
    import { ArrowLeft } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';

    const PrivacyPolicyPage = () => {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-6">Politique de Confidentialité</h1>
          
          <section className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-2">Introduction</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Bienvenue sur notre application Répertoire d'Urgence. Nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.
              L'application est développée par wpdevdesigns.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-2">Collecte des informations</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Nous collectons les informations que vous nous fournissez directement lorsque vous utilisez l'application. Cela inclut :
            </p>
            <ul className="list-disc list-inside ml-4 text-white/90 text-sm sm:text-base">
              <li>Les informations de profil (nom d'utilisateur, mot de passe pour l'authentification locale, choix d'avatar).</li>
              <li>Les informations des contacts d'urgence (nom, rôle, numéro de téléphone, icône, adresse).</li>
            </ul>
            <p className="text-white/90 mt-2 text-sm sm:text-base">
              Toutes ces informations sont stockées <strong className="text-yellow-300">uniquement localement sur votre appareil</strong> (via le localStorage de votre navigateur). Nous n'avons aucun accès à ces données et elles ne sont transmises à aucun serveur externe.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-2">Utilisation des informations</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Les informations collectées sont utilisées uniquement pour :
            </p>
            <ul className="list-disc list-inside ml-4 text-white/90 text-sm sm:text-base">
              <li>Fournir et améliorer les fonctionnalités de l'application.</li>
              <li>Personnaliser votre expérience utilisateur.</li>
              <li>Permettre l'authentification pour protéger certaines actions (comme la suppression de contacts).</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-2">Partage des informations</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Nous ne partageons <strong className="text-yellow-300">jamais</strong> vos informations personnelles avec des tiers, car toutes les données sont stockées localement sur votre appareil et ne nous sont pas accessibles.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-2">Sécurité des informations</h2>
            <p className="text-white/90 text-sm sm:text-base">
              La sécurité de vos informations dépend de la sécurité de votre appareil et de votre navigateur. Le mot de passe de votre profil est utilisé pour une authentification locale simple. Soyez conscient des risques si votre appareil est compromis.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-2">Vos droits</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Puisque toutes les données sont stockées localement, vous avez un contrôle total sur celles-ci. Vous pouvez :
            </p>
            <ul className="list-disc list-inside ml-4 text-white/90 text-sm sm:text-base">
              <li>Accéder, modifier ou supprimer vos contacts d'urgence personnels directement dans l'application.</li>
              <li>Supprimer votre profil en effaçant les données de l'application dans les paramètres de votre navigateur (généralement en effaçant les données de site ou le localStorage pour ce site).</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-2">Modifications de cette politique</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous notifierons de tout changement en publiant la nouvelle politique sur cette page.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-200 mb-2">Contact</h2>
            <p className="text-white/90 text-sm sm:text-base">
             Pour toute question concernant cette politique de confidentialité, veuillez vous référer aux informations de contact sur la page "À Propos".
            </p>
          </section>
          <p className="text-xs text-center mt-6 text-white/70">Dernière mise à jour : 31 mai 2025</p>
        </motion.div>
      );
    };

    export default PrivacyPolicyPage;