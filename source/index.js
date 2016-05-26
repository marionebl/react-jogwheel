import debuglog from 'debuglog';
import * as React from 'react';
import {Component} from 'react';

import init from './library/init-jogwheel';
import onSample from './library/on-sample';

const log = debuglog('react-jogwheel');

/**
 * noop function
 * @returns {null} null
 * @access private
 */
const noop = () => {};

export default class ReactJogWheel extends Component {
	/**
	 * React wrapper component for JogWheel
	 * @author Mario Nebl
	 * @copyright 2016 Mario Nebl
	 * @license MIT
	 * @version 0.1.1
	 * @fileoverview Take control of your CSS keyframe animations with react
	 * @see https://github.com/marionebl/jogwheel
	 * @typedef {Object} ReactJogwheel
	 * @property {element|string|function} component='div' to render
	 * @example
	 * // Render with alternative tagName
	 * <JogWheel component="span" />
	 * // Render other React component
	 * <JogWheel component={Toolbar} />
	 *
	 * @property {node|Array<node>} children to render
	 * @example
	 * // Render with children
	 * <JogWheel>
	 *  <span className="child" />
	 * </JogWheel>
	 *
	 * @property {number} progress of the applied animation
	 * @example
	 * // Render with progress set to mid-animation
	 * <JogWheel progress={0.5} />
	 *
	 * @property {function} onProgress=() => {} callback fired progress changes
	 * @example
	 * // Render with onProgress callback
	 * onProgress (...args) => {
	 *   console.log(...args);
	 * }
	 * <JogWheel {...{onProgress}} />
	 *
	 * @property {number} duration of the animation in milliseconds, overrides `animation-duration`
	 * @example
	 * // Force animation-duration to 100ms
	 * <JogWheel duration={100} />
	 *
	 * @property {number} delay of the animation in milliseconds, overrides `animation-delay`
	 * @example
	 * // Force animation-delay to 1000ms
	 * <JogWheel delay={1000} />
	 *
	 * @property {number} iterationCount of the animation, overrides `animation-iteration-count`
	 * @example
	 * // Force animation-iteration-count to 42
	 * <JogWheel iterationCount={42} />
	 *
	 * @property {string} timingFunction of the animation overrides `animation-timing-function`
	 * @example
	 * // Force animation-timing-function to 'ease-in-out'
	 * <JogWheel timingFunction="ease-in-out" />
	 *
	 * @property {boolean} playing state of the animation
	 * @example
	 * // Force animation-play-state to 'paused'
	 * <JogWheel playing={false} />
	 * // Force animation-play-state to 'playing'
	 * <JogWheel playing />
	 *
	 */
	static propTypes = {
		children: React.PropTypes.oneOfType([
			React.PropTypes.arrayOf(React.PropTypes.node),
			React.PropTypes.node
		]),
		component: React.PropTypes.oneOfType([
			React.PropTypes.element,
			React.PropTypes.func,
			React.PropTypes.string
		]),
		delay: React.PropTypes.number,
		duration: React.PropTypes.number,
		iterationCount: React.PropTypes.number,
		onProgress: React.PropTypes.func,
		playing: React.PropTypes.bool,
		progress: React.PropTypes.number,
		timingFunction: React.PropTypes.string
	};

	/**
	 * Internal defaultProps
	 * * render as `div` per default
	 * * onProgress is a `noop` func per default
	 *
	 * @type {Object}
	 * @access private
	 */
	static defaultProps = {
		component: 'div',
		onProgress: noop
	};

	/**
	 * Internal JogWheel instance attached after `render`
	 *
	 * @type {object}
	 * @access private
	 */
	instance = null;

	/**
	 * Internal node reference
	 * @type {HTMLElement}
	 * @access private
	 */
	node = null;

	/**
	 * Internal component state holding JogWheel styles for
	 * polyfilled integration cases
	 *
	 * @type {Object}
	 * @access private
	 */
	state = {
		style: {}
	};

	constructor(...args) {
		super(...args);
		this.ref = this.ref.bind(this);
	}

	/**
	 * Save the node reference to component instance
	 * @param  {HTMLElement} node refernce to save
	 * @return {void}
	 * @access private
	 */
	ref(node) {
		log('::ref', node);
		this.node = node;
	}

	/**
	 * Detach the sampler loop when unmounting
	 * @returns {null} null
	 * @access private
	 */
	componentWillUnmount() {
		log('::componentWillUnmount');
		global.cancelAnimationFrame(this.sampler);
	}

	/**
	 * Set up after mount
	 * * seek on attached JogWheel instance
	 * * play/pause on attached JogWheel instance
	 * * attach sampler loop
	 * @returns {null} null
	 * @access private
	 */
	componentDidMount() {
		log('::componentDidMount');
		this.instance = init(this);

		if (typeof this.props.progress === 'number') {
			this.instance.seek(this.props.progress);
		}

		if (this.props.playing) {
			this.instance.play();
		} else {
			this.instance.pause();
		}

		/**
		 * Internal Sampler instance attached after `componentDidMount`
		 * @type {object}
		 * @returns {null} null
		 * @access private
		 */
		this.sampler = onSample(this);
	}

	/**
	 * Apply changed props to JogWheel instance
	 * @param {object} props properties about to receive
	 * @returns {null} null
	 * @access private
	 */
	componentWillReceiveProps(props) {
		log('::componentWillReceiveProps', props);
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

	/*
	 * Render the component
	 * @returns {null} null
	 * @access private
	 */
	render() {
		log('::render', this.props, this.state);
		const Component = this.props.component;
		return (
			<Component
				{...this.props}
				ref={this.ref}
				style={this.state.style}
				>
				{this.props.children}
				</Component>
		);
	}
}
