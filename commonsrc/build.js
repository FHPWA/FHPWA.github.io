const request = require("request");
const mustache = require("mustache");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

/**
 *
 * @param {string} templateName the name of the template file
 * @return {string} template text
 */
function getTemplate(templateName) {
	return new Promise(function(resolve, reject) {
		request("https://fhpwa.github.io/commonsrc/" + templateName, { json: false }, function(error, res, body) {
			if (error) {
				reject(error);
			}
			resolve(body);
		});
	});
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
 * @return {string} mangled template
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
	fs.mkdir(getDir(outFile), { recursive: true }, function(error) {
		return console.log(error);
	});
	fs.writeFile(outFile, string, function(error) {
		return console.log(error);
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


/**
 *
 * @param {string} file file containing page data
 * @return {json} page with name, url, content, and scripts
 */
function getPageData(file) {
	data = fs.readFileSync("src/" + file, "utf8");
	const sections = cheerio.load(data);
	const page = {
		pageName: sections("title").text(),
		pageUrl: file.split(".")[0] + ".html",
		pageContent: [],
		pageScript: [],
	};
	sections("section").each(function(index, element) {
		page.pageContent.push({
			htmlContent: sections(element).html(),
			primary: index % 2 === 1,
		});
	});
	sections("script").each(function(index, element) {
		page.pageScript.push({ script: sections(element).html() });
	});
	return page;
}


const rawData = JSON.parse(fs.readFileSync("src/config.json"));
const files = rawData.files;
const base = rawData.base;


const pages = [];
for (let index = 0; index < files.length; index++) {
	pages.push(getPageData(files[index]));
}

/**
 * Populate navContent
 */

base.navContent = [];
for (let index = 0; index < pages.length; index++) {
	base.navContent.push({
		text: pages[index].pageName,
		current: false,
		link: pages[index].pageUrl,
	});
}

for (let index = 0; index < pages.length; index++) {
	const page = JSON.parse(JSON.stringify(base));
	page.navContent[index].current = true;
	page.pageContent = pages[index].pageContent;
	page.pageName = pages[index].pageName;
	page.pageScript = pages[index].pageScript;
	doRemoteMangleAndWrite("base.template.html", page, pages[index].pageUrl);
}

// Manifest
doRemoteMangleAndWrite("manifest.template.json", base, "manifest.json");
// Service Worker
doRemoteMangleAndWrite("sw.template.js", base, "sw.js");
