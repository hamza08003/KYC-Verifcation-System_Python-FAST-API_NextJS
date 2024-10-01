
import React, {useEffect} from 'react'

interface Props {
    id: string,
    camId?: string
}

const StreamCam = (props: Props) => {

    const streamCamVideo = () => {
        let constraints = { video: {
            deviceId: props.camId,
            } };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function(mediaStream) {
                let video = document.getElementById(props.id);


                if (video && video instanceof HTMLVideoElement) {
                    video.srcObject = mediaStream;
                    video.onloadedmetadata = function(e) {
                        video.play();
                    };
                }
            })
            .catch(function(err) {
                console.log(err.name + ": " + err.message);
            }); // always check for errors at the end.
    }

    useEffect(()=>{
        streamCamVideo()
    },[])

    return (
        <div>
            <video autoPlay={true} id={props.id} ></video>
        </div>
    );
}

export default StreamCam