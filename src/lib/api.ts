import { supabase } from "./supabase";
import { Database } from "./database.types";
import Parser from "rss-parser/dist/rss-parser.min.js";

type Feed = Database["public"]["Tables"]["feeds"]["Row"];
type Article = Database["public"]["Tables"]["articles"]["Row"];
type Folder = Database["public"]["Tables"]["folders"]["Row"];

// Use different CORS proxy based on environment
const corsProxy = import.meta.env.PROD
  ? "https://api.allorigins.win/raw?url="
  : "http://localhost:8080/proxy?url=";

const parser = new Parser({
  customFields: {
    feed: ["subtitle"],
    item: ["content:encoded", "media:content"],
  },
});

// Mock data
const MOCK_FOLDERS = [
  {
    id: "1",
    name: "Tech News",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    feeds: [
      {
        id: "1",
        title: "TechCrunch",
        url: "https://techcrunch.com/feed",
        folder_id: "1",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_fetched_at: new Date().toISOString(),
      },
      {
        id: "2",
        title: "The Verge",
        url: "https://www.theverge.com/rss/index.xml",
        folder_id: "1",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_fetched_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: "2",
    name: "Development",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    feeds: [
      {
        id: "3",
        title: "Dev.to",
        url: "https://dev.to/feed",
        folder_id: "2",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_fetched_at: new Date().toISOString(),
      },
    ],
  },
];

async function fetchAndParseFeed(url: string) {
  // In development or test mode, return mock data if URL is invalid
  if (!import.meta.env.PROD && !url.startsWith("http")) {
    return getMockFeedData();
  }

  try {
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
    // In development, return mock data on error
    if (!import.meta.env.DEV) {
      return getMockFeedData();
    }
    throw error;
  }
}

// Mock data for development
function getMockFeedData() {
  return {
    title: "Mock Feed",
    items: [
      {
        title: "Mock Article 1",
        url: "https://example.com/1",
        author: "Mock Author",
        content: "<p>Mock content</p>",
        excerpt: "Mock excerpt",
        published_at: new Date().toISOString(),
      },
    ],
  };
}

// Folders
export async function getFolders() {
  if (
    import.meta.env.SSR ||
    (import.meta.env.DEV && !import.meta.env.VITE_SUPABASE_URL)
  ) {
    return MOCK_FOLDERS;
  }

  try {
    const { data: folders, error: foldersError } = await supabase
      .from("folders")
      .select("*")
      .order("name");

    if (foldersError) throw foldersError;

    const { data: feeds, error: feedsError } = await supabase
      .from("feeds")
      .select("*");

    if (feedsError) throw feedsError;

    return folders.map((folder) => ({
      ...folder,
      feeds: feeds.filter((feed) => feed.folder_id === folder.id),
    }));
  } catch (error) {
    console.error("Error fetching folders:", error);
    if (import.meta.env.DEV) {
      return MOCK_FOLDERS;
    }
    return [];
  }
}

// Articles
export async function getArticles(feed_id?: string) {
  try {
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
      is_read: article.is_read?.length > 0,
      is_bookmarked: article.is_bookmarked?.length > 0,
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

// Article Reads
export async function markArticleAsRead(article_id: string) {
  try {
    const { error } = await supabase
      .from("article_reads")
      .insert({ article_id });
    if (error) throw error;
  } catch (error) {
    console.error("Error marking article as read:", error);
  }
}

// Bookmarks
export async function toggleBookmark(
  article_id: string,
  is_bookmarked: boolean,
) {
  try {
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
  } catch (error) {
    console.error("Error toggling bookmark:", error);
  }
}

// Feeds
export async function refreshFeed(feed_id: string) {
  if (
    import.meta.env.SSR ||
    (import.meta.env.DEV && !import.meta.env.VITE_SUPABASE_URL)
  ) {
    // Return mock data in design view or development without API
    return {
      id: feed_id,
      title: "Mock Feed",
      url: "https://example.com/feed.xml",
      last_fetched_at: new Date().toISOString(),
    };
  }

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
