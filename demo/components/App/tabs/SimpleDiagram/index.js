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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import debounce from 'lodash.debounce';
import React, { PureComponent } from 'react';
import { AutoSizer } from 'react-virtualized';
import { Graph, Node, NodeContent } from 'src';
import './Diagram.css';
var style = {
    height: 50
};
var nodes = {
    node1: {
        label: 'node 1',
        style: {
            left: 272.5,
            top: 233
        }
    },
    node2: {
        label: 'node 2',
        style: {
            left: 672.5,
            top: 233
        }
    },
    node3: {
        label: 'node 3',
        style: {
            left: 472.5,
            top: 333
        }
    }
};
var connections = [
    {
        id: 'connection1',
        source: 'node1',
        target: 'node2'
    },
];
var Diagram = /** @class */ (function (_super) {
    __extends(Diagram, _super);
    function Diagram() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            connections: connections,
            height: 500,
            maxScale: 2,
            minScale: 0.25,
            nodes: nodes,
            scale: 1,
            width: 500,
            xOffset: 0.0,
            yOffset: 0.0
        };
        _this.handleResize = debounce(function (_a) {
            var height = _a.height, width = _a.width;
            _this.setState({ height: height, width: width });
        }, 400, { trailing: true });
        _this.autoSizer = function () { return null; };
        _this.children = function (id) { return (<NodeContent id={id} label={_this.state.nodes[id].label} onRemoveNode={_this.handleClose} style={style}>
      {_this.state.nodes[id].label || id}
    </NodeContent>); };
        _this.handleClose = function (nodeId) {
            if (confirm("Remove node '" + nodeId + "'?")) {
                var _a = _this.state.nodes, _b = nodeId, omit = _a[_b], remaining = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                _this.setState({
                    connections: _this.state.connections.filter(function (connection) { return (connection.source !== nodeId && connection.target !== nodeId); }),
                    nodes: remaining
                });
            }
        };
        _this.handlePanEnd = function (xOffset, yOffset) {
            _this.setState({ xOffset: xOffset, yOffset: yOffset });
        };
        _this.handleZoom = function (scale) {
            _this.setState({ scale: scale });
        };
        _this.handleDrop = function (id, x, y) {
            var _a;
            _this.setState({ nodes: __assign({}, _this.state.nodes, (_a = {}, _a[id] = __assign({}, _this.state.nodes[id], { x: x, y: y }), _a)) });
        };
        _this.handleAddConnection = function (source, id, target) {
            _this.setState({ connections: _this.state.connections.concat([
                    { id: id, source: source, target: target }
                ]) });
        };
        _this.handleRemoveConnection = function (id) {
            if (confirm("Remove connection '" + id + "'?")) {
                _this.setState({ connections: _this.state.connections.filter(function (connection) { return (connection.id !== id); }) });
            }
        };
        return _this;
    }
    Diagram.prototype.render = function () {
        var _this = this;
        var children = Object.keys(this.state.nodes).map(function (id) {
            return (<Node id={id} key={id} onDrop={_this.handleDrop} style={_this.state.nodes[id].style} styleName='node'>
          {_this.children}
        </Node>);
        });
        return (<div styleName='canvas'>
        <AutoSizer onResize={this.handleResize}>
          {this.autoSizer}
        </AutoSizer>
        <Graph connections={this.state.connections} height={this.state.height} id={'simpleDiagram'} maxScale={this.state.maxScale} minScale={this.state.minScale} onAddConnection={this.handleAddConnection} onRemoveConnection={this.handleRemoveConnection} onPanEnd={this.handlePanEnd} onZoom={this.handleZoom} scale={this.state.scale} width={this.state.width} xOffset={this.state.xOffset} yOffset={this.state.yOffset}>
          {children}
        </Graph>
      </div>);
    };
    return Diagram;
}(PureComponent));
export default Diagram;
