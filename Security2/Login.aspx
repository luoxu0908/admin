<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Login.aspx.vb" Inherits="IGWebAppSecure.Login1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
	<meta HTTP-EQUIV="refresh" content="0;url=../index.htm">
    <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Login</title>
	<link type="text/css" rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/themes/smoothness/jquery-ui.css"/>
	<link rel="stylesheet" type="text/css" href="../styles/Master.css" />
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="../Scripts/Master.js"></script>
	<script type="text/javascript" src="../Scripts/Security.js"></script>
	<script type="text/javascript">
		$(document).ready(function () {
			CookieIsActive();
			$("#Submit").on('click', function () { DoLogin(); });
			$("#Password").keypress(function (e) { if (e.keyCode == 13) { DoLogin(); } });
			Resized();

			$(window).on('resize', function () { Resized(); });
			$(window).load(function () {
				Resized();
				$.JSONPost("Sec1.LoginViaRememberMe.json", "", { ShowErrMsg: false })
          .done(function (data) { $(top.location).attr('href', 'index.htm'); });
			});

			function DoLogin() {
				var rememberme;
				if ($('#chkRememberMe').is(":checked")) { rememberme = true; }
				else { rememberme = false; }
				Login($("#Username").val(), $("#Password").val(), rememberme)
					.done(function (data) {
						var issuccess = ReturnMsg(data, "ReturnMsg");
						if (issuccess == -1) {
							if (data.d.RetData.indexOf('json') < 0) {
								$.cookie("CurrPage", null);
								$.cookie("CurrPage", data.d.RetData, { path: '/', expires: 7 });
							}
							$(window.location).attr('href', 'index.htm');
						}
					})
					.fail(function (data) { alert('Login failed'); });
			}

			function position() {
				$("#innerdiv").position({ of: $("#parentdiv"), my: "center center", at: "center center", offset: "0 -30" });
			}
			function imgposition() {
				$("#tablediv").position({ of: $("#imgdiv"), my: "center center", at: "center center", offset: "-20 60" });
			}
			function Resized() {
				var winwidth = $(window).width(); var winheight = $(window).height();
				$("#parentdiv").width(winwidth); $("#parentdiv").height(winheight);
				position(); imgposition();
			};
			$("#Username").focus();
		});
	</script>
    <style type="text/css">
        .rowheight{height:35px}
    </style> 
	<noscript>Javascript is disabled<meta HTTP-EQUIV="REFRESH" content="0; url=EnableJavascript.htm"> </noscript>
</head>
<body style="overflow:hidden;">
	<div id="parentdiv">
		<div style="position: absolute;" id="innerdiv">
			<div id="imgdiv" style="height :300px"><img src="../styles/default/images/Sec/loginbg.jpg" alt="" /></div>
			<div id="tablediv" style="position: absolute;background:transparent;">
				<table>
					<tr>
						<td class="rowheight">Username</td>
						<td><input id="Username" type="text" /></td>
					</tr>
					<tr>
						<td class="rowheight">Password</td>
						<td><input id="Password" type="password" /></td>
					</tr>
					<tr>
						<td></td>
						<td><input type="checkbox" ID="chkRememberMe" name="chkRememberMe"/><label for="chkRememberMe">Stay signed in</label></td>
					</tr>
					<tr>
						<td class="rowheight"></td>
						<td><a href="../iContact/Contacts/EmailRetrieval.aspx" id="ForgetPass">Can't access your account?</a>
						</td>
					</tr>
					<tr>
						<td class="rowheight"></td>
						<td><input id="Submit" type="button" value="Login"/></td>
					</tr>
					<tr>
						<td class="rowheight"></td>
						<td><div id="wait"></div></td>
					</tr>
				</table>
			</div>
			<div id="ReturnMsg"></div>
		</div>
	</div>
</body>
</html>
