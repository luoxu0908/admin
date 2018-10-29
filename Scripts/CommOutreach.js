(function ($) {
	$.JSONPost = function (URL, Data, options) {
		if ((window.BCBaseURL) && ((URL.substr(1, 4).toLowerCase() != "http") || (URL.substr(1, 1) != "/") || (URL.substr(1, 1) != "."))) { URL = window.BCBaseURL + URL; }
		var jqxhr = $.ajax({
			url: URL, cache: false, type: "POST",
			data: { "data": JSON.stringify(Data), "WebPartKey": $.getWebPartKey() },
			dataType: "json", timeout: 30000,
			xhrFields: { withCredentials: true }
		})
		jqxhr.done(function (data, textStatus, jqXHR) { _ProcJSONRet(textStatus, data, '', true); });
		jqxhr.fail(function (jqXHR, textStatus, errorThrown) { _ProcJSONRet(errorThrown, null, '', true); });
		return jqxhr;
	}
	function _ProcJSONRet(textStatus, data, LoginDivID, ShowErrMsg) {
		var RetVal = 0, RetMsg = "";
		if ((data) && (data.d)) {
			RetVal = data.d.RetVal || 0; RetMsg = data.d.RetMsg || "";
		} else {
			if (textStatus) {
				var S = textStatus.split(":", 2);
				RetVal = parseInt(S[0], 10); RetMsg = (S.length > 1 ? S[1] : textStatus);
			}
		}
		if (RetVal == -1) { return; }
		else if (RetVal == 2) { alert('Please check with support (Unexpected error-not logged in)'); return; }
		else if (ShowErrMsg) {
			if (RetMsg.length > 0) { alert(RetMsg); return; }
			else { alert('AJAX call error-please check with support.'); return; }
		}
	}

	//general cookie handling code
	$.cookie = function (key, value, options) {
		// key and at least value given, set cookie...
		if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
			options = $.extend({}, options);
			if (value === null || value === undefined) {
				options.expires = -1;
			}
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
			value = String(value);
			return (document.cookie = [
								encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
								options.expires ? '; expires=' + options.expires.toUTCString() : '',
								options.path ? '; path=' + options.path : '',
								options.domain ? '; domain=' + options.domain : '',
								options.secure ? '; secure' : ''
						].join(''));
		}

		// key and possibly options given, get cookie...
		options = value || {};
		var decode = options.raw ? function (s) { return s; } : decodeURIComponent;
		var pairs = document.cookie.split('; ');

		for (var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');
			if (pos >= 0) {
				var pair = [pairs[i].slice(0, pos), pairs[i].slice(pos + 1)];
				if (decode(pair[0]) === key) return decode(pair[1] || '');
			}
		}
		return null;
	};

	//opposite of param function in jQuery
	$.deparam = function (params) {
		var o = {};
		if (!params) return o;
		var a = params.split('&');
		for (var i = 0; i < a.length; i++) {
			var pair = a[i].split('=');
			o[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
		}
		return o;
	};

	//extracts query string into object with properties
	$.parseQS = function () {
		return $.deparam(window.location.search.substring(1));
	};

	//extracts cookie into object with properties
	$.parseCookie = function (CookieName) {
		return $.deparam($.cookie(CookieName, { raw: true }));
	};

	//specifically gets WebPartKey for BizSense security
	$.getWebPartKey = function () {
		return $.parseCookie("IGWAS").WebPartKey || '';
	};
})(jQuery);

function requireCookies(NoCookiesURL) {
	var date = new Date(); date.setTime(date.getTime());
	document.cookie = "Test_Cookie=True";
	if (document.cookie) { 
		document.cookie = "expires=" + date.getGMTString() + ";"
	} else {
		window.location = NoCookiesURL || "EnableCookies.htm"; 
	}
};

