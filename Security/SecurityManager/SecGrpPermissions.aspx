<%@ Page Language="vb" AutoEventWireup="false" Codebehind="SecGrpPermissions.aspx.vb" Inherits="IGWebAppSecure.SecGroupPermissions" enableViewState="True" enableViewStateMac="True" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>Security Group Permissions</title>
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
	<body MS_POSITIONING="GridLayout" id="bd" onscroll="iScrolled(document.getElementById('bd'));" onload="doInit();">
		<form id="Form1" method="post" runat="server">
			<div><asp:button id="btnRefresh" runat="server" Text="Refresh Data"></asp:button>
			<asp:label id="lblTitle" runat="server" CssClass="PageTitle">Security Group Assignments</asp:label></div>
			<TABLE id="Table3" cellSpacing="0" cellPadding="0" width="100%" border="0">
				<TR>
					<TD>
						<TABLE id="Table1" cellSpacing="0" cellPadding="0" width="100%" border="0">
							<TR>
								<TD style="WIDTH: 100%; HEIGHT: 29px;" vAlign="top"><asp:label id="lblGroup" runat="server" CssClass="Title">Groupname</asp:label></TD>
								<TD vAlign="top" align="right" colSpan="2" nowrap="true">
									<asp:radiobuttonlist id="rbView" runat="server" RepeatDirection="Horizontal" AutoPostBack="True" RepeatLayout="Flow">
										<asp:ListItem Value="GU" Selected="True">View Grp Users</asp:ListItem>
										<asp:ListItem Value="AU">View All Users</asp:ListItem>
										<asp:ListItem Value="GP">View Grp Permissions</asp:ListItem>
										<asp:ListItem Value="AP">View All Permissions</asp:ListItem>
										<asp:ListItem Value="GA">View Grp Abilities</asp:ListItem>
										<asp:ListItem Value="AA">View All Abiilties</asp:ListItem>
									</asp:radiobuttonlist></TD>
							</TR>
							<TR>
								<TD style="HEIGHT: 16px" vAlign="top" colSpan="3">
									<TABLE id="Table2" cellSpacing="0" cellPadding="0" width="100%" border="0">
										<tr>
											<td>&nbsp;</td>
											<td>
												<asp:panel id="pnlPaging" runat="server" Width="100%" Visible="False">
													<TABLE id="Table4" cellSpacing="0" cellPadding="0" width="100%" border="0">
														<TR>
															<TD class="divPnlPgLbtns" style="PADDING-LEFT: 5px">
																<asp:linkbutton id="FirstPage" runat="server" CssClass="Paging">[First Page]</asp:linkbutton>
																<asp:linkbutton id="PrevPage" runat="server" CssClass="Paging">[Previous Page]</asp:linkbutton>
																<asp:linkbutton id="NextPage" runat="server" CssClass="Paging">[Next Page]</asp:linkbutton>
																<asp:linkbutton id="LastPage" runat="server" CssClass="Paging">[Last Page]</asp:linkbutton></TD>
															<TD class="PggPageSel" style="PADDING-RIGHT: 5px" align="right">Page
																<asp:dropdownlist id="cmbPage" runat="server" AutoPostBack="True"></asp:dropdownlist>&nbsp;of
																<asp:label id="lblTotalPages" runat="server">1</asp:label></TD>
														</TR>
													</TABLE>
												</asp:panel>
											</td>
										</tr>
										<TR>
											<TD vAlign="top" align="left" height="1" rowSpan="3"><asp:datagrid id="DataGrid1" runat="server" CssClass="dgTable" Width="100%" EnableViewState="False"
													CellPadding="0" GridLines="None">
													<AlternatingItemStyle CssClass="dgAltItem"></AlternatingItemStyle>
													<ItemStyle CssClass="dgItem"></ItemStyle>
													<HeaderStyle CssClass="dgHeader"></HeaderStyle>
												</asp:datagrid></TD>
											<TD style="PADDING-LEFT: 5px" vAlign="top" align="left" height="1">
												<asp:label id="lblNoRecords" runat="server" CssClass="Validator" Visible="False">No records found for this criteria</asp:label></TD>
										</TR>
										<TR>
											<TD style="PADDING-LEFT: 5px; HEIGHT: 122px" vAlign="top" align="left"><asp:datagrid id="Datagrid2" runat="server" CssClass="dgTable" Width="100%" PageSize="50" GridLines="None">
													<AlternatingItemStyle CssClass="dgAltItem"></AlternatingItemStyle>
													<ItemStyle CssClass="dgItem"></ItemStyle>
													<HeaderStyle CssClass="DGHeader"></HeaderStyle>
												</asp:datagrid></TD>
										</TR>
									</TABLE>
								</TD>
							</TR>
						</TABLE>
					</TD>
				</TR>
			</TABLE>
			<input type="hidden" id="hScrollMem" runat="server" value="bd|0|0" name="hScrollMem"/>
		</form>
	</body>
</HTML>
