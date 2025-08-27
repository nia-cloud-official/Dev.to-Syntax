import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const KEY = 'devtoSyntax.checkedWelcome';
  if (!context.globalState.get(KEY)) {
    vscode.window.showInformationMessage(
      'Dev.to Syntax is active! Fira Code, ligatures, theme, and icons are all set up.'
    );
    context.globalState.update(KEY, true);
  }
}

export function deactivate() { }