var callbacktimer;

//-------------- BEGIN CallBackObject --------------------
function CallBackObject()
{
  this.XmlHttp = this.GetHttpObject();
}

CallBackObject.prototype.GetHttpObject = function()
{ 
  var xmlhttp;
  /*@cc_on
  @if (@_jscript_version >= 5)
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
        xmlhttp = false;
      }
    }
  @else
  xmlhttp = false;
  @end @*/
  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
      xmlhttp = false;
    }
  }
  return xmlhttp;
}

CallBackObject.prototype.DoCallBack = function(eventTarget, eventArgument)
{
  var theData = '';
  var theform = document.forms[0];
  var thePage = window.location.pathname + window.location.search;
  var eName = '';
  
  theData = '__EVENTTARGET=' + escape(eventTarget) + '&';
  theData += '__EVENTARGUMENT=' + escape(eventArgument) + '&';
  theData += '__VIEWSTATE='    + escape(theform.__VIEWSTATE.value).replace(new RegExp('\\+', 'g'), '%2b') + '&';
  theData += 'IsCallBack=true&';
  for( var i=0; i<theform.elements.length; i++ )
  {
    eName = theform.elements[i].name;
    if( eName && eName != '')
    {
      if( eName == '__EVENTTARGET' || eName == '__EVENTARGUMENT' || eName == '__VIEWSTATE' )
      {
        // Do Nothing
      }
      else
      {
        theData = theData + escape(eName.split("$").join(":")) + '=' + theform.elements[i].value;
        if( i != theform.elements.length - 1 )
          theData = theData + '&';
      }
    }
  }
  if( this.XmlHttp )
  {
    if( this.XmlHttp.readyState == 4 || this.XmlHttp.readyState == 0 )
    {
      var oThis = this;
      this.XmlHttp.open('POST', thePage, true);
      this.XmlHttp.onreadystatechange = function(){ oThis.ReadyStateChange(); };
      this.XmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      this.XmlHttp.send(theData);
    }
  }
}

CallBackObject.prototype.AbortCallBack = function()
{
  if( this.XmlHttp )
    this.XmlHttp.abort();
}

CallBackObject.prototype.OnLoading = function()
{
  // Loading
}

CallBackObject.prototype.OnLoaded = function()
{
  // Loaded
}

CallBackObject.prototype.OnInteractive = function()
{
  // Interactive
}

CallBackObject.prototype.OnComplete = function(responseText, responseXml)
{
  // Complete
}

CallBackObject.prototype.OnAbort = function()
{
  // Abort
}

CallBackObject.prototype.OnError = function(status, statusText)
{
  // Error
}

CallBackObject.prototype.ReadyStateChange = function()
{
  if( this.XmlHttp.readyState == 1 )
  {
    this.OnLoading();
  }
  else if( this.XmlHttp.readyState == 2 )
  {
    this.OnLoaded();
  }
  else if( this.XmlHttp.readyState == 3 )
  {
    this.OnInteractive();
  }
  else if( this.XmlHttp.readyState == 4 )
  {
    if( this.XmlHttp.status == 0 )
      this.OnAbort();
    else if( this.XmlHttp.status == 200 )
      this.OnComplete(this.XmlHttp.responseText, this.XmlHttp.responseXML);
    else
      this.OnError(this.XmlHttp.status, this.XmlHttp.statusText, this.XmlHttp.responseText);
  }
}
//----------------End CallBackObject---------------------

//----------------BEGIN AutoCompleteTextBox ------------------------

