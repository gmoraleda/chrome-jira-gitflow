copyFeature.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.sync.set({ type: "feat" }, () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: copyToClipboard,
    });
  });
});
copyBug.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.sync.set({ type: "fix" }, () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: copyToClipboard,
    });
  });
});

copyChore.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.sync.set({ type: "chore" }, () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: copyToClipboard,
    });
  });
});

function copyToClipboard() {
  chrome.storage.sync.get("type", ({ type }) => {
    const regex = /\[([A-Z].*-\d.*)\] (.*) - Jira/;
    const matches = document.title.match(regex);
    const key = matches[1];
    const description = matches[2];
    const text = `git checkout -b ${type}/${key}/${description
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(":", "-")}`;
    const input = document.createElement("input");
    input.setAttribute("value", text);
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  });
}
