import { writable } from 'svelte/store';

export interface Credential {
	email: string;
	id: string;
	info: {
		phone: string;
		deviceId: string;
		googleAuth: string;
	};
	name: string;
	token: string;
}

function isCredential(obj: Credential | Record<string, any>): obj is Credential {
	return (obj as Credential).token !== undefined;
}

function createCredentialStore() {
	const { subscribe, set } = writable<Credential | null>(null);

	async function login(email: string, password: string): Promise<string> {
		const config: RequestInit = {
			method: 'POST',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		};
		const url = `http://localhost:5000/login`;
		const resp = await fetch(url, config);
		if (resp.status !== 200) {
			throw new Error("Login didn't work");
		}
		const resJson = await resp.json();
		if (!isCredential(resJson)) {
			throw new Error('Login payload is not a credential');
		}
		set(resJson);
		return resJson.token;
	}

	async function logout(token: string) {
		const config: RequestInit = {
			method: 'POST',
			mode: 'cors',
			headers: { Authorization: `Bearer ${token}` }
		};
		const url = `http://localhost:5000/logout`;
		const resp = await fetch(url, config);
		if (resp.status !== 200) {
			throw new Error("Login didn't work");
		}
		set(null);
	}

	async function refresh(token: string): Promise<string> {
		const config: RequestInit = {
			method: 'GET',
			mode: 'cors',
			headers: {
				Authorization: `Bearer ${token}`,
				'Access-Control-Request-Headers': 'Content-Type, Authorization'
			}
		};
		const url = `http://localhost:5000/login/refresh/${token}`;
		const resp = await fetch(url, config);
		if (resp.status !== 200) {
			throw new Error("Refresh didn't work");
		}
		const resJson = await resp.json();
		if (!isCredential(resJson)) {
			throw new Error('Refresh payload is not a credential');
		}
		set(resJson);
		return resJson.token;
	}

	return {
		subscribe,
		login,
		logout,
		refresh
	};
}

export const credential = createCredentialStore();
