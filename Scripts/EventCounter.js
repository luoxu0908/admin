(function ($) {
	$.JSONPost = function (URL, Data, options) {
		var jqxhr = $.ajax({
			url: URL, cache: false, type: "POST",
			data: { "data": JSON.stringify(Data), "WebPartKey": $.getWebPartKey() },
			dataType: "json",
			xhrFields: { withCredentials: true }
		})
		return jqxhr;
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

function RefreshSearchResult(callback) {
	var SearchVal = $("#SearchInput").val() || "";
	if (SearchVal.length >= 3) {
		//First, show modal UI to prevent other action?
		$.mobile.changePage("#PleaseWait");
		//Save to backend here
		var xhr = $.JSONPost("Evt1.SearchEventParticipants.json", { "EventGID": EventGID, "Search": SearchVal });
		xhr.done(function (data) {
			if (data.d.RetVal == -1) {
				var now = moment();
				var M = moment(data.d.RetData.Tbls[0].Rows[0].CurDBDate, "YYYY-MM-DDTHH:mm:ss.SSS");
				window.DtOffsetMS = now.diff(M);
				window.Results = data.d.RetData.Tbls[1] || { Rows: [] };
				if (window.Results.Rows.length < 1) {
					alert("No matching records found");
					$.mobile.changePage("#startpage", { transition: "slideup" });
				} else if (window.Results.Rows.length == 1) {
					window.SelIdx = 0;
					$.mobile.changePage("#Participant", { transition: "slide" });
				} else {
					$.mobile.changePage("#ResultListing", { transition: "slide" });
				}
			} else {
				alert(data.d.RetMsg);
				$.mobile.changePage("#startpage", { transition: "slideup" });
			}
			if (callback) { callback(); }
		})
	} else {
		alert("Please enter at least 3 characters to search.");
		$("#SearchInput").focus();
	}
};
function RebuildSearchResults() {
	var ResultStr = '';
	var R = window.Results.Rows;
	if (R.length > 0) {
		for (var i = 0; i < R.length; i++) {
			R[i].CounterRemarks = (R[i].CounterRemarks || "");
			ResultStr += "<li><a href='#' idx='" + i + "'>" + R[i].DisplayName + '<br/>' + R[i].EntityKey
			+ "<br/><i>(" + ((R[i].CounterRemarks.length > 0) ? R[i].CounterRemarks : "Uncollected") + ")</i><br/><span class='lstupd Upd'>"
			+ GetDateElapsedStr(R[i].LastUpdateDate) + "</span></a></li>";
		}
	} else { ResultStr += "<li>No matching records found</li>"; }
	$('#ResultList').html(ResultStr).listview('refresh');
	$(".ui-input-search .ui-input-text").trigger("change");
	if (R.length == 1) {
		window.SelIdx = 0;
		$.mobile.changePage("#Participant", { transition: "slide" });
	}
}

function GetDateElapsedStr(ElapsedDt) {
	//Elapsed cannot be negative
	if (ElapsedDt) {
		var M = moment(ElapsedDt, "YYYY-MM-DDTHH:mm:ss.SSS");
		if (M.isValid()) {
			M.add(window.DtOffsetMS);
			if (moment().isBefore(M)) { //future
				return "a second ago";
			} else { return M.fromNow(); }
		} else { return ""; }
	} else { return ""; }
}

function RefreshRegDetails() {
	var U = window.Results.Rows[window.SelIdx];
	var H = $("#P_Header").html(U.DisplayName);
	var RC = (U.RegCategory || "").toLowerCase();
	var RD = (U.RegDetails || "").toLowerCase();
	U.CounterRemarks = (U.CounterRemarks || "");
	var Collected = ((U.CounterRemarks.length > 0) ? U.CounterRemarks : "NOT YET COLLECTED")
	$("#P_Collection").html(Collected);

	if (Collected == "NOT YET COLLECTED") {
		if (RC.indexOf("full time") >= 0) {
		    H.css('color', 'Black').css('text-shadow', 'None'); H.parent().css('background', 'none').css('background-color', '#E86987');
		} else if (RC.indexOf("volunteer") >= 0) {
		    H.css('color', 'Black').css('text-shadow', 'None'); H.parent().css('background', 'none').css('background-color', '#48D6C8');
		} else if (RC.indexOf("domestic helper") >= 0) {
			H.css('color', 'Black').css('text-shadow', 'None'); H.parent().css('background', 'none').css('background-color', '#FA803D');
		} else if (RC.indexOf("staff") >= 0) {
		    H.css('color', 'Black').css('text-shadow', 'None'); H.parent().css('background', 'none').css('background-color', '#00A7DE');
		} else if (RC.indexOf("part time") >= 0) {
			if (RD.indexOf("28") >= 0) {
			    H.css('color', 'Black').css('text-shadow', 'None'); H.parent().css('background', 'none').css('background-color', '#DFD478');
			} else if (RD.indexOf("29") >= 0) {
			    H.css('color', 'Black').css('text-shadow', 'None'); H.parent().css('background', 'none').css('background-color', '#7050BF');
			} 
		} else if (RC.indexOf("hopekids") >= 0) {
		    H.css('color', 'Black').css('text-shadow', 'None'); H.parent().css('background', 'none').css('background-color', 'Red');
		}
		else {
			H.css('color', 'White').css('text-shadow', 'None'); H.parent().css('background', 'none').css('background-color', 'Black');
		}
	} else {
		H.css('color', 'White').css('text-shadow', 'None'); H.parent().css('background', 'none').css('background-color', 'Black');
	}

	if (U.LastUpdateDate) {
		$("#P_LastUpd").html("<span class='lstupd Upd'>Upd " + GetDateElapsedStr(U.LastUpdateDate) + "</span>");
	} else {
		$("#P_LastUpd").html("");
	}
	var Details = "NRIC/FIN: " + U.EntityKey + "<br/>"
	 + "Contact No: " + U.Mobile + "<br/>"
	 + "Category: <b>" + U.RegCategory + "</b><br/>"
	 + U.RegDetails + "<br/>"
	 //+ "Material Language: <b>" + U.Language + "</b><br/>"
	 + U.RegOthDetails + "<br/>";
	$("#P_Details").html(Details);
	$("#Remarks").val(U.CounterOthRemarks);
};
function UpdateRegDetails(callback) {
	var U = window.Results.Rows[window.SelIdx];
	U.CounterOthRemarks = $("#Remarks").val() || "";
	//First, show modal UI to prevent other action?
	$.mobile.changePage("#PleaseWait");
	//Save to backend here
	var xhr = $.JSONPost("Evt1.UpdateEventParticipants.json", { "RegID": U.RegID, "RegIndex": U.RegIndex, "CounterRemarks": "Collected", "CounterOthRemarks": U.CounterOthRemarks });
	xhr.done(function (data) {
		if (data.d.RetVal == -1) {
			$.mobile.changePage("#startpage", { transition: "slide", reverse: true });
		} else {
			alert(data.d.RetMsg);
			$.mobile.changePage("#Participant");
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