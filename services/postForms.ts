const API_BASE_URL = "http://localhost:8180/";

export const postForms = async (url: string, body: any) => {
	const response = await fetch(API_BASE_URL + url, {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return response;
};
