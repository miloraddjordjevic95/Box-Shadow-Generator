const vscode = require("vscode");
const path = require("path");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    context.subscriptions.push(
        vscode.commands.registerCommand("boxShadowGenerator.start", () => {
            const panel = vscode.window.createWebviewPanel(
                "boxShadowGenerator",
                "Box Shadow Generator",
                vscode.ViewColumn.One,
                {
                    localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, "files"))],
                    enableScripts: true,
                }
            );
            const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, "files", "script.js"));
            const scriptSrc = panel.webview.asWebviewUri(onDiskPath);
            panel.webview.html = getWebviewContent(scriptSrc);
        })
    );
}

function getWebviewContent(uri) {
    return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Box Shadow Generator</title>
		<style>
		@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
			:root {
				--white-color: #FFFFFF;
				--dark-grey-color: #333333;
				--primary-color: #007AFF;
			}
			*, *::after, *::before {
				box-sizing: border-box;
				padding: 0;
				margin: 0;
			}
			html {
				scroll-behavior: smooth;
			}
			body {
				font-family: 'Montserrat', sans-serif;
				line-height: 1.6;
			}
			.container {
				background-color: var(--white-color);
				padding: 30px;
				position: absolute;
				transform: translate(-50%, -50%);
				left: 50%;
				top: 50%;
				width: 80vmin;
				border-radius: 10px;
				box-shadow: 0 20px 40px rgba(2, 42, 83, 0.2);
			}
			.result {
				padding: 150px 0;
			}
			#element {
				height: 100px;
				width: 100px;
				position: relative;
				background-color: var(--dark-grey-color);
				margin: auto;
			}
			.sliders {
				display: grid;
				grid-template-columns: 6fr 6fr;
				gap: 20px 15px;
			}
			.slider-wrapper {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			.slider-wrapper > label {
				font-size: 18px;
				color: var(--dark-grey-color);
			}
			.slider-wrapper > input[type="range"] {
				width: 100%;
				border: none;
			}
			.slider-wrapper > input[type="color"] {
				width: 20%;
				height: 30px;
				border: none;
			}
			.slider-wrapper > input[type="range"]:hover,
			.slider-wrapper > input[type="color"]:hover {
				cursor: pointer;
			}
			.slider-wrapper > input[type="range"]:focus,
			.slider-wrapper > input[type="color"]:focus {
				outline: none;
			}
			.input-wrapper > label {
				font-size: 18px;
				color: var(--dark-grey-color);
			}
			.input-wrapper > input[type="checkbox"]:focus {
				outline: none;
			}
			.code-wrapper {
				display: grid;
				grid-template-columns: 10fr 2fr;
				gap: 5px;
				margin-top: 20px;
			}
			.code-wrapper > textarea {
				resize: none;
				padding: 10px;
				border: 1px solid var(--dark-grey-color);
				border-radius: 5px;
				font-size: 16px;
			}
			.code-wrapper > textarea:focus {
				outline: none;
			}
			.code-wrapper > button {
				background-color: var(--primary-color);
				border-radius: 5px;
				border: none;
				color: var(--white-color);
				font-size: 16px;
			}
			.code-wrapper > button:hover {
				cursor: pointer;
				opacity: 0.9;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="result">
				<div id="element"></div>
			</div>
			<div class="sliders">
				<div class="slider-wrapper">
					<label for="h-shadow">Horizontal Shadow:</label>
					<input type="range" id="h-shadow" max="100" min="-100" value="0" />
				</div>
				<div class="slider-wrapper">
					<label for="v-shadow">Vertical Shadow:</label>
					<input type="range" id="v-shadow" max="100" min="-100" value="0" />
				</div>
				<div class="slider-wrapper">
					<label for="blur-radius">Blur Radius:</label>
					<input type="range" id="blur-radius" max="100" min="0" value="0" />
				</div>
				<div class="slider-wrapper">
					<label for="spread-radius">Spread Radius:</label>
					<input type="range" id="spread-radius" max="50" min="-50" value="0" />
				</div>
				<div class="slider-wrapper">
					<label for="shadow-color">Shadow Color:</label>
					<input type="color" id="shadow-color" />
				</div>
				<div class="slider-wrapper">
					<label for="shadow-color-opacity">Shadow Color Opacity:</label>
					<input
						type="range"
						id="shadow-color-opacity"
						max="1"
						min="0"
						step="0.1"
						value="1"
					/>
				</div>
				<div class="input-wrapper">
					<label for="shadow-inset">Inset Shadow:</label>
					<input type="checkbox" id="shadow-inset" />
				</div>
      		</div>
			<div class="code-wrapper">
				<textarea rows="2" id="code"></textarea>
				<button onclick="copyCode()">Copy</button>
			</div>
    	</div>
		<script src="${uri}"></script>
	</body>
</html>`;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
