import { getData } from "../actions/server";
import GuestDashboard from "./GuestDashboard";

export default async function Page() {
  const posts = await getData();
  const normalizedPosts = posts.map((post) => ({
    ...post,
    isPinned: post.isPinned ?? false,
  }));

  return <GuestDashboard initialPosts={normalizedPosts} />;
}
