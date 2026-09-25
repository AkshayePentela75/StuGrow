/**
 * ============================================================================
 * SOCIAL PAGE CONTENT  (/social)
 * ----------------------------------------------------------------------------
 * Profile links live in content/site.ts (`socials`).
 * This file holds the featured video and the recent-posts grid.
 * ============================================================================
 */
import type { SocialPost } from "./types";

/**
 * Featured YouTube video.
 * `id` is the part after "v=" in a YouTube URL:
 *   https://www.youtube.com/watch?v=dQw4w9WgXcQ  ->  "dQw4w9WgXcQ"
 * Shorts work too: https://youtube.com/shorts/ABC123 -> "ABC123"
 * While it starts with TODO_, the page shows a designed "coming soon" frame.
 */
export const latestVideo = {
  id: "TODO_LATEST_YOUTUBE_VIDEO_ID",
  title: "TODO_LATEST_VIDEO_TITLE",
  /** One or two sentences about the video. */
  description: "TODO_LATEST_VIDEO_DESCRIPTION",
};

/**
 * Recent posts across platforms. SAMPLE ENTRIES — replace with real links.
 * Newest first. 6–9 items look best. `kind: "short"` renders a tall 9:16 tile.
 */
export const recentPosts: { isSample: boolean; posts: SocialPost[] } = {
  isSample: true,
  posts: [
    {
      platform: "tiktok",
      kind: "short",
      title: "What actually happens when the Fed cuts rates",
      url: "TODO_POST_URL_1",
      date: "2026-09-18",
    },
    {
      platform: "youtube",
      kind: "video",
      title: "Index funds vs. picking stocks: our honest take",
      url: "TODO_POST_URL_2",
      date: "2026-09-12",
    },
    {
      platform: "instagram",
      kind: "post",
      title: "Compound interest in five slides",
      url: "TODO_POST_URL_3",
      date: "2026-09-09",
    },
    {
      platform: "tiktok",
      kind: "short",
      title: "Your first paycheck: where the money goes",
      url: "TODO_POST_URL_4",
      date: "2026-09-04",
    },
    {
      platform: "instagram",
      kind: "post",
      title: "Debit vs. credit, explained with pizza",
      url: "TODO_POST_URL_5",
      date: "2026-08-29",
    },
    {
      platform: "youtube",
      kind: "video",
      title: "Portfolio update: why we trimmed one position",
      url: "TODO_POST_URL_6",
      date: "2026-08-22",
    },
  ],
};
