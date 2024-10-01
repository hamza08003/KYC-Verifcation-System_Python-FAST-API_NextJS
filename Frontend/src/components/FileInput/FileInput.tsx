import styles from "./CustomInput.module.css"
import {CloudUpload} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ChangeEvent, useRef, MutableRefObject} from "react";

interface FileInputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    typeLabel: string
    typesAllowed: string
    file?: File | null
    doc_id: string
}   


function FileInput(props: FileInputProps) {
    let inputRef = useRef<HTMLInputElement | null>(null);

  return (
      <div>
            <label className={styles.custom_file_main} htmlFor={"file-input-" + props.doc_id}>
                <CloudUpload />
                <div className={"flex flex-col ml-4"}>
                    {props.file ? <p>{props.file?.name}</p> : <p>Drag and drop file here</p>}

                    <p className={"text-gray-500 text-sm"}>Limit 1MB • {props.typeLabel}</p>
                </div>
                <Button  className={"ml-auto"} onClick={()=> {
                    // @ts-ignore
                    inputRef.current.click()
                }}>Browse File</Button>
            </label>
            <input ref={(el: HTMLInputElement) => {inputRef.current = el; }}
                   id={"file-input-" + props.doc_id}
                   className={styles.file_input}
                   type={"file"}
                   accept={props.typesAllowed}
                   onChange={(event) => {props.onChange(event)}} />
      </div>
  )
}

export { FileInput };