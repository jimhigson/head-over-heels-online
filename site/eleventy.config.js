/** @param {import("@11ty/eleventy/UserConfig")} eleventyConfig */
export default (eleventyConfig) => {
  // the stylesheet is built separately by the tailwind cli into site/_built,
  // then copied into the output as /styles
  eleventyConfig.addPassthroughCopy({ "site/_built": "styles" });

  eleventyConfig.addFilter("date", (value) =>
    new Date(value).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  );

  return {
    dir: {
      input: "site",
      output: "site/_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
