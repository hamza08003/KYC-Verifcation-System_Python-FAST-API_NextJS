"use client"
import {clsx} from "clsx";
import {CircleX, FileText} from "lucide-react";

interface FileLabelProps {
    className?: string,
    fileName: string,
    // @ts-ignore
    onClose: (event: MouseEvent<SVGSVGElement, MouseEvent> ) => void
}

function FileLabel(props : FileLabelProps) {

    return (
        <div className={clsx("flex flex-row items-center px-4 m-3", props.className)}>
            <FileText />
            <p className={"w-[50ch] overflow-hidden whitespace-nowrap text-ellipsis ml-2"}>
                {props.fileName}
            </p>
            <CircleX  className={"ml-auto cursor-pointer hover:text-red"} onClick={(event) => {props.onClose(event)}}/>
        </div>
    )
}

export {FileLabel}