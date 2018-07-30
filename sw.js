//‘use strict’;
//importScripts(‘sw-toolbox.js’); 
//toolbox.precache([“index.html”,”style/style.css”]); 
//toolbox.router.get(‘/images/*’, toolbox.cacheFirst); toolbox.router.get(‘/*’, toolbox.networkFirst, { networkTimeoutSeconds: 5});


const 
	version = '1'.0.0',
	CACHE = version + '::PWAsite',
	offlineURL = '/offline/',
	installFilesEssential = [
		'/',
		'/manifest.json',
		'/index.html'
		].concat(offlineURL),
	installFilesDesireable = [
		'/otp.js'
	];