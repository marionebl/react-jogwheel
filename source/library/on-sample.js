/**
 * Attach an onSample loop firing the onProgress method when changes
 * in the animation are detected
 *
 * @param  {object} component React component to augment
 * @return {null} null
 * @access private
 */
function onSample(component) {
	if (component.props.playing) {
		component.props.onProgress(component.instance.progress);
	}
	global.requestAnimationFrame(() => onSample(component));
}

export default onSample;
