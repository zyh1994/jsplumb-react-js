import {DSRPlugin} from '@uirouter/dsr';
import {
  hashLocationPlugin,
  // pushStateLocationPlugin,
  servicesPlugin,
  UIRouterReact
} from '@uirouter/react';
import {StickyStatesPlugin} from '@uirouter/sticky-states';
// import {Visualizer} from '@uirouter/visualizer';
import React, {
  PureComponent
} from 'react';
import UIRouterReactDigest, {
  Drawers,
  Orientation,
  Tabs
} from 'ui-router-react-digest';
import drawers from './drawers';
import tabs from './tabs';

let registered = false;

interface IAppProps {
  debug: boolean;
  drawerDocked: boolean;
  drawerDrag: boolean;
  drawerHover: boolean;
  drawerIndex: number;
  drawerOpen: boolean;
  drawers: Drawers;
  orientation: Orientation;
  onDrawerOpenToggle: (toggle: boolean) => any;
  onDrawerSelect: (index: number) => any;
  onTabSelect: (index: number) => any;
  tabIndex: number;
  tabs: Tabs;
  title: string;
}

export default class App extends PureComponent<IAppProps> {
  private _rootState = {
    name: 'root',
    params: {
      lang: {
        dynamic: true,
        value: 'en'
      }
    },
    url: '/:lang'
  };

  private _router = new UIRouterReact();

  public constructor (props: IAppProps) {
    super(props);

    if (!registered) {
      registered = true;

      this._router.plugin(servicesPlugin);
      this._router.plugin(hashLocationPlugin);
      // this._router.plugin(pushStateLocationPlugin);
      this._router.plugin(DSRPlugin);
      this._router.plugin(StickyStatesPlugin);
      // router.plugin(Visualizer);

      this._router.urlRouter.when('', () => {
        this._router.stateService.go(
          'root.tabs.complexDiagram',
          {location: 'replace'}
        );
      });

      this._router.urlRouter.when('/', () => {
        this._router.stateService.go(
          'root.tabs.complexDiagram',
          {location: 'replace'}
        );
      });

      // In case of no route found, go to first tab
      this._router.urlRouter.otherwise((/*found, route*/) => {
        this._router.stateService.go(
          'root.tabs.404',
          {location: 'replace'}
        );
      });

      this._router.transitionService.onSuccess(
        {to: 'root.tabs.**'},
        (transition) => {
          document.title = transition.targetState().state().params.title;
        }
      );
    }
  }

  public render () {
    const tabOrder: Tabs = this.props.tabs.map((tab) => {
      return tabs[tab.params.type] ? {
        ...tabs[tab.params.type],
        ...tab
      } : {
        ...tabs.dynamic,
        ...tab
      };
    });

    const drawerOrder: Drawers = this.props.drawers.map((drawer) => {
      return drawers[drawer.name] ? {
        ...drawers[drawer.name],
        ...drawer
      } : drawer;
    });

    return (
      <UIRouterReactDigest
        drawerDocked={this.props.drawerDocked}
        drawerDrag={this.props.drawerDrag}
        drawerFooter={null}
        drawerHover={this.props.drawerHover}
        drawerIndex={this.props.drawerIndex}
        drawerOpen={this.props.drawerOpen}
        drawers={drawerOrder}
        footer={null}
        onDrawerOpenToggle={this.props.onDrawerOpenToggle}
        onDrawerSelect={this.props.onDrawerSelect}
        onTabSelect={this.props.onTabSelect}
        orientation={this.props.orientation}
        rootState={this._rootState}
        router={this._router}
        tabIndex={this.props.tabIndex}
        tabs={tabOrder}
        title={this.props.title}
      />
    );
  }
}
