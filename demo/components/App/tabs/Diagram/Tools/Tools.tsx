import React, {
  Fragment,
  PureComponent
} from 'react';
import './Tools.css';

export interface IToolsProps {
  onAddNode: (
    diagramId: string,
    node: IDiagramNode,
    nodeId?: string
  ) => any;
  onRemoveNode: (
    diagramId: string,
    nodeId: string
  ) => any;
  onSetDiagramScale: (
    diagramId: string,
    scale: number
  ) => any;
  diagramId: string;
  scale: number;
  selections: string[];
}

export default class Tools extends PureComponent<IToolsProps> {
  public static defaultProps: IToolsProps = {
    diagramId: undefined,
    onAddNode: () => { return; },
    onRemoveNode: () => { return; },
    onSetDiagramScale: () => { return; },
    scale: 0,
    selections: []
  };

  public constructor (props: IToolsProps) {
    super(props);
  }

  public render () {
    const {scale, selections} = this.props;

    const displaySelection = selections.map(selection => (
      <Fragment
        key={selection}
      >
        &nbsp;&nbsp;{selection},<br />
      </Fragment>
    ));

    return (
      <div styleName='tools'>
        <h4>Complex Diagram Tools</h4>
        <button onClick={this.handleAddNode}>
          Add Node
        </button>
        <br />
        <br />
        <form>
          <label htmlFor='ui-orientation'>
            <input
              type='range'
              step='any'
              min='0.25'
              max='2'
              name='orientation'
              value={scale}
              onChange={this.handleZoom}
            />
            Scale {scale}
          </label>
        </form>
        <br />
        Selections:
        <code styleName='code'>
          &#91;<br/>
            {displaySelection}
          &#93;
        </code>
        <br />
        <button onClick={this.handleRemoveNodes}>
          Remove Nodes
        </button>
      </div>
    );
  }

  private handleAddNode = () => {
    this.props.onAddNode(
      this.props.diagramId,
      {}
    );
  }

  private handleZoom = (event: any) => {
    this.props.onSetDiagramScale(
      this.props.diagramId,
      Number(event.target.value) || 1
    );
  }

  private handleRemoveNodes = () => {
    this.props.selections.forEach((selection) => {
      this.props.onRemoveNode(this.props.diagramId, selection);
    });
  }
}
