import { problemResponse } from "@/lib/http/problem";
import { isPaymentProvider } from "@/lib/payments/gateway";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  void request;

  if (!isPaymentProvider(provider)) {
    return problemResponse(404, {
      title: "Unknown payment provider",
      detail: "The supplied payment provider is not part of the reserved gateway abstraction.",
      type: "/problems/payment-provider-not-found",
    });
  }

  return problemResponse(501, {
    title: "Payment webhooks not implemented",
    detail:
      "Webhook routing is reserved and validated, but payment reconciliation will be delivered in the future payments phase.",
    type: "/problems/payment-webhook-not-implemented",
  });
}
