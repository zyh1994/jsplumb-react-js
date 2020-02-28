import React from 'react';
import renderer from 'react-test-renderer';
import E404 from '../404';
test('Error 404 page', function () {
    var component = renderer.create(<E404 />);
    var e404 = component.toJSON();
    expect(e404).toMatchSnapshot();
});
