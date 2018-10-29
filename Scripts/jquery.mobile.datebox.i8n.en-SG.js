/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
 * https://github.com/jtsage/jquery-mobile-datebox
 *
 * Translation by: J.T.Sage <jtsage@gmail.com>
 *
 */

jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'en': {
		setDateButtonLabel: "Set Date",
		setTimeButtonLabel: "Set Time",
		setDurationButtonLabel: "Set Duration",
		calTodayButtonLabel: "Jump to Today",
		titleDateDialogLabel: "Set Date",
		titleTimeDialogLabel: "Set Time",
		daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		daysOfWeekShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		monthsOfYear: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		monthsOfYearShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		durationLabel: ['Days', 'Hours', 'Minutes', 'Seconds'],
		durationDays: ['Day', 'Days'],
		tooltip: "Open Date Picker",
		nextMonth: "Next Month",
		prevMonth: "Previous Month",
		timeFormat: 12,
		headerFormat: '%a %-d %b %Y',
		dateFieldOrder: ['d', 'm', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		dateFormat: '%-d %b %Y',
		useArabicIndic: false,
		isRTL: false,
		calStartDay: 0
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: 'en'
});

