export default function onSample(component) {
	if (component.props.playing) {
		component.props.onProgress(component.instance.progress);
	}
	global.requestAnimationFrame(() => onSample(component));
}
