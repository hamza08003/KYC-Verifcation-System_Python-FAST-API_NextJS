

function SuccessIndicator ({title} : {title: string}) {
    return (
         <span className='inline-block bg-green-900 font-normal text-green-400 p-2 rounded'>{title}</span>
    )
}


function ErrorIndicator ({title} : {title: string}) {
    return (
        <span className='inline-block bg-red font-normal text-black p-2 rounded'>{title}</span>
    )
}

export {SuccessIndicator, ErrorIndicator}