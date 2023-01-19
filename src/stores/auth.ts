import { writable } from 'svelte/store';
import type { Strategy } from '../routes/mfa/mfa';

export interface User {
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

function isUser(obj: User | Record<string, any>): obj is User {
	return (obj as User).token !== undefined;
}
export interface MFAChoose {
	hash: string;
	strategyList: Strategy[];
}

function isMFAChoose(obj: MFAChoose | Record<string, any>): obj is MFAChoose {
	return (obj as MFAChoose).hash !== undefined;
}

function createCredentialStore() {
	const { subscribe, set } = writable<User | null>(null);

	async function login(email: string, password: string): Promise<MFAChoose | null> {
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
		if (!isUser(resJson) && !isMFAChoose(resJson)) {
			throw new Error('Login payload is not a credential');
		}
		if (isUser(resJson)) {
			set(resJson);
			return null;
		}
		return resJson;
	}

	async function chooseStrategy(hash: string, strategy: Strategy): Promise<string> {
		const config: RequestInit = {
			method: 'POST',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ hash, strategy })
		};
		const url = `http://localhost:5000/mfa/choose`;
		const resp = await fetch(url, config);
		if (resp.status !== 200) {
			throw new Error("Choose strategy didn't work");
		}
		const resJson = await resp.json();
		return resJson.hash;
	}

	async function loginCode(hash: string, code: Strategy): Promise<void> {
		const config: RequestInit = {
			method: 'POST',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ hash, code })
		};
		const url = `http://localhost:5000/mfa/code`;
		const resp = await fetch(url, config);
		if (resp.status !== 200) {
			throw new Error("Choose strategy didn't work");
		}
		const resJson = await resp.json();
		if (!isUser(resJson)) {
			throw new Error('LoginCode payload is not a credential');
		}
		set(resJson);
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
				Authorization: `Bearer ${token}`
			}
		};
		const url = `http://localhost:5000/login/refresh/${token}`;
		const resp = await fetch(url, config);
		if (resp.status !== 200) {
			throw new Error("Refresh didn't work");
		}
		const resJson = await resp.json();
		if (!isUser(resJson)) {
			throw new Error('Refresh payload is not a credential');
		}
		set(resJson);
		return resJson.token;
	}

	return {
		subscribe,
		login,
		logout,
		refresh,
		chooseStrategy,
		loginCode
	};
}

export const credential = createCredentialStore();
