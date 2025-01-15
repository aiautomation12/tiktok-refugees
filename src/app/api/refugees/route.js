// app/api/refugees/route.js
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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    await connectDB();

    let query = {};
    
    if (search) {
      query = {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { tiktokUsername: { $regex: search, $options: 'i' } },
          { instagramUsername: { $regex: search, $options: 'i' } },
          { redNoteUsername: { $regex: search, $options: 'i' } },
          { snapchatUsername: { $regex: search, $options: 'i' } },
          { flipUsername: { $regex: search, $options: 'i' } },
          { linkedinBio: { $regex: search, $options: 'i' } },
          { knownFor_1: { $regex: search, $options: 'i' } },
          { knownFor_2: { $regex: search, $options: 'i' } },
          { knownFor_3: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const totalCount = await Refugee.countDocuments(query);
    const refugees = await Refugee.find(query)
      .populate('user', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      refugees,
      hasMore: skip + refugees.length < totalCount,
      total: totalCount
    });
  } catch (error) {
    console.error("Error fetching refugees:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}