import { useState, useEffect } from 'react';

export function useSettingsController() {
  const [faceRecognitionEnabled, setFaceRecognitionEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('face_recognition_enabled');
    if (saved !== null) {
      setFaceRecognitionEnabled(saved === 'true');
    }
  }, []);

  const toggleFaceRecognition = () => {
    const newValue = !faceRecognitionEnabled;
    setFaceRecognitionEnabled(newValue);
    localStorage.setItem('face_recognition_enabled', newValue.toString());
  };

  return {
    faceRecognitionEnabled,
    toggleFaceRecognition
  };
}
