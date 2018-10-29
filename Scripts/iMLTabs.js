function MultiLevelTab(TabDivId, HfldId, TabTblId, TabRowCss, LastTabRowCss, TabLnkCss, SelectedTabLnkCss)
{
	// initialize member variables
	var oThis = this;
	var oDiv  = document.getElementById(TabDivId);
	var oHfld		= document.getElementById(HfldId);
	//objects
	this.TabDiv = oDiv;
	this.HiddenFld = oHfld;
	
	//IDs
	this.TabTblId = TabTblId;
	
	//css
	this.TabRowCss = TabRowCss;
	this.LastTabRowCss = LastTabRowCss;
	this.TabLnkCss = TabLnkCss;
	this.SelectedTabLnkCss = SelectedTabLnkCss;
}

MultiLevelTab.prototype.ResetTabRow = function()
{
	//move BeautifyMultiTabs function here. so that the multileve tab always know the correct order of the tabtbls
	var i = 0;
	var oDiv = document.createElement('div');

	var TabTbl;
	var LastTabTbl;
	do
	{
		TabTbl = document.getElementById(this.TabTblId + i);
		if (TabTbl != null)
		{
			if (TabTbl.innerHTML.indexOf(this.SelectedTabLnkCss) == -1)
			{
				TabTbl.className = this.TabRowCss;
				oDiv.appendChild(TabTbl);
			}
			else
			{
				LastTabTbl = TabTbl;
				LastTabTbl.className = this.LastTabRowCss;
			}
		}
		i++;
	}
	while(TabTbl != null)
	
	oDiv.appendChild(LastTabTbl);
	this.TabDiv.innerHTML = oDiv.innerHTML;
	oDiv = null;
}

MultiLevelTab.prototype.SetSelectedTab = function(obj)
{
	if (obj.className == this.SelectedTabLnkCss) {return false;}
	window.status = '';
	document.getElementById(this.HiddenFld.value).className = this.TabLnkCss;
	document.getElementById(this.HiddenFld.value).style.paddingTop = ''; //ie bug...
	this.HiddenFld.value = obj.id;
	obj.style.height = ''; //ie bug...
	obj.className = this.SelectedTabLnkCss;
	this.ResetTabRow();
	obj.blur();
}