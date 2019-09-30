import { getItems } from './page-for-every-item';

interface Feed {
	feed: {
		title: string;
		link: string;
		entry: EntryFeed;
	};
}

interface EntryFeed {
	title: string;
	link: string;
	updated: Date | string;
	summary: string;
	content?: string;
	author?: {
		name: string;
		email: string;
	};
}

export async function generateFeed(config: Map<String, String>, app: object) {}
