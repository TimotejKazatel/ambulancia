eleventyConfig.addGlobalData("products", () => require("./src/data/products.json"));

module.exports = function(eleventyConfig) {
  // statické súbory
  eleventyConfig.addPassthroughCopy({ "src/media": "media" });
  eleventyConfig.addPassthroughCopy("admin");

  // kolekcie
  eleventyConfig.addCollection("posts", (c) =>
    c.getFilteredByGlob("src/posts/*.md").sort((a,b) => b.date - a.date)
  );
  eleventyConfig.addCollection("videos", (c) =>
    c.getFilteredByGlob("src/videos/*.md").sort((a,b) => b.date - a.date)
  );

  // 👉 Nunjucks filter na formát dátumu (napr. 'dd.MM.yyyy')
  eleventyConfig.addNunjucksFilter("date", (value, fmt = "dd.MM.yyyy") => {
    if (!value) return "";
    const d = new Date(value);
    // Pre 'dd.MM.yyyy'
    if (fmt === "dd.MM.yyyy") {
      const pad = n => String(n).padStart(2,"0");
      return `${pad(d.getDate())}.${pad(d.getMonth()+1)}.${d.getFullYear()}`;
    }
    // Inak použijeme sk-SK
    return new Intl.DateTimeFormat("sk-SK", { dateStyle: "medium" }).format(d);
  });

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    templateFormats: ["njk","md","html"]
  };
};
