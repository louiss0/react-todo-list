import axios, { AxiosRequestConfig } from "axios"

import attemptAxiosRequest from "../utils/attemptAxiosRequest"

axios.interceptors.request.use(value => {
	const { method, url } = value

	const time = new Date().getTime()

	const localeTimeString = new Date(time).toLocaleTimeString()

	console.log(
		`This request comes from ${url} method ${method} at ${localeTimeString}  `
	)

	return value
})

export default class HttpService {
	constructor(private url: string, private config: AxiosRequestConfig) {}

	getAll<T>(params: Record<string, unknown> = {}) {
		return attemptAxiosRequest(
			axios.get<T>(this.url, { ...this.config, params })
		)
	}

	getOne<T>(id: string, params: Record<string, unknown> = {}) {
		return attemptAxiosRequest(
			axios.get<T>(`${this.url}/${id}`, { ...this.config, params })
		)
	}

	updateOne<T, U extends { id: string | number }>(
		data: U,
		params: Record<string, unknown> = {}
	) {
		return attemptAxiosRequest(
			axios.patch<T>(`${this.url}/${data.id}`, data, { ...this.config, params })
		)
	}
	updateOrCreateOne<T, U>(data: U, params: Record<string, unknown> = {}) {
		return attemptAxiosRequest(
			axios.put<T>(`${this.url}`, data, { ...this.config, params })
		)
	}
	createOne<T, U extends Record<string, unknown>>(data: U) {
		return attemptAxiosRequest(axios.post<T>(this.url, data, this.config))
	}

	deleteOne<T>(id: string, params: Record<string, unknown> = {}) {
		return attemptAxiosRequest<T>(
			axios.delete(`${this.url}${id}`, { ...this.config, params })
		)
	}
}
