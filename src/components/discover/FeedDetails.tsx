import React, { useEffect, useState } from "react";
import { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth.tsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLink, Rss } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Feed = Database["public"]["Tables"]["feed_catalog"]["Row"];
type Subscription =
  Database["public"]["Tables"]["user_feed_subscriptions"]["Row"];

interface FeedDetailsProps {
  feed: Feed | null;
  onClose: () => void;
}

const FeedDetails = ({ feed, onClose }: FeedDetailsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationFrequency, setNotificationFrequency] = useState("daily");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (feed && user) {
      loadSubscription();
    }
  }, [feed, user]);

  const loadSubscription = async () => {
    if (!user || !feed) return;

    try {
      const { data, error } = await supabase
        .from("user_feed_subscriptions")
        .select("*")
        .eq("feed_id", feed.id)
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setSubscription(data);
        setNotificationsEnabled(data.notification_enabled);
        setNotificationFrequency(data.notification_frequency);
      } else {
        setSubscription(null);
        setNotificationsEnabled(true);
        setNotificationFrequency("daily");
      }
    } catch (error) {
      console.error("Error loading subscription:", error);
    }
  };

  const handleSubscribe = async () => {
    if (!user || !feed) return;

    try {
      setLoading(true);
      const { error } = await supabase.from("user_feed_subscriptions").insert({
        feed_id: feed.id,
        user_id: user.id,
        notification_enabled: notificationsEnabled,
        notification_frequency: notificationFrequency,
      });
      if (error) throw error;

      await loadSubscription();
      toast({
        title: "Subscribed!",
        description: "You'll now receive updates from this feed",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to subscribe to feed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!user || !feed) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from("user_feed_subscriptions")
        .delete()
        .eq("feed_id", feed.id)
        .eq("user_id", user.id);
      if (error) throw error;

      setSubscription(null);
      toast({
        title: "Unsubscribed",
        description: "You've been unsubscribed from this feed",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to unsubscribe from feed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNotifications = async (enabled: boolean) => {
    if (!user || !feed) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from("user_feed_subscriptions")
        .update({ notification_enabled: enabled })
        .eq("feed_id", feed.id)
        .eq("user_id", user.id);
      if (error) throw error;

      setNotificationsEnabled(enabled);
      toast({
        title: enabled ? "Notifications enabled" : "Notifications disabled",
        description: enabled
          ? "You'll receive updates from this feed"
          : "You won't receive updates from this feed",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update notification settings",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFrequency = async (frequency: string) => {
    if (!user || !feed) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from("user_feed_subscriptions")
        .update({ notification_frequency: frequency })
        .eq("feed_id", feed.id)
        .eq("user_id", user.id);
      if (error) throw error;

      setNotificationFrequency(frequency);
      toast({
        title: "Frequency updated",
        description: `You'll now receive updates ${frequency}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update notification frequency",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={!!feed} onOpenChange={() => onClose()}>
      <SheetContent className="sm:max-w-xl w-full">
        {feed && (
          <div className="space-y-6">
            <SheetHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={feed.logo_url || ""} alt={feed.title} />
                  <AvatarFallback>{feed.title[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <SheetTitle>{feed.title}</SheetTitle>
                  <SheetDescription>{feed.description}</SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{feed.category}</Badge>
              {feed.agency && <Badge variant="outline">{feed.agency}</Badge>}
              {feed.tags?.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4">
              {subscription ? (
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={handleUnsubscribe}
                  disabled={loading}
                >
                  <Rss className="mr-2 h-4 w-4" /> Unsubscribe
                </Button>
              ) : (
                <Button
                  className="flex-1"
                  onClick={handleSubscribe}
                  disabled={loading}
                >
                  <Rss className="mr-2 h-4 w-4" /> Subscribe
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => window.open(feed.url, "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" /> Visit Source
              </Button>
            </div>

            <Separator />

            {subscription && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Notification Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates when new articles are published
                        </p>
                      </div>
                      <Switch
                        checked={notificationsEnabled}
                        onCheckedChange={handleUpdateNotifications}
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Notification Frequency</Label>
                      <Select
                        value={notificationFrequency}
                        onValueChange={handleUpdateFrequency}
                        disabled={loading || !notificationsEnabled}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Digest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Feed Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Last Updated
                      </span>
                      <span>
                        {feed.last_updated
                          ? new Date(feed.last_updated).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format</span>
                      <span>RSS 2.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Language</span>
                      <span>English</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default FeedDetails;
