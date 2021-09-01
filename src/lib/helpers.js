export const getCodeSizeInBytes = code => {
  return new Blob([code], { type: 'text/plain' }).size;
};

const base64UrlDecodeChars = {'-': '+', '_': '/', '.': '='};
const base64UrlDecode = input => {
  try {
    return atob(input.replace(/[-_.]/g, c => base64UrlDecodeChars[c]));
  } catch {
    return null;
  }
}

const base64UrlEncodeChars = {'+': '-', '/': '_', '=': '.'};
const base64UrlEncode = input => {
  try {
    return btoa(input).replace(/[+/=]/g, c => base64UrlEncodeChars[c]);
  } catch {
    return null;
  }
}

export const saveState = state => {
  const base64 = base64UrlEncode(JSON.stringify(state));
  window.history.replaceState(state, '', `#${base64}`);
};

export const loadState = () => {
  try {
    const base64 = window.location.hash.slice(1);
    return JSON.parse(base64UrlDecode(base64));
  } catch {}
  return null;
}
