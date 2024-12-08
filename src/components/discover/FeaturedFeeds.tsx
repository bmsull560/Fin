import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/lib/database.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Feed = Database["public"]["Tables"]["feed_catalog"]["Row"];

interface FeaturedFeedsProps {
  feeds: Feed[];
  onSelect: (feed: Feed) => void;
}

const FeaturedFeeds = ({ feeds, onSelect }: FeaturedFeedsProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {feeds.map((feed) => (
          <CarouselItem key={feed.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card
                className="p-6 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => onSelect(feed)}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={feed.logo_url || ""} alt={feed.title} />
                    <AvatarFallback>{feed.title[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 flex-1">
                    <div className="space-y-1">
                      <h3 className="font-semibold leading-none">
                        {feed.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {feed.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{feed.category}</Badge>
                      {feed.agency && (
                        <Badge variant="outline">{feed.agency}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default FeaturedFeeds;
