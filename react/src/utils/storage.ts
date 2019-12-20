export const getStorage = (storageName: 'localStorage' | 'sessionStorage'): Storage | undefined => {
  const w: WindowLocalStorage | WindowSessionStorage | undefined | undefined =
    typeof window === 'undefined' ? undefined : window;
  let s: Storage | undefined = undefined;

  try {
    if (w && storageName === 'localStorage' && 'localStorage' in w && w.localStorage.setItem) {
      s = w.localStorage;
    } else if (w && storageName === 'sessionStorage' && 'sessionStorage' in w && w.sessionStorage.setItem) {
      s = w.sessionStorage;
    }
  } catch {
    // eslint-disable-next-line no-empty
  }

  if (s) {
    const key = `test_${storageName}_${Math.random()}`;

    try {
      s.setItem(key, key);

      if (key === s.getItem(key)) {
        s.removeItem(key);
        return s;
      }
    } catch {
      // eslint-disable-line no-empty
    }
  }

  return undefined;
};

const storage = getStorage('localStorage');

export const isSupported = (): boolean => !!storage;

export const getItem = (key: string): string | undefined => {
  const item = storage ? storage.getItem(key) : undefined;

  // eslint-disable-next-line no-null/no-null
  return item === null ? undefined : item;
};

export const setItem = (key: string, value: string): void => (storage ? storage.setItem(key, value) : undefined);

export const removeItem = (key: string): void => (storage ? storage.removeItem(key) : undefined);
