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
import { jsPlumb } from 'jsplumb';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import panAndZoomHoc from 'react-pan-and-zoom-hoc';
import Close from 'src/Close';
import Nodes from 'src/Nodes';
import Portals from 'src/Portals';
import { generateGraphId, generateNodeId } from '../util';
import './index.css';
var PanAndZoom = panAndZoomHoc('div');
var Graph = /** @class */ (function (_super) {
    __extends(Graph, _super);
    function Graph(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            xOffset: 0.0,
            yOffset: 0.0
        };
        _this.nodes = {};
        _this.readyNode = function (id) {
            _this.nodes[id] = true;
        };
        _this.handlePanAndZoom = function (xOffset, yOffset, newScale) {
            var _a = _this.props, onPanEnd = _a.onPanEnd, onZoom = _a.onZoom, onPanAndZoom = _a.onPanAndZoom, scale = _a.scale;
            _this.setState(function (_a) {
                var prevXoffset = _a.xOffset, prevYOffset = _a.yOffset;
                var zoomXOffset = prevXoffset + (prevXoffset - xOffset);
                var zoomYOffset = prevYOffset + (prevYOffset - yOffset);
                if (scale !== newScale && onPanEnd) {
                    onPanEnd(zoomXOffset, zoomYOffset);
                }
                if (onZoom) {
                    onZoom(newScale);
                }
                if (onPanAndZoom) {
                    onPanAndZoom(xOffset, yOffset, newScale);
                }
                if (prevXoffset !== zoomXOffset ||
                    prevYOffset !== zoomYOffset) {
                    return { xOffset: zoomXOffset, yOffset: zoomYOffset };
                }
                return { xOffset: zoomXOffset, yOffset: zoomYOffset };
            });
        };
        _this.handlePanEnd = function (xOffset, yOffset, event) {
            var newXOffset = _this.props.xOffset + (_this.props.xOffset - xOffset);
            var newYOffset = _this.props.yOffset + (_this.props.yOffset - yOffset);
            if (_this.props.xOffset !== newXOffset ||
                _this.props.yOffset !== newYOffset) {
                if (_this.props.onPanEnd) {
                    _this.props.onPanEnd(newXOffset, newYOffset, event);
                }
            }
        };
        _this.handlePanMove = function (xOffset, yOffset) {
            _this.setState(function (_a) {
                var prevXoffset = _a.xOffset, prevYOffset = _a.yOffset;
                var newXOffset = prevXoffset + (_this.state.xOffset - xOffset);
                var newYOffset = prevYOffset + (_this.state.yOffset - yOffset);
                if (_this.state.xOffset !== newXOffset ||
                    _this.state.yOffset !== newYOffset) {
                    return { xOffset: newXOffset, yOffset: newYOffset };
                }
                return { xOffset: newXOffset, yOffset: newYOffset };
            });
        };
        _this.renderConnections = function () {
            _this.props.connections.forEach(function (_a) {
                var id = _a.id, source = _a.source, target = _a.target;
                _this.renderConnection(id, source, target);
            });
        };
        _this.handleMouseDown = function (event) {
            // @ts-ignore
            if (!event.ctrlKey) {
                // @ts-ignore
                _this.jsPlumb.clearDragSelection();
                if (_this.props.onSelect) {
                    _this.props.onSelect([]);
                }
            }
        };
        _this.renderConnection = function (connectionId, sourceId, targetId) {
            if (!(_this.nodes[sourceId] && _this.nodes[targetId])) {
                return;
            }
            var id = _this.props.id;
            var sourceHtmlId = generateNodeId(id, sourceId);
            var targetHtmlId = generateNodeId(id, targetId);
            var state = {
                parameters: {
                    id: connectionId.toString(),
                    source: sourceId,
                    target: targetId
                },
                source: sourceHtmlId,
                target: targetHtmlId
            };
            _this.jsPlumb.connect(state);
        };
        _this.handleNewConnection = function (_a, originalEvent) {
            var connection = _a.connection;
            if (!originalEvent) {
                return;
            }
            _this.handleAddConnection(connection.getParameter('id'), connection.getParameter('source'), connection.getParameter('target'))();
        };
        _this.handleAddConnection = function (connectionId, source, target) { return function () {
            if (_this.props.onAddConnection) {
                _this.props.onAddConnection(connectionId, source, target);
            }
        }; };
        _this.handleDetachedConnection = function (_a, originalEvent) {
            var connection = _a.connection;
            if (!originalEvent) {
                return;
            }
            _this.handleRemoveConnection(connection.getParameter('id'), connection.getParameter('source'), connection.getParameter('target'))();
        };
        _this.handleRemoveConnection = function (connectionId, source, target) { return function () {
            if (_this.props.onRemoveConnection) {
                _this.props.onRemoveConnection(connectionId, source, target);
            }
        }; };
        _this.jsPlumb = jsPlumb.getInstance(__assign({}, props.settings, { 
            // @ts-ignore
            container: generateGraphId(props.id) }));
        return _this;
    }
    Graph.prototype.componentDidMount = function () {
        var _this = this;
        this.jsPlumb.ready(function () {
            // @ts-ignore
            _this.jsPlumb.endpointAnchorClass = 'rja_';
            _this.jsPlumb.bind('connection', _this.handleNewConnection);
            // @ts-ignore
            _this.jsPlumb.bind('connectionDetached', _this.handleDetachedConnection);
            _this.jsPlumb.setSuspendDrawing(true);
            // Try and make first paint less spastic
            _this.timeout = setTimeout(function () {
                _this.renderConnections();
                _this.jsPlumb.setSuspendDrawing(false, true);
            }, 200);
            _this.jsPlumb.repaintEverything();
        });
    };
    Graph.prototype.componentDidUpdate = function (_a) {
        var _this = this;
        var prevConnections = _a.connections, prevScale = _a.scale;
        if (prevScale !== this.props.scale) {
            this.jsPlumb.setZoom(this.props.scale);
        }
        var _b = this.props, connections = _b.connections, id = _b.id;
        if (connections.length < prevConnections.length) {
            var currentConnections_1 = new Set(connections.map(function (connection) { return connection.id; }));
            var removedConnections_1 = prevConnections.filter(function (connection) { return (!currentConnections_1.has(connection.id)); });
            removedConnections_1.forEach(function (_a) {
                var source = _a.source, target = _a.target;
                var removedConnectionSet = new Set(removedConnections_1.map(function (connection) { return connection.id; }));
                // @ts-ignore
                var remainingConnection = _this.jsPlumb.getConnections({
                    source: generateNodeId(id, source),
                    target: generateNodeId(id, target)
                }).find(function (connection) { return (removedConnectionSet.has(connection.getParameter('id'))); });
                if (remainingConnection) {
                    _this.jsPlumb.unbind('connectionDetached', _this.handleDetachedConnection);
                    _this.jsPlumb.deleteConnection(remainingConnection);
                    // @ts-ignore
                    _this.jsPlumb.bind('connectionDetached', _this.handleDetachedConnection);
                }
            });
        }
        else if (connections.length >
            prevConnections.length) {
            var previousConnections_1 = new Set(prevConnections.map(function (connection) { return connection.id; }));
            var newConnections_1 = connections.filter(function (connection) { return (!previousConnections_1.has(connection.id)); });
            newConnections_1.forEach(function (_a) {
                var newId = _a.id, source = _a.source, target = _a.target;
                var newConnectionsSet = new Set(newConnections_1.map(function (connection) { return connection.id; }));
                // @ts-ignore
                var connectionExists = _this.jsPlumb.getConnections({
                    source: generateNodeId(id, source),
                    target: generateNodeId(id, target)
                }).some(function (connection) { return (newConnectionsSet.has(connection.getParameter('id'))); });
                if (!connectionExists) {
                    _this.jsPlumb.unbind('connection', _this.handleNewConnection);
                    _this.renderConnection(newId, source, target);
                    _this.jsPlumb.bind('connection', _this.handleNewConnection);
                }
            });
        }
        this.jsPlumb.repaintEverything();
    };
    Graph.prototype.componentWillUnmount = function () {
        clearTimeout(this.timeout);
        this.jsPlumb.unbind('connection', this.handleNewConnection);
        this.jsPlumb.unbind('connectionDetached', this.handleDetachedConnection);
    };
    Graph.prototype.render = function () {
        var _a = this.props, height = _a.height, id = _a.id, scale = _a.scale, style = _a.style, width = _a.width;
        var _b = this.state, xOffset = _b.xOffset, yOffset = _b.yOffset;
        var panStyle = {
            MozTransform: "scale(" + scale + ")",
            left: Number(style.width ?
                style.width.toString().replace('px', '') :
                width) * xOffset * scale + "px",
            top: Number(style.height ?
                style.height.toString().replace('px', '') :
                height) * yOffset * scale + "px",
            transform: "scale(" + scale + ")"
        };
        var styles = __assign({ height: height,
            width: width }, style);
        var portals = this.props.bridge ? (<Portals connections={this.props.connections} id={id} onRemoveConnection={this.props.onRemoveConnection}>
          {this.props.bridge}
        </Portals>) :
            null;
        return (<>
        <PanAndZoom className={this.props.className} id={generateGraphId(id)} styleName={this.props.styleName + " container"} style={styles} maxScale={this.props.maxScale} minScale={this.props.minScale} onPanAndZoom={this.handlePanAndZoom} onPanEnd={this.handlePanEnd} onPanMove={this.handlePanMove} onPanStart={this.props.onPanStart} passOnProps={this.props.passOnProps} renderOnChange={this.props.renderOnChange} scale={scale} scaleFactor={this.props.scaleFactor} x={xOffset} y={yOffset}>
          <div onMouseDown={this.handleMouseDown} style={panStyle} styleName='panAndZoom'>
            <Nodes id={id} jsPlumb={this.jsPlumb} onRender={this.readyNode} onSelect={this.props.onSelect}>
              {this.props.children}
            </Nodes>
          </div>
        </PanAndZoom>
        {portals}
      </>);
    };
    Graph.propTypes = {
        bridge: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.oneOf([false])
        ]),
        className: PropTypes.string,
        connections: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            source: PropTypes.string.isRequired,
            target: PropTypes.string.isRequired
        })),
        height: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        id: PropTypes.string.isRequired,
        maxScale: PropTypes.number,
        minScale: PropTypes.number,
        onAddConnection: PropTypes.func,
        onPanAndZoom: PropTypes.func,
        onPanEnd: PropTypes.func,
        onPanMove: PropTypes.func,
        onPanStart: PropTypes.func,
        onRemoveConnection: PropTypes.func,
        onSelect: PropTypes.func,
        onZoom: PropTypes.func,
        passOnProps: PropTypes.bool,
        renderOnChange: PropTypes.bool,
        scale: PropTypes.number,
        scaleFactor: PropTypes.number,
        settings: PropTypes.object,
        style: PropTypes.object,
        styleName: PropTypes.string,
        width: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        xOffset: PropTypes.number,
        yOffset: PropTypes.number
    };
    Graph.defaultProps = {
        bridge: function (connId, source, target, onRemoveConnection) { return (<Close id={connId} onClose={onRemoveConnection} source={source} target={target}/>); },
        className: '',
        connections: [],
        height: 500,
        id: undefined,
        maxScale: 2,
        minScale: 0.5,
        passOnProps: false,
        renderOnChange: false,
        scale: 1,
        scaleFactor: Math.sqrt(1.5),
        settings: {},
        style: {},
        styleName: '',
        width: 500,
        xOffset: 0.0,
        yOffset: 0.0
    };
    return Graph;
}(PureComponent));
export default Graph;
