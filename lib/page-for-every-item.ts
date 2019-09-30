import colors from 'colors';

async function getItems(app, collectionName) {
	return await app.run_action(
		new app.Sealious.SuperContext(),
		['collections', collectionName],
		'show'
	);
}

const pageForEveryItem = function(
	app,
	collectionName,
	itemTemplate,
	indexTemplate
) {
	const ret = {};

	return getItems(app, collectionName).then(data => {
		const items = data.items;

		for (const item of items) {
			ret[item.slug] = async () => itemTemplate(item);
		}

		ret.index = async () => indexTemplate(items);

		console.log(
			`${colors.gray(
				`dispatched ${colors.green(
					JSON.stringify(Object.keys(ret))
				)} pages to render`
			)} in '${colors.green(collectionName)}' directory`
		);

		return ret;
	});
};

export default pageForEveryItem;
