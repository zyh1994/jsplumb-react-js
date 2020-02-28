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
import { Children, cloneElement, PureComponent } from 'react';
var Nodes = /** @class */ (function (_super) {
    __extends(Nodes, _super);
    function Nodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Nodes.prototype.render = function () {
        var _this = this;
        return Children.map(this.props.children, function (child) {
            _this.props.onRender(child.props.id);
            var props = {
                diagramId: _this.props.id,
                jsPlumb: _this.props.jsPlumb,
                onSelect: child.props.onSelect || _this.props.onSelect
            };
            return (cloneElement(child, props));
        });
    };
    Nodes.propTypes = {
        id: PropTypes.string.isRequired,
        jsPlumb: PropTypes.object.isRequired,
        onRender: PropTypes.func.isRequired,
        onSelect: PropTypes.func
    };
    return Nodes;
}(PureComponent));
export default Nodes;
