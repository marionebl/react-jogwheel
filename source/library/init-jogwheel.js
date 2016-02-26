import {Component} from 'react';
import {findDOMNode} from 'react-dom';
import JogWheel from 'jogwheel';

export default (component, node) => {
	if (node === null) {
		return;
	}

	if (component.instance) {
		return;
	}

	const element = node instanceof Component ?
		findDOMNode(node) :
		node;

	component.instance = JogWheel.create(element, {
		render(_, propertyName, propertyValue) {
			component.setState({
				style: {
					...component.state.style,
					[propertyName]: propertyValue
				}
			});
			return propertyValue;
		}
	});
};
