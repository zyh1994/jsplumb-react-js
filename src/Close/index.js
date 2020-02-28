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
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import './index.css';
var Close = /** @class */ (function (_super) {
    __extends(Close, _super);
    function Close() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClose = function (event) {
            event.preventDefault();
            if (_this.props.onClose) {
                _this.props.onClose(_this.props.id, _this.props.source, _this.props.target);
            }
        };
        return _this;
    }
    Close.prototype.render = function () {
        var id = this.props.id;
        this.overlay = this.overlay || document.getElementById(id);
        return (<div styleName='close-conn' onClick={this.handleClose} title={id || 'UNKNOWN'}>
        &#10005;
      </div>);
    };
    Close.propTypes = {
        id: PropTypes.string,
        onClose: PropTypes.func,
        source: PropTypes.string,
        target: PropTypes.string
    };
    Close.defaultProps = {
        id: undefined,
        source: undefined,
        target: undefined
    };
    return Close;
}(PureComponent));
export default Close;
