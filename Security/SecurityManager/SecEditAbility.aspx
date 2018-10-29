<%@ Page Language="vb" AutoEventWireup="false" Codebehind="SecEditAbility.aspx.vb" Inherits="IGWebAppSecure.SecEditAbility" %>
<%@ Register TagPrefix="cc1" Namespace="IGWebAppSecure" Assembly="IGWebAppSecure" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>SecEditAbility</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" content="Visual Basic .NET 7.1">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    	<%
			Response.Write( _
				"<LINK href=""" & Session("SkinPath") & "/CSS/BizCube.css"" type=""text/css"" rel=""stylesheet"">" & vbcrlf & vbtab & vbtab & _
				"<LINK href=""" & Session("SkinPath") & "/CSS/tables.css"" type=""text/css"" rel=""stylesheet"">" & vbcrlf & vbtab & vbtab & _
				"<LINK href=""" & Session("SkinPath") & "/CSS/Sec/Security.css"" type=""text/css"" rel=""stylesheet"">" & vbcrlf & vbtab & vbtab & _
				"<LINK href=""" & Session("SkinPath") & "/CSS/Paging.css"" type=""text/css"" rel=""stylesheet"">" _
			)
		%>
		<script>
			function doResize()
			{
				document.getElementById('dvError').style.height = document.getElementById('dvTitle').offsetHeight;
				document.getElementById('dvDG').style.height = document.body.clientHeight - document.getElementById('dvDG').offsetTop - 30;
			}
			
			function iScrolled(obj)
			{
				document.getElementById('hScrollMem').value = obj.id + '|' + obj.scrollTop + '|' + obj.scrollLeft;
			}
			
			function doInit()
			{
				var sms = document.getElementById('hScrollMem').value.split('|');
				document.getElementById(sms[0]).scrollTop = sms[1];
				document.getElementById(sms[0]).scrollLeft = sms[2];
			}
		</script>
	</HEAD>
	<body onload="doResize();doInit();" onresize="doResize();">
		<form id="Form1" method="post" runat="server">
			<div id="dvError" Class="FloatR">
				<asp:label id="lblError" Runat="server" CssClass="warning"></asp:label>
				<asp:validationsummary id="vsThisPage" runat="server" Width="100%"></asp:validationsummary>
			</div>
			<asp:Button ID="btnRefresh" Runat="server" Text="Refresh Data" CausesValidation="False" Visible="False"></asp:Button>
			<div id="dvTitle" class="PageTitle">
				<asp:Label ID="lblTitle" Runat="server">Module Ability</asp:Label>
			</div>
			<table cellpadding="0" cellspacing="0" border="0" width="100%">
				<tr>
					<td>
						Module Name
						<asp:RequiredFieldValidator ID="rfvModule" Runat="server" ControlToValidate="txtModule" ErrorMessage="Module Name is required">*</asp:RequiredFieldValidator>
					</td>
					<td><asp:TextBox id="txtModule" Runat="server" MaxLength="50"></asp:TextBox></td>
					<td>
						Ability
						<asp:RequiredFieldValidator ID="rfvAbility" Runat="server" ControlToValidate="txtAbility" ErrorMessage="Ability is required">*</asp:RequiredFieldValidator>
					</td>
					<td><asp:TextBox id="txtAbility" Runat="server" MaxLength="50"></asp:TextBox></td>
					<td><asp:Button ID="btnSave" Runat="server" Text="Save" Width="80px"></asp:Button></td>
				</tr>
				<tr id="trFilter" runat="server">
					<td>URL Starting with:</td>
					<td colspan="2"><asp:TextBox ID="txtFilter" Runat="server" MaxLength="300" Width="80%" onkeydown="if (event.keyCode == 13) {document.getElementById('btnReload').click();return false;}"></asp:TextBox></td>
					<td><asp:CheckBox ID="cbxShowAll" Runat="server" Checked="True" Text="Show All"></asp:CheckBox></td>
					<td><asp:Button ID="btnReload" Runat="server" Text="Apply Filter" CausesValidation="False" Width="80px"></asp:Button></td>
				</tr>
			</table>
			<asp:panel id="pnlPaging" runat="server">
				<DIV class="PggPageSel">
					Page:&nbsp;<asp:DropDownList id="cmbPage" runat="server" AutoPostBack="True"></asp:DropDownList>
					of&nbsp;<asp:Label id="lblTotalPages" runat="server"></asp:Label>
				</DIV>
				<DIV class="divPnlPgRecCnt">
					Matching Records:&nbsp;<B><U><asp:Label id="lblResultCount" Runat="server"></asp:Label></U></B>
				</DIV>
				<DIV class="divPnlPgLbtns">
					<asp:LinkButton id="FirstPage" runat="server" CausesValidation="False">[First Page]</asp:LinkButton>
					<asp:LinkButton id="PrevPage" runat="server" CausesValidation="False">[Previous Page]</asp:LinkButton>
					<asp:LinkButton id="NextPage" runat="server" CausesValidation="False">[Next Page]</asp:LinkButton>
					<asp:LinkButton id="LastPage" runat="server" CausesValidation="False">[Last Page]</asp:LinkButton>
				</DIV>
			</asp:panel>
			<div class="OFA" id="dvDG" onscroll="iScrolled(this);">
				<asp:DataGrid ID="dgURLs" Runat="server" GridLines="None" CssClass="dgTable" AutoGenerateColumns="False" Width="100%" PageSize="50" DataKeyField="RelativeURL">
					<HeaderStyle CssClass="dgHeaderFixed dgHeader"></HeaderStyle>
					<ItemStyle CssClass="dgItem"></ItemStyle>
					<AlternatingItemStyle CssClass="dgAltItem"></AlternatingItemStyle>
					<Columns>
						<asp:TemplateColumn>
							<ItemTemplate>
								<asp:CheckBox ID="cbxSelected" Runat="server" Checked='<%# NOT IsDbNull(DataBinder.Eval(Container.DataItem, "ModuleName")) %>' AutoPostBack="True"></asp:CheckBox>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="Relative URL">
							<ItemTemplate>
								<asp:Literal ID="litURLs" Runat="server" Text='<%# HttpContext.Current.Server.HtmlEncode(DataBinder.Eval(Container.DataItem, "RelativeURL")) %>'></asp:Literal>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="Menu Name">
							<ItemTemplate>
								<asp:Literal ID="litMenu" Runat="server" Text='<%# HttpContext.Current.Server.HtmlEncode(DataBinder.Eval(Container.DataItem, "MenuName")) %>'></asp:Literal>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="Cmd">
							<ItemTemplate>
								<cc1:RedirectLinkButton id="lbnEditRes" runat="server" Text='Edit' URL='<%# "SecEditResGroup.aspx?RES=" & Replace(DataBinder.Eval(Container.DataItem, "RelativeURL"),"&","?") & "&GID=-1" %>' Redirect="True" Statusbar="True" Scrollable="True" Resizable="True" PWidth="700" PHeight="350" IsPopup="True"></cc1:RedirectLinkButton>
							</ItemTemplate>
						</asp:TemplateColumn>
					</Columns>
				</asp:DataGrid>
			</div>
			<asp:button id="btnCancel" runat="server" Width="88px" Text="Back" CausesValidation="False"></asp:button>&nbsp;
			<input type="hidden" id="hScrollMem" runat="server" value="dvDG|0|0"/>
			<input type="hidden" id="hRefresh" runat="server" value="0"/>
	    </form>
	</body>
</HTML>
