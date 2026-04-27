/**
 * Mekari Pixel Design Tokens v2.4
 * Adapted from https://docs.mekari.design/docs/design-token-v2-4.html
 * Applied to React inline styles (no Vue/Pixel3 library required)
 *
 * Token mode is fixed to 2.4 for this project. Do not mix with 2.1 values.
 * When choosing values, use the semantic groups (text.*, bg.*, border.*,
 * space.*, typography.*) attached at the bottom of `token`/`darkToken` —
 * the scale-based names (colorNeutral800, spacing4, ...) are kept for
 * backward compatibility.
 */

export const TOKEN_MODE = '2.4';

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

// ─── Dark Mode Token Overrides ─────────────────────────────────────────────────
const darkTokenBase = {
  ...token,
  // Page background
  colorSlate100: '#1A1D21',
  colorSlate200: '#1E2228',
  colorSlate300: '#22272E',
  // Surface (cards, sidebar, topbar)
  colorWhite: '#252B33',
  // Neutrals
  colorNeutral100: '#2A2F38',
  colorNeutral200: '#313840',
  colorNeutral300: '#3E4550',
  colorNeutral400: '#656D79',
  colorNeutral800: '#9AA3AE',
  colorNeutral900: '#CDD1D9',
  colorNeutral1000: '#E8EAED',
  // Tint backgrounds
  colorBrandLight: '#1A2255',
  colorSuccessLight: '#0B2C1E',
  colorDangerLight: '#2C1413',
  colorWarningLight: '#2B2210',
  // Stronger shadows on dark backgrounds
  shadowXs: '0 1px 2px rgba(0,0,0,0.30)',
  shadowSm: '0 1px 4px rgba(0,0,0,0.40)',
  shadowMd: '0 2px 8px rgba(0,0,0,0.50)',
  shadowLg: '0 4px 16px rgba(0,0,0,0.60)',
};

// ─── Pixel 3 Semantic Groupings ────────────────────────────────────────────────
// Layered on top of the scale-based tokens. Mirrors Pixel 3 v2.4 vocabulary:
// text.primary / bg.surface / border.default / space.md / typography.h2.
function withSemantic(base) {
  return {
    ...base,

    // Color groups (Pixel 3 semantic naming)
    text: {
      primary: base.colorNeutral1000,
      secondary: base.colorNeutral800,
      tertiary: base.colorNeutral400,
      brand: base.colorBrand,
      success: base.colorSuccess,
      warning: base.colorWarning,
      danger: base.colorDanger,
      inverse: '#fff',
    },
    bg: {
      page: base.colorSlate100,
      surface: base.colorWhite,
      neutral: base.colorNeutral100,
      neutralBold: base.colorNeutral200,
      brand: base.colorBrand,
      brandSubtle: base.colorBrandLight,
      success: base.colorSuccess,
      successSubtle: base.colorSuccessLight,
      warning: base.colorWarning,
      warningSubtle: base.colorWarningLight,
      danger: base.colorDanger,
      dangerSubtle: base.colorDangerLight,
    },
    border: {
      default: base.colorNeutral300,
      subtle: base.colorNeutral200,
      brand: base.colorBrand,
      success: base.colorSuccess,
      danger: base.colorDanger,
    },

    // Spacing scale (Pixel 3 t-shirt sizing)
    space: {
      '4xs': '2px',
      '3xs': base.spacing1,   // 4px
      '2xs': '6px',
      xs:    base.spacing2,   // 8px
      sm:    base.spacing3,   // 12px
      md:    base.spacing4,   // 16px
      lg:    base.spacing5,   // 20px
      xl:    base.spacing6,   // 24px
      '2xl': base.spacing8,   // 32px
      '3xl': base.spacing10,  // 40px
      '4xl': '80px',
    },

    // Typography presets (apply directly as React style)
    typography: {
      h1:           { fontSize: base.fontSizeXxl, fontWeight: base.fontWeightBold,     lineHeight: base.lineHeightSm,   letterSpacing: '-0.2px' },
      h2:           { fontSize: base.fontSizeXl,  fontWeight: base.fontWeightBold,     lineHeight: base.lineHeightSm,   letterSpacing: '-0.1px' },
      h3:           { fontSize: base.fontSizeLg,  fontWeight: base.fontWeightSemibold, lineHeight: base.lineHeightSm,   letterSpacing: '-0.1px' },
      label:        { fontSize: base.fontSizeBase, fontWeight: base.fontWeightSemibold, lineHeight: base.lineHeightSm },
      'label-small':{ fontSize: base.fontSizeSm,   fontWeight: base.fontWeightSemibold, lineHeight: base.lineHeightSm },
      body:         { fontSize: base.fontSizeBase, fontWeight: base.fontWeightRegular,  lineHeight: base.lineHeightBase },
      'body-small': { fontSize: base.fontSizeSm,   fontWeight: base.fontWeightRegular,  lineHeight: base.lineHeightBase },
      overline:     { fontSize: base.fontSizeXs,   fontWeight: base.fontWeightSemibold, lineHeight: base.lineHeightSm, letterSpacing: '0.8px', textTransform: 'uppercase' },
    },
  };
}

