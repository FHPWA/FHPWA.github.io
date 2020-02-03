const mustache = require("mustache");
const fs = require("fs");
const path = require("path");

const projects = [
	{ project: "PWA.Home" },
	{ project: "PWA.HappyShibe" },
	{ project: "PWA.BlackC4t" },
	{ project: "PWA.Brainf" },
];

/**
 *
 * @param {string} fileName
 * @return {string} parent directory
 */
function getDir(fileName) {
	return path.dirname(fileName);
}

/**
 *
 * @param {string} templateFile
 * @param {json} mangle
 * @param {string} outFile
 */
function doMangleAndWrite(templateFile, mangle, outFile) {
	fs.readFile(templateFile, "utf8", function(error, data) {
		const output = mustache.render(data, mangle);
		fs.mkdir(getDir(outFile), { recursive: true }, function(error) {
			return console.log(error);
		});
		fs.writeFile(outFile, output, function(error) {
			return console.log(error);
		});
	});
}

for (let index = 0; index < projects.length; index++) {
	doMangleAndWrite("src/redirect.template.html", projects[index],
	projects[index].project.toLowerCase() + "/index.html");
}

doMangleAndWrite("src/redirect.template.html", projects[0], "index.html");
