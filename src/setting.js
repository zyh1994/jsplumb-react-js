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
import uuidv4 from 'uuid/v4';
import { generateConnectionId } from './util';
var EndpointStyleSource = {
    fill: 'black',
    lineWidth: 4,
    radius: 2,
    stroke: 'black',
    strokeWidth: 2
};
var EndpointStyleTarget = {
    lineWidth: 4,
    radius: 2,
    stroke: 'black',
    strokeWidth: 2
};
var EndpointHoverStyleSource = __assign({}, EndpointStyleSource, { fill: 'red', radius: 4, stroke: 'red', strokeWidth: 4 });
var EndpointHoverStyleTarget = __assign({}, EndpointStyleTarget, { fill: 'white', radius: 10, stroke: 'red', 'z-index': 1 });
var PaintStyle = {
    radius: 5,
    strokeWidth: 1,
    strokeStyle: '#1e8151',
    stroke: '#7AB02C',
    fillStyle: '#1e8151',
    lineWidth: 3
};
var HoverPaintStyle = {
    stroke: 'red',
    strokeWidth: 2
};
var renderOverlay = function (component) {
    component._jsPlumb.parameters.id = component._jsPlumb.parameters.id || uuidv4();
    var el = document.createElement('div');
    el.setAttribute('id', generateConnectionId(component.source.parentElement.parentElement.id, component._jsPlumb.parameters.id || uuidv4()));
    return el;
};
export default {
    Anchor: ['Continuous', {}],
    Anchors: [['Continuous', {}], ['Continuous', {}]],
    ConnectionOverlays: [
        ['Arrow', {
                length: 10,
                width: 10,
                location: 1
            }],
        ['Custom', { create: renderOverlay }],
    ],
    ConnectionsDetachable: false,
    Connector: 'StateMachine',
    Endpoint: ['Dot', { radius: 5 }],
    EndpointHoverStyle: EndpointHoverStyleSource,
    EndpointHoverStyles: [EndpointHoverStyleSource, EndpointHoverStyleTarget],
    EndpointStyle: EndpointStyleSource,
    EndpointStyles: [EndpointStyleSource, EndpointStyleTarget],
    Endpoints: [
        ['Dot', { radius: 5 }],
        ['Dot', { radius: 5 }]
    ],
    HoverPaintStyle: HoverPaintStyle,
    PaintStyle: PaintStyle
};
