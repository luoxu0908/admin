/* <![CDATA[ */
var myscript ='/'+window.location.pathname.split('/')[1]+'/Security/SecSession.aspx?';
var timer;

function reloadScript() {
	var head = document.getElementsByTagName('head').item(0);
	var old  = document.getElementById('scriptId');
	if (old) head.removeChild(old);
	script = document.createElement('script');
	var now= new Date();
	script.src = myscript+now.valueOf();
	script.type = 'text/javascript';
	script.defer = true;
	script.id = 'scriptId';
	void(head.appendChild(script));
}

function poll(t) { timer = setInterval('reloadScript()', t); }
/* ]]> */