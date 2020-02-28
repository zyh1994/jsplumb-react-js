import {Connections} from 'index';
import debounce from 'lodash.debounce';
import React, {
  PureComponent
} from 'react';
import {AutoSizer} from 'react-virtualized';
import {
  Graph,
  Node,
  NodeContent
} from 'src';
import './Diagram.css';
import config from'src/setting'

export interface IDiagramProps {
  connections: Connections;
  diagramId: string;
  maxScale?: number;
  minScale?: number;
  nodes: IDiagramNodes;
  onAddConnection: (
    sourceId: string,
    bridgeId: string,
    connection: IConnection
  ) => any;
  onRemoveConnection: (sourceId: string, connectionId: string) => any;
  onRemoveNode: (diagramId: string, nodeId: string) => any;
  onSelectionUpdate: (selections: string[]) => any;
  onSetDiagramScale: (diagramId: string, scale: number) => any;
  onSetDiagramXYOffset: (
    diagramId: string,
    xOffset: number,
    yOffset: number
  ) => any;
  onUpdateNode: (nodeId: string, node: IDiagramNode) => any;
  scale: number;
  selections: string[];
  xOffset: number;
  yOffset: number;
}

interface IDiagramState {
  height: number;
  width: number;
}

export default class Diagram extends PureComponent<IDiagramProps, IDiagramState> {
  public static defaultProps = {
    connections: [] as Connections,
    maxScale: 2,
    minScale: 0.25,
    scale: 1,
    xOffset: 0.0,
    yOffset: 0.0
  };

  public state = {
    height: 500,
    width: 500
  };

  private style = {
    height: 50
  };

  private handleResize = debounce(
    ({height, width}: {height: number, width: number}) => {
      this.setState({height, width});
    },
    100,
    {trailing: true}
  );

  public render () {
    const children = Object.keys(this.props.nodes).map((id) => {
      const {style} = this.props.nodes[id];

      return (
        <Node
          id={id}
          key={id}
          onDrop={this.handleDrop}
          style={style}
          styleName='node'
        >
          {this.children}
        </Node>
      );
    });

    return (
      <div styleName='canvas'>
        <AutoSizer onResize={this.handleResize}>
          {this.autoSizer}
        </AutoSizer>
        <Graph
          // bridge={null}
          connections={this.props.connections}
          height={this.state.height}
          id={this.props.diagramId}
          maxScale={this.props.maxScale}
          minScale={this.props.minScale}
          onAddConnection={this.handleAddConnection}
          onRemoveConnection={this.handleRemoveConnection}
          onPanEnd={this.handlePanEnd}
          onSelect={this.handleSelect}
          onZoom={this.handleZoom}
          scale={this.props.scale}
          width={this.state.width}
          xOffset={this.props.xOffset}
          yOffset={this.props.yOffset}
          settings={config}
        >
          {children}
        </Graph>
      </div>
    );
  }

  private autoSizer = () => null as any;

  private children = (id: string) => (
    <NodeContent
      id={id}
      label={this.props.nodes[id].label}
      onRemoveNode={this.handleClose}
      selected={this.props.selections.includes(id)}
      style={this.style}
    >
      {this.props.nodes[id].label || id}
    </NodeContent>
  )

  private handleClose = (
    nodeId: string
  ) => {
    if (confirm(`Remove node '${nodeId}'?`)) {
      this.props.onRemoveNode(this.props.diagramId, nodeId);
    }
  }

  private handlePanEnd = (
    xOffset: number,
    yOffset: number
  ) => {
    this.props.onSetDiagramXYOffset(this.props.diagramId, xOffset, yOffset);
  }

  private handleZoom = (scale: number) => {
    this.props.onSetDiagramScale(this.props.diagramId, scale);
  }

  private handleDrop = (
    id: string,
    x: number,
    y: number
  ) => {
    this.props.onUpdateNode(id, {style: {left: x, top: y}});
  }

  private handleAddConnection = (
    connectionId: string,
    sourceId: string,
    targetId: string
  ) => {
    this.props.onAddConnection(sourceId, connectionId, {target: targetId});
  }

  private handleRemoveConnection = (
    connectionId: string,
    sourceId: string
  ) => {
    if (confirm(`Remove connection '${connectionId}'?`)) {
      this.props.onRemoveConnection(sourceId, connectionId);
    }
  }

  private handleSelect = (
    selected: string[]
  ) => {
    this.props.onSelectionUpdate(selected);
  }
}
