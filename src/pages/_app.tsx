import type { AppProps } from 'next/app';
import DefaultHead from 'src/components/default-head';
import Footer from 'src/components/footer';
import Navbar from 'src/components/navbar';
import { ThemeProvider } from 'src/hooks/theme';
import { TITLE } from 'src/pages/_document';
import 'src/styles/_global.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<DefaultHead title={TITLE}>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</DefaultHead>

			<ThemeProvider>
				<Navbar />

				<div className="typography flex flex-col h-full">
					<main className="container flex-auto p-4">
						<Component {...pageProps} />
					</main>
					<Footer />
				</div>
			</ThemeProvider>
		</>
	);
}
