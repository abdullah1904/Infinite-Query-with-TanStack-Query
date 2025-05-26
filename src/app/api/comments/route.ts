import { myOrm } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Comment } from "./data";
import { getCurrentUser } from "@/lib/auth";

export type GetCommentsResponse = {
    comments: Comment[];
    nextCursor?: number;
}

export type CreateCommentResponse = {
    comment: Comment;
}

export const GET = async (request: NextRequest) => {
    const cursorParam = request.nextUrl.searchParams.get("cursor");
    const cursor = cursorParam ? parseInt(cursorParam) : undefined;
    const pageSize = 10;
    const delay = Math.floor(Math.random() * 700) + 300;
    await new Promise((resolve) => setTimeout(resolve, delay));
    const comments = await myOrm.findComments({
        take: pageSize + 1,
        cursor: cursor ? { id: cursor } : undefined,
        sort: "desc",
    });
    const nextCursor = comments.length > pageSize ? comments[pageSize]?.id : undefined;
    const response: GetCommentsResponse = {
        comments: comments.slice(0, pageSize),
        nextCursor,
    }
    return NextResponse.json(response);
}

export const POST = async (request: NextRequest) => {
    const { text } = await request.json();
    if (!text) {
        return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    const delay = Math.floor(Math.random() * 700) + 300;
    await new Promise((resolve) => setTimeout(resolve, delay));
    const currentUser = await getCurrentUser();
    const newComment = await myOrm.createComment({ text, user: currentUser });
    const response: CreateCommentResponse = {
        comment: newComment,
    }
    return NextResponse.json(response, { status: 201 });
}