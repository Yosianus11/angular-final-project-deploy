export interface Payment {
    paymentDetailId?:number,
    cardOwnerName: string,
    cardNumber:string,
    expirationDate:Date,
    securityCode: string,
}
