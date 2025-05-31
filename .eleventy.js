const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/assets/");
    eleventyConfig.addPassthroughCopy({
        "node_modules/@glidejs/glide/dist/css/glide.core.min.css": "assets/css/glide.core.min.css",
        "node_modules/@glidejs/glide/dist/css/glide.theme.min.css": "assets/css/glide.theme.min.css",
        "node_modules/@glidejs/glide/dist/glide.min.js": "assets/js/glide.min.js"
    });
    eleventyConfig.addPassthroughCopy("CNAME");

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        transformOnRequest: process.env.ELEVENTY_RUN_MODE === "serve",
        formats: ["webp", "jpeg"],
        widths: [330, 551, "auto"],
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

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
}
