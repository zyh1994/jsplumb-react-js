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
import Close from 'src/Close';
import './index.css';
var NodeContent = /** @class */ (function (_super) {
    __extends(NodeContent, _super);
    function NodeContent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClose = function () {
            if (_this.props.onRemoveNode) {
                _this.props.onRemoveNode(_this.props.id);
            }
        };
        return _this;
    }
    NodeContent.prototype.render = function () {
        var _a = this.props, className = _a.className, children = _a.children, id = _a.id, selected = _a.selected, style = _a.style, styleName = _a.styleName;
        return (<div className={className} style={style} 
        // tslint:disable-next-line:max-line-length
        styleName={(styleName ? styleName : '') + " node-content " + (selected ? 'node-selected' : '')}>
        <Close id={id} onClose={this.handleClose}/>
        <div>
          {children}
        </div>
      </div>);
    };
    NodeContent.propTypes = {
        className: PropTypes.string,
        id: PropTypes.string,
        onRemoveNode: PropTypes.func.isRequired,
        selected: PropTypes.bool,
        style: PropTypes.object,
        styleName: PropTypes.string
    };
    return NodeContent;
}(PureComponent));
export default NodeContent;
