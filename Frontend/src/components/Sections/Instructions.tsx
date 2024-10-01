import {Info} from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";



function Instructions({onChangeSection}: {onChangeSection: Dispatch<SetStateAction<any>>}) {
    return(
        <div className={"flex flex-col gap-[30px] mt-[40px]"}>
            <div className={"flex flex-row mx-auto w-fit font-bold text-2xl items-center"}>
                <Info className={"mr-2"}/> About KYC Verification System
            </div>
            <div className={"p-4 rounded bg-info-foreground text-info text-sm"}>
                Welcome to the KYC Verification System. This application helps in verifying the identity of
                individuals by processing their documents and facial data. Follow the instructions in each
                tab to complete the verification process.
            </div>
            <div>
                <h2 className={"font-bold text-xl"}>Instructions</h2>
                <ul>
                    <li>
                        <strong className={"font-semibold"}>Name and Address Verification:</strong>
                        Upload the front and back images of your ID and any utility bill to verify your name
                        and address.
                    </li>
                    <li>
                        <strong className={"font-semibold"}>Face Verification:</strong>
                        Take a selfie to verify your identity.
                    </li>
                </ul>
            </div>
            <div className={"p-4 rounded bg-warning text-warning-foreground text-sm"}>
                Please ensure that all uploaded images/docs and captured video is clear and unobstructed to
                avoid verification errors.
            </div>
            <Button className={"ml-auto mr-4"} onClick={() => {onChangeSection("doc-verify")}}>Next</Button>
        </div>
    )
}

export default Instructions;