function CheckValidLogin() {
	if (window.VisitID <= 0) { //not init properly...
		$.mobile.changePage("#login", { transition: "slideup" });
		return false;
	}
	return true;
}
function RefreshVisitList(callback) {
	var ID = $("#ID").val();
	var AccessKey = $("#AccessKey").val();
	var GroupingCode = $("#GroupingCode").val();
	//First, show modal UI to prevent other action?
	$.mobile.changePage("#PleaseWait");
	//Save to backend here
	var xhr = $.JSONPost("CO1.GetVisitList.json", { "ID": ID, "AccessKey": AccessKey, "GroupingCode": GroupingCode });
	xhr.done(function (data) {
		if (data.d.RetVal == -1) {
			var now = moment();
			var M = moment(data.d.RetData.CurDBDate, "YYYY-MM-DDTHH:mm:ss.SSS");
			window.DtOffsetMS = now.diff(M);
			window.MyRoleID = data.d.RetData.MyRoleID; //Person logged in
			window.MyName = data.d.RetData.MyName;
			window.AddrPart = data.d.RetData.AddrPart;
			window.PostalCode = data.d.RetData.PostalCode;
			window.GroupingCode = data.d.RetData.GroupingCode;
			window.VisitID = data.d.RetData.VisitID;
			window.ShortDescription = data.d.RetData.ShortDescription;
			window.VisitRemarks = data.d.RetData.VisitRemarks;
			window.UnitSelIdx = -1;
			window.UnitData = data.d.RetData.UnitData;
			$.mobile.changePage("#UnitListing", { transition: "slide" });
		} else {
			alert(data.d.RetMsg);
			$.mobile.changePage("#login", { transition: "slideup" });
		}
		if (callback) { callback(); }
	})
};
function RebuildUnitListing() {
	if (!CheckValidLogin()) return false;
	$("#UnitListingAddrPart").html(window.AddrPart);
	var UnitStr = '';
	var R = window.UnitData.Rows;
	for (var i = 0; i < R.length; i++) {
		var ResultCls = ''; //Upd - Green; NoUpd - Red; SkipNotIn - Blue;
		switch (R[i].VisitResult || "") {
			case "1": case "D":
				ResultCls = "Upd"; break;
			case "N": case "S":
				ResultCls = "SkipNotIn"; break;
			default:
				ResultCls = "NoUpd"; break;
		}
		//zzz (R[i].VisitResult || "").length > 0 ? "Upd" : "NoUpd", VisitStatus = "";
		if (window.Language == 'CN') {
			VisitStatus = (R[i].VisitResult || "").length > 0 ? "已探访" : "未探访";
		} else {
			VisitStatus = (R[i].VisitResult || "").length > 0 ? "visited" : "pending";
		}
		UnitStr += "<li><a href='#' idx='" + i + "'>" + GetUnitHeader(R[i]) + "   <i>(" + VisitStatus + ")</i><br/><span class='lstupd " + ResultCls + "'>Upd "
				+ GetDateElapsedStr(R[i].LastModifiedDate) + " by " + R[i].LastModifiedBy_Name + "</span></a></li>";
	}
	$('#UnitList').html(UnitStr).listview('refresh');
	$(".ui-input-search .ui-input-text").trigger("change");
}

function GetDateElapsedStr(ElapsedDt) {
	//Elapsed cannot be negative
	var M = moment(ElapsedDt, "YYYY-MM-DDTHH:mm:ss.SSS");
	if (M.isValid()) {
		M.add(window.DtOffsetMS);
		if (moment().isBefore(M)) { //future
			return "a second ago";
		} else { return M.fromNow(); }
	} else { return "-"; }
}
function GetUnitHeader(U) {
	var Rahab = "";
	if (U.Responsiveness=="R") Rahab=" <span style='color:red'>*R*</span>";
	if ((U.Title.length > 0) && (U.LastName.length > 0)) {
		return U.UnitNo + ' : ' + U.Title + ' ' + U.LastName + Rahab;
	} else if ((U.Title.length > 0) && (U.FirstName.length > 0)) {
		return U.UnitNo + ' : ' + U.Title + ' ' + U.FirstName + Rahab;
	} else if ((U.LastName.length > 0) && (U.FirstName.length > 0)) {
		return U.UnitNo + ' : ' + U.FirstName + ' ' + U.LastName + Rahab;
	} else if (U.FirstName.length > 0) {
		return U.UnitNo + ' : ' + U.FirstName + Rahab;
	} else if (U.LastName.length > 0) {
		return U.UnitNo + ' : ' + U.LastName + Rahab;
	} else {
		return U.UnitNo + Rahab;
	}
};
function GetPrevVisitStr(U) {
	U.PrevVisitResult = U.PrevVisitResult || "";
	var PrevVisitInfo = "";
	if (U.PrevVisitResult.length > 0) {
		if (window.Language == 'CN') {
			PrevVisitInfo = "Previously ";
		} else {
			PrevVisitInfo = "Previously ";
		}
		if (window.Language == 'CN') {
			switch (U.PrevVisitResult) {
				case "1":
					PrevVisitInfo += "接受礼物"; break;
				case "D":
					PrevVisitInfo += "拒绝"; break;
				case "N":
					PrevVisitInfo += "不在家"; break;
				case "S":
					PrevVisitInfo += "跳"; break;
				default:
					PrevVisitInfo += U.PrevVisitResult; break;
			}
		} else {
			switch (U.PrevVisitResult) {
				case "1":
					PrevVisitInfo += "accepted gift"; break;
				case "D":
					PrevVisitInfo += "declined"; break;
				case "N":
					PrevVisitInfo += "not in"; break;
				case "S":
					PrevVisitInfo += "skipped"; break;
				default:
					PrevVisitInfo += U.PrevVisitResult; break;
			}
		}
		var M = moment(U.PrevVisitDate, "YYYY-MM-DDTHH:mm:ss.SSS");
		if (M.isValid()) { PrevVisitInfo += " (" + M.format("ddd d MMM YYYY") + ")"; } 
	} else {
		if (window.Language == 'CN') {
			PrevVisitInfo = "No previous visit info";
		} else {
			PrevVisitInfo = "No previous visit info";
		}
	}
	return PrevVisitInfo;
};

