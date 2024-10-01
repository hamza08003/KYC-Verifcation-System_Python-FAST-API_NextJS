
import {FormContext} from "@/context/FormContext";
import {DialogBox} from "@/components/DialogBox";
import {Button} from "@/components/ui/button";
import StreamCam from "@/components/streamCam";
import {DialogClose} from "@/components/ui/dialog";
import React, {useContext, useEffect, useState} from "react";
import {Disc} from "lucide-react";

// context



interface Props {
    camDeviceId: any
}




function RecordingWindow(props: Props) {

  let [recordedBlobs, setRecordedBlobs] = useState<Array<Blob>>([]);
  const {setFormData} = useContext(FormContext);  let [isRecordingStarted, setIsRecordingStarted] = React.useState(false);
    const mediaStreamRef = React.useRef<MediaRecorder | null>(null);
  const dialogCloseRef = React.useRef(null);

  let constraints = { video: {
      deviceId: props.camDeviceId,
    } };

  useEffect(() => {
    if (isRecordingStarted) {
      navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function(mediaStream) {
            let video = document.getElementById("record-cam");

            if (video && video instanceof HTMLVideoElement) {
              video.srcObject = mediaStream;
              video.onloadedmetadata = function() {
                video.play();
              };
            }
            mediaStreamRef.current = new MediaRecorder(mediaStream);
              mediaStreamRef.current.ondataavailable = function(event) {
              if (event.data && event.data.size > 0) {
                setRecordedBlobs([...recordedBlobs, event.data]);
              }
            };
              mediaStreamRef.current.start();
            setTimeout(() => {
                mediaStreamRef.current?.stop();
                setIsRecordingStarted(false);
                let superBuffer = new Blob(recordedBlobs, { type: "video/mp4" });
                console.log(superBuffer);
                setFormData(
                    (prev: any) => ({...prev, faceVideo: superBuffer})
                )
              // @ts-ignore
              dialogCloseRef.current.click()

            }, 2000);
          })
          .catch(function(err) {
            console.log(err.name + ": " + err.message);
          })
    }
  }, [isRecordingStarted]);

  return (
      <DialogBox title="Capture Video"
                 triggerElement={ <Button className={"mx-auto"} onClick={()=> setIsRecordingStarted(true)}
                 >
                     Start Recording</Button>}>
        <div className="flex flex-col items-center space-x-2 gap-4">
            {isRecordingStarted && <Disc className={"text-red blink"} />}
           <StreamCam id={"record-cam"} camId={props.camDeviceId?.camDeviceId}/>
          <DialogClose asChild>
            <Button className={"hidden"} ref={dialogCloseRef} type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </div>

      </DialogBox>
  );
}

export default RecordingWindow;