function AutoCompleteTextBox(TextBoxId, TBPBId, HiId, BtnId, DivId, DivClass, JSName, ImgId)
{
	// initialize member variables
	var oThis = this;
	var oText = document.getElementById(TextBoxId);
	var oTBPB = document.getElementById(TBPBId);
	var oDiv  = document.getElementById(DivId);
	var oHi		= document.getElementById(HiId);
	var oImg	= document.getElementById(ImgId);
	var oBtn	= document.getElementById(BtnId);
	this.TextBox = oText;
	this.TBPB = oTBPB;
	this.Div = oDiv;
	this.MyName = JSName;
	this.CurSelection = -1;
	this.DivCount = 0;
	this.HiddenInput = oHi;
	this.BzImg = oImg;
	this.submitBtn = oBtn;
	this.PostBackEmpty = oText.value.length > 0?true:false;
	this.isFocus = false;
	this.CTRLdown = false;
	this.cancelKey = false;
	this.DivPosV = '';
	this.DivPosH = '';
	
	// CallBackObject + Event Handlers
	this.Cbo = new CallBackObject();
	this.Cbo.OnComplete = function(responseText,responseXML){oThis.Cbo_Complete(responseText,responseXML);};
	this.Cbo.OnError    = function(status,statusText,responseText){oThis.Cbo_Error(status,statusText,responseText);};
		
	// attach handlers to the TextBox
	oText.AutoCompleteTextBox = this;
	oText.onkeydown = AutoCompleteTextBox.prototype.OnKeyDown;
	oText.onkeyup = AutoCompleteTextBox.prototype.OnKeyUp;
	oText.onblur  = AutoCompleteTextBox.prototype.OnBlur;
	oText.onfocus  = AutoCompleteTextBox.prototype.OnFocus;
	
	// align the drop down div
	if (MaxZIndex == null) {MaxZIndex = GetMaxZIndex();}
	this.Coords = GetCoords(oText);
	var n = oText.offsetHeight;
	if( !n )
	{
	  n = 23;
	}
	oImg.style.display = '';
	oImg.style.left = (this.Coords.x + oText.offsetWidth - oImg.offsetWidth - 1) + 'px';
	oImg.style.top = (this.Coords.y + (n - oImg.offsetHeight) / 2 - 1) + 'px';
	oImg.style.zIndex = MaxZIndex+1;
	oImg.style.position = 'absolute';
	oImg.style.display = 'none';

	oDiv.style.left = (this.Coords.x) + 'px';
	oDiv.style.top = (this.Coords.y + n) + 'px';
	oDiv.style.zIndex = MaxZIndex+1;
	oDiv.style.position = 'absolute';
	oDiv.style.display = 'none';
	
	// Set some default styles
	if( DivClass )
	  oDiv.className = DivClass;
	else
	{
	  oDiv.style.border = '1px';
	  oDiv.style.borderColor = 'black';
	  oDiv.style.borderStyle = 'solid';
	  oDiv.style.backgroundColor = 'white';
	  oDiv.style.padding = '0px';
	}
}

AutoCompleteTextBox.prototype.DoAutoSuggest = false;

AutoCompleteTextBox.prototype.NoSelectionClass = '';

AutoCompleteTextBox.prototype.ItemSelectedClass = '';

AutoCompleteTextBox.prototype.ListItemClass = '';

AutoCompleteTextBox.prototype.ListItemHoverClass = '';

AutoCompleteTextBox.prototype.AddNewBtn = null;

AutoCompleteTextBox.prototype.ViewBtn = null;

AutoCompleteTextBox.prototype.GetValue = function()
{
	return this.HiddenInput.value;
}

// TextBox OnBlur
AutoCompleteTextBox.prototype.OnBlur = function()
{
	this.AutoCompleteTextBox.TextBox_Blur();
}

AutoCompleteTextBox.prototype.TextBox_Blur = function()
{
	this.isFocus = false;
	this.CTRLdown = false;
	if (this.GetValue().length == 0) 
	{
		this.SetSelection();
		this.HideDiv();
	}
}

// TextBox OnFocus
AutoCompleteTextBox.prototype.OnFocus = function()
{
	this.AutoCompleteTextBox.TextBox_Focus();
}

AutoCompleteTextBox.prototype.TextBox_Focus = function()
{
	this.isFocus = true;
}

