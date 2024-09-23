export function showAlert(text) {
  window.alert(text);
}

export function setStorageItem(key, value) {
  const stringifiedValue = JSON.stringify(value);
  window.sessionStorage.setItem(key, stringifiedValue);
}
export function getStorageItem(key) {
  const saved = window.sessionStorage.getItem(key);
  if (saved) return JSON.parse(saved);
  else return null;
}
