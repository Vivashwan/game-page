// Inline SVG sprite: rendered once in the layout, referenced with <Icon id="..." />.
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="i-pin" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="2"/></symbol>
      <symbol id="i-cal" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2"/></symbol>
      <symbol id="i-chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></symbol>
      <symbol id="i-chev-r" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></symbol>
      <symbol id="i-chev-u" viewBox="0 0 24 24"><path d="m6 15 6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></symbol>
      <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.2"/><path d="m20 20-4-4" stroke="currentColor" strokeWidth="2.2"/></symbol>
      <symbol id="i-cart" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M3 4h2l2.4 11h11L21 7H6.2"/><circle cx="9" cy="19.5" r="1.5" fill="currentColor"/><circle cx="17" cy="19.5" r="1.5" fill="currentColor"/></symbol>
      <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M4 21a8 8 0 0 1 16 0" fill="none" stroke="currentColor" strokeWidth="2"/></symbol>
      <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"/></symbol>
      <symbol id="i-gift" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M5 13v8h14v-8M12 8v13M12 8S10 3 7.5 4.5 9 8 12 8zm0 0s2-5 4.5-3.5S15 8 12 8z" fill="none" stroke="currentColor" strokeWidth="2"/></symbol>
      <symbol id="i-tag" viewBox="0 0 24 24"><path d="M3 12V4h8l10 10-8 8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"/></symbol>
      <symbol id="i-refresh" viewBox="0 0 24 24"><path d="M20 11a8 8 0 0 0-14-5l-2 2M4 13a8 8 0 0 0 14 5l2-2M4 4v4h4M20 20v-4h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></symbol>
      <symbol id="i-headset" viewBox="0 0 24 24"><path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1zm16 0h-3v5h2a1 1 0 0 0 1-1z" fill="none" stroke="currentColor" strokeWidth="2"/></symbol>
      <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/><path d="m3 7 9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2"/></symbol>
      <symbol id="i-fb" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor"/><path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.5c0-.8.3-1.3 1.4-1.3h1.4V5.7c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2.1H8.6V14h2.3v7z" fill="#020b33"/></symbol>
      <symbol id="i-ig" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="#020b33" strokeWidth="2"/><circle cx="17.3" cy="6.7" r="1.2" fill="#020b33"/></symbol>
      <symbol id="i-in" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor"/><path d="M7 10v7M7 7v.01M11 17v-7m0 3c0-2 1.2-3 2.7-3S16 11 16 13v4" stroke="#020b33" strokeWidth="2.2" strokeLinecap="round"/></symbol>
      <symbol id="i-google" viewBox="0 0 24 24"><path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" fill="#4285F4"/><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" fill="#34A853"/><path d="M6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9z" fill="#FBBC05"/><path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5L6.4 10C7.2 7.8 9.4 6 12 6z" fill="#EA4335"/></symbol>
      <symbol id="i-smile" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="9" cy="10" r="1.3" fill="currentColor"/><circle cx="15" cy="10" r="1.3" fill="currentColor"/><path d="M8 14c2 2.5 6 2.5 8 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></symbol>
      <symbol id="i-console" viewBox="0 0 64 64"><rect x="22" y="4" width="16" height="50" rx="6" fill="#fff" stroke="#c9cbd6" strokeWidth="1.5"/><rect x="28" y="6" width="4" height="46" rx="2" fill="#1b1b2b"/><path d="M6 46c0-5 4-8 9-8h14c5 0 9 3 9 8l2 8c1 4-4 6-7 3l-4-4H17l-4 4c-3 3-8 1-7-3z" fill="#2b2d42"/></symbol>
      <symbol id="i-vr" viewBox="0 0 64 64"><rect x="6" y="20" width="52" height="24" rx="12" fill="#fff" stroke="#c9cbd6" strokeWidth="1.5"/><circle cx="22" cy="32" r="6" fill="#1b1b2b"/><circle cx="42" cy="32" r="6" fill="#1b1b2b"/><path d="M6 30H2M58 30h4" stroke="#9aa0b4" strokeWidth="4"/></symbol>
      <symbol id="i-pad" viewBox="0 0 64 64"><path d="M14 22h36c7 0 11 6 12 14l1 8c1 6-6 9-10 4l-5-6H16l-5 6c-4 5-11 2-10-4l1-8c1-8 5-14 12-14z" fill="currentColor"/><path d="M18 30v8M14 34h8" stroke="#fff" strokeWidth="3" strokeLinecap="round"/><circle cx="44" cy="31" r="2.5" fill="#fff"/><circle cx="49" cy="36" r="2.5" fill="#fff"/></symbol>
      <symbol id="i-wheel" viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="6"/><circle cx="32" cy="32" r="6" fill="currentColor"/><path d="M8 32h18M38 32h18M32 38v18" stroke="currentColor" strokeWidth="5"/></symbol>
      <symbol id="i-screen" viewBox="0 0 64 64"><rect x="6" y="10" width="52" height="34" rx="3" fill="currentColor"/><path d="M24 54h16M32 44v10" stroke="currentColor" strokeWidth="4"/></symbol>
    </svg>
  );
}

export function Icon({ id, className = "ic", ...rest }) {
  return (
    <svg className={className} aria-hidden="true" {...rest}>
      <use href={`#i-${id}`} />
    </svg>
  );
}