AutoCompleteTextBox.prototype.SetSelection = function()
{
	if (this.CurSelection > -1 && this.Div.style.display == 'block')
	{
		var oDiv = this.Div.getElementsByTagName('Div')[this.CurSelection];
		var oSpan = this.Div.getElementsByTagName('Span')[this.CurSelection];
		if (oSpan.innerHTML == '')
		{
			if (this.AddNewBtn != null) {this.AddNewBtn.click();}
			return;
		}
		this.TextBox.value = oDiv.innerHTML.replace(/<b>([^<]*)<\/b>/gi,'$1');
		this.HiddenInput.value = oSpan.innerHTML;
		this.SetTextBoxCss();
		if (this.submitBtn != null)
		{
			this.submitBtn.click();
		}
	}
	else
	{
		if (this.PostBackEmpty && this.submitBtn != null && this.HiddenInput.value == '')
		{
			this.submitBtn.click();
		}
	}
}

AutoCompleteTextBox.prototype.SetTextBoxCss = function(ResetCss)
{
	if (ResetCss)
	{
		if( this.NoSelectionClass.length > 0 )
			this.TextBox.className = this.NoSelectionClass;
		else
		{
			this.TextBox.style.backgroundColor = '';
			this.TextBox.style.color = 'black';
		}
		if (this.ViewBtn != null)
		{
			this.ViewBtn.style.display = 'none';
		}
	}
	else
	{
		if( this.SelectedItemClass.length > 0 )
			this.TextBox.className = this.SelectedItemClass;
		else
		{
			this.TextBox.style.backgroundColor = 'lemonchiffon';
			this.TextBox.style.color = 'black';
		}
		if (this.ViewBtn != null)
		{
			this.ViewBtn.style.display = 'inline';
		}
	}
}

// TextBox OnKeyDown
AutoCompleteTextBox.prototype.OnKeyDown = function(oEvent)
{
  //check for the proper location of the event object
  if (!oEvent)
  {
    oEvent = window.event;
  }
  return this.AutoCompleteTextBox.TextBox_KeyDown(oEvent);
}

// TextBox OnKeyUp
AutoCompleteTextBox.prototype.OnKeyUp = function(oEvent)
{
  //check for the proper location of the event object
  if (!oEvent)
  {
    oEvent = window.event;
  }
  this.AutoCompleteTextBox.TextBox_KeyUp(oEvent);
}

AutoCompleteTextBox.prototype.GetSelectedDivIndex = function()
{
	var oDivs = this.Div.getElementsByTagName('Div');
	var i;
	for (i = 0;i < oDivs.length;i++)
	{
		if (oDivs[i].innerHTML == this.TextBox.value)
		{
			return i;
		}
	}
	return -1;
}

AutoCompleteTextBox.prototype.ResetSuggestion = function()
{
	var oDivs = this.Div.getElementsByTagName('Div');
	var i;
	for (i = 0;i < oDivs.length;i++)
	{
		if( this.ListItemClass.length > 0 )
			oDivs[i].className = this.ListItemClass;
		else
		{
			oDivs[i].style.backgroundColor = 'white';
			//oDivs[i].style.color = 'black';
		}
	}
}

AutoCompleteTextBox.prototype.SetSuggestion = function(index)
{
	this.ResetSuggestion();
	var oDiv = this.Div.getElementsByTagName('Div')[index];
  if( this.ListItemHoverClass.length > 0 )
	  oDiv.className = this.ListItemHoverClass;
	else
	{
	  oDiv.style.backgroundColor = 'Gold';
    //oDiv.style.color = 'white';
	}
}

AutoCompleteTextBox.prototype.ClearTextBox = function(Ans)
{
	if (Ans)
	{
		this.SetTextBoxCss(true);
		this.HiddenInput.value = '';
		this.TextBox.value = '';
		this.TextBox.focus();
	}
	this.HideDiv();
}

AutoCompleteTextBox.prototype.HideDiv = function()
{
	this.Div.style.display = 'none';
	while ( this.Div.hasChildNodes() )
	{
		this.Div.removeChild(this.Div.firstChild);
	}
	this.DivPosV = '';
	this.DivPosH = '';
	this.DivCount = 0;
	this.CurSelection = -1;
	this.Div.innerHTML = '';
}

