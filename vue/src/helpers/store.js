export const getStorage = (storageName) => {
	const w =
		typeof window === 'undefined' ? undefined : window;
	let s = undefined;

	try {
		if (w && storageName === 'localStorage' && 'localStorage' in w && w.localStorage.setItem) {
			s = w.localStorage;
		} else if (w && storageName === 'sessionStorage' && 'sessionStorage' in w && w.sessionStorage.setItem) {
			s = w.sessionStorage;
		}
	} catch {
		throw 'sad'
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
			throw 'sad';
		}
	}

	return undefined;
};

const storage = getStorage('localStorage');

export const isSupported = () => !!storage;

export const getItem = (key)  => {
	const item = storage ? storage.getItem(key) : undefined;

	return item === null ? undefined : item;
};

export const setItem = (key, value) => (storage ? storage.setItem(key, value) : undefined);

export const removeItem = (key) => (storage ? storage.removeItem(key) : undefined);