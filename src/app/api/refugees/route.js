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

    const formData = await req.json();
    const refugee = await Refugee.create({
      ...formData,
      user: user._id
    });

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
    const nameSearch = searchParams.get("nameSearch") || "";
    const socialSearch = searchParams.get("socialSearch") || "";
    const categorySearch = searchParams.get("categorySearch") || "";
    const skip = (page - 1) * limit;

    await connectDB();

    let query = { $and: [] };
    
    if (nameSearch) {
      query.$and.push({
        $or: [
          { firstName: { $regex: nameSearch, $options: 'i' } },
          { lastName: { $regex: nameSearch, $options: 'i' } }
        ]
      });
    }

    if (socialSearch) {
      query.$and.push({
        $or: [
          { youtubeUsername: { $regex: socialSearch, $options: 'i' } },
          { tiktokUsername: { $regex: socialSearch, $options: 'i' } },
          { instagramUsername: { $regex: socialSearch, $options: 'i' } },
          { redNoteUsername: { $regex: socialSearch, $options: 'i' } },
          { snapchatUsername: { $regex: socialSearch, $options: 'i' } },
          { flipUsername: { $regex: socialSearch, $options: 'i' } }
        ]
      });
    }

    if (categorySearch) {
      query.$and.push({
        $or: [
          { knownFor_1: { $regex: categorySearch, $options: 'i' } },
          { knownFor_2: { $regex: categorySearch, $options: 'i' } },
          { knownFor_3: { $regex: categorySearch, $options: 'i' } }
        ]
      });
    }

    // If no search parameters, remove the $and operator
    if (query.$and.length === 0) {
      query = {};
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