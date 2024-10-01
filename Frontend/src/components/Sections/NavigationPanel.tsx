import {Button} from "@/components/ui/button";
import React from "react";
import {PuffLoader} from "react-spinners";


interface Props{
    shouldProceed: any,
    onNext: any,
    onBack: any,
    onInvalid: any,
    loading: boolean
}

export default function NavigationPanel(props: Props){
    return (
        <div className='flex flex-row px-4 justify-between'>
            <Button disabled={props.loading} onClick={() => {
                props.onBack();
            }}>Back</Button>
            <Button
                disabled={props.loading}
                onClick={() => {
                    if (props.shouldProceed()) {
                        props.onNext();
                    } else {
                        props.onInvalid();
                        console.log("invalid");
                }}}
            >
                {props.loading ?
                    <PuffLoader color={"white"} size={50}/> :
                    "Next"}
            </Button>
        </div>
    )

}