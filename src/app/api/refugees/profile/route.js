// app/api/refugees/profile/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Refugee from "@/models/Refugee";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";

export async function GET(req) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    const refugee = await Refugee.findOne({ user: user._id });

    return NextResponse.json(refugee || null);
  } catch (error) {
    console.error("Error fetching refugee profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    const formData = await req.json();
    
    const refugee = await Refugee.findOneAndUpdate(
      { user: user._id },
      { ...formData },
      { new: true }
    );

    return NextResponse.json(refugee);
  } catch (error) {
    console.error("Error updating refugee profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}