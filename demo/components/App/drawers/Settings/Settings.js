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
import React, { PureComponent } from 'react';
import './Settings.css';
var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    function Settings() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._whenDrawerDockedToggle = function () {
            _this.props.onDrawerDockedToggle();
        };
        _this._whenDrawerDragToggle = function () {
            _this.props.onDrawerDragToggle();
        };
        _this._whenDrawerHoverToggle = function () {
            _this.props.onDrawerHoverToggle();
        };
        _this._whenOrientationToggle = function () {
            _this.props.onOrientationToggle();
        };
        return _this;
    }
    Settings.prototype.render = function () {
        return (<div styleName='settings'>
        <h4>Preferences</h4>
        <form>
          <label htmlFor='ui-docked'>
            <input checked={this.props.drawerDocked} id='ui-docked' max='1' min='0' name='docked' onChange={this._whenDrawerDockedToggle} step='1' type='checkbox'/>
            Drawer Docked
          </label>
          <br />
          <label htmlFor='ui-drag'>
            <input checked={this.props.drawerDrag} id='ui-drag' max='1' min='0' name='drag' onChange={this._whenDrawerDragToggle} step='1' type='checkbox'/>
            Drawer Drag
          </label>
          <br />
          <label htmlFor='ui-hover'>
            <input checked={this.props.drawerHover} id='ui-hover' max='1' min='0' name='hover' onChange={this._whenDrawerHoverToggle} step='1' type='checkbox'/>
            Drawer Hover
          </label>
          <br />
          <label htmlFor='ui-orientation'>
            <input id='ui-orientation' max='1' min='0' name='orientation' onChange={this._whenOrientationToggle} step='1' type='range' value={'left' === this.props.orientation ? 0 : 1}/>
            Orientation
          </label>
        </form>
      </div>);
    };
    return Settings;
}(PureComponent));
export default Settings;
