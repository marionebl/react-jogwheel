import 'web-animations-js';

import * as React from 'react';
import {Component, PropTypes} from 'react';
import * as ReactDOM from 'react-dom';

import JogWheel from '../';

class Toolbar extends Component {
	render() {
		return (
			<div className="toolbar">
				Toolbar
			</div>
		);
	}
}

class AnimatedToolbar extends Component {
	static propTypes = {
		progress: React.PropTypes.number
	};

	render() {
		return (
			<JogWheel
				component={Toolbar}
				progress={this.props.progress}
				/>
		);
	}
}

class AnimatedScrollContainer extends Component {
	static propTypes = {
		children: PropTypes.node
	};

	render() {
		return (
			<JogWheel
				component="div"
				{...this.props}
				className="scroll-container"
				>
				{this.props.children}
			</JogWheel>
		);
	}
}

class Application extends Component {
	state = {
		scroll: 0,
		scrollElement: null
	};

	handleScroll() {
		this.setState({
			...this.state,
			scroll: this.state.scrollElement.scrollTop
		});
	}

	componentWillMount() {
		const {document} = global;
		const scrollElement = document.scrollingElement || document.body;

		this.setState({
			scrollElement,
			scroll: scrollElement.scrollTop
		});

		global.addEventListener('scroll', (...args) => this.handleScroll(...args));
	}

	componentWillUnmount() {
		const {document} = global;
		document.body.removeEventListener('scroll', this.handleScroll);
	}

	render() {
		return (
			<div className="application">
				<AnimatedToolbar progress={this.state.scroll / 1000} />
				<AnimatedScrollContainer progress={this.state.scroll / 1000}>
					<div className="demo-content">
						Demo
					</div>
					<div className="demo-content">
						Demo
					</div>
					<div className="demo-content">
						Demo
					</div>
					<div className="demo-content">
						Demo
					</div>
					<div className="demo-content">
						Demo
					</div>
					<div className="demo-content">
						Demo
					</div>
					<div className="demo-content">
						Demo
					</div>
				</AnimatedScrollContainer>
			</div>
		);
	}
}

/**
 * Execute the example
 * @param {object} [window=global] Global window context
 * @param {object} [document=global.document] Global document context
 * @returns {null} null
 */
function main(window = global, document = global.document) {
	// create mountpoint
	const mount = document.createElement('div');
	document.body.appendChild(mount);

	const style = document.createElement('style');
	style.innerText = `
		* {
			box-sizing: border-box;
		}

		html,
		body {
			font-family: Arial, sans-serif;
			color: #fff;
			margin: 0;
			padding: 0;
		}

		@keyframes shrink {
			from {
				height: 200px;
			}
			to {
				height: 100px;
			}
		}
		.toolbar {
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 200px;
			color: #fff;
			background: #000;
			animation: shrink 1s both;
			animation-play-state: paused;
		}

		.demo-content {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 50vh;
			margin-bottom: 5vh;
			background: #ddd;
			color: #333;
		}
	`;

	document.body.appendChild(style);

	// Render stuffs
	ReactDOM.render(<Application />, mount);
}

main();
