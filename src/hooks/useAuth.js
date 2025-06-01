import { useState, useEffect } from 'react';

    export const useAuth = (toast) => {
      const [profile, setProfile] = useState(null);
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [showPasswordModal, setShowPasswordModal] = useState(false);
      const [passwordInput, setPasswordInput] = useState('');
      const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);
      const [actionToConfirm, setActionToConfirm] = useState(null);
      const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

      useEffect(() => {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
          const parsedProfile = JSON.parse(storedProfile);
          setProfile(parsedProfile);
          // setIsAuthenticated(true); // Auto-login if profile exists - REMOVED for simpler no-auth flow
        }
      }, []);

      useEffect(() => {
        if (profile) {
          localStorage.setItem('userProfile', JSON.stringify(profile));
        } else {
           localStorage.removeItem('userProfile'); // Clear profile if set to null
        }
      }, [profile]);

      const handleCreateProfile = (newProfile) => {
        setProfile(newProfile);
        setIsAuthenticated(true); 
        setShowCreateProfileModal(false);
        toast({ title: "Profil Enregistré", description: `Vos informations ont été enregistrées localement.`, className: "bg-green-500 text-white" });
      };

      const handleLogin = () => {
        if (!profile) {
          toast({ title: "Aucun Profil", description: "Aucun profil n'a été enregistré localement.", variant: "destructive" });
          setShowPasswordModal(false);
          // setShowCreateProfileModal(true); // No longer automatically show create profile
          return;
        }
        if (passwordInput === profile.password) {
          setIsAuthenticated(true);
          setShowPasswordModal(false);
          setPasswordInput('');
          if (actionToConfirm) {
            actionToConfirm();
            setActionToConfirm(null);
          }
          toast({ title: "Accès Autorisé", description: `Action confirmée.`, className: "bg-green-500 text-white" });
        } else {
          toast({ title: "Erreur", description: "Mot de passe incorrect.", variant: "destructive" });
        }
      };

      const handleLogout = () => {
        setIsAuthenticated(false);
        setPasswordInput(''); 
        // toast({ title: "Déconnexion", description: "Vous avez été déconnecté.", className: "bg-blue-500 text-white" }); // Not relevant in no-auth flow
      };

      // This function will now be used to gate actions that might still need a password if a profile exists.
      // However, per user request to remove login/signup, this might become vestigial or only used if a password was set on a *previous* version.
      // For true no-auth, actions like delete would not call this.
      const requestPassword = (action) => {
        if (!profile || !profile.password) { // If no profile or no password set in profile
            action(); // Perform action directly
            return;
        }

        if (isAuthenticated) {
          action();
        } else {
          setActionToConfirm(() => action); 
          setShowPasswordModal(true);
        }
      };

      const handleForgotPasswordRequest = (usernameAttempt) => {
        // This logic is largely irrelevant now but kept for structural integrity if ever re-enabled.
        if (profile && profile.username === usernameAttempt) {
            toast({
                title: "Information",
                description: `Si un mot de passe était configuré, il serait '${profile.password}'. L'application n'utilise plus de mots de passe complexes.`,
                duration: 9000, 
                className: "bg-blue-500 text-white"
            });
        } else if (profile && profile.username !== usernameAttempt) {
            toast({
                title: "Erreur",
                description: "Nom d'utilisateur incorrect (si un profil existait).",
                variant: "destructive"
            });
        } else {
             toast({
                title: "Aucun Profil",
                description: "Aucun profil utilisateur n'est configuré.",
                variant: "destructive"
            });
        }
        setShowForgotPasswordModal(false);
    };
      
      return {
        profile,
        setProfile, // Keep for MedicalInfo page to save data
        isAuthenticated, // Still useful for UI elements if profile data exists
        // All password/login related states and handlers are now less relevant or simplified
        showPasswordModal, 
        setShowPasswordModal,
        passwordInput,
        setPasswordInput,
        showCreateProfileModal, // Still used by MedicalInfo to save initial data
        setShowCreateProfileModal,
        actionToConfirm,
        setActionToConfirm,
        handleCreateProfile, // Used by MedicalInfo
        handleLogin, // Simplified use
        handleLogout, // Simplified use
        requestPassword, // Simplified use
        showForgotPasswordModal,
        setShowForgotPasswordModal,
        handleForgotPasswordRequest,
      };
    };