/***
 * Contains basic SlickGrid editors.
 * @module Editors
 * @namespace Slick
 */

(function ($) {
	// register namespace
	// to do - update "Date": DateEditor,
	// add new "Time": TimeEditor, "DateTime": DateTimeEditor, "DropDown": DropDownEditor,
	$.extend(true, window, {
		"Slick": {
			"Editors": {
				"Text": TextEditor,
				"Integer": IntegerEditor,
				"Date": DateEditor,
				"Checkbox": CheckboxEditor,
				"PercentComplete": PercentCompleteEditor,
				"LongText": LongTextEditor,
				"DropDown": DropDownEditor,
				"AutoComplete": AutoCompleteEditor,
				"SelectJSON": SelectJSONEditor
			}
		}
	});

	function SelectJSONEditor(args) {
		var $select, defaultValue, scope = this;
		//Init defaults
		var C = args.column;
		var _minInputLen = (C.editormininputlen || 2);
		var _placeholder = (C.editorplaceholder || "");
		var _autocommit = ((C.editorautocommit || false) == true);  //default false
		var _initjson = (C.editorinitjson || ""); //Mandatory
		var _initkeyfield = (C.editorinitkeyfield || C.editorkeyfield || "ID");
		var _initvalfield = (C.editorinitvaluefield || C.editorvaluefield || "Txt");
		var _initjsonsendrowdata = ((C.editorinitjsonsendrowdata || false) == true);  //default false
		var _searchjson = (C.editorsearchjson || ""); //Mandatory
		var _searchterm = (C.editorsearchterm || "SearchTerm");
		var _searchjsonsendrowdata = ((C.editorsearchjsonsendrowdata || false) == true);  //default false
		var _searchjsondata = (C.searchjsondata || "").split("|"); //Field1|Value1|Field2|Value2
		var _searchjsondatarowcnt = _searchjsondata.length;
		var _searchkeyfield = (C.editorkeyfield || C.editorinitkeyfield || "ID");
		var _searchvalfield = (C.editorvaluefield || C.editorinitvaluefield || "Txt");
		var _searchcustomsels = (C.editorcustomselections || "").split("|"); //Text1|FunctionToCall1|Text2|FunctionToCall2
		var _searchcustrowcnt = _searchcustomsels.length;
		this.init = function () {
			if (!_initjson) { alert('Missing editorinitjson option (misconfiguration), please check with support.'); return false; }
			if (!_searchjson) { alert('Missing editorinitjson option (misconfiguration), please check with support.'); return false; }
			$select = $("<input type='hidden' tabindex='-1' style='width: 100%;' />").appendTo(args.container).select2({ minimumInputLength: _minInputLen, placeholder: _placeholder, query: GetSearchMatches, initSelection: InitItemSelection, allowClear: true }).on("change", function (e) {
				var Proc = false;
				if (_searchcustrowcnt > 1) {
					for (var j = 0; j < _searchcustrowcnt; j += 2) {
						if (e.val == _searchcustomsels[j]) {
							Proc = true;
							var fnName = _searchcustomsels[j + 1];
							var fn = window[fnName];
							if (typeof fn === 'function') {
								fn(e, $select, window.SearchTerm, $select.select2("val"));
							} else {
								alert('Invalid function name (window.' + fnName + ' is not a function) for custom selection, please check with support.'); return false;
							}
						}
					}
				}
				if ((!Proc) && (_autocommit)) { args.commitChanges(true); }
			});
			function GetSearchMatches(query) {
				window.SearchTerm = query.term;
				var Data = {};
				if (_searchjsondatarowcnt > 1) {
					for (var j = 0; j < _searchjsondatarowcnt; j += 2) {
						var FldName = _searchjsondata[j];
						var Val = _searchjsondata[j + 1];
						Data[FldName] = Val;
					}
				}
				if (_searchjsonsendrowdata) $.extend(Data, args.item); //send back row data as well
				Data[_searchterm] = query.term;
				$.JSONPost(_searchjson, Data).done(function (data) {
					var R = data.d.RetData.Tbl.Rows, RowCnt = R.length;
					var return_data = { results: [] };
					for (var i = 0; i < RowCnt; i++) { return_data.results.push({ id: R[i][_searchkeyfield], text: R[i][_searchvalfield] }); }
					if (_searchcustrowcnt > 1) {
						for (var j = 0; j < _searchcustrowcnt; j += 2) { return_data.results.push({ id: _searchcustomsels[j], text: _searchcustomsels[j] }); }
					}
					query.callback(return_data);
				});
			}
			function InitItemSelection(element, callback) {
				var _Val = $(element).val();
				if (_Val != "") {
					var Data = {};
					if (_initjsonsendrowdata) $.extend(Data, args.item); //send back row data as well
					Data[_initkeyfield] = _Val;
					$.JSONPost(_initjson, Data)
							.done(function (data) {
								var R = data.d.RetData.Tbl.Rows;
								if (R.length > 0) {
									callback({ id: R[0][_initkeyfield], text: R[0][_initvalfield] });
								} else {
									callback({ id: -1, text: "Invalid ID" });
								}
							});
				}
			}
			$select.select2("open");
		};
		this.destroy = function () { $select.select2("destroy").remove(); };
		this.focus = function () { $select.select2("open"); };
		this.loadValue = function (item) {
			defaultValue = item[args.column.field];
			$select.select2("val", defaultValue).select2("open");
		};
		this.serializeValue = function () { return $select.select2("val"); };
		this.applyValue = function (item, state) { item[args.column.field] = state; };
		this.isValueChanged = function () { return (!($select.select2("val") == "" && defaultValue == null)) && ($select.select2("val") != defaultValue); };
		this.validate = function () {
			if (args.column.validator) {
				var validationResults = args.column.validator($select.select2("val"));
				if (!validationResults.valid) { return validationResults; }
			}
			return { valid: true, msg: null };
		};
		this.init();
	}

	function TextEditor(args) {
		var $input, defaultValue, scope = this;
		this.init = function () {
			$input = $("<input type=text class='editor-text' />")
					.appendTo(args.container)
					.bind("keydown.nav", function (e) {
						if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
							e.stopImmediatePropagation();
						}
					})
					.focus().select();
		};
		this.destroy = function () { $input.remove(); };
		this.focus = function () { $input.focus(); };
		this.getValue = function () { return $input.val(); };
		this.setValue = function (val) { $input.val(val); };
		this.loadValue = function (item) {
			defaultValue = item[args.column.field] || "";
			$input.val(defaultValue);
			$input[0].defaultValue = defaultValue;
			$input.select();
		};
		this.serializeValue = function () { return $input.val(); };
		this.applyValue = function (item, state) { item[args.column.field] = state; };
		this.isValueChanged = function () { return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue); };
		this.validate = function () {
			if (args.column.validator) {
				var validationResults = args.column.validator($input.val(), $input);
				if (!validationResults.valid) { return validationResults; }
			}
			return { valid: true, msg: null };
		};
		this.init();
	}

	function IntegerEditor(args) {
		var $input, defaultValue, scope = this;
		this.init = function () {
			$input = $("<input type=text class='editor-text' />");
			$input.bind("keydown.nav", function (e) {
				if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
					e.stopImmediatePropagation();
				}
			});
			$input.appendTo(args.container);
			$input.focus().select();
		};
		this.destroy = function () { $input.remove(); };
		this.focus = function () { $input.focus(); };
		this.loadValue = function (item) {
			defaultValue = item[args.column.field];
			$input.val(defaultValue);
			$input[0].defaultValue = defaultValue;
			$input.select();
		};
		this.serializeValue = function () { return parseInt($input.val(), 10) || 0; };
		this.applyValue = function (item, state) { item[args.column.field] = state; };
		this.isValueChanged = function () { return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue); };
		this.validate = function () {
			if (isNaN($input.val())) {
				return {
					valid: false,
					msg: "Please enter a valid integer"
				};
			}
			if (args.column.validator) {
				var validationResults = args.column.validator($input.val());
				if (!validationResults.valid) { return validationResults; }
			}
			return { valid: true, msg: null };
		};
		this.init();
	}

	function DateEditor(args) {
		var $input, defaultValue, scope = this, calendarOpen = true;
		this.init = function () {
			var _autocommit = ((args.column.editorautocommit || false) == true);  //default false
			$input = $("<input type=text class='editor-text' />");
			$input.appendTo(args.container);
			$input.datepicker({
				showOn: "both", dateFormat: (args.column.editfmt || "d M yy"), yearRange: (args.column.range || 'c-10:c+10'),
				buttonImageOnly: true, changeMonth: true, changeYear: true,
				buttonImage: (GridImgFolder) ? encodeURI(GridImgFolder + "/calendar.gif") : "../styles/images/calendar.gif",
				beforeShow: function () { calendarOpen = true },
				onClose: function () { calendarOpen = false },
				onSelect: function (date) {
					if (_autocommit) { args.commitChanges(true); }
				}
			});
			$input.width($input.width() - 18);
			$input.focus().select();
		};
		this.destroy = function () {
			$.datepicker.dpDiv.stop(true, true);
			$input.datepicker("hide");
			$input.datepicker("destroy");
			$input.remove();
		};
		this.show = function () {
			if (calendarOpen) { $.datepicker.dpDiv.stop(true, true).show(); }
		};
		this.hide = function () {
			if (calendarOpen) { $.datepicker.dpDiv.stop(true, true).hide(); }
		};
		this.position = function (position) {
			if (!calendarOpen) { return; }
			$.datepicker.dpDiv
					.css("top", position.top + 30)
					.css("left", position.left);
		};
		this.focus = function () { $input.focus(); };
		this.loadValue = function (item) {
			defaultValue = item[args.column.field];
			var M = (args.column.parsefmt) ? moment(defaultValue, args.column.parsefmt) : moment(defaultValue);
			if (M && M.isValid()) { defaultValue = M.format(args.column.dispfmt || "D MMM YYYY"); } else { defaultValue = "" }
			$input.val(defaultValue);
			$input[0].defaultValue = defaultValue;
			$input.select();
		};
		this.serializeValue = function () {
			var M = moment($input.val(), args.column.dispfmt || "D MMM YYYY");
			if (M && M.isValid()) { return M.format(args.column.parsefmt || "YYYY-MM-DDTHH:mm:ss.SSS"); }
			return "";
		};
		this.applyValue = function (item, state) { item[args.column.field] = state; };
		this.isValueChanged = function () { return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue); };
		this.validate = function () {
			var Val = $input.val();
			if (Val.length > 0) {
				var M = moment(Val, args.column.dispfmt || "D MMM YYYY");
				if (!M.isValid()) { return { valid: false, msg: "Unrecognised date format" }; }
			}
			if (args.column.validator) {
				var validationResults = args.column.validator(Val);
				if (!validationResults.valid) { return validationResults; }
			}
			return { valid: true, msg: null };
		};
		this.init();
	}

	function AutoCompleteEditor(args) {
		var $input, $wait, defaultValue, scope = this;
		this.init = function () {
			$input = $("<input type=text class='editor-text' />").appendTo(args.container);
			$wait = $("<div id='acwait' class='wait_img' style='z-index:10000;position:absolute;display:none;'>&nbsp;</div>").appendTo(document.body);
			var List = [];
			if ((args.column.listtxt) && (args.column.listval)) {
				var listtxt = args.column.listtxt.split("|");
				var listval = args.column.listval.split("|");
				for (var i = 0; i < listtxt.length; i++) { List.push({ value: listval[i], label: listtxt[i] }); }
			} else if (args.column.listtxt) {
				List = args.column.listtxt.split("|");
			} else if (args.column.listval) {
				List = args.column.listval.split("|");
			} else if (args.column.listds) {
				List = args.grid.getOptions().__OthDS[args.column.listds].Rows;
			} else if (args.column.listjson) {
				args.column.acminlen = args.column.acminlen || 3;
				args.column.acdelay = args.column.acdelay || 400;
				List = function (request, response) {
					var jqxhr = $.JSONPost(args.column.listjson, { "Term": request.term }, { WaitDiv: "acwait" });
					jqxhr.fail(function (jqXHR, textStatus, errorThrown) {
						response([]); alert(textStatus);
					});
					jqxhr.done(function (data, textStatus, jqXHR) {
						if ((data) && (data.d.RetVal == -1)) {
							if ((data.d.RetData) && (data.d.RetData.Tbl) && (data.d.RetData.Tbl.Rows)) {
								response(data.d.RetData.Tbl.Rows);
							} else {
								response([]);
							}
							data.d.RetMsg = data.d.RetMsg || '';
							if (data.d.RetMsg.length > 0) { alert(data.d.RetMsg); }
						} else {
							response([]);
							if ((data) && (data.d.RetMsg)) {
								if (data.d.RetMsg.length > 0) { alert(data.d.RetMsg); } else { alert('AJAX call error-please check with support.'); }
							} else { alert('AJAX call error-please check with support.'); }
						}
					});
				}
			}
			$input.autocomplete({ source: List, delay: (args.column.acdelay || 200), minLength: (args.column.acminlen || 1) });
			$input.focus().select();
			scope.position(args.position);
		};
		this.destroy = function () { $input.autocomplete("destroy"); $input.remove(); $wait.remove(); };
		this.focus = function () { $input.focus(); };
		this.position = function (position) { $wait.css("top", position.top + 2).css("left", position.left + $input.width() + 10); };
		this.loadValue = function (item) {
			defaultValue = item[args.column.field];
			$input.val(defaultValue);
			$input[0].defaultValue = defaultValue;
			$input.select();
		};
		this.serializeValue = function () { return $input.val(); };
		this.applyValue = function (item, state) { item[args.column.field] = state; };
		this.isValueChanged = function () { return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue); };
		this.validate = function () {
			if (args.column.validator) {
				var validationResults = args.column.validator(Val);
				if (!validationResults.valid) { return validationResults; }
			}
			return { valid: true, msg: null };
		};
		this.init();
	}

	function DropDownEditor(args) {
		var $select, defaultValue, scope = this;
		//Init defaults
		var C = args.column;
		this.init = function () {
			var _autocommit = ((C.editorautocommit || false) == true);  //default false
			var _listds = (C.listds || "");
			var _listval = (C.listval || "");
			var _listtxt = (C.listtxt || "");
			var _listblankrowtxt = (C.listblankrowtxt || "");
			var _listjson = (C.listjson || "");
			var _listjsonsendrowdata = ((C.listjsonsendrowdata || false) == true);  //default false
			var _listjsondata = (C.listjsondata || "").split("|"); //Field1|Value1|Field2|Value2
			var _listjsondatarowcnt = _listjsondata.length;
			var _listjsoncache = ((C.listjsoncache || true) == true);  //default true
			var _listkeyfield = (C.listkeyfield || "Val");
			var _listvaluefield = (C.listvaluefield || "Txt");
			$select = $("<select tabIndex='0' class='editor-dropdown'></select>");
			if (_listblankrowtxt) $select.append($('<option>', { value: "" }).text(_listblankrowtxt));
			if (_listtxt || _listval) { //pipe-delimited list
				var listtxt = (_listtxt || _listval).split("|");
				var listval = (_listval || _listtxt).split("|");
				for (var i = 0; i < listtxt.length; i++) {
					$select.append($('<option>', { value: listval[i] }).text(listtxt[i]));
				}
			}
			if (_listds) {
				var List = args.grid.getOptions().__OthDS[_listds].Rows;
				if (List.length > 0) {
					if (List[0][_listvaluefield] || List[0][_listkeyfield]) {
						for (var i = 0; i < List.length; i++) {
							$select.append($('<option>', { value: (List[i][_listkeyfield] || List[i][_listvaluefield]) }).text(List[i][_listvaluefield] || List[i][_listkeyfield]));
						}
					} else {
						for (var key in List[0]) break;
						for (var i = 0; i < List.length; i++) {
							$select.append($('<option>', { value: List[i][key] }).text(List[i][key]));
						}
					}
				}
			}
			if (_listjson) {
				var ListCache = args.grid.getOptions().__OthDS[_listjson];
				if (_listjsoncache && ListCache) {
					var R = ListCache.Rows, RowCnt = R.length;
					for (var i = 0; i < RowCnt; i++) {
						$select.append($('<option>', { value: R[i][_listkeyfield] }).text(R[i][_listvaluefield]));
					}
				} else { //load from json
					var Data = {};
					if (_listjsondatarowcnt > 1) {
						for (var j = 0; j < _listjsondatarowcnt; j += 2) {
							var FldName = _listjsondata[j];
							var Val = _listjsondata[j + 1];
							Data[FldName] = Val;
						}
					}
					if (_listjsonsendrowdata) $.extend(Data, args.item); //send back row data as well
					$.JSONPost(_listjson, Data).done(function (data) {
						var R = data.d.RetData.Tbl.Rows, RowCnt = R.length;
						for (var i = 0; i < RowCnt; i++) {
							$select.append($('<option>', { value: R[i][_listkeyfield] }).text(R[i][_listvaluefield]));
						}
						$select.val(defaultValue); //reapply default value
						if (_listjsoncache) args.grid.getOptions().__OthDS[_listjson] = data.d.RetData.Tbl; //cache result
					});
				}
			}
			$select.appendTo(args.container);
			if (_autocommit) { $select.change(function () { args.commitChanges(true); }); }
			$select.focus();
		};
		this.destroy = function () { $select.remove(); };
		this.focus = function () { $select.focus(); };
		this.loadValue = function (item) {
			defaultValue = item[args.column.field];
			$select.val(defaultValue); $select.select();
		};
		this.serializeValue = function () { return ($select.val()); };
		this.applyValue = function (item, state) { item[args.column.field] = state; };
		this.isValueChanged = function () { return ($select.val() != defaultValue); };
		this.validate = function () {
			if (args.column.validator) {
				var validationResults = args.column.validator($input.val());
				if (!validationResults.valid) { return validationResults; }
			}
			return { valid: true, msg: null };
		};
		this.init();
	}

	function CheckboxEditor(args) {
		var $select, defaultValue, scope = this;
		this.init = function () {
			$select = $("<input type=checkbox class='editor-checkbox' hideFocus>");
			$lbl = $("<label>").append($select).appendTo(args.container);
			$select.focus();
		};
		this.destroy = function () { $select.remove(); };
		this.focus = function () { $select.focus(); };
		this.loadValue = function (item) {
			defaultValue = item[args.column.field];
			if (defaultValue) { $select.attr("checked", "checked"); } else { $select.removeAttr("checked"); }
		};
		this.serializeValue = function () { return $select.is(":checked"); };
		this.applyValue = function (item, state) { item[args.column.field] = state; };
		this.isValueChanged = function () { return ($select.is(":checked") != defaultValue); };
		this.validate = function () {
			if (args.column.validator) {
				var validationResults = args.column.validator($input.val());
				if (!validationResults.valid) { return validationResults; }
			}
			return { valid: true, msg: null };
		};
		this.init();
	}

	function PercentCompleteEditor(args) {
		var $select, defaultValue, scope = this;
		this.init = function () {
			$input = $("<input type=text class='editor-percentcomplete' />");
			$input.width($(args.container).innerWidth() - 25);
			$input.appendTo(args.container);
			$picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
			$picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");
			$picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");
			$input.focus().select();
			$picker.find(".editor-percentcomplete-slider").slider({
				orientation: "vertical",
				range: "min",
				value: defaultValue,
				slide: function (event, ui) {
					$input.val(ui.value)
				}
			});
			$picker.find(".editor-percentcomplete-buttons button").bind("click", function (e) {
				$input.val($(this).attr("val"));
				$picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
			})
		};
		this.destroy = function () { $input.remove(); $picker.remove(); };
		this.focus = function () { $input.focus(); };
		this.loadValue = function (item) {
			$input.val(defaultValue = item[args.column.field]);
			$input.select();
		};
		this.serializeValue = function () { return parseInt($input.val(), 10) || 0; };
		this.applyValue = function (item, state) { item[args.column.field] = state; };
		this.isValueChanged = function () { return (!($input.val() == "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue); };
		this.validate = function () {
			if (isNaN(parseInt($input.val(), 10))) {
				return { valid: false, msg: "Please enter a valid positive number" };
			}
			if (args.column.validator) {
				var validationResults = args.column.validator($input.val());
				if (!validationResults.valid) { return validationResults; }
			}
			return { valid: true, msg: null };
		};
		this.init();
	}

	/*
	* An example of a "detached" editor.
	* The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
	* KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
	*/
	function LongTextEditor(args) {
		var $input, $wrapper, defaultValue, scope = this;
		var C = args.column;
		var EditorWidth = (C.EditorWidth || "250px");
		var EditorHeight = (C.EditorHeight || "80px");
		this.init = function () {
			var $container = $("body");
			$wrapper = $("<div style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray;-moz-border-radius:5px;border-radius:5px;'/>")
					.appendTo($container);
			$input = $("<textarea hidefocus rows=5 style='backround:white;width:" + EditorWidth + ";height:" + EditorHeight + ";border:0;outline:0'>")
					.appendTo($wrapper);
			$("<div style='text-align:right'><button>Save</button><button>Cancel</button></div>")
					.appendTo($wrapper);
			$wrapper.find("button:first").bind("click", this.savenomove);
			$wrapper.find("button:last").bind("click", this.cancel);
			$input.bind("keydown", this.handleKeyDown);
			scope.position(args.position);
			$input.focus().select();
		};
		this.handleKeyDown = function (e) {
			if (e.which == $.ui.keyCode.ENTER && e.ctrlKey) {
				scope.save();
			} else if (e.which == $.ui.keyCode.ESCAPE) {
				e.preventDefault(); scope.cancel();
			} else if (e.which == $.ui.keyCode.TAB && e.shiftKey) {
				e.preventDefault(); args.grid.navigatePrev();
			} else if (e.which == $.ui.keyCode.TAB) {
				e.preventDefault(); args.grid.navigateNext();
			}
		};
		this.save = function () { args.commitChanges(); };
		this.savenomove = function () { args.commitChanges(true); };
		this.cancel = function () { $input.val(defaultValue); args.cancelChanges(); };
		this.hide = function () { $wrapper.hide(); };
		this.show = function () { $wrapper.show(); };
		this.position = function (position) {
			$wrapper.css("top", position.top - 5).css("left", position.left - 5);
		};
		this.destroy = function () { $wrapper.remove(); };
		this.focus = function () { $input.focus(); };
		this.loadValue = function (item) {
			$input.val(defaultValue = item[args.column.field]);
			$input.select();
		};
		this.serializeValue = function () { return $input.val(); };
		this.applyValue = function (item, state) { item[args.column.field] = state; };
		this.isValueChanged = function () { return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue); };
		this.validate = function () {
			if (args.column.validator) {
				var validationResults = args.column.validator($input.val());
				if (!validationResults.valid) { return validationResults; }
			}
			return { valid: true, msg: null };
		};
		this.init();
	}
})(jQuery);
