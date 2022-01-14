chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.url.includes("thumbtack")) {
    chrome.tabs.executeScript(
      tabId,
      { file: "./inject_script.js" },
      function () {
        chrome.tabs.executeScript(
          tabId,
          { file: "./foreground.js" },
          function () {
            chrome.tabs.insertCSS(
              tabId,
              { file: "./content.css" },
              function () {
                console.log("INJECTED AND EXECUTED");
              }
            );
          }
        );
      }
    );
  }
});

const onBeforeRequestHandler = (details) => {
  if (details.method === "POST") {
    console.log({ details, url: details.url });
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            target: "app",
            type: "setMessage",
            details,
            requestBody: details.requestBody,
          },
          (response) => {
            console.log("background sent message", { response });
            return true;
          }
        );
      }
    );
  }
  return true;
};
// Listen to the network
chrome.webRequest.onBeforeRequest.addListener(
  onBeforeRequestHandler,
  { urls: ["http://*.thumbtack.com/*", "https://*.thumbtack.com/*"] },
  ["blocking", "requestBody"]
);
