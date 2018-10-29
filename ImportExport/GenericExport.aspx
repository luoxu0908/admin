<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="GenericExport.aspx.vb" Inherits="BizCubeMain.GenericExport" %>

<%@ Register TagPrefix="cc1" Namespace="iControls" Assembly="iControls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
	<title>Export Module</title>
	<cc1:SkinResource ID="sr1" runat="server" hrefs="/css/BizCube.css,/css/tables.css,/css/Paging.css,/css/TelerikCustom.css,/css/BP/BP.css,/css/iProject/iProject.css,/css/TelerikCustom.css"
		type="text/css" rel="stylesheet" />
	<script type="text/javascript" src="../../Scripts/jquery-1.5.min.js"></script>
</head>
<body>
	<form id="form1" runat="server">
	<div class="PageTitle">
		<asp:Label ID="lblExportTitle" runat="server" Text="Export Manager"></asp:Label>
	</div>
	<div id="divExportTbl" runat="server" style="font-family:Arial; font-size:small;">
		<br /><strong>Export formats:</strong><br />
		<asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="ExportID">
			<Columns>
				<asp:BoundField DataField="ExportDescription" HeaderText="Description" SortExpression="ExportDescription" />
				<asp:BoundField DataField="ExportFormat" HeaderText="Format" SortExpression="ExportFormat" />
				<asp:BoundField DataField="Exported By" HeaderText="Exported By" SortExpression="SL.DispName" />
				<asp:BoundField DataField="ExportedOn" HeaderText="Last Exported" SortExpression="ExportedOn" />
				<asp:TemplateField>
					<ItemTemplate>
						<asp:LinkButton ID="LBExport" runat="server" Text="Export" CommandName="Exp" CommandArgument='<%# Container.DataItem("ExportID")%>' ></asp:LinkButton>
					</ItemTemplate>
				</asp:TemplateField>
			</Columns>
		</asp:GridView>
	</div>
	</form>
</body>
</html>