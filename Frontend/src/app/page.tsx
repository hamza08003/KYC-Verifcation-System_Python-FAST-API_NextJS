"use client"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";

import React from "react";

import {Separator} from "@/components/ui/separator";
import {BadgeCheck, Info, FileText, ScanFace} from "lucide-react";

import Instructions from "@/components/Sections/Instructions";
import DocVerify from "@/components/Sections/DocVerify";
import FaceVerify from "@/components/Sections/FaceVerify";


import {FormProvider} from "@/context/FormContext";
import {sections} from "@/constant";

export default function Home() {
    const [currentSection, setCurrentSection] = React.useState<string>(sections.instruction);

  return (
    <FormProvider>
        <main className="flex w-full justify-center py-[60px] ">
            <div className={"flex flex-col max-w-[90%] md:w-[70%] lg:w-[50%] gap-[20px] "}>
                <Tabs value={currentSection} className="">
                    <div className={"bg-dark-gray w-full rounded-[4px]  flex flex-col gap-[20px] "}>
                        <h1 className={"w-fit mx-auto mt-4 text-[30px] font-bold px-2"}>
                            <BadgeCheck className={"inline mr-4 w-[35px] h-auto"}/>
                            KYC Verification System
                        </h1>
                        <Separator className={"w-[95%] mx-auto bg-gray-400"}/>
                        <TabsList className={"w-full gap-[10px] px-3 mb-3 font-bold "}>
                            <TabsTrigger value="instruction">
                                <Info className={"inline mr-2"} />Instruction
                            </TabsTrigger>
                            <TabsTrigger value="doc-verify">
                                <FileText className={"inline  mr-2"} /> Docs Verification
                            </TabsTrigger>
                            <TabsTrigger value="face-verify">
                                <ScanFace className={"inline  mr-2"} />Face Verification
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="instruction">
                        <Instructions onChangeSection={setCurrentSection}/>
                    </TabsContent>
                    <TabsContent value="doc-verify">
                        <DocVerify  onChangeSection={setCurrentSection}/>
                    </TabsContent>
                    <TabsContent value="face-verify">
                        <FaceVerify onChangeSection={setCurrentSection}/>
                    </TabsContent>

                </Tabs>
            
            </div>
            
        </main>
    </FormProvider>
  );
}
