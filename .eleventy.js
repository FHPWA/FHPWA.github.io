const axios = require("axios")
const fs = require("fs")

axios
	.get("https://api.github.com/orgs/fhpwa/repos")
	.then((res) => {
		let exclude = [".github", "fhpwa.github.io", "home"]
		let data = []
		res.data.forEach((elem) => {
			if (!exclude.includes(elem.name.toLowerCase()) && !elem.archived) {
				data.push({ name: elem.name, description: elem.description })
			}
		})
		data.sort((a, b) => {
			let fa = a.name.toLowerCase(),
				fb = b.name.toLowerCase()

			if (fa < fb) {
				return -1
			}
			if (fa > fb) {
				return 1
			}
			return 0
		})
		fs.writeFile("src/data/fhpwa.json", JSON.stringify(data), (err) => {
			if (err) {
				console.error(err)
			}
		})
	})
	.catch((error) => {
		console.error(error)
	})

module.exports = function (config) {
	config.addTransform("minify", require("./transforms/minify"))
	config.addPassthroughCopy("./src/resources")
	return {
		passthroughFileCopy: true,
		dataTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		templateFormats: ["html", "css", "js", "njk", "md", "png"],
		dir: {
			input: "src",
			output: "docs",
			includes: "includes",
			layouts: "layouts",
			data: "data",
		},
	}
}
