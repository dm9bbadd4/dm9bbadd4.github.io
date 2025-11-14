const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const htmlmin = require("html-minifier-terser");
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/assets");

    eleventyConfig.addPassthroughCopy({
        "node_modules/@glidejs/glide/dist/css/glide.core.min.css": "assets/css/glide.core.min.css",
        "node_modules/@glidejs/glide/dist/css/glide.theme.min.css": "assets/css/glide.theme.min.css",
        "node_modules/@glidejs/glide/dist/glide.min.js": "assets/js/glide.min.js"
    });
    eleventyConfig.addPassthroughCopy("CNAME");

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        transformOnRequest: process.env.ELEVENTY_RUN_MODE === "serve",
        formats: ["webp", "jpeg"],
        widths: [330, 551, 1500, 1920, "auto"],
        heights: ["auto"],
        htmlOptions: {
            imgAttributes: {
                alt: "",
                loading: "lazy",
                decoding: "async",
            },
            pictureAttributes: {}
        },
        fallback: "largest",
    });

    eleventyConfig.addCollection("pieces", function (collectionsApi) {
        return collectionsApi.getFilteredByTag("pieces").sort(function (a, b) {
            return b.order - a.order;
        });
    });

    eleventyConfig.addTransform("htmlmin", function (content) {
		if ((this.page.outputPath || "").endsWith(".js")) {
			let minified = htmlmin.minify(content, {
				minifyJS: true
			});

			return minified;
		}
        console.log(this.page.outputPath);

		// If not an HTML output, return content as-is
		return content;
	});

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
}
