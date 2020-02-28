import App from 'demo/components/App';
import configureStore from 'demo/configureStore';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './vendor';

if (process.env.NODE_ENV === 'development') {
  /*System.import('react-axe').then((axe: any) => {
    axe(React, ReactDOM, 1000);
  });/**/

  const updateIgnore = [
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
  import(/* webpackChunkName: "why-did-you-update" */ 'why-did-you-update').then(
    ({whyDidYouUpdate}: any) => {
      whyDidYouUpdate(React, {
        collapseComponentGroups: true,
        exclude: new RegExp(`^(${updateIgnore.join('|')})$`),
        groupByComponent: true
      });
    }
  );
}

const rootEl = document.getElementById('app') as HTMLElement ||
  document.createElement('div') as HTMLElement;

render(
  <Provider store={configureStore}>
    <App />
  </Provider>,
  rootEl
);
