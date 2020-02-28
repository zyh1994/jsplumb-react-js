import {
  BridgeProps
} from 'index';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {createPortal} from 'react-dom';

export default class Bridge extends Component<BridgeProps> {
  public static propTypes = {
    id: PropTypes.string.isRequired
  };

  public static defaultProps: BridgeProps = {
    id: undefined
  };

  private timeout: NodeJS.Timer;
  private overlay: HTMLElement;

  public shouldComponentUpdate(nextProps: BridgeProps) {
    if (this.props.id === nextProps.id) {
      return false;
    }

    return true;
  }

  public componentWillUnmount () {
    clearTimeout(this.timeout);
  }

  public render() {
    if (!this.overlay) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => (this.forceUpdate()), 100);
    }

    const {children, id} = this.props;
    this.overlay = this.overlay || document.getElementById(id);

    return (this.overlay ? createPortal(children, this.overlay) : null);
  }
}
