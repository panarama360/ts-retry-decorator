import {Retry} from "./index";

class Example {
    @Retry({
        retries: 2,
        factor: 2,
        minTimeout: 1 * 1000,
        maxTimeout: 2 * 1000,
        randomize: true
    })
    retryFunction(){
        if(Math.random()*100 > 60)
            throw new Error("Error !!")
    }
}



async function start() {
    console.log('Start')
    const example = new Example()
    await example.retryFunction()
    console.log('Finish')
}

start().catch(reason => console.log(reason))