AutoCompleteTextBox.prototype.ShowDiv = function()
{
	this.Div.style.display = 'block';
	var hb = document.body.clientHeight - Math.max(0,this.Coords.y - document.body.scrollTop + this.TextBox.offsetHeight);
	var wr = document.body.clientWidth - Math.max(0,this.Coords.x - document.body.scrollLeft);
	var wl = Math.max(this.Coords.x + this.TextBox.offsetWidth - document.body.scrollLeft);
	if (this.DivPosV == '')
	{
		if ((hb > this.Div.offsetHeight) || (hb > (document.body.clientHeight - this.TextBox.offsetHeight)/2))
		{
			this.Div.style.top = (this.Coords.y + this.TextBox.offsetHeight) + 'px';
			this.DivPosV = 'b';
		}
		else
		{
			this.Div.style.top = (this.Coords.y - this.Div.offsetHeight) + 'px';
			this.DivPosV = 't';
		}
	}
	else
	{
		if (this.DivPosV == 't')
		{
			this.Div.style.top = (this.Coords.y - this.Div.offsetHeight) + 'px';
		}
	}
 	if (this.DivPosH == '')
	{
		if ((wr > this.Div.offsetWidth) || (wr > wl))
		{
			this.Div.style.left = (this.Coords.x) + 'px';
			this.DivPosH = 'r';
		}
		else
		{
			this.Div.style.left = (Math.max(0, wl - this.Div.offsetWidth)) + 'px';
			this.DivPosH = 'l';
		}
	}
	else
	{
		if (this.DivPosH == 'l')
		{
			this.Div.style.left = (Math.max(0, wl - this.Div.offsetWidth)) + 'px';
		}
	}
}

AutoCompleteTextBox.prototype.TextBox_KeyDown = function(oEvent)
{
	var iKeyCode = oEvent.keyCode;
	if( iKeyCode == 13 )
	{
		//this.SetSelection();
		this.TextBox.blur();
		return false;
	}
	if ( iKeyCode == 17 )
	{
		this.CTRLdown = true;
	}
	else if (!this.CTRLdown)
	{
		if (this.GetValue().length > 0 && iKeyCode != 9 && iKeyCode != 16 && !(iKeyCode >= 18 && iKeyCode <=20) && !(iKeyCode >= 33 && iKeyCode <=40) && iKeyCode != 45 && !(iKeyCode >= 112 && iKeyCode <= 123) && iKeyCode != 145)
		{
			this.cancelKey = true;
			this.HideDiv();
			var oDiv = document.createElement('div');
			this.Div.appendChild(oDiv);
			var oAYes = document.createElement('a');
			var oANo = document.createElement('a');
			oDiv.appendChild(oAYes);
			oDiv.appendChild(oANo);
			oAYes.innerHTML = 'Yes';
			oAYes.href = 'javascript:' + this.MyName + '.ClearTextBox(true);';
			oANo.innerHTML = 'No';
			oANo.href = 'javascript:' + this.MyName + '.ClearTextBox(false);';
			oDiv.innerHTML = oDiv.innerHTML.replace(/^</gi,'Modifying this record will clear the contents of this textbox. Do you wish to continue? <');
			oDiv.innerHTML = oDiv.innerHTML.replace(/\>\</gi,'> <');
		  oDiv.noWrap       = true;
		  oDiv.style.fontFamily = 'Arial';
		  oDiv.style.fontSize = '10pt';
		  oDiv.style.padding= '2px';
		  oDiv.className    = this.ListItemClass;
		  this.ShowDiv();
			return false;
		}
	}
}

