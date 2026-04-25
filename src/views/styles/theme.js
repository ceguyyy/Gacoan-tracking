/**
 * Mekari Pixel Design Tokens v2.4
 * Adapted from https://docs.mekari.design/docs/design-token-v2-4.html
 * Applied to React inline styles (no Vue/Pixel3 library required)
 */

export const token = {
  // ─── Brand Colors (Indigo) ─────────────────────────────────────────────────
  colorBrand: '#4B61DC',          // indigo.700 – primary action
  colorBrandHover: '#4053BC',     // indigo.800
  colorBrandLight: '#EEF0FC',     // indigo.100 – bg tint
  colorBrandMid: '#8997E9',       // indigo.400

  // ─── Neutral ────────────────────────────────────────────────────────────────
  colorNeutral100: '#F7F8F9',
  colorNeutral200: '#F0F1F3',
  colorNeutral300: '#DCDFE4',
  colorNeutral400: '#B2B9C4',
  colorNeutral800: '#4C5460',
  colorNeutral900: '#383E48',
  colorNeutral1000: '#272B32',

  // ─── Slate (page background) ────────────────────────────────────────────────
  colorSlate100: '#F8F9F9',
  colorSlate200: '#EBF0F1',
  colorSlate300: '#E3E7E9',

  // ─── Emerald (success) ──────────────────────────────────────────────────────
  colorSuccess: '#029861',        // emerald.700
  colorSuccessHover: '#0F6D4D',   // emerald.800
  colorSuccessLight: '#F0FBF7',   // emerald.100

  // ─── Red (danger) ───────────────────────────────────────────────────────────
  colorDanger: '#C33E35',         // red.700
  colorDangerHover: '#A8352D',    // red.800
  colorDangerLight: '#FCEEED',    // red.100

  // ─── Yellow (warning) ───────────────────────────────────────────────────────
  colorWarning: '#D8B53F',        // yellow.400
  colorWarningLight: '#FDF6DD',   // yellow.100

  // ─── Base ───────────────────────────────────────────────────────────────────
  colorWhite: '#FFFFFF',
  colorDark: '#161A1D',

  // ─── Typography ─────────────────────────────────────────────────────────────
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontSizeXs: '11px',
  fontSizeSm: '12px',
  fontSizeBase: '14px',
  fontSizeMd: '16px',
  fontSizeLg: '18px',
  fontSizeXl: '20px',
  fontSizeXxl: '24px',

  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700,

  lineHeightSm: 1.4,
  lineHeightBase: 1.5,
  lineHeightLg: 1.6,

  // ─── Radius (Pixel uses 4px base) ──────────────────────────────────────────
  radiusSm: '4px',
  radiusMd: '6px',
  radiusLg: '8px',
  radiusXl: '12px',
  radiusFull: '9999px',

  // ─── Shadows ────────────────────────────────────────────────────────────────
  shadowXs: '0 1px 2px rgba(23,26,31,0.06)',
  shadowSm: '0 1px 4px rgba(23,26,31,0.08)',
  shadowMd: '0 2px 8px rgba(23,26,31,0.12)',
  shadowLg: '0 4px 16px rgba(23,26,31,0.14)',

  // ─── Spacing (4px base) ─────────────────────────────────────────────────────
  spacing1: '4px',
  spacing2: '8px',
  spacing3: '12px',
  spacing4: '16px',
  spacing5: '20px',
  spacing6: '24px',
  spacing8: '32px',
  spacing10: '40px',
  spacing12: '48px',
};

