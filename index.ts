import getApp from './get-app';
import hashFile from './lib/hash-file';
import { pageForEveryItem } from './lib/page-for-every-item';
import renderer from './lib/render-site';
import runAdmin from './run-admin';
import { components } from './components';
import S from './lib/s';

const build = async function(
	sitemapPath: string,
	outputDir: string
): Promise<void> {
	const sitemap = (await require(sitemapPath)()).sitemap;
	return renderer(sitemap, outputDir);
};

module.exports = {
	build,
	getApp,
	hashFile,
	pageForEveryItem,
	renderer,
	runAdmin,
	components,
	S,
};
