import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {BadgeCheck, BadgeX} from "lucide-react";
import Image from "next/image";
import DownloadCertComp from "@/components/DownloadCertComp";


interface ResultDialogProps {
    open: any;
    onClose: any;
    result: any;

}

function ResultDialog(props: ResultDialogProps) {
    return (
        <Dialog open={props.open } onOpenChange={() => props.onClose} >
            <DialogContent className={"md:max-w-[30%] max-w-[95%] "}>
                <DialogHeader>
                    <DialogTitle>Verification Result</DialogTitle>
                </DialogHeader>
                <DialogDescription className={""}>

                    {props.result?.is_verified ?
                        <div className={"flex flex-col justify-center items-center gap-[30px]"}>
                            <BadgeCheck color={"green"} size={100}/>
                            <p className={"text-3xl"}>KYC Verification Successful</p>
                            <div className={"flex flex-col "}>
                                <p className={"text-xl"}>Certificate: </p>
                                <Image
                                    src={`data:image/png;base64, ${props.result?.cert}`}
                                    alt={"certificate"}
                                    width={0}
                                    height={0}
                                    className={"w-full h-auto "}
                                />
                            </div>
                            <DownloadCertComp base64Image={`data:image/png;base64, ${props.result?.cert}`}/>
                        </div> :
                        <div className={"flex flex-col justify-center items-center gap-[30px]"}>
                            <BadgeX color={"red"} size={100}/>
                            <p className={"text-3xl"}>KYC Verification Failed</p>
                        </div>}

                </DialogDescription>
                <DialogFooter>
                    <Button onClick={props.onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ResultDialog;