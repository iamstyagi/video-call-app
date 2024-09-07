

var session = null;
var webSocket;
var messages = document.getElementById("messages");
var agentid = "";
var password = "1234";
var abc = 234;
var agentid;
var passwd;
var CRMType;
var UserType;
var isOffline;
var allowDashboard;
var allowEmail;
var clientIP;
var channel;
var phone;
var state;
var schdTime;
var RecordID;
var CampID;
var LeadID;
var PhoneID;
var PhoneNo = [];
var prviewTableData = [];
var consult = [];
var consultTableData = [];
var AltPhoneNo1;
var AltPhoneNo2;
var CallBack;
var Schd;
var Assigned;
var InsertTime;
var LeadName;
var SchdTime;
// var agentName = "";
var callinvid = "";
var invkid = "";
var phoneNo = "";
// var campid = "1";
var campid = "";

// var serverip = "192.168.68.69"; // for CCP
// var serverport = "3280"; // for CCP

// var serverip = "192.168.70.22";
// var serverport = "3280";

// var serverip // dynamic
// var serverport // dynamic
// var enableWebAgentWSSL //dynamic

// var serverip = "103.73.188.147"; // for BAJAJ
// var serverport = "3290"; // for BAJAJ

// var serverport = "3283"; // for BAJAJ


// var serverip 
// var serverport 

// var serverip = "103.73.188.147"; // for BAJAJ WebRTC
// var serverport = "3290" // for BAJAJ WebRTC
// var serverip = "wrtc2.icallmate.in"; // for BAJAJ WebRTC
// var serverport = "3296" // for BAJAJ WebRTC

var serverip
var serverport
var enableServerPort

// var serverip = "agent.icallmate.in"; // for BAJAJ WebRTC
// var serverport = "3296" // for BAJAJ WebRTC

// var serverip = "203.92.43.18"; // for property 2X
// var serverport = "3280"; // for property 2X

// var serverip = "192.168.70.76"; // for local
// var serverport = "9899"; // for localrajat@123

// var serverip = "agent.icallmate.in";
// var serverip = "203.92.43.18";
// var serverport = "3280";
var agentip = "192.168.68.187";
var version = "2.2.8";
var callste;
var extno = "";
var lastconsultinvkid = "";
var contactstate = "0";
var cscampid;
var ticketJSONData;
var holdtitle;
var isDirectlyConference = false;
var customerPhoneNumber = '';
var qry;
var totalSeconds;
var timrid;
var calldiv, extno, phnno, phoneID, leadsetid, dnisno, callste, callID, callinvid, skill1, skill2, thirdPartyCallID, redialThirdPartyCallID,
    lastCallInvokeIDURL = "", istransfer = "0", recFileName = "", leadName = "";
var phoneNo, dispremarks, dispID, campid, callinvid, isCBChecked, cbDateTime, assigntoid, otherrems, isMarkAsClosed;
var disposeAttempted = "0";
var campid;
var dialmodeid;
var urlEn, Url, popUpSte, aUpdtCstFrm, aAnsr, crmEn;
var fld_enable_tktsystem = 1;
var CRMType, UserType;
var invkid = "";
var allowDashboard = true;
var allowEmail = true;
var isOffline = false;
var clientIP = "";
var isReloaded = false;
var rtmMode = 0;
var isTransferCallClicked = false;
var isConsultCallClicked = false;
var redialPhoneNo, redialPhoneId, redialLeadId, redialRecordId;
var extn_set = "";
var contactStatusCall;
var contactStatusCall = contactstate;
var ismanualLogout = false;

function encpass(passwordd) {
    var passwordd = passwordd;
    var myPassword = "Novus@myPassword";
    var encrypted = CryptoJS.AES.encrypt(passwordd, myPassword);
    sessionStorage.setItem('encpass', encrypted)
}

function setParams(agentId, password, serverip, serverport, crmType, userType, isOffline_Mode, isFld_Allow_Self_Dashboard, isEnableEmail, campName, campid, agentName, localClientIP, popUpSte) {
    agentid = agentId;
    passwd = password;
    serverip = serverip;
    serverport = serverport;
    CRMType = crmType;
    UserType = userType;
    isOffline = isOffline_Mode;
    allowDashboard = isFld_Allow_Self_Dashboard;
    allowEmail = isEnableEmail;
    campid = campid;
    clientIP = localClientIP;
    popUpSte = popUpSte

    if (performance.navigation.type === 1) {
        isReloaded = true;
    } else {
        isReloaded = false;
    }

    var x = document.getElementById(':form_topbar:topBarDiv1');
    var y = document.getElementById(':form_topbar:topBarDiv2');
    var z = document.getElementById(':form_topbar:topbarLeft');

    if (userType) {
        sessionStorage.setItem('userType', userType)

    }

    if (agentId) {
        sessionStorage.setItem('agentId', agentId)
        document.getElementById("agnt_id_set").innerHTML = agentId;
    }
    if (agentName) {
        document.getElementById("agnt_name_set").innerHTML = agentName;
    }
    if (campName) {
        var loginDetails = JSON.parse(localStorage.getItem("loginData"));
        document.getElementById("camp_name_set").innerHTML = loginDetails.value[0].campName;

    }

}


function setlogin(agentId, password) {
    qry = "%LOGIN|" + agentId + "|" + password + "||" + agentId + (isReloaded ? "PageRefresh" : "") + "|||$";
    localStorage.setItem("Login_Qry", qry);
}


function recivedPacket() {
    return prviewTableData;
}

function recivedChannelPacket() {
    return consultTableData;
}

var serverip, serverport, appIP, appPort, appName, consoleLog = 0;
function loadDoc() {   // this loads the xml file
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            myFunction(xhttp);  // here calls the loaded xml to read tags
        }
    };
    xhttp.open("GET", "config.xml", true);
    xhttp.send();
};



