'use strict';

let listenerFunction = function() {
	chrome.privacy.websites.thirdPartyCookiesAllowed.get({}, function(details) {
		let badgeText = "";
		if (details.value) {
			console.log('thirdPartyCookiesAllowed is on!');
			badgeText = chrome.i18n.getMessage("allow");
		} else {
			console.log('thirdPartyCookiesAllowed is off!');
			badgeText = chrome.i18n.getMessage("block");
		}
		chrome.action.setBadgeText({text: badgeText});
		let tooltipText = chrome.i18n.getMessage("actionTitle") + chrome.i18n.getMessage("currentSetting") + " " + badgeText;
		chrome.action.setTitle({title: tooltipText});
	})
};

chrome.runtime.onInstalled.addListener(listenerFunction);
chrome.runtime.onStartup.addListener(listenerFunction);

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
	let badgeText = "";
	if (details.value)
		badgeText = chrome.i18n.getMessage("allow");
	else
		badgeText = chrome.i18n.getMessage("block");
	chrome.action.setBadgeText({text: badgeText});
	let tooltipText = chrome.i18n.getMessage("actionTitle") + chrome.i18n.getMessage("currentSetting") + " " + badgeText;
	chrome.action.setTitle({title: tooltipText});
});