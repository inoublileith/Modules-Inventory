/* eslint-disable @typescript-eslint/naming-convention */
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    {__defProp(target, name, { get: all[name], enumerable: true });}
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      {if (!__hasOwnProp.call(to, key) && key !== except)
        {__defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });}}
  }
  return to;
};
// eslint-disable-next-line eqeqeq
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(extension_exports);
var import_vscode2 = require("vscode");
var vscode2 = __toESM(require("vscode"));

// src/provider/TreeViewProvider.ts
var import_vscode = require("vscode");
var vscode = __toESM(require("vscode"));
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));

// src/utilities/getNonce.ts
function getNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// src/provider/TreeViewProvider.ts
var TreesViewProvider = class extends vscode.TreeItem {
  constructor(_extensionUri) {
    this._extensionUri = _extensionUri;
    this.data = this.loadData();
  }
  loadData() {
    const dataPath = path.join(
      this._extensionUri.fsPath,
      "..",
      "component-gallery",
      "src",
      "data.json"
    );
    const rawData = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(rawData);
  }
  resolveWebviewView(webviewView, _context, _token) {
    this._view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.type) {
        case "colorSelected": {
          vscode.window.activeTextEditor?.insertSnippet(new import_vscode.SnippetString(`#${data.value}`));
          break;
        }
      }
    });
  }
  _getHtmlForWebview(webview) {
    const scriptUri = webview.asWebviewUri(import_vscode.Uri.joinPath(this._extensionUri, "media", "main.js"));
    const styleResetUri = webview.asWebviewUri(
      import_vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      import_vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );
    const styleMainUri = webview.asWebviewUri(
      import_vscode.Uri.joinPath(this._extensionUri, "media", "main.css")
    );
    const nonce = getNonce();
    const containersHTML = this.data.map(
      (item) => `
       
<section class="container">
  <img class="image" src="path/to/your/image.jpg" alt="Image" />
  <section>
    <label class="first">
      ${item.name};&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${item.__1}
    </label>
    <label class="seconde">${item.dimensions}</label>
    <label class="third">${item.gpio}</label>
  </section>
</section>;
      `
    ).join("");
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">

        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link href="${styleResetUri}" rel="stylesheet">
        <link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${styleMainUri}" rel="stylesheet">

        <title>Data Information</title>
      </head>
      <body>
        ${containersHTML}

        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>`;
  }
};
TreesViewProvider.viewType = "component-gallery.ESPRESSIF";

// src/extension.ts
function activate(context) {
  let devices = [];
  context.subscriptions.push(
    vscode2.window.registerWebviewViewProvider(
      TreesViewProvider.viewType,
      new TreesViewProvider(context.extensionUri)
    )
  );
  const devicesetDataProvider = new TreesViewProvider(context.extensionUri);
  const treeView = import_vscode2.window.createTreeView("firechip.devicesList", {
    treeDataProvider: devicesetDataProvider,
    showCollapseAll: false
  });
  const openDevice = import_vscode2.commands.registerCommand("firechip.showDeviceDetailView", () => {
    const selectedTreeViewItem = treeView.selection[0];
    const matchingDevice = devices.find((device) => device.id === selectedTreeViewItem.id);
    if (!matchingDevice) {
      import_vscode2.window.showErrorMessage("No matching device found");
      return;
    }
  });
  context.subscriptions.push(openDevice);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
//# sourceMappingURL=extension.js.map
