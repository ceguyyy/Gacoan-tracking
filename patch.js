const fs = require('fs');
let code = fs.readFileSync('src/TaskActivity.jsx', 'utf8');

// 1. API
code = code.replace(
`const API = {
  getAllTask: 'https://api-officeless-dev.mekari.com/28086/get-all-task',
  locationHit: 'https://api-officeless-dev.mekari.com/28086/location-hit',
  submitActivity: 'https://api-officeless-dev.mekari.com/28086/getdataActivity',
};`,
`const API = {
  getAllTask: 'https://api-officeless-dev.mekari.com/28086/get-all-task',
  locationHit: 'https://api-officeless-dev.mekari.com/28086/location-hit',
  submitActivity: 'https://api-officeless-dev.mekari.com/28086/getdataActivity',
  getUsers: 'https://api-officeless-dev.mekari.com/28086/get/user/gacoan',
  getFace: 'https://api-officeless-dev.mekari.com/28086/get-face',
};`);

// 2. SCREEN
code = code.replace(
`const SCREEN = {
  TASK_SELECT: 'TASK_SELECT',
  LOCATION_CHECK: 'LOCATION_CHECK',
  TASK_EXECUTION: 'TASK_EXECUTION',
  COMPLETED: 'COMPLETED',
};`,
`const SCREEN = {
  LOGIN: 'LOGIN',
  TASK_SELECT: 'TASK_SELECT',
  VALIDATION_INITIAL: 'VALIDATION_INITIAL',
  TASK_EXECUTION: 'TASK_EXECUTION',
  VALIDATION_FINAL: 'VALIDATION_FINAL',
  COMPLETED: 'COMPLETED',
};`);

fs.writeFileSync('src/TaskActivity.jsx', code);
