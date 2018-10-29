<%@ Page Language="vb" AutoEventWireup="false" Codebehind="ChangeMyPwd.aspx.vb" Inherits="IGWebAppSecure.ChangeMyPwd" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>Change My Password</title>
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
			<TABLE id="Table2" style="Z-INDEX: 103; LEFT: 8px; POSITION: absolute; TOP: 8px" cellSpacing="0"
				cellPadding="0" width="100%" border="0">
				<TR>
					<TD colSpan="3">
						<asp:Label id="lblTitle" runat="server" CssClass="PageTitle">Change My Password</asp:Label></TD>
				</TR>
				<TR>
					<TD colSpan="3"><FONT size="1">&nbsp;</FONT></TD>
				</TR>
				<TR>
					<TD style="WIDTH: 121px">Old Password</TD>
					<TD colSpan="2">
						<asp:TextBox id="txtOldpwd" runat="server" TextMode="Password"></asp:TextBox></TD>
				</TR>
				<TR>
					<TD style="WIDTH: 121px">New Password</TD>
					<TD colSpan="2">
						<asp:TextBox id="txtNewpwd" runat="server" TextMode="Password"></asp:TextBox>&nbsp;
						<asp:RequiredFieldValidator id="RequiredFieldValidator1" runat="server" CssClass="Validator" ControlToValidate="txtNewpwd"
							ErrorMessage="Zero-length passwords not allowed" Display="Dynamic"></asp:RequiredFieldValidator></TD>
				</TR>
				<TR>
					<TD style="WIDTH: 121px">Confirm Password</TD>
					<TD colSpan="2">
						<asp:TextBox id="txtConfirmpwd" runat="server" TextMode="Password"></asp:TextBox>&nbsp;
						<asp:CompareValidator id="CompareValidator1" runat="server" ErrorMessage="New Password / Confirm Password must be the same"
							ControlToCompare="txtNewpwd" ControlToValidate="txtConfirmpwd" CssClass="Validator" Display="Dynamic"></asp:CompareValidator></TD>
				</TR>
				<TR>
					<TD colSpan="3"><FONT size="1">&nbsp;</FONT></TD>
				</TR>
				<TR>
					<TD colSpan="3">
						<asp:Label id="lblOutput" runat="server"></asp:Label></TD>
				</TR>
				<TR>
					<TD colSpan="3">
						<asp:Button id="btnSubmit" runat="server" Text="Submit"></asp:Button></TD>
				</TR>
			</TABLE>
		</form>
	</body>
</HTML>
