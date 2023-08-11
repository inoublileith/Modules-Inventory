import * as vscode from 'vscode';
import * as data from '../data/data.json';

export class EsspressifViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'inventory.chatView';
  public selectedInsideCodeblock = false;
  public pasteOnClick = true;
  public keepConversation = true;
  public timeoutLength = 60;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView,context: vscode.WebviewViewResolveContext<unknown>,_token: vscode.CancellationToken)
   {webviewView.webview.options = {enableScripts: true,localResourceRoots: [this._extensionUri],};

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview,this._extensionUri);
// open the WebView 
    webviewView.webview.onDidReceiveMessage((message) => {
      switch (message.type) {
        case 'itemSelected': {
          let items = message.value;
          vscode.commands.executeCommand('inventory.openWebview', items);
          break;
        }
      }
    });
  }

 

  private _getHtmlForWebview(
    webview: vscode.Webview,
    extensionUri: vscode.Uri
  ) {
    
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));
    const microlightUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri,'media','scripts','microlight.min.js'));
    const tailwindUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri,'media','scripts','showdown.min.js'));
    const showdownUri = webview.asWebviewUri( vscode.Uri.joinPath(this._extensionUri,'media','scripts','tailwind.min.js' ));
    const stylesheetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'assets', 'main.css'));

    //Function to Map the image 
 function getIconUri(icon: string | undefined): string {
   // Default icon name in case item.icon is undefined
   const defaultIcon = 'ESP-WROOM-02_S_0.png';
   // Use the default icon name if item.icon is undefined
   const iconName = icon || defaultIcon;
   // Assuming the images are stored in the "media/icons" directory
   const iconUri = vscode.Uri.joinPath(extensionUri, 'media', 'icons', iconName);
   return webview.asWebviewUri(iconUri).toString();
 }


    const filterInputHTML = `<input type="text" id="filterInput" class="h-6 w-full" placeholder="Search engines for modules" style="background-color: var(--vscode-input-background);
    color: var(--vscode-input-foreground);
    border-width: 1px;
    border-style: solid;
    border-color: var(--vscode-input-border, transparent);
        padding: 2px 6px;
    border-radius: 2px;">`;

    const containersHTML = data
      .map(
        (item, index) =>
          `
        <li class="hoverable" id="View-${index}">
              <div class="monaco-list-row">
            <div class="extension-bookmark-container"></div>
            <div class="extension-bookmark-container"></div>
            <div class="extension-list-item">
              <div class="icon-container">
                <img class="icon" src="${getIconUri(item.image)}">
                <div class="extension-remote-badge-container"></div>
              </div>
              <div class="details">
              <div class="header-container">
              <div class="header">
                <span class="name">${item.name}</span>
                <span class="install-count extension-install-count"></span>
                <span class="ratings extension-ratings small" title=""></span>
                <span class="sync-ignored"></span>
                <span class="activation-status">
                                 <span class="codicon codicon-extension-activation-time"></span>
                                 <span class="activationTime">1024</span>
                                 </span>
                <div class="extension-remote-badge-container"></div>
                </div>
                </div>
                <div class="description ellipsis">${item.dimensions}</div>
               <div class="footer">
  <div class="author ellipsis">
    <div class="verified-publisher">
      <span class="extension-verified-publisher clickable">
        <span class="codicon codicon-extensions-verified-publisher"></span>
      </span>
    </div>
    <div class="publisher-name ellipsis">${item.gpio}</div>
  </div>
  <div class="monaco-action-bar">
    <ul class="actions-container" role="toolbar">
                        
        
      
      <li class="action-item" role="presentation" title="">
        <a class="" role="button" aria-label="" aria-checked=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
</svg></a>
      </li>
    </ul>
  </div>
</div>
              </div>
            </div>
          </div>
          <script>
            const item${index} = ${JSON.stringify(item)};
            const ViewEspressif${index} = document.getElementById('View-${index}');
            ViewEspressif${index}.addEventListener('click', () => { openView(item${index}); });

            function openView(item) {
              vscode.postMessage({ type: 'itemSelected', value: item });
            }
          </script>
        </li>
      `
      )
      .join('');

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${stylesheetUri}" rel="stylesheet">
        <script src="${tailwindUri}"></script>
        <script src="${showdownUri}"></script>
        <script src="${microlightUri}"></script>
      </head>
      <body>
        <div class="" id="workbench.view.extensions">
          <div class="overlay" aria-hidden="true" style="background-color: rgba(83, 89, 93, 0.5); display: none;"></div>
          <div class="header-input">
            <div class="input-container">
              ${filterInputHTML}
            </div>
          </div>
          <div class="pane-header extension-view-header expanded" tabindex="0" role="button" aria-label="Installed Section" aria-expanded="true" draggable="true" style="line-height: 22px; color: var(--vscode-sideBarSectionHeader-foreground); background-color: var(--vscode-sideBarSectionHeader-background); border-top: 1px solid var(--vscode-sideBarSectionHeader-border);">
        
       
       <h2><div id="svg"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg></div></h2>&nbsp;   <h2 class="title" title="Installed"> ESPRESSIF</h2>
          <div class="actions show">
          <div class="monaco-toolbar">
          <div class="monaco-action-bar animated">
          <ul class="actions-container" role="toolbar" aria-label="Installed actions"></ul>
          </div>
          </div>
          </div>
          <div class="count-badge-wrapper">
       <div class="monaco-count-badge" title="" style="background-color: var(--vscode-badge-background); color: var(--vscode-badge-foreground); border: 1px solid var(--vscode-contrastBorder);">186</div>
          </div>
          </div>
          
 <ul>
 ${containersHTML}
 </ul>

  <script>
        // Get references to the SVG elements
        const initialSvg = document.getElementById('svg');
        const newSvgPath = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#fafafa}</style><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>';

        // Function to change the SVG content
       function changeSvg() {
    if (initialSvg.innerHTML === newSvgPath) {
        initialSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>';
    } else {
        initialSvg.innerHTML = newSvgPath;
    }
}


        // Add a click event listener to the section header
        const sectionHeader = document.querySelector('.pane-header');
        sectionHeader.addEventListener('click', changeSvg);
    </script>
          <script src="${scriptUri}"></script>
         
        </div>
      </body>
      </html>`
  }
}


