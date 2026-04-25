import React, { useState, useEffect } from 'react';
import { token } from '../styles/theme';

const SIDEBAR_EXPANDED = 240;
const SIDEBAR_COLLAPSED = 64;

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconTasks = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const IconSettings = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.17V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-2.82-1.17l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 2.82 1.17l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconProfile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconArrowBack = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const NAV_ITEMS = [
  { id: 'tasks',    label: 'Tugas',      icon: IconTasks },
  { id: 'settings', label: 'Pengaturan', icon: IconSettings },
  { id: 'profile',  label: 'Profil',     icon: IconProfile },
];

// ─── Mekari Pixel Sidebar Colors ─────────────────────────────────────────────
// Based on Mekari Pixel v2.4: white sidebar, indigo.700 accent
const SB = {
  bg: token.colorWhite,
  border: token.colorNeutral300,
  activeBg: token.colorBrandLight,         // indigo.100
  activeColor: token.colorBrand,           // indigo.700
  activeBorder: token.colorBrand,          // indigo.700
  inactiveColor: token.colorNeutral800,
  inactiveHoverBg: token.colorNeutral100,
  logoutColor: token.colorDanger,
  logoutHoverBg: token.colorDangerLight,
  labelColor: token.colorNeutral800,
  brandText: token.colorNeutral1000,
  brandSubText: token.colorNeutral800,
};

