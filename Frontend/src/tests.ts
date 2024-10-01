import {getVideoDevices} from "./utils/media.utils"

getVideoDevices().then(
    (devices) => {
        console.log(devices)
    }
)
