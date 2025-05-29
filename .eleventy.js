module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/assets/");
    eleventyConfig.addPassthroughCopy({
        "node_modules/@glidejs/glide/dist/css/glide.core.min.css": "assets/css/glide.core.min.css",
        "node_modules/@glidejs/glide/dist/css/glide.theme.min.css": "assets/css/glide.theme.min.css",
        "node_modules/@glidejs/glide/dist/glide.min.js": "assets/js/glide.min.js"
    });

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
}