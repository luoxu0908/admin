
<%@ Page Async="true" Title="WebDAV" Language="C#" AutoEventWireup="true" Inherits="DAV.MyCustomHandlerPage"%>
<%@ Import Namespace="ITHit.WebDAV.Server.Class1" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <title>WebDAV Server Engine</title>

	<script type="text/javascript">
		var port = window.location.port;
		if (port == "")
			port = window.location.protocol == 'http:' ? '80' : '443'; // Web Folders on Windows XP require port, even if it is a default port 80 or 443.
			var webDavFolderUrl = window.location.protocol + '//' + window.location.hostname + ':' + port + '<%=Request.ApplicationPath.TrimEnd('/')%>/DAV/';

	    function init() {
	    	// The call below displays Microsoft Office warning if required when page is loaded. 
	    	// Otherwise MS Office documents do not open first time in case of MS Office 2010 
	    	// and earlier is installed on a client computer, just warning is displayed.
	    	ITHit.WebDAV.Client.DocManager.ShowMicrosoftOfficeWarning();

	    	// List files on a WebDAV server using WebDAV Ajax Library
	    	NavigateFolderAsync(window.location.href);
	    }

	    function OpenAjaxFileBrowserWindow() {
	    	window.open("<%=Request.ApplicationPath.TrimEnd('/')%>/DAVWeb/Index.aspx", "", "menubar=1,location=1,status=1,scrollbars=1,resizable=1,width=900,height=600");
	    }

	    function OpenTestsWindow() {
	    	var width = Math.round(screen.width * 0.5);
	    	var height = Math.round(screen.height * 0.8);
	    	window.open("<%=Request.ApplicationPath.TrimEnd('/')%>/DAVWeb/AjaxIntegrationTests.aspx", "", "menubar=1,location=1,status=1,scrollbars=1,resizable=1,width=" + width + ",height=" + height);
				}

				// IT Hit WebDAV Ajax Library applet used to open non-MS Office files and open OS File Manager.
		var javaApletFilePath = "<%=Request.ApplicationPath.TrimEnd('/')%>/DAVWeb/plugins/ITHitMountOpenDocument.jar";

				function NavigateFolderAsync(sFolderUrl) {
					var ns = ITHit.WebDAV.Client;
					var session = new ns.WebDavSession();
					session.OpenFolderAsync(sFolderUrl, null,

                function (asyncResult) {
                	var folder = asyncResult.Result;
                	folder.GetChildrenAsync(false, null,

											function (asyncResult) {
												var items = asyncResult.Result;
												var table = document.getElementById("folderContent");
												var rows = "";
												for (var i = 0; i < items.length; i++) {
													var item = items[i];
													rows += "<tr>"
															+ "<td><a " + (item.ResourceType == ns.ResourceType.Folder ? "href='" + item.Href + "'" : "") + ">" + item.DisplayName + "</a></td>"
															+ "<td class='alignRight'>" + (item.ResourceType == ns.ResourceType.Folder ? "" : item.ContentLength) + "</td>"
															+ "<td class='alignRight'>" + item.LastModified.toLocaleString() + "</td>"
															+ "<td>" + ((item.ResourceType == ns.ResourceType.Folder)
																	? "<a href='javascript: OpenFolder(\"" + item.Href + "\")' title='Open folder in OS File Manager'>Browse</a>"
																	: "<a href='javascript: EditDoc(\"" + item.Href + "\")' title='Edit in associated application'>Edit</a>")
															+ "</td>"
															+ "</tr>";
												}
												table.innerHTML += rows;
											}
											);
                }
                );
				}

				// Opens document for editing using MS office or Java applet
				// sDocumentUrl must be full path including domain name: http://webdavserver.com/path/file.ext
				function EditDoc(sDocumentUrl) {
					var oNs = ITHit.WebDAV.Client.DocManager;

					if (oNs.IsMicrosoftOfficeAvailable() && oNs.IsMicrosoftOfficeDocument(sDocumentUrl)) {
						// Edit MS Office document with Microsoft Office
						oNs.MicrosoftOfficeEditDocument(sDocumentUrl);
					} else {
						// If this is a non-MS office document or MS Office is not installed open in associated application using Java applet
						ShowNpapiSupportMessage("Opening this type of document requires Java applets support.");
						oNs.JavaEditDocument(sDocumentUrl, webDavFolderUrl, javaApletFilePath);
					}

					// Or just call EditDocument instead, it will choose the requied method automatically:
					//ITHit.WebDAV.Client.DocManager.EditDocument(sDocumentUrl, javaApletFilePath);
				}

				// Opens folder in OS file manager
				// sFolderUrl must be full path including domain name: http://webdavserver.com/path/
				function OpenFolder(sFolderUrl) {
					ShowNpapiSupportMessage("Opening OS File Manager requires Java applets support.");
					ITHit.WebDAV.Client.DocManager.OpenFolderInOsFileManager(sFolderUrl, webDavFolderUrl, javaApletFilePath);
				}

				function ShowNpapiSupportMessage(message) {
					if (ITHit.DetectBrowser.Chrome) {
						var res = window.confirm(message + "\n\nGoogle Chrome does not support Java applets and Microsoft Office 2010 and earlier web browser plugins (NPAPI plugins) on Windows and OS X since v42 and on Linux since v35. Select OK to find how to enable NPAPI pugins support in Google Chrome.")
						if (res) {
							window.open("https://java.com/en/download/faq/chrome.xml#npapichrome");
						}
					}
				}
	</script>
    <style type="text/css">
        body { font-family: Verdana; font-size:smaller; }
        li { padding-bottom: 7px; }
        input {width: 250px}
        .alignRight {text-align: right}
        #folderContent thead td { font-weight: bolder }
        #folderContent td { padding-right: 20px }
    </style>
