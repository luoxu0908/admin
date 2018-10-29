var isIE = !jQuery.browser.mozilla;

var submenualign = 0;
var menuishidden = false;
var realLinksWidth = -1;

var timerid;		  //timer for hiding the menu when hidden
var timeToHide = 500;

var IntervalID;		  //timer for the autoscroll

//if (isIE) alert('is IE!');

function escapeExpression(str) {
    return str.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
}

function showDebug(s){
  $('#debug').html(s);
}

function subMenuLeft(){
	submenualign = 0;
	if (menuishidden){
	  $('.SubLinksContainer').css('margin','0px 50px 0px 5px');
	  $('#breadcrumb').css('right','50px');
	}else{
	  $('.SubLinksContainer').css('margin','0px 10px 0px 5px');
	  $('#breadcrumb').css('right','5px');
	}
	$('.SubLinksContainer').css('float','left');
	$('.submenu').css('float','left');
	
	$('#breadcrumb').css('left','auto');
	$('#breadcrumb').css('float','right');
	$('#breadcrumb').css('text-align','right');
}
function subMenuRight(){
	submenualign = 1;
	if (menuishidden){
	  $('.SubLinksContainer').css('margin','0px 50px 0px 5px');
	}else{
	  $('.SubLinksContainer').css('margin','0px 10px 0px 5px');
	}
	$('.SubLinksContainer').css('float','right');
	$('.submenu').css('float','right');
	
	$('#breadcrumb').css('left','5px');
	$('#breadcrumb').css('right','auto');
	$('#breadcrumb').css('float','left');
	$('#breadcrumb').css('text-align','left');
}
function subMenuCenter(){
	submenualign = 2;
	
	$('.SubLinksContainer').css('float','none');
	$('.SubLinksContainer').css('margin','0px auto 0px auto');
	$('.SubLinksContainer').css('text-align','center');
	$('.submenu').css('float','none');
	$('.submenu').css('margin','0px auto 0px auto');
	
	$('#breadcrumb').css('left','5px');
	$('#breadcrumb').css('right','auto');
	$('#breadcrumb').css('float','left');
	$('#breadcrumb').css('text-align','left');
}
function showTallMenu(){
	if (menuishidden){
	  unhideMenu();
	}
	
	$('.linktxt .text').slideDown('slow',function(){
	  $('#MenuContainer').attr('class','WithText');
	  PlacesEveryone();
	  $('div.dropdown').css('top','53px');
	});
	getRealLinksWidth();
}
function showShortMenu(){
	if (menuishidden){
	  unhideMenu();
	}
	
	$('.linktxt .text').slideUp('slow',function(){
	  $('#MenuContainer').attr('class','NoText');
	  PlacesEveryone();
	  $('div.dropdown').css('top','39px');
	});
	getRealLinksWidth();
}

//hide the menu
function hideMenu(){
  $('div.dropdown').slideUp('fast'); //When the mouse hovers out of the subnav, move it back up  
  $('.SubLinksContainer').css('margin-right','50px');
  if (submenualign == 0){
	//left
	$('#breadcrumb').css('right','50px');
  }
  
  $('.LinksBar').fadeOut('fast',function(){
	$('#MenuContainer').slideUp('slow',function(){/*$('.LinksBar').show()*/});
	menuishidden = true;
	$('#MenuContainer2').slideDown('fast',function(){});
  });
}

//Unhide the menu
function unhideMenu(){
  menuishidden = false;
  /*
  $('#MenuContainer').slideDown('slow');
  */
  $('.SubLinksContainer').css('margin-right','10px');
  if (submenualign == 0){
	//left
	$('#breadcrumb').css('right','5px');
  }
  $('#MenuContainer2').slideUp('fast');
}

// Slide down the menu while it is hidden
function showMenu(){
  $('#MenuContainer').slideDown('fast');
  $('.LinksBar').fadeIn('fast',function(){
	$('#MenuContainer').hover(
	  function(){
		if (timerid) clearTimeout(timerid);
	  }, 
	  function(){
		timerid = setTimeout("_hideMenu()",timeToHide);
	});
  });
}

function _hideMenu(){
	if (menuishidden){
	  hideMenu();
	}
}

function documentReady() {

  //var tabContainers = $('div.tabs > div');
  
  $('div.submenu li').click(function () {
      $('div.curr li.curlink').removeClass('curlink');
      $(this).addClass('curlink');
      var bc = $(this).find('.breadcrumb').text();
      $('#breadcrumb').text(bc);
      $(this).blur();      
      return false;
  })

  $('#options .icon').click(function(){
	$(this).parent().find('div.dropdown').slideDown('fast').show();
	
	$(this).parent().find('div.dropdown').hover(function() {}, function(){ 
		$(this).parent().find('div.dropdown').slideUp('slow'); //When the mouse hovers out of the subnav, move it back up  
	});
  });
  
  $('#options .optiongrp DIV DIV').click(function(){
	$(this).parent().find('div').removeClass('curoption');
	$(this).addClass('curoption');
  });
    
  $('#options .left').click(subMenuLeft);
  $('#options .right').click(subMenuRight);
  $('#options .center').click(subMenuCenter);
  
  $('#options .short').click(showShortMenu);
  $('#options .tall').click(showTallMenu);
  $('#options .hide').click(hideMenu);
  $('#options .unhide').click(unhideMenu);
  $('#options .show').click(showMenu);
  
  $('#MenuContainer2').hover(showMenu,function(){});
  
  //prepare for onload animation
  $('.LinksBar').hide();
  $('.LinksBar').fadeIn('medium');
  /*});*/
  
  doInit();
}

