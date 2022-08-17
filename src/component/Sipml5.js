
import SIPml from 'ecmascript-webrtc-sipml';
export class AppComponent {
    // sTransferNumber;
    // oRingTone; oRingbackTone;
    // oSipStack; oSipSessionRegister; oSipSessionCall; oSipSessionTransferCall;
    // videoRemote; videoLocal; audioRemote;
    // bFullScreen = false;
    // oNotifICall;
    // bDisableVideo = false;
    // viewVideoLocal; viewVideoRemote; viewLocalScreencast; // <video> (webrtc) or <div> (webrtc4all)
    // oConfigCall;
    // oReadyStateTimer;
    // ringtone;ringbacktone;
    // constructor(){
    //     this.ringtone = document.getElementById("ringtone");
    //     this.ringbacktone = document.getElementById("ringbacktone");
 
    // }
    componentDidMount(){


        alert("sssssss");
    }
    sipRegister_ = () => {
        alert("sss");
    }
    //     try {
    //         // enable notifications if not already done
    //         // if (window.webkitNotifications && window.webkitNotifications.checkPermission() != 0) {
    //         //     window.webkitNotifications.requestPermission();
    //         // }
 
    //         Notification.requestPermission();
    //         // save credentials
    //         //saveCredentials();
 
    //         // update debug level to be sure new values will be used if the user haven't updated the page
    //         SIPml.setDebugLevel((window.localStorage && window.localStorage.getItem('org.doubango.expert.disable_debug') == "true") ? "error" : "info");
 
    //         // create SIP stack
    //         this.oSipStack = new SIPml.Stack({
    //             realm: "xxx.xxx.xxx.xx",
    //             impi: "yyyy",
    //             impu: "sip:yyyy@xxx.xxx.xxx.xx",
    //             password: "yyyy",
    //             display_name: "yyyy",
    //             websocket_proxy_url: "wss://xxx.xxx.xxx.xx:8089/ws",
    //             outbound_proxy_url: "",//(window.localStorage ? window.localStorage.getItem('org.doubango.expert.sip_outboundproxy_url') : null),
    //             ice_servers: "",//(window.localStorage ? window.localStorage.getItem('org.doubango.expert.ice_servers') : null),
    //             enable_rtcweb_breaker: "",//(window.localStorage ? window.localStorage.getItem('org.doubango.expert.enable_rtcweb_breaker') == "true" : false),
    //             events_listener: { events: '*', listener: this.onSipEventStack },
    //             enable_early_ims: "",//(window.localStorage ? window.localStorage.getItem('org.doubango.expert.disable_early_ims') != "true" : true), // Must be true unless you're using a real IMS network
    //             enable_media_stream_cache: "",//(window.localStorage ? window.localStorage.getItem('org.doubango.expert.enable_media_caching') == "true" : false),
    //             //bandwidth: (window.localStorage ? tsk_string_to_object(window.localStorage.getItem('org.doubango.expert.bandwidth')) : null), // could be redefined a session-level
    //             //video_size: (window.localStorage ? tsk_string_to_object(window.localStorage.getItem('org.doubango.expert.video_size')) : null), // could be redefined a session-level
    //             sip_headers: [
    //                     { name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.2016.03.04' },
    //                     { name: 'Organization', value: 'Doubango Telecom' }
    //             ]
    //         }
    //         );
    //         if (this.oSipStack.start() != 0) {
    //             console.log('<b>Failed to start the SIP stack</b>');
    //         }
    //         else return;
    //     }
    //     catch (e) {
    //         console.log("<b>2:" + e + "</b>");
    //     }
    //     //btnRegister.disabled = false;
       
    // }
}