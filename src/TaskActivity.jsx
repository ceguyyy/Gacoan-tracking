import React, { useState } from 'react';
import { token, s } from './views/styles/theme';
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
  // Dashboard screens (inside sidebar layout)
  TASK_SELECT: 'TASK_SELECT',
  SETTINGS: 'SETTINGS',
  PROFILE: 'PROFILE',
  // Task flow (inside dashboard but with back navigation)
  VALIDATION_INITIAL: 'VALIDATION_INITIAL',
  TASK_EXECUTION: 'TASK_EXECUTION',
  VALIDATION_FINAL: 'VALIDATION_FINAL',
  COMPLETED: 'COMPLETED',
};

// Map sidebar nav IDs to screens
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
        justifyContent: 'center', flexDirection: 'column', gap: token.spacing4,
      }}>
        <Spinner size={36} />
        <p style={{ color: token.colorNeutral800, fontSize: token.fontSizeMd }}>
          Memuat data aplikasi...
        </p>
      </div>
    );
  }

  // ── Login Screen (full page, no sidebar) ──────────────────────────────────
  if (screen === SCREEN.LOGIN) {
    return (
      <div style={{ ...s.appWrapper, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: token.spacing4 }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {authController.error && <div style={{ ...s.alert('error'), marginBottom: token.spacing4 }}>{authController.error}</div>}
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
      {/* Error banners */}
      {taskController.error && <div style={s.alert('error')}>{taskController.error}</div>}
      {taskController.submitError && <div style={s.alert('error')}>{taskController.submitError}</div>}

      {/* ── Screens ─────────────────────────────────────────────────────────── */}
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
