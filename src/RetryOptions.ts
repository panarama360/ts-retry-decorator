export interface RetryOptions {
    retries: number
    factor: number
    minTimeout: number
    maxTimeout: number
    randomize: boolean
}