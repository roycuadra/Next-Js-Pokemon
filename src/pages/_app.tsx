//#region Import
import { AppProps } from 'next/app';
import { ButtonStylesParams, MantineProvider, AlertStylesParams } from '@mantine/core';
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { QueryClient, QueryClientProvider } from 'react-query';
//#endregion

//#region Styles
import "../styles/globals.css"
import customFontTheme from "../styles/fonts"
import { AnimatePresence } from 'framer-motion';
//#endregion

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? ((page) => page)
	const queryClient = new QueryClient();

	return getLayout(
		<MantineProvider withNormalizeCSS withGlobalStyles theme={customFontTheme}
		>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</MantineProvider>
	)
}
