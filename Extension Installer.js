javascript: document.write(
  "<title>Extension Installer</title><style>body {background-color: #2e2e31;}h1 {color: white;margin-top: 100px;font-size: 50px;line-height: 1;}h2 {color: white;margin-top: -10px;font-size: 20px;line-height: 1;}a {color: white;margin-top: -10px;font-size: 20px;line-height: 1;}div {display: flex; flex-direction: column; justify-content: center; align-items: center;}</style><center><head><h1>Extension Installer ver.1.2.2</h1><h2>by NGMS & otoneko</h2><a href=https://github.com/otnkmk8d/Extension-Installer>GitHub</a></head></center><div style='height: 100vh;'><div><input id='extension' placeholder='Extension ID or URL'style='width: 1000px; height: 50px; font-size: 20px; border-radius: 25px 25px 25px 25px; color: black; padding-left: 20px; margin-bottom: 100px; margin-top: -150px;'><button id='DL' style='border-radius: 10px; width: 300px; height: 50px; font-size: 18px; color: black; margin-bottom: 200px; border-radius: 30px;'>Download</button></div></div>"
);
String.prototype.getExtensionID = function () {
  if (/^[a-zA-Z]{32}$/.test(this)) {
    return this.toString();
  } else if (this.match("chrome.google.com")) {
    const pathname = new URL(this).pathname.split("/");
    const extensionID = pathname[pathname.length - 1];
    return /^[a-zA-Z]{32}$/.test(extensionID) ? extensionID : false;
  }
  return false;
};
document.getElementById("DL").addEventListener("click", () => {
  let extensionID = document.getElementById("extension").value.getExtensionID();
  if (extensionID) {
    chrome.webstorePrivate.beginInstallWithManifest3(
      {
        id: extensionID,
        manifest:
          '{\n"update_url": "https://clients2.google.com/service/update2/crx",\n\n"manifest_version": 2,\n"content_security_policy": "script-src \'self\'; object-src \'self\';",\n"minimum_chrome_version": "71.0.0.0",\n"offline_enabled": true,\n"content_scripts":\n[\n{\n"js": [\n"page.js",\n"content.js"\n],\n"matches": [ "file:///*", "http://*/*", "https://*/*" ],\n"run_at": "document_start",\n"all_frames": true\n}\n],\n"browser_action": {\n"default_icon": {\n"19": "images/icon_grey19.png",\n"38": "images/icon_grey38.png",\n"16": "images/icon_grey16.png",\n"24": "images/icon_grey24.png",\n"32": "images/icon_grey32.png"\n},\n"default_title": "Extension",\n"default_popup": "action.html"\n},\n"icons": {\n"32": "images/icon.png",\n"48": "images/icon48.png",\n"128": "images/icon128.png"\n},\n"incognito": "split",\n"name": "Extension",\n"short_name": "Extension",\n"version": "4.18.0",\n"description": "The world\'s most popular userscript manager",\n"default_locale": "en",\n"background": {\n "page": "background.html"\n},\n"options_page": "options.html",\n"options_ui": {\n"page": "options.html",\n"chrome_style": false,\n"open_in_tab": true\n},\n"commands": {\n"toggle-enable": {\n"description": "Toggle enable state"\n},\n"open-dashboard": {\n"description": "Open dashboard"\n},\n"open-dashboard-with-running-scripts": {\n"description": "Open dashboard with the current tab\'s URL used as filter"\n},\n"open-new-script": {\n"description": "Open new script tab"\n}\n},\n"permissions": [\n"notifications",\n"unlimitedStorage",\n"tabs",\n"idle",\n"webNavigation",\n"webRequest", "webRequestBlocking",\n"storage",\n"contextMenus",\n"chrome://favicon/",\n"clipboardWrite",\n"cookies",\n"declarativeContent",\n"<all_urls>"\n],\n"optional_permissions" : [ "downloads" ]\n}\n',
      },
      () => chrome.webstorePrivate.completeInstall(extensionID, function () {})
    );
  } else {
    alert("Extension ID is Invalid!");
  }
}); 
