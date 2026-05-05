import { NextResponse } from "next/server";
import { google } from "googleapis";

// Load credentials from environment variables
const SHEET_ID = process.env.GOOGLE_SHEET_ID_ORDERS as string;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL as string;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n") as string;

export async function POST(request: Request) {
  console.log(CLIENT_EMAIL?.slice(0, 40));

  const data = await request.json();
  const { fullName, email, phone, address, city, state, pincode, items, totalPrice, tax, grandTotal, paymentMethod } = data;

  try {
    const auth = new google.auth.JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Format items as "ProductName (Qty: X) × Quantity"
    const itemsFormatted = items
      .map((item: { name: string; quantity: number }) => `${item.name} (${item.quantity})`)
      .join(", ");

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:O",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            fullName,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            itemsFormatted,
            items.length, // Number of different products
            items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0), // Total quantity
            totalPrice,
            tax,
            grandTotal,
            paymentMethod,
            new Date().toLocaleString(),
          ],
        ],
      },
    });

    return NextResponse.json({ success: true, orderId: `ORD-${Date.now()}` });
  } catch (error) {
    console.error("Google Sheets error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save order" },
      { status: 500 }
    );
  }
}
