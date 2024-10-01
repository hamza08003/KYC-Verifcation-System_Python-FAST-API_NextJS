import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React from "react";

interface  DialogBoxProps {
    children: React.ReactNode,
    title? : string,
    triggerElement?: React.ReactNode,
}

function DialogBox(props: DialogBoxProps){
    return (
        <Dialog >
            <DialogTrigger asChild>
                {
                    props.triggerElement
                }
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                </DialogHeader>
                {
                    props.children
                }
                <DialogFooter className="sm:justify-start">
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export {DialogBox}