import React from 'react';
import renderer from 'react-test-renderer';
import Tools from '../Tools';
test('TabA tools', function () {
    var defaultFunc = function () { return; };
    var component = renderer.create(<Tools diagramId='id' onAddNode={defaultFunc} onRemoveNode={defaultFunc} onSetDiagramScale={defaultFunc} scale={0} selections={[]}/>);
    var tools = component.toJSON();
    expect(tools).toMatchSnapshot();
});
