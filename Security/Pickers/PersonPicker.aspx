<%@ Page Language="vb" AutoEventWireup="false" Codebehind="PersonPicker.aspx.vb" Inherits="IGWebAppSecure.PersonPicker" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>Person Picker</title>
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
		<style>
			.padd { PADDING-TOP: 4px }
			.MainTbl { Z-INDEX: 101; BOTTOM: 12px; POSITION: absolute; TOP: 0px; ; HEIGHT: expression(document.body.clientHeight-12) }
		</style>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<TABLE id="Table2" class="MainTbl" cellSpacing="0" cellPadding="0" width="100%" border="0">
				<tr>
					<TD colSpan="2" class="padd">
						<asp:label id="lblTitle" runat="server" CssClass="Title">Select Person</asp:label>
					</TD>
				</tr>
				<TR>
					<TD style="HEIGHT: 11px">From Group</TD>
					<TD style="HEIGHT: 11px">
						<asp:DropDownList id="cmbGroups" runat="server" DataValueField="SecGroupID" DataTextField="SecGroupName"
							Width="173px" AutoPostBack="True"></asp:DropDownList></TD>
				</TR>
				<TR>
					<TD class="padd">Starting with</TD>
					<TD class="padd">
						<asp:dropdownlist id="cmbAlpha" runat="server" Width="40px" AutoPostBack="True">
							<asp:ListItem Value="A" Selected="True">A</asp:ListItem>
							<asp:ListItem Value="B">B</asp:ListItem>
							<asp:ListItem Value="C">C</asp:ListItem>
							<asp:ListItem Value="D">D</asp:ListItem>
							<asp:ListItem Value="E">E</asp:ListItem>
							<asp:ListItem Value="F">F</asp:ListItem>
							<asp:ListItem Value="G">G</asp:ListItem>
							<asp:ListItem Value="H">H</asp:ListItem>
							<asp:ListItem Value="I">I</asp:ListItem>
							<asp:ListItem Value="J">J</asp:ListItem>
							<asp:ListItem Value="K">K</asp:ListItem>
							<asp:ListItem Value="L">L</asp:ListItem>
							<asp:ListItem Value="M">M</asp:ListItem>
							<asp:ListItem Value="N">N</asp:ListItem>
							<asp:ListItem Value="O">O</asp:ListItem>
							<asp:ListItem Value="P">P</asp:ListItem>
							<asp:ListItem Value="Q">Q</asp:ListItem>
							<asp:ListItem Value="R">R</asp:ListItem>
							<asp:ListItem Value="S">S</asp:ListItem>
							<asp:ListItem Value="T">T</asp:ListItem>
							<asp:ListItem Value="U">U</asp:ListItem>
							<asp:ListItem Value="V">V</asp:ListItem>
							<asp:ListItem Value="W">W</asp:ListItem>
							<asp:ListItem Value="X">X</asp:ListItem>
							<asp:ListItem Value="Y">Y</asp:ListItem>
							<asp:ListItem Value="Z">Z</asp:ListItem>
							<asp:ListItem Value="All">All</asp:ListItem>
						</asp:dropdownlist>&nbsp;&nbsp;&nbsp;Status
						<asp:dropdownlist id="ddlAccStatus" runat="server" AutoPostBack="True">
							<asp:ListItem Value="A">Active</asp:ListItem>
							<asp:ListItem Value="D">Disabled</asp:ListItem>
							<asp:ListItem Value="X">Terminated</asp:ListItem>
							<asp:ListItem Value="%">All</asp:ListItem>
						</asp:dropdownlist>&nbsp;
						<asp:LinkButton id="lnkDefault" runat="server" ToolTip="Sets this Group and Starting alphabet as my default">Set as default</asp:LinkButton></TD>
				</TR>
				<TR>
					<TD class="padd" colSpan="2">
						<asp:Label id="lblNoRecords" runat="server" CssClass="Validator" Visible="False">No records matching your criteria were found!<br>Please try again with different selection criteria</asp:Label>
					</TD>
				</TR>
				<TR>
					<TD class="padd" colSpan="2" style="HEIGHT: 100%">
						<DIV style="OVERFLOW: auto; WIDTH: 100%; HEIGHT: 100%" ms_positioning="FlowLayout">
							<asp:datagrid id="DataGrid1" runat="server" CssClass="dgTable" Width="100%" AutoGenerateColumns="False">
								<HeaderStyle CssClass="DGHeader"></HeaderStyle>
								<Columns>
									<asp:TemplateColumn HeaderText="Name">
										<ItemTemplate>
											<asp:LinkButton id="lnkBtn" runat="server" CommandName="SelectBoarder"></asp:LinkButton>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:BoundColumn Visible="False" DataField="Sel"></asp:BoundColumn>
								</Columns>
							</asp:datagrid></DIV>
					</TD>
				</TR>
				<TR>
					<TD colSpan="2" class="padd">
						<asp:button id="btnCancel" runat="server" Width="88px" Text="Back" CausesValidation="False"></asp:button></TD>
				</TR>
			</TABLE>
		</form>
	</body>
</HTML>
