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
import { Component } from 'react';
import { createPortal } from 'react-dom';
var Bridge = /** @class */ (function (_super) {
    __extends(Bridge, _super);
    function Bridge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bridge.prototype.shouldComponentUpdate = function (nextProps) {
        if (this.props.id === nextProps.id) {
            return false;
        }
        return true;
    };
    Bridge.prototype.componentWillUnmount = function () {
        clearTimeout(this.timeout);
    };
    Bridge.prototype.render = function () {
        var _this = this;
        if (!this.overlay) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function () { return (_this.forceUpdate()); }, 100);
        }
        var _a = this.props, children = _a.children, id = _a.id;
        this.overlay = this.overlay || document.getElementById(id);
        return (this.overlay ? createPortal(children, this.overlay) : null);
    };
    Bridge.propTypes = {
        id: PropTypes.string.isRequired
    };
    Bridge.defaultProps = {
        id: undefined
    };
    return Bridge;
}(Component));
export default Bridge;
