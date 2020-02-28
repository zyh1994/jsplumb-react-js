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
import React, { Fragment, PureComponent } from 'react';
import './Tools.css';
var Tools = /** @class */ (function (_super) {
    __extends(Tools, _super);
    function Tools(props) {
        var _this = _super.call(this, props) || this;
        _this.handleAddNode = function () {
            _this.props.onAddNode(_this.props.diagramId, {});
        };
        _this.handleZoom = function (event) {
            _this.props.onSetDiagramScale(_this.props.diagramId, Number(event.target.value) || 1);
        };
        _this.handleRemoveNodes = function () {
            _this.props.selections.forEach(function (selection) {
                _this.props.onRemoveNode(_this.props.diagramId, selection);
            });
        };
        return _this;
    }
    Tools.prototype.render = function () {
        var _a = this.props, scale = _a.scale, selections = _a.selections;
        var displaySelection = selections.map(function (selection) { return (<Fragment key={selection}>
        &nbsp;&nbsp;{selection},<br />
      </Fragment>); });
        return (<div styleName='tools'>
        <h4>Complex Diagram Tools</h4>
        <button onClick={this.handleAddNode}>
          Add Node
        </button>
        <br />
        <br />
        <form>
          <label htmlFor='ui-orientation'>
            <input type='range' step='any' min='0.25' max='2' name='orientation' value={scale} onChange={this.handleZoom}/>
            Scale {scale}
          </label>
        </form>
        <br />
        Selections:
        <code styleName='code'>
          &#91;<br />
            {displaySelection}
          &#93;
        </code>
        <br />
        <button onClick={this.handleRemoveNodes}>
          Remove Nodes
        </button>
      </div>);
    };
    Tools.defaultProps = {
        diagramId: undefined,
        onAddNode: function () { return; },
        onRemoveNode: function () { return; },
        onSetDiagramScale: function () { return; },
        scale: 0,
        selections: []
    };
    return Tools;
}(PureComponent));
export default Tools;
