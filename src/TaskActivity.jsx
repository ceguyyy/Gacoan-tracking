import React, { useState } from 'react';
import { useTheme } from './views/styles/ThemeContext';
import { useAuthController } from './controllers/useAuthController';
import { useTaskController } from './controllers/useTaskController';
import { useValidationController } from './controllers/useValidationController';
import { useSettingsController } from './controllers/useSettingsController';
import { Spinner } from './views/components/SharedComponents';
import { DashboardLayout } from './views/components/DashboardLayout';
import {
  ScreenLogin,
  ScreenTaskSelect,
  ScreenValidation,
  ScreenTaskExecution,
  ScreenCompleted,
  ScreenSettings,
  ScreenProfile,
} from './views/screens';

// ─── Screen/Route constants ───────────────────────────────────────────────────
const SCREEN = {
  LOGIN: 'LOGIN',
  TASK_SELECT: 'TASK_SELECT',
  SETTINGS: 'SETTINGS',
  PROFILE: 'PROFILE',
  VALIDATION_INITIAL: 'VALIDATION_INITIAL',
  TASK_EXECUTION: 'TASK_EXECUTION',
  VALIDATION_FINAL: 'VALIDATION_FINAL',
  COMPLETED: 'COMPLETED',
};

const NAV_SCREEN_MAP = {
  tasks: SCREEN.TASK_SELECT,
  settings: SCREEN.SETTINGS,
  profile: SCREEN.PROFILE,
};

const SCREEN_NAV_MAP = {
  [SCREEN.TASK_SELECT]: 'tasks',
  [SCREEN.VALIDATION_INITIAL]: 'tasks',
  [SCREEN.TASK_EXECUTION]: 'tasks',
  [SCREEN.VALIDATION_FINAL]: 'tasks',
  [SCREEN.COMPLETED]: 'tasks',
  [SCREEN.SETTINGS]: 'settings',
  [SCREEN.PROFILE]: 'profile',
};

const PAGE_TITLES = {
  [SCREEN.TASK_SELECT]: 'Daftar Tugas',
  [SCREEN.VALIDATION_INITIAL]: 'Validasi Kehadiran',
  [SCREEN.TASK_EXECUTION]: 'Kerjakan Tugas',
  [SCREEN.VALIDATION_FINAL]: 'Validasi Akhir',
  [SCREEN.COMPLETED]: 'Selesai',
  [SCREEN.SETTINGS]: 'Pengaturan',
  [SCREEN.PROFILE]: 'Profil Saya',
};

