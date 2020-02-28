import React from 'react';
import renderer from 'react-test-renderer';
import Tools from '../';
test('TabA tools', function () {
    var component = renderer.create(<Tools />);
    var tools = component.toJSON();
    expect(tools).toMatchSnapshot();
});
