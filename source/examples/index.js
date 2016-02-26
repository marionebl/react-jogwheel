import 'web-animations-js';

import * as React from 'react';
import {Component} from 'react';
import * as ReactDOM from 'react-dom';

import JogWheel from '../';

class Application extends Component {
	state = {
		search: 0,
		playing: true,
		progress: 0,
		iteration: 1
	};

	onToggle() {
		this.setState({
			playing: !this.state.playing
		});
	}

	onSeekStart() {
		this.setState({
			seeking: true
		});
	}

	onSeek(e) {
		this.setState({
			search: e.target.value,
			progress: this.state.iteration + e.target.value / 1000
		});
	}

	onSeekEnd() {
		this.setState({
			seeking: false
		});
	}

	onProgress(progress) {
		this.setState({
			search: (progress - Math.floor(progress)) * 1000,
			iteration: Math.floor(progress)
		});
	}

	onPrevious() {
		this.setState({
			progress: this.state.iteration - 1,
			search: (this.state.iteration - 1) * 1000,
			iteration: this.state.iteration - 1
		});
	}

	onNext() {
		this.setState({
			progress: this.state.iteration + 1,
			search: (this.state.iteration + 1) * 1000,
			iteration: this.state.iteration + 1
		});
	}

	render() {
		const playing = this.state.seeking ? false : this.state.playing;

		return (
			<div>
				<button onClick={() => this.onPrevious()}>
					❚◀
				</button>
				<button onClick={() => this.onToggle()}>
					{this.state.playing ? '❚❚' : '▶'}
				</button>
				<button onClick={() => this.onNext()}>
					▶❚
				</button>
				<input
					type="range"
					min="0"
					max="1000"
					value={this.state.search}
					onMouseDown={(...args) => this.onSeekStart(...args)}
					onMouseUp={(...args) => this.onSeekEnd(...args)}
					onChange={(...args) => this.onSeek(...args)}
					/>
				<input
					value={Math.round(this.state.search / 10) / 100}
					onChange={(...args) => this.onSeek(...args)}
					/>
				<JogWheel
					progress={this.state.progress}
					playing={playing}
					onProgress={(...args) => this.onProgress(...args)}
					onIteration={(...args) => this.onIteration(...args)}
					className="animated"
					>
					{this.state.iteration > 0 && this.state.iteration}
				</JogWheel>
			</div>
		);
	}
}

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
		}

		@keyframes pulse {
			from, to {
				width: 100px;
				height: 100px;
			}

			50% {
				width: 200px;
				height: 200px;
			}
		}

		.animated {
			position: fixed;
			top: 50%;
			left: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100px;
			height: 100px;
			background: #000;
			border-radius: 50%;
			transform: translate3d(-50%, -50%, 0);
			animation: pulse 3s infinite;
		}
	`;

	document.body.appendChild(style);

	// Render stuffs
	ReactDOM.render(<Application />, mount);
}

main();
