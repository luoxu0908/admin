//Reference implementation in Ctc.sql
//To use, call fnCtc_CheckSGID( NRIC/FINUEN ) directly below
function fnCtc_CheckSGID(ID) {
	var R = '', Tmp = ''; ID = ID.toUpperCase();
	if (ID.length == 8) { //MCST?
		switch (ID.substr(0, 4).toUpperCase()) {
			case 'MCST':
				var ChkInt = ID.substr(4, 4);
				if (ChkInt === parseInt(ChkInt, 10)) {
					R = 'MCST'; //MCST No check digit calc
				}
				break;
			default:
				break;
		}
	}
	else if (ID.length == 9) { //NRIC / FIN / BizUEN / ASGD / SYS?
		switch (ID.substr(0, 1).toUpperCase()) {
			case 'S': case 'T':
				Tmp = fnCtc_CheckSGID_GenChkDigitSTFG(ID.substr(0, 8));
				if ((ID.substr(8, 1) == Tmp) && (Tmp.length > 0)) R = 'NRIC';
				break;
			case 'F': case 'G':
				Tmp = fnCtc_CheckSGID_GenChkDigitSTFG(ID.substr(0, 8));
				if ((ID.substr(8, 1) == Tmp) && (Tmp.length > 0)) R = 'FIN';
				break;
			case 'A':
				var ChkInt = ID.substr(1, 7);
				if (ChkInt === parseInt(ChkInt, 10)) {
					R = 'ASGD'; //No check digit calc yet
					//Tmp = fnCtc_CheckSGID_GenChkDigitASGD(ID.substr(0, 8));
					//if ((ID.substr(8, 1) == Tmp) && (Tmp.length > 0)) R = 'ASGD';
				}
				break;
			case 'O': //O for other
				Tmp = fnCtc_CheckSGID_GenChkDigitSTFG(ID.substr(0, 8));
				if ((ID.substr(8, 1) == Tmp) && (Tmp.length > 0)) R = 'SYS';
				break;
			default:
				Tmp = fnCtc_CheckSGID_GenChkDigitBizUEN(ID.substr(0, 8));
				if ((ID.substr(8, 1) == Tmp) && (Tmp.length > 0)) R = 'Biz UEN';
				break;
		}
	}
	else if (ID.length == 10) { //Local Coy UEN / Other UEN / ITR / GSTN
		if (fnCtc_CheckSGID_IsNum(ID.substr(0, 1)) == 1) { //Local Coy UEN? yyyynnnnnX / ITR? - 4nnnnnnnnC
			Tmp = fnCtc_CheckSGID_GenChkDigitLocalBizUEN(ID.substr(0, 9));
			if ((ID.substr(9, 1) == Tmp) && (Tmp.length > 0)) R = 'Local UEN';
			if (ID.substr(0, 1) == '4') {
				var ChkInt = ID.substr(1, 8);
				if (ChkInt === parseInt(ChkInt, 10)) {
					R = 'ITR'; //No check digit calc yet
					//Tmp = fnCtc_CheckSGID_GenChkDigitITR(ID.substr(0, 8));
					//if ((ID.substr(8, 1) == Tmp) && (Tmp.length > 0)) R = 'ITR';
				}
			}
		} else { //Other UEN? TyyPQnnnnX / GSTN? - MCnnnnnnnC
			switch (ID.substr(0, 1).toUpperCase()) {
				case 'T': case 'S': case 'R':
					Tmp = fnCtc_CheckSGID_GenChkDigitOtherBizUEN(ID.substr(0, 9));
					if ((ID.substr(9, 1) == Tmp) && (Tmp.length > 0)) R = 'Other UEN';
					break;
				case 'M':
					var ChkInt = ID.substr(2, 7);
					if (ChkInt === parseInt(ChkInt, 10)) {
						R = 'GSTN'; //No check digit calc yet
						//Tmp = fnCtc_CheckSGID_GenChkDigitGSTN(ID.substr(0, 8));
						//if ((ID.substr(8, 1) == Tmp) && (Tmp.length > 0)) R = 'GSTN';
					}
					break;
				default:
					break;
			}
		}
	}
	else if (ID.length == 12) { //CRN?
		var ChkInt = ID.substr(0, 11);
		if (ChkInt === parseInt(ChkInt, 10)) {
			R = 'CRN'; //No check digit calc yet
			//Tmp = fnCtc_CheckSGID_GenChkDigitCRN(ID.substr(0, 8));
			//if ((ID.substr(8, 1) == Tmp) && (Tmp.length > 0)) R = 'CRN';
		}
	}
	return (R || '');
}

