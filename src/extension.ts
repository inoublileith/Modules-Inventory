import * as vscode from 'vscode';

import { EsspressifViewProvider } from './Provider/EsspressifDataProvider';
import { getWebviewContent } from './Webviews/Esspressif';

export function activate(context: vscode.ExtensionContext) {
  
	// Create a new inventoryViewProvider instance and register it with the extension's context
	const provider = new EsspressifViewProvider(context.extensionUri);

	context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      EsspressifViewProvider.viewType,
      provider,
      {
        webviewOptions: { retainContextWhenHidden: true },
      }
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('inventory.menu.view', () => {
      const message = 'Menu/Title of extension is clicked !';
      vscode.window.showInformationMessage(message);
    })
  );
    let panel: vscode.WebviewPanel | undefined = undefined;

    vscode.commands.registerCommand('inventory.openWebview', (items) => {
      panel = vscode.window.createWebviewPanel(
        'webview', // Identifies the type of the webview
        `ESPRESSIF : ${items.name}`, // Title displayed in the panel
        vscode.ViewColumn.One, // Editor column to show the webview panel in
        {
          enableScripts: true, // Enable JavaScript in the webview
        }
      );

      // Get the ID of the clicked item and pass it to the webview

      panel.webview.html = getWebviewContent(
        items.name,
        items.dimensions,
        items.gpio,
        items.flash,
        items.image,
        panel.webview,
        context.extensionUri // Use 'this._extensionUri' as it's within the class
      );
    });
		
}

// This method is called when your extension is deactivated
export function deactivate() {}
