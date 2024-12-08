import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/lib/database.types";
import FeaturedFeeds from "./FeaturedFeeds";
import FeedGrid from "./FeedGrid";
import FeedDetails from "./FeedDetails";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

type Feed = Database["public"]["Tables"]["feed_catalog"]["Row"];

const FeedCatalog = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAgency, setSelectedAgency] = useState<string>("");
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);

  useEffect(() => {
    loadFeeds();
  }, [selectedCategory, selectedAgency]);

  const loadFeeds = async () => {
    try {
      setLoading(true);
      let query = supabase.from("feed_catalog").select("*");

      if (selectedCategory) {
        query = query.eq("category", selectedCategory);
      }

      if (selectedAgency) {
        query = query.eq("agency", selectedAgency);
      }

      const { data, error } = await query;
      if (error) throw error;
      setFeeds(data || []);
    } catch (error) {
      console.error("Error loading feeds:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFeeds = feeds.filter((feed) =>
    feed.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const trendingFeeds = feeds
    .sort((a, b) => (b.popularity_score || 0) - (a.popularity_score || 0))
    .slice(0, 5);

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Featured Feeds Carousel */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Trending Feeds</h2>
        <FeaturedFeeds feeds={trendingFeeds} onSelect={setSelectedFeed} />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-end mb-8">
        <div className="flex-1 space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search feeds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Economic">Economic</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Environment">Environment</SelectItem>
              <SelectItem value="Justice">Justice</SelectItem>
              <SelectItem value="Safety">Safety</SelectItem>
              <SelectItem value="Infrastructure">Infrastructure</SelectItem>
              <SelectItem value="Transparency">Transparency</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Global">Global</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedAgency} onValueChange={setSelectedAgency}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Agency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Agencies</SelectItem>
              <SelectItem value="Department of the Treasury">
                Department of the Treasury
              </SelectItem>
              <SelectItem value="Department of Health and Human Services">
                Department of Health and Human Services
              </SelectItem>
              {/* Add other agencies */}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Feed Grid */}
      <FeedGrid
        feeds={filteredFeeds}
        loading={loading}
        onSelect={setSelectedFeed}
      />

      {/* Feed Details Sheet */}
      <FeedDetails feed={selectedFeed} onClose={() => setSelectedFeed(null)} />
    </div>
  );
};

export default FeedCatalog;
