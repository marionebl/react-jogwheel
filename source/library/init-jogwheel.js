import {Component} from 'react';
import {findDOMNode} from 'react-dom';
import JogWheel from 'jogwheel';

/**
 * Attach a JogWheel instance to component
 * @param  {object} component React component to attach to
 * @return {object} jogwheel instance
 * @access private
 */
export default component => {
	const {node} = component;
	const element = node instanceof Component ?
		findDOMNode(node) :
		node;

	return JogWheel.create(element, {
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
