import { shallow } from 'enzyme';
import React from 'react';
import Diagram from '../';
test('Home content', function () {
    var component = shallow(<Diagram />);
    expect(component).toMatchSnapshot();
});
