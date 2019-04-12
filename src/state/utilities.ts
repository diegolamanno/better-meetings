export const retryTransition = (state: string) => ({
	on: {
		RETRY: state,
	},
})
