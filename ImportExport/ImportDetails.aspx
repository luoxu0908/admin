<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="ImportDetails.aspx.vb" Inherits="BizCubeMain.ImportDetails" %>
<%@ Register TagPrefix="cc4" Namespace="iContact" Assembly="iContact" %>
<%@ Register TagPrefix="cc1" Namespace="iControls" Assembly="iControls" %>
<%@ Register TagPrefix="cc2" Namespace="IGWebAppSecure" Assembly="IGWebAppSecure" %>
<%@ Register TagPrefix="telerik" Namespace="Telerik.Web.UI" Assembly="Telerik.Web.UI" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title>Import Summary</title>
  <cc1:SkinResource ID="sr1" runat="server" hrefs="/css/BizCube.css,/css/iContact/iContact.css,/css/PDate.css,/css/Paging.css,/css/tables.css,/css/iInvMgmt/iInvMgmt.css,/css/TelerikCustom.css,/css/Tabs.css"
    type="text/css" rel="stylesheet" />
  <script type="text/javascript" src="../../Scripts/jquery-1.5.min.js"></script>
  <script type="text/javascript"></script>
  <style type="text/css">
    .Req { color: Red; }
    .Hide { display: none; }
  </style>
</head>
<body>
  <form id="form1" runat="server">
  <telerik:RadStyleSheetManager ID="RadStyleSheetManager1" runat="server"></telerik:RadStyleSheetManager>
  <telerik:RadScriptManager ID="RadScriptManager1" runat="server"></telerik:RadScriptManager>
  <div class="PageTitle">
		<asp:Label ID="lblImportTitle" runat="server" Text="Import Details"></asp:Label>
  </div>
	<div id="divMain">
		<asp:Label ID="lblError" runat="server" Text="" CssClass="Warning"></asp:Label>
		<asp:RadioButtonList ID="rblShow" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow" AutoPostBack="True">
			<asp:ListItem Selected="True" Value="ERR">Import Errors only</asp:ListItem>
			<asp:ListItem Value="OK">Successful Import only</asp:ListItem>
			<asp:ListItem Value="ALL">All Records</asp:ListItem>
		</asp:RadioButtonList>  
		<asp:Panel ID="pnlPaging" runat="server">
			<div class="PggPageSel">
				Page:
				<asp:DropDownList ID="cmbPage" runat="server" AutoPostBack="True">
				</asp:DropDownList>
				of
				<asp:Label ID="lblTotalPages" runat="server"></asp:Label>
			</div>
			<div class="divPnlPgRecCnt">
				Matching Records: <b><u>
					<asp:Label ID="lblResultCount" runat="server"></asp:Label></u></b>
			</div>
			<div class="divPnlPgLbtns">
				<asp:LinkButton ID="FirstPage" runat="server" CausesValidation="False">[First Page]</asp:LinkButton>
				<asp:LinkButton ID="PrevPage" runat="server" CausesValidation="False">[Previous Page]</asp:LinkButton>
				<asp:LinkButton ID="NextPage" runat="server" CausesValidation="False">[Next Page]</asp:LinkButton>
				<asp:LinkButton ID="LastPage" runat="server" CausesValidation="False">[Last Page]</asp:LinkButton>&nbsp;
				<asp:LinkButton ID="lnkExport" runat="server">Export to Excel</asp:LinkButton>
			</div>
		</asp:Panel>
		<asp:DataGrid ID="dgImport" runat="server" CssClass="dgTable" AutoGenerateColumns="true"
			PageSize="30" GridLines="None" Width="100%" DataKeyField="RowNo">
			<AlternatingItemStyle CssClass="dgAltItem"></AlternatingItemStyle>
			<ItemStyle CssClass="dgItem"></ItemStyle>
			<HeaderStyle CssClass="dgHeader"></HeaderStyle>
		</asp:DataGrid>
  </div>
  </form>
</body>
</html>
