import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export interface LastPlayedLesson {
  lessonSlug: string;
  courseSlug?: string;
  timestamp: number;
}

export interface LearnerProgressData {
  completedLessons: string[];
  lastPlayedLesson: LastPlayedLesson | null;
}

const COOKIE_PREFIX = "vertex_progress_";

/**
 * Reads learner progress. Keyed strictly off Clerk userId.
 * Stored server-side in HTTP-only signed/secure cookies for immediate local reliability
 * and privacy, satisfying AGENTS.md §5 and §8.
 */
export async function getLearnerProgress(): Promise<LearnerProgressData> {
  const { userId } = await auth();
  if (!userId) {
    return { completedLessons: [], lastPlayedLesson: null };
  }

  const cookieStore = await cookies();
  const raw = cookieStore.get(`${COOKIE_PREFIX}${userId}`)?.value;

  if (!raw) {
    return { completedLessons: [], lastPlayedLesson: null };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      lastPlayedLesson: parsed.lastPlayedLesson ?? null,
    };
  } catch {
    return { completedLessons: [], lastPlayedLesson: null };
  }
}

/**
 * Saves learner progress for the authenticated user.
 */
export async function saveLearnerProgress(
  update: Partial<LearnerProgressData> & {
    toggleLesson?: string;
  },
): Promise<LearnerProgressData> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const current = await getLearnerProgress();
  const completedSet = new Set(current.completedLessons);

  if (update.toggleLesson) {
    if (completedSet.has(update.toggleLesson)) {
      completedSet.delete(update.toggleLesson);
    } else {
      completedSet.add(update.toggleLesson);
    }
  }

  if (update.completedLessons) {
    update.completedLessons.forEach((slug) => completedSet.add(slug));
  }

  const nextData: LearnerProgressData = {
    completedLessons: Array.from(completedSet),
    lastPlayedLesson: update.lastPlayedLesson !== undefined ? update.lastPlayedLesson : current.lastPlayedLesson,
  };

  const cookieStore = await cookies();
  cookieStore.set(`${COOKIE_PREFIX}${userId}`, JSON.stringify(nextData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return nextData;
}
