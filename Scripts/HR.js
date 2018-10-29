function GetMonths() {
	var opt = '', currMonth = moment().month();
	opt += '<option>-- Please Select --</option>';
	for (var i = -3; i <= 11; i++) {
		var now = moment().add('months', i);
		opt += '<option value="' + now.month() + '" title="' + now.format('MMMM, YYYY') + '">' + now.format('MMMM, YYYY') + '</option>';
	}
	return opt;
}
function GetMonths($sel) {
	$sel.append($('<option>', { value: '', text: '-- Please Select --' }));
	for (var i = -3; i <= 11; i++) {
		var now = moment().add('months', i);
		$sel.append($('<option>', { value: now.month(), text: now.format('MMMM'), title: now.format('MMMM') }));
	}
}
function GetMonthsWithYear($sel) {
	$sel.append($('<option>', {value: '', text: '-- Please Select --'}));
	for (var i = -3; i <= 11; i++) {
		var now = moment().add('months', i);
		$sel.append($('<option>', { value: now.month(), text: now.format('MMMM, YYYY'), title: now.format('MMMM, YYYY') }));
	}
}
function GetDays() {
	var opt = '';
	opt += '<option>-- Please Select --</option>';
	for (var i = 0; i <= 6; i++) {
		opt += '<option value="' + i + '">' + moment().day(i).format('dddd') + '</option>';
	}
	return opt;
}
function GetDays($sel, callback) {
	$sel.append($('<option>', { value: '', text: '-- Please Select --', title: 'Please select day(s)' }));
	for (var i = 0; i <= 6; i++) {
		$sel.append($('<option>', { value: i, text: moment().day(i).format('dddd'), title: moment().day(i).format('dddd') }));
	}
	if (callback && typeof (callback) === 'function') { callback(); }
}
function SplitString(input, seperator, index) {
	var opts = input.split(seperator);
	if (index != undefined || index != null) {
		return opts[index];
	}
	else {
		return opts;
	}
}
function StrToArray(input, seperator) {
	return input.split(seperator);
}
function ArrayToStr(arr, seperator) {
	var retVal = '';
	if (arr !== null && arr !== undefined) {
		for (var i = 0; i < arr.length; i++) {
			retVal += arr[i] + seperator;
		}
		retVal = retVal.substr(0, retVal.length - 1);
	}
	return retVal;
}
function GetEmployeeGroups($sel) {
	$.JSONPost('Main1.GetLookup.json', { 'TblName': 'tblHRLookup', 'LookupCat': 'EmpGroup' })
		.done(function (data) {
			var R = data.d.RetData.Tbl.Rows, RowCnt = R.length; $sel.html('');
			$sel.append($('<option>', { value: '', text: '-- Please Select --', title: 'Please select' }));
			if (RowCnt > 0) {
				for (var i = 0; i < RowCnt; i++) {
					$sel.append($('<option>', { value: R[i].Description, text: R[i].Description, title: R[i].Description }));
				}
			}
		});
}
function GetDefaultWorkflow($sel) {
	$.JSONPost('HR2.GetCurrentWorkflows.json', { 'Category': 'ELeave' })
		.done(function (data) {
			var R = data.d.RetData.Tbl.Rows, RowCnt = R.length; $sel.html('');
			$sel.append($('<option>', { value: '', text: '-- Please Select --', title: 'Please select' }));
			if (RowCnt > 0) {
				for (var i = 0; i < RowCnt; i++) {
					$sel.append($('<option>', { value: R[i].WorkflowID, text: R[i].WorkflowID, title: R[i].WorkflowID }));
				}
			}
		});
}
function GetDefaultEmpCategories($sel) {
	$.JSONPost('Main1.GetLookup.json', { 'TblName': 'tblHRLookup', 'LookupCat': 'EmpCategory' })
		.done(function (data) {
			var R = data.d.RetData.Tbl.Rows, RowCnt = R.length; $sel.html('');
			$sel.append($('<option>', { value: '', text: '-- Please Select --', title: 'Please select' }));
			if (RowCnt > 0) {
				for (var i = 0; i < RowCnt; i++) {
					$sel.append($('<option>', { value: R[i].Description, text: R[i].Description, title: R[i].Description }));
				}
			}
		});
}
function GetRelationships($sel, callback) {
	$.JSONPost('HR2.GetRelationships.json')
		.done(function (data) {
			var R = data.d.RetData.Tbl.Rows, RowCnt = R.length; $sel.html('');
			$sel.append($('<option>', { value: '', text: '-- Please Select --', title: 'Please select' }));
			if (RowCnt > 0) {
				for (var i = 0; i < RowCnt; i++) {
					$sel.append($('<option>', { value: R[i].RelKeyAB, text: R[i].RelKeyAB, title: R[i].RelKeyAB }));
				}
			}
			if (callback && typeof (callback) === 'function') { callback(); }
		});
}

function IsValidEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
function IsValidContact(contactno) {
	var re = /^\+{0,1}\d{8,}$/;
	return re.test(contactno);
}