function fnCtc_CheckSGID_GenAlphaMap( ChkInt, Type ) {
	var R = '';
	Type = Type.toUpperCase();
	if (Type=='ST') {
		switch(ChkInt) {
			case 10:
				R='A'; break;
			case 9:
				R='B'; break;
			case 8:
				R='C'; break;
			case 7:
				R='D'; break;
			case 6:
				R='E'; break;
			case 5:
				R='F'; break;
			case 4:
				R='G'; break;
			case 3:
				R='H'; break;
			case 2:
				R='I'; break;
			case 1:
				R='Z'; break;
			case 0:
				R='J'; break;
			default:
				R=''; break;
		}
	}
	else if (Type=='FG') {
		switch(ChkInt) {
			case 10:
				R='K'; break;
			case 9:
				R='L'; break;
			case 8:
				R='M'; break;
			case 7:
				R='N'; break;
			case 6:
				R='P'; break;
			case 5:
				R='Q'; break;
			case 4:
				R='R'; break;
			case 3:
				R='T'; break;
			case 2:
				R='U'; break;
			case 1:
				R='W'; break;
			case 0:
				R='X'; break;
			default:
				R=''; break;
		}
	}
	else if (Type=='UEN-L') {
		switch(11 - ChkInt) {
			case 1:
				R='C'; break;
			case 2:
				R='D'; break;
			case 3:
				R='E'; break;
			case 4:
				R='G'; break;
			case 5:
				R='H'; break;
			case 6:
				R='K'; break;
			case 7:
				R='M'; break;
			case 8:
				R='N'; break;
			case 9:
				R='R'; break;
			case 10:
				R='W'; break;
			case 11:
				R='Z'; break;
			default:
				R=''; break;
		}
	}
	else if (Type=='UEN-B') {
		switch(11 - ChkInt) {
			case 1:
				R='A'; break;
			case 2:
				R='B'; break;
			case 3:
				R='C'; break;
			case 4:
				R='D'; break;
			case 5:
				R='E'; break;
			case 6:
				R='J'; break;
			case 7:
				R='K'; break;
			case 8:
				R='L'; break;
			case 9:
				R='M'; break;
			case 10:
				R='W'; break;
			case 11:
				R='X'; break;
			default:
				R=''; break;
		}
	}
	else if (Type=='UEN-O') {
		switch(ChkInt) {
			case 1:
				R='A'; break;
			case 2:
				R='B'; break;
			case 3:
				R='C'; break;
			case 4:
				R='D'; break;
			case 5:
				R='E'; break;
			case 6:
				R='F'; break;
			case 7:
				R='G'; break;
			case 8:
				R='H'; break;
			case 9:
				R='J'; break;
			case 10:
				R='K'; break;
			case 11:
				R='L'; break;
			case 12:
				R='M'; break;
			case 13:
				R='N'; break;
			case 14:
				R='P'; break;
			case 15:
				R='Q'; break;
			case 16:
				R='R'; break;
			case 17:
				R='S'; break;
			case 18:
				R='T'; break;
			case 19:
				R='U'; break;
			case 20:
				R='V'; break;
			case 21:
				R='W'; break;
			case 22:
				R='X'; break;
			case 23:
				R='Y'; break;
			case 24:
				R='Z'; break;
			default:
				R=''; break;
		}
	}
	return R;
}

function fnCtc_CheckSGID_GenNumMapOtherBizUEN( ChkChar ) {
	var R = 0;
	switch(ChkChar.toUpperCase()) {
		case 'A':
			R=1; break;
		case 'B':
			R=2; break;
		case 'C':
			R=3; break;
		case 'D':
			R=4; break;
		case 'E':
			R=5; break;
		case 'F':
			R=6; break;
		case 'G':
			R=7; break;
		case 'H':
			R=8; break;
		case 'J':
			R=9; break;
		case 'K':
			R=10; break;
		case 'L':
			R=11; break;
		case 'M':
			R=12; break;
		case 'N':
			R=13; break;
		case 'P':
			R=14; break;
		case 'Q':
			R=15; break;
		case 'R':
			R=16; break;
		case 'S':
			R=17; break;
		case 'T':
			R=18; break;
		case 'U':
			R=19; break;
		case 'V':
			R=20; break;
		case 'W':
			R=21; break;
		case 'X':
			R=22; break;
		case 'Y':
			R=23; break;
		case 'Z':
			R=24; break;
		default:
			R=0; break;
	}
	return R;
}

function fnCtc_CheckSGID_IsNum( ChkChar ) {
	var R=0;
	switch(ChkChar) {
		case '1':
			R=1; break;
		case '2':
			R=1; break;
		case '3':
			R=1; break;
		case '4':
			R=1; break;
		case '5':
			R=1; break;
		case '6':
			R=1; break;
		case '7':
			R=1; break;
		case '8':
			R=1; break;
		case '9':
			R=1; break;
		case '0':
			R=1; break;
		default:
			R=0; break;
	}
	return R;
}

