const path = require("path");

const site = {
	index: require("./pages-src/homepage/homepage.html.js"),
	developers: require("./pages-src/developers/developers.html.js"),
	products: require("./pages-src/products/products.html.js"),
	"product-example": require("./pages-src/product-example/product-example.html.js"),
};

module.exports = async () =>
	require("./lib/render-site.js")(path.resolve(__dirname, "./public"), site);
