import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_APIKEY);

export async function POST() {
    const response = await resend.emails.send({
        from: '...',
        to: 'mahir.tamim@allgentech.io',
        subject: '...',
        react: <WelcomeTemplate name="Tamim" />,
    });
    return NextResponse.json({});
}
