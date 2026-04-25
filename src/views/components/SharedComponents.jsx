import React, { useState } from 'react';
import { token } from '../styles/theme';

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

export function ChecklistItem({ index, taskName, checked, onToggle, isLast, photo, uploading, onPhotoUpload }) {
  const [hover, setHover] = useState(false);
  const fileInputRef = React.useRef(null);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: token.spacing3,
        padding: `${token.spacing3} ${token.spacing5}`,
        borderBottom: isLast ? 'none' : `1px solid ${token.colorNeutral200}`,
        cursor: 'pointer',
        backgroundColor: checked
          ? token.colorSuccessLight
          : hover
          ? token.colorNeutral100
          : token.colorWhite,
        transition: 'background-color 0.1s ease',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onToggle(index)}
    >
      {/* Mekari-style checkbox */}
      <div
        style={{
          width: '18px',
          height: '18px',
          borderRadius: token.radiusSm,
          border: checked
            ? `2px solid ${token.colorSuccess}`
            : `2px solid ${token.colorNeutral400}`,
          backgroundColor: checked ? token.colorSuccess : token.colorWhite,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.15s ease',
        }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5l2 2 4-4"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: token.fontSizeBase,
          color: checked ? token.colorSuccess : token.colorNeutral900,
          fontWeight: checked ? token.fontWeightMedium : token.fontWeightRegular,
          textDecoration: checked ? 'line-through' : 'none',
          flex: 1,
          lineHeight: token.lineHeightBase,
        }}
      >
        {taskName}
      </span>

      {/* Photo Capture */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'flex', alignItems: 'center', gap: token.spacing2 }}
      >
        {uploading ? (
          <Spinner size={16} />
        ) : photo ? (
          <img
            src={photo}
            alt="Bukti"
            style={{
              width: '30px',
              height: '30px',
              objectFit: 'cover',
              borderRadius: token.radiusSm,
              border: `1px solid ${token.colorNeutral300}`,
            }}
          />
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: 'none',
              border: `1px solid ${token.colorNeutral300}`,
              borderRadius: token.radiusSm,
              padding: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: token.colorNeutral800,
              backgroundColor: token.colorWhite,
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

      {checked && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={token.colorSuccess} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )}
    </div>
  );
}
