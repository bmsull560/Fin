import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { useAuth } from "../auth/auth-provider";
import { Database } from "../supabase/database.types";

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
      // Extract title from URL for now, backend will update it later
      const title = new URL(url).hostname;

      const { data, error } = await supabase
        .from("feeds")
        .insert([
          {
            title,
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

      // Update last_fetched_at timestamp
      const { error: updateError } = await supabase
        .from("feeds")
        .update({
          last_fetched_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) throw updateError;

      // Create a sample article for demo
      const { error: articlesError } = await supabase.from("articles").insert([
        {
          title: "Sample Article",
          url: feed.url,
          author: "Demo Author",
          content: "<p>This is a sample article content.</p>",
          excerpt: "Sample excerpt",
          feed_id: id,
          published_at: new Date().toISOString(),
        },
      ]);

      if (articlesError) throw articlesError;

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
