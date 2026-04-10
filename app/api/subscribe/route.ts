// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const data = await request.json();

//   // Example: log to console (replace with DB or email integration)
//   console.log("New subscription request:", data);
//   // data = { name: "Ajay", phone: "9876543210", plan: "7 Days Detox Plan" }

//   // Later: save to Google Sheets, Firebase, or send email notification
//   return NextResponse.json({ success: true, plan: data.plan });
// }

import { NextResponse } from "next/server";
import { google } from "googleapis";

// Load credentials from environment variables
const SHEET_ID = process.env.GOOGLE_SHEET_ID as string;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL as string;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n") as string;

export async function POST(request: Request) {
console.log(CLIENT_EMAIL?.slice(0, 40));

  const data = await request.json();
  const { name, phone, address, message, juices, plan } = data;

  try {
    const auth = new google.auth.JWT({
      
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, phone, address, message || "", plan, new Date().toLocaleString()]],
      },
    });

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    console.error("Google Sheets error:", error);
    return NextResponse.json({ success: false, error: "Failed to save subscription" }, { status: 500 });
  }
}