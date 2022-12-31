import type { IntroItem } from 'src/models/intro-item.interface';

export const introItemList: IntroItem[] = [{
	image: '/img/screenshot/home.jpg',
	crop: 'bottom',
	h2: `Home Page`,
	p: [
		`This is your gem music home page made up of all your local music, both online and offline, songs and playlists, genres, albums everything sorted out for your greatest comfort.`,
		`From your home page, you can also easily tap the gear button to open up your drawer, where you can further get deeper into Gem. Some of the drawer items include the following...`,
	],
	li: [
		`Local Music`,
		`Downloads`,
		`Playlists`,
		`Settings`,
	],
	note: `you can change general app gradient under the settings.`,
}, {
	image: '/img/screenshot/library.jpg',
	crop: 'bottom',
	h2: `Your Music Library`,
	p: [
		`The app has an organized and clean libary page, just to the last right of the bottom navigation, where all your music both online, local and downloads are carefully organized, to meet your listening desires.`,
		`The playlist option has both your local and online playlists`,
	],
	note: `Dont forget to update your favourites ⭐ under the favourites section.`,
}, {
	image: '/img/screenshot/play_screen.jpg',
	crop: 'bottom',
	h2: `Play Screen`,
	p: [
		`The Gem Music play screen is surely a sight to behold, and has more than just your music art.`,
		`The player screen is broken down into 3 sections.`,
		` The playing queue to the bottom and the lyrics to the right`,
		` The lyrics pannel easily pops up with a left swipe. Ensure to have music with clearly editted tags to get the most accurat tags`

	],
	note: `You can double tap the music art to open the lyrics drawer.`,
}, {
	image: '/img/screenshot/color_schemes.jpg',
	crop: 'top',
	h2: `Theming`,
	p: [
		`Gem has only a dark theme to cater for your eyes, that comes with countless theming properties.`,
		` Gem has countless color themes that you can pick from, as well as a variety of general gradients for the app, which give it a clean feeling in relation to your needs.`,
	],
	note: `You can easily change your theme accent color and gradient colors under the gradient.`,
}, {
	image: '/img/screenshot/yt-search.jpg',
	crop: 'top',
	h2: `Youtube Search`,
	p: [
		`Gem offers a handy feature which lets you search for your favourite music from youtube and play it in app. It also offers you an option to download, save as well as add them to your a dedicated playlist, plus so many other features.`,
		`So dont forget that song, when you have gem. Just search for it an play it instantly.`,
	],
	note: `Having a strong internet connection is an extra point if you have this feature, as a slow internet connection may slow down the app.`,
}, {
	image: '/img/screenshot/extra.jpg',
	crop: 'top',
	h2: `Extra Handy Features`,
	p: [
		`Gem has lots of handy features that make navigation and playing of your music a walk in the park.`,
	],
	li: [
		`Music bottom sheet options.`,
		`Artist, Album, Genre detailed pages.`,
		`Seacrh suggestions`,

	],
	note: `There are more easter eggs within the app, its just up to you to look deeper. It may even be bugs 😅`,
}, {
	image: '/img/screenshot/home.jpg',
	crop: 'bottom',
	h2: `Donations`,
	p: [
		`<strong>Gem</strong> <strong>Music</strong> has a small team and clearly needs help from the community.`,
		`For developers willing to contribute or help out <a href="" <strong>contact me </strong> or donate to make Gem  even better.`,
	],
}];