function myFunction(xml) {   // read xml tags data  function
    try {
        var p;
        var xmlDoc = xml.responseXML;
        var x = xmlDoc.getElementsByTagName("Server");// master tag name i.e after root tag
        for (p = 0; p < x.length; p++) {
            serverip = x[p].getElementsByTagName("ServerIP")[0].childNodes[0].nodeValue.trim();
            serverport = x[p].getElementsByTagName("ServerPort")[0].childNodes[0].nodeValue.trim(); // read xml tags data
            appIP = x[p].getElementsByTagName("ApplicationIP")[0].childNodes[0].nodeValue.trim();
            appPort = x[p].getElementsByTagName("ApplicationPort")[0].childNodes[0].nodeValue.trim();
            appName = x[p].getElementsByTagName("ApplicationName")[0].childNodes[0].nodeValue.trim();
        }
        var q;
        var cfgMisc = xmlDoc.getElementsByTagName("Misc");// master tag name i.e after root tag
        for (q = 0; q < cfgMisc.length; q++) {
            consoleLog = cfgMisc[q].getElementsByTagName("consoleLog")[0].childNodes[0].nodeValue.trim();
        }
    } catch (err) {
    }

}



function sockStart() {
    // enableWebAgentWSSL = sessionStorage.getItem('enableWebAgentWSSL'); // dynamic
    // serverip = sessionStorage.getItem('serverip'); // dynamic
    // serverport = sessionStorage.getItem('serverportno'); // dynamic


    serverip = sessionStorage.getItem('serverIpFile');
    serverport = sessionStorage.getItem('serverPortFile');
    enableServerPort = sessionStorage.getItem('serverWssorWs');
    // Ensures only one connection is open at a time
    if (webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED) {

        return;
    } else {
        if (serverip && serverport && enableServerPort) {
            // let url = `${enableServerPort}://${serverip}:${serverport}/iCallMate/websocket/ucs`
        webSocket = new WebSocket(`${enableServerPort}://${serverip}:${serverport}/iCallMate/websocket/ucs`);
        // webSocket = new WebSocket("ws://" + serverip + ":" + serverport + "/iCallMate/websocket/ucs");
        } 
    }



    webSocket.onopen = function (event) {
        sendData("%C|12|12072010|" + version + "|" + agentip + "$");


        setInterval(function () {
            if (!this.webSocket || this.webSocket.readyState !== 1) {
                //
                // alert('You are disconnected from Server, Please Re-Login!');
                window.localStorage.clear();
                window.sessionStorage.clear()
                setTimeout(function () {
                    location.href = '#/login.html';
                }, 500);
            }
        }, 50000);
    };


    webSocket.onmessage = function (event) {
        if (event.data === "") {
            return;
        }

        if (event.data === "%H$") {
            sendData("%g$");
        }
        var arrdata;
        var strdata = event.data;
        strdata = strdata.substring(1, strdata.length - 1);
        strdata = strdata.split("$%");
        for (var j = 0; j < strdata.length; j++) {
            arrdata = strdata[j].split("|");
            for (var i = 0; i < arrdata.length; i++) {
                arrdata[i] = arrdata[i].replace(/#{a}/g, "%");
                arrdata[i] = arrdata[i].replace(/#{b}/g, "$");
                arrdata[i] = arrdata[i].replace(/#{c}/g, "|");
            }
            if (arrdata[0] === "H") {

            }
            else if(arrdata[0]==="RTMMessage"){

                let rtmMessage = arrdata[1];
                sessionStorage.setItem('rtmMessage',rtmMessage);
               
            }
            else if (arrdata[0] === "A_C") {
                if (arrdata[1] === "1") {

                    qry = "%LOGIN|" + agentid + "|" + password + "||" + agentid + "|||$";
                    sendData(qry);

                } else {
                    clearInterval(timrid);
                    if (arrdata[1] === 1) {

                    }
                    alert('Connection Closed - > You are disconnect from Server');
                    window.localStorage.clear();

                    setTimeout(function () {
                        location.href = '#/login.html';
                        // window.location = "http://" + appIP + ":" + appPort + "/" + appName + "/login.xhtml";
                    }, 500);
                }

            } else if (arrdata[0] === "Camp") {
                localStorage.setItem("CampStr", event.data);
            } else if (arrdata[0] === "es") {
                startTimer();

                document.getElementById("extn_set").innerHTML = arrdata[1].replace(/Break-/g, "");
                extn_set = arrdata[1].replace(/Break-/g, "");
                if ((arrdata[1]).indexOf("Break") !== -1) {
                    document.getElementById("extn_set").style.color = "orange";
                    document.getElementById("changeButtonColor").style.backgroundColor = "orange";
                    document.getElementById("changeButtonColor").style.setProperty("background-color", "orange", "important");
                    document.getElementById("changeButtonColor").style.border = "orange";
                    document.getElementById("changeButtonColor").style.setProperty("border", "orange", "important");
                } else if (document.getElementById('extn_set').innerHTML === 'Idle') {
                    document.getElementById("extn_set").style.color = "black";
                    document.getElementById("changeButtonColor").style.backgroundColor = "black";
                } else if (document.getElementById('extn_set').innerHTML === 'ACW') {
                    document.getElementById("extn_set").style.color = "#36D7B7";
                    document.getElementById("changeButtonColor").style.backgroundColor = "#36D7B7";

                } else if (document.getElementById('extn_set').innerHTML === 'Talk') {
                    document.getElementById("extn_set").style.color = "green";
                    document.getElementById("changeButtonColor").style.backgroundColor = "green";
                }
                else if (document.getElementById('extn_set').innerHTML === 'Hold') {
                    document.getElementById("extn_set").style.color = "blue";
                    document.getElementById("changeButtonColor").style.backgroundColor = "blue";
                }
                else if (document.getElementById('extn_set').innerHTML === 'Busy') {
                    document.getElementById("extn_set").style.color = "red";
                    document.getElementById("changeButtonColor").style.backgroundColor = "red";
                }
                else if (document.getElementById('extn_set').innerHTML === 'conf') {
                    document.getElementById("extn_set").style.color = "black";
                    document.getElementById("changeButtonColor").style.backgroundColor = "black";
                }
                else if (document.getElementById('extn_set').innerHTML === 'DialinWait-857777') {
                    document.getElementById("extn_set").style.color = "#9b9d00";
                    document.getElementById("changeButtonColor").style.backgroundColor = "#9b9d00";

                }
                else {
                    document.getElementById("extn_set").style.color = "black";
                    document.getElementById("changeButtonColor").style.backgroundColor = "black";
                }
                sessionStorage.setItem('extn_set', extn_set)
                dialmodeid = arrdata[7];
                if (dialmodeid == 1) {
                    document.addEventListener("DOMContentLoaded", function () {
                        document.getElementById("dialmode").value = "Auto";
                    });
                    sessionStorage.setItem("DialMode", dialmodeid);

                } else if (dialmodeid == 2) {
                    document.addEventListener("DOMContentLoaded", function () {
                        document.getElementById("dialmode").value = "Manual";
                    });
                    sessionStorage.setItem("DialMode", dialmodeid);

                }


                holdtitle = document.getElementById("form_topbar:btnhold");

                if ((arrdata[1]) === "Idle") {
                }

                if ((arrdata[1]) === "Talk" || (arrdata[1]) === "Conf") {
                    // document.getElementById("form_topbar:btnrelease").firstChild.disabled = false;
                    // document.getElementById("form_topbar:btnhold").firstChild.disabled = false;
                    document.getElementById("hold").innerHTML = "Hold";
                }
                if ((arrdata[1]) === "Hold") {
                    // document.getElementById("form_topbar:btnrelease").firstChild.disabled = false;
                    // document.getElementById("form_topbar:btnhold").firstChild.disabled = false;
                    document.getElementById("hold").innerHTML = "UnHold";
                }
                else {
                    document.getElementById("hold").innerHTML = "Hold";
                }
                if ((arrdata[1]).includes("Break")) {
                    document.getElementById("form_topbar:btnrelease").firstChild.disabled = false;
                    document.getElementById("form_topbar:btnhold").firstChild.disabled = true;
                }
                if ((arrdata[1]) === "Logout") {
                    clearInterval(timrid);
                    window.localStorage.clear();


                    setTimeout(function () {
                        location.href = '#/login.html';
                        // window.location = "http://" + appIP + ":" + appPort + "/" + appName + "/login.xhtml";
                    });
                }

            } else if ((arrdata[0]) === "ccs") {
                try {

                    consult.push(arrdata);

                    const filteredObject = consult.reduce((acc, curr) => {
                        const mob = curr[4];
                        acc[mob] = curr.reduce((obj, value, index) => {
                            obj[index] = value;
                            return obj;
                        }, {});
                        return acc;
                    }, {});

                    const arrayOfObjects = Object.values(filteredObject);
                    // 
                    consultTableData = arrayOfObjects.filter((item) => item[3] != 'Disposed')
                    // 

                    if (lastconsultinvkid === "" || lastconsultinvkid != arrdata[1]) {
                        consultCallInvokeID = arrdata[1];

                        // document.getElementById("lblconsultchannelno").innerHTML = arrdata[2];
                        consultCallChannelNo = arrdata[2];
                        // consultCallChannelNo = document.getElementById("lblconsultchannelno").innerHTML;

                        // document.getElementById("lblconsultstate").innerHTML = arrdata[3];
                        ConsultState = arrdata[3];
                        // state = document.getElementById("lblconsultstate").innerHTML;

                        // document.getElementById("lblconsultphno").innerHTML = arrdata[4];
                        consultPhoneNo = arrdata[4];
                        // phone = document.getElementById("lblconsultphno").innerHTML;

                    }
                } catch (exception) {

                }
            } else if ((arrdata[0]) === "a_ccs") {
                if (arrdata[4] === 1) {

                } else if (arrdata[4] === 0) {

                }

            } else if ((arrdata[0]) === "PreviewDial") {
                try {
                    prviewTableData.push(arrdata);
                    if (CRMType == 0 || CRMType == 1) {
                        RecordID = arrdata[2];
                        CampID = arrdata[3];
                        LeadID = arrdata[4];
                        PhoneID = arrdata[5];
                        PhoneNo = arrdata[6];
                        document.getElementById("Prv_Phone_No").innerHTML = "" + PhoneNo;


                        AltPhoneNo1 = arrdata[7];
                        AltPhoneNo2 = arrdata[8];
                    }
                } catch (exception) {

                }

            } else if ((arrdata[0]) === "A_DIALMODE") {
                if (arrdata[1] == 1) {
                    let mode=arrdata[2].replace(/\$+/g, '');
                     mode = mode.replace(/\r/g, '');
                   sessionStorage.setItem('latestDialMode',mode);
                    if (arrdata[2] == 1) {
                        document.getElementById("dialmode").firstChild.innerHTML = "1";
                    } else if (arrdata[2] == 2) {
                        document.getElementById("dialmode").firstChild.innerHTML = "2";
                    }
                } else {
                    alert('DialMode change failed -> ' + arrdata[2]);
                }

            } else if ((arrdata[0]) === "A_TransferCall") {
                "%A_TransferCall|" + Pkt_In_CallTransfer.CallInvokeID + "|0|CallInvokeID cannot be blank" + "$"
                if (arrdata[2] == 1) {

                } else if (arrdata[2] == 0) {

                }

            } else if ((arrdata[0]) === "CS") {
                sessionStorage.setItem("callRecording", arrdata[27]);
                calldiv = arrdata;
                extno = calldiv[1];
                phnno = calldiv[2];
                dialState = calldiv[3];
                dnisno = calldiv[29];
                callste = calldiv[4];
                phoneID = calldiv[23];
                agentid = calldiv[11];
                callID = calldiv[21];
                callinvid = calldiv[17];
                callType = calldiv[18];
                sessionStorage.setItem('callinvid', callinvid);
                sessionStorage.setItem('callID', callID)
                sessionStorage.setItem('myNewArrayValueSession',calldiv[45])
                // document.getElementById('callType').innerHTML=callType;
                if (callType === "ACD" || callType === "ACD.") {
                    callTypeIncObd = "Incoming";
                    document.getElementById('callType').innerHTML = callTypeIncObd;
                    document.getElementById("callType").style.color = "red";
                } else if (callType === "DialerOut") {
                    callTypeIncObd = "Outgoing";
                    document.getElementById('callType').innerHTML = callTypeIncObd;
                    document.getElementById("callType").style.color = "blue";
                }
                skill1 = calldiv[25];
                skill2 = calldiv[31];
                callback = calldiv[32];
                thirdPartyCallID = calldiv[13];
                redialPhoneNo = phnno;
                redialPhoneId = phoneID;
                redialLeadId = leadsetid;
                redialRecordId = calldiv[7];
                redialThirdPartyCallID = thirdPartyCallID;
                UnDisposedTicketID = 0;
                sessionStorage.setItem('redialNumberCheck',redialPhoneNo)
                if (callback == 1) {
                    if (calldiv.length > 34) {
                        callBackTime = calldiv[34];
                    }
                    if (calldiv.length > 35) {
                        callBackRefNo = calldiv[36];
                    }
                } else {
                    callBackRefNo = "";
                }
                if (calldiv.length > 36) {
                    UnDisposedTicketID = calldiv[37];
                }

                document.getElementById("agnt_id_set").innerHTML = agentid;
                document.getElementById("phone_no").innerHTML = phnno;
                document.getElementById("dnis_no").innerHTML = dnisno;
                document.getElementById("callstate").innerHTML = callste;

                // uncomment this to enable masking
                // if (localStorage.getItem("loginData")) {
                //     const loginData = JSON.parse((localStorage.getItem("loginData")));
                //     const masked = loginData.value[0].masked;
                //     const maskOffSet = loginData.value[0].maskOffSet;
                //     if (masked) {
                //         document.getElementById("phone_no").innerHTML = "X".repeat(maskOffSet) + phnno.slice(maskOffSet)
                //     } else {
                //         document.getElementById("phone_no").innerHTML = phnno;
                //     }
                // }

                if (document.getElementById('callstate').innerHTML == 'UnDisposed') {
                    document.getElementById("callstate").style.color = "red";

                } else if (document.getElementById('callstate').innerHTML === 'Idle') {
                    document.getElementById("callstate").style.color = "black";
                } else if (document.getElementById('callstate').innerHTML === 'ACW') {
                    document.getElementById("callstate").style.color = "#36D7B7";

                } else if (document.getElementById('callstate').innerHTML === 'Talk') {
                    document.getElementById("callstate").style.color = "green";
                }
                else if (document.getElementById('callstate').innerHTML === 'Hold') {
                    document.getElementById("callstate").style.color = "blue";
                }
                else if (document.getElementById('callstate').innerHTML === 'Busy') {
                    document.getElementById("callstate").style.color = "red";
                }
                else if (document.getElementById('callstate').innerHTML === 'conf') {
                    document.getElementById("callstate").style.color = "black";
                }
                else {
                    document.getElementById("callstate").style.color = "black";
                }

                sessionStorage.setItem("phoneID", phoneID);
                // sessionStorage.setItem("phoneID", 0);

                if (skill2) {
                    document.getElementById("skill12").innerHTML = "" + skill1 + " , " + skill2;
                } else {
                    document.getElementById("skill12").innerHTML = "" + skill1;
                }
                if (callback == 1) {
                    document.getElementById("iscallbackyes").innerHTML = "Yes";
                    document.getElementById("iscallbackyes").style.color = '#f46b0a'

                }
                else {
                    document.getElementById("iscallbackyes").innerHTML = "No";
                    document.getElementById("iscallbackyes").style.color = 'rgb(3, 83, 136)'
                }

                if (dialState != 0) {
                    var openCRM = 0;
                    // var invkid="";
                    if (invkid == callinvid) {
                        openCRM = 0;
                    } else {
                        invkid = callinvid;
                        openCRM = 1;
                    }

                    if (callste == "Talk") {
                        if (contactstate != 1) {
                            contactstate = 1;
                            sessionStorage.setItem("sessionStorage", contactstate);
                            if (CRMType == 0 || CRMType == 1) {
                                openCRM = 1;
                            }
                        }
                    }
                    sessionStorage.setItem('phnno', phnno)
                    sessionStorage.setItem('contactstate', contactstate)

                    appName = "/iCallMate-cCP";
                    openCRM = 1;
                    CRMType = 1;
                    if (openCRM == 1 && rtmMode === 0) {

                        if (CRMType == 1) {

                            document.getElementById("iFrame1").src = "#" + appName + "/customForm?params={\"sourceid\":\"" + callID +
                                "\",\"sourcetype\":0,\"enablemenu\":\"true\",\"phoneno\":\"" + phnno + "\",\"thirdpartycallid\":\"" +
                                thirdPartyCallID + "\"}";
                        }
                        else if (CRMType <= 2 || CRMType == 3) {
                            if (allowEmail) {
                                var iframe = document.getElementById('iFrame1');
                                var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                                element = innerDoc.getElementById('form_custFilter:cspkt');
                                if (element) {
                                    element.value = "{\"sourceid\":\"" + callID +
                                        "\",\"sourcetype\":0,\"sourcesubtype\":\"" + callType + "\",\"callinvokeid\":\"" + callinvid + "\",\"enablemenu\":\"true\",\"phoneno\":\"" + phnno +
                                        "\",\"thirdpartycallid\":\"" + thirdPartyCallID + "\",\"callBackRefNo\":\"" + callBackRefNo + "\",\"UnDisposedTicketID\":\"" + UnDisposedTicketID + "\",\"callback\":\"" +
                                        callback + "\",\"callstatus\":\"" + contactstate + "\",\"phoneid\":\"" + phoneID + "\",\"campid\":\"" + cscampid + "\",\"ticketJSONData\":" + ticketJSONData + ",\"isTransfer\":" + istransfer + " }";
                                } else {
                                    document.getElementById("iFrame1").src = appName + "/customForm?params={\"sourceid\":\"" + callID +
                                        "\",\"sourcetype\":0,\"enablemenu\":\"true\",\"phoneno\":\"" + phnno + "\",\"thirdpartycallid\":\"" +
                                        thirdPartyCallID + "\"}";

                                }
                            } else {
                                document.getElementById("iFrame1").src = "#" + appName + "/customForm?params={\"sourceid\":\"" + callID +
                                    "\",\"sourcetype\":0,\"enablemenu\":\"true\",\"phoneno\":\"" + phnno + "\",\"thirdpartycallid\":\"" +
                                    thirdPartyCallID + "\"}";
                            }
                        }
                    }
                    if (urlEn && ((popUpSte == 2 && callste == "Talk") || (popUpSte == 1 && callste == "Ring") || (popUpSte == 0))) {
                        if (lastCallInvokeIDURL != callinvid) {
                            lastCallInvokeIDURL = callinvid;
                            strUrl = Url;
                            strUrl = strUrl.replace(/<<extnno>>/g, extno);
                            strUrl = strUrl.replace(/<<phoneno>>/g, phnno);
                            strUrl = strUrl.replace(/<<phoneid>>/g, phoneID);
                            strUrl = strUrl.replace(/<<agentid>>/g, agentid);
                            strUrl = strUrl.replace(/<<callerid>>/g, phnno);
                            strUrl = strUrl.replace(/<<callid>>/g, callinvid);
                            strUrl = strUrl.replace(/<<custfield3>>/g, thirdPartyCallID);
                            strUrl = strUrl.replace(/<<crmcallid>>/g, thirdPartyCallID);
                            window.open(strUrl, '_blank').focus();
                        }
                    }
                }

            } else if ((arrdata[0]) === "Que") {
                document.getElementById("queuecount").innerHTML = arrdata[2];

                if (arrdata[2] == "0") {
                    document.getElementById("queuecount").style.color = "black";

                } else {
                    document.getElementById("queuecount").style.color = "orange";

                }



            } else if ((arrdata[0]) == "A_MakeCall") {
                if (arrdata[3] == "0") {

                    alert(arrdata[4]);
                }
            }
          

            else if ((arrdata[0]) === "A_DisposeCall") {
                sessionStorage.removeItem('disposeData')
                sessionStorage.setItem('DisposeCallStatus',arrdata)
                if ((arrdata[1]) === "1") {
                    contactstate = 0;
                    if (sessionStorage.getItem('disposenlogout') == 1) {
                        // document.getElementById("iFrame1").src = "#" + '/iCallMate-cCP' + '/blank';
                        document.getElementById("iFrame1").src = 'about:blank';
                        sessionStorage.setItem('disposenlogout', false);
                        setlogout(true);
                    }
                    else if (sessionStorage.getItem('redialFunctionality')=='true'){
                            sessionStorage.setItem('redialFunctionality','false')
                            // document.getElementById("iFrame1").src = "#" + '/iCallMate-cCP' + '/blank';
                        document.getElementById("iFrame1").src = 'about:blank';
                            let payload = JSON.parse(sessionStorage.getItem('redialPayload'));
                        if (payload.fld_phoneno) {

                            if(payload.mode=="1" || payload.mode==1){
                                setdialmode(2);
                            }
                            if (redialLeadId) {
                                redialLeadId = '';
                            }
                            if (redialRecordId) {
                                redialRecordId = '';
                            }
                            if (redialThirdPartyCallID) {
                                redialThirdPartyCallID = '';
                            }
                    
                        webSocket.send("%MakeCall|" + payload.agentid + "|" + payload.fld_phoneno + "|1|" + payload.campid + "|" + redialLeadId + "|" + redialRecordId + "|" + redialThirdPartyCallID + "|" + payload.phoneid + "|||0|$");
                        // debugger;  
                        if(payload.mode=="1" || payload.mode==1){
                            setdialmode(payload.mode);
                        }
                          else
                          {
                            
                          }
                        }



                    }
                    else {
                        sessionStorage.removeItem('disposeData');
                        document.getElementById("iFrame1").src = "#" + '/iCallMate-cCP' + '/blank';
                      
                    }
                } else {

                    alert("Call not Disposed" + arrdata[6]);
                }
            }

            else if ((arrdata[0]) === "A_LOGIN") {
                if ((arrdata[1]) === "1") {
                    call = true;
                    var sp = arrdata;
                    let setCampId = sp[7];
                    sessionStorage.setItem('afterLoginUpdatedDetails', setCampId);
                    document.getElementById("agnt_id_set").innerHTML = "" + sp[5];
                    document.getElementById("agnt_name_set").innerHTML = "" + sp[2];
                    agentid = sp[5];

                    var m = sp[7];
                    var dl = (localStorage.getItem("CampStr")).split("|");
                    var res = dl[1].split(",");
                    var k;
                    try {
                        for (var i in res) {
                            if (res[i].includes(m)) {
                                k = res[i].split(":");
                                var trimmedCampId = setCampId.trim();
                                var trimmedK0 = k[0].trim();

                                if (trimmedCampId == trimmedK0) {
                                    document.getElementById("camp_name_set").innerHTML = "" + k[1];
                                    sessionStorage.setItem('campName', k[1])
                                }

                            }
                        }
                    } catch (ed) {
                        alert("Error after Login " + ed);
                    }
                } else if ((arrdata[1]) === "0") {
                    alert('Warning ' + arrdata[2]);
                    setlogout(true);
                }
            }
            else if ((arrdata[0]) === "A_LOGOUT") {
                if ((arrdata[1]) === "1") {
                    closeSocket();
                } else if ((arrdata[1]) === "0") {
                    if (!ismanualLogout) {
                        alert('Warning ' + arrdata[2]);
                        location.href = '#/login.html';
                    }
                    //setlogout(true);
                }
            }
        };
    }

    function onclose() {

    };
}


function setPreviewDialSearch(phoneno, leadid, recordid, phoneid) {
    appName = "/iCallMate-cCP";
    if ((!callinvid && typeof callinvid !== 'undefined') || callinvid == "") {
        if (!callinvid && typeof callinvid !== 'undefined') {
            callinvid = callinvid.trim();
        } else {
            callinvid = "";
        }
        if (!callID && typeof callID !== 'undefined') {
            callID = callID.trim();
        } else {
            callID = recordid;
        }
        sessionStorage.setItem('phnno', phoneno);
        sessionStorage.setItem('phoneID', phoneid);
        blank();
        setTimeout(function()  {
        document.getElementById("iFrame1").src = "#" + '/iCallMate-cCP' + "/customForm?params={\"sourceid\":\"" + callID.trim() +
        "\",\"sourcetype\":7,\"sourcesubtype\":1,\"callinvokeid\":\"" + callinvid +
        "\",\"enablemenu\":\"true\",\"thirdpartycallid\":\"\",\"callBackRefNo\":\"\",\"UnDisposedTicketID\":\"\",\"callback\":\"\",\"callstatus\":\"\",\"phoneid\":\""
        + phoneid.trim() + "\",\"phoneno\":\"" + phoneno.trim() + "\",\"campid\":\"\",\"leadid\":\"" + leadid + "\",\"recordid\":\"" + recordid + "\"}";
      }, 10);

        // document.getElementById("iFrame1").src = "#" + '/iCallMate-cCP' + '/customForm';
    } else {
        if (!callinvid && typeof callinvid !== 'undefined') {
            callinvid = callinvid.trim();
        } else {
            callinvid = "";
        }
        if (!callID && typeof callID !== 'undefined') {
            callID = callID.trim();
        } else {
            callID = recordid;
        }

        blank();
        setTimeout(function () {
        document.getElementById("iFrame1").src = "#" + '/iCallMate-cCP' + "/customForm?params={\"sourceid\":\"" + callID +
            "\",\"sourcetype\":7,\"sourcesubtype\":1,\"callinvokeid\":\"" + callinvid +
            "\",\"enablemenu\":\"true\",\"thirdpartycallid\":\"\",\"callBackRefNo\":\"\",\"UnDisposedTicketID\":\"\",\"callback\":\"\",\"callstatus\":\"\",\"phoneid\":\""
            + phoneid.trim() + "\",\"phoneno\":\"" + phoneno.trim() + "\",\"campid\":\"\",\"leadid\":\"" + leadid + "\",\"recordid\":\"" + recordid + "\"}";
        }, 10)
        // document.getElementById("iFrame1").src = "#" + '/iCallMate-cCP' + '/customForm';
    }
}


function openDashboard() {
    document.getElementById("iFrame1").src = "#" + '/iCallMate-cCP' + '/dashboard';
}
function openWebChatDashboard() {
    document.getElementById("iFrame1").src = "#" + '/iCallMate-cCP' + '/webchat-dashboard';
}

function openAPRDashboard() {
    document.getElementById("iFrame1").src = "#" + '/iCallMate-cCP' + '/APRDashboard';
}

function openCustForm() {
    document.getElementById("iFrame1").src = "#" + '/iCallMate-cCP' + '/customForm';
}

function blank() {
    document.getElementById("iFrame1").src = "#" + '/iCallMate-cCP' + '/blank';
}

function openWhatsappMedia() {
    // document.getElementById("iFrame2").src = "#" + '/iCallMate-cCP' + '/chat';
    document.getElementById("iFrame2").src = "#" + '/iCallMate-cCP' + '/whatsapp';
}

function openEmail() {
    document.getElementById("iFrame3").src = "#" + '/iCallMate-cCP' + '/email';
}

function openTwitter() {
    document.getElementById("iFrame4").src = "#" + '/iCallMate-cCP' + '/twitter';
}

function openFacebook() {
    document.getElementById("iFrame5").src = "#" + '/iCallMate-cCP' + '/facebook';
}

function openSMS() {
    document.getElementById("iFrame6").src = "#" + '/iCallMate-cCP' + '/sms';
}

function openInstagram() {
    document.getElementById("iFrame7").src = "#" + '/iCallMate-cCP' + '/instagram' + '/insta-inbox';
}
function openWebChat(){
    document.getElementById("iFrame8").src = "#" + '/iCallMate-cCP' + '/webchat';
}
function openLogin() {
    // location.reload();
    setlogout(true);
}



function sendDataToWebSocket(data) {
    sendData(data);
}

function menucall(choice) {
    var linksrc;
    switch (choice) {
        case 1:
            linksrc = "ticketDashboard";
            break;
        case 2:
            linksrc = "custFormSearch";
            break;
        case 3:
            linksrc = "ticketFormSearch";
            break;
        case 4:
            linksrc = "smtpMgr";
            break;
        case 5:
            linksrc = "ticketStatusMgr";
            break;
        case 6:
            linksrc = "ticketTypeMgr";
            break;
        case 7:
            linksrc = "emailTemplate";
            break;
        case 8:
            linksrc = "socialMediaMgr";
            break;
        case 9:
            linksrc = "ticketStatus";
            break;
        case 10:
            linksrc = "campSMTP";
            break;
        case 11:
            linksrc = "campSocialMedia";
            break;
        case 12:
            linksrc = "campTicketTypeMgr";
            break;
        case 13:
            linksrc = "custFormFieldsMgr";
            break;
        case 14:
            linksrc = "ticketFormFieldMgr";
            break;
        case 15:
            linksrc = "disposeCall";
            break;
        case 16:
            linksrc = "report";
            break;
        case 17:
            linksrc = "dispatcher";
            break;
        case 20:
            linksrc = "contactsGroupMgr";
            break;
        case 21:
            linksrc = "contactsMgr";
            break;
        case 22:
            linksrc = "contactGrpMembers";
            break;
        case 23:
            linksrc = "DispatcherGrpMgr";
            break;
        case 24:
            linksrc = "DispatcherRuleMgr";
            break;
        case 25:
            {
                linksrc = "tlViewDashboard";
                if (rtmMode === 0) {
                    rtmMode = 1;
                    setTimeout(function () {
                        setlogin(agentid, passwd);
                    }, 1000);
                } else {
                    if (session !== null) {
                        session.send("%REPEAT$");
                    }
                }
                break;
            }
        case 26:
            linksrc = "tlDashBoard";
            break;
        case 27:
            linksrc = "customForm";
            //emailAuditMgr
            break;
        case 28:
            linksrc = "GSDashboard";
            break;

    }


    var pagelink = "/" + appName + "/" + linksrc + ".html";
}

function setTopBarSearch(searchValue) {
    setTopBarSearch(searchValue, false);
}

/**
 * Sends the value of the text input to the server
 */
function send() {
    var text = document.getElementById("messageinput").value;
    sendData(text);
}
/**
 * Sends the value of the text input to the server
 */
function sendData(text) {

    webSocket.send(text);
    // messages.innerHTML += "<br/>Sent:" + text;
}
function closeSocket() {
    webSocket.close();
}
function writeResponse(text) {
    messages.innerHTML += "<br/>Rcvd:" + text;
}
function authLogin(dialerToken) {
    if (!dialerToken) {
        dialerToken = "413d4b9f2724495299f2704471f2061d";
    }

    fetch('http://13.234.113.7/apis/sourcing-apis/sourcing/v3/dialer/validate_session', {
        method: 'POST',
        body: JSON.stringify({
            title: 'foo'
        }),
        headers: {
            "dialer-token": "413d4b9f2724495299f2704471f2061d",
            "x-platform-token": "70CMm0yn6x0hIhQqdRcUmGys08D2px35"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))
}


function setmakecall() {
    //    Function for making an outbound call
    // debugger;
    phoneNo = document.getElementById("makecallinput").value;
    if (!phoneNo) {
        return;
    }
    var phoneid = '0';

    webSocket.send("%MakeCall|" + agentid + "|" + phoneNo + "|1|" + campid + "||||" + phoneid + "|0|$");

}

function setmakecallFromWhatsapp() {
    sessionStorage.removeItem('redialFromWhatsapp')
    //    Function for making an outbound call
    // debugger;
    phoneNo = sessionStorage.getItem('getNumberFromWh');
    if (!phoneNo) {
        return;
    }
    var phoneid = '0';

    webSocket.send("%MakeCall|" + agentid + "|" + phoneNo + "|1|" + campid + "||||" + phoneid + "|0|$");

}
function setmakecallbyPhoneIDByPreview(phoneNo, campid, leadid, recordid, phoneid) {
    // phoneNo = sessionStorage.getItem('getNumberFromWh');
    if (!phoneNo) {
        return;
    }

    webSocket.send("%MakeCall|" + agentid + "|" + phoneNo + "|1|" + campid + "||||" + phoneid + "|0|$");

}


function setupdatedmakecall(phoneno, campid, leadid, recordid, phoneid)//6,3,4,2,5
{
    var callDestType = 1;
    var isAlternateNoToBeDialed = 0;
    var AlternateNoToBeDialed = '';
    var campCallListRecordKey = '';
    var any3rdPartyCallID = '';
    if (extn_set != "Idle") {
        return;
    }
    if (recordid) {
        // campCallListRecordKey = '3811';
        campCallListRecordKey = recordid;
    }

    // %MakeCall|11392|9971299528|1||6896|18042410185275||854687|0|$
    // %MakeCall|1001|8840318234|1|22|381|381_3814||4|0|$

    if (phoneno) {
        webSocket.send("%MakeCall|" + agentid + "|" + phoneno + "|" + callDestType + "|" + campid + "|" + leadid +
            "|" + campCallListRecordKey + "|" + any3rdPartyCallID + "|" + phoneid +
            "|" + (isAlternateNoToBeDialed ? "1" : "0") + "|" + AlternateNoToBeDialed + "$");

            
            if (consoleLog == 1) {
            }
    }
}



function setdiscardcall(leadid, calllistrecid, isdiscard, discardreason)//4,2,1=true,'Discarded'
{

    if (calllistrecid) {
        webSocket.send("%UpdateCallList|" + campid + "|" + leadid + "|" + calllistrecid + "|" + isdiscard + "|" + discardreason + "$");
        if (consoleLog == 1) {

        }
    }
}



function setredialmakecall() {
    if (redialPhoneNo) {
        if (redialLeadId) {
            redialLeadId = '';

        }
        if (redialRecordId) {
            redialRecordId = '';

        }
        if (redialThirdPartyCallID) {
            redialThirdPartyCallID = '';

        }
        redialRecordId = '';


        webSocket.send("%MakeCall|" + agentid + "|" + redialPhoneNo + "|1|" + campid + "|" + redialLeadId + "|" + redialRecordId + "|" + redialThirdPartyCallID + "|" + redialPhoneId + "|||0|$");

    }
}



function setrelease(releaseid) {
    //Function for releasing an active call
    if (callinvid) {
        sendData("%ChExtState|" + releaseid + "||" + callinvid + "$");
    } else {
        // 
        sendData("%ChExtState|" + releaseid + "||$");
    }
}


function sethold() {
    //    Function for setting live call on hold
    if (callinvid) {
        var strPkt = "%ChExtState|2||" + callinvid + "|$";
        sendData(strPkt);
    } else {

    }
}

function redirectToSearchPage(parameters) {
    // window.open('customForm.html');
    // window.location.href = 'customForm.html';
    document.getElementById("iFrame1").src = "/" + appName + "/customForm.html?params=" + parameters;
}


function setlogout(manualLogout) {
    sendData("%LOGOUT|0|0|$");
    //    var retVal = confirm("Are you sure you want to Logout?");
    //    if( retVal == true )
    //    {
    try {
        if (!manualLogout) {
            ismanualLogout = false;
        } else {
            ismanualLogout = true;
        }
        if (UserType === 4 && !isOffline) {
            rtmMode = 0;
            sendData("%LOGOUT|0|0|$");
            if (arrdata == 1) {

            }
        } else if (rtmMode === 1) {
            rtmMode = 0;
            sendData("%LOGOUT|0|0|$");
            if (arrdata == 1) {

            }
            setTimeout(function () {
                location.href = '#/login.html';
                // location.reload(); // added by rajat
                // window.location = "http://" + appIP + ":" + appPort + "/" + appName + "/login.xhtml";
            }, 1500);
        } else {
            setTimeout(function () {
                location.href = '#/login.html';
                // location.reload(); // added by rajat
                // window.location = "http://" + appIP + ":" + appPort + "/" + appName + "/login.xhtml";
            }, 1500);
        }
    } catch (err) {
        alert("You have been logged out");
        setTimeout(function () {
            location.href = '#/login.html';
            // location.reload(); // added by rajat
            // window.location = "http://" + appIP + ":" + appPort + "/" + appName + "/login.xhtml";
        }, 3000);
    }
}


function openVTSDlg() {
    try {
        var iframe = document.getElementById('iFrame1');
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        element = innerDoc.getElementById('form_custFilter:pnlTrackVTS');


    } catch (err) {
    }
}


function openVTSDialog(vehicleID, refreshTimer) {
    var win = window.open("http://" + appIP + ":" + appPort + "/" + appName +
        "/VTS.xhtml?params={\"vehicleID\":\"" + vehicleID + "\",\"refreshTimer\":\"" + refreshTimer + "\"}",
        'VTS', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350');
    win.focus();
}
//window.open("http://" + appIP + ":" + appPort + "/" + appName + "/VTS.xhtml?params={\"contactID\":\""+contactID+"\",\"refreshTimer\":\""+refreshTimer+"\"", '_blank');


function startTimer() {
    totalSeconds = 0;
    clearInterval(timrid);
    timrid = setInterval(countTimer, 1000);
}


function countTimer() {
    totalSeconds = totalSeconds + 1;
    //    var hour = parseInt(Math.floor(totalSeconds / 3600));
    //    var minute = parseInt(Math.floor((totalSeconds - hour * 3600) / 60));
    //    var seconds = parseInt(totalSeconds - (hour * 3600 + minute * 60));
    var hour = parseInt(Math.floor(totalSeconds / 3600)),
        minute = parseInt(Math.floor(totalSeconds / 60) % 60),
        seconds = parseInt(totalSeconds % 60);
    if (hour < 10)
        hour = "0" + hour;
    if (minute < 10)
        minute = "0" + minute;
    if (seconds < 10)
        seconds = "0" + seconds;
    //    return h + ":" + m + ":" + s;

    document.getElementById("timecntrl").innerHTML = hour + ":" + minute + ":" + seconds;
}


function setConsultCall() {
    //    Function for dailing calls for consultation
    phoneNo = document.getElementById("makecallinput").value;

    // var consultPhoneNo = document.getElementById("consultinput").value;
    var contactID = "";
    if (!contactID) {
        contactID = "";
    }
    // if (callinvid) {
    sendData("%ConsultCall|" + callinvid + "|" + extno + "|" + phoneNo + "|" + contactID + "$");
    // } else {

    // }

}


function setConference() {
    //    Function for conferencing consultation calls (ChExtState->5)
    if (callinvid) {
        if (callste == "Idle" || callste == "ACW") {

        } else {
            sendData("%ChExtState|5||" + callinvid + "$");
        }
    } else {

    }
}


function setTransferFromConsult() {
    //Function for Transfering consultation calls (ChExtState->6)
    //Points to check first -> There can't be more than one consultation call & there should be one live consult call
    if (callinvid) {
        if (callste == "Idle" || callste == "ACW") {

        } else {
            sendData("%ChExtState|6||" + callinvid + "$");
        }
    } else {

    }
}


function setConsultHold() {
    //    Function for putting a consultation call on hold
    // var consultCallChannelNo = document.getElementById("lblconsultchannelno").innerHTML;
    // var consultCallInvokeID = document.getElementById("lblconsultinvokeid").innerHTML;
    try {
        if (consultCallInvokeID) {
            sendData("%ChExtState|2|" + consultCallChannelNo + "|" + consultCallInvokeID + "|$");
        }
    } catch (exception) {

    }
}


function setConsultRelease() {
    //    Function for releasing a consultation call
    // var consultCallChannelNo = document.getElementById("lblconsultchannelno").innerHTML;
    // var consultCallInvokeID = document.getElementById("lblconsultinvokeid").innerHTML;
    try {
        if (consultCallInvokeID) {
            sendData("%ChExtState|1|" + consultCallChannelNo + "|" + consultCallInvokeID + "$");
        }
    } catch (err) {

    }
}


function setbreak(breakid) {
    //    Function for setting agent on break
    if (breakid) {
        sendData("%LOGOUT|2|" + breakid + "|$");
    }
}


function settransfercall() {
    //    Function for transferring call to another campaign
    var skillsetid = 0;
    var transferno = document.getElementById("transferinput").value;
    if (callinvid) {
        sendData("%TransferCall|" + callinvid + "|" + transferno + "|" + skillsetid + "$");
    }
}

function setmakecallbyPhoneID(phoneNo, phoneid) {
    if (!phoneNo) {
        return;
    }
   
    webSocket.send("%MakeCall|" + agentid + "|" + phoneNo + "|1|" + campid + "||||" + phoneid + "|0|$");

}
function setdialmode(dialmode) {

    //    Function for setting agent dialmode (Auto/Manual)
    if (dialmode) {
        sendData("%DIALMODE|" + dialmode + "|||$");

    }
}



