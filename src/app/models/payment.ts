export interface Payment {
    paymentDetailId?:number,
    cardOwnerName: string,
    cardNumber:string,
    expirationDate:string,
    securityCode: string,
}
