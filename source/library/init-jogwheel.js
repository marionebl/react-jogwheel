import {Component} from 'react';
import {findDOMNode} from 'react-dom';
import JogWheel from 'jogwheel';

/**
 * Attach a JogWheel instance to component
 * @param  {object} component React component to attach to
 * @param  {object} node      DOM node to work on
 * @return {null} null
 * @access private
 */
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
		/**
		 * Render the new frame on component
		 * @param  {*} _             placeholder
		 * @param  {string} propertyName  name of the property
		 * @param  {*} propertyValue value of the property
		 * @return {null}                 null
		 * @access private
		 */
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
