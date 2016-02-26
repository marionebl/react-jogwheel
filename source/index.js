import * as React from 'react';
import {Component, PropTypes as types} from 'react';

import init from './library/init-jogwheel';
import onSample from './library/on-sample';

const noop = () => {};

export default class JogWheel extends React.Component {
	static propTypes = {
		component: types.oneOfType([
			types.element,
			types.string,
			types.func
		]),
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		]),
		progress: types.number,
		onProgress: types.func,
		duration: types.number,
		delay: types.number,
		iterationCount: types.number,
		timingFunction: types.string,
		playing: types.bool
	};

	static defaultProps = {
		component: 'div',
		onProgress: noop
	};

	instance = null;
	state = {
		style: {}
	};

	constructor(props, context) {
		super(props, context);
	}

	componentWillUnmount() {
		global.cancelAnimationFrame(this.sampler);
	}

	componentDidMount() {
		if (typeof this.props.progress === 'number') {
			this.instance.seek(this.props.progress);
		}

		if (this.props.playing) {
			this.instance.play();
		} else {
			this.instance.pause();
		}

		this.sampler = onSample(this);
	}

	componentWillReceiveProps(props) {
		if (typeof props.progress === 'number' && props.progress !== this.props.progress) {
			this.instance.seek(props.progress);
		}

		if (props.playing !== this.props.playing) {
			if (props.playing) {
				this.instance.play();
			} else {
				this.instance.pause();
			}
		}
	}

	render() {
		const Component = this.props.component;
		return (
			<Component
				{...this.props}
				ref={node => init(this, node)}
				style={this.state.style}
				>
				{this.props.children}
				</Component>
		);
	}
}
