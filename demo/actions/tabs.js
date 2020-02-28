export var onTabAdd = function (tab) { return ({
    tab: tab,
    type: 'TAB_ADD'
}); };
export var onTabRemove = function (index) { return ({
    index: index,
    type: 'TAB_REMOVE'
}); };
