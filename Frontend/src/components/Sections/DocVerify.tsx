import React, {Dispatch, SetStateAction, ChangeEvent, useEffect} from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FileInput } from '../FileInput/FileInput';
import { sections } from '@/constant';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormContext } from '@/context/FormContext';

import {useToast} from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import NavigationPanel from "@/components/Sections/NavigationPanel";

function DocVerify({onChangeSection}: {onChangeSection: Dispatch<SetStateAction<any>>}) {


  const formData = React.useContext(FormContext)

  const [isBusiness, setIsBusiness] = React.useState("false");
  const [error, setError] = React.useState<string | null>(null);
  const {toast} = useToast();

  const validateDocInputs = () => {
    // validate inputs
    console.log("validating doc inputs");
    console.log(formData.formData);
    // if valid
    if (formData.formData.name.length <= 3 ) 
      setError("Name is too short");
    else if (formData.formData.frontFile == null)
      setError("Front file is missing");
    else if (formData.formData.backFile == null)
      setError("Back file is missing");
    else if (formData.formData.billFile == null)
      setError("Bill file is missing");
    else {
      setError(null);
      return true;
    }

    return false;
  }

    useEffect(() => {
        formData.setFormData((prev: any) => ({...prev, isBusiness: isBusiness}));
    }, [isBusiness]);

  return (
    <div className='flex flex-col gap-[30px] mt-6'>
        <RadioGroup value={isBusiness}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id='Individual' onClick={() => setIsBusiness("false")} value={"false"}></RadioGroupItem>
            <Label htmlFor="Individual">Individual</Label>
          </div>
          
          <div className="flex items-center space-x-2">
          <RadioGroupItem id='Business' onClick={() => setIsBusiness("true")} value={"true"}></RadioGroupItem>
          <Label htmlFor="Business">Business</Label>
          </div>
        </RadioGroup>
        <div>
          <Label htmlFor='business-name'>{isBusiness == "true" && "Business"} Name</Label>
          <Input id='business-name' value={formData.formData.name} onChange={(event) => {
            formData.setFormData((prev: any) => ({...prev, name: event.target.value}))
          }}/>
        </div>
        
        <div>
          <Label>Upload the front image of your ID document</Label>
          <FileInput 
            onChange={(event: ChangeEvent<HTMLInputElement>) => formData.setFormData(
                (prev: any) => ({...prev, frontFile: event.target.files?.[0]})
              )} 
            typeLabel='JPG, PNG, JPEG' 
            typesAllowed='.jpeg, .png, .jpg'
            file={formData.formData.frontFile}
            doc_id={"front"}
            />
        </div>
        <div>
          <Label>Upload the back image of your ID document</Label>
          <FileInput 
            onChange={(event: ChangeEvent<HTMLInputElement>) => formData.setFormData(
              (prev: any) => ({...prev, backFile: event.target.files?.[0]})
            )} 
            typeLabel='JPG, PNG, JPEG'
            typesAllowed='.jpeg, .png, .jpg'
            file={formData.formData.backFile}
            doc_id={"back"}
            />
        </div>
        <div>
          <Label>Upload your bill (PDF, JPG, PNG)</Label>
          <FileInput 
            onChange={(event: ChangeEvent<HTMLInputElement>) => formData.setFormData(
              (prev: any) => ({...prev, billFile: event.target.files?.[0]})
            )} 
            typeLabel='PDF, JPG, PNG, JPEG'
            typesAllowed='.jpeg, .png, .jpg, .pdf'
            file={formData.formData.billFile}
            doc_id={"bill"}
            />
        </div>
        <NavigationPanel
            loading={false}
            onInvalid={()=>
              {
                toast({
                  variant: "destructive",
                  title: "Input Error",
                  description: error,
                });
                console.error(error);
              }}
            onBack={() => onChangeSection(sections.instruction)}
            shouldProceed={validateDocInputs}
            onNext={() => onChangeSection(sections.face_verify)}
        />
        {error && <Toaster  />}
    </div>
  );
}

export default DocVerify;