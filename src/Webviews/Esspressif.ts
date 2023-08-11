import { Webview, Uri } from 'vscode';
import { getUri } from '../utilites/getUri';
import { getNonce } from '../utilites/getNonce';

export function getWebviewContent(
  name: string,
  dimensions: string,
  gpio: string,
  flash: string,
  image: string,
  webview: Webview,
  extensionUri: Uri
): string {
  const webviewUri = getUri(webview, extensionUri, [
    'media',
    'assets',
    'webview.js',
  ]);
  const styleUri = getUri(webview, extensionUri, [
    'media',
    'assets',
    'style.css',
  ]);
  const codiconUri = getUri(webview, extensionUri, [
    'media',
    'assets',
    'codicon.css',
  ]);
  const imageUri = getUri(webview, extensionUri, ['media', 'icons', image]);

  const nonce = getNonce();

  return `
     <!DOCTYPE html>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="${styleUri}">
          <link rel="stylesheet" href="${codiconUri}">
          <title>Component Gallery</title>
      
        </head>
        <body>
 <div class="editor-instance">
 <div class="extension-editor" data-keybinding-context="14" tabindex="0" role="document" style="outline: none;">
<div class="header">
  <div class="icon-container">
        <img class="icon" draggable="false" src="${imageUri}">
        <div class="extension-remote-badge-container"></div>
  </div>

  <div class="details">

        <div class="title">
              <span class="name clickable deprecated" title="Extension name" role="heading" tabindex="0">${name}</span>&nbsp;&nbsp;
              <vscode-badge>1024</vscode-badge>
              <span class="pre-release" style="display: none;">
              <span class="codicon codicon-extensions-pre-release"></span>
              <span class="pre-release-text">Pre-Release</span>
              </span>

        </div>

        <div class="subtitle">
            
          <div class="subtitle-entry">
            <div class="publisher clickable" title="Publisher" tabindex="0" role="button">
              <div class="publisher-name">Espressif Systems</div>
              <div class="verified-publisher"></div>
            </div>
          </div>

          <div class="subtitle-entry">
            <span class="install extension-install-count" title="Install count" tabindex="0">
              <span class="codicon codicon-extensions-install-count"></span>
              <span class="count">${gpio} pin</span>
            </span>
          </div>

          <div class="subtitle-entry">
            <span class="rating clickable extension-ratings" title="Average rating: 4.5 out of 5" tabindex="0" role="link">
              <span class="codicon codicon-extensions-star-full"></span>
              <span class="codicon codicon-extensions-star-full"></span>
              <span class="codicon codicon-extensions-star-full"></span>
              <span class="codicon codicon-extensions-star-full"></span>
              <span class="codicon codicon-extensions-star-half"></span>
              <span style="padding-left: 1px;"> ${dimensions}</span>
            </span>
          </div>
          <div class="subtitle-entry">
            <span class="rating clickable extension-ratings" title="Average rating: 4.5 out of 5" tabindex="0" role="link">
              <span class="codicon codicon-extensions-star-full"></span>
              <span class="codicon codicon-extensions-star-full"></span>
              <span class="codicon codicon-extensions-star-full"></span>
              <span class="codicon codicon-extensions-star-full"></span>
              <span class="codicon codicon-extensions-star-half"></span>
              <span style="padding-left: 1px;"> Falsh ${flash} MB</span>
            </span>
          </div>

           <div class="subtitle-entry"></div>

        </div>

        <div class="description">${name} is a powerful generic Wi-Fi + Bluetooth LE MCU module that has a single-core CPU,<br> a rich set of peripherals, and with a U.FL connector for an external antenna. It is an ideal choice for smart homes,<br> industrial automation, healthcare, consumer electronics, etc.</div>

        <div class="actions-status-container list-layout">

        <div class="monaco-action-bar">
              
                  <ul class="actions-container" role="toolbar">
              <li class="action-item disabled" role="presentation" title="">
                <a class="action-label codicon extension-action label reload disabled" role="button" aria-disabled="true" aria-label="" aria-checked="" tabindex="-1"></a>
              </li>
              <li class="action-item disabled" role="presentation" title="">
                <a class="action-label codicon extension-action text extension-status-label hide disabled" role="button" aria-disabled="true" aria-label="" aria-checked="" tabindex="-1"></a>
              </li>
              <li class="action-item action-dropdown-item disabled empty" role="presentation" title="">
                <a class="action-label codicon extension-action label prominent update disabled action-dropdown" role="button" aria-disabled="true" aria-label="" aria-checked="" tabindex="-1"></a>
                <div class="action-dropdown-item-separator prominent">
                  <div></div>
                </div>
                <div class="monaco-dropdown">
                  <div class="dropdown-label">
                    <a class="action-label dropdown codicon codicon-drop-down-button extension-action label prominent update action-dropdown hide" role="button" aria-haspopup="true" aria-expanded="false" title="More Actions..." aria-label="More Actions..." tabindex="-1"></a>
                  </div>
                </div>
              </li>
              <li class="action-item disabled" role="presentation" title="">
                <a class="action-label codicon extension-action label theme disabled" role="button" aria-disabled="true" aria-label="" aria-checked="" tabindex="-1">Set Color Theme</a>
              </li>
              <li class="action-item disabled" role="presentation" title="">
                <a class="action-label codicon extension-action label theme disabled" role="button" aria-disabled="true" aria-label="" aria-checked="" tabindex="-1">Set File Icon Theme</a>
              </li>
              <li class="action-item disabled" role="presentation" title="">
                <a class="action-label codicon extension-action label theme disabled" role="button" aria-disabled="true" aria-label="" aria-checked="" tabindex="-1">Set Product Icon Theme</a>
              </li>
              <li class="action-item disabled" role="presentation" title="">
                <a class="action-label codicon extension-action label language disabled" role="button" aria-disabled="true" aria-label="" aria-checked="" tabindex="-1">Set Display Language</a>
              </li>
              <li class="action-item disabled" role="presentation" title="">
                <a class="action-label codicon extension-action label language disabled" role="button" aria-disabled="true" aria-label="" aria-checked="" tabindex="-1">Clear Display Language</a>
              </li>
              <li class="action-item action-dropdown-item disabled empty" role="presentation" title="">
                <a class="action-label codicon disabled extension-action label action-dropdown" role="button" aria-disabled="true" aria-label="" aria-checked="" tabindex="-1">Enable</a>
                <div class="action-dropdown-item-separator">
                  <div></div>
                </div>
                <div class="monaco-dropdown">
                  <div class="dropdown-label">
                    <a class="action-label dropdown codicon codicon-drop-down-button extension-action label action-dropdown hide" role="button" aria-haspopup="true" aria-expanded="false" title="More Actions..." aria-label="More Actions..." tabindex="-1"></a>
                  </div>
                </div>
              </li>
              <li class="action-item action-dropdown-item empty" role="presentation" title="Disable this extension">
                <a class="action-label codicon extension-action label action-dropdown" role="button" aria-label="Disable this extension" aria-checked="" tabindex="0">Datasheet</a>
                <div class="action-dropdown-item-separator">
                  <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M1.5 1L6 0.999939V1.99994L2 2V14H14V10H15V14.5L14.5 15H1.5L1 14.5V1.5L1.5 1Z" fill="#C5C5C5"/>
  <path d="M15 1.5L15.0001 7.99997H14.0001L14 2.7071L7.24269 9.46445L6.53558 8.75734L13.2929 2L8.00003 2V1H14.5L15 1.5Z" fill="#C5C5C5"/>
</svg></div>
                </div>
                <div class="monaco-dropdown">
                  <div class="dropdown-label">
                    <a class="action-label dropdown codicon codicon-drop-down-button extension-action label action-dropdown hide" role="button" aria-haspopup="true" aria-expanded="false" title="More Actions..." aria-label="More Actions..." tabindex="0"></a>
                  </div>
                </div>
              </li>
              
             
              
             
              
            
              
             
              
              
            </ul>

        </div>

        <div class="status">
            <div>
             
            </div>
          </div>
    
        </div>

        <div class="recommendation">
           
        </div>
  


  </div>
</div>



<div class="body">

      <div class="navbar">
            <div class="monaco-action-bar">
          <ul class="actions-container" role="toolbar">
            <li class="action-item" role="presentation" title="Extension details, rendered from the extension's 'README.md' file">
              <a class="action-label checked" role="checkbox" aria-label="Extension details, rendered from the extension's 'README.md' file" aria-checked="true" tabindex="0">Pin Définitions</a>
            </li>
            <li class="action-item" role="presentation" title="Lists contributions to VS Code by this extension">
              <a class="action-label" role="button" aria-label="Lists contributions to VS Code by this extension" aria-checked="">Module Schematics</a>
            </li>
            <li class="action-item" role="presentation" title="Extension update history, rendered from the extension's 'CHANGELOG.md' file">
              <a class="action-label" role="button" aria-label="Extension update history, rendered from the extension's 'CHANGELOG.md' file" aria-checked="">Physical Dimensions</a>
            </li>
            <li class="action-item" role="presentation" title="Extension runtime status">
              <a class="action-label" role="button" aria-label="Extension runtime status" aria-checked="">Peripheral Schematics</a>
            </li>
          </ul>
        </div> 


      </div>

      <div class="content" id="75f6dbf6-1a0a-4093-b846-be47a8701620">

        <div class="details">
          <div class="readme-container"></div>
          <div class="additional-details-container">
            <div class="monaco-scrollable-element " role="presentation" style="position: relative; overflow: hidden;">
              <div class="additional-details-content" tabindex="0" style="overflow: hidden;">
                <div class="categories-container additional-details-element">
                  <div class="additional-details-title">Categories</div>
                  <div class="categories">
                    <span class="category" tabindex="0">Rf & Radio</span><br>
                      <span class="category" tabindex="0">Rf Transceiver ics</span>
                  </div>
                </div>
                <div class="resources-container additional-details-element">
                  <div class="additional-details-title">Pre-order parts service</div>
                  <div class="resources">
                    <vscode-link href="#">Minimum:2000</vscode-link><br>
             <vscode-link href="#">Full Reel:2000</vscode-link><br>
             <vscode-link href="#">Available Order Qty: 1685</vscode-link><br>
                  </div>
                </div>
                <div class="more-info-container additional-details-element">
                  <div class="additional-details-title">In-stock Item Pricing</div>
                  <div class="more-info">
                    <div class="more-info-entry">
                      <div>Qty&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unit Price</div>
                      <div></div>
                    </div>
                    <div class="more-info-entry">
                      <div>1+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$0.3591</div>
                      <div></div>
                    </div>
                    <div class="more-info-entry">
                      <div>10+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$0.3067</div>
                      <div></div>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div role="presentation" aria-hidden="true" class="invisible scrollbar horizontal" style="position: absolute; width: 288px; height: 10px; left: 0px; bottom: 0px;">
                <div class="slider" style="position: absolute; top: 0px; left: 0px; height: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; width: 288px;"></div>
              </div>
              <div role="presentation2" aria-hidden="true" class="invisible scrollbar vertical" style="position: absolute; width: 10px; height: 515px; right: 0px; top: 0px;">
                <div class="slider2" style="position: absolute; top: 0px; left: 0px; width: 10px; transform: translate3d(0px, 0px, 0px); contain: strict; height: 515px;"></div>
              </div>
              <div class="shadow"></div>
              <div class="shadow"></div>
              <div class="shadow"></div>
            </div>
          </div>
        </div>

      </div>





</div>




</div>
 </div>
           <script type="module" nonce="${nonce}" src="${webviewUri}"></script>
        </body>
      </html>
  `
}
