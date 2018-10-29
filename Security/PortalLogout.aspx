<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="PortalLogout.aspx.vb" Inherits="IGWebAppSecure.PortalLogout" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
	<head>
		<title>Logout</title>
	</head>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<DIV style="Z-INDEX: 102; LEFT: 24px; WIDTH: 776px; POSITION: absolute; TOP: 24px; HEIGHT: 160px"
				ms_positioning="FlowLayout"><FONT face="Arial" size="2">You have now logged out. 
					If your browser does not automatically redirect you in a few seconds, please 
					click </FONT>
				<asp:HyperLink id="HyperLink1" runat="server" NavigateUrl="../Portal/PortalLogin.aspx">here.</asp:HyperLink></DIV>
		</form>
	</body>
</html>
