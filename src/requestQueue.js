import getQueryable from './api'

export default function(processRequest) {
	let queue = [];
	let isProcessing = false;

	let self = this;

	this.queue = (req, res) => {
		console.log("got a request; queueing")
		console.log(req.path)
		getQueryable(req.path, {}).then(() => {
			console.log("valid request, queueing: " + req.url)
			queue.push({req, res});
			self.process();
		}, () => {
			console.log("invalid request, ending: " + req.url)
			res.end();
			self.process();
		})
	}

	this.process = function() {
		if (queue.length == 0) {
			console.log("nothing to process; aborting")
			return;
		}
		if (isProcessing) {
			console.log("already processing something; aborting")
			return;
		}
		console.log("processing")
		isProcessing = true;
		var next = queue.shift();
		processRequest(next.req, next.res).then(() => {
			console.log("done processing")
			isProcessing = false;
			self.process();
		});
	}
}