function fnCtc_CheckSGID_GenChkDigitSTFG( ID ) {
    var R = ''; ID = ID.toUpperCase();
	if (ID.length!=8) return '';
	if (fnCtc_CheckSGID_IsNum(ID.substr(1,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(2,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(3,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(4,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(5,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(6,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(7,1))==1) {
		var ChkInt=((parseInt(ID.substr(1,1))  * 2) + (parseInt(ID.substr(2,1)) * 7) +
			(parseInt(ID.substr(3,1)) * 6) + (parseInt(ID.substr(4,1)) * 5) +
			(parseInt(ID.substr(5, 1)) * 4) + (parseInt(ID.substr(6, 1)) * 3) + (parseInt(ID.substr(7, 1)) * 2));
		switch (ID.substr(0,1).toUpperCase()) {
			case 'S': case 'O': //O for Other, follows S
				R = fnCtc_CheckSGID_GenAlphaMap((ChkInt % 11),'ST'); break;
			case 'T':
				R = fnCtc_CheckSGID_GenAlphaMap(((ChkInt + 4) % 11),'ST'); break;
			case 'F':
				R = fnCtc_CheckSGID_GenAlphaMap((ChkInt % 11),'FG'); break;
			case 'G':
				R = fnCtc_CheckSGID_GenAlphaMap(((ChkInt + 4) % 11),'FG'); break;
			default:
			  R = ''; break;
		}
	}
	return R;
}
function fnCtc_CheckSGID_GenChkDigitBizUEN( ID ) {
    var R = ''; ID = ID.toUpperCase();
	if (ID.length!=8) return '';
	if (fnCtc_CheckSGID_IsNum(ID.substr(0,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(1,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(2,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(3,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(4,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(5,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(6,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(7,1))==1) {
		var ChkInt=((parseInt(ID.substr(0,1))  * 9) + (parseInt(ID.substr(1,1))  * 8) + (parseInt(ID.substr(2,1)) * 7) +
			(parseInt(ID.substr(3,1)) * 6) + (parseInt(ID.substr(4,1)) * 5) +
			(parseInt(ID.substr(5, 1)) * 4) + (parseInt(ID.substr(6, 1)) * 3) + (parseInt(ID.substr(7, 1)) * 2));
		R = fnCtc_CheckSGID_GenAlphaMap((ChkInt % 11),'UEN-B');
	}
	return R;
}

function fnCtc_CheckSGID_GenChkDigitLocalBizUEN( ID ) {
    var R = ''; ID = ID.toUpperCase();
	if (ID.length!=9) return '';
	if (fnCtc_CheckSGID_IsNum(ID.substr(0,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(1,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(2,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(3,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(4,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(5,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(6,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(7,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(8,1))==1) {
		var ChkInt=((parseInt(ID.substr(4,1))) + (parseInt(ID.substr(5,1)) * 2) + (parseInt(ID.substr(6,1)) * 3) +
			(parseInt(ID.substr(7,1)) * 4) + (parseInt(ID.substr(8,1)) * 5) +
			(parseInt(ID.substr(0, 1)) * 6) + (parseInt(ID.substr(1, 1)) * 7) +
			(parseInt(ID.substr(2, 1)) * 8) + (parseInt(ID.substr(3, 1)) * 9));
		R = fnCtc_CheckSGID_GenAlphaMap((ChkInt % 11),'UEN-L');
	}
	return R;
}
function fnCtc_CheckSGID_GenChkDigitOtherBizUEN( ID ) {
    var R = ''; ID = ID.toUpperCase();
	if (ID.length!=9) return '';
	if (fnCtc_CheckSGID_IsNum(ID.substr(1,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(2,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(5,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(6,1))==1 &&
			 fnCtc_CheckSGID_IsNum(ID.substr(7,1))==1) {
		var ChkInt=((fnCtc_CheckSGID_GenNumMapOtherBizUEN(ID.substr(0,1)) * 15) + 
			(parseInt(ID.substr(1,1)) * 14) + 
			(parseInt(ID.substr(2,1)) * 5) +
			(fnCtc_CheckSGID_GenNumMapOtherBizUEN(ID.substr(3,1)) * 14) + 
			(fnCtc_CheckSGID_GenNumMapOtherBizUEN(ID.substr(4,1)) * 21) +
			(parseInt(ID.substr(5,1)) * 13) + 
			(parseInt(ID.substr(6,1)) * 2) +
			(parseInt(ID.substr(7,1)) * 5) + 
			(parseInt(ID.substr(8,1)) * 18));
		R = fnCtc_CheckSGID_GenAlphaMap(((ChkInt % 11) + 1),'UEN-O');
	}
	return R;
}