// Re-export the original `token` and a `darkToken` enriched with semantic groups.
const tokenWithSemantic = withSemantic(token);
Object.assign(token, {
  text: tokenWithSemantic.text,
  bg: tokenWithSemantic.bg,
  border: tokenWithSemantic.border,
  space: tokenWithSemantic.space,
  typography: tokenWithSemantic.typography,
});

export const darkToken = withSemantic(darkTokenBase);

// ─── Shared Styles Factory ─────────────────────────────────────────────────────
export function makeS(t) {
  return {
    appWrapper: {
      fontFamily: t.fontFamily,
      minHeight: '100vh',
      backgroundColor: t.colorSlate100,
      color: t.colorNeutral1000,
      fontSize: t.fontSizeBase,
      lineHeight: t.lineHeightBase,
      WebkitFontSmoothing: 'antialiased',
    },

    topBar: {
      backgroundColor: t.colorWhite,
      borderBottom: `1px solid ${t.colorNeutral300}`,
      padding: `0 ${t.spacing6}`,
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      gap: t.spacing3,
      boxShadow: t.shadowXs,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },

    topBarTitle: {
      fontSize: t.fontSizeMd,
      fontWeight: t.fontWeightSemibold,
      color: t.colorNeutral1000,
      margin: 0,
      letterSpacing: '-0.1px',
    },

    content: {
      padding: `${t.spacing5} ${t.spacing4}`,
      maxWidth: '600px',
      margin: '0 auto',
      paddingBottom: '96px',
    },

    // ─── Card ────────────────────────────────────────────────────────────────
    card: {
      backgroundColor: t.colorWhite,
      borderRadius: t.radiusLg,
      boxShadow: t.shadowSm,
      border: `1px solid ${t.colorNeutral300}`,
      overflow: 'hidden',
      marginBottom: t.spacing4,
    },

    cardHeader: {
      padding: `${t.spacing4} ${t.spacing5}`,
      borderBottom: `1px solid ${t.colorNeutral200}`,
      backgroundColor: t.colorWhite,
    },

    cardBody: {
      padding: t.spacing5,
    },

    cardTitle: {
      margin: 0,
      fontSize: t.fontSizeMd,
      fontWeight: t.fontWeightSemibold,
      color: t.colorNeutral1000,
      lineHeight: t.lineHeightSm,
      letterSpacing: '-0.1px',
    },

    cardSubtitle: {
      margin: `${t.spacing1} 0 0`,
      fontSize: t.fontSizeSm,
      color: t.colorNeutral800,
      lineHeight: t.lineHeightBase,
    },

    // ─── Buttons (Mekari Pixel style) ────────────────────────────────────────
    btnPrimary: {
      width: '100%',
      padding: `10px ${t.spacing4}`,
      backgroundColor: t.colorBrand,
      color: '#fff',
      border: `1px solid ${t.colorBrand}`,
      borderRadius: t.radiusMd,
      fontSize: t.fontSizeBase,
      fontWeight: t.fontWeightSemibold,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: t.spacing2,
      transition: 'background-color 0.15s ease, border-color 0.15s ease',
      letterSpacing: '0.1px',
      lineHeight: '20px',
      fontFamily: t.fontFamily,
    },

    btnSecondary: {
      width: '100%',
      padding: `10px ${t.spacing4}`,
      backgroundColor: t.colorWhite,
      color: t.colorNeutral900,
      border: `1px solid ${t.colorNeutral300}`,
      borderRadius: t.radiusMd,
      fontSize: t.fontSizeBase,
      fontWeight: t.fontWeightMedium,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: t.spacing2,
      transition: 'background-color 0.15s ease, border-color 0.15s ease',
      letterSpacing: '0.1px',
      lineHeight: '20px',
      fontFamily: t.fontFamily,
    },

    btnSuccess: {
      width: '100%',
      padding: `10px ${t.spacing4}`,
      backgroundColor: t.colorSuccess,
      color: '#fff',
      border: `1px solid ${t.colorSuccess}`,
      borderRadius: t.radiusMd,
      fontSize: t.fontSizeBase,
      fontWeight: t.fontWeightSemibold,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: t.spacing2,
      transition: 'background-color 0.15s ease',
      letterSpacing: '0.1px',
      lineHeight: '20px',
      fontFamily: t.fontFamily,
    },

    btnDisabled: {
      opacity: 0.45,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },

    // ─── Badge (Mekari style tags) ──────────────────────────────────────────
    badge: (type = 'neutral') => {
      const variants = {
        neutral: { bg: t.colorNeutral200, color: t.colorNeutral900 },
        brand: { bg: t.colorBrandLight, color: t.colorBrand },
        success: { bg: t.colorSuccessLight, color: t.colorSuccess },
        warning: { bg: t.colorWarningLight, color: t.colorWarning },
        danger: { bg: t.colorDangerLight, color: t.colorDanger },
      };
      const v = variants[type] || variants.neutral;
      return {
        display: 'inline-flex',
        alignItems: 'center',
        padding: `2px ${t.spacing2}`,
        backgroundColor: v.bg,
        color: v.color,
        borderRadius: t.radiusFull,
        fontSize: t.fontSizeSm,
        fontWeight: t.fontWeightSemibold,
        lineHeight: '18px',
        whiteSpace: 'nowrap',
      };
    },

    // ─── Alert / Banner ──────────────────────────────────────────────────────
    alert: (type = 'brand') => {
      const variants = {
        brand: { bg: t.colorBrandLight, color: t.colorBrand, border: t.colorBrand },
        success: { bg: t.colorSuccessLight, color: t.colorSuccess, border: t.colorSuccess },
        danger: { bg: t.colorDangerLight, color: t.colorDanger, border: t.colorDanger },
        warning: { bg: t.colorWarningLight, color: t.colorWarning, border: '#B8890A' },
        info: { bg: t.colorBrandLight, color: t.colorBrand, border: t.colorBrand },
        error: { bg: t.colorDangerLight, color: t.colorDanger, border: t.colorDanger },
      };
      const v = variants[type] || variants.brand;
      return {
        display: 'flex',
        alignItems: 'flex-start',
        gap: t.spacing3,
        padding: `${t.spacing3} ${t.spacing4}`,
        backgroundColor: v.bg,
        color: v.color,
        borderLeft: `3px solid ${v.border}`,
        borderRadius: t.radiusSm,
        marginBottom: t.spacing3,
        fontSize: t.fontSizeSm,
        lineHeight: t.lineHeightBase,
      };
    },

    helperText: {
      fontSize: t.fontSizeSm,
      color: t.colorNeutral800,
      marginTop: t.spacing2,
      lineHeight: t.lineHeightBase,
    },

    // ─── Divider ─────────────────────────────────────────────────────────────
    divider: {
      border: 'none',
      borderTop: `1px solid ${t.colorNeutral200}`,
      margin: `${t.spacing3} 0`,
    },

    // ─── Label ───────────────────────────────────────────────────────────────
    label: {
      fontSize: t.fontSizeSm,
      fontWeight: t.fontWeightSemibold,
      color: t.colorNeutral900,
      display: 'block',
      marginBottom: t.spacing1,
    },
  };
}

// ─── Backward-compatible static export (light mode) ───────────────────────────
export const s = makeS(token);
