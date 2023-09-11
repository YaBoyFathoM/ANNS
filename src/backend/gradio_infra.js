import { client } from "@gradio/client";

const app = await client("http://127.0.0.1:7860/");
const result = await app.predict("/predict", [
				"Howdy!",
	]);
console.log(result.data)const { spawn } = require('child_process');

const pythonProcess = spawn('python', ['app.py']);

pythonProcess.stdout.on('data', (data) => {
	console.log(`stdout: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
	console.error(`stderr: ${data}`);
});

pythonProcess.on('close', (code) => {
	console.log(`child process exited with code ${code}`);
});
