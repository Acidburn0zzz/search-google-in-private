/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    // console.log("Item created successfully");
  }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  // console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Create all the context menu items.
*/
browser.menus.create({
  id: "selected-text",
  title: browser.i18n.getMessage("menuItemSelection"),
  contexts: ["selection"]
}, onCreated);


/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "selected-text":
      // create a incognito window
      let searchURL = "https://www.google.com/search?q=" + encodeURIComponent(info.selectionText)
      let createData = {
          incognito: true,
          url: [searchURL]
        };
      let creating = browser.windows.create(createData);
      creating.then(() => {
        console.log("The incognito window has been created");
      });
      break;
  }
});
