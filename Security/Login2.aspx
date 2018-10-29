<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Login.aspx.vb" Inherits="IGWebAppSecure.Login" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
	<head>
		<title>Login</title>
		<%
			Response.Write( _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/Sec/Security.css"" type=""text/css"" rel=""stylesheet"">" _
			)
		%>
		<script type="text/javascript">
			//<!--
			function setFocus() {
				if (document.getElementById('txtID') == null) {
					document.getElementById('txtPwd').focus();
				}
				else {
					document.getElementById('txtID').focus();
				}
			}
			function doEnter(e) {
				var pressLogin = false;
				if (window.event) {
					pressLogin = e.keyCode == 13;
				}
				else if (e.which) {
					pressLogin = e.which == 13;
				}
				if (pressLogin) {
					document.getElementById('btnLogin').click();
					return false;
				}
			}
			//-->
		</script>
    <style type="text/css">
    	.MainViewPort { position:absolute; top:50%; height:614px; margin-top:-307px; left:50%; width:819px; margin-left:-409px; }
    	.AllContents { position:relative; }
    	.ImgBkgd { position:absolute; }
    	.LoginBox { position:absolute; top:220px; left:387px; }
    </style>
	</head>
	<body>
		<form id="Form1" method="post" runat="server">
			<div class="MainViewPort">
			<div class="AllContents">
				<img class="ImgBkgd" src="../styles/default/images/Sec/LSBCLogIn_Test.jpg" alt="" />
				<div class="LoginBox">
					<table cellspacing="7" style="width: 284px; margin-left: 0px">
						<tr style="height:30px;">
							<td class="LoginTextStyleA"><asp:label id="lblID" runat="server">Username:</asp:label></td>
							<td><asp:textbox id="txtID" onkeydown="return doEnter(event);" runat="server" Width="226px"></asp:textbox></td>
						</tr>
						<tr style="height:30px;">
							<td class="LoginTextStyleA"><asp:label id="lblPwd" runat="server">Password:</asp:label></td>
							<td><asp:textbox id="txtPwd" onkeydown="return doEnter(event);" runat="server" TextMode="Password" Width="226px"></asp:textbox></td>
						</tr>
						<tr style="height:30px;">
							<td></td>
							<td class="LoginTextStyleA"><asp:CheckBox ID="chkRememberMe" runat="server" Text="Stay signed in" /></td>
						</tr>
						<tr style="height:17px;">
							<td colspan="2">&nbsp;</td>
						</tr>
						<tr style="height:40px;">
							<td></td>
							<td class="LoginTextStyleA"><asp:button id="btnLogin" runat="server" text="Sign In" Width="110px"></asp:button></td>
						</tr>
						<tr>
							<td></td>
							<td class="LoginTextStyleA"><asp:HyperLink id="hpForget" runat="server" NavigateUrl="../iContact/Contacts/EmailRetrieval.aspx" Target="_self">Can't access your account?</asp:HyperLink></td>
						</tr>
						<tr>
							<td rowspan="3" colspan="2" class="LoginTextStyleA"><asp:label id="lblStatus" runat="server" CssClass="Validator"></asp:label></td>
						</tr>
					</table>
				</div>
			</div>
			</div>
    </form>
	</body>
</html>