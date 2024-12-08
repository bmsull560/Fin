import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { useAuth } from "../auth/auth-provider";
import { Database } from "../supabase/database.types";

type ArticleRow = Database["public"]["Tables"]["articles"]["Row"];
type FeedRow = Database["public"]["Tables"]["feeds"]["Row"];

export interface Article extends ArticleRow {
  feed?: FeedRow;
  is_read?: boolean;
  is_bookmarked?: boolean;
}

type ArticleResponse = ArticleRow & {
  feed: FeedRow[];
  is_read: { id: string }[];
  is_bookmarked: { id: string }[];
};

export function useArticles(feedId?: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: articles = [], isLoading } = useQuery<Article[], Error>({
    queryKey: ["articles", feedId],
    queryFn: async () => {
      let query = supabase
        .from("articles")
        .select(
          "*, feed:feeds(*), is_read:article_reads(*), is_bookmarked:bookmarks(*)",
        )
        .order("published_at", { ascending: false });

      if (feedId) {
        query = query.eq("feed_id", feedId);
      }

      const { data, error } = await query;
      if (error) throw error;

      if (!data) return [];

      return (data as ArticleResponse[]).map((article) => ({
        ...article,
        feed: article.feed?.[0],
        is_read: article.is_read?.length > 0,
        is_bookmarked: article.is_bookmarked?.length > 0,
      }));
    },
    enabled: !!user,
  });

  const markAsRead = useMutation<void, Error, string>({
    mutationFn: async (articleId: string) => {
      const { error } = await supabase
        .from("article_reads")
        .insert([{ article_id: articleId, user_id: user!.id }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const toggleBookmark = useMutation<
    void,
    Error,
    { articleId: string; isBookmarked: boolean }
  >({
    mutationFn: async ({ articleId, isBookmarked }) => {
      if (isBookmarked) {
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("article_id", articleId)
          .eq("user_id", user!.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("bookmarks")
          .insert([{ article_id: articleId, user_id: user!.id }]);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  return {
    articles,
    isLoading,
    markAsRead,
    toggleBookmark,
  };
}