// ─── Sidebar Nav Item ─────────────────────────────────────────────────────────
function NavItem({ id, label, icon: Icon, active, collapsed, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      title={collapsed ? label : undefined}
      onClick={() => onClick(id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: token.spacing3,
        padding: collapsed ? `10px 0` : `10px ${token.spacing3}`,
        justifyContent: collapsed ? 'center' : 'flex-start',
        marginBottom: '2px',
        background: active
          ? SB.activeBg
          : hover ? SB.inactiveHoverBg : 'transparent',
        border: 'none',
        borderRadius: token.radiusMd,
        cursor: 'pointer',
        color: active ? SB.activeColor : SB.inactiveColor,
        fontSize: token.fontSizeBase,
        fontWeight: active ? token.fontWeightSemibold : token.fontWeightMedium,
        textAlign: 'left',
        transition: 'background 0.12s ease, color 0.12s ease',
        fontFamily: token.fontFamily,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left active bar */}
      <div style={{
        position: 'absolute',
        left: 0, top: '4px', bottom: '4px',
        width: '3px',
        borderRadius: token.radiusFull,
        backgroundColor: active ? SB.activeBorder : 'transparent',
        transition: 'background 0.12s ease',
      }} />
      <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, marginLeft: active ? 0 : 0 }}>
        <Icon />
      </span>
      {!collapsed && <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>}
    </button>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ currentUser, activeNav, onNavChange, onLogout, collapsed, onToggleCollapse, isMobile, onClose }) {
  const width = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;
  const [logoutHover, setLogoutHover] = useState(false);

  return (
    <div style={{
      width: `${width}px`,
      height: '100%',
      backgroundColor: SB.bg,
      borderRight: `1px solid ${SB.border}`,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'width 0.22s cubic-bezier(.4,0,.2,1)',
      flexShrink: 0,
    }}>
      {/* ── Logo / Brand ──────────────────────────────────────────────────── */}
      <div style={{
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        padding: collapsed ? '0' : `0 ${token.spacing4}`,
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: `1px solid ${SB.border}`,
        flexShrink: 0,
      }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: token.spacing2, overflow: 'hidden' }}>
            {/* Mekari Pixel logo pill */}
            <div style={{
              width: '28px', height: '28px', borderRadius: token.radiusMd,
              background: `linear-gradient(135deg, ${token.colorBrand} 0%, ${token.colorBrandMid} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: token.fontWeightBold, fontSize: token.fontSizeBase, color: SB.brandText, lineHeight: 1.2 }}>TaskApp</div>
              <div style={{ fontSize: token.fontSizeXs, color: SB.brandSubText, lineHeight: 1.2 }}>by Mekari</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div style={{
            width: '32px', height: '32px', borderRadius: token.radiusMd,
            background: `linear-gradient(135deg, ${token.colorBrand} 0%, ${token.colorBrandMid} 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
        )}

        {/* Collapse toggle (desktop only) */}
        {!isMobile && (
          <button
            onClick={onToggleCollapse}
            title={collapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
            style={{
              width: '24px', height: '24px',
              borderRadius: token.radiusFull,
              border: `1px solid ${token.colorNeutral300}`,
              backgroundColor: token.colorWhite,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: token.colorNeutral800,
              flexShrink: 0,
              transition: 'box-shadow 0.15s',
              boxShadow: token.shadowSm,
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = token.shadowMd}
            onMouseLeave={e => e.currentTarget.style.boxShadow = token.shadowSm}
          >
            {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
          </button>
        )}

        {/* Mobile close button */}
        {isMobile && onClose && (
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px', color: token.colorNeutral800 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* ── User Info ────────────────────────────────────────────────────── */}
      <div style={{
        padding: collapsed ? `${token.spacing3} 0` : token.spacing4,
        borderBottom: `1px solid ${SB.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: token.spacing3,
        justifyContent: collapsed ? 'center' : 'flex-start',
        flexShrink: 0,
        overflow: 'hidden',
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: token.radiusFull,
          backgroundColor: token.colorBrandLight,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: token.fontSizeMd, fontWeight: token.fontWeightBold, color: token.colorBrand,
          flexShrink: 0,
        }}>
          {currentUser?.name?.charAt(0).toUpperCase()}
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden', minWidth: 0 }}>
            <div style={{ fontWeight: token.fontWeightSemibold, fontSize: token.fontSizeBase, color: SB.brandText, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser?.name}
            </div>
            <div style={{ fontSize: token.fontSizeXs, color: SB.brandSubText, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser?.email || currentUser?.id}
            </div>
          </div>
        )}
      </div>

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <nav style={{
        flex: 1,
        padding: `${token.spacing2} ${collapsed ? token.spacing2 : token.spacing3}`,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        {!collapsed && (
          <div style={{
            fontSize: token.fontSizeXs, fontWeight: token.fontWeightSemibold,
            color: token.colorNeutral400, textTransform: 'uppercase', letterSpacing: '0.8px',
            padding: `${token.spacing2} ${token.spacing3}`, marginBottom: token.spacing1,
          }}>
            Menu
          </div>
        )}
        {NAV_ITEMS.map(({ id, label, icon }) => (
          <NavItem
            key={id}
            id={id}
            label={label}
            icon={icon}
            active={activeNav === id}
            collapsed={collapsed}
            onClick={(navId) => { onNavChange(navId); onClose?.(); }}
          />
        ))}
      </nav>

      {/* ── Logout ───────────────────────────────────────────────────────── */}
      <div style={{
        padding: `${token.spacing2} ${collapsed ? token.spacing2 : token.spacing3}`,
        borderTop: `1px solid ${SB.border}`,
        flexShrink: 0,
      }}>
        <button
          onClick={onLogout}
          title={collapsed ? 'Keluar' : undefined}
          onMouseEnter={() => setLogoutHover(true)}
          onMouseLeave={() => setLogoutHover(false)}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center',
            gap: token.spacing3,
            padding: collapsed ? `10px 0` : `10px ${token.spacing3}`,
            justifyContent: collapsed ? 'center' : 'flex-start',
            background: logoutHover ? SB.logoutHoverBg : 'transparent',
            border: 'none', borderRadius: token.radiusMd,
            cursor: 'pointer', color: SB.logoutColor,
            fontSize: token.fontSizeBase, fontWeight: token.fontWeightMedium,
            textAlign: 'left', fontFamily: token.fontFamily,
            transition: 'background 0.12s ease',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}><IconLogout /></span>
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard Layout ────────────────────────────────────────────────────
export function DashboardLayout({ currentUser, activeNav, onNavChange, onLogout, pageTitle, showBack, onBack, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = isMobile ? 0 : (collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: token.fontFamily,
      backgroundColor: token.colorSlate100,
      WebkitFontSmoothing: 'antialiased',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${token.colorNeutral300}; border-radius: 99px; }
      `}</style>

      {/* ── Desktop Sidebar (fixed) ─────────────────────────────────────────── */}
      {!isMobile && (
        <div style={{
          position: 'fixed', top: 0, left: 0, bottom: 0,
          width: collapsed ? `${SIDEBAR_COLLAPSED}px` : `${SIDEBAR_EXPANDED}px`,
          transition: 'width 0.22s cubic-bezier(.4,0,.2,1)',
          zIndex: 200,
          boxShadow: token.shadowSm,
        }}>
          <Sidebar
            currentUser={currentUser}
            activeNav={activeNav}
            onNavChange={onNavChange}
            onLogout={onLogout}
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(c => !c)}
            isMobile={false}
          />
        </div>
      )}

      {/* ── Mobile Overlay + Sidebar ────────────────────────────────────────── */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(39,43,50,0.4)',
            zIndex: 300,
            backdropFilter: 'blur(1px)',
          }}
        />
      )}
      {isMobile && (
        <div style={{
          position: 'fixed', top: 0, bottom: 0,
          left: mobileOpen ? 0 : `-${SIDEBAR_EXPANDED}px`,
          width: `${SIDEBAR_EXPANDED}px`,
          zIndex: 301,
          transition: 'left 0.25s cubic-bezier(.4,0,.2,1)',
          boxShadow: mobileOpen ? token.shadowLg : 'none',
        }}>
          <Sidebar
            currentUser={currentUser}
            activeNav={activeNav}
            onNavChange={onNavChange}
            onLogout={onLogout}
            collapsed={false}
            isMobile={true}
            onClose={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        marginLeft: `${sidebarWidth}px`,
        transition: 'margin-left 0.22s cubic-bezier(.4,0,.2,1)',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
      }}>
        {/* Topbar */}
        <header style={{
          height: '56px',
          backgroundColor: token.colorWhite,
          borderBottom: `1px solid ${token.colorNeutral300}`,
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${token.spacing5}`,
          gap: token.spacing3,
          boxShadow: token.shadowXs,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMobileOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px', color: token.colorNeutral900 }}
            >
              <IconMenu />
            </button>
          )}

          {/* Back button */}
          {showBack && (
            <button
              onClick={onBack}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px', color: token.colorNeutral900, alignItems: 'center' }}
            >
              <IconArrowBack />
            </button>
          )}

          {/* Page title */}
          <h1 style={{
            fontSize: token.fontSizeMd,
            fontWeight: token.fontWeightSemibold,
            color: token.colorNeutral1000,
            margin: 0,
            letterSpacing: '-0.1px',
          }}>
            {pageTitle}
          </h1>

          {/* Right: User pill */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: token.spacing2 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: token.spacing2,
              padding: `5px ${token.spacing3} 5px 5px`,
              backgroundColor: token.colorBrandLight,
              borderRadius: token.radiusFull,
              fontSize: token.fontSizeSm,
              color: token.colorBrand,
              fontWeight: token.fontWeightSemibold,
            }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: token.radiusFull,
                background: `linear-gradient(135deg, ${token.colorBrand}, ${token.colorBrandMid})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '11px', fontWeight: token.fontWeightBold,
              }}>
                {currentUser?.name?.charAt(0).toUpperCase()}
              </div>
              <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentUser?.name?.split(' ')[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{
          flex: 1,
          padding: `${token.spacing5} ${token.spacing4}`,
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          paddingBottom: '96px',
          boxSizing: 'border-box',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
