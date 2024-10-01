import React from 'react';
import {Button} from "@/components/ui/button";

interface DownloadImageComponentProps {
    base64Image: string;
}

const DownloadImageComponent = (props :  DownloadImageComponentProps) => {
    // Function to trigger image download
    const downloadImage = () => {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = props.base64Image;

        // Set the download attribute with a filename
        link.download = 'certificate.png'; // You can change the filename and extension

        // (required for Firefox)
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    };

    return (
        <Button onClick={()=>downloadImage()} size={"lg"}>Download Certificate</Button>
    );
};

export default DownloadImageComponent;
