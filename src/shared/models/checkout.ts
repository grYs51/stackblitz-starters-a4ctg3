export interface ShippingInfo {
  name: string;
  address: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expirationDate: string;
}

export interface Order {
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
}
