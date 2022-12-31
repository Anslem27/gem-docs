import { faDiscord, faGithub,faRedditAlien } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import type { IconItem } from 'src/models/icon-item.interface';

export const iconItemList: IconItem[] = [/* {
	icon: faGooglePlay,
	tooltip: 'Play Store',
	url: 'https://play.google.com/store/apps/',
	rel: 'noopener',
},  */{
		icon: faGithub,
		tooltip: 'GitHub',
		url: 'https://github.com/',
		rel: 'noopener',
	}, {
		icon: faDiscord,
		tooltip: 'Discord',
		url: 'https://discord.gg/',
		rel: 'noopener noreferrer',
	}, {
		icon: faEnvelope,
		tooltip: 'Email',
		url: 'mailto:',
		rel: 'noopener noreferrer',
	}, {
		icon: faRedditAlien,
		tooltip: 'Reddit',
		url: 'https://reddit.com/',
		rel: 'noopener',
	}];
