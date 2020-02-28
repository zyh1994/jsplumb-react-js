export var onDrawerDockedToggle = function (docked) { return ({
    docked: docked,
    type: 'DRAWER_DOCK'
}); };
export var onDrawerDragToggle = function (drag) { return ({
    drag: drag,
    type: 'DRAWER_DRAG'
}); };
export var onDrawerHoverToggle = function (hover) { return ({
    hover: hover,
    type: 'DRAWER_HOVER'
}); };
export var onDrawerSelect = function (index) { return ({
    index: index,
    type: 'DRAWER_SELECT'
}); };
export var onDrawerOpenToggle = function (open) { return ({
    open: open,
    type: 'DRAWER_OPEN'
}); };