export default function TaskActivity() {
  const { t, s, isDark, toggleTheme } = useTheme();
  const [screen, setScreen] = useState(SCREEN.LOGIN);
  const [validationType, setValidationType] = useState('initial');

  const authController = useAuthController();
  const taskController = useTaskController(authController.currentUser);
  const valController = useValidationController(taskController.locations);
  const settingsController = useSettingsController();

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleLogin = (user) => {
    authController.login(user);
    setScreen(SCREEN.TASK_SELECT);
  };

  const handleNavChange = (navId) => {
    const target = NAV_SCREEN_MAP[navId];
    if (target) {
      taskController.clearSelectedTask();
      valController.resetValidation();
      setScreen(target);
    }
  };

  const handleSelectTask = (task) => {
    taskController.selectTask(task);
    setValidationType('initial');
    setScreen(SCREEN.VALIDATION_INITIAL);
    valController.resetValidation();
    valController.validateLocation(task);
  };

  const handleStartTask = () => {
    taskController.startTaskExecution();
    setScreen(SCREEN.TASK_EXECUTION);
  };

  const handleSubmitIntent = () => {
    setValidationType('final');
    setScreen(SCREEN.VALIDATION_FINAL);
    valController.resetValidation();
    valController.validateLocation(taskController.selectedTask);
  };

  const handleFinalSubmit = async () => {
    const success = await taskController.submitActivity(valController.userLocation);
    if (success) setScreen(SCREEN.COMPLETED);
  };

  const handleReset = () => {
    taskController.clearSelectedTask();
    valController.resetValidation();
    setScreen(SCREEN.TASK_SELECT);
  };

  const handleBack = () => {
    if (screen === SCREEN.TASK_EXECUTION || screen === SCREEN.VALIDATION_INITIAL) {
      handleReset();
    } else if (screen === SCREEN.VALIDATION_FINAL) {
      setScreen(SCREEN.TASK_EXECUTION);
    }
  };

  const handleLogout = () => {
    authController.logout();
    taskController.clearSelectedTask();
    valController.resetValidation();
    setScreen(SCREEN.LOGIN);
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  const isLoading = authController.loading || taskController.loading;
  if (isLoading) {
    return (
      <div style={{
        ...s.appWrapper, display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexDirection: 'column', gap: t.spacing4,
      }}>
        <Spinner size={36} />
        <p style={{ color: t.colorNeutral800, fontSize: t.fontSizeMd }}>
          Memuat data aplikasi...
        </p>
      </div>
    );
  }

  // ── Login Screen ──────────────────────────────────────────────────────────
  if (screen === SCREEN.LOGIN) {
    return (
      <div style={{ ...s.appWrapper, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: t.spacing4, position: 'relative' }}>
        {/* Theme toggle on login page */}
        <button
          onClick={toggleTheme}
          title={isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
          style={{
            position: 'absolute', top: t.spacing4, right: t.spacing4,
            width: '34px', height: '34px',
            borderRadius: t.radiusFull,
            border: `1px solid ${t.colorNeutral300}`,
            backgroundColor: t.colorNeutral100,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: t.colorNeutral800,
          }}
        >
          {isDark
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
          }
        </button>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {authController.error && <div style={{ ...s.alert('error'), marginBottom: t.spacing4 }}>{authController.error}</div>}
          <ScreenLogin users={authController.users} onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  // ── Dashboard (with sidebar) ──────────────────────────────────────────────
  const showBack = [SCREEN.VALIDATION_INITIAL, SCREEN.TASK_EXECUTION, SCREEN.VALIDATION_FINAL].includes(screen);

  return (
    <DashboardLayout
      currentUser={authController.currentUser}
      activeNav={SCREEN_NAV_MAP[screen] || 'tasks'}
      onNavChange={handleNavChange}
      onLogout={handleLogout}
      pageTitle={PAGE_TITLES[screen]}
      showBack={showBack}
      onBack={handleBack}
    >
      {taskController.error && <div style={s.alert('error')}>{taskController.error}</div>}
      {taskController.submitError && <div style={s.alert('error')}>{taskController.submitError}</div>}

      {screen === SCREEN.TASK_SELECT && (
        <ScreenTaskSelect
          tasks={taskController.tasks}
          onSelectTask={handleSelectTask}
          currentUser={authController.currentUser}
        />
      )}

      {(screen === SCREEN.VALIDATION_INITIAL || screen === SCREEN.VALIDATION_FINAL) && (
        <ScreenValidation
          validationType={validationType}
          task={taskController.selectedTask}
          locationStatus={valController.locationStatus}
          locationMessage={valController.locationMessage}
          faceStatus={valController.faceStatus}
          faceMessage={valController.faceMessage}
          capturedFace={valController.capturedFace}
          onFaceCapture={valController.handleFaceCapture}
          onRetryLocation={valController.retryLocation}
          onStartTask={handleStartTask}
          onSubmitFinal={handleFinalSubmit}
          submitLoading={taskController.submitLoading}
          faceRecognitionEnabled={settingsController.faceRecognitionEnabled}
        />
      )}

      {screen === SCREEN.TASK_EXECUTION && (
        <ScreenTaskExecution
          task={taskController.selectedTask}
          checklist={taskController.checklist}
          allChecked={taskController.allChecked}
          onToggle={taskController.toggleCheck}
          onSubmitIntent={handleSubmitIntent}
          taskPhotos={taskController.taskPhotos}
          uploadingPhoto={taskController.uploadingPhoto}
          onPhotoUpload={taskController.handlePhotoUpload}
        />
      )}

      {screen === SCREEN.COMPLETED && (
        <ScreenCompleted onReset={handleReset} />
      )}

      {screen === SCREEN.SETTINGS && (
        <ScreenSettings
          faceRecognitionEnabled={settingsController.faceRecognitionEnabled}
          onToggleFaceRecognition={settingsController.toggleFaceRecognition}
        />
      )}

      {screen === SCREEN.PROFILE && (
        <ScreenProfile currentUser={authController.currentUser} />
      )}
    </DashboardLayout>
  );
}
