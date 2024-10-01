import { createContext, useState, ReactNode } from "react";


const FormContext = createContext<any>(null);

export const FormProvider = ({ children }: {children: ReactNode}) => {
    const [formData, setFormData] = useState({
        name: "",
        isBusiness: false,
        frontFile: null,
        backFile: null,
        billFile: null,
        faceVideo: null,
    });
    
    return (
        <FormContext.Provider value={{ formData, setFormData }}>
        {children}
        </FormContext.Provider>
    );
}


export{FormContext}
