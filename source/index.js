import * as React from 'react';
import {Component, PropTypes} from 'react';

import jogwheel from 'jogwheel';

export default class JogWheel extends Component {
	static propTypes = {
		component: PropTypes.element,
		children: PropTypes.arrayOf(PropTypes.element),
		progress: PropTypes.number,
		duration: PropTypes.number,
		delay: PropTypes.number,
		iterationCount: PropTypes.number,
		timingFunction: PropTypes.string,
		playState: PropTypes.oneOf(['running', 'paused'])
	};

	instance = null;

	init(node) {
		console.log(node);
		const {
			duration,
			delay,
			iterationCount,
			timingFunction,
			playState
		} = this.props;

		this.instance = jogwheel.create(node, {
			duration,
			delay,
			iterationCount,
			timingFunction,
			playState,
			render: this.onRender
		});
	}

	componentWillReceiveProps(props) {
		this.instance.seek(props.progress);

		if (props.playState === 'running') {
			this.instance.play();
		} else {
			this.instance.pause();
		}
	}

	onRender(...args) {
		console.log(args);
	}

	render() {
		const Component = this.props.component;
		return (<Component {...this.props} ref={node => this.init(node)}>
			{this.props.children}
		</Component>);
	}
}
