import { axiosClient } from "@/lib/axiosClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await axiosClient.get("/categories?populate=*");
    return NextResponse.json(result.data);
  } catch (error: any) {
    console.error("Error fetching categories:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: error?.response?.status || 500 }
    );
  }
}
