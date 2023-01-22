import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const appRouter = router({
	url: publicProcedure
		.input(
			z.object({
				url: z.string().url(),
				slug: z.string().regex(/[a-zA-Z0-9\-]+/),
			})
		)
		.query(async ({ input: { url, slug } }) => {
			console.log(url, slug)
			try {
				const result = await prisma?.url.create({
					data: { url, slug },
				})
				console.log(result)
				return {
					message: `Shortened URL created. Access shortened url with /${slug}`,
				}
			} catch (e) {
				console.log(e)
			}
		}),
})

// export type definition of API
export type AppRouter = typeof appRouter