AutoCompleteTextBox.prototype.TextBox_KeyUp = function(oEvent)
{
	if (this.cancelKey) {this.cancelKey = false;return false;}
  var iKeyCode = oEvent.keyCode;
	if (!this.CTRLdown)
	{
		if( iKeyCode == 8 || iKeyCode == 46 || iKeyCode == 27)
		{
			this.HideDiv();
			this.BzImg.style.display = 'none';
			this.Cbo.AbortCallBack();
			this.SetTextBoxCss(true);
			this.HiddenInput.value = '';
			if (this.TextBox.value.length == 0 || iKeyCode == 27) {this.DivPosV = '';this.DivPosH = '';return;}
		}
		else if( iKeyCode == 16 || iKeyCode == 20)
		{
			//this.DoAutoSuggest = true;
			return;
		}
		else if (iKeyCode < 32 || (iKeyCode >= 33 && iKeyCode <= 46) || (iKeyCode >= 112 && iKeyCode <= 123))
		{
			//do something... for 37-40
			if (iKeyCode == 38 && this.Div.style.display != 'none')
			{
				this.CurSelection = Math.max(this.CurSelection-1,0);
				this.SetSuggestion(this.CurSelection);
			}
			else if (iKeyCode == 40 && this.Div.style.display != 'none')
			{
				//this.SuggestNext();
				this.CurSelection = Math.min(this.CurSelection+1,this.DivCount-1)
				this.SetSuggestion(this.CurSelection);
			}
			return;
		}
		else
		{
			this.SetTextBoxCss(true);
			this.HiddenInput.value = '';
			//this.DoAutoSuggest = true;
		}
	  
		var txt = this.TextBox.value;
		if( txt.length > 0 )
		{
			this.Cbo.AbortCallBack();
			if (this.Coords.x == 0 && this.Coords.y == 0)
			{
				this.Coords = GetCoords(this.TextBox);
				var n = this.TextBox.offsetHeight;
				if( !n )
				{
					n = 23;
				}
				this.BzImg.style.display = '';
				this.BzImg.style.left = (this.Coords.x + this.TextBox.offsetWidth - this.BzImg.offsetWidth - 1) + 'px';
				this.BzImg.style.top = (this.Coords.y + (n - this.BzImg.offsetHeight) / 2 - 1) + 'px';
				this.BzImg.style.display = 'none';
			}
			if (callbacktimer != null) {clearTimeout(callbacktimer);}
			callbacktimer = setTimeout('if ('+this.MyName+'.TextBox.value.length > 0) {'+this.MyName+'.DoAutoSuggest = true;'+this.MyName+'.BzImg.style.display = \'\';'+this.MyName+'.TBPB.value++;'+this.MyName+'.Cbo.DoCallBack('+this.MyName+'.TBPB.name, '+this.MyName+'.TextBox.value);callbacktimer = null;} else {'+this.MyName+'.DoAutoSuggest = false;}',333);
		}
		else
		{
			this.HideDiv();
			this.BzImg.style.display = 'none';
			this.Cbo.AbortCallBack();
		}
	}
	else
	{
		if ( iKeyCode == 17 )
		{
			this.CTRLdown = false;
		}
	}

}

