import React, { useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope, FaDirections, FaShareAlt, FaSatellite, FaMap, FaStreetView, FaExpand } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { useLanguageTransition } from '../hooks/useLanguageTransition';

interface OfficeLocationProps {
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  businessHours?: string[];
  phone?: string;
  email?: string;
  compactMode?: boolean;
}

const OfficeLocation: React.FC<OfficeLocationProps> = ({
  address,
  coordinates = { lat: 41.7151, lng: 44.8271 }, // Tbilisi center as default
  businessHours,
  phone = "+995 555 123 456",
  email = "info@vifa.ge",
  compactMode = false
}) => {
  const { t } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  
  // Create enhanced Google Maps URLs
  const createMapUrl = (type: string) => {
    return `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&t=${type}&z=16&ie=UTF8&iwloc=&output=embed`;
  };
  
  const mapEmbedUrl = createMapUrl(mapType === 'roadmap' ? 'm' : mapType === 'satellite' ? 'k' : mapType === 'hybrid' ? 'h' : 'p');
  const googleMapsLink = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
  const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
  const streetViewLink = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${coordinates.lat},${coordinates.lng}`;
  
  const shareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Vifa Digital Office Location',
        text: `Visit our office at ${address}`,
        url: googleMapsLink,
      });
    } else {
      navigator.clipboard.writeText(`${address} - ${googleMapsLink}`);
      alert(t('office.addressCopied'));
    }
  };
  
  const handleMapLoad = () => setIsLoading(false);
  const handleMapError = () => { setMapError(true); setIsLoading(false); };

  if (compactMode) {
    return (
      <div className={`rounded-xl p-6 border transition-colors duration-500 ${getTransitionClasses()} ${
        true
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-300'
      }`}>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <FaMapMarkerAlt className="text-blue-400" />
              <h3 className={`text-lg font-semibold ${
                true ? 'text-white' : 'text-slate-900'
              }`}>{t('office.title')}</h3>
            </div>
            <p className={`mb-2 ${
              true ? 'text-slate-300' : 'text-slate-600'
            }`}>{address || t('office.address.full')}</p>
            <div className="flex gap-4 text-sm">
              <a 
                href={`tel:${phone}`}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <FaPhone className="text-xs" />
                {phone}
              </a>
              <a 
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                {t('office.viewOnMaps')} →
              </a>
            </div>
          </div>
          <div className={`w-24 h-24 rounded-lg overflow-hidden border ${
            true ? 'border-slate-600' : 'border-slate-300'
          }`}>
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
              className="pointer-events-none"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-8 border transition-colors duration-500 ${getTransitionClasses()} ${
      true
        ? 'bg-slate-900 border-slate-700'
        : 'bg-white border-slate-300'
    }`}>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <FaMapMarkerAlt className="text-2xl text-blue-400" />
            <h3 className={`text-2xl font-bold ${
              true ? 'text-white' : 'text-slate-900'
            }`}>{t('office.title')}</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className={`text-lg font-semibold mb-2 ${
                true ? 'text-white' : 'text-slate-900'
              }`}>{t('office.address')}</h4>
              <p className={`leading-relaxed ${
                true ? 'text-slate-300' : 'text-slate-600'
              }`}>{address || t('office.address.full')}</p>
              <a 
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <FaMapMarkerAlt />
                {t('office.viewOnMaps')}
              </a>
            </div>

            <div>
              <h4 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${
                true ? 'text-white' : 'text-slate-900'
              }`}>
                <FaClock className="text-blue-400" />
                {t('office.workingHours')}
              </h4>
              <div className="space-y-1">
                {(businessHours || [t('office.hours.weekdays'), t('office.hours.saturday'), t('office.hours.sunday')]).map((hours, index) => (
                  <p key={index} className={true ? 'text-slate-300' : 'text-slate-600'}>{hours}</p>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className={`text-lg font-semibold mb-2 ${
                true ? 'text-white' : 'text-slate-900'
              }`}>{t('office.contact')}</h4>
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-400" />
                <a 
                  href={`tel:${phone}`}
                  className={`transition-colors ${
                    true 
                      ? 'text-slate-300 hover:text-white' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400" />
                <a 
                  href={`mailto:${email}`}
                  className={`transition-colors ${
                    true 
                      ? 'text-slate-300 hover:text-white' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {email}
                </a>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex gap-2 flex-wrap">
                <button 
                  onClick={() => window.open(directionsLink, '_blank')}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm"
                >
                  <FaDirections />
                  {t('office.route')}
                </button>
                <button 
                  onClick={() => window.open(streetViewLink, '_blank')}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm"
                >
                  <FaStreetView />
                  {t('office.streetView')}
                </button>
                <button 
                  onClick={shareLocation}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm"
                >
                  <FaShareAlt />
                  {t('office.share')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Interactive Map */}
        <div>
          <div className={`rounded-xl p-4 ${
            true ? 'bg-slate-800' : 'bg-slate-100'
          }`}>
            {/* Map Controls */}
            <div className={`flex justify-between items-center mb-4 p-2 rounded-lg ${
              true ? 'bg-slate-700' : 'bg-slate-200'
            }`}>
              <div className="flex gap-2">
                <button
                  onClick={() => setMapType('roadmap')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    mapType === 'roadmap' 
                      ? 'bg-blue-500 text-white' 
                      : true 
                        ? 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                        : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
                  }`}
                >
                  <FaMap className="inline mr-1" />
                  {t('office.map')}
                </button>
                <button
                  onClick={() => setMapType('satellite')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    mapType === 'satellite' 
                      ? 'bg-blue-500 text-white' 
                      : true 
                        ? 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                        : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
                  }`}
                >
                  <FaSatellite className="inline mr-1" />
                  {t('office.satellite')}
                </button>
                <button
                  onClick={() => setMapType('hybrid')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    mapType === 'hybrid' 
                      ? 'bg-blue-500 text-white' 
                      : true 
                        ? 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                        : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
                  }`}
                >
                  {t('office.hybrid')}
                </button>
              </div>
              
              <button
                onClick={() => window.open(googleMapsLink, '_blank')}
                className={`transition-colors ${
                  true 
                    ? 'text-slate-300 hover:text-white' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Full Screen"
              >
                <FaExpand />
              </button>
            </div>

            {/* Map Container */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              {isLoading && (
                <div className={`absolute inset-0 flex items-center justify-center ${
                  true ? 'bg-slate-700' : 'bg-slate-300'
                }`}>
                  <div className={`text-center ${
                    true ? 'text-white' : 'text-slate-900'
                  }`}>
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm">{t('office.mapLoading')}</p>
                  </div>
                </div>
              )}
              
              {mapError ? (
                <div className={`h-full flex items-center justify-center ${
                  true ? 'bg-slate-700' : 'bg-slate-300'
                }`}>
                  <div className={`text-center ${
                    true ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <FaMapMarkerAlt className="text-4xl mb-2 mx-auto" />
                    <p>{t('office.mapError')}</p>
                    <button 
                      onClick={() => { setMapError(false); setIsLoading(true); }}
                      className="mt-2 text-blue-400 hover:text-blue-300"
                    >
                      {t('office.retry')}
                    </button>
                  </div>
                </div>
              ) : (
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vifa Digital Office Location"
                  onLoad={handleMapLoad}
                  onError={handleMapError}
                />
              )}
            </div>
          </div>
          
          {/* Enhanced Info Bar */}
          <div className={`mt-4 rounded-lg p-4 ${
            true ? 'bg-slate-800' : 'bg-slate-100'
          }`}>
            <div className="flex justify-between items-center text-sm">
              <div className={`flex items-center gap-2 ${
                true ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <FaMapMarkerAlt className="text-blue-400" />
                <span>{t('office.address.full')}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-green-400">• {t('office.status.open')}</span>
                <span className={true ? 'text-slate-400' : 'text-slate-600'}>10:00-18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeLocation;