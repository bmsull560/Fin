import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { useAuth } from "../auth/auth-provider";
import { Database } from "../supabase/database.types";

// Import the ESM version and configure without event emitter
let Parser: any;

// Use dynamic import to avoid SSR issues
if (typeof window !== "undefined") {
  import("rss-parser/dist/rss-parser.min.js").then((module) => {
    Parser = module.default;
  });
}

type Feed = Database["public"]["Tables"]["feeds"]["Row"];

export function useFeeds(folderId?: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: feeds = [], isLoading } = useQuery<Feed[]>({
    queryKey: ["feeds", folderId],
    queryFn: async () => {
      let query = supabase.from("feeds").select("*");

      if (folderId) {
        query = query.eq("folder_id", folderId);
      }

      const { data, error } = await query.order("title");
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createFeed = useMutation({
    mutationFn: async ({
      url,
      folderId,
    }: {
      url: string;
      folderId?: string;
    }) => {
      // First fetch and parse the feed
      const parser = new Parser({
        customFields: {
          feed: ["subtitle"],
          item: ["content:encoded", "media:content"],
        },
      });

      const feed = await parser.parseURL(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
      );

      const { data, error } = await supabase
        .from("feeds")
        .insert([
          {
            title: feed.title || url,
            url,
            folder_id: folderId,
            user_id: user!.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
  });

  const updateFeed = useMutation({
    mutationFn: async ({
      id,
      title,
      folderId,
    }: {
      id: string;
      title: string;
      folderId?: string;
    }) => {
      const { data, error } = await supabase
        .from("feeds")
        .update({ title, folder_id: folderId })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
  });

  const deleteFeed = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("feeds").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
  });

  const refreshFeed = useMutation({
    mutationFn: async (id: string) => {
      // Get the feed
      const { data: feed, error: feedError } = await supabase
        .from("feeds")
        .select("*")
        .eq("id", id)
        .single();

      if (feedError) throw feedError;

      // Create a new parser instance for each refresh
      const parser = new Parser({
        customFields: {
          feed: ["subtitle"],
          item: ["content:encoded", "media:content"],
        },
      });

      // Fetch and parse the feed
      const parsedFeed = await parser.parseURL(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(feed.url)}`,
      );

      // Update the feed title and last_fetched_at
      const { error: updateError } = await supabase
        .from("feeds")
        .update({
          title: parsedFeed.title || feed.url,
          last_fetched_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) throw updateError;

      // Insert new articles
      if (parsedFeed.items.length > 0) {
        const articles = parsedFeed.items.map((item: any) => ({
          title: item.title || "Untitled",
          url: item.link || "",
          author: item.creator || item.author || "",
          content: item.content || item["content:encoded"] || "",
          excerpt: item.contentSnippet || "",
          feed_id: id,
          published_at: item.pubDate
            ? new Date(item.pubDate).toISOString()
            : new Date().toISOString(),
        }));

        const { error: articlesError } = await supabase
          .from("articles")
          .insert(articles);

        if (articlesError) throw articlesError;
      }

      return feed;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  return {
    feeds,
    isLoading,
    createFeed,
    updateFeed,
    deleteFeed,
    refreshFeed,
  };
}
