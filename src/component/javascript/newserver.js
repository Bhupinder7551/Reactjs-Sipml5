
// var oSipStack, oSipSessionRegister, oSipSessionCall;
// var videoRemote, videoLocal, audioRemote;
// var bFullScreen = false;
// var bDisableVideo = false;
// var oConfigCall;
// var txtPrivateIdentity,
//   txtPhoneNumber,
//   txtPublicIdentity,
//   txtPassword,
//   txtRealm,
//   txtDisplayName,
//   txtWebsocketServerUrl,
//   txtSIPOutboundProxyUrl,btnRegister;
  
// window.onload = function () {
//   txtPrivateIdentity = document.getElementById("txtPrivateIdentity");
//   txtPublicIdentity = document.getElementById("txtPublicIdentity");
//   txtPassword = document.getElementById("txtPassword");
//   txtRealm = document.getElementById("txtRealm");
//   txtDisplayName = document.getElementById("txtDisplayName");
//   txtWebsocketServerUrl = document.getElementById("txtWebsocketServerUrl");
//   txtSIPOutboundProxyUrl = document.getElementById("txtSIPOutboundProxyUrl");
//   txtPhoneNumber = document.getElementById("txtPhoneNumber");
//   btnRegister= document.getElementById("btnRegister");
//   SIPml.init(postInit);
// };

// function postInit() {
//   btnRegister.disabled = false;
//   oConfigCall = {
//     video_local: document.getElementById("video-local"),
//     video_remote: document.getElementById("video-remote"),
//     audio_remote: document.getElementById("audio-remote"),

//     screencast_window_id: 0x00000000, // entire desktop
//     bandwidth: { audio: undefined, video: undefined },
//     video_size: {
//       minWidth: undefined,
//       minHeight: undefined,
//       maxWidth: undefined,
//       maxHeight: undefined,
//     },
//     events_listener: { events: "*", listener: onSipEventSession },
//     sip_caps: [
//       { name: "+g.oma.sip-im" },
//       { name: "language", value: '"en,fr"' },
//     ],
//   };
// }


// document.getElementById("btnRegister").addEventListener("click", dd);
// dd=()=>{
//   console.log("gggggggg")
// }


// function sipRegister() {
//   console.log("txtDisplayName", txtDisplayName.value);
//   console.log("txtPassword", txtPassword.value);
//   console.log("txtPrivateIdentity", txtPrivateIdentity.value);
//   console.log("txtPublicIdentity", txtPublicIdentity.value);
//   console.log("txtRealm", txtRealm.value);
//   console.log("txtSIPOutboundProxyUrl", txtSIPOutboundProxyUrl.value);
//   console.log("txtWebsocketServerUrl", txtWebsocketServerUrl.value);
//   btnRegister.disabled = true;
//   oSipStack = new SIPml.Stack({
//     // realm: 'conf.nitoville.com', // mandatory: domain name
//     // impi: '641234567891', // mandatory: authorization name (IMS Private Identity)
//     // impu: 'sip:641234567891@conf.nitoville.com', // mandatory: valid SIP Uri (IMS Public Identity)
//     // password: 'mysecret', // optional
//     // display_name: '641234567891', // optional
//     // websocket_proxy_url: 'wss://conf.nitoville.com:7443', // optional
//     // outbound_proxy_url: 'tls://conf.nitoville.com:7443', // optional

//     realm: txtRealm.value ? txtRealm.value : "conf.nitoville.com", // mandatory: domain name
//     impi: txtPrivateIdentity.value ? txtPrivateIdentity.value : "641234567890", // mandatory: authorization name (IMS Private Identity)
//     impu: txtPublicIdentity.value
//       ? txtPublicIdentity.value
//       : "sip:641234567890@conf.nitoville.com", // mandatory: valid SIP Uri (IMS Public Identity)
//     password: txtPassword.value ? txtPassword.value : "mysecret", // optional
//     display_name: txtDisplayName.value ? txtDisplayName.value : "641234567890", // optional
//     websocket_proxy_url: txtWebsocketServerUrl.value
//       ? txtWebsocketServerUrl.value
//       : "wss://conf.nitoville.com:7443", // optional
//     outbound_proxy_url: txtSIPOutboundProxyUrl.value
//       ? txtSIPOutboundProxyUrl.value
//       : "tls://conf.nitoville.com:7443", // optional

//     enable_rtcweb_breaker: false, // optional
//     events_listener: { events: "*", listener: onSipEventStack }, // optional: '*' means all events
//     sip_headers: [
//       // optional
//       { name: "User-Agent", value: "IM-client/OMA1.0 sipML5-v1.0.0.0" },
//       { name: "Organization", value: "Doubango Telecom" },
//     ],
//   });

//   oSipStack.start();
// }