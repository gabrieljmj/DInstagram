chrome.contextMenus.create({title: "Save", contexts:["all"], onclick: function (info) {
    console.log(info)
}});