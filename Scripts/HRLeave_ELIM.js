var WorkingDays = '';
function MonthName(input) {
  var MonthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return MonthList[input];
}
function DayName(input) {
  var DayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return DayList[input];
}
function DayNum(input) {
  switch (input) {
    case 'Sun': return 0; break;
    case 'Mon': return 1; break;
    case 'Tue': return 2; break;
    case 'Wed': return 3; break;
    case 'Thu': return 4; break;
    case 'Fri': return 5; break;
    case 'Sat': return 6; break;
  }
}
function ConvertDateToLocal(input) {
  var date = SplitString(input, 'T', 0);
  var opt = date.split('-');
  var newDate = opt[0] + '/' + opt[1] + '/' + opt[2];
  return new Date(newDate);
}
function BuildLongDate(input) {
  var day = DayName(input.getDay()); var date = input.getDate(); var month = MonthName(input.getMonth()); var year = input.getFullYear();
  return day + ', ' + date + ' ' + month + ' ' + year;
}
function BuildShortDate(input) {
  return input.getDate() + ' ' + MonthName(input.getMonth()) + ' ' + input.getFullYear();
}
function PopulateMonthList() {
  var opt = '', currMonth = new Date().getMonth(), now = new Date();
  opt += '<option>--Please Choose--</option>';
  for (var i = -3; i <= 11; i++) {
    opt += '<option value="' + new Date(now.getFullYear(), now.getMonth() + i, 1).getMonth() + '">' + MonthName(new Date(now.getFullYear(), now.getMonth() + i, 1).getMonth()) + ', ' + new Date(now.getFullYear(), now.getMonth() + i, 1).getFullYear() + '</option>';
  }
  return opt;
}
function StringToCurrency(string) {
  if (string == '' || string == null) { return ''; }
  else { return parseFloat(string, 10).toFixed(2); }
}
function GenLeaveSelection(data) {
  var Duration = ''; if (data.hasOwnProperty('d')) { Duration = data.d.RetData.Tbl.Rows[0].Duration; } else { Duration = data.Duration; }
  var Negative = ''; if (data.hasOwnProperty('d')) { Negative = data.d.RetData.Tbl.Rows[0].Others.toLowerCase().indexOf('negative') >= 0; } else { Negative = data.Others.toLowerCase().indexOf('negative') >= 0; }
  var Selection = []; if (data.hasOwnProperty('d')) { Selection = []; } else { Selection = data.Selection; }
  //var Mode = ''; if (data.hasOwnProperty('d')) { Mode = '' } else { Mode = data.Mode; }
  if (data.d != undefined) { data.CID = data.d.RetData.Tbl.Rows[0].CatID; }
  $.JSONPost("HR1.GetStaffAcct.json", data)
    .then(function (data) { //This is shorthand for .done().fail() so have to test for failure case
      if ((data) && (data.d.RetVal == -1)) {
        var R = data.d.RetData.Tbl.Rows;
        GenLeaveSelectionTBL(R[0].Balance, Duration, Negative, Selection, $.parseQS().Mode, R[0].Name);
      }
    });
}
function RoleIDAutoCompleteSingle() {
  $('.staff')
    .bind("keydown", function (event) {
      if (event.keyCode === $.ui.keyCode.TAB &&
					$(this).data("autocomplete").menu.active) {
        event.preventDefault();
      }
    })
    .autocomplete({
      source: function (req, callback) { //pass request to server
        var search = { "StaffSearch": extractLast(req.term), "NoOfRows": 20, 'Type': 'RoleID' };
        $.JSONPost("HR1.GetStaffList.json", search)
				  .then(function (data) { //This is shorthand for .done().fail() so have to test for failure case
				    var list = [];
				    if ((data) && (data.d.RetVal == -1)) {
				      var Tbl = data.d.RetData.Tbl;
				      var RowCnt = Tbl.Rows.length;
				      for (var i = 0; i < RowCnt; i++) {
				        list.push({ "label": Tbl.Rows[i].Txt + ' (' + Tbl.Rows[i].RoleID + ')' });
				      }
				    }
				    callback(list);
				  });
      }
    });
}
function LeaderAutoCompleteSingle() {
  $('.staff')
    .bind("keydown", function (event) {
      if (event.keyCode === $.ui.keyCode.TAB &&
					$(this).data("autocomplete").menu.active) {
        event.preventDefault();
      }
    })
    .autocomplete({
      source: function (req, callback) { //pass request to server
        var search = { "StaffSearch": extractLast(req.term), "NoOfRows": 20, 'Type': 'LeaderID' };
        $.JSONPost("HR1.GetStaffList.json", search)
				  .then(function (data) { //This is shorthand for .done().fail() so have to test for failure case
				    var list = [];
				    if ((data) && (data.d.RetVal == -1)) {
				      var Tbl = data.d.RetData.Tbl;
				      var RowCnt = Tbl.Rows.length;
				      for (var i = 0; i < RowCnt; i++) {
				        list.push({ "value": Tbl.Rows[i].Val, "label": Tbl.Rows[i].Txt + ' (' + Tbl.Rows[i].RoleID + ')' });
				      }
				    }
				    callback(list);
				  });
      }
    });
}
function StaffAutoCompleteSingle() {
  $('.staff')
    .bind("keydown", function (event) {
      if (event.keyCode === $.ui.keyCode.TAB &&
					$(this).data("autocomplete").menu.active) {
        event.preventDefault();
      }
    })
    .autocomplete({
      source: function (req, callback) { //pass request to server
        var search = { "StaffSearch": extractLast(req.term), "NoOfRows": 20, 'Type': 'RoleID' };
        $.JSONPost("HR1.GetStaffList.json", search)
				  .then(function (data) { //This is shorthand for .done().fail() so have to test for failure case
				    var list = [];
				    if ((data) && (data.d.RetVal == -1)) {
				      var Tbl = data.d.RetData.Tbl;
				      var RowCnt = Tbl.Rows.length;
				      for (var i = 0; i < RowCnt; i++) {
				        list.push({ "label": Tbl.Rows[i].Txt + ' (' + Tbl.Rows[i].RoleID + ')' });
				      }
				    }
				    callback(list);
				  });
      }
    });
}
function StaffAutoComplete() {
  $('.staff')
    .bind("keydown", function (event) {
      if (event.keyCode === $.ui.keyCode.TAB &&
					$(this).data("autocomplete").menu.active) {
        event.preventDefault();
      }
    })
    .autocomplete({
      source: function (req, callback) { //pass request to server
        var search = { "StaffSearch": extractLast(req.term), "NoOfRows": 20 };
        $.JSONPost("HR1.GetStaffList.json", search)
				  .then(function (data) { //This is shorthand for .done().fail() so have to test for failure case
				    var list = [];
				    if ((data) && (data.d.RetVal == -1)) {
				      var Tbl = data.d.RetData.Tbl;
				      var RowCnt = Tbl.Rows.length;
				      for (var i = 0; i < RowCnt; i++) {
				        list.push({ "label": Tbl.Rows[i].Txt + ' (' + Tbl.Rows[i].PersonID + ')' });
				      }
				    }
				    callback(list);
				  });
      },
      select: function (event, ui) {
        var terms = split(this.value);
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push(ui.item.value);
        // add placeholder to get the comma-and-space at the end
        terms.push("");
        this.value = terms.join(", ");
        return false;
      }
    });
}
function StaffEmailAutoComplete() {
  $('.staffemail')
    .bind("keydown", function (event) {
      if (event.keyCode === $.ui.keyCode.TAB &&
					$(this).data("autocomplete").menu.active) {
        event.preventDefault();
      }
    })
    .autocomplete({
      source: function (req, callback) { //pass request to server
        var search = { "StaffSearch": extractLast(req.term), "NoOfRows": 20, "Type": "Email" };
        $.JSONPost("HR1.GetStaffList.json", search)
				  .then(function (data) { //This is shorthand for .done().fail() so have to test for failure case
				    var list = [];
				    if ((data) && (data.d.RetVal == -1)) {
				      var Tbl = data.d.RetData.Tbl;
				      var RowCnt = Tbl.Rows.length;
				      for (var i = 0; i < RowCnt; i++) {
				        list.push({ "value": Tbl.Rows[i].Val, "label": Tbl.Rows[i].Txt + ' (' + Tbl.Rows[i].PersonID + ')' });
				      }
				    }
				    callback(list);
				  });
      },
      select: function (event, ui) {
        var terms = split(this.value);
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push(ui.item.value);
        // add placeholder to get the comma-and-space at the end
        terms.push("");
        this.value = terms.join(", ");
        return false;
      }
    });
}
function StaffMobileAutoComplete() {
  $('.staffmobile')
    .bind("keydown", function (event) {
      if (event.keyCode === $.ui.keyCode.TAB &&
					$(this).data("autocomplete").menu.active) {
        event.preventDefault();
      }
    })
    .autocomplete({
      source: function (req, callback) { //pass request to server
        var search = { "StaffSearch": extractLast(req.term), "NoOfRows": 20, "Type": "Mobile" };
        $.JSONPost("HR1.GetStaffList.json", search)
				  .then(function (data) { //This is shorthand for .done().fail() so have to test for failure case
				    var list = [];
				    if ((data) && (data.d.RetVal == -1)) {
				      var Tbl = data.d.RetData.Tbl;
				      var RowCnt = Tbl.Rows.length;
				      for (var i = 0; i < RowCnt; i++) {
				        list.push({ "value": Tbl.Rows[i].Val, "label": Tbl.Rows[i].Txt + ' (' + Tbl.Rows[i].RoleID + ')' });
				      }
				    }
				    callback(list);
				  });
      },
      select: function (event, ui) {
        var terms = split(this.value);
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push(ui.item.value);
        // add placeholder to get the comma-and-space at the end
        terms.push("");
        this.value = terms.join(", ");
        return false;
      }
    });
}
function split(val) {
  return val.split(/,\s*/);
}
function extractLast(term) {
  return split(term).pop();
}
function GetHolidays(callback) {
  $.JSONPost("HR1.GetHolidays.json", {})
    .then(function (data) {
      if ((data) && (data.d.RetVal == -1)) {
        var R = data.d.RetData.Tbl.Rows, RowCnt = R.length, HTMLString = '';
        HTMLString += '<table id="PHTbl"><tbody>';
        for (var i = 0; i < RowCnt; i++) {
          window.HolidayList.push({ 'subject': R[i].Subject, 'startdate': moment(R[i].TargetDate), 'enddate': moment(R[i].EndDate), 'category': R[i].Category });
          var TimeNow = moment(), StartTime = moment(R[i].TargetDate);
          if (i % 3 == 0) { HTMLString += '<tr>'; }
          if (R[i].EndDate != null) {
            HTMLString += '<td'; if (TimeNow.diff(StartTime) == 0) { HTMLString += ' class="ph"'; } HTMLString += '>'; if (R[i].Subject.indexOf('|') > 0) HTMLString += R[i].Subject.split('|')[0]; else HTMLString += R[i].Subject; HTMLString += ' (' + StartTime.format('DD MMM YYYY') + ' - ' + moment(R[i].EndDate).format('DD MMM YYYY') + ')</td>';
          }
          else {
            HTMLString += '<td'; if (TimeNow.diff(StartTime) == 0) { HTMLString += ' class="ph"'; } HTMLString += '>'; if (R[i].Subject.indexOf('|') > 0) HTMLString += R[i].Subject.split('|')[0]; else HTMLString += R[i].Subject; HTMLString += ' (' + StartTime.format('DD MMM YYYY') + ')</td>';
          }
          if (i % 3 == 2) { HTMLString += '</tr>'; }
        }
        HTMLString += '</tbody></table>';
        if ($('#LegendPane').length > 0) { $('#LegendPane').append('<br />' + HTMLString); $('#PHTbl').css({ 'border': '#000 solid 1px' }); }
      }
      if (callback && typeof (callback) === 'function') { callback(); }
    });
}
function BuildCalendar() {
  var NoOfDays, year = window.SelYear;
  var month = window.SelMth;
  var CID = 0;
  NoOfDays = new Date(year, month + 1, 0).getDate();
  var data = { 'Year': year, 'Month': month + 1, 'CID': CID };
  $.JSONPost('HR1.GetLeaveTranByMonth.json', data)
    .then(function (data) {
      var HTMLString = '';
      if ($('#CalendarTbl').length > 0) { $(this).remove(); }
      HTMLString += '<table id="CalendarTbl" width="100%">';
      if ((data) && (data.d.RetVal == -1)) {
        var R = data.d.RetData.Tbl.Rows; var RowCnt = R.length, list = [], dates = [], leaveObj;
        HTMLString += '<thead><tr class="border">';
        for (var j = 0; j <= NoOfDays; j++) {
          if (j == 0) {
            HTMLString += '<td width="10%">&nbsp;</td>';
          }
          else {
            var date = moment([year, month, j]), day = date.day(), isPH = false;
            for (var h = 0; h < window.HolidayList.length; h++) {
              if (window.HolidayList[h].enddate == null || window.HolidayList.enddate == '') { if (date.diff(moment(window.HolidayList[h].startdate), 'days') == 0) { isPH = true; HTMLString += '<td class="ph ctr">' + moment.weekdaysShort[day] + '<br />' + j + '</td>'; break; } }
              else { if (date.diff(moment(window.HolidayList[h].startdate), 'days') >= 0 && moment(window.HolidayList[h].enddate).diff(date, 'days') >= 0) { isPH = true; HTMLString += '<td class="ph ctr">' + moment.weekdaysShort[day] + '<br />' + j + '</td>'; break; } }
            }
            if (isPH == false) {
              if (day == 0 || day == 6) {
                HTMLString += '<td class="weekends ctr">' + DayName(day) + '<br />' + j + '</td>';
              }
              else {
                HTMLString += '<td class="ctr">' + DayName(day) + '<br />' + j + '</td>';
              }
            }
          }
        }
        HTMLString += '</tr></thead>';
        HTMLString += '<tbody>';
        for (var i = 0; i < RowCnt; i++) {
          var item = new Object();
          leaveObj = $.parseJSON(R[i].RawJSON);
          if (list.length == 0) { item.Name = R[i].DisplayName; item.PersonID = R[i].PersonID; }
          else {
            for (var m = list.length - 1; m < list.length; m++) {
              if (list[m].PersonID != R[i].PersonID) { dates = []; item.Name = R[i].DisplayName; item.PersonID = R[i].PersonID; }
            }
          }
          for (var j = 1; j <= NoOfDays; j++) {
            var date = moment([year, month, j]), day = date.day();
            if (date.diff(moment(leaveObj.StartDate), 'days') >= 0 && moment(leaveObj.EndDate).diff(date) >= 0) {
              for (var k = 0; k < leaveObj.Selection.length; k++) {
                var item2 = new Object(), exists = false;
                var seldate = moment(leaveObj.Selection[k].Date);
                if (date.diff(seldate) == 0) {
                  if (leaveObj.Selection[k].AM == '1' && leaveObj.Selection[k].PM == '1') {
                    if (list.length == 0) { item2.date = seldate; if (R[i].CaseStatus == 'Active') { item2.Code = 'Y'; } else { item2.Code = 'O'; } dates.push(item2); item2.Duration = 'FD'; item.Dates = dates; list.push(item); break; }
                    else {
                      for (var m = list.length - 1; m < list.length; m++) {
                        if (list[m].PersonID != R[i].PersonID) { item2.date = seldate; if (R[i].CaseStatus == 'Active') { item2.Code = 'Y'; } else { item2.Code = 'O'; } item2.Duration = 'FD'; dates.push(item2); item.Dates = dates; list.push(item); break; }
                        else {
                          var exists = false, index = 0;
                          for (var n = 0; n < list[m].Dates.length; n++) {
                            if (moment(list[m].Dates[n].date).diff(seldate) == 0) { exists = true; index = n; break; }
                          }
                          if (exists) {
                            if ((list[m].Dates[index].Code == 'Y' && R[i].CaseStatus != 'Active') || (list[m].Dates[index].Code == 'O' && R[i].CaseStatus == 'Active')) { list[m].Dates[index].Code = 'O'; }
                          }
                          else {
                            item2.date = seldate; if (R[i].CaseStatus == 'Active') { item2.Code = 'Y'; } else { item2.Code = 'O'; } item2.Duration = 'FD'; list[m].Dates.push(item2);
                          }
                        }
                      }
                    }
                  }
                  else if ((leaveObj.Selection[k].AM == '0' && leaveObj.Selection[k].PM == '1') || (leaveObj.Selection[k].AM == '1' && leaveObj.Selection[k].PM == '0')) {
                    if (list.length == 0) { item2.date = seldate; if (R[i].CaseStatus == 'Active') { item2.Code = 'Y'; } else { item2.Code = 'O'; } if (leaveObj.Selection[k].AM == '0') { item2.Duration = 'PM'; } else { item2.Duration = 'AM'; } dates.push(item2); item.Dates = dates; list.push(item); break; }
                    else {
                      for (var m = list.length - 1; m < list.length; m++) {
                        if (list[m].PersonID != R[i].PersonID) { item2.date = seldate; if (R[i].CaseStatus == 'Active') { item2.Code = 'Y'; } else { item2.Code = 'O'; } if (leaveObj.Selection[k].AM == '0') { item2.Duration = 'PM'; } else { item2.Duration = 'AM'; } dates.push(item2); item.Dates = dates; list.push(item); break; }
                        else {
                          var exists = false, index = 0;
                          for (var n = 0; n < list[m].Dates.length; n++) {
                            if (moment(list[m].Dates[n].date).diff(seldate) == 0) { exists = true; index = n; break; }
                          }
                          if (exists) {
                            if ((list[m].Dates[index].Code == 'Y' && R[i].CaseStatus != 'Active') || (list[m].Dates[index].Code == 'O' && R[i].CaseStatus == 'Active')) { list[m].Dates[index].Code = 'O'; }
                          }
                          else {
                            item2.date = seldate; if (R[i].CaseStatus == 'Active') { item2.Code = 'Y'; } else { item2.Code = 'O'; } if (leaveObj.Selection[k].AM == '0') { item2.Duration = 'PM'; } else { item2.Duration = 'AM'; } list[m].Dates.push(item2);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        for (var i = 0; i < list.length; i++) {
          HTMLString += '<tr class="border">';
          for (var j = 0; j <= NoOfDays; j++) {
            if (j == 0) { HTMLString += '<td class="ctr">' + list[i].Name + '</td>'; }
            else {
              var date = moment([year, month, j]), day = date.day(), index = 0, isPH = false;
              for (var h = 0; h < window.HolidayList.length; h++) {
                if (window.HolidayList[h].enddate == null || window.HolidayList.enddate == '') { if (date.diff(moment(window.HolidayList[h].startdate), 'days') == 0) { isPH = true; HTMLString += '<td class="ph ctr">&nbsp;</td>'; break; } }
                else { if (date.diff(moment(window.HolidayList[h].startdate), 'days') >= 0 && moment(window.HolidayList[h].enddate).diff(date, 'days') >= 0) { isPH = true; HTMLString += '<td class="ph ctr">&nbsp;</td>'; break; } }
              }
              if (isPH == false) {
                for (var k = 0; k < list[i].Dates.length; k++) {
                  if (date < list[i].Dates[k].date || date > list[i].Dates[k].date) {
                    if (index == list[i].Dates.length - 1) {
                      HTMLString += '<td'; if (day == 0 || day == 6) { HTMLString += ' class="weekends"'; } HTMLString += '>&nbsp;</td>'; index = 0;
                    } else {
                      index += 1;
                    }
                  }
                  else {
                    HTMLString += '<td '; if (list[i].Dates[k].Code == 'O') { HTMLString += 'class="red ctr">'; } else { HTMLString += 'class="yellow ctr">'; } if (list[i].Dates[k].Duration == 'PM') HTMLString += '<strong>PM</strong>'; else if (list[i].Dates[k].Duration == 'AM') HTMLString += '<strong>AM</strong>'; else HTMLString += '&nbsp;</td>';
                  }
                }
              }
            }
          }
          HTMLString += '</tr>';
        }
        HTMLString += '</tbody>';
      }
      else {
        for (var i = 0; i <= 0; i++) {
          HTMLString += '<thead><tr>';
          for (var j = 0; j <= NoOfDays; j++) {
            if (i == 0) {
              if (j == 0) {
                HTMLString += '<td width="10%">&nbsp;</td>';
              }
              else {
                var date = moment([year, month, j]), day = date.day(), isPH = false;
                for (var h = 0; h < window.HolidayList.length; h++) {
                  if (window.HolidayList[h].enddate == null || window.HolidayList.enddate == '') { if (date.diff(moment(window.HolidayList[h].startdate), 'days') == 0) { isPH = true; HTMLString += '<td class="ph ctr">' + moment.weekdaysShort[day] + '<br />' + j + '</td>'; break; } }
                  else { if (date.diff(moment(window.HolidayList[h].startdate), 'days') >= 0 && moment(window.HolidayList[h].enddate).diff(date, 'days') >= 0) { isPH = true; HTMLString += '<td class="ph ctr">' + moment.weekdaysShort[day] + '<br />' + j + '</td>'; break; } }
                }
                if (isPH == false) {
                  if (day == 0 || day == 6) {
                    HTMLString += '<td class="weekends ctr">' + moment.weekdaysShort[day] + '<br />' + j + '</td>';
                  }
                  else {
                    HTMLString += '<td class="ctr">' + moment.weekdaysShort[day] + '<br />' + j + '</td>';
                  }
                }
              }
            }
          }
          HTMLString += '</tr></thead>';
        }
      }
      HTMLString += '</table>';
      $('#CalendarPane').html(HTMLString);
      $('#CalendarTbl').css('border', '1px solid #D9D9D9');
    });
}
function GetWorkingDays(callback) {
  var QS = $.parseQS(); if (WorkingDays != '') { WorkingDays = ''; }
  if (QS.PID != undefined) {
    $.JSONPost('HR1.GetStaffData.json', { 'PID': QS.PID })
      .then(function (data) {
        if ((data) && (data.d.RetVal == -1)) {
          var R = data.d.RetData.Tbl.Rows, RowCnt = R.length;
          if (RowCnt > 0) {
            for (var i = 0; i < RowCnt; i++) {
              staffObj = $.parseJSON(R[i].RawJSON), list = [];
              if (staffObj.WorkingDays != null) {
                list = staffObj.WorkingDays; for (var k = 0; k < list.length; k++) { if (k === (list.length - 1)) { WorkingDays += DayNum(list[k]); } else { WorkingDays += DayNum(list[k]) + ','; } }
              }
              else {
                $.JSONPost('HR1.GetLookup.json', { 'LookupCat': 'WorkingDays', 'LookupKey': 'WorkingDays' })
                  .then(function (data) {
                    if ((data) && (data.d.RetVal == -1)) {
                      var R = data.d.RetData.Tbl.Rows, RowCnt = R.length, list = [];
                      if (RowCnt > 0) {
                        for (var i = 0; i < RowCnt; i++) {
                          list = (R[i].Description).split(','); for (var k = 0; k < list.length; k++) {
                            if (k === (list.length - 1)) { WorkingDays += DayNum(list[k]); } else {
                              WorkingDays += DayNum(list[k]) + ',';
                            }
                          }
                        }
                      }
                      else {
                        list = ('Mon,Tue,Wed,Thu,Fri').split(','); for (var k = 0; k < list.length; k++) { if (k === (list.length - 1)) { WorkingDays += DayNum(list[k]); } else { WorkingDays += DayNum(list[k]) + ','; } }
                      }
                    }
                    else { list = ('Mon,Tue,Wed,Thu,Fri').split(','); for (var k = 0; k < list.length; k++) { if (k === (list.length - 1)) { WorkingDays += DayNum(list[k]); } else { WorkingDays += DayNum(list[k]) + ','; } } }
                    if (callback && typeof (callback) === "function") { callback(); }
                  });
              }
              if (callback && typeof (callback) === "function") { callback(); }
            }
          }
        }
      });
  }
  else {
    $.JSONPost('HR1.GetLookup.json', { 'LookupCat': 'WorkingDays', 'LookupKey': 'WorkingDays' })
      .then(function (data) {
        if ((data) && (data.d.RetVal == -1)) {
          var R = data.d.RetData.Tbl.Rows, RowCnt = R.length, list = [];
          for (var i = 0; i < RowCnt; i++) { list = (R[i].Description).split(','); for (var k = 0; k < list.length; k++) { if (k === (list.length - 1)) { WorkingDays += DayNum(list[k]); } else { WorkingDays += DayNum(list[k]) + ','; } } }
        }
        else { list = ('Mon,Tue,Wed,Thu,Fri').split(','); for (var k = 0; k < list.length; k++) { if (k === (list.length - 1)) { WorkingDays += DayNum(list[k]); } else { WorkingDays += DayNum(list[k]) + ','; } } }
        if (callback && typeof (callback) === "function") { callback(); }
      });
  }
}
function CalendarSelConfig(callback) {
  var data = { 'LookupCat': 'CalSelection', 'LookupKey': 'Disabled' };
  $.JSONPost('HR1.GetLookup.json', data)
    .then(function (data) {
      if ((data) && (data.d.RetVal == -1)) {
        var R = data.d.RetData.Tbl.Rows;
        window.CalSelectionConfig = R[0].Description;
      }
      else { window.CalSelectionConfig = 'No'; }
      if (callback && typeof (callback) === 'function') { callback(); }
    });
}
function GenLeaveSelectionTBL(balance, duration, negative, selection, mode, lvcat) {
  window.HasBlockDate = false; window.Total = 0;
  GetWorkingDays(function () {
  	CalendarSelConfig(function () {
  		$.JSONPost("HR1.GetHolidays.json", {})
        .then(function (data) {
        	var HolidayList = [];
        	if ((data) && (data.d.RetVal == -1)) {
        		var R = data.d.RetData.Tbl.Rows, RowCnt = R.length;
        		for (var i = 0; i < RowCnt; i++) {
        			HolidayList.push({ 'subject': R[i].Subject, 'startdate': R[i].TargetDate, 'enddate': R[i].EndDate, 'category': R[i].Category });
        		}
        	}
        	var HTMLString = '';
        	var Balance = balance;
        	var StartDate = $('#StartDate').datepicker('getDate'); var EndDate = $('#EndDate').datepicker('getDate');
        	var NoOfDays = ((EndDate - StartDate) / 86400000) + 1; var DaysAccummulated = 0.0;
        	if ($('#LeaveSelectionPane').children('table').length > 0) {
        		$('#LeaveSelectionPane table').remove();
        	}
        	HTMLString += '<hr /><div class="inline"><strong>Please Select</strong></div><br class="clearboth" />';
        	HTMLString += '<div class="inline four"><table id="LeaveSelectionTbl" width="100%"><tbody>';
        	for (var j = 0; j <= NoOfDays; j++) {
        		if (j == 0) {
        			HTMLString += '<thead><tr>';
        			HTMLString += '<th class="ctr one">Date</th>';
        			HTMLString += '<th class="ctr one">AM</th>';
        			HTMLString += '<th class="ctr one">PM</th>';
        			HTMLString += '<th class="ctr one">Remarks</th>';
        			HTMLString += '</tr></thead><tbody>';
        		}
        		else {
        			HTMLString += '<tr>';
        			var date = new Date(StartDate.setDate(StartDate.getDate() + (j - 1))); var day = date.getDay();
        			var isPH = false; var Subject = '';
        			if (HolidayList.length > 0) {
        				for (var k = 0; k < HolidayList.length; k++) {
        					var HolidayStartDate = new Date(SplitString(HolidayList[k].startdate, 'T', 0));
        					if (HolidayList[k].enddate != null) {
        						var HolidayEndDate = new Date(SplitString(HolidayList[k].enddate, 'T', 0));
        						if (date >= new Date(HolidayStartDate.getFullYear(), HolidayStartDate.getMonth(), HolidayStartDate.getDate()) && date <= new Date(HolidayEndDate.getFullYear(), HolidayEndDate.getMonth(), HolidayEndDate.getDate())) {
        							Subject = HolidayList[k].subject; isPH = true;
        						}
        					}
        					else {
        						if (new Date(HolidayStartDate.getFullYear(), HolidayStartDate.getMonth(), HolidayStartDate.getDate()).getTime() == date.getTime()) {
        							Subject = HolidayList[k].subject; isPH = true;
        						}
        					}
        				}
        			}
        			HTMLString += '<td class="ctr'; if (day == 0 || day == 6) { HTMLString += ' weekends'; } HTMLString += '">' + moment(date).format('ddd, DD MMM YYYY') + '</td>';
        			HTMLString += '<td class="ctr'; if (day == 0 || day == 6) {
        				HTMLString += ' weekends';
        			} HTMLString += '"><input type="checkbox" id="cbAM_' + j + '"';
        			if (WorkingDays.indexOf(day) >= 0 && isPH == false) {
        				if (Balance > 0) {
        					if (Balance > DaysAccummulated || negative == true) {
        						if (day !== 6) {
        							HTMLString += ' checked="checked"'; DaysAccummulated += 0.5;
        						} else {
        							if (Balance.toString().indexOf('.') < 0) { HTMLString += ' checked="checked"'; DaysAccummulated += 0.5; }
        						}
        					}
        				} else {
        					if (lvcat in { 'No Pay Leave': 1, 'National Service Leave': 1 }) { HTMLString += ' checked="checked"'; DaysAccummulated += 0.5; }
        				}
        			} else if (window.CalSelectionConfig == 'No') {
        				HTMLString += ' disabled="disabled"';
        			} HTMLString += ' /></td>';
        			HTMLString += '<td class="ctr'; if (day == 0 || day == 6) { HTMLString += ' weekends'; } HTMLString += '"><input type="checkbox" id="cbPM_' + j + '"'; if (WorkingDays.indexOf(day) >= 0 && isPH == false) {
        				if (Balance > 0) {
        					if (Balance > DaysAccummulated || negative == true) {
        						if (day == 6) {
        							if (lvcat == 'Medical Leave') { HTMLString += 'checked="checked"'; DaysAccummulated += 0.5; }
        							HTMLString += 'disabled="disabled"';
        						} else if (day !== 6) {
        							HTMLString += ' checked="checked"'; DaysAccummulated += 0.5;
        						} else {
        							if (Balance.toString().indexOf('.') < 0) { HTMLString += ' checked="checked"'; DaysAccummulated += 0.5; }
        						}
        					}
        				} else {
        					if (lvcat in { 'No Pay Leave': 1, 'National Service Leave': 1 }) { HTMLString += ' checked="checked"'; DaysAccummulated += 0.5; }
        				}
        			} else if (window.CalSelectionConfig == 'No') {
        				HTMLString += ' disabled="disabled"';
        			} HTMLString += ' /></td>';
        			HTMLString += '<td class="ctr'; if (day == 0 || day == 6) { HTMLString += ' weekends'; } HTMLString += '">'; if (isPH == true) { if (Subject.indexOf('|') >= 0) { HTMLString += SplitString(Subject, '|', 0); } else { HTMLString += Subject; } } else if (WorkingDays.indexOf(day) < 0) { HTMLString += 'Off Day'; } else { HTMLString += '&nbsp;' } HTMLString += '</td>';
        			if (Subject.indexOf('|') >= 0) { window.HasBlockDate = true; }
        			new Date(StartDate.setDate(StartDate.getDate() - (j - 1)));
        		}
        		HTMLString += '</tr>';
        	}
        	HTMLString += '</tbody></table></div><br class="clearboth" /><hr />';
        	HTMLString += '<div class="rinline">Remaining Balance:&nbsp;<label id="Remaining"></label></div><div class="rinline">Applied Leave:&nbsp;<label id="Applied"></label></div><br class="clearboth" />';
        	$('#LeaveSelectionPane').html(HTMLString);
        	if (selection.length > 0) {
        		var index = 0; DaysAccummulated = 0;
        		$('#LeaveSelectionTbl tbody tr').each(function () {
        			$(this).children('td').each(function () {
        				$(this).children('input').each(function () {
        					if ($(this).attr('id').toLowerCase().indexOf('cbam_') >= 0) {
        						if (selection[index].AM == 1) { $(this).prop('checked', true); DaysAccummulated += 0.5; } else { $(this).prop('checked', false); }
        					}
        					else if ($(this).attr('id').toLowerCase().indexOf('cbpm_') >= 0) {
        						if (selection[index].PM == 1) { $(this).prop('checked', true); DaysAccummulated += 0.5; } else { $(this).prop('checked', false); }
        					}
        					if (mode == 'AP' || mode == 'V') { $(this).prop('disabled', true); }
        				});
        			});
        			index += 1;
        		});
        	}
        	//if (mode == '') { $('#Balance').text(Balance + ' Days'); } else { $('#BalanceLbl').text('Previous Balance:'); if (lvcat != 'No Pay Leave') { $('#Balance').text(Balance + DaysAccummulated + ' Days'); Balance += DaysAccummulated; } else { $('#Balance').text(Balance + ' Days'); } }
        	//          $('#Applied').text(DaysAccummulated + ' Days'); if (Balance < 0 && (lvcat != 'No Pay Leave')) { $('#Applied, #Remaining').css('color', 'red'); } else { $('#Applied, #Remaining').css('color', ''); }
        	//          //if ((mode == '' || mode == 'V') && lvcat != 'No Pay Leave') { $('#Remaining').text(Balance - DaysAccummulated + ' Days'); } else { $('#Remaining').text(Balance + ' Days'); }
        	//          if (mode == 'V' && lvcat != 'No Pay Leave') { $('#Remaining').text(Balance + ' Days'); }
        	//          else if (mode == 'E') {
        	//            if (window.PrevApplied == undefined) { window.Total = DaysAccummulated + Balance; $('#Remaining').text(Balance + ' Days'); }
        	//            else {
        	//              window.Total = window.PrevApplied + window.PrevBal;
        	//              $('#Remaining').text(window.Total - DaysAccummulated + ' Days');
        	//            }
        	//          }
        	//          else if (mode == 'AP') { $('#Remaining').text(Balance + ' Days'); }
        	//          else { $('#Remaining').text((Balance - DaysAccummulated) + ' Days'); }
        	$('#Applied').text(DaysAccummulated + ' Days');
        	switch (lvcat) {
        		case 'No Pay Leave':
        			$('#Applied, #Remaining').css('color', '');
        			break;
        		case 'National Service Leave':
        			$('#Applied, #Remaining').css('color', '');
        			break;
        		default:
        			if (Balance <= 0) {
        				$('#Applied, #Remaining').css('color', 'red');
        			}
        			break;
        	}
        	switch (mode) {
        		case 'E':
        			if (window.PrevApplied == undefined) { window.Total = DaysAccummulated + Balance; $('#Remaining').text(Balance + ' Days'); }
        			else {
        				window.Total = window.PrevApplied + window.PrevBal;
        				$('#Remaining').text(window.Total - DaysAccummulated + ' Days');
        			}
        			break;
        		case 'A':
        			if (lvcat in { 'No Pay Leave': 1, 'National Service Leave': 1 }) {
        				$('#Remaining').text('0 Days');
        			}
        			else {
        				$('#Remaining').text((Balance - DaysAccummulated) + ' Days');
        			}
        			break;
        		default:
        			if (lvcat in { 'No Pay Leave': 1, 'National Service Leave': 1 }) {
        				$('#Remaining').text('0 Days');
        			}
        			else {
        				$('#Remaining').text(Balance + ' Days');
        			}
        			break;
        	}
        	$('input[id^="cbAM"], input[id^="cbPM"]').on('click', function () {
        		var num, id = '';
        		switch (duration) {
        			case 'FD':
        				num = SplitString($(this).attr('id'), '_', 1);
        				id = SplitString($(this).attr('id'), '_', 0);
        				if (id == 'cbAM') {
        					if ($('#cbAM_' + num).is(':checked')) {
        						$('#cbPM_' + num).prop('checked', true);
        					} else { $('#cbPM_' + num).prop('checked', false); }
        				} else {
        					if ($('#cbPM_' + num).is(':checked')) {
        						$('#cbAM_' + num).prop('checked', true);
        					} else { $('#cbAM_' + num).prop('checked', false); }
        				}
        				break;
        			case 'HD':
        				if ($(this).parent('td').attr('class') != undefined) {
        					if ($(this).parent('td').attr('class').toLowerCase().indexOf('weekends') >= 0 && new Date(SplitString($(this).parent('td').parent('tr').children('td:first-child').html(), ',', 1)).getDay() === 6 && lvcat == 'Medical Leave') {
        						num = SplitString($(this).attr('id'), '_', 1);
        						id = SplitString($(this).attr('id'), '_', 0);
        						if (id == 'cbAM') { if ($('#cbAM_' + num).is(':checked')) { $('#cbPM_' + num).prop('checked', true); } else { $('#cbPM_' + num).prop('checked', false); } } else {
        							if ($('#cbPM_' + num).is(':checked')) { $('#cbAM_' + num).prop('checked', true); } else { $('#cbAM_' + num).prop('checked', false); }
        						}
        					}
        					//if ($(this).parent('td').attr('class').toLowerCase().indexOf('weekends') >= 0 && new Date(SplitString($(this).parent('td').parent('tr').children('td:first-child').html(), ',', 1)).getDay() === 6) {
        					//  num = SplitString($(this).attr('id'), '_', 1);
        					//  id = SplitString($(this).attr('id'), '_', 0);
        					//  if (id == 'cbAM') { if ($('#cbAM_' + num).is(':checked')) { $('#cbPM_' + num).prop('checked', true); } else { $('#cbPM_' + num).prop('checked', false); } } else { if ($('#cbPM_' + num).is(':checked')) { $('#cbAM_' + num).prop('checked', true); } else { $('#cbAM_' + num).prop('checked', false); } }
        					//}
        				}
        				break;
        			case 'HR':
        				num = SplitString($(this).attr('id'), '_', 1);
        				break;
        		}
        		var DaysTaken = 0.0;
        		$('input[id^="cbAM_"], input[id^="cbPM_"]').each(function () {
        			if ($(this).is(':checked')) { DaysTaken += 0.5; }
        		});
        		// $('#Applied').text(DaysTaken + ' Days'); if (mode == 'AP') { if (Balance < DaysTaken && (lvcat != 'No Pay Leave')) { $('#Applied, #Remaining').css('color', 'red'); $('#Applied').append(' (Exceed ' + (DaysTaken - Balance) + ' days)'); } else { $('#Applied, #Remaining').css('color', ''); } } else if (mode == 'E') { if (window.Total < DaysTaken && (lvcat != 'No Pay Leave')) { $('#Applied, #Remaining').css('color', 'red'); $('#Applied').append(' (Exceed ' + (DaysTaken - window.Total) + ' days)'); } else { $('#Applied, #Remaining').css('color', ''); } }
        		// if (mode == 'AP') { $('#Remaining').text(Balance - DaysTaken + ' Days'); } else if (mode == 'E') { $('#Remaining').text(window.Total - DaysTaken + ' Days'); }
        		// else if (mode == 'A') { $('#Remaining').text(Balance - DaysTaken); }
        		// else { $('#Remaining').text(Balance + ' Days'); }
        		$('#Applied').text(DaysTaken + ' Days');
        		switch (mode) {
        			case 'E':
        				if (lvcat in { 'No Pay Leave': 1, 'National Service Leave': 1 }) {
        					$('#Applied, #Remaining').css('color', '');
        				}
        				else {
        					if (window.Total < DaysTaken) {
        						$('#Applied, #Remaining').css('color', 'red'); $('#Applied').append(' (Exceed ' + (DaysTaken - window.Total) + ' days)');
        					} else {
        						$('#Applied, #Remaining').css('color', '');
        					}
        					$('#Remaining').text(window.Total - DaysTaken + ' Days');
        				}
        				break;
        			case 'V':
        				$('#Remaining').text(Balance + ' Days');
        				break;
        			default:
        				if (lvcat in { 'No Pay Leave': 1, 'National Service Leave': 1 }) {
        					$('#Applied, #Remaining').css('color', ''); $('#Remaining').text('0');
        				}
        				else {
        					if (Balance < DaysTaken) {
        						$('#Applied, #Remaining').css('color', 'red'); $('#Applied').append(' (Exceed ' + (DaysTaken - Balance) + ' days)');
        					} else {
        						$('#Applied, #Remaining').css('color', '');
        					}
        					$('#Remaining').text(Balance - DaysTaken + ' Days');
        				}
        				break;
        		}
        	});
        });
  	});
  });
}
function SplitString(msg, seperator, index) {
  var opts = msg.split(seperator);
  if (index != undefined || index != null) {
    return opts[index];
  }
  else {
    return opts;
  }
}

