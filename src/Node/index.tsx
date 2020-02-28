import {
  NodeProps,
  NodeState
} from 'index';
import PropTypes from 'prop-types';
import React, {
  CSSProperties,
  PureComponent
} from 'react';
import {generateNodeId} from '../util';
import './index.css';

const defaultDragSettings = {};
const defaultSourceSettings = {};
const defaultTargetSettings = {};

export default class Node extends PureComponent<NodeProps, NodeState> {
  public static propTypes = {
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

  public static defaultProps: NodeProps = {
    allowLoopback: false,
    children: () => (<div />),
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

  public state = {
    drag: true
  };

  private connectionFilter = ':not(.jsplumb-react-node)';
  private dragFilter = ':not(.jsplumb-react-node)';
  private timeout: NodeJS.Timer;
  private style: CSSProperties = {};
  private drop: boolean = false;
  private node: HTMLElement;

  public componentDidMount() {
    const {type} = this.props;
    if (type === 'both' || type === 'source') { this.addSourceEndPoints(); }
    if (type === 'both' || type === 'target') { this.addTargetEndPoints(); }

    this.makeNodeDraggable();

    this.style = this.props.style;
  }

  public componentWillUnmount() {
    clearTimeout(this.timeout);
    this.handleDeselect();
    this.props.jsPlumb.removeAllEndpoints(this.node);
    this.node = undefined;
  }

  public render() {
    const {children, className, diagramId, id, style, styleName} = this.props;
    const {drag} = this.state;

    return (
      <div
        className={className}
        id={generateNodeId(diagramId, id)}
        onPointerUp={this.handlePrevent}
        onPointerDown={this.handlePointerDown}
        ref={this.ref}
        style={style}
        styleName={styleName}
      >
        <div styleName={`node-anchor-${(drag ? 'disabled' : 'enabled')}`}>
          {children(id, drag)}
        </div>
      </div>
    );
  }

  private ref = (node: HTMLDivElement) => (this.node = node);

  private handlePrevent = (event: any) => {
    if (
      // @ts-ignore
      !(
        event.ctrlKey ||
        (event.touches && event.targetTouches.length > 1)
      ) &&
      (
        !this.drop &&
        this.style.left === this.props.style.left &&
        this.style.top === this.props.style.top
      )
    ) {
      this.setState({drag: false});
      clearTimeout(this.timeout);
      this.timeout = setTimeout(
        () => {
          return this.node && this.setState({drag: true});
        },
        500
      );
    }
  }

  private handlePointerDown = (event: any) => {
    this.style = this.props.style;
    this.handleSelect(
      event.ctrlKey ||
      (event.touches && event.targetTouches.length > 1)
    );
  }

  private handleSelect = (multiSelect?: boolean) => {
    const {jsPlumb, onSelect} = this.props;

    if (!multiSelect) {
      // @ts-ignore
      jsPlumb.clearDragSelection();
    }

    // @ts-ignore
    jsPlumb.addToDragSelection(this.node);

    if (onSelect) {
      // @ts-ignore
      const selections = jsPlumb._katavorio_main
        .getSelection()
        .map((node: any) => (
          node.params.id
        ));

      onSelect(selections);
    }
  }

  private handleDeselect = () => {
    const {id, jsPlumb, onSelect} = this.props;

    // @ts-ignore
    jsPlumb.removeFromDragSelection(this.node);

    if (onSelect) {
      // @ts-ignore
      const selections: string[] = jsPlumb._katavorio_main
        .getSelection()
        .map((node: any) => (
          node.params.id
        ))
        .filter((nodeId: string) => {
          return (nodeId !== id);
        });

      onSelect(selections);
    }
  }

  private addSourceEndPoints = () => {
    const {sourceSettings, id, jsPlumb} = this.props;
    const parameter={
      filter: this.connectionFilter,
      ...sourceSettings,
      parameters: {
        ...sourceSettings.parameters,
        source: id
      }
    };
    console.log(parameter)
    jsPlumb.makeSource(this.node, parameter);
  }

  private addTargetEndPoints = () => {
    const {allowLoopback, id, jsPlumb, targetSettings} = this.props;
    const parameter={
      allowLoopback,
      ...targetSettings,
      dropOptions: {
        hoverClass: 'dragHover',
        ...targetSettings.dropOptions
      },
      parameters: {
        ...targetSettings.parameters,
        target: id
      }
    };
    console.log(parameter)
    jsPlumb.makeTarget(this.node, parameter);
  }

  private makeNodeDraggable = () => {
    const {dragSettings, id, jsPlumb} = this.props;
    jsPlumb.draggable(this.node, {
      filter: this.dragFilter,
      ...dragSettings,
      drag: this.handleDrag,
      // Hacky, but only way found to pass id to `.getSelection()`
      // @ts-ignore
      id,
      stop: this.handleDrop
    });
  }

  private handleDrag = (params: Katavorio_DragEventOptions) => {
    this.drop = true;
    if (
      this.props.style.left !== params.pos[0] ||
      this.props.style.top !== params.pos[1]
    ) {
      if (this.props.onDrag) {
        this.props.onDrag(this.props.id, params.pos[0], params.pos[1]);
      }
    }
  }

  private handleDrop = (params: Katavorio_DragEventOptions) => {
    this.drop = false;
    if (
      this.props.style.left !== params.pos[0] ||
      this.props.style.top !== params.pos[1]
    ) {
      if (this.props.onDrop) {
        this.props.onDrop(this.props.id, params.pos[0], params.pos[1]);
      }
    }
  }
}
