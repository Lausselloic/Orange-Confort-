const prefix = 'cplus-';

chrome.runtime.onInstalled.addListener(async () => {
	// Update action icon and state
	const tabs = await chrome.tabs.query({});

	for (const tab of tabs) {
		// Set CDU disable by default
		updateButtonIcon(false, tab.id as number);
		// Disable action on internal browser pages
		if (['edge:', 'chrome:', 'about:'].some(browser => tab.url?.startsWith(browser))) {
			chrome.action.disable(tab.id);
		} else {
			chrome.action.enable(tab.id);
			const states = await chrome.storage.local.get(`${prefix}is-enabled-${tab.id}`);
			chrome.storage.local.set({[`${prefix}is-enabled-${tab.id}`]: false});
			// Reload tabs that had CDU loaded and active
			if (states[`${prefix}is-enabled-${tab.id}`]) {
				chrome.tabs.reload(tab.id as number)
					.catch(error => {
						console.error(`Cannot reload tab ${tab.id}. Error: ${error}`)
					});
			}
		}
	}
});

// Update CDU button icon
// @ts-ignore
const updateButtonIcon = (isEnabled: boolean, tabId: number) => {
	if (isEnabled) {
		chrome.action.setIcon({
			tabId: tabId,
			path: {
				"16": "../assets/img/icon-16.png",
				"19": "../assets/img/icon-19.png",
				"32": "../assets/img/icon-32.png",
				"38": "../assets/img/icon-38.png",
				"48": "../assets/img/icon-48.png",
				"64": "../assets/img/icon-64.png",
				"128": "../assets/img/icon-128.png"
			}
		});
	} else {
		chrome.action.setIcon({
			tabId: tabId,
			path: {
				"16": "../assets/img/icon-disabled-16.png",
				"19": "../assets/img/icon-disabled-19.png",
				"32": "../assets/img/icon-disabled-32.png",
				"38": "../assets/img/icon-disabled-38.png",
				"48": "../assets/img/icon-disabled-48.png",
				"64": "../assets/img/icon-disabled-64.png",
				"128": "../assets/img/icon-disabled-128.png"
			}
		});
	}
}

// CDU button click event
chrome.action.onClicked.addListener(async (tab) => {
	// Just in case we're on internal browser page and action couldn't be disabled before
	if (['edge:', 'chrome:', 'about:'].some(browser => tab.url?.startsWith(browser))) {
		chrome.action.disable(tab.id);
		return false;
	}

	const activations = await chrome.storage.local.get(`${prefix}is-enabled-${tab.id}`);
	const isEnabled = activations[`${prefix}is-enabled-${tab.id}`];
	chrome.storage.local.set({[`${prefix}is-enabled-${tab.id}`]: !isEnabled});

	const injections = await chrome.storage.local.get(`${prefix}is-injected-${tab.id}`);
	const isInjected = injections[`${prefix}is-injected-${tab.id}`];

	updateButtonIcon(!isEnabled, tab.id as number);

	if (!isEnabled && !isInjected) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id as number },
			files: ['js/toolbar.js']
		});
		chrome.storage.local.set({[`${prefix}is-injected-${tab.id}`]: true});
	} else if (!isEnabled && isInjected) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id as number },
			files: ['js/restore.js']
		});
	} else if (isEnabled && isInjected) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id as number },
			files: ['js/eject.js']
		});
	}
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	updateButtonIcon(false, tabId);
	if (['edge:', 'chrome:', 'about:'].some(browser => tab.url?.startsWith(browser))) {
		chrome.action.disable(tabId);
	} else {
		chrome.action.enable(tabId);
	}
});

chrome.tabs.onCreated.addListener(tab => {
	updateButtonIcon(false, tab.id as number);
	chrome.action.disable(tab.id);
	if (!['edge:', 'chrome:', 'about:'].some(browser => tab.url?.startsWith(browser))) {
		chrome.action.enable(tab.id);
	}
});

// @note Debugging storage
// @see https://developer.chrome.com/docs/extensions/reference/storage/#synchronous-response-to-storage-updates
chrome.storage.onChanged.addListener((changes, namespace) => {
	for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
		console.log(
			`Storage key "${key}" in namespace "${namespace}" changed.`,
			`Old value was "${oldValue}", new value is "${newValue}".`
		);
	}
});
