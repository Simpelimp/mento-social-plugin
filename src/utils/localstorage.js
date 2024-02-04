export function setLocalStorageItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorageItem(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function deleteLocalStorageItem(key) {
  localStorage.removeItem(key);
}