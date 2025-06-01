import { useState, useCallback } from 'react';

    export const useGeolocation = () => {
      const [location, setLocation] = useState(null);
      const [error, setError] = useState(null);
      const [isLoading, setIsLoading] = useState(false);

      const getLocation = useCallback(() => {
        if (!navigator.geolocation) {
          setError('La géolocalisation n\'est pas supportée par votre navigateur.');
          return;
        }

        setIsLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setIsLoading(false);
          },
          (err) => {
            setError(`Erreur de géolocalisation: ${err.message}`);
            setIsLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000, // 10 seconds
            maximumAge: 0 // Force fresh location
          }
        );
      }, []);

      return { location, error, isLoading, getLocation };
    };