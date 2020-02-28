import {shallow} from 'enzyme';
import React from 'react';
import Diagram from '../';

test('Home content', () => {
  const component = shallow(
    <Diagram />
  );
  expect(component).toMatchSnapshot();
});
