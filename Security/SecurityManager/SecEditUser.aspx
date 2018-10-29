<%@ Page Language="vb" AutoEventWireup="false" Codebehind="SecEditUser.aspx.vb" Inherits="IGWebAppSecure.SecEditUser" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
  <HEAD>
    <title>SecEditUser</title>
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
  </HEAD>
  <body MS_POSITIONING="GridLayout">
    <form id="Form1" method="post" runat="server">
      <asp:label id="lblTitle" runat="server" CssClass="PageTitle">Edit User</asp:label>
      <TABLE id="Table2" cellSpacing="0" cellPadding="0" width="702" border="0">
        <TR>
          <TD style="WIDTH: 124px">LoginID</FONT></TD>
          <TD><asp:label id="lblLoginID" runat="server"></asp:label></TD>
        </TR>
        <TR>
          <TD style="WIDTH: 124px">Username</FONT>
            <asp:requiredfieldvalidator id="RequiredFieldValidator2" runat="server" CssClass="Validator" ErrorMessage="The field 'Username' is required"
              ControlToValidate="txtUserName" Display="Dynamic">*</asp:requiredfieldvalidator><asp:customvalidator id="CustomValidator1" runat="server" CssClass="Validator" ErrorMessage="Username conflict with existing User/Group Name - Please try another Username"
              ControlToValidate="txtUserName" Display="Dynamic" EnableClientScript="False" OnServerValidate="ValidateUsername">*</asp:customvalidator></TD>
          <TD><asp:textbox id="txtUserName" runat="server" MaxLength="44" Width="104px"></asp:textbox>&nbsp;
            <asp:button id="btnChange" runat="server" Width="144px" Text="Change Username"></asp:button></TD>
        </TR>
        <TR>
          <TD style="WIDTH: 124px">Display Name</FONT>
            <asp:requiredfieldvalidator id="RequiredFieldValidator1" runat="server" CssClass="Validator" ErrorMessage="The field 'Display Name' is required"
              ControlToValidate="txtDisplayName" Display="Dynamic">*</asp:requiredfieldvalidator></TD>
          <TD><asp:textbox id="txtDisplayName" runat="server" Width="349px"></asp:textbox></TD>
        </TR>
        <TR>
          <TD style="WIDTH: 124px">Status</FONT></TD>
          <TD><asp:dropdownlist id="cmbStatus" runat="server">
              <asp:ListItem Value="A" Selected="True">A - Active</asp:ListItem>
              <asp:ListItem Value="E">E - External Auth (AD)</asp:ListItem>
              <asp:ListItem Value="D">D - Disabled</asp:ListItem>
              <asp:ListItem Value="X">X - Terminated</asp:ListItem>
            </asp:dropdownlist></TD>
        </TR>
        <TR>
          <TD style="WIDTH: 124px">Cur Failed Logins
            <asp:rangevalidator id="RangeValidator1" runat="server" CssClass="Validator" ErrorMessage="The field 'Max Allowed' requires an integer > 0, or leave blank for no failed login limit"
              ControlToValidate="txtMaxFailedLogins" Display="Dynamic" MaximumValue="999" MinimumValue="1">*</asp:rangevalidator></FONT></TD>
          <TD><asp:label id="lblFailedLogins" runat="server"></asp:label>&nbsp;of&nbsp;Max 
            Allowed (Disables Account)&nbsp;</FONT>
            <asp:textbox id="txtMaxFailedLogins" runat="server" Font-Size="Smaller" Font-Names="Arial" Width="40px"></asp:textbox></TD>
        </TR>
        <TR>
          <TD colSpan="2"><FONT size="1"><FONT size="1">&nbsp;</FONT></FONT></TD>
        </TR>
        <TR>
          <TD style="WIDTH: 124px">Enh. Security Mobile</FONT></TD>
          <TD><asp:textbox id="txtMobile" runat="server" MaxLength="30" Width="160px"></asp:textbox><asp:dropdownlist id="cmbSecType" runat="server">
              <asp:ListItem Value="-">No Key Req.</asp:ListItem>
              <asp:ListItem Value="K" Selected="True">Always Req. Key</asp:ListItem>
              <asp:ListItem Value="k">Untrusted Req. Key</asp:ListItem>
              <asp:ListItem Value="N">Always Notify</asp:ListItem>
              <asp:ListItem Value="n">Untrusted Notify</asp:ListItem>
              <asp:ListItem Value="X">Hybrid Notify / Key</asp:ListItem>
            </asp:dropdownlist>&nbsp;
            <asp:button id="btnTestMobile" runat="server" Width="88px" Text="Test Mobile"></asp:button></TD>
        </TR>
        <TR>
          <TD colSpan="2"><FONT size="1">&nbsp;</FONT></TD>
        </TR>
        <TR>
          <TD style="WIDTH: 124px">Assign&nbsp;Group</FONT></TD>
          <TD><asp:dropdownlist id="cmbAddGroup" runat="server" Width="160px" AutoPostBack="True"></asp:dropdownlist></TD>
        </TR>
        <TR>
          <TD style="WIDTH: 124px" vAlign="top">Assigned Group(s) (click to remove)<BR>
            (note: cannot remove from the 'Everyone' group)</FONT></TD>
          <TD vAlign="top"><asp:listbox id="lstSecGroups" runat="server" Width="160px" AutoPostBack="True" Rows="10" Height="125px"></asp:listbox></TD>
        </TR>
        <TR>
          <TD style="WIDTH: 124px">New Password
            <asp:comparevalidator id="CompareValidator1" runat="server" CssClass="Validator" ErrorMessage="Password fields do not match - please try again"
              ControlToValidate="txtPassword1" Display="Dynamic" ControlToCompare="txtPassword2">*</asp:comparevalidator><asp:requiredfieldvalidator id="RequiredFieldValidator3" runat="server" CssClass="Validator" ErrorMessage="The field 'Password' is required for new users or if username is changed"
              ControlToValidate="txtPassword1" Display="Dynamic">*</asp:requiredfieldvalidator></FONT></FONT></TD>
          <TD><asp:textbox id="txtPassword1" runat="server" Width="104px" TextMode="Password"></asp:textbox></TD>
        </TR>
        <TR>
          <TD style="WIDTH: 124px">Confirm&nbsp;Password</FONT></FONT></TD>
          <TD><asp:textbox id="txtPassword2" runat="server" Width="104px" TextMode="Password"></asp:textbox></TD>
        </TR>
        <TR>
          <TD colSpan="2"><FONT size="1">&nbsp;</FONT></TD>
        </TR>
        <TR>
          <TD colSpan="2"><asp:validationsummary id="ValidationSummary1" runat="server" CssClass="Validator"></asp:validationsummary>
            <asp:Label id="lblErrMsg" runat="server" CssClass="validator"></asp:Label></TD>
        </TR>
        <TR>
          <TD style="WIDTH: 535px; PADDING-TOP: 5px" colSpan="2"><asp:button id="btnCancel" runat="server" Width="88px" Text="Back" CausesValidation="False"></asp:button>&nbsp;
            <asp:button id="btnRevert" runat="server" Width="88px" Text="Revert" CausesValidation="False"></asp:button>&nbsp;
            <asp:button id="btnUpdate" runat="server" Width="88px" Text="Update"></asp:button></TD>
        </TR>
      </TABLE>
    </form>
  </body>
</HTML>
