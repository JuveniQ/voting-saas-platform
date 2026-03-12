import { Resend } from "resend";
import { getPlatformEnv } from "@/lib/env";

export interface SendVotingOtpInput {
  email: string;
  otp: string;
  tenantName: string;
  campaignName: string;
  expiresInMinutes: number;
}

export interface NotificationProvider {
  kind: "console" | "resend";
  sendVotingOtp(input: SendVotingOtpInput): Promise<{ provider: string; deliveryId?: string }>;
}

class ConsoleNotificationProvider implements NotificationProvider {
  kind = "console" as const;

  async sendVotingOtp(input: SendVotingOtpInput) {
    console.info("[otp]", input);
    return { provider: this.kind };
  }
}

class ResendNotificationProvider implements NotificationProvider {
  kind = "resend" as const;

  constructor(
    private readonly client: Resend,
    private readonly fromEmail: string,
  ) {}

  async sendVotingOtp(input: SendVotingOtpInput) {
    const result = await this.client.emails.send({
      from: this.fromEmail,
      to: input.email,
      subject: `${input.tenantName}: your verification code`,
      text: [
        `Campaign: ${input.campaignName}`,
        `Verification code: ${input.otp}`,
        `Expires in: ${input.expiresInMinutes} minutes`,
      ].join("\n"),
    });

    return {
      provider: this.kind,
      deliveryId: result.data?.id ?? undefined,
    };
  }
}

let provider: NotificationProvider | null = null;

export function getNotificationProvider(): NotificationProvider {
  if (provider) {
    return provider;
  }

  const env = getPlatformEnv();

  if (env.RESEND_API_KEY && env.RESEND_FROM_EMAIL) {
    provider = new ResendNotificationProvider(new Resend(env.RESEND_API_KEY), env.RESEND_FROM_EMAIL);
    return provider;
  }

  provider = new ConsoleNotificationProvider();
  return provider;
}
