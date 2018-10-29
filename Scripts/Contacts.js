//add new contacts
function RegisterNewUser(persondetails) {
  return $.JSONPost("iCtc1.RegisterNewLogin.json", persondetails);
}

function CheckForExistingLogin(username) {
  return $.JSONPost("iCtc1.CheckForExistingLogin.json", { "UserName": username });
}

function GetEntityOtherDetails(PersonID) {
  return $.JSONPost("iCtc1.GetEntityOtherDetails.json", { "PersonID": PersonID });
}

function InsertUpdateOtherDetails(otherdetails) {
  return $.JSONPost("iCtc1.InsertUpdateOtherDetails.json", otherdetails);
}

function GetCurrentLoginDetails() {
  return $.JSONPost("iCtc1.GetCurrentLoginDetails.json", "");
}

function GetEntityDetails(PersonID) {
  return $.JSONPost("iCtc1.GetEntityDetails.json", { "PersonID": PersonID });
}

function UpdateCurrentLoginDetails(Details) {
  return $.JSONPost("iCtc1.UpdateCurrentLoginDetails.json", Details);
}

function UpdateEntityDetails(Details) {
  return $.JSONPost("iCtc1.UpdateEntityDetails.json", Details);
}

function AddNewEntity(options) {
	var newURL = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname.split('/')[1] + '/';
	var settings = $.extend({
		EntityType: 'O', ShowEntityKey: false, ShowRoleTags: false, PositionatDivID: '', OrgPersonID: '0', RedirectPage: true, RedirectURL: 'iContact/Contacts/ContactViewer.htm?PID=', DisplayNameLabel: 'Name'
  }, options);
  var Roles = "";
  $.JSONPost("iCtc1.NewEntityRoleTags.json", { "LookupCat": "RoleTags" }, "")
    .then(function (data) {
      if (data.d.RetVal == -1) {
        Roles += "<div>";
        var Tbl = data.d.RetData.Tbl;
        var RowCnt = Tbl.Rows.length;
        for (var i = 0; i < RowCnt; i++) {
          var description = Tbl.Rows[i].Description;
          if (description.indexOf('|') > 0) {
            description = description.split('|');
            Roles += "<input type='checkbox' name='roletags' checked='" + description[1] + "' value='" + description[0] + "'>" + Tbl.Rows[i].LookupKey;
          } else {
            Roles += "<input type='checkbox' name='roletags' value='" + Tbl.Rows[i].Description + "'>" + Tbl.Rows[i].LookupKey;
          }
        }
        Roles += "</div>";
      }
      var entitytype = "Organisation";
      var entitykeydiv = "";
      if (settings.EntityType == "I") { entitytype = "Person" }
      if (settings.ShowEntityKey) {
        entitykeydiv += "<div>";
        if (settings.EntityType == "O") {
          entitykeydiv += "<label for='entitykey'>UEN</label>";
        } else {
          entitykeydiv += "<label for='entitykey'>NRIC</label>";
        }
        entitykeydiv += "<input id='entitykey' type='text'></div>";
      }
      if (settings.ShowRoleTags == false) { Roles = ""; }
      var newentitydiv = $("<div style='display:none;'/>").attr("id", "NewEntityDiv").html("<div><label for='displayname'>" + settings.DisplayNameLabel + "</label><input id='displayname' type='text'></div><br/>" + entitykeydiv + Roles).appendTo(document.body);
      newentitydiv.dialog({ title: 'Add New ' + entitytype, modal: true,
        buttons: { 'Save': function () {
          var roletags = "";
          $("input:checkbox[name=roletags]:checked").each(function () {
            roletags += ($(this).val()) + "|";
          });
          var entitykey = "";
          if (entitykeydiv.length > 0) { entitykey = $("#entitykey").val(); }
          $.JSONPost("iCtc1.CreateNewEntity.json", { "EntityType": settings.EntityType, "DisplayName": $("#displayname").val(), "RoleTags": roletags, "EntityKey": entitykey, "OrgPersonID": settings.OrgPersonID })
      .then(function (data) {
        var row = data.d.RetData.Tbl.Rows[0]
        if (row.Success == '1') {
          var personid = row.PersonID
          newentitydiv.dialog("close");
          if (settings.RedirectPage) {
            var parentURL = $(parent.location).attr("href");
            if (parentURL.indexOf("Search.aspx") > 0) {
              $(parent.location).attr("href", newURL + settings.RedirectURL + personid);
            }
            else {
              $(location).attr("href", newURL + settings.RedirectURL + personid);
            }
          } else {
            location.reload(true); 
          }

        }
        else {
          var returnmsg = "<p style='color:red'>" + row.ReturnMsg + "</p>"
          newentitydiv.append(returnmsg);
        }
      });
        }
        }
      });
      if (settings.PositionatDivID.length > 0) {
        newentitydiv.dialog({ position: { my: 'top', at: 'bottom', of: ('#' + settings.PositionatDivID)} });
      }
      newentitydiv.keypress(function (e) {
        if (e.keyCode == $.ui.keyCode.ENTER) {
          $(this).parent().find("button:eq(0)").trigger("click");
        }
      });
    });
}

