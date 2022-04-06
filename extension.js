// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
var exec = require('child_process').exec;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let vFormat = vscode.languages.registerDocumentFormattingEditProvider('v', {
		provideDocumentFormattingEdits: (document, options, token) => {
			if (!document || !document.fileName) { return }
			console.log(document, "v fmt -w " + document.fileName);
			exec("v fmt -w " + document.fileName, function (error, stdout, stderr) {
				console.log(error, stdout, stderr);
			});
			return null
		}
	})
	let disposable = vscode.commands.registerCommand('v-format.format', function (document) {
		if (!document || !document._fsPath) { return }
		console.log(document, "v fmt -w " + document._fsPath);

		exec("v fmt -w " + document._fsPath, function (error, stdout, stderr) {
			console.log(error, stdout, stderr);
		});
	});

	context.subscriptions.push(disposable, vFormat);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