AutoCompleteTextBox.prototype.Cbo_Complete = function(responseText, responseXML)
{
	this.BzImg.style.display = 'none';
  while ( this.Div.hasChildNodes() )
  {
	  this.Div.removeChild(this.Div.firstChild);
	}
	
	// get all the matching strings from the server response
	var aStr = responseText.split('\n');
	// add each string to the popup-div
	var i, n = aStr.length;
	
	if( n > 0 )
	{
		var SSS = new RegExp('('+this.TextBox.value.replace(/(\+|\)|\(|\*|\^|\$|\#|\{|\||\[|\\|\?|\.)/gi,'\\$1').replace(/&/gi,'&amp;')+')','gi');
	  for ( i = 0; i < n; i++ )
	  {
			var aPair = aStr[i].split(';');
		  var oDiv = document.createElement('div');
		  var oSpan = document.createElement('span');
		  this.Div.appendChild(oDiv);
		  this.Div.appendChild(oSpan);
		  try
		  {
		    oDiv.innerHTML    = aPair[0].replace(SSS,'<b>$1</b>');
		    oSpan.innerHTML		= aPair.length == 2?aPair[1]:'';;
		  }
		  catch(e)
		  {
		    this.Cbo_Error('405','Error','Text returned from Call Back was invalid');
		    return;
		  }
		  oSpan.style.display	= 'none';
		  oDiv.noWrap       = true;
		  //oDiv.style.width  = '100%';
		  oDiv.style.fontFamily = 'Arial';
		  oDiv.style.fontSize = '10pt';
		  oDiv.style.padding= '2px';
		  oDiv.className    = this.ListItemClass;
		  oDiv.onmousedown  = AutoCompleteTextBox.prototype.Div_MouseDown;
		  oDiv.onmouseover  = AutoCompleteTextBox.prototype.Div_MouseOver;
		  oDiv.onmouseout   = AutoCompleteTextBox.prototype.Div_MouseOut;
		  oDiv.AutoCompleteTextBox = this;
	  }
	  this.ShowDiv();	  
	  this.DivCount = this.Div.getElementsByTagName('Div').length;
	  if( this.DoAutoSuggest == true )
	    this.AutoSuggest( aStr );
	}
	else
	{
		this.HideDiv();
	}
}

AutoCompleteTextBox.prototype.Cbo_Error = function(status, statusText, responseText)
{
  alert('CallBackObject Error: status=' + status + '\nstatusText=' + statusText + '\n' + responseText);
}

AutoCompleteTextBox.prototype.Div_MouseDown = function()
{
	if (!this.isFocus)
	{
		this.AutoCompleteTextBox.TextBox.focus();
		this.AutoCompleteTextBox.TextBox.blur();
	}
}

AutoCompleteTextBox.prototype.Div_MouseOver = function()
{
	var i;
	var oDivs = this.AutoCompleteTextBox.Div.getElementsByTagName('Div');
	for (i=0;i<oDivs.length;i++)
	{
		if (oDivs[i].innerHTML == this.innerHTML)
		{
			this.AutoCompleteTextBox.CurSelection = i;
			this.AutoCompleteTextBox.SetSuggestion(i);
			return;
		}
	}
}

AutoCompleteTextBox.prototype.Div_MouseOut = function()
{
}

AutoCompleteTextBox.prototype.AutoSuggest = function(aSuggestions /*:array*/)
{
  if (aSuggestions.length > 0)
  {
    //this.TypeAhead(aSuggestions[0]);
    this.CurSelection = 0;
    this.SetSuggestion(this.CurSelection);
  }
}

AutoCompleteTextBox.prototype.TypeAhead = function( sSuggestion /*:string*/)
{
  if( this.TextBox.createTextRange || this.TextBox.setSelectionRange)
  {
    var iLen = this.TextBox.value.length;
    this.TextBox.value = sSuggestion;
    this.SelectRange(iLen, sSuggestion.length);
  }
}

AutoCompleteTextBox.prototype.SelectRange = function (iStart /*:int*/, iLength /*:int*/)
{
  //use text ranges for Internet Explorer
  if (this.TextBox.createTextRange)
  {
    var oRange = this.TextBox.createTextRange();
    oRange.moveStart("character", iStart);
    oRange.moveEnd("character", iLength - this.TextBox.value.length);
    oRange.select();
  } 
  //use setSelectionRange() for Mozilla
  else if (this.TextBox.setSelectionRange)
  {
      this.TextBox.setSelectionRange(iStart, iLength);
  }
  
  //set focus back to the textbox
  this.TextBox.focus();
}

//----------------END AutoCompleteTextBox ------------------------

var MaxZIndex = null;

function GetMaxZIndex()
{
	var allElems = document.getElementsByTagName?document.getElementsByTagName("*"):document.all; // or test for that too
	var zi = 0;
	for(var i=0;i<allElems.length;i++)
	{
		var elem = allElems[i];
		var cStyle = null;
		if (elem.currentStyle)
		{
			cStyle = elem.currentStyle;
		}
		else
		{
			if (document.defaultView && document.defaultView.getComputedStyle) 
			{
				cStyle = document.defaultView.getComputedStyle(elem,"");
			}
		}
		var sNum;
		if (cStyle) 
		{
			sNum = Number(cStyle.zIndex);
		}
		else
		{
			sNum = Number(elem.style.zIndex);
		}
		if (!isNaN(sNum))
		{
			zi = Math.max(zi,sNum);
		}
	}
	return zi;
}

function GetCoords(obj /*:object*/)
{
  var newObj = new Object();
  newObj.x = obj.offsetLeft;
  newObj.y = obj.offsetTop;
  theParent = obj.offsetParent;
  while(theParent != null)
  {
    newObj.y += theParent.offsetTop;
    newObj.x += theParent.offsetLeft;
    theParent = theParent.offsetParent;
  }
  
  return newObj;
}