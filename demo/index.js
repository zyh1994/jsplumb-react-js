import App from 'demo/components/App';
import configureStore from 'demo/configureStore';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './vendor';
if (process.env.NODE_ENV === 'development') {
    /*System.import('react-axe').then((axe: any) => {
      axe(React, ReactDOM, 1000);
    });/**/
    var updateIgnore_1 = [
        'a',
        'b',
        'Bridge',
        'c',
        'Diagram',
        'e',
        'HotExportedConnect\\(App\\)',
        'ReactSwipableView',
        'Nodes',
        'o',
        'PanAndZoomHOC',
        'Portals',
        'r',
        't',
        'UIView',
        'View'
    ];
    // tslint:disable-next-line
    import(/* webpackChunkName: "why-did-you-update" */ 'why-did-you-update').then(function (_a) {
        var whyDidYouUpdate = _a.whyDidYouUpdate;
        whyDidYouUpdate(React, {
            collapseComponentGroups: true,
            exclude: new RegExp("^(" + updateIgnore_1.join('|') + ")$"),
            groupByComponent: true
        });
    });
}
var rootEl = document.getElementById('app') ||
    document.createElement('div');
render(<Provider store={configureStore}>
    <App />
  </Provider>, rootEl);
