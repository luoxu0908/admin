<%@ Page Language="vb" AutoEventWireup="false" Codebehind="SecEditResGroup.aspx.vb" Inherits="IGWebAppSecure.SecEditResGroup" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>SecEditResGroup</title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<%
			Response.Write( _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/BizCube.css"" type=""text/css"" rel=""stylesheet"">" & vbcrlf & vbtab & vbtab & _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/tables.css"" type=""text/css"" rel=""stylesheet"">" & vbcrlf & vbtab & vbtab & _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/Paging.css"" type=""text/css"" rel=""stylesheet"">" & vbcrlf & vbtab & vbtab & _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/Tabs.css"" type=""text/css"" rel=""stylesheet"">" & vbcrlf & vbtab & vbtab & _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/Sec/Security.css"" type=""text/css"" rel=""stylesheet"">" _
			)
		%>
		<script>
			function checkWidth(src, args)
			{
				args.IsValid = /^\d+$/.test(document.getElementById('txtWidth').value);
			}
			
			function checkHeight(src, args)
			{
				args.IsValid = /^\d+$/.test(document.getElementById('txtHeight').value);
			}
		</script>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<asp:label id="lblTitle" runat="server" CssClass="PageTitle">Edit Resource/Group Permissions</asp:label>
			<TABLE id="Table2" cellSpacing="0" cellPadding="0" width="100%" border="0">
				<TR>
					<TD>Resource
						<asp:requiredfieldvalidator id="RequiredFieldValidator1" runat="server" CssClass="Validator" ErrorMessage="The field 'Resource' is required"
							Display="Dynamic" ControlToValidate="txtURL">*</asp:requiredfieldvalidator></TD>
					<TD colSpan="2"><asp:textbox id="txtURL" runat="server" Width="414px"></asp:textbox>&nbsp;</TD>
				</TR>
				<TR>
					<TD>Security Group</TD>
					<TD colSpan="2"><asp:dropdownlist id="cmbSecGroup" runat="server" Width="232px"></asp:dropdownlist>
						<asp:button id="btnLoad" runat="server" Width="152px" Text="Load Group Settings"></asp:button></TD>
				</TR>
				<TR>
					<TD colSpan="3">
						<TABLE id="Table1" style="WIDTH: 688px" cellSpacing="0" cellPadding="0" width="688" border="0">
							<TR>
								<TD style="WIDTH: 664px" colSpan="5">&nbsp;</TD>
							</TR>
							<TR>
								<TD style="WIDTH: 5px"></TD>
								<TD style="WIDTH: 663px" width="663" colSpan="4"><asp:checkbox id="Grant" runat="server" Text="Grant Access"></asp:checkbox>&nbsp;</TD>
							</TR>
							<TR>
								<TD style="WIDTH: 5px"></TD>
								<TD style="WIDTH: 13%">&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:label id="lblMenuName" runat="server" Width="88px" Height="8px">Menu Name</asp:label></TD>
								<TD style="WIDTH: 351px"><asp:textbox id="txtMenuName" runat="server" Width="324px"></asp:textbox></TD>
								<td style="WIDTH: 210px" colSpan="2">
									<asp:checkbox id="PopupSetting" runat="server" Text="Popup Window"></asp:checkbox></td>
							</TR>
							<TR>
								<TD style="WIDTH: 5px"></TD>
								<TD style="WIDTH: 13%">&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:label id="lblContext" runat="server" Width="88px" Height="8px"> Context</asp:label></TD>
								<TD style="WIDTH: 351px">
									<asp:textbox id="txtContext" runat="server" Width="144px" MaxLength="30"></asp:textbox></TD>
								<TD style="WIDTH: 210px" colSpan="2">&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:checkbox id="StatusBar" runat="server" Text="Status Bar" Checked="True"></asp:checkbox></TD>
							</TR>
							<TR>
								<TD style="WIDTH: 5px"></TD>
								<TD style="WIDTH: 13%">&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:label id="lblMenuType" runat="server" Width="88px" Height="8px">Menu Type</asp:label></TD>
								<TD style="WIDTH: 351px"><asp:dropdownlist id="cmbMenuType" runat="server" AutoPostBack="True" Width="84px">
										<asp:ListItem>Text</asp:ListItem>
										<asp:ListItem Value="Separator">Separator</asp:ListItem>
									</asp:dropdownlist></TD>
								<td style="WIDTH: 210px" colSpan="2">&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:checkbox id="ScrollBars" runat="server" Text="Scrollbars" Checked="True"></asp:checkbox></td>
							</TR>
							<TR>
								<TD style="WIDTH: 5px"></TD>
								<TD style="WIDTH: 13%">&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:label id="lblFrameTarget" runat="server" Width="88px" Height="8px">Frame Target</asp:label></TD>
								<TD style="WIDTH: 351px"><asp:textbox id="txtFrameTarget" runat="server" Width="144px" MaxLength="30"></asp:textbox></TD>
								<TD style="WIDTH: 210px" colSpan="2">&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:checkbox id="Resizable" runat="server" Text="Resizable" Checked="True"></asp:checkbox></TD>
							</TR>
							<TR>
								<TD style="WIDTH: 5px"></TD>
								<TD style="WIDTH: 13%">&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:label id="lblDefaultCss" runat="server" Width="88px" Height="8px">Default Css</asp:label></TD>
								<TD style="WIDTH: 351px">
									<asp:textbox id="txtDefaultCss" runat="server" Width="144px" MaxLength="30"></asp:textbox></TD>
								<td style="WIDTH: 80px" noWrap>&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:label id="lblHeight" Runat="server">Height</asp:label>
									<asp:customvalidator id="cvHeight" runat="server" ControlToValidate="txtHeight" Display="Dynamic" ErrorMessage="Invalid Height"
										ClientValidationFunction="checkHeight" ToolTip="Height must be >  0 <= then client screen resolution">*</asp:customvalidator>
									<asp:RequiredFieldValidator id="rfHeight" runat="server" ControlToValidate="txtHeight" Display="Dynamic" ErrorMessage="Height is required">*</asp:RequiredFieldValidator></td>
								<td style="WIDTH: 130px" noWrap>
									<asp:textbox id="txtHeight" Width="48px" MaxLength="4" Runat="server">0</asp:textbox>px</td>
							</TR>
							<TR>
								<TD style="WIDTH: 5px"></TD>
								<TD style="WIDTH: 13%">&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:label id="lblMouseOverCss" runat="server" Width="110px" Height="8px">Mouse Over Css</asp:label></TD>
								<TD style="WIDTH: 351px">
									<asp:textbox id="txtMouseOverCss" runat="server" Width="144px" MaxLength="30"></asp:textbox></TD>
								<td style="WIDTH: 80px" noWrap>&nbsp;&nbsp;&nbsp;&nbsp;
									<asp:label id="lblWidth" Runat="server">Width</asp:label>
									<asp:customvalidator id="cvWidth" runat="server" ControlToValidate="txtWidth" Display="Dynamic" ErrorMessage="Invalid Width"
										ClientValidationFunction="checkWidth" ToolTip="Width must be >  0 <= then client screen resolution">*</asp:customvalidator>
									<asp:RequiredFieldValidator id="rfWidth" runat="server" ControlToValidate="txtWidth" Display="Dynamic" ErrorMessage="Width is required">*</asp:RequiredFieldValidator></td>
								<td style="WIDTH: 130px" noWrap>
									<asp:textbox id="txtWidth" Width="48px" MaxLength="4" Runat="server">0</asp:textbox>px</td>
							</TR>
							<TR>
								<TD style="WIDTH: 5px"></TD>
								<TD style="WIDTH: 663px" colSpan="4"></TD>
							</TR>
							<TR>
								<TD style="WIDTH: 5px"></TD>
								<TD style="WIDTH: 12.69%" colSpan="4"><asp:validationsummary id="ValidationSummary1" runat="server" CssClass="Validator"></asp:validationsummary></TD>
							</TR>
							<TR>
								<TD style="WIDTH: 664px" colSpan="5">&nbsp;</TD>
							</TR>
							<TR>
								<TD style="WIDTH: 664px; HEIGHT: 11px" colSpan="5"><asp:button id="btnCancel" runat="server" Width="88px" Text="Back" CausesValidation="False"></asp:button>&nbsp;
									<asp:button id="btnRevert" runat="server" Width="88px" Text="Revert" CausesValidation="False"></asp:button>&nbsp;
									<asp:button id="btnUpdate" runat="server" Width="88px" Text="Update"></asp:button></TD>
							</TR>
						</TABLE>
					</TD>
				</TR>
			</TABLE>
		</form>
	</body>
</HTML>
