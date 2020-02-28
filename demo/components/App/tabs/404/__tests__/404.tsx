import React from 'react';
import renderer from 'react-test-renderer';
import E404 from '../404';

test('Error 404 page', () => {
  const component = renderer.create(
    <E404 />
  );
  const e404 = component.toJSON();
  expect(e404).toMatchSnapshot();
});
