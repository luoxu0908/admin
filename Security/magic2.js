/* <![CDATA[ */
var NS=false;
var IE=(document.all != null);
if (!IE) {NS=(document.getElementById != null);}
if (!NS) {NS=(document.layers != null);}
if (parent)
{
	var SS = '\/Security\/index.aspx';
	var SSS = new RegExp(SS,'gi');
	if (SSS.test(parent.document.location.href))
	{
		var head1 = document.getElementsByTagName('head').item(0);
		script1 = document.createElement('script');
		script1.src = '/'+window.location.pathname.split('/')[1]+'/Security/SaveReferrer.aspx';
		script1.type = 'text/javascript';
		script1.defer = true;
		script1.id = 'SR';
		void(head1.appendChild(script1));
	}
}
/* ]]> */