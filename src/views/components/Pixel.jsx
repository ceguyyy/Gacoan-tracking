/**
 * Pixel — React primitives mirroring Mekari Pixel 3 (v2.4) component patterns.
 *
 * The skill at ~/.claude/skills/pixel/ targets Vue + @mekari/pixel3. This file
 * is the React adaptation: same vocabulary (Text, Flex, Button, Banner, Badge,
 * FormControl, Toggle), same token discipline, but as React components that
 * read theme via useTheme().
 *
 * Color/space/typography props accept Pixel 3 semantic keys ("primary",
 * "surface", "md", "h2"). They are resolved against the active theme so
 * components are dark-mode aware automatically.
 */
import React, { useState } from 'react';
import { useTheme } from '../styles/ThemeContext';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const resolve = (group, key, fallback) =>
  (group && key && group[key] !== undefined) ? group[key] : fallback;

// ─── Text ─────────────────────────────────────────────────────────────────────
// Mirror of MpText. size: h1|h2|h3|label|label-small|body|body-small|overline
// color: primary|secondary|tertiary|brand|success|warning|danger|inverse
export function Text({ as = 'span', size = 'body', color = 'primary', weight, children, style, ...rest }) {
  const { t } = useTheme();
  const Tag = as;
  const preset = resolve(t.typography, size, t.typography.body);
  const colorValue = resolve(t.text, color, t.text.primary);
  return (
    <Tag
      style={{
        margin: 0,
        fontFamily: t.fontFamily,
        ...preset,
        ...(weight ? { fontWeight: weight } : null),
        color: colorValue,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ─── Flex ─────────────────────────────────────────────────────────────────────
// Mirror of MpFlex. Accepts semantic space keys for gap / padding / margin.
export function Flex({
  as = 'div',
  direction = 'row',
  align,
  justify,
  wrap,
  gap,
  padding,
  paddingX,
  paddingY,
  margin,
  marginX,
  marginY,
  bg,
  borderColor,
  borderWidth,
  borderRadius,
  grow,
  shrink,
  basis,
  fullWidth,
  fullHeight,
  children,
  style,
  ...rest
}) {
  const { t } = useTheme();
  const sp = (k) => resolve(t.space, k, k);
  const bgValue = bg ? resolve(t.bg, bg, bg) : undefined;
  const borderColorValue = borderColor ? resolve(t.border, borderColor, borderColor) : undefined;

  const Tag = as;
  return (
    <Tag
      style={{
        display: 'flex',
        flexDirection: direction,
        ...(align && { alignItems: align }),
        ...(justify && { justifyContent: justify }),
        ...(wrap && { flexWrap: wrap }),
        ...(gap !== undefined && { gap: sp(gap) }),
        ...(padding !== undefined && { padding: sp(padding) }),
        ...(paddingX !== undefined && { paddingLeft: sp(paddingX), paddingRight: sp(paddingX) }),
        ...(paddingY !== undefined && { paddingTop: sp(paddingY), paddingBottom: sp(paddingY) }),
        ...(margin !== undefined && { margin: sp(margin) }),
        ...(marginX !== undefined && { marginLeft: sp(marginX), marginRight: sp(marginX) }),
        ...(marginY !== undefined && { marginTop: sp(marginY), marginBottom: sp(marginY) }),
        ...(bgValue && { backgroundColor: bgValue }),
        ...(borderColorValue && {
          borderStyle: 'solid',
          borderColor: borderColorValue,
          borderWidth: borderWidth ?? '1px',
        }),
        ...(borderRadius !== undefined && { borderRadius: t['radius' + (borderRadius[0].toUpperCase() + borderRadius.slice(1))] || borderRadius }),
        ...(grow !== undefined && { flexGrow: grow }),
        ...(shrink !== undefined && { flexShrink: shrink }),
        ...(basis !== undefined && { flexBasis: basis }),
        ...(fullWidth && { width: '100%' }),
        ...(fullHeight && { height: '100%' }),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
// Mirror of MpButton. variant: primary|secondary|success|danger|ghost
// size: sm|md (md default)
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = true,
  iconLeft,
  iconRight,
  type = 'button',
  children,
  style,
  ...rest
}) {
  const { t, s } = useTheme();
  const [hover, setHover] = useState(false);

  const padding = size === 'sm' ? `6px ${t.space.sm}` : `10px ${t.space.md}`;
  const fontSize = size === 'sm' ? t.fontSizeSm : t.fontSizeBase;

  const variants = {
    primary:   { bg: t.bg.brand,   bgHover: t.colorBrandHover,   color: t.text.inverse, borderColor: t.bg.brand },
    secondary: { bg: t.bg.surface, bgHover: t.bg.neutral,        color: t.text.primary, borderColor: t.border.default },
    success:   { bg: t.bg.success, bgHover: t.colorSuccessHover, color: t.text.inverse, borderColor: t.bg.success },
    danger:    { bg: t.bg.danger,  bgHover: t.colorDangerHover,  color: t.text.inverse, borderColor: t.bg.danger },
    ghost:     { bg: 'transparent', bgHover: t.bg.neutral,       color: t.text.primary, borderColor: 'transparent' },
  };
  const v = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding,
        backgroundColor: hover && !disabled && !loading ? v.bgHover : v.bg,
        color: v.color,
        border: `1px solid ${v.borderColor}`,
        borderRadius: t.radiusMd,
        fontSize,
        fontWeight: t.fontWeightSemibold,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: t.space.xs,
        transition: 'background-color 0.15s ease, border-color 0.15s ease',
        letterSpacing: '0.1px',
        lineHeight: '20px',
        fontFamily: t.fontFamily,
        ...style,
      }}
      {...rest}
    >
      {loading ? <Spinner size={16} color={v.color} /> : iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
export function Spinner({ size = 20, color }) {
  const { t } = useTheme();
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color || t.colorBrand} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ animation: 'pixel-spin 0.8s linear infinite', flexShrink: 0 }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      <style>{`@keyframes pixel-spin { 100% { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

// ─── Banner ───────────────────────────────────────────────────────────────────
// Mirror of MpBanner. type: info|success|warning|danger
export function Banner({ type = 'info', title, children, icon, style, ...rest }) {
  const { t } = useTheme();
  const variants = {
    info:    { bg: t.bg.brandSubtle,   color: t.text.brand,   border: t.border.brand },
    success: { bg: t.bg.successSubtle, color: t.text.success, border: t.border.success },
    warning: { bg: t.bg.warningSubtle, color: t.text.warning, border: '#B8890A' },
    danger:  { bg: t.bg.dangerSubtle,  color: t.text.danger,  border: t.border.danger },
  };
  const v = variants[type] || variants.info;
  return (
    <div
      role="status"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: t.space.sm,
        padding: `${t.space.sm} ${t.space.md}`,
        backgroundColor: v.bg,
        color: v.color,
        borderLeft: `3px solid ${v.border}`,
        borderRadius: t.radiusSm,
        marginBottom: t.space.sm,
        fontSize: t.fontSizeSm,
        lineHeight: t.lineHeightBase,
        ...style,
      }}
      {...rest}
    >
      {icon}
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontWeight: t.fontWeightSemibold }}>{title}</div>}
        {children && <div style={{ marginTop: title ? '2px' : 0, opacity: 0.85 }}>{children}</div>}
      </div>
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
// Mirror of MpBadge / MpTag. type: neutral|brand|success|warning|danger
export function Badge({ type = 'neutral', children, style, ...rest }) {
  const { t } = useTheme();
  const variants = {
    neutral: { bg: t.bg.neutralBold,   color: t.text.primary },
    brand:   { bg: t.bg.brandSubtle,   color: t.text.brand },
    success: { bg: t.bg.successSubtle, color: t.text.success },
    warning: { bg: t.bg.warningSubtle, color: t.text.warning },
    danger:  { bg: t.bg.dangerSubtle,  color: t.text.danger },
  };
  const v = variants[type] || variants.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: `2px ${t.space.xs}`,
        backgroundColor: v.bg,
        color: v.color,
        borderRadius: t.radiusFull,
        fontSize: t.fontSizeSm,
        fontWeight: t.fontWeightSemibold,
        lineHeight: '18px',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}

// ─── FormControl ──────────────────────────────────────────────────────────────
// Mirror of MpFormControl. Wraps a labelled, validated field.
const FormControlContext = React.createContext(null);

export function FormControl({ id, isError = false, isRequired = false, isDisabled = false, children }) {
  const ctx = { id, isError, isRequired, isDisabled };
  return (
    <FormControlContext.Provider value={ctx}>
      <div style={{ marginBottom: '12px' }}>{children}</div>
    </FormControlContext.Provider>
  );
}

export function FormLabel({ children, style }) {
  const { t } = useTheme();
  const ctx = React.useContext(FormControlContext);
  return (
    <label
      htmlFor={ctx?.id}
      style={{
        display: 'block',
        marginBottom: t.space['3xs'],
        ...t.typography['label-small'],
        color: t.text.primary,
        ...style,
      }}
    >
      {children}
      {ctx?.isRequired && <span style={{ color: t.text.danger, marginLeft: 4 }}>*</span>}
    </label>
  );
}

export function FormHelperText({ children }) {
  const { t } = useTheme();
  return (
    <div style={{ marginTop: t.space['3xs'], ...t.typography['body-small'], color: t.text.secondary }}>
      {children}
    </div>
  );
}

export function FormErrorMessage({ children }) {
  const { t } = useTheme();
  const ctx = React.useContext(FormControlContext);
  if (!ctx?.isError) return null;
  return (
    <div role="alert" style={{ marginTop: t.space['3xs'], ...t.typography['body-small'], color: t.text.danger }}>
      {children}
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
// Mirror of MpToggle.
export function Toggle({ checked = false, onChange, disabled = false, ariaLabel }) {
  const { t } = useTheme();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: t.radiusFull,
        backgroundColor: checked ? t.bg.brand : t.border.default,
        position: 'relative',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        flexShrink: 0,
        transition: 'background-color 0.2s ease',
        border: 'none',
        padding: 0,
      }}
    >
      <span
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          position: 'absolute',
          top: '3px',
          left: checked ? '23px' : '3px',
          transition: 'left 0.2s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          display: 'block',
        }}
      />
    </button>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
// Lightweight surface container — Pixel patterns use Flex+bg=surface in practice,
// but this is a convenience for the card pattern repeated across the app.
export function Card({ children, padding = 'lg', style, ...rest }) {
  const { t, s } = useTheme();
  return (
    <div style={{ ...s.card, padding: t.space[padding] || t.space.lg, ...style }} {...rest}>
      {children}
    </div>
  );
}
