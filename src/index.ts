import * as retryPromise from 'promise-retry'
import {RetryOptions} from "./RetryOptions";

export function Retry(options?: RetryOptions, changeParams?: (args: any[], numberAttemp: number) => any[]|void): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            return retryPromise(async  (retry, number) => {
                try {
                    if(changeParams)
                        args = changeParams.call(this, args, number)||args
                    return await originalMethod.apply(this, args)
                }catch (e) {
                    retry(e)
                }
            }, options)
        }
        return descriptor
    }
}

export * from './RetryOptions'