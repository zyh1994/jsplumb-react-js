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
import debounce from 'lodash.debounce';
import React, { PureComponent } from 'react';
import { AutoSizer } from 'react-virtualized';
import { Graph, Node, NodeContent } from 'src';
import './Diagram.css';
import config from 'src/setting';
var Diagram = /** @class */ (function (_super) {
    __extends(Diagram, _super);
    function Diagram() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            height: 500,
            width: 500
        };
        _this.style = {
            height: 50
        };
        _this.handleResize = debounce(function (_a) {
            var height = _a.height, width = _a.width;
            _this.setState({ height: height, width: width });
        }, 100, { trailing: true });
        _this.autoSizer = function () { return null; };
        _this.children = function (id) { return (<NodeContent id={id} label={_this.props.nodes[id].label} onRemoveNode={_this.handleClose} selected={_this.props.selections.includes(id)} style={_this.style}>
      {_this.props.nodes[id].label || id}
    </NodeContent>); };
        _this.handleClose = function (nodeId) {
            if (confirm("Remove node '" + nodeId + "'?")) {
                _this.props.onRemoveNode(_this.props.diagramId, nodeId);
            }
        };
        _this.handlePanEnd = function (xOffset, yOffset) {
            _this.props.onSetDiagramXYOffset(_this.props.diagramId, xOffset, yOffset);
        };
        _this.handleZoom = function (scale) {
            _this.props.onSetDiagramScale(_this.props.diagramId, scale);
        };
        _this.handleDrop = function (id, x, y) {
            _this.props.onUpdateNode(id, { style: { left: x, top: y } });
        };
        _this.handleAddConnection = function (connectionId, sourceId, targetId) {
            _this.props.onAddConnection(sourceId, connectionId, { target: targetId });
        };
        _this.handleRemoveConnection = function (connectionId, sourceId) {
            if (confirm("Remove connection '" + connectionId + "'?")) {
                _this.props.onRemoveConnection(sourceId, connectionId);
            }
        };
        _this.handleSelect = function (selected) {
            _this.props.onSelectionUpdate(selected);
        };
        return _this;
    }
    Diagram.prototype.render = function () {
        var _this = this;
        var children = Object.keys(this.props.nodes).map(function (id) {
            var style = _this.props.nodes[id].style;
            return (<Node id={id} key={id} onDrop={_this.handleDrop} style={style} styleName='node'>
          {_this.children}
        </Node>);
        });
        return (<div styleName='canvas'>
        <AutoSizer onResize={this.handleResize}>
          {this.autoSizer}
        </AutoSizer>
        <Graph 
        // bridge={null}
        connections={this.props.connections} height={this.state.height} id={this.props.diagramId} maxScale={this.props.maxScale} minScale={this.props.minScale} onAddConnection={this.handleAddConnection} onRemoveConnection={this.handleRemoveConnection} onPanEnd={this.handlePanEnd} onSelect={this.handleSelect} onZoom={this.handleZoom} scale={this.props.scale} width={this.state.width} xOffset={this.props.xOffset} yOffset={this.props.yOffset} settings={config}>
          {children}
        </Graph>
      </div>);
    };
    Diagram.defaultProps = {
        connections: [],
        maxScale: 2,
        minScale: 0.25,
        scale: 1,
        xOffset: 0.0,
        yOffset: 0.0
    };
    return Diagram;
}(PureComponent));
export default Diagram;
