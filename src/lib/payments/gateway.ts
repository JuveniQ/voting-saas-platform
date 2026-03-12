export const paymentProviders = ["yoco", "paystack", "flutterwave"] as const;

export type PaymentProvider = (typeof paymentProviders)[number];

export interface CreateCheckoutSessionInput {
  tenantId: string;
  campaignId: string;
  amountMinor: number;
  currency: string;
  redirectUrl: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentGateway {
  provider: PaymentProvider;
  createCheckoutSession(input: CreateCheckoutSessionInput): Promise<never>;
  verifyWebhook(payload: string, signature?: string): Promise<never>;
}

class ReservedGateway implements PaymentGateway {
  constructor(public readonly provider: PaymentProvider) {}

  async createCheckoutSession(input: CreateCheckoutSessionInput): Promise<never> {
    void input;
    throw new Error(`${this.provider} checkout is reserved for the future payments phase.`);
  }

  async verifyWebhook(payload: string, signature?: string): Promise<never> {
    void payload;
    void signature;
    throw new Error(`${this.provider} webhooks are reserved for the future payments phase.`);
  }
}

export function isPaymentProvider(value: string): value is PaymentProvider {
  return (paymentProviders as readonly string[]).includes(value);
}

export function getPaymentGateway(provider: PaymentProvider) {
  return new ReservedGateway(provider);
}
