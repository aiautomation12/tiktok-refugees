import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Refugee from "@/models/Refugee";
import { getServerSession } from "next-auth/next";
import User from "@/models/User";

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    
    const data = await req.json();
    data.user = user._id;
    
    const refugee = await Refugee.create(data);
    return NextResponse.json(refugee);
  } catch (error) {
    console.error("Error creating refugee:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const refugees = await Refugee.find().populate('user', 'name email');
    return NextResponse.json(refugees);
  } catch (error) {
    console.error("Error fetching refugees:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}