export var loadState = function () {
    try {
        var serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        var state = JSON.parse(serializedState);
        if (process.env.BUILD.DATE === state.BUILD_DATE) {
            return {
                drawerSettings: state.drawerSettings,
                tabSettings: state.tabSettings,
                tabs: state.tabs
            };
        }
        return undefined;
    }
    catch (err) {
        return undefined;
    }
};
export var saveState = function (state) {
    try {
        localStorage.setItem('state', JSON.stringify({
            BUILD_DATE: process.env.BUILD.DATE,
            drawerSettings: state.drawerSettings,
            tabSettings: state.tabSettings,
            tabs: state.tabs
        }));
    }
    catch (err) {
        console.error(err); // tslint:disable-line:no-console
    }
};
