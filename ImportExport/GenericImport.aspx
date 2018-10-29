<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="GenericImport.aspx.vb" Inherits="BizCubeMain.GenericImport" %>
<%@ Register TagPrefix="cc1" Namespace="iControls" Assembly="iControls" %>
<%@ Register TagPrefix="telerik" Namespace="Telerik.Web.UI" Assembly="Telerik.Web.UI" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
  <title>Import Module</title>
  <cc1:SkinResource ID="sr1" runat="server" hrefs="/css/BizCube.css,/css/tables.css,/css/Paging.css,/css/TelerikCustom.css,/css/BP/BP.css,/css/iProject/iProject.css,/css/TelerikCustom.css"
    type="text/css" rel="stylesheet" />
  <script type="text/javascript" src="../Scripts/jquery-1.5.min.js"></script>
</head>
<body>
  <form id="form1" runat="server">
  <telerik:RadStyleSheetManager ID="RadStyleSheetManager1" runat="server">
  </telerik:RadStyleSheetManager>
  <telerik:RadScriptManager ID="RadScriptManager1" runat="server">
  </telerik:RadScriptManager>
  <telerik:RadProgressManager ID="RadProgressManager1" runat="server" />
  <div class="PageTitle">
    <asp:Label ID="lblImportTitle" runat="server" Text="Import Manager"></asp:Label>
    <span id="spnMsg" runat="server" style="font:Arial; font-size:13px; font-weight:bold; color:Red; display:none;">
      <br /><asp:Label ID="lblMessage" runat="server" Text="Data import in progress. Please reload this page to refresh import status."></asp:Label>
    </span>
  </div>
  <div id="divMain" runat="server">
    <table border="0" cellpadding="1" cellspacing="1" style="padding-left:10px;">
      <tr>
        <td>
          <ol style="font-family: Arial; font-size: 11px">
            <li>Please select Microsoft Excel format (.xlsx/.xlsm) or tab-delimited format (.txt) for upload into the system.</li>
            <li>Note: Only sheets with the exact column order configured will be processed.</li>
          </ol>
        </td>
      </tr>
      <tr>
        <td>
          <asp:Label ID="lblError" runat="server" CssClass="warning" Text=""></asp:Label>
        </td>
      </tr>
      <tr>
        <td style="padding-left: 20px;">
          <telerik:RadUpload ID="ruItems" runat="server" ControlObjectsVisibility="None" MaxFileInputsCount="1"
            MaxFileSize="50000000" Skin="Default">
          </telerik:RadUpload>
        </td>
      </tr>
      <tr>
        <td style="padding-left: 20px;">
          <telerik:RadProgressArea ID="RadProgressArea1" runat="server" ProgressIndicators="TotalProgressBar, TotalProgress, TotalProgressPercent, RequestSize"
            Height="155px" Width="265px" Skin="Web20">
          </telerik:RadProgressArea>
        </td>
      </tr>
      <tr>
        <td style="padding-left: 20px;">
					<cc1:singleclickbutton id="btnUpload" runat="server" Text="Upload" Width="80"></cc1:singleclickbutton>
        </td>
      </tr>
    </table>
  </div>
  <div id="divImportTbl" runat="server" style="font-family:Arial; font-size:small;">
    <br /><strong>My recent imported records:</strong><br />
    <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="ImportID">
      <Columns>
				<asp:BoundField DataField="Description" HeaderText="Description" SortExpression="Description" />
				<asp:BoundField DataField="ImportFile" HeaderText="Import File" SortExpression="ImportFile" />
        <asp:BoundField DataField="Started" HeaderText="Started" SortExpression="Started" />
        <asp:BoundField DataField="Ended" HeaderText="Ended" SortExpression="Ended" />
        <asp:BoundField DataField="Status" HeaderText="Status" SortExpression="Status" />
        <asp:BoundField DataField="Result" HeaderText="Result" SortExpression="Result" />
        <asp:BoundField DataField="DoneBy" HeaderText="Done By" SortExpression="DoneBy" />
        <asp:TemplateField>
          <ItemTemplate>
            <asp:HyperLink ID="HLDetails" runat="server" Text="Import details" NavigateUrl='<%# "ImportDetails.aspx?ImpRunID=" & Container.DataItem("ImportRunID")%>'></asp:HyperLink>
          </ItemTemplate>
        </asp:TemplateField>
        <asp:TemplateField>
          <ItemTemplate>
            <asp:HyperLink ID="HLSample" runat="server" Text="Sample format" NavigateUrl='<%# "ImportSample.aspx?ImpID=" & Container.DataItem("ImportID")%>' Target="DLSample"></asp:HyperLink>
          </ItemTemplate>
        </asp:TemplateField>
        <asp:TemplateField>
          <ItemTemplate>
            <asp:HyperLink ID="HLAdmin" runat="server" Text="Admin format" NavigateUrl='<%# "ImportSample.aspx?AdminFormat=1&ImpID=" & Container.DataItem("ImportID")%>' Target="DLAdmin"></asp:HyperLink>
          </ItemTemplate>
        </asp:TemplateField>
      </Columns>
    </asp:GridView>
  </div>
  </form>
</body>
</html>