</head>
	<body onload="init()">
	    <h1>WebDAV Server Engine v<%=System.Reflection.Assembly.GetAssembly(typeof(ITHit.WebDAV.Server.DavEngineAsync)).GetName().Version %></h1>
        <p><input type="button" onclick="OpenTestsWindow()" value="Run Integration Tests" /></p>
        <br />
        <p>Here are some ways of managing files on your WebDAV server:</p>
        <ul>
        <li>Use a WebDAV client provided with almost any OS. Refer to <a href="http://www.webdavsystem.com/server/access">Accessing WebDAV Server</a> page for detailed instructions. The button below is using <a href="http://www.webdavsystem.com/ajax/">IT Hit WebDAV Ajax Library</a> to mount WebDAV folder and open the default OS file manager:
		<p><input type="button" onclick="OpenFolder(webDavFolderUrl)" value="Browse using OS file manager" /></p>
        </li>
        <li>Use the IT Hit Ajax File Browser. You can <a href="http://www.webdavsystem.com/ajaxfilebrowser/programming/">deploy</a> all files required for Ajax File Browser UI to your website, or you can reference necessary files from IT Hit website.
        <p><input type="button" onclick="OpenAjaxFileBrowserWindow()" value="Browse using Ajax File Browser" /></p>
        </li>
        <li>Modify this page or <a href="http://www.webdavsystem.com/server/documentation/customization">your custom GET handler</a> to display content of your server. Examine the MyCustomHandlerPage.html/aspx in your project to see how to list folder content and to use IT Hit WebDAV Ajax Library <a href="http://www.webdavsystem.com/ajax/programming/opening_ms_office_docs">to open documents for editing</a>.
 
            <!--
	            JavaScript file and Java applet required to run WebDAV Ajax library are loaded from IT Hit website. 
	            To load files from your website download them here: http://www.webdavsystem.com/ajax/download, 
	            deploy them to your website and replace the 'http://www.ajaxbrowser.com/ITHitService/' path in this file.
            -->
            <script src="http://www.ajaxbrowser.com/ITHitService/WebDAVAJAXLibrary/ITHitWebDAVClient.js" type="text/javascript"></script>

            <p></p>
            <table id="folderContent">
              <thead>
                 <tr><td>Name</td><td class="alignRight">Size, b</td><td class="alignRight">Modified</td><td></td></tr>
              </thead>
            </table>
        </li>
        </ul>
	</body>
</html>