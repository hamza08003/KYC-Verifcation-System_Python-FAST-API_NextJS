import {Select, SelectTrigger} from "@/components/ui/select";
import React from "react";

interface SelectProps {
    triggerValue?: string,
    children: React.ReactNode,
    setValue: (value: any) => void
}

function SelectComponent(props: SelectProps){
    return (
        <Select onValueChange={(value) => props.setValue(value)}>
            <SelectTrigger>
                <span>{props.triggerValue}</span>
            </SelectTrigger>
            {
                props.children
            }
        </Select>
    )
}

export {SelectComponent}