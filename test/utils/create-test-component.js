import React from 'react';
import { findRenderedComponentWithType, renderIntoDocument } from 'react-addons-test-utils';

const createTestComponnet = (TestComponent, props) => {
	return findRenderedComponentWithType(
		renderIntoDocument(<TestComponent {...props}/>),
		TestComponent
	);
};

export { createTestComponnet }
