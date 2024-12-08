import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth.tsx";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

const ProfileSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(
    user?.user_metadata?.full_name || "",
  );
  const [avatarUrl, setAvatarUrl] = useState(
    user?.user_metadata?.avatar_url || "",
  );

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          avatar_url: avatarUrl,
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your profile has been updated",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setLoading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      setAvatarUrl(publicUrl);

      toast({
        title: "Success",
        description: "Avatar uploaded successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to upload avatar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile information and manage your account
        </p>
      </div>
      <Separator />

      <div className="space-y-8">
        <div className="space-y-4">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <Label htmlFor="avatar" className="cursor-pointer">
                <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Camera className="h-4 w-4" />
                  <span>Change avatar</span>
                </div>
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Recommended size: 400x400px
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user?.email || ""}
              disabled
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="max-w-md"
              disabled={loading}
            />
          </div>
        </div>

        <Button onClick={handleUpdateProfile} disabled={loading}>
          {loading ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
