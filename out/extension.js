"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    const KEY = 'devtoSyntax.checkedWelcome';
    if (!context.globalState.get(KEY)) {
        vscode.window.showInformationMessage('Dev.to Syntax is active! Fira Code, ligatures, theme, and icons are all set up.');
        context.globalState.update(KEY, true);
    }
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map