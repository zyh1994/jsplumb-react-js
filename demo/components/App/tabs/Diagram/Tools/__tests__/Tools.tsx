import React from 'react';
import renderer from 'react-test-renderer';
import Tools from '../Tools';

test('TabA tools', () => {
  const defaultFunc = () => { return; };

  const component = renderer.create(
    <Tools
      diagramId='id'
      onAddNode={defaultFunc}
      onRemoveNode={defaultFunc}
      onSetDiagramScale={defaultFunc}
      scale={0}
      selections={[]}
    />
  );
  const tools = component.toJSON();
  expect(tools).toMatchSnapshot();
});
