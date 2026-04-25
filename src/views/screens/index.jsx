import React from 'react';
import { token, s } from '../styles/theme';
import { Spinner, ChecklistItem } from '../components/SharedComponents';

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

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={token.colorNeutral400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const UserIcon = ({ size = 32, color = token.colorBrand }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// ─── Mekari Pixel top-level brand bar ─────────────────────────────────────────
function MekariBrandBar() {
  return (
    <div style={{
      height: '3px',
      background: `linear-gradient(90deg, ${token.colorBrand} 0%, ${token.colorBrandMid} 100%)`,
    }} />
  );
}

// ─── Screens ──────────────────────────────────────────────────────────────────

export function ScreenLogin({ users, onLogin }) {
  return (
    <div>
      <MekariBrandBar />
      <div style={{ padding: `${token.spacing6} ${token.spacing5} ${token.spacing4}`, textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '56px', height: '56px', borderRadius: token.radiusFull,
          backgroundColor: token.colorBrandLight, marginBottom: token.spacing3,
        }}>
          <UserIcon size={28} />
        </div>
        <h1 style={{ ...s.cardTitle, fontSize: token.fontSizeLg, marginBottom: token.spacing1 }}>Masuk ke Akun</h1>
        <p style={s.cardSubtitle}>Pilih nama Anda untuk melanjutkan</p>
      </div>

      <div style={s.card}>
        {users.length === 0 ? (
          <div style={{ padding: token.spacing8, textAlign: 'center', color: token.colorNeutral800 }}>
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
                padding: `${token.spacing3} ${token.spacing5}`,
                borderBottom: idx === users.length - 1 ? 'none' : `1px solid ${token.colorNeutral200}`,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'background-color 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = token.colorNeutral100}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: token.spacing3 }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: token.radiusFull,
                  backgroundColor: token.colorBrandLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: token.fontSizeMd, fontWeight: token.fontWeightSemibold, color: token.colorBrand,
                  flexShrink: 0,
                }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: token.fontWeightSemibold, color: token.colorNeutral1000, fontSize: token.fontSizeBase }}>{user.name}</div>
                  <div style={{ fontSize: token.fontSizeSm, color: token.colorNeutral800 }}>{user.email || user.id}</div>
                </div>
              </div>
              <ChevronRight />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
// Normalize API status string → internal key
function normalizeStatus(statusStr) {
  if (!statusStr) return null;
  const s = statusStr.toLowerCase().replace(/\s+/g, '_');
  if (s === 'in_progress') return 'in_progress';
  if (s === 'done' || s === 'completed') return 'done';
  if (s === 'overdue' || s === 'late') return 'overdue';
  if (s === 'upcoming' || s === 'pending') return 'upcoming';
  return s; // fallback: use as-is
}

function getTaskStatus(task) {
  // Prefer the status field from API
  if (task.status) return normalizeStatus(task.status);

  // Fallback: derive from due_date
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
  const [activeFilter, setActiveFilter] = React.useState('all');

  // Hitung jumlah per status
  const counts = React.useMemo(() => {
    const c = { all: tasks.length, in_progress: 0, upcoming: 0, overdue: 0 };
    tasks.forEach(t => { c[getTaskStatus(t)]++; });
    return c;
  }, [tasks]);

  // Filter tasks berdasarkan tab aktif
  const filteredTasks = activeFilter === 'all'
    ? tasks
    : tasks.filter(t => getTaskStatus(t) === activeFilter);

  if (tasks.length === 0) {
    return (
      <div style={{ ...s.card, padding: `${token.spacing10} ${token.spacing6}`, textAlign: 'center' }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: token.radiusFull,
          backgroundColor: token.colorNeutral200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: `0 auto ${token.spacing4}`,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={token.colorNeutral800} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <h3 style={{ ...s.cardTitle, marginBottom: token.spacing2 }}>Tidak Ada Tugas</h3>
        <p style={{ ...s.cardSubtitle, maxWidth: '240px', margin: '0 auto' }}>
          Belum ada tugas yang di-assign kepada <strong>{currentUser?.name?.split(' ')[0]}</strong>.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div style={{ marginBottom: token.spacing4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: token.fontSizeLg, fontWeight: token.fontWeightSemibold, margin: `0 0 ${token.spacing1}`, color: token.colorNeutral1000 }}>
            Tugas Saya
          </h2>
          <p style={s.helperText}>{tasks.length} tugas di-assign kepada Anda.</p>
        </div>
        <div style={s.badge('brand')}>{tasks.length} Tugas</div>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex', gap: token.spacing2,
        marginBottom: token.spacing4,
        overflowX: 'auto', paddingBottom: '2px',
      }}>
        {FILTERS.map(({ id, label }) => {
          const active = activeFilter === id;
          const count = counts[id] ?? 0;
          return (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: `6px ${token.spacing3}`,
                borderRadius: token.radiusFull,
                border: `1px solid ${active ? token.colorBrand : token.colorNeutral300}`,
                backgroundColor: active ? token.colorBrand : token.colorWhite,
                color: active ? '#fff' : token.colorNeutral900,
                fontSize: token.fontSizeSm,
                fontWeight: active ? token.fontWeightSemibold : token.fontWeightMedium,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: token.fontFamily,
                transition: 'all 0.15s ease',
                flexShrink: 0,
              }}
            >
              {label}
              {count > 0 && (
                <span style={{
                  backgroundColor: active ? 'rgba(255,255,255,0.25)' : token.colorNeutral200,
                  color: active ? '#fff' : token.colorNeutral800,
                  borderRadius: token.radiusFull,
                  padding: '1px 6px',
                  fontSize: token.fontSizeXs,
                  fontWeight: token.fontWeightBold,
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
        <div style={{ ...s.card, padding: `${token.spacing8} ${token.spacing6}`, textAlign: 'center' }}>
          <p style={{ color: token.colorNeutral800, fontSize: token.fontSizeBase }}>
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
              {/* Title row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: token.spacing3 }}>
                <h3 style={{ ...s.cardTitle, flex: 1, paddingRight: token.spacing3 }}>{task.description}</h3>
                <div style={s.badge(statusCfg.badgeType)}>{statusCfg.label}</div>
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: token.spacing2, marginBottom: token.spacing4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: token.spacing2, color: token.colorNeutral800, fontSize: token.fontSizeSm }}>
                  <LocationIcon color={token.colorNeutral800} />
                  <span>{task.location?.name}</span>
                </div>
                {task.due_date && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: token.spacing2, fontSize: token.fontSizeSm, color: status === 'overdue' ? token.colorDanger : token.colorNeutral800 }}>
                    <CalendarIcon color={status === 'overdue' ? token.colorDanger : token.colorNeutral800} />
                    <span>
                      Tenggat: {new Date(task.due_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                      {status === 'overdue' && <span style={{ fontWeight: token.fontWeightSemibold }}> — Terlambat!</span>}
                    </span>
                  </div>
                )}
                {task.task && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: token.spacing2, color: token.colorNeutral800, fontSize: token.fontSizeSm }}>
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
  const isLocValid = locationStatus === 'valid';
  const isFaceValid = faceRecognitionEnabled ? faceStatus === 'valid' : true;
  const allValid = isLocValid && isFaceValid;

  const fileInputRef = React.useRef(null);

  const locAlertConfig = {
    checking: { type: 'info', title: 'Mengecek Lokasi', icon: <Spinner size={16} color={token.colorBrand} /> },
    valid: { type: 'success', title: 'Lokasi Valid', icon: <CheckCircle size={16} color={token.colorSuccess} /> },
    invalid: { type: 'error', title: 'Lokasi Tidak Valid', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={token.colorDanger} strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> },
    geo_error: { type: 'error', title: 'Error GPS', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={token.colorDanger} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
  }[locationStatus] || { type: 'info', title: 'Menunggu...', icon: null };

  const faceAlertConfig = {
    checking: { type: 'info', title: 'Memeriksa Wajah', icon: <Spinner size={16} color={token.colorBrand} /> },
    valid: { type: 'success', title: 'Wajah Cocok', icon: <CheckCircle size={16} color={token.colorSuccess} /> },
    invalid: { type: 'error', title: 'Wajah Tidak Cocok', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={token.colorDanger} strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> },
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
        <div style={{ marginBottom: token.spacing5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: token.spacing2, marginBottom: token.spacing2 }}>
            <div style={{
              width: '20px', height: '20px', borderRadius: token.radiusFull,
              backgroundColor: isLocValid ? token.colorSuccess : token.colorBrand,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: token.fontWeightBold, flexShrink: 0,
            }}>1</div>
            <span style={{ ...s.label, margin: 0 }}>Validasi Lokasi (GPS)</span>
          </div>
          {locationStatus && (
            <div style={s.alert(locAlertConfig.type)}>
              {locAlertConfig.icon}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: token.fontWeightSemibold }}>{locAlertConfig.title}</div>
                <div style={{ marginTop: '2px', opacity: 0.85 }}>{locationMessage}</div>
              </div>
            </div>
          )}
          {locationStatus === 'geo_error' && onRetryLocation && (
            <button
              onClick={onRetryLocation}
              style={{
                ...s.btnSecondary,
                marginTop: token.spacing2,
                padding: `8px ${token.spacing4}`,
                width: 'auto',
                fontSize: token.fontSizeSm,
                gap: token.spacing2,
              }}
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
          <div style={{ marginBottom: token.spacing6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: token.spacing2, marginBottom: token.spacing2 }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: token.radiusFull,
                backgroundColor: isFaceValid ? token.colorSuccess : isLocValid ? token.colorBrand : token.colorNeutral300,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: token.fontWeightBold, flexShrink: 0,
              }}>2</div>
              <span style={{ ...s.label, margin: 0 }}>Validasi Wajah</span>
            </div>
            {capturedFace ? (
              <div style={{ display: 'flex', gap: token.spacing3, alignItems: 'center' }}>
                <img src={capturedFace} alt="Selfie"
                  style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: token.radiusMd, border: `1px solid ${token.colorNeutral300}`, flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  {faceStatus && (
                    <div style={s.alert(faceAlertConfig.type)}>
                      {faceAlertConfig.icon}
                      <div>
                        <div style={{ fontWeight: token.fontWeightSemibold }}>{faceAlertConfig.title}</div>
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
                {!isLocValid && <p style={{ ...s.helperText, marginTop: token.spacing2 }}>Selesaikan validasi lokasi terlebih dahulu.</p>}
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
        <div style={{ marginTop: token.spacing4 }}>
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
  const totalItems = task?.task?.length ?? 0;
  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const progressPct = totalItems ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <>
      {/* Task Header Card */}
      <div style={s.card}>
        <div style={s.cardBody}>
          <h2 style={{ ...s.cardTitle, marginBottom: token.spacing2 }}>{task?.description}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: token.spacing2, color: token.colorNeutral800, fontSize: token.fontSizeSm }}>
            <LocationIcon color={token.colorNeutral800} />
            <span>{task?.location?.name}</span>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: token.spacing4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: token.spacing2 }}>
              <span style={{ fontSize: token.fontSizeSm, color: token.colorNeutral800, fontWeight: token.fontWeightMedium }}>Progress</span>
              <span style={{
                fontSize: token.fontSizeSm, fontWeight: token.fontWeightSemibold,
                color: allChecked ? token.colorSuccess : token.colorBrand,
              }}>
                {checkedCount}/{totalItems}
              </span>
            </div>
            <div style={{ height: '6px', backgroundColor: token.colorNeutral200, borderRadius: token.radiusFull, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${progressPct}%`,
                backgroundColor: allChecked ? token.colorSuccess : token.colorBrand,
                borderRadius: token.radiusFull,
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
          <p style={{ ...s.helperText, textAlign: 'center', marginBottom: token.spacing3 }}>
            Selesaikan semua {totalItems} item untuk melanjutkan.
          </p>
        )}
        <button
          style={{
            ...s.btnPrimary,
            ...(!allChecked ? s.btnDisabled : {}),
            backgroundColor: allChecked ? token.colorSuccess : token.colorBrand,
            borderColor: allChecked ? token.colorSuccess : token.colorBrand,
          }}
          disabled={!allChecked}
          onClick={onSubmitIntent}
        >
          {allChecked ? (
            <><CheckCircle size={16} color="#fff" /> Lanjut Validasi Akhir</>
          ) : (
            'Lanjut Validasi Akhir'
          )}
        </button>
      </div>
    </>
  );
}

export function ScreenCompleted({ onReset }) {
  return (
    <div style={{ ...s.card, textAlign: 'center', padding: `${token.spacing10} ${token.spacing6}` }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '64px', height: '64px', borderRadius: token.radiusFull,
        backgroundColor: token.colorSuccessLight, color: token.colorSuccess, marginBottom: token.spacing4,
      }}>
        <CheckCircle size={32} color={token.colorSuccess} />
      </div>
      <h2 style={{ margin: `0 0 ${token.spacing2}`, fontSize: token.fontSizeXl, fontWeight: token.fontWeightBold, color: token.colorNeutral1000 }}>
        Aktivitas Selesai!
      </h2>
      <p style={{ margin: `0 0 ${token.spacing6}`, color: token.colorNeutral800, fontSize: token.fontSizeBase, lineHeight: token.lineHeightBase }}>
        Laporan aktivitas tugas Anda telah berhasil dikirim ke server.
      </p>
      <button style={s.btnPrimary} onClick={onReset}>
        Kembali ke Daftar Tugas
      </button>
    </div>
  );
}

export function ScreenSettings({ faceRecognitionEnabled, onToggleFaceRecognition }) {
  return (
    <div style={s.card}>
      <div style={s.cardHeader}>
        <h2 style={s.cardTitle}>Pengaturan Aplikasi</h2>
        <p style={s.cardSubtitle}>Kelola preferensi validasi dan sistem.</p>
      </div>
      <div>
        {/* Face Recognition Toggle */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: `${token.spacing4} ${token.spacing5}`,
          borderBottom: `1px solid ${token.colorNeutral200}`,
        }}>
          <div>
            <div style={{ fontWeight: token.fontWeightSemibold, color: token.colorNeutral1000, fontSize: token.fontSizeBase }}>
              Validasi Wajah
            </div>
            <div style={{ fontSize: token.fontSizeSm, color: token.colorNeutral800, marginTop: '2px' }}>
              Aktifkan pengecekan wajah saat presensi
            </div>
          </div>
          {/* Toggle switch */}
          <div
            role="switch"
            aria-checked={faceRecognitionEnabled}
            onClick={onToggleFaceRecognition}
            style={{
              width: '44px', height: '24px', borderRadius: token.radiusFull,
              backgroundColor: faceRecognitionEnabled ? token.colorBrand : token.colorNeutral300,
              position: 'relative', cursor: 'pointer', flexShrink: 0,
              transition: 'background-color 0.2s ease', marginLeft: token.spacing3,
            }}
          >
            <div style={{
              width: '18px', height: '18px', borderRadius: '50%',
              backgroundColor: token.colorWhite,
              position: 'absolute', top: '3px',
              left: faceRecognitionEnabled ? '23px' : '3px',
              transition: 'left 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }} />
          </div>
        </div>

        {/* Status indicator */}
        <div style={{ padding: `${token.spacing3} ${token.spacing5}` }}>
          <div style={s.alert(faceRecognitionEnabled ? 'brand' : 'warning')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>
              {faceRecognitionEnabled
                ? 'Validasi wajah aktif — selfie diperlukan saat mulai dan selesai tugas.'
                : 'Validasi wajah nonaktif — hanya validasi GPS yang akan dilakukan.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScreenProfile({ currentUser }) {
  const fields = [
    { label: 'Nama Lengkap', value: currentUser?.name },
    { label: 'Email', value: currentUser?.email },
    { label: 'ID Karyawan', value: currentUser?.id },
    { label: 'Perusahaan', value: `ID: ${currentUser?.company_id || '-'}` },
  ];

  return (
    <div>
      {/* Avatar card */}
      <div style={{ ...s.card, textAlign: 'center', padding: `${token.spacing8} ${token.spacing6}` }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '72px', height: '72px', borderRadius: token.radiusFull,
          background: `linear-gradient(135deg, ${token.colorBrand} 0%, ${token.colorBrandMid} 100%)`,
          color: '#fff', fontSize: token.fontSizeXxl, fontWeight: token.fontWeightBold,
          marginBottom: token.spacing4,
        }}>
          {currentUser?.name?.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ margin: `0 0 ${token.spacing1}`, fontSize: token.fontSizeLg, fontWeight: token.fontWeightBold, color: token.colorNeutral1000 }}>
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
              padding: `${token.spacing3} ${token.spacing5}`,
              borderBottom: idx < fields.length - 1 ? `1px solid ${token.colorNeutral200}` : 'none',
            }}>
              <span style={{ fontSize: token.fontSizeSm, color: token.colorNeutral800 }}>{label}</span>
              <span style={{ fontSize: token.fontSizeBase, fontWeight: token.fontWeightMedium, color: token.colorNeutral1000 }}>
                {value || '—'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

