import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const reqBody = await request.json();
  const { _id, email, name, comment, imageUrl } = await reqBody;
  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
      imageUrl,
    });
  } catch (error) {
    console.error("Comment submit Error:", error);
    return NextResponse.json({
      success: false,
      message: "Comment submitting error",
    });
  }
  return NextResponse.json({
    success: true,
    message: "Comment submitted successfully!",
  });
};
