import * as vscode from 'vscode';

const THEME_OPTIONS: vscode.QuickPickItem[] = [
  { label: 'Dev.to Syntax', description: 'Dark theme, true to dev.to code blocks' },
  { label: 'Dev.to Syntax (Split UI)', description: 'Dark sidebar, light editor' },
  { label: 'Dev.to Syntax (Copilot UI)', description: 'Copilot-style layout with dev.to syntax' }
];


export function activate(context: vscode.ExtensionContext) {
  const WELCOME_KEY = 'devtoSyntax.v1.welcomeShown';

  const pickThemeCmd = vscode.commands.registerCommand('devtoSyntax.pickTheme', async () => {
    await pickAndApplyTheme();
  });

  context.subscriptions.push(pickThemeCmd);

  // Show one-time picker on first activation
  if (!context.globalState.get(WELCOME_KEY)) {
    context.globalState.update(WELCOME_KEY, true);
    welcomeAndPick();
  }
}

async function welcomeAndPick() {
  const choice = await vscode.window.showInformationMessage(
    'Dev.to Syntax is active. Choose your look:',
    'Pick Theme'
  );
  if (choice === 'Pick Theme') {
    await pickAndApplyTheme();
  }
}

async function pickAndApplyTheme() {
  const picked = await vscode.window.showQuickPick(THEME_OPTIONS, {
  placeHolder: 'Choose your Dev.to Syntax theme variant'
});

if (picked) {
  await vscode.workspace
    .getConfiguration('workbench')
    .update('colorTheme', picked.label, vscode.ConfigurationTarget.Global);

  vscode.window.showInformationMessage(`Applied: ${picked.label}`);
}



  if (!picked) {
    return;
  }

  // Apply the theme globally
  await vscode.workspace
    .getConfiguration('workbench')
    .update('colorTheme', picked, vscode.ConfigurationTarget.Global);

  // Ensure icon theme + ergonomics are set (users can override later)
  const wb = vscode.workspace.getConfiguration('workbench');
  const editor = vscode.workspace.getConfiguration('editor');

  await wb.update('iconTheme', 'material-icon-theme', vscode.ConfigurationTarget.Global);
  await editor.update('bracketPairColorization.enabled', true, vscode.ConfigurationTarget.Global);
  await editor.update('guides.bracketPairs', 'active', vscode.ConfigurationTarget.Global);
  await editor.update('guides.indentation', true, vscode.ConfigurationTarget.Global);
  await editor.update('fontLigatures', true, vscode.ConfigurationTarget.Global);

  vscode.window.showInformationMessage(`Applied: ${picked}`);

  // Gentle reminder about Fira Code install (cannot auto-install system fonts)
  const fontFamily = vscode.workspace.getConfiguration('editor').get<string>('fontFamily') || '';
  if (!/Fira Code/i.test(fontFamily)) {
    const open = 'Get Fira Code';
    const dismiss = 'Dismiss';
    const action = await vscode.window.showInformationMessage(
      'Tip: For ligatures like dev.to, install the Fira Code font.',
      open,
      dismiss
    );
    if (action === open) {
      vscode.env.openExternal(vscode.Uri.parse('https://github.com/tonsky/FiraCode#readme'));
    }
  }
}

export function deactivate() {}