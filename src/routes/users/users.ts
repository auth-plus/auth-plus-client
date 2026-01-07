import { AUTH_URL } from '$env/static/private'

export async function listUser(
	token: string
): Promise<{ id: string; name: string; email: string }[]> {
	const config: RequestInit = {
		method: 'GET',
		mode: 'cors',
		headers: {
			Authorization: `Bearer ${token}`
		}
	}
	const url = `${AUTH_URL}/user`
	const resp = await fetch(url, config)
	if (resp.status !== 200) {
		throw new Error("List users didn't work")
	}
	const respJson = await resp.json()
	return respJson.list
}

export async function createNewUser(
	name: string,
	email: string,
	password: string,
	token: string
): Promise<{ id: string }> {
	const config: RequestInit = {
		method: 'POST',
		mode: 'cors',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, email, password })
	}
	const url = `${AUTH_URL}/user`
	const resp = await fetch(url, config)
	if (resp.status !== 201) {
		throw new Error("Create a new user didn't work")
	}
	return resp.json()
}
