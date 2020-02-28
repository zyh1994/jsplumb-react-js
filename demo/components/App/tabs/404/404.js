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
import './404.css';
var E404 = /** @class */ (function (_super) {
    __extends(E404, _super);
    function E404() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    E404.prototype.render = function () {
        return (<div styleName='E404'>
        <h4>404</h4>
      </div>);
    };
    return E404;
}(PureComponent));
export default E404;
