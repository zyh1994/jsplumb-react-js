import {
  GraphProps,
  GraphState
} from 'index';
import {jsPlumb} from 'jsplumb';
import PropTypes from 'prop-types';
import React, {
  CSSProperties,
  PureComponent,
  SyntheticEvent
} from 'react';
import panAndZoomHoc from 'react-pan-and-zoom-hoc';
import Close from 'src/Close';
import Nodes from 'src/Nodes';
import Portals from 'src/Portals';
import {
  generateGraphId,
  generateNodeId
} from '../util';
import './index.css';

const PanAndZoom = panAndZoomHoc('div');

export default class Graph extends PureComponent<GraphProps, GraphState> {
  public static propTypes = {
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

  public static defaultProps: GraphProps = {
    bridge: (connId, source, target, onRemoveConnection) => (
      <Close
        id={connId}
        onClose={onRemoveConnection}
        source={source}
        target={target}
      />
    ),
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

  public state = {
    xOffset: 0.0,
    yOffset: 0.0
  };

  private jsPlumb: jsPlumbInstance;
  private nodes: {[key: string]: boolean} = {};
  private timeout: NodeJS.Timer;

  public constructor (props: GraphProps) {
    super(props);

    this.jsPlumb = jsPlumb.getInstance({
      // ...settings,
      ...props.settings,
      // @ts-ignore
      container: generateGraphId(props.id)
    });
  }

  public componentDidMount() {
    this.jsPlumb.ready(() => {
      // @ts-ignore
      this.jsPlumb.endpointAnchorClass = 'rja_';
      this.jsPlumb.bind('connection', this.handleNewConnection);
      // @ts-ignore
      this.jsPlumb.bind('connectionDetached', this.handleDetachedConnection);

      this.jsPlumb.setSuspendDrawing(true);

      // Try and make first paint less spastic
      this.timeout = setTimeout(
        () => {
          this.renderConnections();
          this.jsPlumb.setSuspendDrawing(false, true);
        },
        200
      );
      this.jsPlumb.repaintEverything();
    });
  }

  public componentDidUpdate({
    connections: prevConnections,
    scale: prevScale
  }: GraphProps) {
    if (prevScale !== this.props.scale) {
      this.jsPlumb.setZoom(this.props.scale);
    }

    const {
      connections,
      id
    } = this.props;

    if (connections.length < prevConnections.length) {
      const currentConnections = new Set(connections.map(connection => connection.id));
      const removedConnections = prevConnections.filter(connection => (
        !currentConnections.has(connection.id)
      ));

      removedConnections.forEach(({source, target}) => {
        const removedConnectionSet = new Set(removedConnections.map(connection => connection.id));
        // @ts-ignore
        const remainingConnection = this.jsPlumb.getConnections({
          source: generateNodeId(id, source),
          target: generateNodeId(id, target)
        }).find((connection: Connection) => (
          removedConnectionSet.has(connection.getParameter('id'))
        ));

        if (remainingConnection) {
          this.jsPlumb.unbind('connectionDetached', this.handleDetachedConnection);
          this.jsPlumb.deleteConnection(remainingConnection);
          // @ts-ignore
          this.jsPlumb.bind('connectionDetached', this.handleDetachedConnection);
        }
      });
    } else if (
      connections.length >
      prevConnections.length
    ) {
      const previousConnections = new Set(prevConnections.map(connection => connection.id));
      const newConnections = connections.filter(connection => (
        !previousConnections.has(connection.id)
      ));

      newConnections.forEach(({id: newId, source, target}) => {
        const newConnectionsSet = new Set(newConnections.map(connection => connection.id));
         // @ts-ignore
        const connectionExists = this.jsPlumb.getConnections({
          source: generateNodeId(id, source),
          target: generateNodeId(id, target)
        }).some((connection: Connection) => (
          newConnectionsSet.has(connection.getParameter('id'))
        ));

        if (!connectionExists) {
          this.jsPlumb.unbind('connection', this.handleNewConnection);
          this.renderConnection(newId, source, target);
          this.jsPlumb.bind('connection', this.handleNewConnection);
        }
      });
    }
    this.jsPlumb.repaintEverything();
  }

  public componentWillUnmount() {
    clearTimeout(this.timeout);
    this.jsPlumb.unbind('connection', this.handleNewConnection);
    this.jsPlumb.unbind('connectionDetached', this.handleDetachedConnection);
  }

  public render () {
    const {height, id, scale, style, width} = this.props;
    const {xOffset, yOffset} = this.state;

    const panStyle = {
      MozTransform: `scale(${scale})`,
      left: `${Number(
        style.width ?
          style.width.toString().replace('px', '') :
          width
      ) * xOffset * scale}px`,
      top: `${Number(
        style.height ?
          style.height.toString().replace('px', '') :
          height
      ) * yOffset * scale}px`,
      transform: `scale(${scale})`
    };

    const styles: CSSProperties = {
      height,
      width,
      ...style
    };

    const portals = this.props.bridge ? (
        <Portals
          connections={this.props.connections}
          id={id}
          onRemoveConnection={this.props.onRemoveConnection}
        >
          {this.props.bridge}
        </Portals>
      ) :
      null;

    return (
      <>
        <PanAndZoom
          className={this.props.className}
          id={generateGraphId(id)}
          styleName={`${this.props.styleName} container`}
          style={styles}
          maxScale={this.props.maxScale}
          minScale={this.props.minScale}
          onPanAndZoom={this.handlePanAndZoom}
          onPanEnd={this.handlePanEnd}
          onPanMove={this.handlePanMove}
          onPanStart={this.props.onPanStart}
          passOnProps={this.props.passOnProps}
          renderOnChange={this.props.renderOnChange}
          scale={scale}
          scaleFactor={this.props.scaleFactor}
          x={xOffset}
          y={yOffset}
        >
          <div
            onMouseDown={this.handleMouseDown}
            style={panStyle}
            styleName='panAndZoom'
          >
            <Nodes
              id={id}
              jsPlumb={this.jsPlumb}
              onRender={this.readyNode}
              onSelect={this.props.onSelect}
            >
              {this.props.children}
            </Nodes>
          </div>
        </PanAndZoom>
        {portals}
      </>
    );
  }

  private readyNode = (id: string) => {
    this.nodes[id] = true;
  }

  private handlePanAndZoom = (
    xOffset: number,
    yOffset: number,
    newScale: number
  ) => {
    const {onPanEnd, onZoom, onPanAndZoom, scale} = this.props;

    this.setState(({
      xOffset: prevXoffset,
      yOffset: prevYOffset
    }) => {

      const zoomXOffset = prevXoffset + (prevXoffset - xOffset);
      const zoomYOffset = prevYOffset + (prevYOffset - yOffset);

      if (scale !== newScale && onPanEnd) {
        onPanEnd(zoomXOffset, zoomYOffset);
      }
      if (onZoom) { onZoom(newScale); }
      if (onPanAndZoom) { onPanAndZoom(xOffset, yOffset, newScale); }

      if (
        prevXoffset !== zoomXOffset ||
        prevYOffset !== zoomYOffset
      ) {
        return {xOffset: zoomXOffset, yOffset: zoomYOffset};
      }
      return {xOffset: zoomXOffset, yOffset: zoomYOffset};
    });
  }

  private handlePanEnd = (
    xOffset: number,
    yOffset: number,
    event: MouseEvent | TouchEvent
  ) => {
    const newXOffset = this.props.xOffset + (this.props.xOffset - xOffset);
    const newYOffset = this.props.yOffset + (this.props.yOffset - yOffset);

    if (
      this.props.xOffset !== newXOffset ||
      this.props.yOffset !== newYOffset
    ) {
      if (this.props.onPanEnd) {
        this.props.onPanEnd(newXOffset, newYOffset, event);
      }
    }
  }

  private handlePanMove = (
    xOffset: number,
    yOffset: number
  ) => {
    this.setState(({
      xOffset: prevXoffset,
      yOffset: prevYOffset
    }) => {
      const newXOffset = prevXoffset + (this.state.xOffset - xOffset);
      const newYOffset = prevYOffset + (this.state.yOffset - yOffset);

      if (
        this.state.xOffset !== newXOffset ||
        this.state.yOffset !== newYOffset
      ) {
        return {xOffset: newXOffset, yOffset: newYOffset};
      }
      return {xOffset: newXOffset, yOffset: newYOffset};
    });
  }

  private renderConnections = () => {
    this.props.connections.forEach(({id, source, target}) => {
      this.renderConnection(id, source, target);
    });
  }

  private handleMouseDown = (event: SyntheticEvent<HTMLDivElement>) => {
    // @ts-ignore
    if (!event.ctrlKey) {
      // @ts-ignore
      this.jsPlumb.clearDragSelection();

      if (this.props.onSelect) {
        this.props.onSelect([]);
      }
    }
  }

  private renderConnection = (
    connectionId: string,
    sourceId: string,
    targetId: string
  ) => {
    if (!(this.nodes[sourceId] && this.nodes[targetId])) { return; }

    const {id} = this.props;
    const sourceHtmlId = generateNodeId(id, sourceId);
    const targetHtmlId = generateNodeId(id, targetId);

    const state: ConnectParams = {
      parameters: {
        id: connectionId.toString(),
        source: sourceId,
        target: targetId
      },
      source: sourceHtmlId,
      target: targetHtmlId
    } as any;

    this.jsPlumb.connect(state);
  }

  private handleNewConnection = (
    {connection}: ConnectionMadeEventInfo,
    originalEvent: any
  ) => {
    if (!originalEvent) { return; }

    this.handleAddConnection(
      connection.getParameter('id'),
      connection.getParameter('source'),
      connection.getParameter('target')
    )();
  }

  private handleAddConnection = (
    connectionId: string,
    source: string,
    target: string
  ) => () => {
    if (this.props.onAddConnection) {
      this.props.onAddConnection(
        connectionId,
        source,
        target
      );
    }
  }

  private handleDetachedConnection = (
    {connection}: ConnectionMadeEventInfo,
    originalEvent: any
  ) => {
    if (!originalEvent) { return; }

    this.handleRemoveConnection(
      connection.getParameter('id'),
      connection.getParameter('source'),
      connection.getParameter('target')
    )();
  }

  private handleRemoveConnection = (
    connectionId: string,
    source: string,
    target: string
  ) => () => {
    if (this.props.onRemoveConnection) {
      this.props.onRemoveConnection(
        connectionId,
        source,
        target
      );
    }
  }
}
