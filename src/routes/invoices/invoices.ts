export async function listInvoice(
	userId: string
): Promise<{ id: string; user_id: string; status: string }[]> {
	const config: RequestInit = {
		method: 'GET',
		mode: 'cors'
	}
	const url = `${process.env.BILLING_URL}/invoice/${userId}`
	const resp = await fetch(url, config)
	if (resp.status !== 200) {
		throw new Error("List a user invoices didn't work")
	}
	const respJson = await resp.json()
	return respJson.invoces
}
