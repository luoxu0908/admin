<%@ Page Language="vb" AutoEventWireup="false" Codebehind="TargetPicker.aspx.vb" Inherits="IGWebAppSecure.TargetPicker"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>Target Picker</title>
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
		<style>
			.padd { PADDING-TOP: 4px }
			.MainTbl { Z-INDEX: 101; BOTTOM: 12px; POSITION: absolute; TOP: 0px; ; HEIGHT: expression(document.body.clientHeight-12) }
		</style>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<TABLE id="Table2" class="MainTbl" cellSpacing="0" cellPadding="0" width="100%" border="0">
				<TR>
					<TD colSpan="2" class="padd"><asp:label id="lblTitle" runat="server" CssClass="Title">Select Target(s)</asp:label></TD>
				</TR>
				<TR>
					<TD class="padd"><asp:radiobuttonlist id="rblType" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow" Width="170px"
							AutoPostBack="True">
							<asp:ListItem Value="G" Selected="True">Groups </asp:ListItem>
							<asp:ListItem Value="U">Users in Group </asp:ListItem>
						</asp:radiobuttonlist></TD>
					<TD><asp:dropdownlist id="cmbGroups" runat="server" Width="173px" AutoPostBack="True" DataTextField="SecGroupName"
							DataValueField="SecGroupID" Enabled="False"></asp:dropdownlist></TD>
				</TR>
				<TR>
					<TD class="padd" align="right">Starting with &nbsp;</TD>
					<TD class="padd"><asp:dropdownlist id="cmbAlpha" runat="server" Width="40px" AutoPostBack="True" Enabled="False">
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
						</asp:dropdownlist>&nbsp;
						<asp:linkbutton id="lnkDefault" runat="server" ToolTip="Sets this Group and Starting alphabet as my default">Set as default</asp:linkbutton></TD>
				</TR>
				<TR>
					<TD class="padd" colSpan="2"><asp:label id="lblNoRecords" runat="server" CssClass="Validator" Visible="False">No records matching your criteria were found!<br>Please try again with different selection criteria</asp:label></TD>
				</TR>
				<TR>
					<TD style="HEIGHT: 100%" colSpan="2" class="padd">
						<DIV id="scrlldiv" style="OVERFLOW: auto; WIDTH: 100%; HEIGHT: 100%" ms_positioning="FlowLayout"><asp:datagrid id="DataGrid1" runat="server" CssClass="dgtable" Width="100%" AutoGenerateColumns="False">
								<HeaderStyle CssClass="DGHeader"></HeaderStyle>
								<Columns>
									<asp:TemplateColumn HeaderText="Name">
										<ItemTemplate>
											<asp:CheckBox id="chk" runat="server" AutoPostBack="True"></asp:CheckBox>
										</ItemTemplate>
									</asp:TemplateColumn>
								</Columns>
							</asp:datagrid></DIV>
					</TD>
				</TR>
				<TR>
					<TD colSpan="2" class="padd"><asp:textbox id="txtTarget" runat="server" Width="100%" Height="56px" TextMode="MultiLine"></asp:textbox></TD>
				</TR>
				<TR>
					<TD colSpan="2" class="padd"><asp:button id="btnCancel" runat="server" Width="88px" Text="Back" CausesValidation="False"></asp:button>&nbsp;
						<asp:button id="btnRevert" runat="server" Width="88px" Text="Revert" CausesValidation="False"></asp:button>&nbsp;
						<asp:button id="btnUpdate" runat="server" Width="88px" Text="Update"></asp:button></TD>
				</TR>
			</TABLE>
		</form>
	</body>
</HTML>
