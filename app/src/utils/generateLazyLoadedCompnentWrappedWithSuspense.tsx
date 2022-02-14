import React, { lazy, Suspense } from "react"
import type { SuspenseProps } from "react"
import SuspenseFallback from "../pages/SuspenseFallback"

type GenerateLazyLoadedCompnentWrappedWithSuspenseParams = {
	fallback?: SuspenseProps["fallback"]
	dynamicComponent: ReturnType<Parameters<typeof lazy>[0]>
}

export default function generateLazyLoadedCompnentWrappedWithSuspense(
	dynamicComponent: GenerateLazyLoadedCompnentWrappedWithSuspenseParams["dynamicComponent"],
	fallback = <SuspenseFallback />
) {
	const Component = lazy(() => dynamicComponent)

	return (
		<Suspense fallback={fallback}>
			<Component />
		</Suspense>
	)
}
