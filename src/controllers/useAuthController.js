import { useState, useEffect } from 'react';
import { fetchUsers, fetchFaceData } from '../models/api';

export function useAuthController() {
  const [users, setUsers] = useState([]);
  const [faceDataList, setFaceDataList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuthData = async () => {
      setLoading(true);
      try {
        const [usersData, faceData] = await Promise.all([
          fetchUsers(),
          fetchFaceData()
        ]);
        setUsers(usersData);
        setFaceDataList(faceData);
      } catch (err) {
        setError(err.message || 'Gagal memuat data auth.');
      } finally {
        setLoading(false);
      }
    };
    initAuthData();
  }, []);

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return {
    users,
    faceDataList,
    currentUser,
    loading,
    error,
    login,
    logout
  };
}
