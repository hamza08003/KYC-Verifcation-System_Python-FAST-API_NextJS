"use client"


import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

// Contexts
import { FormContext } from '@/context/FormContext';

// utils
import {v4 as uuid} from "uuid";
import { getVideoDevices } from '@/utils/media.utils';
import { sections } from '@/constant';



// components
import { Button } from '../ui/button';
import {SelectComponent} from "@/components/Select";
import {SelectContent, SelectItem} from "@/components/ui/select";
import {DialogBox} from "@/components/DialogBox";
import {ErrorIndicator, SuccessIndicator} from "@/components/Indicators";
import StreamCam from "@/components/streamCam";
import RecordingWindow from "@/components/RecordingWindow";
import NavigationPanel from "@/components/Sections/NavigationPanel";

import {useToast} from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import ResultDialog from "@/components/ResultDialog";


interface DeviceObject {
    deviceLabel: string,
    deviceId: string,
    deviceIdx: number
}

interface camId {
    camDeviceLabel: string,
    camDeviceIdx: number,
    camDeviceId: string
}


function FaceVerify ({onChangeSection}: {onChangeSection: Dispatch<SetStateAction<any>>}){

    const {toast} = useToast();

    const [devices, setDevices] = useState<Array<DeviceObject>>();
    const [camDeviceId, setCamDeviceId] = useState< camId| null>(null);
    const {formData, setFormData} = useContext(FormContext);
    const [error, setError] = React.useState<string | null>("Not available");
    const [isLoading, setIsLoading] = useState(false);
    const [isResultWindowOpen, setIsResultWindowOpen] = useState(false);
    const [result, setResult] = useState<any>(null);

    function verifyKyc(){
        console.log("verifying kyc");

        let requestData = new FormData();

        requestData.append("username", formData.name);
        requestData.append("is_business", formData.isBusiness);
        requestData.append("selfie", formData.faceVideo);
        requestData.append("front_id", formData.frontFile);
        requestData.append("back_id", formData.backFile);
        requestData.append("bill", formData.billFile);

        setIsLoading(true);


        // @ts-ignore
        fetch(process.env.NEXT_PUBLIC_BACKEND + "/kyc" , {
            method: "POST",
            body: requestData,
            headers: [
                // @ts-ignore
                ["Origin", process.env.NEXT_PUBLIC_ORIGIN],
            ]
        })
            .then(r => r.json())
            .then(data => {
                console.log(data);
                setResult(data);
                setIsResultWindowOpen(true);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
                setError("An error occurred. Please try again");
            })

    }


    useEffect(() => {
        getVideoDevices().then(data => {
            const devicesNew = data.map((device, idx) => {
                if (device.deviceId == "") {

                }
                return{
                    deviceId: device.deviceId == "" ? uuid() : device.deviceId,
                    deviceLabel: device.label == "" ? `Device-${idx}` : device.label,
                    deviceIdx: idx
                }
            })
            setDevices(devicesNew);
        })
    }, []);

    useEffect(() => {
        console.log(camDeviceId);

    }, [camDeviceId]);

    useEffect(() => {
        if (result)
        {
            setIsResultWindowOpen(true);
            setIsLoading(false);
        }
    }, [result]);

    function handleCamChange(val: string)
    {
        setCamDeviceId(prevState => {
            return {
                camDeviceLabel:devices ? devices[parseInt(val)].deviceLabel: "",
                camDeviceIdx: parseInt(val),
                camDeviceId: devices ? devices[parseInt(val)].deviceId : ""
                }
        });
    }

    function validateDataBeforeApi(){
    //     check if the face video is available
        if (!formData.faceVideo) {
            setError("Face video is missing");
            return false;
        }
        setError(null);
        return true;
    }

    return (

        <div className='flex flex-col gap-5 mt-12'>
            <div>
                <h1 className='font-bold text-3xl'>Face Verification Instructions</h1>
                <div className='flex flex-col ml-5 gap-1 font-light mt-2'>
                    <p>Upload a clear image of your face</p>
                    <p>Make sure the image is clear and not blurry</p>
                    <p>Make sure the image is not edited</p>
                    <p>Ensure good lighting and avoid any background movement.</p>
                    <p>We will capture a short video to verify your identity.</p>
                </div>
            </div>
            <hr className='w-full mx-auto  '/>
            <div className='flex flex-col gap-8'>
                <div className='mx-auto font-bold'>Recording Status  &nbsp;
                    {
                        formData.faceVideo ?
                        <SuccessIndicator title={"Captured"}/>:
                        <ErrorIndicator title={"Not Captured"}/>
                    }
                </div>
                <div className='flex flex-row w-full justify-between gap-5'>
                    <SelectComponent triggerValue={camDeviceId?.camDeviceLabel}
                                     setValue={handleCamChange} >
                        <SelectContent >
                            {devices?.map((device, idx)=> {
                                return (
                                    <SelectItem key={device.deviceId} value={(device.deviceIdx).toString()}>
                                        {device.deviceLabel}
                                    </SelectItem>
                                );
                            })
                            }
                        </SelectContent>
                    </SelectComponent>
                    <DialogBox title="Preview Camera" triggerElement={<Button>Preview</Button>}>
                        <div className="flex items-center space-x-2">
                            <StreamCam id={"preview-cam"} camId={camDeviceId?.camDeviceId}/>
                        </div>
                    </DialogBox>
                </div>
                <RecordingWindow camDeviceId={camDeviceId?.camDeviceId}/>

                <NavigationPanel
                onInvalid={()=>
                {
                    toast({
                    variant: "destructive",
                    title: "Video Error",
                    description: error,
                    });
                    console.error(error);
                }}
                onBack={() => onChangeSection(sections.doc_verify)}
                shouldProceed={validateDataBeforeApi}
                onNext={() => {verifyKyc()}}
                loading={isLoading}
                />
                <ResultDialog open={isResultWindowOpen} onClose={()=> setIsResultWindowOpen(false)} result={result} />
                {error && <Toaster  />}
            </div>
        </div>
    )
}

export default FaceVerify;