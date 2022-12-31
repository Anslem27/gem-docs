import type { PlayStoreReview } from 'src/models/review_model';

export const updateDate = new Date(
	Date.UTC(2022, 0, 11, 7, 5) // month is 0-indexed
).toISOString();


export const featuredReviews: PlayStoreReview[] = [{

	content: 'Been looking for something, interacting, interesting and unique. And guess what, Gem has it all covered, true it might have a few loose ends but it delivers.',
	author: {
		name: 'Gem User',
	},
}, {

	content: 'I recently discovered Gem and I have to say, I am thoroughly impressed with this music app. The user interface is sleek and easy to navigate, and the variety of music available is vast through the youtube search feature. I love being able to create playlists and save my favorite songs. The audio quality is excellent and the fact that its ad-free is a major plus. Overall, I highly recommend Gem to any music lover looking for a reliable and enjoyable music experience.',
	author: {
		name: 'Gem User',
	},
}, {

	content: 'I recently started using Gem and I am blown away by the user interface. The layout is intuitive and finding new music is a breeze. Overall, I am extremely satisfied with Gem and highly recommend it to anyone looking for a user-friendly music app.',
	author: {
		name: 'Gem User',
	},
}, {

	content: 'Spot on, thats it. Just Spot on.',
	author: {
		name: 'Gem User',
	},
}];
