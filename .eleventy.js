
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/media": "media" });
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addCollection("posts", (c)=> c.getFilteredByGlob("src/posts/*.md").sort((a,b)=> b.date - a.date));
  eleventyConfig.addCollection("videos", (c)=> c.getFilteredByGlob("src/videos/*.md").sort((a,b)=> b.date - a.date));
  return { dir: { input: "src", includes: "_includes", output: "_site" }, templateFormats: ["njk","md","html"] };
};
