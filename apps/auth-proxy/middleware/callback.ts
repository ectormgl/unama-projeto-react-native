import {eventHandler} from "h3"

export default eventHandler((event) => {
    console.log(event.path)
})