// ─── Shared Styles ─────────────────────────────────────────────────────────────
export const s = {
  appWrapper: {
    fontFamily: token.fontFamily,
    minHeight: '100vh',
    backgroundColor: token.colorSlate100,
    color: token.colorNeutral1000,
    fontSize: token.fontSizeBase,
    lineHeight: token.lineHeightBase,
    WebkitFontSmoothing: 'antialiased',
  },

  topBar: {
    backgroundColor: token.colorWhite,
    borderBottom: `1px solid ${token.colorNeutral300}`,
    padding: `0 ${token.spacing6}`,
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    gap: token.spacing3,
    boxShadow: token.shadowXs,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },

  topBarTitle: {
    fontSize: token.fontSizeMd,
    fontWeight: token.fontWeightSemibold,
    color: token.colorNeutral1000,
    margin: 0,
    letterSpacing: '-0.1px',
  },

  content: {
    padding: `${token.spacing5} ${token.spacing4}`,
    maxWidth: '600px',
    margin: '0 auto',
    paddingBottom: '96px',
  },

  // ─── Card ──────────────────────────────────────────────────────────────────
  card: {
    backgroundColor: token.colorWhite,
    borderRadius: token.radiusLg,
    boxShadow: token.shadowSm,
    border: `1px solid ${token.colorNeutral300}`,
    overflow: 'hidden',
    marginBottom: token.spacing4,
  },

  cardHeader: {
    padding: `${token.spacing4} ${token.spacing5}`,
    borderBottom: `1px solid ${token.colorNeutral200}`,
    backgroundColor: token.colorWhite,
  },

  cardBody: {
    padding: token.spacing5,
  },

  cardTitle: {
    margin: 0,
    fontSize: token.fontSizeMd,
    fontWeight: token.fontWeightSemibold,
    color: token.colorNeutral1000,
    lineHeight: token.lineHeightSm,
    letterSpacing: '-0.1px',
  },

  cardSubtitle: {
    margin: `${token.spacing1} 0 0`,
    fontSize: token.fontSizeSm,
    color: token.colorNeutral800,
    lineHeight: token.lineHeightBase,
  },

  // ─── Buttons (Mekari Pixel style) ─────────────────────────────────────────
  btnPrimary: {
    width: '100%',
    padding: `10px ${token.spacing4}`,
    backgroundColor: token.colorBrand,
    color: token.colorWhite,
    border: `1px solid ${token.colorBrand}`,
    borderRadius: token.radiusMd,
    fontSize: token.fontSizeBase,
    fontWeight: token.fontWeightSemibold,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: token.spacing2,
    transition: 'background-color 0.15s ease, border-color 0.15s ease',
    letterSpacing: '0.1px',
    lineHeight: '20px',
    fontFamily: token.fontFamily,
  },

  btnSecondary: {
    width: '100%',
    padding: `10px ${token.spacing4}`,
    backgroundColor: token.colorWhite,
    color: token.colorNeutral900,
    border: `1px solid ${token.colorNeutral300}`,
    borderRadius: token.radiusMd,
    fontSize: token.fontSizeBase,
    fontWeight: token.fontWeightMedium,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: token.spacing2,
    transition: 'background-color 0.15s ease, border-color 0.15s ease',
    letterSpacing: '0.1px',
    lineHeight: '20px',
    fontFamily: token.fontFamily,
  },

  btnSuccess: {
    width: '100%',
    padding: `10px ${token.spacing4}`,
    backgroundColor: token.colorSuccess,
    color: token.colorWhite,
    border: `1px solid ${token.colorSuccess}`,
    borderRadius: token.radiusMd,
    fontSize: token.fontSizeBase,
    fontWeight: token.fontWeightSemibold,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: token.spacing2,
    transition: 'background-color 0.15s ease',
    letterSpacing: '0.1px',
    lineHeight: '20px',
    fontFamily: token.fontFamily,
  },

  btnDisabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  // ─── Badge (Mekari style tags) ─────────────────────────────────────────────
  badge: (type = 'neutral') => {
    const variants = {
      neutral: { bg: token.colorNeutral200, color: token.colorNeutral900 },
      brand: { bg: token.colorBrandLight, color: token.colorBrand },
      success: { bg: token.colorSuccessLight, color: token.colorSuccess },
      warning: { bg: token.colorWarningLight, color: token.colorWarning },
      danger: { bg: token.colorDangerLight, color: token.colorDanger },
    };
    const v = variants[type] || variants.neutral;
    return {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `2px ${token.spacing2}`,
      backgroundColor: v.bg,
      color: v.color,
      borderRadius: token.radiusFull,
      fontSize: token.fontSizeSm,
      fontWeight: token.fontWeightSemibold,
      lineHeight: '18px',
      whiteSpace: 'nowrap',
    };
  },

  // ─── Alert / Banner (Mekari Pixel inline notification) ────────────────────
  alert: (type = 'brand') => {
    const variants = {
      brand: { bg: token.colorBrandLight, color: token.colorBrand, border: token.colorBrand },
      success: { bg: token.colorSuccessLight, color: token.colorSuccess, border: token.colorSuccess },
      danger: { bg: token.colorDangerLight, color: token.colorDanger, border: token.colorDanger },
      warning: { bg: token.colorWarningLight, color: token.colorWarning, border: '#B8890A' },
      info: { bg: token.colorBrandLight, color: token.colorBrand, border: token.colorBrand },
      error: { bg: token.colorDangerLight, color: token.colorDanger, border: token.colorDanger },
    };
    const v = variants[type] || variants.brand;
    return {
      display: 'flex',
      alignItems: 'flex-start',
      gap: token.spacing3,
      padding: `${token.spacing3} ${token.spacing4}`,
      backgroundColor: v.bg,
      color: v.color,
      borderLeft: `3px solid ${v.border}`,
      borderRadius: token.radiusSm,
      marginBottom: token.spacing3,
      fontSize: token.fontSizeSm,
      lineHeight: token.lineHeightBase,
    };
  },

  helperText: {
    fontSize: token.fontSizeSm,
    color: token.colorNeutral800,
    marginTop: token.spacing2,
    lineHeight: token.lineHeightBase,
  },

  // ─── Divider ───────────────────────────────────────────────────────────────
  divider: {
    border: 'none',
    borderTop: `1px solid ${token.colorNeutral200}`,
    margin: `${token.spacing3} 0`,
  },

  // ─── Label ──────────────────────────────────────────────────────────────────
  label: {
    fontSize: token.fontSizeSm,
    fontWeight: token.fontWeightSemibold,
    color: token.colorNeutral900,
    display: 'block',
    marginBottom: token.spacing1,
  },
};
