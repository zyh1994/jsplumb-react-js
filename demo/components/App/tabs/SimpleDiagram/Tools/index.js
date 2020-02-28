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
import './Tools.css';
var Tools = /** @class */ (function (_super) {
    __extends(Tools, _super);
    function Tools() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tools.prototype.render = function () {
        return (<div styleName='tools'>
        <h4>Simple Diagram Tools</h4>
      </div>);
    };
    return Tools;
}(PureComponent));
export default Tools;
