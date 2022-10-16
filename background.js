'use strict';

chrome.runtime.onInstalled.addListener(function() {
	chrome.privacy.websites.thirdPartyCookiesAllowed.get({}, function(details) {
		if (details.value) {
			console.log('thirdPartyCookiesAllowed is on!');
			chrome.action.setBadgeText({text: 'Allow'});
		} else {
			console.log('thirdPartyCookiesAllowed is off!');
			chrome.action.setBadgeText({text: 'Block'});
		}
	});
});

chrome.action.onClicked.addListener(function(tab) {
	chrome.privacy.websites.thirdPartyCookiesAllowed.get({}, function(details) {
		if (details.value) {
			//console.log('thirdPartyCookiesAllowed was on!');
			chrome.privacy.websites.thirdPartyCookiesAllowed.set({value: false});
			console.log('thirdPartyCookiesAllowed is now off!');
		} else {
			//console.log('thirdPartyCookiesAllowed was off!');
			chrome.privacy.websites.thirdPartyCookiesAllowed.set({value: true});
			console.log('thirdPartyCookiesAllowed is now on!');
		}
	});
});

chrome.privacy.websites.thirdPartyCookiesAllowed.onChange.addListener(function (details) {
	if (details.value)
		chrome.action.setBadgeText({text: 'Allow'});
	else
		chrome.action.setBadgeText({text: 'Block'});
});