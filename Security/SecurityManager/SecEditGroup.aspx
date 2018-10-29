<%@ Page Language="vb" AutoEventWireup="false" Codebehind="SecEditGroup.aspx.vb" Inherits="IGWebAppSecure.SecEditGroup" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>SecEditGroup</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" content="Visual Basic .NET 7.1">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <%
			Response.Write( _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/BizCube.css"" type=""text/css"" rel=""stylesheet"">" & vbcrlf & vbtab & vbtab & _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/tables.css"" type=""text/css"" rel=""stylesheet"">" & vbcrlf & vbtab & vbtab & _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/Paging.css"" type=""text/css"" rel=""stylesheet"">" & vbcrlf & vbtab & vbtab & _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/Tabs.css"" type=""text/css"" rel=""stylesheet"">" & vbcrlf & vbtab & vbtab & _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/Sec/Security.css"" type=""text/css"" rel=""stylesheet"">" _
			)
		%>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<asp:Label id="lblTitle" runat="server" CssClass="PageTitle">Edit Group</asp:Label>
			<TABLE id="Table2" cellSpacing="0" cellPadding="0" width="536" border="0">
				<TR>
					<TD >GroupID</TD>
					<TD>
						<asp:label id="lblSecGroupID" runat="server"></asp:label></TD>
					<TD style="WIDTH: 41px; HEIGHT: 13px"></TD>
				</TR>
				<TR>
					<TD >Group Name
						<asp:RequiredFieldValidator id="RequiredFieldValidator1" runat="server" ErrorMessage="The field 'Group Name' is required"
							Display="Dynamic" ControlToValidate="txtGroupName" CssClass="Validator">*</asp:RequiredFieldValidator>
						<asp:CustomValidator id="CustomValidator1" runat="server" ErrorMessage="Group Name conflict with existing Group / Username - Please try another Group Name"
							Display="Dynamic" ControlToValidate="txtGroupName" OnServerValidate="ValidateGroupName" EnableClientScript="False"
							CssClass="Validator">*</asp:CustomValidator></TD>
					<TD>
						<asp:TextBox id="txtGroupName" runat="server" Width="176px" Enabled="False"></asp:TextBox>&nbsp;
						<asp:button id="btnChange" runat="server" Width="144px" Text="Change Group Name"></asp:button></TD>
					<TD></TD>
				</TR>
				<TR>
					<TD >Default Start Page</TD>
					<TD>
						<asp:TextBox id="txtStartURL" runat="server" Width="365px"></asp:TextBox></TD>
					<TD></TD>
				</TR>
				<TR>
					<TD >Start Page Priority</TD>
					<TD>
						<asp:TextBox id="txtStartURLPriority" runat="server" Width="48px"></asp:TextBox>
            (Higher values have higher priority)</TD>
					<TD>&nbsp;</TD>
				</TR>
				<TR>
					<TD colSpan="3"><FONT size="1">&nbsp;</FONT></TD>
				</TR>
				<TR>
					<TD colSpan="3">
						<asp:ValidationSummary id="ValidationSummary1" runat="server" CssClass="Validator"></asp:ValidationSummary></TD>
				</TR>
				<TR>
					<TD style="WIDTH: 319px; HEIGHT: 9px" colSpan="3">
						<asp:button id="btnCancel" runat="server" Width="88px" Text="Back" CausesValidation="False"></asp:button>&nbsp;
						<asp:button id="btnRevert" runat="server" Width="88px" Text="Revert" CausesValidation="False"></asp:button>&nbsp;
						<asp:button id="btnUpdate" runat="server" Width="88px" Text="Update"></asp:button></TD>
				</TR>
			</TABLE>
		</form>
	</body>
</HTML>
