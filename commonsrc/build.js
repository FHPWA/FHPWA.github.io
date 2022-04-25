const axios = require("axios");
const mustache = require("mustache");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");


/**
 * Get a template file and return the contents
 *
 * @param {string} templateName the name of the template file
 * @return {string} template text
 */
async function getTemplate(templateName) {
	try {
		const response = await axios.get("https://fhpwa.github.io/commonsrc/" + templateName);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}


/**
 * Get the directory that a file is member of
 *
 * @param {string} fileName
 * @return {string} parent directory
 */
function getDir(fileName) {
	return path.dirname(fileName);
}

/**
 * Mangle a template and a json object containing data to mangle and return the
 * mangled text
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
	const template = await getTemplate(templateName);
	doWrite(doMangle(template, mangle), outFile);
}


/**
 *
 * @param {string} file file containing page data
 * @return {json} page with name, url, content, and scripts
 */
function getPageData(file) {
	const data = fs.readFileSync("src/" + file, "utf8");
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

/**
 * Populate shortcuts (android home screen shortcuts )
 */
base.shortcut = [];
for (let index = 0; index < pages.length; index++) {
	if (fs.existsSync("./images/shorticons/" + pages[index].pageUrl.replace(
		".html", ".png"))) {
		base.shortcut.push({
			name: pages[index].pageName,
			link: pages[index].pageUrl,
			icon: pages[index].pageUrl.replace(".html", ".png"),
		});
	}
}
base.isShortcuts = base.shortcut.length > 0;

// Add pages to precache files
for (let index = 0; index < pages.length; index++) {
	base.precacheFiles.push({
		fileName: base.namespace + "/" + pages[index].pageUrl,
	});
}

for (let index = 0; index < pages.length; index++) {
	const page = JSON.parse(JSON.stringify(base)); // create a copy of base
	page.navContent[index].current = true;
	page.pageContent = pages[index].pageContent;
	page.pageName = pages[index].pageName;
	page.pageScript = pages[index].pageScript;
	// write the page
	doRemoteMangleAndWrite("base.template.html", page, pages[index].pageUrl);
}

// Manifest
doRemoteMangleAndWrite("manifest.template.json", base, "manifest.json");
// Service Worker
doRemoteMangleAndWrite("sw.template.js", base, "sw.js");
