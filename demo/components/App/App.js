var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { DSRPlugin } from '@uirouter/dsr';
import { hashLocationPlugin, 
// pushStateLocationPlugin,
servicesPlugin, UIRouterReact } from '@uirouter/react';
import { StickyStatesPlugin } from '@uirouter/sticky-states';
// import {Visualizer} from '@uirouter/visualizer';
import React, { PureComponent } from 'react';
import UIRouterReactDigest from 'ui-router-react-digest';
import drawers from './drawers';
import tabs from './tabs';
var registered = false;
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this._rootState = {
            name: 'root',
            params: {
                lang: {
                    dynamic: true,
                    value: 'en'
                }
            },
            url: '/:lang'
        };
        _this._router = new UIRouterReact();
        if (!registered) {
            registered = true;
            _this._router.plugin(servicesPlugin);
            _this._router.plugin(hashLocationPlugin);
            // this._router.plugin(pushStateLocationPlugin);
            _this._router.plugin(DSRPlugin);
            _this._router.plugin(StickyStatesPlugin);
            // router.plugin(Visualizer);
            _this._router.urlRouter.when('', function () {
                _this._router.stateService.go('root.tabs.complexDiagram', { location: 'replace' });
            });
            _this._router.urlRouter.when('/', function () {
                _this._router.stateService.go('root.tabs.complexDiagram', { location: 'replace' });
            });
            // In case of no route found, go to first tab
            _this._router.urlRouter.otherwise(function ( /*found, route*/) {
                _this._router.stateService.go('root.tabs.404', { location: 'replace' });
            });
            _this._router.transitionService.onSuccess({ to: 'root.tabs.**' }, function (transition) {
                document.title = transition.targetState().state().params.title;
            });
        }
        return _this;
    }
    App.prototype.render = function () {
        var tabOrder = this.props.tabs.map(function (tab) {
            return tabs[tab.params.type] ? __assign({}, tabs[tab.params.type], tab) : __assign({}, tabs.dynamic, tab);
        });
        var drawerOrder = this.props.drawers.map(function (drawer) {
            return drawers[drawer.name] ? __assign({}, drawers[drawer.name], drawer) : drawer;
        });
        return (<UIRouterReactDigest drawerDocked={this.props.drawerDocked} drawerDrag={this.props.drawerDrag} drawerFooter={null} drawerHover={this.props.drawerHover} drawerIndex={this.props.drawerIndex} drawerOpen={this.props.drawerOpen} drawers={drawerOrder} footer={null} onDrawerOpenToggle={this.props.onDrawerOpenToggle} onDrawerSelect={this.props.onDrawerSelect} onTabSelect={this.props.onTabSelect} orientation={this.props.orientation} rootState={this._rootState} router={this._router} tabIndex={this.props.tabIndex} tabs={tabOrder} title={this.props.title}/>);
    };
    return App;
}(PureComponent));
export default App;
