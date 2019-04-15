const path = require("path");
const output = path.resolve(__dirname, "./public");
const sitemap = {
	index: require("./pages-src/homepage/homepage.html.js"),
	developers: require("./pages-src/developers/developers.html.js"),
	products: require("./pages-src/products/products.html.js"),
	"product-example": require("./pages-src/product-example/product-example.html.js"),
};

const sealpage = require("../../../index");

sealpage.build(output, sitemap);
