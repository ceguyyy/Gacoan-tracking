import React, { useState } from 'react';
import { token } from '../styles/theme';
import { useTheme } from '../styles/ThemeContext';

export function Spinner({ size = 20, color = token.colorBrand }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

export function ChecklistItem({ index, taskName, status, onStatusChange, isLast, photo, uploading, onPhotoUpload, note, onNoteChange }) {
  const { t } = useTheme();
  const [hover, setHover] = useState(false);
  const fileInputRef = React.useRef(null);
  
  const isFilled = status === 'met' || status === 'not_met';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: `${t.spacing3} ${t.spacing5}`,
        borderBottom: isLast ? 'none' : `1px solid ${t.colorNeutral200}`,
        backgroundColor: isFilled
          ? t.colorSuccessLight
          : hover
          ? t.colorNeutral100
          : t.colorWhite,
        transition: 'background-color 0.1s ease',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: t.spacing3, width: '100%' }}
      >
        <select
          value={status || ''}
          onChange={(e) => onStatusChange(index, e.target.value)}
          style={{
            padding: `4px ${t.spacing2}`,
            borderRadius: t.radiusSm,
            border: `1px solid ${t.colorNeutral400}`,
            fontSize: t.fontSizeSm,
            fontFamily: t.fontFamily,
            color: status ? t.colorNeutral1000 : t.colorNeutral500,
            cursor: 'pointer',
          }}
        >
          <option value="" disabled>Pilih Status</option>
          <option value="met">Met</option>
          <option value="not_met">Not Met</option>
        </select>
      {/* Label */}
      <span
        style={{
          fontSize: t.fontSizeBase,
          color: isFilled ? t.colorSuccess : t.colorNeutral900,
          fontWeight: isFilled ? t.fontWeightMedium : t.fontWeightRegular,
          textDecoration: isFilled ? 'line-through' : 'none',
          flex: 1,
          lineHeight: t.lineHeightBase,
        }}
      >
        {taskName}
      </span>

      {/* Photo Capture */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'flex', alignItems: 'center', gap: t.spacing2 }}
      >
        {uploading ? (
          <Spinner size={16} color={t.colorBrand} />
        ) : photo ? (
          <img
            src={photo}
            alt="Bukti"
            style={{
              width: '30px',
              height: '30px',
              objectFit: 'cover',
              borderRadius: t.radiusSm,
              border: `1px solid ${t.colorNeutral300}`,
            }}
          />
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: 'none',
              border: `1px solid ${t.colorNeutral300}`,
              borderRadius: t.radiusSm,
              padding: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: t.colorNeutral800,
              backgroundColor: t.colorWhite,
              transition: 'border-color 0.15s',
            }}
            title="Ambil Foto"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </button>
        )}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onPhotoUpload(e.target.files[0]);
            }
            e.target.value = null;
          }}
        />
      </div>
      </div>
      
      {isFilled && (
        <div style={{ marginTop: t.spacing2, display: 'flex', flexDirection: 'column', gap: t.spacing1 }}>
          <span style={{ fontSize: t.fontSizeSm, color: t.colorNeutral800, fontWeight: t.fontWeightMedium }}>Catatan Tugas</span>
          <textarea
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="Tambahkan catatan (opsional)..."
            style={{
              width: '100%',
              minHeight: '60px',
              padding: t.spacing2,
              borderRadius: t.radiusSm,
              border: `1px solid ${t.colorNeutral300}`,
              fontSize: t.fontSizeSm,
              color: t.colorNeutral1000,
              resize: 'vertical',
              fontFamily: t.fontFamily,
            }}
            onClick={(e) => e.stopPropagation()} // Prevent toggling checklist when clicking input
          />
        </div>
      )}
    </div>
  );
}
