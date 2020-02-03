const request = require('request');
const mustache = require("mustache");
const fs = require("fs");
const path = require("path");

/**
 *
 * @param {string} templateName the name of the template file
 * @return {string} template text
 */
function getTemplate(templateName) {
	return new Promise(function (resolve, reject) {
		request('https://fredhappyface.github.io/commonsrc/' + templateName, { json: false }, function (error, res, body) {
			if (error) { reject(error); }
			resolve(body);
		});
	})
}


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
 * @param {string} template template string
 * @param {json} mangle json containing mangle data
 */
function doMangle(template, mangle) {
	return mustache.render(template, mangle);
}

/**
 *
 * @param {string} string string to write
 * @param {string} outFile file to save to
 */
function doWrite(string, outFile) {
	fs.mkdir(getDir(outFile), { recursive: true }, function (error) {
		return console.log(error);
	});
	fs.writeFile(outFile, string, function (error) {
		return console.log(error);
	});
}

/**
 *
 * @param {string} templateFile
 * @param {json} mangle
 * @param {string} outFile
 */
function doMangleAndWrite(templateFile, mangle, outFile) {
	fs.readFile("commonsrc/" + templateFile, "utf8", function (error, data) {
		doWrite(doMangle(data, mangle), outFile);
	});
}

/**
 *
 * @param {string} templateName
 * @param {json} mangle
 * @param {string} outFile
 */
async function doRemoteMangleAndWrite(templateName, mangle, outFile) {
	doWrite(doMangle(await getTemplate(templateName), mangle), outFile);
}


// Base
base = {
	projectFullName: "PWA.Example",
	projectShortName: "Example",
	stylesNamespace: "example",
	projectColour: "#602030",
	isNavigation: true,
	precacheFiles: [
		{
			fileName: "PWA.Example/"
		},
		{
			fileName: "PWA.Example/index.html"
		}
	]
}

pages = [
	{
		pageName: "Nav 1",
		pageUrl: "nav1.html",
		pageContent: [
			{
				primary: true,
				htmlContent: "<h1>This is some content</h1><p>Looks ok to me.</p>"
			},
			{
				htmlContent: "<h1>This is some more content</h1><p>Because I can - Would be a good idea to have this read in from a file or something.</p>"
			},
		],
		pageScript: [
			{
				script: "example-script.js"
			}
		],
	},
	{
		pageName: "Nav 2",
		pageUrl: "nav2.html",
		pageContent: [
			{
				primary: true,
				htmlContent: "<h1>This is some content</h1><p>Looks ok to me.</p>"
			},
		]
	}
]
/**
 * Populate navContent
 */
base.navContent = [];
for (let index = 0; index < pages.length; index++) {
	base.navContent.push({ text: pages[index].pageName, current: false, link: pages[index].pageUrl })
}

for (let index = 0; index < pages.length; index++) {
	let page = JSON.parse(JSON.stringify(base));
	page.navContent[index].current = true;
	page.pageContent = pages[index].pageContent;
	page.pageName = pages[index].pageName;
	doMangleAndWrite("base.template.html", page, "example-out/" + pages[index].pageUrl)
}

// Manifest
doMangleAndWrite("manifest.template.json", base, "example-out/manifest.json")
// Service Worker
doMangleAndWrite("sw.template.js", base, "example-out/sw.js")
