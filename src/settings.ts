import uuidv4 from 'uuid/v4';
import {generateConnectionId} from './util';

const EndpointStyleSource = {
  fill: 'black',
  lineWidth: 4,
  radius: 2,
  stroke: 'black',
  strokeWidth: 2
};

const EndpointStyleTarget = {
  lineWidth: 4,
  radius: 2,
  stroke: 'black',
  strokeWidth: 2
};

const EndpointHoverStyleSource = {
  ...EndpointStyleSource,
  fill: 'red',
  radius: 4,
  stroke: 'red',
  strokeWidth: 4
};

const EndpointHoverStyleTarget = {
  ...EndpointStyleTarget,
  fill: 'white',
  radius: 10,
  stroke: 'red',
  'z-index': 1
};

const PaintStyle = {
  // lineWidth: 3,
  // radius: 5,
  // stroke: 'black',
  // strokeWidth: 1
};

const HoverPaintStyle = {
  // stroke: 'red',
  // strokeWidth: 2
};

const renderOverlay = (component: any) => {
  component._jsPlumb.parameters.id = component._jsPlumb.parameters.id || uuidv4();
  const el = document.createElement('div');
  el.setAttribute(
    'id',
    generateConnectionId(
      component.source.parentElement.parentElement.id,
      component._jsPlumb.parameters.id || uuidv4()
    )
  );
  el.onclick=(event)=>{console.log(el)};
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
    // ['Custom', {create: renderOverlay}]
  ],
  ConnectionsDetachable: false,
  Connector: 'StateMachine',
  Endpoint: ['Dot', {radius: 5}],
  EndpointHoverStyle: EndpointHoverStyleSource,
  EndpointHoverStyles: [EndpointHoverStyleSource, EndpointHoverStyleTarget],
  EndpointStyle: EndpointStyleSource,
  EndpointStyles: [EndpointStyleSource, EndpointStyleTarget],
  Endpoints: [
    ['Dot', {radius: 5}],
    ['Dot', {radius: 5}]
  ],
  HoverPaintStyle,
  PaintStyle
};
