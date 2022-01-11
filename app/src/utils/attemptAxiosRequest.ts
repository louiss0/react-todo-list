import { AxiosError, AxiosResponse } from "axios"

export default async function attemptAxiosRequest<T>(
	axiosPromise: Promise<AxiosResponse<T>>
) {
	try {
		const res = await axiosPromise

		return res.data
	} catch (error: unknown) {
		const axiosError = error as AxiosError

		console.error(axiosError.toJSON())

		return new Error(axiosError.message)
	}
}