$(document).ready(function() { documentReady();})
$(window).load(function() { doInit();})
		
function doInit(){
	if (isIE) resizeMenuItems();
	ReloadCur();
	PlacesEveryone();
}
function SelCur(elID, path)
{
	var hidd = document.getElementById('hid');
	if (hidd.value.length > 0) {
		var prevEl = document.getElementById(document.getElementById('hid').value);
		var prevEls = document.getElementById(document.getElementById('hid').value + 's')
		if (prevEl) {
			prevEl.className = "link";
		}
		if (prevEls) {
			prevEls.style.display = "none";
		}
	}
	if (document.getElementById(elID))
	{
		$('.SubLinksContainer').css('visibility','hidden');
		
		$('div.curr').removeClass('curr');
		$('#' + escapeExpression(elID) + 's').addClass('curr');
		$('#' + escapeExpression(elID) + 's li').removeClass('curlink');
		$('#' + escapeExpression(elID) + 's li.first').click();
		
		
		document.getElementById(elID + 's').style.display = '';
		document.getElementById('hid').value = elID;
		document.getElementById(elID).className = "curlink";
		document.getElementById(elID).blur();
		
		$('.SubLinksContainer').css('width','auto');
		var prevfloat = $('.SubLinksContainer').css('float');
		$('.SubLinksContainer').css('float','left');
		var w = $('.SubLinksContainer').width() + 20;
		$('.SubLinksContainer').css('width',w);
		$('.SubLinksContainer').css('float',prevfloat);
		
		$('.SubLinksContainer').css('visibility','visible');

		if (path) {
		  document.getElementById('Content').contentWindow.location=path;
      //frames['Content'].document.location = path;
		    var obj = { redirect: path };
		    $.cookie("CurPage", path);
		}
    }

}

function ReloadCur() {
	var elID = document.getElementById('hid').value;
	var curLnk = document.getElementById('lnk0s');
	if (curLnk) curLnk.style.display = (elID == 'lnk0') ? '' : 'none';
	$('#'+escapeExpression(elID)+'s').css('display','');
	
	//what's this for?
	document.getElementById('hid').value = elID;
	
	$('#'+escapeExpression(elID)).attr('class','curlink');
	$('#' + escapeExpression(elID) + 's li.first').click();
}

function LinkTo(path, link) {
  document.getElementById('Content').contentWindow.location = path;
    //frames['Content'].document.location = path;
  var obj = { redirect: path };
  $.cookie("CurPage",path);
}

function getRealLinksWidth(){
	//realLinksWidth = $('#LinksBar').outerWidth() + 26;  //this does not get true width in IE!
	realLinksWidth = 0;
	$('#LinksBar A').each(function(){
	  realLinksWidth += $(this).width();
	});
}

function resizeMenuItems(){
	// Since IE's div do not want to get their width from the text label, set them here manually
	$('#LinksBar A SPAN').each(function(){
	  var w = $(this).width();
	  w = (w < 40)?40:w;
	  $(this).parent().width(w + 'px');
	  w += 30;
	  //$(this).parent().parent().width(w + 'px');
	  $(this).parent().parent().parent().width(w + 'px');
	  //alert($(this).width() + ', ' + $(this).parent().width() + ', ' + $(this).parent().parent().width() );
	});
}

function PlacesEveryone() {
    var accountboxwidth = $('#accountbox').width();
    var logowidth = $('#imgLogo').width(); ;

    if (realLinksWidth == -1) { getRealLinksWidth(); }

    $('.MorelinksL').css('left', logowidth - 10);
    $('.MorelinksR').css('right', accountboxwidth + 5);
    $('#LinksContainer').css('position', 'absolute');
    $('#LinksContainer').css('left', logowidth + 40);
    $('#LinksContainer').css('right', accountboxwidth + 34);

    var availableWidth = $(document).width() - accountboxwidth - logowidth + 15;
    //showDebug('logowidth='+logowidth+', accountboxwidth='+accountboxwidth+', fullWidth='+fullWidth+', availableWidth='+availableWidth);
    //alert('realLinksWidth='+realLinksWidth+', availableWidth='+availableWidth);

    if (realLinksWidth < availableWidth) {
        $('#LinksBar').scrollLeft(0);
        document.getElementById('MorelinksL').style.display = 'none';
        document.getElementById('MorelinksR').style.display = 'none';
    } else {
        document.getElementById('MorelinksL').style.display = '';
        document.getElementById('MorelinksR').style.display = '';
    }

    var footerOffset = $('#footer').offset();

    var docHeight = document.documentElement.clientHeight;

    var mainMenuHeight = $('#MenuContainer').outerHeight();
    var subMenuHeight = $('.SubLinksBar').outerHeight();
    var contentHeight = docHeight - $('#Content').offset().top;
    $('#Content').height(contentHeight);
}

function ScrollRight()  { clearInterval(IntervalID); IntervalID = setInterval("Scroll(5)", 10); }
function ScrollLeft()   { clearInterval(IntervalID); IntervalID = setInterval("Scroll(-5)", 10); }
function Scroll(val)	{ document.getElementById('LinksBar').scrollLeft += val;}
function StopScroll()	{ clearInterval(IntervalID);}