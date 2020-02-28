import {shallow} from 'enzyme';
import React from 'react';
import Diagram from '../Diagram';

test('Home content', () => {

  const defaultFunc = () => { return; };

  const component = shallow(
    <Diagram
      connections={[]}
      diagramId='DAG'
      maxScale={2}
      minScale={0.25}
      nodes={{}}
      onAddConnection={defaultFunc}
      onRemoveConnection={defaultFunc}
      onRemoveNode={defaultFunc}
      onSelectionUpdate={defaultFunc}
      onSetDiagramScale={defaultFunc}
      onSetDiagramXYOffset={defaultFunc}
      onUpdateNode={defaultFunc}
      scale={1}
      selections={[]}
      xOffset={0.0}
      yOffset={0.0}
    />
  );
  expect(component).toMatchSnapshot();
});
