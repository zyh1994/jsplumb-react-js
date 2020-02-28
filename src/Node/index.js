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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { generateNodeId } from '../util';
import './index.css';
var defaultDragSettings = {};
var defaultSourceSettings = {};
var defaultTargetSettings = {};
var Node = /** @class */ (function (_super) {
    __extends(Node, _super);
    function Node() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            drag: true
        };
        _this.connectionFilter = ':not(.jsplumb-react-node)';
        _this.dragFilter = ':not(.jsplumb-react-node)';
        _this.style = {};
        _this.drop = false;
        _this.ref = function (node) { return (_this.node = node); };
        _this.handlePrevent = function (event) {
            if (
            // @ts-ignore
            !(event.ctrlKey ||
                (event.touches && event.targetTouches.length > 1)) &&
                (!_this.drop &&
                    _this.style.left === _this.props.style.left &&
                    _this.style.top === _this.props.style.top)) {
                _this.setState({ drag: false });
                clearTimeout(_this.timeout);
                _this.timeout = setTimeout(function () {
                    return _this.node && _this.setState({ drag: true });
                }, 500);
            }
        };
        _this.handlePointerDown = function (event) {
            _this.style = _this.props.style;
            _this.handleSelect(event.ctrlKey ||
                (event.touches && event.targetTouches.length > 1));
        };
        _this.handleSelect = function (multiSelect) {
            var _a = _this.props, jsPlumb = _a.jsPlumb, onSelect = _a.onSelect;
            if (!multiSelect) {
                // @ts-ignore
                jsPlumb.clearDragSelection();
            }
            // @ts-ignore
            jsPlumb.addToDragSelection(_this.node);
            if (onSelect) {
                // @ts-ignore
                var selections = jsPlumb._katavorio_main
                    .getSelection()
                    .map(function (node) { return (node.params.id); });
                onSelect(selections);
            }
        };
        _this.handleDeselect = function () {
            var _a = _this.props, id = _a.id, jsPlumb = _a.jsPlumb, onSelect = _a.onSelect;
            // @ts-ignore
            jsPlumb.removeFromDragSelection(_this.node);
            if (onSelect) {
                // @ts-ignore
                var selections = jsPlumb._katavorio_main
                    .getSelection()
                    .map(function (node) { return (node.params.id); })
                    .filter(function (nodeId) {
                    return (nodeId !== id);
                });
                onSelect(selections);
            }
        };
        _this.addSourceEndPoints = function () {
            var _a = _this.props, sourceSettings = _a.sourceSettings, id = _a.id, jsPlumb = _a.jsPlumb;
            var parameter = __assign({ filter: _this.connectionFilter }, sourceSettings, { parameters: __assign({}, sourceSettings.parameters, { source: id }) });
            console.log(parameter);
            jsPlumb.makeSource(_this.node, parameter);
        };
        _this.addTargetEndPoints = function () {
            var _a = _this.props, allowLoopback = _a.allowLoopback, id = _a.id, jsPlumb = _a.jsPlumb, targetSettings = _a.targetSettings;
            var parameter = __assign({ allowLoopback: allowLoopback }, targetSettings, { dropOptions: __assign({ hoverClass: 'dragHover' }, targetSettings.dropOptions), parameters: __assign({}, targetSettings.parameters, { target: id }) });
            console.log(parameter);
            jsPlumb.makeTarget(_this.node, parameter);
        };
        _this.makeNodeDraggable = function () {
            var _a = _this.props, dragSettings = _a.dragSettings, id = _a.id, jsPlumb = _a.jsPlumb;
            jsPlumb.draggable(_this.node, __assign({ filter: _this.dragFilter }, dragSettings, { drag: _this.handleDrag, 
                // Hacky, but only way found to pass id to `.getSelection()`
                // @ts-ignore
                id: id, stop: _this.handleDrop }));
        };
        _this.handleDrag = function (params) {
            _this.drop = true;
            if (_this.props.style.left !== params.pos[0] ||
                _this.props.style.top !== params.pos[1]) {
                if (_this.props.onDrag) {
                    _this.props.onDrag(_this.props.id, params.pos[0], params.pos[1]);
                }
            }
        };
        _this.handleDrop = function (params) {
            _this.drop = false;
            if (_this.props.style.left !== params.pos[0] ||
                _this.props.style.top !== params.pos[1]) {
                if (_this.props.onDrop) {
                    _this.props.onDrop(_this.props.id, params.pos[0], params.pos[1]);
                }
            }
        };
        return _this;
    }
    Node.prototype.componentDidMount = function () {
        var type = this.props.type;
        if (type === 'both' || type === 'source') {
            this.addSourceEndPoints();
        }
        if (type === 'both' || type === 'target') {
            this.addTargetEndPoints();
        }
        this.makeNodeDraggable();
        this.style = this.props.style;
    };
    Node.prototype.componentWillUnmount = function () {
        clearTimeout(this.timeout);
        this.handleDeselect();
        this.props.jsPlumb.removeAllEndpoints(this.node);
        this.node = undefined;
    };
    Node.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, diagramId = _a.diagramId, id = _a.id, style = _a.style, styleName = _a.styleName;
        var drag = this.state.drag;
        return (<div className={className} id={generateNodeId(diagramId, id)} onPointerUp={this.handlePrevent} onPointerDown={this.handlePointerDown} ref={this.ref} style={style} styleName={styleName}>
        <div styleName={"node-anchor-" + (drag ? 'disabled' : 'enabled')}>
          {children(id, drag)}
        </div>
      </div>);
    };
    Node.propTypes = {
        allowLoopback: PropTypes.bool,
        children: PropTypes.func,
        className: PropTypes.string,
        diagramId: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        jsPlumb: PropTypes.object,
        onDrag: PropTypes.func,
        onDrop: PropTypes.func,
        onSelect: PropTypes.func,
        style: PropTypes.object,
        styleName: PropTypes.string,
        targetSettings: PropTypes.object,
        type: PropTypes.oneOf([
            'both',
            'source',
            'target'
        ])
    };
    Node.defaultProps = {
        allowLoopback: false,
        children: function () { return (<div />); },
        className: 'jsplumb-react-node',
        diagramId: '',
        dragSettings: defaultDragSettings,
        id: undefined,
        sourceSettings: defaultSourceSettings,
        style: {
            left: 0,
            top: 0
        },
        styleName: 'node',
        targetSettings: defaultTargetSettings,
        type: 'both'
    };
    return Node;
}(PureComponent));
export default Node;
