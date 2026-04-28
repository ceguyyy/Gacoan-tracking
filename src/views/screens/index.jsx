import React from 'react';
import { token } from '../styles/theme';
import { useTheme } from '../styles/ThemeContext';
import { Spinner, ChecklistItem } from '../components/SharedComponents';
import { Text, Flex, Banner, Toggle } from '../components/Pixel';

// ─── Icons ────────────────────────────────────────────────────────────────────
const CalendarIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const LocationIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CheckCircle = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ChevronRight = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const UserIcon = ({ size = 32, color = token.colorBrand }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// ─── Mekari Pixel brand bar ────────────────────────────────────────────────────
function MekariBrandBar() {
  const { t } = useTheme();
  return (
    <div style={{
      height: '3px',
      background: `linear-gradient(90deg, ${t.colorBrand} 0%, ${t.colorBrandMid} 100%)`,
    }} />
  );
}

// ─── Screens ──────────────────────────────────────────────────────────────────

export function ScreenLogin({ users, onLogin }) {
  const { t, s } = useTheme();
  return (
    <div>
      <MekariBrandBar />
      <div style={{ padding: `${t.spacing6} ${t.spacing5} ${t.spacing4}`, textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '56px', height: '56px', borderRadius: t.radiusFull,
          backgroundColor: t.colorBrandLight, marginBottom: t.spacing3,
        }}>
          <UserIcon size={28} color={t.colorBrand} />
        </div>
        <h1 style={{ ...s.cardTitle, fontSize: t.fontSizeLg, marginBottom: t.spacing1 }}>Masuk ke Akun</h1>
        <p style={s.cardSubtitle}>Pilih nama Anda untuk melanjutkan</p>
      </div>

      <div style={s.card}>
        {users.length === 0 ? (
          <div style={{ padding: t.spacing8, textAlign: 'center', color: t.colorNeutral800 }}>
            Tidak ada data user.
          </div>
        ) : (
          users.map((user, idx) => (
            <div
              key={user.id}
              onClick={() => onLogin(user)}
              role="button"
              tabIndex={0}
              style={{
                padding: `${t.spacing3} ${t.spacing5}`,
                borderBottom: idx === users.length - 1 ? 'none' : `1px solid ${t.colorNeutral200}`,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'background-color 0.1s',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = t.colorNeutral100}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing3 }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: t.radiusFull,
                  backgroundColor: t.colorBrandLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: t.fontSizeMd, fontWeight: t.fontWeightSemibold, color: t.colorBrand,
                  flexShrink: 0,
                }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: t.fontWeightSemibold, color: t.colorNeutral1000, fontSize: t.fontSizeBase }}>{user.name}</div>
                  <div style={{ fontSize: t.fontSizeSm, color: t.colorNeutral800 }}>{user.email || user.id}</div>
                </div>
              </div>
              <ChevronRight color={t.colorNeutral400} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function normalizeStatus(statusStr) {
  if (!statusStr) return null;
  const raw = statusStr.toLowerCase().replace(/\s+/g, '_');
  if (raw === 'in_progress') return 'in_progress';
  if (raw === 'done' || raw === 'completed') return 'done';
  if (raw === 'overdue' || raw === 'late') return 'overdue';
  if (raw === 'upcoming' || raw === 'pending') return 'upcoming';
  return raw;
}

function getTaskStatus(task) {
  if (task.status) return normalizeStatus(task.status);
  if (!task.due_date) return 'in_progress';
  const now = Date.now();
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  if (task.due_date < now) return 'overdue';
  if (task.due_date <= endOfToday.getTime()) return 'in_progress';
  return 'upcoming';
}

const STATUS_CONFIG = {
  in_progress: { label: 'In Progress', badgeType: 'brand' },
  done:        { label: 'Selesai',     badgeType: 'success' },
  overdue:     { label: 'Terlambat',   badgeType: 'danger' },
  upcoming:    { label: 'Mendatang',   badgeType: 'neutral' },
};

const FILTERS = [
  { id: 'all',         label: 'Semua' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'upcoming',    label: 'Mendatang' },
  { id: 'done',        label: 'Selesai' },
  { id: 'overdue',     label: 'Terlambat' },
];

export function ScreenTaskSelect({ tasks, onSelectTask, currentUser }) {
  const { t, s } = useTheme();
  const [activeFilter, setActiveFilter] = React.useState('all');

  const counts = React.useMemo(() => {
    const c = { all: tasks.length, in_progress: 0, upcoming: 0, overdue: 0 };
    tasks.forEach(tk => { c[getTaskStatus(tk)]++; });
    return c;
  }, [tasks]);

  const filteredTasks = activeFilter === 'all'
    ? tasks
    : tasks.filter(tk => getTaskStatus(tk) === activeFilter);

  if (tasks.length === 0) {
    return (
      <div style={{ ...s.card, padding: `${t.spacing10} ${t.spacing6}`, textAlign: 'center' }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: t.radiusFull,
          backgroundColor: t.colorNeutral200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: `0 auto ${t.spacing4}`,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={t.colorNeutral800} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <h3 style={{ ...s.cardTitle, marginBottom: t.spacing2 }}>Tidak Ada Tugas</h3>
        <p style={{ ...s.cardSubtitle, maxWidth: '240px', margin: '0 auto' }}>
          Belum ada tugas yang di-assign kepada <strong>{currentUser?.name?.split(' ')[0]}</strong>.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: t.spacing4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: t.fontSizeLg, fontWeight: t.fontWeightSemibold, margin: `0 0 ${t.spacing1}`, color: t.colorNeutral1000 }}>
            Tugas Saya
          </h2>
          <p style={s.helperText}>{tasks.length} tugas di-assign kepada Anda.</p>
        </div>
        <div style={s.badge('brand')}>{tasks.length} Tugas</div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: t.spacing2, marginBottom: t.spacing4, overflowX: 'auto', paddingBottom: '2px' }}>
        {FILTERS.map(({ id, label }) => {
          const active = activeFilter === id;
          const count = counts[id] ?? 0;
          return (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: `6px ${t.spacing3}`,
                borderRadius: t.radiusFull,
                border: `1px solid ${active ? t.colorBrand : t.colorNeutral300}`,
                backgroundColor: active ? t.colorBrand : t.colorWhite,
                color: active ? '#fff' : t.colorNeutral900,
                fontSize: t.fontSizeSm,
                fontWeight: active ? t.fontWeightSemibold : t.fontWeightMedium,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: t.fontFamily,
                transition: 'all 0.15s ease',
                flexShrink: 0,
              }}
            >
              {label}
              {count > 0 && (
                <span style={{
                  backgroundColor: active ? 'rgba(255,255,255,0.25)' : t.colorNeutral200,
                  color: active ? '#fff' : t.colorNeutral800,
                  borderRadius: t.radiusFull,
                  padding: '1px 6px',
                  fontSize: t.fontSizeXs,
                  fontWeight: t.fontWeightBold,
                  lineHeight: '16px',
                }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Empty filtered state */}
      {filteredTasks.length === 0 && (
        <div style={{ ...s.card, padding: `${t.spacing8} ${t.spacing6}`, textAlign: 'center' }}>
          <p style={{ color: t.colorNeutral800, fontSize: t.fontSizeBase }}>
            Tidak ada tugas dengan status <strong>{FILTERS.find(f => f.id === activeFilter)?.label}</strong>.
          </p>
        </div>
      )}

      {/* Task Cards */}
      {filteredTasks.map((task) => {
        const status = getTaskStatus(task);
        const statusCfg = STATUS_CONFIG[status];
        return (
          <div key={task.id} style={s.card}>
            <div style={s.cardBody}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: t.spacing3 }}>
                <h3 style={{ ...s.cardTitle, flex: 1, paddingRight: t.spacing3 }}>{task.description}</h3>
                <div style={s.badge(statusCfg.badgeType)}>{statusCfg.label}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing2, marginBottom: t.spacing4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing2, color: t.colorNeutral800, fontSize: t.fontSizeSm }}>
                  <LocationIcon color={t.colorNeutral800} />
                  <span>{task.location?.name}</span>
                </div>
                {task.due_date && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing2, fontSize: t.fontSizeSm, color: status === 'overdue' ? t.colorDanger : t.colorNeutral800 }}>
                    <CalendarIcon color={status === 'overdue' ? t.colorDanger : t.colorNeutral800} />
                    <span>
                      Tenggat: {new Date(task.due_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                      {status === 'overdue' && <span style={{ fontWeight: t.fontWeightSemibold }}> — Terlambat!</span>}
                    </span>
                  </div>
                )}
                {task.task && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing2, color: t.colorNeutral800, fontSize: t.fontSizeSm }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    <span>{task.task.length} item checklist</span>
                  </div>
                )}
              </div>

              <hr style={s.divider} />

              <button
                style={{ ...s.btnPrimary, ...(status === 'done' ? s.btnDisabled : {}) }}
                onClick={() => status !== 'done' && onSelectTask(task)}
                disabled={status === 'done'}
              >
                {status === 'done' ? 'Tugas Selesai' : 'Mulai Tugas'}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export function ScreenValidation({
  validationType,
  task,
  locationStatus,
  locationMessage,
  faceStatus,
  faceMessage,
  capturedFace,
  onFaceCapture,
  onStartTask,
  onSubmitFinal,
  onRetryLocation,
  submitLoading,
  faceRecognitionEnabled = true
}) {
  const { t, s } = useTheme();
  const isLocValid = locationStatus === 'valid';
  const isFaceValid = faceRecognitionEnabled ? faceStatus === 'valid' : true;
  const allValid = isLocValid && isFaceValid;

  const fileInputRef = React.useRef(null);

  const locAlertConfig = {
    checking: { type: 'info', title: 'Mengecek Lokasi', icon: <Spinner size={16} color={t.colorBrand} /> },
    valid: { type: 'success', title: 'Lokasi Valid', icon: <CheckCircle size={16} color={t.colorSuccess} /> },
    invalid: { type: 'error', title: 'Lokasi Tidak Valid', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.colorDanger} strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> },
    geo_error: { type: 'error', title: 'Error GPS', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.colorDanger} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
  }[locationStatus] || { type: 'info', title: 'Menunggu...', icon: null };

  const faceAlertConfig = {
    checking: { type: 'info', title: 'Memeriksa Wajah', icon: <Spinner size={16} color={t.colorBrand} /> },
    valid: { type: 'success', title: 'Wajah Cocok', icon: <CheckCircle size={16} color={t.colorSuccess} /> },
    invalid: { type: 'error', title: 'Wajah Tidak Cocok', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.colorDanger} strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> },
  }[faceStatus] || { type: 'info', title: 'Ambil foto untuk validasi', icon: null };

  return (
    <div style={s.card}>
      <MekariBrandBar />
      <div style={s.cardHeader}>
        <h2 style={s.cardTitle}>{validationType === 'initial' ? 'Validasi Kehadiran' : 'Validasi Akhir'}</h2>
        <p style={s.cardSubtitle}>Sistem perlu memverifikasi lokasi {faceRecognitionEnabled ? 'dan identitas' : ''} Anda.</p>
      </div>
      <div style={s.cardBody}>

        {/* Step 1: Location */}
        <div style={{ marginBottom: t.spacing5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing2, marginBottom: t.spacing2 }}>
            <div style={{
              width: '20px', height: '20px', borderRadius: t.radiusFull,
              backgroundColor: isLocValid ? t.colorSuccess : t.colorBrand,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: t.fontWeightBold, flexShrink: 0,
            }}>1</div>
            <span style={{ ...s.label, margin: 0 }}>Validasi Lokasi (GPS)</span>
          </div>
          {locationStatus && (
            <div style={s.alert(locAlertConfig.type)}>
              {locAlertConfig.icon}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: t.fontWeightSemibold }}>{locAlertConfig.title}</div>
                <div style={{ marginTop: '2px', opacity: 0.85 }}>{locationMessage}</div>
              </div>
            </div>
          )}
          {locationStatus === 'geo_error' && onRetryLocation && (
            <button
              onClick={onRetryLocation}
              style={{ ...s.btnSecondary, marginTop: t.spacing2, padding: `8px ${t.spacing4}`, width: 'auto', fontSize: t.fontSizeSm, gap: t.spacing2 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-4.99" />
              </svg>
              Coba Lagi
            </button>
          )}
        </div>

        {/* Step 2: Face */}
        {faceRecognitionEnabled && (
          <div style={{ marginBottom: t.spacing6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing2, marginBottom: t.spacing2 }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: t.radiusFull,
                backgroundColor: isFaceValid ? t.colorSuccess : isLocValid ? t.colorBrand : t.colorNeutral300,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: t.fontWeightBold, flexShrink: 0,
              }}>2</div>
              <span style={{ ...s.label, margin: 0 }}>Validasi Wajah</span>
            </div>
            {capturedFace ? (
              <div style={{ display: 'flex', gap: t.spacing3, alignItems: 'center' }}>
                <img src={capturedFace} alt="Selfie"
                  style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: t.radiusMd, border: `1px solid ${t.colorNeutral300}`, flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  {faceStatus && (
                    <div style={s.alert(faceAlertConfig.type)}>
                      {faceAlertConfig.icon}
                      <div>
                        <div style={{ fontWeight: t.fontWeightSemibold }}>{faceAlertConfig.title}</div>
                        <div style={{ marginTop: '2px', opacity: 0.85 }}>{faceMessage}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <button style={{ ...s.btnSecondary, opacity: isLocValid ? 1 : 0.5 }} disabled={!isLocValid} onClick={() => fileInputRef.current?.click()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  Ambil Foto Selfie
                </button>
                {!isLocValid && <p style={{ ...s.helperText, marginTop: t.spacing2 }}>Selesaikan validasi lokasi terlebih dahulu.</p>}
                <input
                  type="file" accept="image/*" capture="user" ref={fileInputRef} style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) onFaceCapture(e.target.files[0]);
                  }}
                />
              </>
            )}
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: t.spacing4 }}>
          {validationType === 'initial' ? (
            <button
              style={{ ...s.btnPrimary, ...(!allValid ? s.btnDisabled : {}) }}
              disabled={!allValid}
              onClick={onStartTask}
            >
              Mulai Kerjakan Tugas
            </button>
          ) : (
            <button
              style={{ ...s.btnSuccess, ...(!allValid || submitLoading ? s.btnDisabled : {}) }}
              disabled={!allValid || submitLoading}
              onClick={onSubmitFinal}
            >
              {submitLoading ? <><Spinner size={16} color="#fff" /> Mengirim...</> : 'Kirim Laporan Final'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ScreenTaskExecution({ task, checklist, allChecked, onToggle, onSubmitIntent, taskPhotos, uploadingPhoto, onPhotoUpload }) {
  const { t, s } = useTheme();
  const totalItems = task?.task?.length ?? 0;
  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const progressPct = totalItems ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <>
      {/* Task Header Card */}
      <div style={s.card}>
        <div style={s.cardBody}>
          <h2 style={{ ...s.cardTitle, marginBottom: t.spacing2 }}>{task?.description}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing2, color: t.colorNeutral800, fontSize: t.fontSizeSm }}>
            <LocationIcon color={t.colorNeutral800} />
            <span>{task?.location?.name}</span>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: t.spacing4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: t.spacing2 }}>
              <span style={{ fontSize: t.fontSizeSm, color: t.colorNeutral800, fontWeight: t.fontWeightMedium }}>Progress</span>
              <span style={{ fontSize: t.fontSizeSm, fontWeight: t.fontWeightSemibold, color: allChecked ? t.colorSuccess : t.colorBrand }}>
                {checkedCount}/{totalItems}
              </span>
            </div>
            <div style={{ height: '6px', backgroundColor: t.colorNeutral200, borderRadius: t.radiusFull, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${progressPct}%`,
                backgroundColor: allChecked ? t.colorSuccess : t.colorBrand,
                borderRadius: t.radiusFull,
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Card */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <h3 style={s.cardTitle}>Daftar Pemeriksaan</h3>
          <p style={s.cardSubtitle}>Centang setiap item dan sertakan bukti foto jika diperlukan.</p>
        </div>
        <div>
          {task?.task?.map((item, index) => (
            <ChecklistItem
              key={index}
              index={index}
              taskName={item.task_name}
              checked={checklist[index] ?? false}
              onToggle={onToggle}
              isLast={index === task.task.length - 1}
              photo={taskPhotos?.[index]}
              uploading={uploadingPhoto?.[index]}
              onPhotoUpload={(file) => onPhotoUpload(index, file)}
            />
          ))}
        </div>
      </div>

      {/* Submit CTA */}
      <div>
        {!allChecked && (
          <p style={{ ...s.helperText, textAlign: 'center', marginBottom: t.spacing3 }}>
            Selesaikan semua {totalItems} item untuk melanjutkan.
          </p>
        )}
        <button
          style={{
            ...s.btnPrimary,
            ...(!allChecked ? s.btnDisabled : {}),
            backgroundColor: allChecked ? t.colorSuccess : t.colorBrand,
            borderColor: allChecked ? t.colorSuccess : t.colorBrand,
          }}
          disabled={!allChecked}
          onClick={onSubmitIntent}
        >
          {allChecked
            ? <><CheckCircle size={16} color="#fff" /> Lanjut Validasi Akhir</>
            : 'Lanjut Validasi Akhir'
          }
        </button>
      </div>
    </>
  );
}

export function ScreenCompleted({ onReset }) {
  const { t, s } = useTheme();
  return (
    <div style={{ ...s.card, textAlign: 'center', padding: `${t.spacing10} ${t.spacing6}` }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '64px', height: '64px', borderRadius: t.radiusFull,
        backgroundColor: t.colorSuccessLight, color: t.colorSuccess, marginBottom: t.spacing4,
      }}>
        <CheckCircle size={32} color={t.colorSuccess} />
      </div>
      <h2 style={{ margin: `0 0 ${t.spacing2}`, fontSize: t.fontSizeXl, fontWeight: t.fontWeightBold, color: t.colorNeutral1000 }}>
        Aktivitas Selesai!
      </h2>
      <p style={{ margin: `0 0 ${t.spacing6}`, color: t.colorNeutral800, fontSize: t.fontSizeBase, lineHeight: t.lineHeightBase }}>
        Laporan aktivitas tugas Anda telah berhasil dikirim ke server.
      </p>
      <button style={s.btnPrimary} onClick={onReset}>
        Kembali ke Daftar Tugas
      </button>
    </div>
  );
}

export function ScreenSettings({ faceRecognitionEnabled, onToggleFaceRecognition }) {
  const { t, s } = useTheme();
  const InfoIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2 }}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );

  return (
    <div style={s.card}>
      <Flex direction="column" gap="3xs" padding="lg" style={{ borderBottom: `1px solid ${t.border.subtle}` }}>
        <Text as="h2" size="h3">Pengaturan Aplikasi</Text>
        <Text size="body-small" color="secondary">Kelola preferensi validasi dan sistem.</Text>
      </Flex>

      <Flex align="center" justify="space-between" paddingX="lg" paddingY="md"
        style={{ borderBottom: `1px solid ${t.border.subtle}` }}>
        <Flex direction="column" gap="4xs">
          <Text size="label">Validasi Wajah</Text>
          <Text size="body-small" color="secondary">Aktifkan pengecekan wajah saat presensi</Text>
        </Flex>
        <Toggle
          checked={faceRecognitionEnabled}
          onChange={onToggleFaceRecognition}
          ariaLabel="Validasi Wajah"
        />
      </Flex>

      <Flex paddingX="lg" paddingY="sm">
        <Banner type={faceRecognitionEnabled ? 'info' : 'warning'} icon={InfoIcon}>
          {faceRecognitionEnabled
            ? 'Validasi wajah aktif — selfie diperlukan saat mulai dan selesai tugas.'
            : 'Validasi wajah nonaktif — hanya validasi GPS yang akan dilakukan.'}
        </Banner>
      </Flex>
    </div>
  );
}

export function ScreenProfile({ currentUser }) {
  const { t, s } = useTheme();
  
  const baseFields = [
    { label: 'Nama Lengkap', value: currentUser?.name },
    { label: 'Email', value: currentUser?.email },
    { label: 'ID Karyawan', value: currentUser?.id },
    { label: 'Perusahaan', value: `ID: ${currentUser?.company_id || '-'}` },
  ];

  const dynamicFields = [];
  if (currentUser) {
    const knownKeys = ['name', 'email', 'id', 'company_id'];
    Object.keys(currentUser).forEach(key => {
      if (!knownKeys.includes(key)) {
        const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        let value = currentUser[key];
        if (typeof value === 'object' && value !== null) {
          value = JSON.stringify(value);
        }
        dynamicFields.push({ label, value: String(value) });
      }
    });
  }

  const fields = [...baseFields, ...dynamicFields];

  return (
    <div>
      {/* Avatar card */}
      <div style={{ ...s.card, textAlign: 'center', padding: `${t.spacing8} ${t.spacing6}` }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '72px', height: '72px', borderRadius: t.radiusFull,
          background: `linear-gradient(135deg, ${t.colorBrand} 0%, ${t.colorBrandMid} 100%)`,
          color: '#fff', fontSize: t.fontSizeXxl, fontWeight: t.fontWeightBold,
          marginBottom: t.spacing4,
        }}>
          {currentUser?.name?.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ margin: `0 0 ${t.spacing1}`, fontSize: t.fontSizeLg, fontWeight: t.fontWeightBold, color: t.colorNeutral1000 }}>
          {currentUser?.name}
        </h2>
        <div style={{ ...s.badge('brand'), display: 'inline-flex' }}>Karyawan Aktif</div>
      </div>

      {/* Detail card */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <h3 style={s.cardTitle}>Informasi Akun</h3>
        </div>
        <div>
          {fields.map(({ label, value }, idx) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: `${t.spacing3} ${t.spacing5}`,
              borderBottom: idx < fields.length - 1 ? `1px solid ${t.colorNeutral200}` : 'none',
            }}>
              <span style={{ fontSize: t.fontSizeSm, color: t.colorNeutral800 }}>{label}</span>
              <span style={{ fontSize: t.fontSizeBase, fontWeight: t.fontWeightMedium, color: t.colorNeutral1000 }}>
                {value || '—'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
