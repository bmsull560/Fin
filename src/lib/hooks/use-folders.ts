import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { useAuth } from "../auth/auth-provider";
import { Database } from "../supabase/database.types";

type Folder = Database["public"]["Tables"]["folders"]["Row"];

export function useFolders() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: folders = [], isLoading } = useQuery<Folder[]>({
    queryKey: ["folders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("folders")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createFolder = useMutation({
    mutationFn: async (name: string) => {
      const { data, error } = await supabase
        .from("folders")
        .insert([{ name, user_id: user!.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const updateFolder = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { data, error } = await supabase
        .from("folders")
        .update({ name })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const deleteFolder = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("folders").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  return {
    folders,
    isLoading,
    createFolder,
    updateFolder,
    deleteFolder,
  };
}
