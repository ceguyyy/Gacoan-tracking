const API_BASE = 'https://api-officeless-dev.mekari.com/28086';

export const API_ENDPOINTS = {
  getAllTask: `${API_BASE}/get-all-task`,
  locationHit: `${API_BASE}/location-hit`,
  submitActivity: `${API_BASE}/getdataActivity`,
  getUsers: `${API_BASE}/get/user/gacoan`,
  getFace: `${API_BASE}/get-face`,
};

export const fetchUsers = async () => {
  const res = await fetch(API_ENDPOINTS.getUsers);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
};

export const fetchTasks = async () => {
  const res = await fetch(API_ENDPOINTS.getAllTask);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  // API returns either:
  // - Array of tasks directly: [{...}, {...}]
  // - Object with find_records_value: { find_records_value: [{...}] }
  if (Array.isArray(data)) {
    return data;
  }
  if (data?.find_records_value && Array.isArray(data.find_records_value)) {
    return data.find_records_value;
  }
  return [];
};

export const fetchLocations = async () => {
  const res = await fetch(API_ENDPOINTS.locationHit);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
};

export const fetchFaceData = async () => {
  const res = await fetch(API_ENDPOINTS.getFace);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
};

export const fetchInitialAppData = async () => {
  const [tasks, locations, users, faces] = await Promise.all([
    fetchTasks().catch(() => []),
    fetchLocations().catch(() => []),
    fetchUsers().catch(() => []),
    fetchFaceData().catch(() => []),
  ]);
  return { tasks, locations, users, faces };
};

export const submitTaskActivity = async (payload) => {
  const res = await fetch(API_ENDPOINTS.submitActivity, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Server error ${res.status}`);
  return res.json();
};
