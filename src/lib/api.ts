import { supabase } from "./supabase";
import { Database } from "./database.types";
import Parser from "rss-parser/dist/rss-parser.min.js";

type Feed = Database["public"]["Tables"]["feeds"]["Row"];
type Folder = Database["public"]["Tables"]["folders"]["Row"];
type Article = Database["public"]["Tables"]["articles"]["Row"];
type ArticleRead = Database["public"]["Tables"]["article_reads"]["Row"];
type Bookmark = Database["public"]["Tables"]["bookmarks"]["Row"];

const parser = new Parser({
  customFields: {
    feed: ["subtitle"],
    item: ["content:encoded", "media:content"],
  },
});

async function fetchAndParseFeed(url: string) {
  try {
    const corsProxy = "https://api.allorigins.win/raw?url=";
    const feed = await parser.parseURL(corsProxy + encodeURIComponent(url));
    return {
      title: feed.title || url,
      items: feed.items.map((item) => ({
        title: item.title || "Untitled",
        url: item.link || "",
        author: item.creator || item.author || "",
        content: item.content || item["content:encoded"] || "",
        excerpt: item.contentSnippet || "",
        published_at: item.pubDate
          ? new Date(item.pubDate).toISOString()
          : new Date().toISOString(),
      })),
    };
  } catch (error) {
    console.error("Error parsing feed:", error);
    throw error;
  }
}

// Folders
export async function getFolders() {
  const { data, error } = await supabase
    .from("folders")
    .select("*, feeds(*)")
    .order("name");
  if (error) throw error;
  return data;
}

export async function createFolder(name: string) {
  const { data, error } = await supabase
    .from("folders")
    .insert({ name })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Feeds
export async function getFeeds() {
  const { data, error } = await supabase
    .from("feeds")
    .select("*, folder:folders(*)")
    .order("title");
  if (error) throw error;
  return data;
}

export async function refreshFeed(feed_id: string) {
  try {
    // Get the feed
    const { data: feed, error: feedError } = await supabase
      .from("feeds")
      .select("*")
      .eq("id", feed_id)
      .single();
    if (feedError) throw feedError;

    // Fetch and parse the feed
    const feedData = await fetchAndParseFeed(feed.url);

    // Update the feed title and last_fetched_at
    const { error: updateError } = await supabase
      .from("feeds")
      .update({
        title: feedData.title,
        last_fetched_at: new Date().toISOString(),
      })
      .eq("id", feed_id);
    if (updateError) throw updateError;

    // Insert new articles
    if (feedData.items.length > 0) {
      const articles = feedData.items.map((item) => ({
        ...item,
        feed_id,
      }));
      const { error: articlesError } = await supabase
        .from("articles")
        .insert(articles);
      if (articlesError) throw articlesError;
    }

    return feed;
  } catch (error) {
    console.error("Error refreshing feed:", error);
    throw error;
  }
}

export async function createFeed({
  title,
  url,
  folder_id,
}: {
  title: string;
  url: string;
  folder_id?: string;
}) {
  try {
    // First fetch and parse the feed
    const feedData = await fetchAndParseFeed(url);

    // Create the feed
    const { data: feed, error: feedError } = await supabase
      .from("feeds")
      .insert({ title: feedData.title, url, folder_id })
      .select()
      .single();
    if (feedError) throw feedError;

    // Insert the articles
    if (feedData.items.length > 0) {
      const articles = feedData.items.map((item) => ({
        ...item,
        feed_id: feed.id,
      }));

      const { error: articlesError } = await supabase
        .from("articles")
        .insert(articles);
      if (articlesError) throw articlesError;
    }

    return feed;
  } catch (error) {
    console.error("Error creating feed:", error);
    throw error;
  }
}

// Articles
export async function getArticles(feed_id?: string) {
  let query = supabase
    .from("articles")
    .select(
      "*, feed:feeds(*), is_read:article_reads(*), is_bookmarked:bookmarks(*)",
    )
    .order("published_at", { ascending: false });

  if (feed_id) {
    query = query.eq("feed_id", feed_id);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data.map((article) => ({
    ...article,
    is_read: article.is_read.length > 0,
    is_bookmarked: article.is_bookmarked.length > 0,
  }));
}

// Article Reads
export async function markArticleAsRead(article_id: string) {
  const { error } = await supabase.from("article_reads").insert({ article_id });
  if (error) throw error;
}

// Bookmarks
export async function toggleBookmark(
  article_id: string,
  is_bookmarked: boolean,
) {
  if (is_bookmarked) {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("article_id", article_id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("bookmarks").insert({ article_id });
    if (error) throw error;
  }
}
