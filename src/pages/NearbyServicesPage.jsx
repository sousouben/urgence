import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { ArrowLeft, Siren, MapPin, Search, Hotel as Hospital, Pill as Pharmacy, AlertTriangle } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';

    const SERVICE_TYPES = [
      { value: 'hospital', label: 'Hôpitaux', icon: <Hospital className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />, overpassType: 'amenity=hospital' },
      { value: 'pharmacy', label: 'Pharmacies', icon: <Pharmacy className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />, overpassType: 'amenity=pharmacy' },
      { value: 'police', label: 'Postes de Police', icon: <Siren className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />, overpassType: 'amenity=police' },
      { value: 'fire_station', label: 'Casernes de Pompiers', icon: <Siren className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />, overpassType: 'amenity=fire_station' },
    ];

    const NearbyServicesPage = ({ location }) => {
      const { toast } = useToast();
      const [services, setServices] = useState([]);
      const [selectedServiceType, setSelectedServiceType] = useState(SERVICE_TYPES[0]);
      const [isLoading, setIsLoading] = useState(false);
      const [searchRadius, setSearchRadius] = useState(5000); 

      const fetchNearbyServices = async (lat, lon, typeConfig, radius) => {
        setIsLoading(true);
        setServices([]);
        
        await executeOverpassQuery(lat, lon, typeConfig.overpassType, radius, typeConfig.label);
        setIsLoading(false);
      };

      const executeOverpassQuery = async (lat, lon, overpassType, radius, serviceLabel) => {
         const overpassQuery = `
          [out:json][timeout:25];
          (
            node[${overpassType}](around:${radius},${lat},${lon});
            way[${overpassType}](around:${radius},${lat},${lon});
            relation[${overpassType}](around:${radius},${lat},${lon});
          );
          out center; 
        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Erreur Overpass API: ${response.status}`);
          }
          const data = await response.json();
          const formattedServices = data.elements
            .filter(el => el.tags && (el.tags.name || el.tags.operator))
            .map(el => {
              const elLat = el.lat || el.center?.lat;
              const elLon = el.lon || el.center?.lon;
              return {
                id: el.id,
                name: el.tags.name || el.tags.operator || 'Service sans nom',
                type: el.tags.amenity || el.tags.emergency,
                lat: elLat,
                lon: elLon,
                distance: calculateDistance(lat, lon, elLat, elLon),
                address: formatAddress(el.tags),
                openingHours: el.tags.opening_hours || null,
              };
            })
            .sort((a,b) => a.distance - b.distance);
          
          setServices(formattedServices);
          if (formattedServices.length === 0) {
            toast({ title: "Aucun service trouvé", description: `Aucun ${serviceLabel.toLowerCase()} trouvé dans un rayon de ${radius/1000}km.`, variant: "default" });
          }
        } catch (error) {
          console.error("Erreur de récupération des services:", error);
          toast({ title: "Erreur de Réseau", description: `Impossible de récupérer les ${serviceLabel.toLowerCase()} à proximité.`, variant: "destructive" });
        }
      };
      
      const formatAddress = (tags) => {
        const parts = ['addr:housenumber', 'addr:street', 'addr:postcode', 'addr:city'];
        return parts.map(part => tags[part]).filter(Boolean).join(', ');
      };

      const calculateDistance = (lat1, lon1, lat2, lon2) => {
        if (lat2 === undefined || lon2 === undefined) return Infinity;
        const R = 6371; 
        const dLat = deg2rad(lat2-lat1);
        const dLon = deg2rad(lon2-lon1); 
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const d = R * c; 
        return d;
      }

      const deg2rad = (deg) => {
        return deg * (Math.PI/180)
      }


      useEffect(() => {
        if (location && selectedServiceType) {
          fetchNearbyServices(location.latitude, location.longitude, selectedServiceType, searchRadius);
        }
      }, [location, selectedServiceType, searchRadius]);


      if (!location) {
        return (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center text-lg sm:text-xl text-yellow-200 mt-10 py-10 px-4"
          >
            <MapPin className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-yellow-300 mb-4" />
            La localisation GPS est nécessaire pour afficher les services à proximité.
            <br />
            Veuillez activer votre GPS sur la page d'accueil.
            <Link to="/" className="block mt-4">
                <Button variant="outline" className="text-yellow-300 border-yellow-300 hover:bg-yellow-300 hover:text-red-700 text-sm sm:text-base">
                    <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4" /> Retour à l'accueil
                </Button>
            </Link>
          </motion.div>
        );
      }


      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl mx-auto bg-white/20 backdrop-blur-md p-3 sm:p-4 md:p-6 rounded-xl shadow-2xl text-white"
        >
          <Link to="/" className="inline-block mb-3 sm:mb-4">
            <Button variant="outline" className="text-yellow-300 border-yellow-300 hover:bg-yellow-300 hover:text-red-700 text-xs sm:text-sm">
              <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Retour
            </Button>
          </Link>
          
          <Card className="bg-white/10 border-yellow-400/50">
            <CardHeader className="text-center pb-3 sm:pb-4">
              <Siren className="mx-auto h-8 w-8 sm:h-10 md:h-12 text-yellow-300 mb-1 sm:mb-2" />
              <CardTitle className="text-yellow-300 text-lg sm:text-xl md:text-2xl">Services d'Urgence à Proximité</CardTitle>
              <CardDescription className="text-white/80 text-xs sm:text-sm">
                Position: Lat {location.latitude.toFixed(3)}, Lon {location.longitude.toFixed(3)}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-4 pb-3 sm:pb-4">
              <div className="mb-3 sm:mb-4 flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                {SERVICE_TYPES.map(type => (
                  <Button 
                    key={type.value}
                    variant={selectedServiceType.value === type.value ? "default" : "outline"}
                    onClick={() => setSelectedServiceType(type)}
                    className={`${selectedServiceType.value === type.value ? 'bg-yellow-400 text-red-700' : 'text-yellow-300 border-yellow-300 hover:bg-yellow-300/20'} text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-1.5 h-auto`}
                  >
                    {type.icon} {type.label}
                  </Button>
                ))}
              </div>
              <div className="mb-3 sm:mb-4 flex items-center justify-center space-x-1.5 sm:space-x-2">
                <label htmlFor="radius-select" className="text-white/90 text-xs sm:text-sm">Rayon:</label>
                <select 
                    id="radius-select" 
                    value={searchRadius} 
                    onChange={(e) => setSearchRadius(Number(e.target.value))}
                    className="bg-white/20 border border-yellow-400/50 rounded-md p-1 text-xs sm:text-sm text-white focus:ring-yellow-300 focus:border-yellow-300"
                >
                    <option value="1000">1 km</option>
                    <option value="2000">2 km</option>
                    <option value="5000">5 km</option>
                    <option value="10000">10 km</option>
                    <option value="20000">20 km</option>
                </select>
              </div>

              {isLoading && (
                <div className="text-center py-4 sm:py-6">
                  <Search className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 animate-spin mb-1 sm:mb-2" />
                  <p className="text-white/80 text-sm sm:text-base">Recherche en cours...</p>
                </div>
              )}

              {!isLoading && services.length === 0 && (
                <div className="text-center py-4 sm:py-6">
                  <AlertTriangle className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-orange-400 mb-1 sm:mb-2" />
                  <p className="text-white/80 text-sm sm:text-base">Aucun service de type "{selectedServiceType.label}" trouvé.</p>
                   <p className="text-xs text-white/70">Essayez d'augmenter le rayon de recherche.</p>
                </div>
              )}

              {!isLoading && services.length > 0 && (
                <div className="space-y-2 sm:space-y-3 max-h-80 sm:max-h-96 overflow-y-auto pr-1 sm:pr-2">
                  {services.map(service => (
                    <Card key={service.id} className="bg-black/20 border-yellow-500/30">
                      <CardContent className="p-2 sm:p-3">
                        <h3 className="font-semibold text-yellow-300 text-sm sm:text-base md:text-lg">{service.name}</h3>
                        <p className="text-xs sm:text-sm text-white/80 capitalize">{service.type?.replace('_', ' ')}</p>
                        {service.address && <p className="text-xs text-white/70 mt-0.5 sm:mt-1">Adresse: {service.address}</p>}
                        {service.openingHours && <p className="text-xs text-white/70 mt-0.5 sm:mt-1">Horaires: {service.openingHours}</p>}
                        <p className="text-xs text-white/70 mt-0.5 sm:mt-1">Distance: {service.distance === Infinity ? 'N/A' : `${service.distance.toFixed(2)} km`}</p>
                        {service.lat && service.lon && (
                           <a 
                            href={`https://www.google.com/maps?q=${service.lat},${service.lon}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-yellow-400 hover:text-yellow-200 text-xs underline mt-0.5 sm:mt-1 inline-block"
                          >
                            Voir sur Google Maps
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default NearbyServicesPage;