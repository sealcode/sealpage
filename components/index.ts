import Markdown from './markdown/markdown.html';
import Navbar from './navbar/navbar.html';
import DownloadFileButton from './download-file-button/download-file-button';
import ResponsiveImage from './responsive-image/responsive-image.html';

export const components = {
	Markdown,
	Navbar,
	DownloadFileButton,
	ResponsiveImage,
};

export function register(externalComponents) {
	for (let i = 0; i < externalComponents.length; i++) {
		const name = externalComponents[i].name;

		if (!name)
			throw new Error(
				'Name must be provided for the user defined External Component'
			);

		if (components[name])
			throw new Error(
				`External Components registration process failed. There have been naming conflicts that have to be resolved first: ${name}`
			);
		components[name] = externalComponents[i].component;
	}
}
