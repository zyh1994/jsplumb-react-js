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
import Bridge from 'src/Bridge';
import { generateConnectionId } from '../util';
var Portals = /** @class */ (function (_super) {
    __extends(Portals, _super);
    function Portals() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Portals.prototype.render = function () {
        var _this = this;
        return this.props.connections.map(function (_a) {
            var connId = _a.id, source = _a.source, target = _a.target;
            var htmlId = generateConnectionId(_this.props.id, connId);
            return (<Bridge id={htmlId} key={connId}>
          {_this.props.children(connId, source, target, _this.props.onRemoveConnection)}
        </Bridge>);
        });
    };
    Portals.propTypes = {
        children: PropTypes.func.isRequired,
        connections: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            source: PropTypes.string.isRequired,
            target: PropTypes.string.isRequired
        })).isRequired,
        id: PropTypes.string.isRequired,
        onRemoveConnection: PropTypes.func.isRequired
    };
    Portals.defaultProps = {
        children: undefined,
        connections: [],
        id: undefined,
        onRemoveConnection: undefined
    };
    return Portals;
}(PureComponent));
export default Portals;
