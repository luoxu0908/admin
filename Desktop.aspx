<%@ Register TagPrefix="cc2" Namespace="iControls" Assembly="iControls" %>
<%@ Register TagPrefix="cc1" Namespace="IGWebAppSecure" Assembly="IGWebAppSecure" %>
<%@ Register TagPrefix="date" Namespace="PeterBlum.PetersDatePackage" Assembly="PetersDatePackage" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Desktop.aspx.vb" Inherits="BizCubeMain.Desktop" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>Desktop</title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<%
			Response.Write( _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/BizCube.css"" type=""text/css"" rel=""stylesheet"">" & vbcrlf & vbtab & vbtab & _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/PDate.css"" type=""text/css"" rel=""stylesheet"">" & vbcrlf & vbtab & vbtab & _
				"<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/Desktop.css"" type=""text/css"" rel=""stylesheet"">" _
			)
		%>
		<script>
			function doResize()
			{
				if (document.getElementById('iFRMContacts') != null)
				{
					document.getElementById('iFRMContacts').style.height = window.frames['iFRMContacts'].document.body.scrollHeight;
				}
			}
			
			function seeStyle1(){
				document.body.className="NoBg Style1";
			}
			function seeStyle2(){
				document.body.className="NoBg Style2";
			}
			
		</script>
	</HEAD>
	<body class="NoBg Style1" MS_POSITIONING="FlowLayout" onload="doResize();" onresize="doResize();">
		<form id="Form1" method="post" runat="server">
			<input id="InfoID" type="hidden" value="0" runat="server">
			<div class="PageTitle" style="display:none;">
				<TABLE cellSpacing="0" cellPadding="0" border="0">
					<TR>
						<TD class="TDPageTitle">My Desktop</TD>
						<TD class="Quote"><asp:literal id="litRandomShard" runat="server"></asp:literal></TD>
					</TR>
				</TABLE>
			</div>
			<TABLE height="50%" cellSpacing="0" cellPadding="0" width="100%" border="0">
				<tr>
					<td class="Leftbar">
						<div id="divWelcome" runat="server">
							<asp:literal id="litWelcome" runat="server"></asp:literal><br>
							<span class="LastLoginText"><asp:literal id="litLastLogin" runat="server"></asp:literal></span>
						</div>
						<div id="divCalendar" runat="server" class="divCalender">
							<date:cs_calendar id="MyCalendar" runat="server" xSpecialDatesControlID="SDRush" xAutoPostBackOnSelectionChangeB="True"></date:cs_calendar><date:specialdates id="SDRush" runat="server"></date:specialdates>
						</div>
						<br>
						<div class="Corner">
							<div id="divEvent" runat="server">
								<cc1:redirectlinkbutton id="rlbtnEvents" runat="server" cssclass="LinkFloatRight" Redirect="True" URL="iContact/Calendar/CalendarW.aspx">details</cc1:redirectlinkbutton>
								<div class="DesktopSubTitle">Events</div>
								<asp:literal id="litEvents" runat="server"></asp:literal>
							</div>
							<div id="divTask" runat="server">
								<cc1:redirectlinkbutton id="rlbtnTask" runat="server" cssclass="LinkFloatRight" Redirect="True" URL="iContact/Calendar/CalendarW.aspx">details</cc1:redirectlinkbutton>
								<DIV class="DesktopSubTitle">Tasks</DIV>
								<asp:literal id="litTasks" runat="server"></asp:literal>
							</div>
						</div>
						<input type="button" value="Style1" onclick="seeStyle1();" style="display:none;">&nbsp;
						<input type="button" value="Style2" onclick="seeStyle2();" style="display:none;">
					</td>
					<td class="MainContent">
						<iframe class="MainBar" id="DesktopMain" name="DesktopMain" src="iForum/desktop.aspx" frameBorder="no" scrolling="no" runat="server"></iframe>
					</td>
					<td class="RightBar">
						<div class="Corner">
							<div id="divShortcut" runat="server">
								<div class="DesktopSubTitle">
									Shortcuts
								</div>
								<div class="Indent">
									<asp:literal id="litShortcuts" runat="server"></asp:literal>
								</div>
							</div>
							<div id="divSales" runat="server">
								<cc1:RedirectLinkButton id="rlbtnSales" runat="server" URL="iProject/Projects/SalesListing(Admin)2.aspx" Redirect="True" cssclass="LinkFloatRight">
										details
									</cc1:RedirectLinkButton>
								<DIV class="DesktopSubTitle">
									Sales
								</DIV>
							</div>
							<div class="Indent">
								<asp:literal id="litSales" runat="server"></asp:literal>
							</div>
							<div id="divProjects" runat="server">
								<cc1:RedirectLinkButton id="rlbtnProjs" runat="server" URL="iProject/Projects/SalesListing(Admin)2.aspx" Redirect="True" cssclass="LinkFloatRight">
										details
									</cc1:RedirectLinkButton>
								<DIV class="DesktopSubTitle">
									Projects
								</DIV>
							</div>
							<div class="Indent">
								<asp:literal id="litPrj" runat="server"></asp:literal>
							</div>
						</div>
						<div class="Corner">
							<div id="divContacts" runat="server">
								<cc1:RedirectLinkButton id="rlbtnContacts" runat="server" URL="iContact/ContactHome.aspx" Redirect="True"
									cssclass="LinkFloatRight">
										details
									</cc1:RedirectLinkButton>
								<DIV class="DesktopSubTitle">
									My Contacts
								</DIV>
								<iframe id="iFRMContacts" name="iFRMContacts" runat="server" class="ContactsList" src="iContact/Contacts/DesktopContactCards.aspx?WithImage=1&amp;Row=2&amp;Col=1" frameborder="no" scrolling="no"></iframe>
							</div>
						</div>
					</TD>
				</TR>
			</TABLE>
		</form>
	</body>
</HTML>