function RefreshUnitDetails() {
	if (!CheckValidLogin()) return false;
	if (window.UnitSelIdx < 0) { //not init properly...
		$.mobile.changePage("#login", { transition: "slideup" });
		return false;
	}
	var U = window.UnitData.Rows[window.UnitSelIdx];
	//{"UnitNo": "12-197", "Title": "Mr", "FirstName": "Lenny", "LastName": "Choo", "Sex": "M", "Race": "Chinese", "Religion": "Christian", "ContactNo": "91234567", "Email": "lenny@myemail.com", "SpokenLang": "English", "FamilyGroup": "Adults,Children", "Responsiveness": "N", "Remarks": "", "VisitResult": "", "LastModifiedBy_Name": "Lee Kok Meng", "LastModifiedDate": "2013-02-14T00:00:00.000"}
	$("#unit_header").html(GetUnitHeader(U));
	var ResultCls = (U.VisitResult || "").length > 0 ? "Upd" : "NoUpd", VisitStatus = "";
	if (window.Language == 'CN') {
		VisitStatus = (U.VisitResult || "").length > 0 ? "已探访" : "未探访";
	} else {
		VisitStatus = (U.VisitResult || "").length > 0 ? "visited" : "pending";
	}
	$("#prevvisit").html(GetPrevVisitStr(U));

	$("#UnitDetails_LastUpd").html("<span class='lstupd " + ResultCls + "'>Upd " + GetDateElapsedStr(U.LastModifiedDate) + " by " + U.LastModifiedBy_Name + "</span>");
	$("input[name=Sal]").prop('checked', false); //uncheck all
	$("input[name=Sal][value=" + U.Title + "]").prop('checked', true);
	$("input[name=Sal]").checkboxradio("refresh");
	$("#LastName").val(U.LastName);
	$("#FirstName").val(U.FirstName);
	$("#ContactNo").val(U.ContactNo);
	$("#Email").val(U.Email);
	$("input[name=Sex]").prop('checked', false); //uncheck all
	$("input[name=Sex][value=" + U.Sex + "]").prop('checked', true);
	$("input[name=Sex]").checkboxradio("refresh");
	$("#Remarks").val(U.Remarks);
	$("input[name=Result]").prop('checked', false); //uncheck all
	$("input[name=Result][value=" + U.VisitResult + "]").prop('checked', true);
	$("input[name=Result]").checkboxradio("refresh");
	$("input[name=Resp]").prop('checked', false); //uncheck all
	$("input[name=Resp][value=" + U.Responsiveness + "]").prop('checked', true);
	$("input[name=Resp]").checkboxradio("refresh");
	$("input[name=Religion]").prop('checked', false); //uncheck all
	$("input[name=Religion][value='" + U.Religion + "']").prop('checked', true);
	$("input[name=Religion]").checkboxradio("refresh");
	$("input[name=Race]").prop('checked', false); //uncheck all
	$("input[name=Race][value='" + U.Race + "']").prop('checked', true);
	$("input[name=Race]").checkboxradio("refresh");
	$("input[name=FamilyGroup]").prop('checked', false); //uncheck all
	var D = U.FamilyGroup.split(",");
	for (i = 0; i < D.length; i++) {
		if ($.trim(D[i]).length > 0) {
			$("input[name=FamilyGroup][value='" + D[i] + "']").prop('checked', true);
		}
	}
	$("input[name=FamilyGroup]").checkboxradio("refresh");
	$("input[name=SLang]").prop('checked', false); //uncheck all
	var L = U.SpokenLang.split(",");
	for (i = 0; i < L.length; i++) {
		if ($.trim(L[i]).length > 0) {
			$("input[name=SLang][value='" + L[i] + "']").prop('checked', true);
		}
	}
	$("input[name=SLang]").checkboxradio("refresh");
};
function ValidateUnitDetails(U) {
	var res = $("input[name=Result]:checked").val() || '';
	if (!(res.length > 0)) {
		alert('Please fill in the Result field before updating');
		return false;
	}
	return true;
}
function UpdateUnitDetails(callback) {
	if (!CheckValidLogin()) return false;
	if (window.UnitSelIdx < 0) { //not init properly...
		$.mobile.changePage("#login", { transition: "slideup" });
		return false;
	}
	var ID = $("#ID").val();
	var AccessKey = $("#AccessKey").val();
	var GroupingCode = $("#GroupingCode").val();
	var U = window.UnitData.Rows[window.UnitSelIdx];
	//validate first
	if (!ValidateUnitDetails(U)) { return false }
	U.Title = $("input[name=Sal]:checked").val() || "";
	U.LastName = $("#LastName").val() || "";
	U.FirstName = $("#FirstName").val() || "";
	U.ContactNo = $("#ContactNo").val() || "";
	U.Email = $("#Email").val() || "";
	U.Sex = $("input[name=Sex]:checked").val() || "";
	U.Remarks = $("#Remarks").val() || "";
	U.VisitResult = $("input[name=Result]:checked").val() || "";
	U.Responsiveness = $("input[name=Resp]:checked").val() || "";
	U.Religion = $("input[name=Religion]:checked").val() || "";
	U.Race = $("input[name=Race]:checked").val() || "";
	var D = '';
	$("input[name=FamilyGroup]:checked").each(function () {
		if (D.length > 0) { D += "," }
		D += $(this).val();
	});
	U.FamilyGroup = D;
	var L = '';
	$("input[name=SLang]:checked").each(function () {
		if (L.length > 0) { L += "," }
		L += $(this).val();
	});
	U.SpokenLang = L;
	//First, show modal UI to prevent other action?
	$.mobile.changePage("#PleaseWait");
	//Save to backend here
	var xhr = $.JSONPost("CO1.UpdateVisit.json", { "ID": ID, "AccessKey": AccessKey, "GroupingCode": GroupingCode, "UnitInfo": U });
	xhr.done(function (data) {
		if (data.d.RetVal == -1) {
			//Update modified by & date
			U.LastModifiedBy_Name = window.MyName;
			U.LastModifiedDate = data.d.RetData;
			$.mobile.changePage("#UnitListing", { transition: "slide", reverse: true });
		} else {
			U.VisitResult = "";
			alert(data.d.RetMsg);
			$.mobile.changePage("#UnitDetails");
		}
		if (callback) { callback(); }
	})
};

//Cross-domain request patch for IE8 & 9
if (window.XDomainRequest) {
jQuery.ajaxTransport(function (s) {
	if (s.crossDomain && s.async) {
		if (s.timeout) {
			s.xdrTimeout = s.timeout;
			delete s.timeout;
		}
		var xdr;
		return {
			send: function (_, complete) {
				function callback(status, statusText, responses, responseHeaders) {
					xdr.onload = xdr.onerror = xdr.ontimeout = jQuery.noop;
					xdr = undefined;
					complete(status, statusText, responses, responseHeaders);
				}
				xdr = new XDomainRequest();
				xdr.onload = function () {
					callback(200, "OK", { text: xdr.responseText }, "Content-Type: " + xdr.contentType);
				};
				xdr.onerror = function () {
					callback(404, "Not Found");
				};
				xdr.onprogress = jQuery.noop;
				xdr.ontimeout = function () {
					callback(0, "timeout");
				};
				xdr.timeout = s.xdrTimeout || Number.MAX_VALUE;
				xdr.open(s.type, s.url);
				xdr.send((s.hasContent && s.data) || null);
			},
			abort: function () {
				if (xdr) {
					xdr.onerror = jQuery.noop();
					xdr.abort();
				}
			}
		};
	}
});
}