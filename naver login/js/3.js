initSmartLevel();
isOldIE();
//initialize 
doBUK();
//legacy focus
try {
	if (navigator.appVersion.toLowerCase().indexOf("win") != -1) {
		$('id').style.imeMode = "disabled";
		document.msCapsLockWarningOff = true;
	}
} catch (e) {}

addNclicksEvent("log.naver");
addNclicksEvent("log.login");
addNclicksEvent("log.otn");
addNclicksEvent("log.otnhelp");
addNclicksEvent("log.chatbot");
addNclicksEvent("log.banner");
addNclicksEvent("log.QR");

addNormalEvent('u_skip_anchor', u_skip);
addNormalEvent('ipguide', function (e) {
	help_ip_popup();
	e.preventDefault ? e.preventDefault() : e.returnValue = false;
	return false;
});
addNormalEvent('ones', onetimeLogin);
addNormalEvent('qrcode', qrlogin);
addNormalEvent('nudge_close', function () {
	hide('nudge_tooltip');
});
addNormalEvent('goNotAdult', goNotAdult);
addNormalEventWithType('keep', function (e) {
	savedLong($('keep'));
	nclks_chk('keep', 'log.keepon', 'log.keepoff', '', e);
}, "change");
addNormalEventWithType('switch', function (e) {
	ipCheck($('switch'), e);
	nclks_chk('ip_on', 'log.iponset', 'log.ipoffset', '', e);
}, "change");
addNormalEventWithType('frmNIDLogin', function (e) {
	if (confirmSplitSubmit()) {} else {
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
	}
}, "submit");

var focusPw = false;
if (isObjExist('id')) {
	var idElement = $('id');
	var id_line = $('id_line');
	addNormalEventWithType("id", function () {
		if (idElement.value.length != 0) {
			show("id_clear")
		}
	}, "keyup");
	addNormalEventWithType("id", function () {
		if (idElement.value.length != 0) {
			show("id_clear")
		}
		id_line.className = "input_row focus on";
	}, "focus");
	addNormalEventWithType("id", function () {
		if (idElement.value.length == 0) {
			setTimeout(function () {
				hide("id_clear")
			}, 200);
		}
		id_line.className = "input_row";
	}, "blur");
	addNormalEvent('id_clear', function () {
		idElement.value = "";
		hide("id_clear");
	});
	try {
		if (idElement.value.length == 0) {
			idElement.focus();
		} else {
			focusPw = true;
		}
	} catch (e) {}
}
if (isObjExist('pw')) {
	var pwElement = $('pw');
	var pw_line = $('pw_line');
	addNormalEventWithType("pw", function () {
		capslockevt(event);
		getKeysv2();
	}, "keypress");
	addNormalEventWithType("pw", function () {
		if (pwElement.value.length != 0) {
			show("pw_clear");
		}
		checkShiftUp(event);
	}, "keyup");
	addNormalEventWithType("pw", function () {
		checkShiftDown(event);
	}, "keydown");
	addNormalEventWithType("pw", function () {
		if (pwElement.value.length != 0) {
			show("pw_clear");
		}
		pw_line.className = "input_row focus on";
	}, "focus");
	addNormalEventWithType("pw", function () {
		if (pwElement.value.length == 0) {
			setTimeout(function () {
				hide("pw_clear")
			}, 200);
		}
		pw_line.className = "input_row";
	}, "blur");
	addNormalEvent('pw_clear', function () {
		pwElement.value = "";
		hide("pw_clear");
	});
	if (focusPw) {
		pwElement.focus();
	}
}

function nolink() {
	var cells = document.getElementsByTagName("a");
	for (var i = 0; i < cells.length; i++) {
		try {
			cells[i].removeAttribute("href");
		} catch (e) {}
	}
}
if (getObjValue("nolink") == "true") {
	nolink();
}
if (getObjValue("removeLink") == "true") {
	nolink();
	hide("find_wrap");
	hide("footer_link");
	hide("show_locale_switch");
}

if (getObjValue("hide_util") == "true") {
	hide("login_keep_wrap");
}
if (getObjValue("ispopup") == "true") {
	hide("nudge_tooltip");
	resizePopup(633, 950);
	makeScroll("wrap");
}
try {
	privateModeCheck();
} catch (e) {}
ncaptchaInit();
getKeysv2();