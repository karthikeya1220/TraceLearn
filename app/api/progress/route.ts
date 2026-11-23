import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import { getLearnerProgress, saveLearnerProgress } from "@/lib/progress";

export const runtime = "nodejs";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ completedLessons: [], lastPlayedLesson: null });
  }

  const progress = await getLearnerProgress();
  return NextResponse.json(progress);
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = await saveLearnerProgress({
      toggleLesson: typeof body.toggleLesson === "string" ? body.toggleLesson : undefined,
      completedLessons: Array.isArray(body.completedLessons) ? body.completedLessons : undefined,
      lastPlayedLesson:
        body.lastPlayedLesson && typeof body.lastPlayedLesson.lessonSlug === "string"
          ? {
              lessonSlug: body.lastPlayedLesson.lessonSlug,
              courseSlug: body.lastPlayedLesson.courseSlug,
              timestamp: Number(body.lastPlayedLesson.timestamp) || 0,
            }
          : undefined,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update progress" },
      { status: 500 },
    );
  }
}
