/***
 * Contains basic SlickGrid formatters.
 * @module Formatters
 * @namespace Slick
 */

(function ($) {
	// register namespace
	$.extend(true, window, {
		"Slick": {
			"Formatters": {
				"PercentComplete": PercentCompleteFmt,
				"PercentCompleteBar": PercentCompleteBarFmt,
				"HTML": HTMLFmt,
				"Lookup": LookupFmt,
				"LookupJSON": LookupJSONFmt,
				"YesNo": YesNoFmt,
				"Checkmark": CheckmarkFmt,
				"Hyperlink": HyperlinkFmt,
				"DateTime": DateTimeFmt,
				"Number": NumberFmt,
				"Currency": CurrencyFmt
			}
		}
	});
	function LookupJSONFmt(row, cell, value, columnDef, dataContext) {
		if (!columnDef.lookupjson) return "Missing columnDef.lookupjson";
		if (!columnDef.keyfield) return "Missing columnDef.keyfield";
		if (!columnDef.valuefield) return "Missing columnDef.valuefield";
		var tmpid = ((columnDef.id + "_" + row + "_" + cell).split("|").join("").split(".").join(""));
		window.LookupJSONFmt_JSONCalls = window.LookupJSONFmt_JSONCalls || {};
		var PrevAJAX = window.LookupJSONFmt_JSONCalls[tmpid] || false;
		if (PrevAJAX && PrevAJAX.readyState != 4) { PrevAJAX.abort(); } //abort prev call if still running
		if (value == null) {
			return "<div id='" + tmpid + "'>" + (columnDef.invalidtext || "") + "</div>";
		} else {
			var data = {};
			data[columnDef.keyfield] = value;
			window.LookupJSONFmt_JSONCalls[tmpid] = $.JSONPost(columnDef.lookupjson, data, { ShowErrMsg: false })
					.fail(function (jqXHR, textStatus, errorThrown) {
						window.LookupJSONFmt_JSONCalls[tmpid] = false;
						$('#' + tmpid).html((columnDef.jsonerrtext || value));
					})
					.done(function (data) {
						window.LookupJSONFmt_JSONCalls[tmpid] = false;
						var R = data.d.RetData.Tbl.Rows;
						if (R.length > 0) {
							$('#' + tmpid).html(R[0][columnDef.valuefield]);
						} else {
							$('#' + tmpid).html((columnDef.invalidtext || value));
						}
					});
			return "<div id='" + tmpid + "'>" + (columnDef.initialtext || value) + "</div>";
		}
	}
	function LookupFmt(row, cell, value, columnDef, dataContext, OthDS) {
		if (value == null) return "";
		if (value || (value.length > 0)) {
			if (columnDef.listval && columnDef.listtxt) { //pipe-delimited list
				var listdscache = columnDef.id + '__cache';
				if (!OthDS) OthDS = {};
				var cacheobj = OthDS[listdscache];
				if (!cacheobj) {
					var cacheobj = {};
					var listtxt = (columnDef.listtxt || columnDef.listval).split("|");
					var listval = (columnDef.listval || columnDef.listtxt).split("|");
					for (var i = 0; i < listtxt.length; i++) {
						cacheobj[(listval[i])] = (listtxt[i]);
					}
					OthDS[listdscache] = cacheobj;
				}
				return (cacheobj[value] || value);
			}
			if (columnDef.listds && OthDS) {
				var listdscache = columnDef.listds + '__cache';
				var cacheobj = OthDS[listdscache];
				if (!cacheobj) {
					var cacheobj = {};
					var List = OthDS[columnDef.listds].Rows;
					if (List.length > 0) {
						if (List[0].Txt || List[0].Val) {
							for (var i = 0; i < List.length; i++) {
								cacheobj[(List[i].Val || List[i].Txt)] = (List[i].Txt || List[i].Val);
							}
						} else {
							for (var key in List[0]) break;
							for (var i = 0; i < List.length; i++) {
								cacheobj[(List[i][key])] = (List[i][key]);
							}
						}
					}
					OthDS[listdscache] = cacheobj;
				}
				return (cacheobj[value] || value);
			}
			return value;
		}
		return "";
	}
	function YesNoFmt(row, cell, value, columnDef, dataContext) { return value ? "Yes" : "No"; }
	function PercentCompleteFmt(row, cell, value, columnDef, dataContext) {
		if (value == null || value === "") {
			return "-";
		} else if (value < 50) {
			return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
		} else {
			return "<span style='color:green'>" + value + "%</span>";
		}
	}
	function PercentCompleteBarFmt(row, cell, value, columnDef, dataContext) {
		if (value == null || value === "") { return ""; }
		var color;
		if (value < 30) {
			color = "red";
		} else if (value < 70) {
			color = "silver";
		} else {
			color = "green";
		}
		return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
	}
	function HTMLFmt(row, cell, value, columnDef, dataContext) { if (value == null) { return ""; } else { return value; } }
	function CheckmarkFmt(row, cell, value, columnDef, dataContext) {
		var Path = ((GridImgFolder) ? encodeURI(GridImgFolder + '/') : "../styles/images/");
		var T = "tick.png", C = "cross.png";
		if (columnDef.invertfldtoken) {
			if (_processStrTokens(columnDef.invertfldtoken, dataContext, false)) { T = "cross.png"; C = "tick.png"; }
		}
		if (columnDef.showcross) {
			return value ? "<img src='" + Path + T + "'>" : "<img src='" + Path + C + "'>";
		} else {
			return value ? "<img src='" + Path + T + "'>" : "";
		}
	}
	function DateTimeFmt(row, cell, value, columnDef, dataContext) {
		if (value) {
			var M = (columnDef.parsefmt) ? moment(value, columnDef.parsefmt) : moment(value);
			if (M.isValid()) { return M.format(columnDef.dispfmt || "D MMM YYYY"); }
		}
		return "";
	}
	function HyperlinkFmt(row, cell, value, columnDef, dataContext) {
		if (columnDef.text) { value = columnDef.text; }
		if (!value) return "";
		var url = columnDef.url || "";
		var attrs = (columnDef.target) ? (" target='" + columnDef.target + "'") : "";
		if (columnDef.popup) {
			attrs += ((attrs.length > 0) ? " " : "") + "onclick=\"Utils.Popup(this,'" + columnDef.popup + "');return false;\"";
		} else if (columnDef.onclick) {
			attrs += ((attrs.length > 0) ? " " : "") + "onclick=\"" + _processStrTokens(columnDef.onclick, dataContext, false) + "\"";
		}
		return "<a href=\"" + _processStrTokens(url, dataContext, true) + "\"" + attrs + ">" + value + "</a>";
	}
	function _processStrTokens(Str, dataContext, encURIComp) {
		var spl = Str.split("{{"), outStr = "";
		for (var i = 0; i < spl.length; i++) {
			var Idx = spl[i].indexOf("}}");
			if (Idx >= 0) { //found, first ocurrence is a variable
				var VarToken = spl[i].substring(0, Idx);
				if (VarToken.length > 0) {
					var Vars = VarToken.split("|"); //Token format {{Varname|EscapeStrBool}}
					var EscStr = ((Vars.length > 1 ? Vars[1] : false) || false);
					var V = Vars[0], R = '';
					if (dataContext.hasOwnProperty(V)) {
						R = (parseInt(dataContext[V]) == 0) ? dataContext[V] : dataContext[V] || '';
					} else { //global variable?
						R = (parseInt(window[V]) == 0) ? window[V] : window[V] || '';
					}
					if (encURIComp) R = encodeURIComponent(R);
					if (EscStr) R = Utils.escapeString(R);
					outStr += R + spl[i].substring(Idx + 2);
				}
			} else {
				outStr += spl[i];
			}
		}
		return outStr;
	}
	function NumberFmt(row, cell, value, columnDef, dataContext) {
		if (!value) return "";
		return _FormatNum(value, (columnDef.dispdp || 2), '.', ',', columnDef.disppre, columnDef.disppost, false);
	}
	function CurrencyFmt(row, cell, value, columnDef, dataContext) {
		if (!value) return "";
		return _FormatNum(value, 2, '.', ',', '$', '', true);
	}
	function _FormatNum(n, c, d, t, pre, post, nb) {
		//n = number; c = decimal places; d = decimal indicator; t = thousands separator; pre = Prefix; post = Postfix; nb = if true, show -ve numbers with brackets () instead
		var P = (n >= 0), c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t
		var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
		pre = pre || ""; post = post || "";
		if (P) {
			return pre + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "") + post;
		} else if (nb) {
			return "(" + pre + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "") + post + ")";
		} else {
			return "-" + pre + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "") + post;
		}
	}
})(jQuery);
