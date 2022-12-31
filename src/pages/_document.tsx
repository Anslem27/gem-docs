// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript } from 'next/document';

export const TITLE = 'Gem Music';
export const DEFAULT_META = (
	<>
		{/* Ensure this is synced with `og:description` */}
		<meta
			key=".$description"
			name="description"
			content="Gem Music is a modern music player to give your music a whole new listening experience — it's beautiful and easy to use."
		/>
		<meta
			key=".$author"
			name="author"
			content="Anslem Seguya"
		/>

		{/* Default Open Graph tags */}
		<meta
			key=".$og:type"
			property="og:type"
			content="website"
		/>
		<meta
			key=".$og:title"
			property="og:title"
			content="Gem Music — modernly designed music app"
		/>
		<meta
			key=".$og:image"
			property="og:image"
			content="/img/favicon/android-chrome-96x96.png?v=1"
		/>
		{/* Ensure this is synced with `description` */}
		<meta
			key=".$og:description"
			property="og:description"
			content="Gem Music is a modern music player to give your music a whole new listening experience — it's beautiful and easy to use."
		/>


	</>
);

export default class MyDocument extends Document {

	render() {
		return (
			<Html lang="en">
				<Head>
					<meta
						httpEquiv="X-UA-Compatible"
						content="IE=edge"
					/>
					<meta
						name="color-scheme"
						content="dark light"
					/>

					<meta
						key=".$keywords"
						name="keywords"
						content="Music App,Music,Music app website,Gem Music,Android,Download,App"
					/>

					{/* Global Open Graph tags */}
					<meta
						key=".$og:site_name"
						property="og:site_name"
						content="Gem"
					/>

					{/* Favicons */}

					{/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff"> */}

					<meta
						key=".$apple-mobile-web-app-title"
						name="apple-mobile-web-app-title"
						content="Gem"
					/>
					<meta
						key=".$application-name"
						name="application-name"
						content="Gem"
					/>
					<meta
						key=".$msapplication-TileColor"
						name="msapplication-TileColor"
						content="#f50514"
					/>
					<meta
						key=".$msapplication-TileImage"
						name="msapplication-TileImage"
						content="/mstile-144x144.png?v=1"
					/>
					<meta
						key=".$theme-color"
						name="theme-color"
						content="#f50514"
					/>

					{/* For Google Fonts */}
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					/>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
					{/* Roboto, Google Sans Display, Fira Code */}
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Google+Sans+Display:wght@400;500;700&family=Fira+Code:wght@400&display=swap"
					/>
				</Head>

				<body className="dark">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
