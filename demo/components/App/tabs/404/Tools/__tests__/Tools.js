import React from 'react';
import renderer from 'react-test-renderer';
import Tools from '../Tools';
test('404 tools', function () {
    var component = renderer.create(<Tools />);
    var tools = component.toJSON();
    expect(tools).toMatchSnapshot();
});
