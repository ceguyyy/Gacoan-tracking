import { useState, useCallback, useRef } from 'react';
import { getDistance } from '../utils/geo';

export function useValidationController(locations) {
  const [locationStatus, setLocationStatus] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationMessage, setLocationMessage] = useState('');

  const [faceStatus, setFaceStatus] = useState(null);
  const [faceMessage, setFaceMessage] = useState('');
  const [capturedFace, setCapturedFace] = useState(null);

  // Store last task so we can retry without re-passing it
  const lastTaskRef = useRef(null);

  const resetValidation = useCallback(() => {
    setLocationStatus(null);
    setUserLocation(null);
    setLocationMessage('');
    setFaceStatus(null);
    setFaceMessage('');
    setCapturedFace(null);
  }, []);

  // ── Core geolocation logic ──────────────────────────────────────────────────
  const _doGeoRequest = useCallback((task, highAccuracy) => {
    const accuracyLabel = highAccuracy ? 'GPS presisi tinggi' : 'lokasi jaringan';
    setLocationMessage(`Mendapatkan ${accuracyLabel}…`);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude, accuracy } = coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocationMessage('Memvalidasi radius…');

        const locData = locations.find((l) => l.id === task.location?.id);
        let targetLat = locData?.location?.latitude;
        let targetLng = locData?.location?.longitude;
        const maxRadius = locData?.max_radius_km ? locData.max_radius_km * 1000 : 50;

        if (!targetLat || !targetLng) {
          targetLat = latitude;
          targetLng = longitude;
        }

        const distance = getDistance(latitude, longitude, targetLat, targetLng);

        setTimeout(() => {
          if (distance <= maxRadius) {
            setLocationStatus('valid');
            setLocationMessage(`Radius Valid! Jarak: ${Math.round(distance)}m (akurasi ±${Math.round(accuracy)}m).`);
          } else {
            setLocationStatus('invalid');
            setLocationMessage(`Di luar radius! Jarak: ${Math.round(distance)}m (Maks: ${maxRadius}m).`);
          }
        }, 800);
      },
      (err) => {
        // If high-accuracy failed with TIMEOUT or UNAVAILABLE → retry with low accuracy
        if (highAccuracy && (err.code === 2 || err.code === 3)) {
          setLocationMessage('GPS presisi rendah, mencoba lokasi jaringan…');
          setTimeout(() => _doGeoRequest(task, false), 300);
        } else if (err.code === 1) {
          setLocationStatus('geo_error');
          setLocationMessage('Izin lokasi ditolak. Aktifkan akses lokasi di pengaturan browser.');
        } else {
          setLocationStatus('geo_error');
          setLocationMessage('Gagal mendapatkan lokasi. Pastikan GPS/lokasi aktif dan coba lagi.');
        }
      },
      highAccuracy
        ? { enableHighAccuracy: true,  timeout: 8000,  maximumAge: 0 }
        : { enableHighAccuracy: false, timeout: 12000, maximumAge: 60000 }
    );
  }, [locations]);

  const validateLocation = useCallback((task) => {
    lastTaskRef.current = task;
    setLocationStatus('checking');
    setLocationMessage('Mendapatkan lokasi Anda…');

    if (!navigator.geolocation) {
      setLocationStatus('geo_error');
      setLocationMessage('Browser tidak mendukung geolokasi.');
      return;
    }

    // Start with high accuracy; will auto-fallback to low accuracy on error
    _doGeoRequest(task, true);
  }, [_doGeoRequest]);

  // Retry button handler — reuses last task
  const retryLocation = useCallback(() => {
    if (!lastTaskRef.current) return;
    setLocationStatus('checking');
    _doGeoRequest(lastTaskRef.current, true);
  }, [_doGeoRequest]);

  const handleFaceCapture = useCallback((file) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setCapturedFace(imageUrl);
    setFaceStatus('checking');
    setFaceMessage('Mengecek kemiripan wajah...');

    // TODO: Replace with your own Face Recognition Service API call
    setTimeout(() => {
      setFaceStatus('valid');
      setFaceMessage('Wajah terverifikasi!');
    }, 2000);
  }, []);

  return {
    locationStatus,
    userLocation,
    locationMessage,
    faceStatus,
    faceMessage,
    capturedFace,
    validateLocation,
    retryLocation,
    handleFaceCapture,
    resetValidation,
  };
}

