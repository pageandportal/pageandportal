/** Shared developer blurb — sync with supply/site/about.md when owner supplies copy. */
export const ABOUT = {
  headline: "Developer and creator behind Page & Portal" as string | null,
  bio: "I'm James, the developer and creator behind Page & Portal. Based in the Nelson region, I focus on building clean, purposeful digital tools that bridge the gap between practical utility and engaging experiences.\n\nMy work spans a diverse range of digital spaces, from community-minded educational tools for families to streamlined resources for hobbyists and gamers. Whether designing interactive learning aids or specialized tracking apps, my goal is always the same: to deliver high-quality, distraction-free digital experiences that solve real-world problems. Under the Page & Portal banner, I build software that is intuitive, reliable, and designed to bring value to everyday life." as string | null,
  displayName: "James" as string | null,
  avatar: "brand/avatar.png" as string | null,
} as const;

export function hasAboutContent(): boolean {
  return Boolean(ABOUT.headline || ABOUT.bio || ABOUT.displayName || ABOUT.avatar);
}
