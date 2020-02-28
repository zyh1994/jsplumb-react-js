import React, {
  PureComponent
} from 'react';
import {
  Orientation,
  Tab as ITab,
  Tabs as ITabs,
} from 'ui-router-react-digest';
import './Settings.css';

export interface ISettings {
  drawerDocked: boolean;
  drawerDrag: boolean;
  drawerHover: boolean;
  onDrawerDockedToggle: (toggle?: boolean) => any;
  onDrawerDragToggle: (toggle?: boolean) => any;
  onDrawerHoverToggle: (toggle?: boolean) => any;
  onOrientationToggle: (toggle?: Orientation) => any;
  onTabAdd: (tab: ITab) => any;
  onTabRemove: (index: number) => any;
  orientation: Orientation;
  tabs: ITabs;
}

export default class Settings extends PureComponent<ISettings> {
  public render() {
    return (
      <div styleName='settings'>
        <h4>Preferences</h4>
        <form>
          <label htmlFor='ui-docked'>
            <input
              checked={this.props.drawerDocked}
              id='ui-docked'
              max='1'
              min='0'
              name='docked'
              onChange={this._whenDrawerDockedToggle}
              step='1'
              type='checkbox'
            />
            Drawer Docked
          </label>
          <br />
          <label htmlFor='ui-drag'>
            <input
              checked={this.props.drawerDrag}
              id='ui-drag'
              max='1'
              min='0'
              name='drag'
              onChange={this._whenDrawerDragToggle}
              step='1'
              type='checkbox'
            />
            Drawer Drag
          </label>
          <br />
          <label htmlFor='ui-hover'>
            <input
              checked={this.props.drawerHover}
              id='ui-hover'
              max='1'
              min='0'
              name='hover'
              onChange={this._whenDrawerHoverToggle}
              step='1'
              type='checkbox'
            />
            Drawer Hover
          </label>
          <br />
          <label htmlFor='ui-orientation'>
            <input
              id='ui-orientation'
              max='1'
              min='0'
              name='orientation'
              onChange={this._whenOrientationToggle}
              step='1'
              type='range'
              value={'left' === this.props.orientation ? 0 : 1}
            />
            Orientation
          </label>
        </form>
      </div>
    );
  }

  private _whenDrawerDockedToggle = () => {
    this.props.onDrawerDockedToggle();
  }

  private _whenDrawerDragToggle = () => {
    this.props.onDrawerDragToggle();
  }

  private _whenDrawerHoverToggle = () => {
    this.props.onDrawerHoverToggle();
  }

  private _whenOrientationToggle = () => {
    this.props.onOrientationToggle();
  }
}
