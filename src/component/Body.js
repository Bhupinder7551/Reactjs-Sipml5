

import SIPml from 'ecmascript-webrtc-sipml';
import React from 'react';
function Body() {
    let sTransferNumber,
        oRingTone, oRingbackTone,
        oSipStack, oSipSessionRegister, oSipSessionCall, oSipSessionTransferCall,
         videoRemote, videoLocal, audioRemote,
        bFullScreen = false,
        oNotifICall,
        bDisableVideo = false,
        viewVideoLocal, viewVideoRemote, viewLocalScreencast, // <video> (webrtc) or <div> (webrtc4all)
        oConfigCall,
        oReadyStateTimer,
        ringtone, ringbacktone

    const sipRegister_ = () => {
        console.log("ggggggggggggggggggg");
    }
   
    const sipRegister = () => {
        console.log("sip register")
        try {
            // enable notifications if not already done
            // if (window.webkitNotifications && window.webkitNotifications.checkPermission() != 0) {
            //     window.webkitNotifications.requestPermission();
            // }

            Notification.requestPermission();
            // save credentials
            //saveCredentials();

            // update debug level to be sure new values will be used if the user haven't updated the page
           // SIPml.setDebugLevel((window.localStorage && window.localStorage.getItem('org.doubango.expert.disable_debug') == "true") ? "error" : "info");

            // create SIP stack
            oSipStack = new SIPml.Stack({
                realm:  "conf.nitoville.com",
                impi: "641234567890",
                impu: "sip:641234567890@conf.nitoville.com",
                password: "mysecret",
                display_name:"641234567890",
                websocket_proxy_url:  "wss://conf.nitoville.com:7443", // optional
                outbound_proxy_url: "tls://conf.nitoville.com:7443", // optional
                ice_servers: "",//(window.localStorage ? window.localStorage.getItem('org.doubango.expert.ice_servers') : null),
                enable_rtcweb_breaker: "",//(window.localStorage ? window.localStorage.getItem('org.doubango.expert.enable_rtcweb_breaker') == "true" : false),
                events_listener: { events: '*', listener: onSipEventStack },
                enable_early_ims: "",//(window.localStorage ? window.localStorage.getItem('org.doubango.expert.disable_early_ims') != "true" : true), // Must be true unless you're using a real IMS network
                enable_media_stream_cache: "",//(window.localStorage ? window.localStorage.getItem('org.doubango.expert.enable_media_caching') == "true" : false),
                //bandwidth: (window.localStorage ? tsk_string_to_object(window.localStorage.getItem('org.doubango.expert.bandwidth')) : null), // could be redefined a session-level
                //video_size: (window.localStorage ? tsk_string_to_object(window.localStorage.getItem('org.doubango.expert.video_size')) : null), // could be redefined a session-level
                sip_headers: [
                    { name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.2016.03.04' },
                    { name: 'Organization', value: 'Doubango Telecom' }
                ]
            });
            if (oSipStack.start() != 0) {
                console.log('<b>Failed to start the SIP stack</b>');
            }
            else return;
        }
        catch (e) {
            console.log("<b>2:" + e + "</b>");
        }
        //btnRegister.disabled = false;
      
    }
   const onSipEventStack = (e) => {
    console.log('==stack event = ' + e.type);
    switch (e.type) {
        case 'started':
            {
                // catch exception for IE (DOM not ready)
                try {
                    // LogIn (REGISTER) as soon as the stack finish starting
                    oSipSessionRegister = oSipStack.newSession('register', {
                        expires: 200,
                        events_listener: { events: '*', listener: onSipEventSession },
                        sip_caps: [
                                    { name: '+g.oma.sip-im', value: null },
                                    //{ name: '+sip.ice' }, // rfc5768: FIXME doesn't work with Polycom TelePresence
                                    { name: '+audio', value: null },
                                    { name: 'language', value: '\"en,fr\"' }
                        ]
                    });
                    oSipSessionRegister.register();
                    
                    
        document.getElementById("txtRegStatus").innerHTML = "connected successfully";
                }
                catch (e) {
                    console.log("<b>1:" + e + "</b>");
                    //btnRegister.disabled = false;
                }
                break;
            }
        // case 'stopping': case 'stopped': case 'failed_to_start': case 'failed_to_stop':
        //     {
        //         var bFailure = (e.type == 'failed_to_start') || (e.type == 'failed_to_stop');
        //         oSipStack = null;
        //         oSipSessionRegister = null;
        //         oSipSessionCall = null;
 
        //         //uiOnConnectionEvent(false, false);
 
        //         stopRingbackTone();
        //         stopRingTone();
 
        //         //uiVideoDisplayShowHide(false);
        //         //divCallOptions.style.opacity = 0;
 
        //         //txtCallStatus.innerHTML = '';
        //         console.log(bFailure ? "<i>Disconnected: <b>" + e.description + "</b></i>" : "<i>Disconnected</i>")
 
        //         break;
        //     }
 
        // case 'i_new_call':
        //     {
        //         if (oSipSessionCall) {
        //             // do not accept the incoming call if we're already 'in call'
        //             e.newSession.hangup(); // comment this line for multi-line support
        //         }
        //         else {
        //             oSipSessionCall = e.newSession;
        //             // start listening for events
        //             oSipSessionCall.setConfiguration(oConfigCall);
 
        //             alert("Answer / Reject")
        //             console.log("Answer / Reject")
        //             //uiBtnCallSetText('Answer');
        //             //btnHangUp.value = 'Reject';
        //             //btnCall.disabled = false;
        //             //btnHangUp.disabled = false;
 
        //             startRingTone();
 
        //             var sRemoteNumber = (oSipSessionCall.getRemoteFriendlyName() || 'unknown');
        //             console.log("<i>Incoming call from [<b>" + sRemoteNumber + "</b>]</i>");
        //             //showNotifICall(sRemoteNumber);
        //         }
        //         break;
        //     }
 
        // case 'm_permission_requested':
        //     {
        //         //divGlassPanel.style.visibility = 'visible';
        //         break;
        //     }
        // case 'm_permission_accepted':
        // case 'm_permission_refused':
        //     {
        //         //divGlassPanel.style.visibility = 'hidden';
        //         if (e.type == 'm_permission_refused') {
        //             //uiCallTerminated('Media stream permission denied');
        //         }
        //         break;
        //     }
 
        case 'starting': default: break;
    }
}
const onSipEventSession = (e) =>{
    console.log('==session event = ' + e.type);
 
    switch (e.type) {
        case 'connecting': case 'connected':
            {
                var bConnected = (e.type == 'connected');
                if (e.session == oSipSessionRegister) {
                    //uiOnConnectionEvent(bConnected, !bConnected);
                    console.log("<i>" + e.description + "</i>");
                }
                else if (e.session == oSipSessionCall) {
                    //btnHangUp.value = 'HangUp';
                    //btnCall.disabled = true;
                    //btnHangUp.disabled = false;
                    //btnTransfer.disabled = false;
                    //if (window.btnBFCP) window.btnBFCP.disabled = false;
 
                    if (bConnected) {
                        // stopRingbackTone();
                        // stopRingTone();
 
                        if (oNotifICall) {
                            oNotifICall.cancel();
                            oNotifICall = null;
                        }
                    }
 
                    console.log("<i>" + e.description + "</i>");
                    //divCallOptions.style.opacity = bConnected ? 1 : 0;
 
                    if (SIPml.isWebRtc4AllSupported()) { // IE don't provide stream callback
                        //uiVideoDisplayEvent(false, true);
                        //uiVideoDisplayEvent(true, true);
                    }
                }
                break;
            } // 'connecting' | 'connected'
        case 'terminating': case 'terminated':
            {
                if (e.session == oSipSessionRegister) {
                    //uiOnConnectionEvent(false, false);
 
                    oSipSessionCall = null;
                    oSipSessionRegister = null;
 
                    console.log("<i>" + e.description + "</i>");
                }
                else if (e.session == oSipSessionCall) {
                    //uiCallTerminated(e.description);
                }
                break;
            } // 'terminating' | 'terminated'
 
        case 'm_stream_video_local_added':
            {
                if (e.session == oSipSessionCall) {
                    //uiVideoDisplayEvent(true, true);
                }
                break;
            }
        case 'm_stream_video_local_removed':
            {
                if (e.session == oSipSessionCall) {
                    //uiVideoDisplayEvent(true, false);
                }
                break;
            }
        case 'm_stream_video_remote_added':
            {
                if (e.session == oSipSessionCall) {
                    //uiVideoDisplayEvent(false, true);
                }
                break;
            }
        case 'm_stream_video_remote_removed':
            {
                if (e.session == oSipSessionCall) {
                    //uiVideoDisplayEvent(false, false);
                }
                break;
            }
 
        case 'm_stream_audio_local_added':
        case 'm_stream_audio_local_removed':
        case 'm_stream_audio_remote_added':
        case 'm_stream_audio_remote_removed':
            {
                break;
            }
 
        case 'i_ect_new_call':
            {
                oSipSessionTransferCall = e.session;
                break;
            }
 
        // case 'i_ao_request':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             var iSipResponseCode = e.getSipResponseCode();
        //             if (iSipResponseCode == 180 || iSipResponseCode == 183) {
        //                 startRingbackTone();
        //                 console.log('<i>Remote ringing...</i>');
        //             }
        //         }
        //         break;
        //     }
 
        // case 'm_early_media':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             stopRingbackTone();
        //             stopRingTone();
        //             console.log('<i>Early media started</i>');
        //         }
        //         break;
        //     }
 
        // case 'm_local_hold_ok':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             if (oSipSessionCall.bTransfering) {
        //                 oSipSessionCall.bTransfering = false;
        //                 // AVSession.TransferCall(transferUri);
        //             }
        //             //btnHoldResume.value = 'Resume';
        //             //btnHoldResume.disabled = false;
        //             //txtCallStatus.innerHTML = '<i>Call placed on hold</i>';
        //             oSipSessionCall.bHeld = true;
        //         }
        //         break;
        //     }
        // case 'm_local_hold_nok':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             oSipSessionCall.bTransfering = false;
        //             //btnHoldResume.value = 'Hold';
        //             //btnHoldResume.disabled = false;
        //             console.log('<i>Failed to place remote party on hold</i>');
        //         }
        //         break;
        //     }
        // case 'm_local_resume_ok':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             oSipSessionCall.bTransfering = false;
        //             //btnHoldResume.value = 'Hold';
        //             //btnHoldResume.disabled = false;
        //             //txtCallStatus.innerHTML = '<i>Call taken off hold</i>';
        //             oSipSessionCall.bHeld = false;
 
        //             if (SIPml.isWebRtc4AllSupported()) { // IE don't provide stream callback yet
        //                 //uiVideoDisplayEvent(false, true);
        //                 //uiVideoDisplayEvent(true, true);
        //             }
        //         }
        //         break;
        //     }
        // case 'm_local_resume_nok':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             oSipSessionCall.bTransfering = false;
        //             //btnHoldResume.disabled = false;
        //             console.log('<i>Failed to unhold call</i>')            
        //             }
        //         break;
        //     }
        // case 'm_remote_hold':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             console.log('<i>Placed on hold by remote party</i>');
        //         }
        //         break;
        //     }
        // case 'm_remote_resume':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             console.log('<i>Taken off hold by remote party</i>');
        //         }
        //         break;
        //     }
        // case 'm_bfcp_info':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             console.log('BFCP Info: <i>' + e.description + '</i)>');
        //         }
        //         break;
        //     }
 
        // case 'o_ect_trying':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             console.log('<i>Call transfer in progress...</i>')                    }
        //         break;
        //     }
        // case 'o_ect_accepted':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             console.log('<i>Call transfer accepted</i>')    
        //         }
        //         break;
        //     }
        // case 'o_ect_completed':
        // case 'i_ect_completed':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             console.log('<i>Call transfer completed</i>')     
        //             //btnTransfer.disabled = false;
        //             if (oSipSessionTransferCall) {
        //                 oSipSessionCall = oSipSessionTransferCall;
        //             }
        //             oSipSessionTransferCall = null;
        //         }
        //         break;
        //     }
        // case 'o_ect_failed':
        // case 'i_ect_failed':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             console.log('<i>Call transfer failed</i>');
        //         //btnTransfer.disabled = false;
        //         }
        //         break;
        //     }
        // case 'o_ect_notify':
        // case 'i_ect_notify':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             console.log("<i>Call Transfer: <b>" + e.getSipRespo + " " + e.description + "</b></i>");
        //             if (e.getSipResponseCode() >= 300) {
        //                 if (oSipSessionCall.bHeld) {
        //                     oSipSessionCall.resume();
        //                 }
        //                 //btnTransfer.disabled = false;
        //             }
        //         }
        //         break;
        //     }
        // case 'i_ect_requested':
        //     {
        //         if (e.session == oSipSessionCall) {
        //             var s_message = "Do you accept call transfer to [" + e.getTransferDestinationFriendlyName() + "]?";//FIXME
        //             if (confirm(s_message)) {
        //                 console.log("<i>Call transfer in progress...</i>")
        //                 oSipSessionCall.acceptTransfer();
        //                 break;
        //             }
        //             oSipSessionCall.rejectTransfer();
        //         }
        //         break;
        //     }
    }
}
 
    return (

        <div className="container_">
            <input type="button" onClick={sipRegister_} class="btn btn-success" id="btnRegister_" value="LogIn" />
            <h2>Register With Sipml5 User <i className="fa-solid fa-user-plus"></i></h2>
            <div className="mt-lg-4 mb-3 registerarea">
                <div className="left_regarea">
                    <h5>Register</h5>
                    <h5> <label style={{ width: "100%" }} align="center" id="txtRegStatus"></label></h5>
                    <br />
                    <div className="registerform">
                        <div className="d-flex">
                            <label>Display Name: </label>
                            <input type="text" id="txtDisplayName" defaultValue="641234567891" />
                        </div>
                        <div className="d-flex">
                            <label>Private Identity: </label>
                            <input type="text" id="txtPrivateIdentity" defaultValue="641234567891" />

                        </div>
                        <div className="d-flex">
                            <label>Public Identity: </label>
                            <input type="text" id="txtPublicIdentity" defaultValue="sip:641234567891@conf.nitoville.com" />

                        </div>
                        <div className="d-flex">
                            <label>Password: </label>
                            <input type="text" id="txtPassword" placeholder="*******" defaultValue="" />
                        </div>
                        <div className="d-flex">
                            <label>Realm: </label>
                            <input type="text" id="txtRealm" defaultValue="conf.nitoville.com" />

                        </div>
                        <div className="d-flex">
                            <label>WebSocket Server URL: </label>
                            <input type="text" id="txtWebsocketServerUrl" defaultValue="wss://conf.nitoville.com:7443" />

                        </div>
                        <div className="d-flex">
                            <label>SIP outbound Proxy URL: </label>
                            <input type="text" id="txtSIPOutboundProxyUrl" defaultValue="tls://conf.nitoville.com:7443" />

                        </div>
                    </div>
                    <div className="float-right regbtns">
                        <input type="button" className="btn btn-success" id="btnRegister" defaultValue="LogIn" 
  onClick={sipRegister}
                        />
                        &nbsp;
                        <input type="button" className="btn btn-danger" id="btnUnRegister" defaultValue="LogOut" 
                            onclick='sipUnRegister();'
                        />

                    </div>
                </div>

                <div className="right_regarea">
                    <img src="/images/pexels-reynaldo-brigworkz-brigantty-747114-removebg-preview.png" width="420" height="340"
                        alt="phone" />
                </div>
            </div>
            <h2>Call User <i className="fa-solid fa-phone mt-5"></i></h2>
            <h5> <label style={{ width: "100%" }} align="center" id="txtCallStatus"></label></h5>
            <div className="call_area">
                <h5>Enter phone Number</h5>

                <input style={{ width: "100%" }} defaultValue="641234567890" type="text" id="txtPhoneNumber" />
                <div className="call_btns" align="center">
                    <button onclick='sipCall("call-audiovideo")' id="btnCall" disabled className="btn btn-success">
                        <i className="fa-solid fa-phone"></i> <i>Call</i>
                    </button>
                    <button id="btnHangUp" onclick='sipHangUp()' disabled className="btn btn-danger">
                        <i className='fas fa-phone-slash'></i> <i>End</i>
                    </button>
                </div>

            </div>
            <div id='divCallOption' className='call-optios' >
                <input type="button" className="btn" id="btnFullScreen" defaultValue="FullScreen" onclick='toggleFullScreen();' /> &nbsp;
                <input type="button" className="btn" id="btnMute" defaultValue="Mute" onclick="sipToggleMute()" /> &nbsp;

                <input type="button" className="btn" id="btnHoldResume" defaultValue="Hold" onclick='sipToggleHoldResume();' /> &nbsp;

            </div>
            <div className="videoarea">
                <div className="video_left">
                    <h5>Local video</h5>
                    <video id="video-local" style={{ backgroundColor: "grey" }} autoPlay muted></video>
                </div>
                <div className="video_right">
                    <h5>Remote video</h5>
                    <video id="video-remote" style={{ backgroundColor: "grey" }} autoPlay></video>
                </div>
            </div>

        </div>


    );
}

export default Body;
