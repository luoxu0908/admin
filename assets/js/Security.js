//Performs a login call
function LoginInfo() {
	return $.JSONPost("Sec1.LoginInfo.json", "", { ShowWait: false });
}
//Performs a login call
function Login(Username, Password, RememberMe) {
	var LoginData = { "Username": Username, "Password": Password, "RememberMe": RememberMe };
	return $.JSONPost("Sec1.Login.json", LoginData, { WaitDiv: "请稍后...", ShowWait: true, MsgDiv: "ReturnMsg" });
}
//Submits 2 factor if required
function Login2FA(OTP) {
	var LoginData = { "OTP": OTP };
	return $.JSONPost("Sec1.Login2FA.json", LoginData);
}
//Ack
function LoginTnC() {
	return $.JSONPost("Sec1.LoginTnC.json", "");
}

function Logout() {
	return $.JSONPost("Sec1.Logout.json", "");
}

function BuildMenu(callback) {
	var xhr = $.JSONPost("Sec1.Menu.json", "", "");
	xhr.done(function (data) {
		if (data.d.RetVal == -1) {
			var BaseURL=data.d.RetData.BaseURL
			var r = data.d.RetData.Tbl.Rows; 
			var RowCnt = r.length, MainMenu = [];
			for (var i = 0; i < RowCnt; i++) {
				_AddMenuItem(MainMenu, r[i].MenuName, BaseURL + r[i].RelativeURL, r[i].DefaultCSS);
			}
		}
		if (callback) { callback(_GenMenuOutput(MainMenu)); }
	})
	.fail(function (data) { alert(data.d.RetVal); alert(data.d.RetMsg); });
	return xhr;
}

function _GenMenuOutput(Menu) {
	var RowCnt = Menu.length;
	var Output = '<ul>\n';
	for (var i = 0; i < RowCnt; i++) {
		Output += "<li><a href='" + Menu[i].URL + "'>" ;
		if (Menu[i].CSS.length > 0) Output += "<span class='MenuIcon " + Menu[i].CSS + "'></span>";
		Output += Menu[i].MenuName + "</a>";
		if (Menu[i].SubMenus.length > 0) Output += "\n" + _GenMenuOutput(Menu[i].SubMenus);
		Output += "</li>\n";
	}
	Output += "</ul>\n";
	return Output;
}
function _AddMenuItem(Menu, MenuName, URL, CSS) {
	var pos = MenuName.indexOf('\\'), parts; //cut at the first slash (\)
	if (pos >= 0) {
		parts = [MenuName.slice(0, pos), MenuName.slice(pos + 1)];
	} else {
		parts = [MenuName];
	}
	parts[0] = $.trim(parts[0]); //trim off spaces in front & back
	if (parts.length > 1) { //recursive call-find or add parent first then call recursively
		var MenuPos = _InMenu(Menu, parts[0]);
		if (MenuPos == -1) { //Parent not found, have to add in a stub
			MenuPos = Menu.push({ "MenuName": parts[0], "URL": "", "CSS": "", "SubMenus": [] }) - 1;
		}
		//recursively call _AddMenuItem to add child
		_AddMenuItem(Menu[MenuPos].SubMenus, parts[1], URL, CSS)
	} else { //leaf node, add item to Menu object
		Menu.push({ "MenuName": parts[0], "URL": URL, "CSS": CSS, "SubMenus": [] })
	}
}
function _InMenu(Menu, MenuPart) {
	if (!Menu) return -1;
	var ML = Menu.length;
	if (ML==0) return -1;
	for (var i = 0; i < ML; i++) {
		if (Menu[i].MenuName.toLowerCase() == MenuPart.toLowerCase()) return i;
	}
	return -1;
}

function ReturnMsg(data,MsgDiv) {
	$.each(data, function (index,e) {
		var newdiv = ("<p>" + e.RetMsg + "</p>");
		$('#'+MsgDiv).html(newdiv);
		if (e.RetVal > 0) { //error
			$('#' + MsgDiv).errorstyle();
		}
		else { //success
			$('#' + MsgDiv).infostyle();
		}
	});
	return data.d.RetVal;
}

function makeTop() {
	if (top.location != self.location) {
		top.location = self.location;
	}
}

//check if cookie is enable on client's browser
function CookieIsActive() {
	var Test_Cookie = 'test_cookie';
	$.cookie(Test_Cookie, true);
	if ($.cookie(Test_Cookie)) {
		$.cookie(Test_Cookie, null); 
	}
	else {
		$(window.location).attr('href', 'EnableCookies.htm');
	}
}

function ChangePassword(Password) {
  return $.JSONPost("Sec1.ChangePassword.json", Password);
}