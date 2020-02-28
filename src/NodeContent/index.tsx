import {NodeContentProps} from 'index';
import PropTypes from 'prop-types';
import React, {
  PureComponent
} from 'react';
import Close from 'src/Close';
import './index.css';

export default class NodeContent extends PureComponent<NodeContentProps> {
  public static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    onRemoveNode: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    style: PropTypes.object,
    styleName: PropTypes.string
  };

  public render() {
    const {className, children, id, selected, style, styleName} = this.props;

    return (
      <div
        className={className}
        style={style}
        // tslint:disable-next-line:max-line-length
        styleName={`${styleName ? styleName : ''} node-content ${(selected ? 'node-selected' : '')}`}
      >
        <Close
          id={id}
          onClose={this.handleClose}
        />
        <div>
          {children}
        </div>
      </div>
    );
  }

  private handleClose = () => {
    if (this.props.onRemoveNode) {
      this.props.onRemoveNode(this.props.id);
    }
  }
}
