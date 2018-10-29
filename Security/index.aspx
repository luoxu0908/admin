<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="index.aspx.vb" Inherits="IGWebAppSecure.MyMenu2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
  <title>BizCube</title>
  <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
  <meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
  <meta content="JavaScript" name="vs_defaultClientScript">
  <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
  <%
    Response.Write( _
     "<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/Sec/indexBlue.css"" type=""text/css"" rel=""stylesheet"">" & _
     "<LINK href=""" & HttpContext.Current.Session("SkinPath") & "/CSS/Sec/icons.css"" type=""text/css"" rel=""stylesheet"">" _
    )
  %>
  <script src="../Scripts/jquery.1.3.2.min.js" type="text/javascript"></script>
  <script src="../Scripts/master.js" type="text/javascript"></script>
  <script src="../Scripts/index.js" type="text/javascript"></script>
  <script type="text/javascript">
  	function CookieIsActive() {
  		document.cookie = "Test_Cookie=True";
  		if (!document.cookie) { window.location = "../EnableCookies.htm"; }
  	}
  </script>
  <noscript>Javascript is disabled<meta HTTP-EQUIV="REFRESH" content="0; url=../EnableJavascript.htm"> </noscript>
</head>
<body onresize="PlacesEveryone()" onload="CookieIsActive()" ms_positioning="FlowLayout">
  <div id="container">
    <form id="Form1" method="post" runat="server">
    <input id="hid" type="hidden" value="lnk0" runat="server" name="hid" />
    <div id="MenuContainer" style="visiblity: hidden;" class="WithText">
      <img id="imgLogo" src="<% Response.Write(HttpContext.Current.Session("SkinPath") & "/images/Sec/new/logo.png") %>"
        alt="logo.png" />
      <!--<IMG id="imgLogo" src="../iSetupWizard/GetImg.aspx?Img=Logo">-->
      <div class="MorelinksR" id="MorelinksR" style="display: none">
        <div onmouseup="StopScroll()" onmousedown="ScrollRight()" ontouchstart="ScrollRight()" ontouchend="StopScroll()">
        </div>
      </div>
      <div class="MorelinksL" id="MorelinksL" style="display: none">
        <div onmouseup="StopScroll()" onmousedown="ScrollLeft()" ontouchstart="ScrollLeft()" ontouchend="StopScroll()">
        </div>
      </div>
      <div id="LinksContainer">
        <div class="LinksBar" id="LinksBar">
          <asp:Literal ID="litTopMenu" runat="server"></asp:Literal></div>
      </div>
      <div id="accountbox">
        <div class="username">
          <asp:Label ID="lblUsername" runat="server"></asp:Label></div>
        <div id="dvLogin" class="login" runat="server">
          <asp:HyperLink ID="hlnkLogin" runat="server" NavigateUrl="Login.aspx" onclick="frames['Content'].document.location='Login.aspx'; return false;">&nbsp;</asp:HyperLink></div>
        <div id="dvLogout" class="logout" runat="server">
          <asp:HyperLink ID="hlnkLogOut" runat="server" NavigateUrl="logout.aspx">&nbsp;</asp:HyperLink></div>
        <div id="options" runat="server">
          <div class="icon">
          </div>
          <div class="dropdown">
            <div style="width: 65px; float: left; clear: both;">
              Mainmenu :</div>
            <div class="optiongrp">
              <div id="option1">
                <div class="curoption tall">
                  Tall</div>
                <div class="short">
                  Short</div>
                <div class="hide">
                  Hidden</div>
                <div class="unhide" style="display: none;">
                  Unhide</div>
              </div>
            </div>
            <div style="width: 65px; float: left; margin-top: 5px;">
              Submenu :</div>
            <div class="optiongrp">
              <div id="option3">
                <div class="curoption left">
                  Left</div>
                <div class="right">
                  Right</div>
                <div class="center">
                  Center</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="SubLinksBar">
      <span id="breadcrumb" style="display: none;">&nbsp;</span>
      <div class="SubLinksContainer">
        <div id="lnk0s">
          <span class="SubLink">&nbsp;</span></div>
        <asp:Literal ID="litSubMenu" runat="server"></asp:Literal>
      </div>
    </div>
    <div id="MenuContainer2" style="display: none;">
      <div class="showIcon">
        &nbsp;</div>
    </div>
    <iframe id="Content" name="Content" src="NoAccess.htm" frameborder="no" runat="server"></iframe>
    </form>
  </div>
</body>
</html>
