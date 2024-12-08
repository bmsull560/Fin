import React from "react";
import { Button } from "@/components/ui/button";
import { Download, LogIn, ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const topics = [
  "Economic",
  "Healthcare",
  "Education",
  "Environment",
  "Justice",
  "Safety",
  "Infrastructure",
  "Transparency",
  "Technology",
  "Global",
];

const agencies = [
  "Department of the Treasury",
  "Department of Health and Human Services",
  "Department of Education",
  "Department of Labor",
  "Department of Housing and Urban Development",
  "Department of Transportation",
  "Department of Agriculture",
  "Department of Justice",
  "Environmental Protection Agency",
  "Department of Homeland Security",
  "Department of Energy",
  "Department of the Interior",
  "Department of Commerce",
  "Department of Veterans Affairs",
  "Department of State",
];

const discover = ["Trending", "Recommended", "Popular", "New Release"];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold">Raise</h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6">
                <li className="text-sm font-medium hover:text-primary cursor-pointer">
                  Home
                </li>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary">
                      Discover
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px]">
                      {discover.map((item) => (
                        <DropdownMenuItem
                          key={item}
                          className="cursor-pointer"
                          onClick={() =>
                            console.log(`Selected discover: ${item}`)
                          }
                        >
                          {item}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary">
                      Topics
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[300px]">
                      {topics.map((topic) => (
                        <DropdownMenuItem
                          key={topic}
                          className="cursor-pointer"
                          onClick={() =>
                            console.log(`Selected topic: ${topic}`)
                          }
                        >
                          {topic}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary">
                      Agencies
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[400px]">
                      {agencies.map((agency) => (
                        <DropdownMenuItem
                          key={agency}
                          className="cursor-pointer"
                          onClick={() =>
                            console.log(`Selected agency: ${agency}`)
                          }
                        >
                          {agency}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
                <li className="text-sm font-medium hover:text-primary cursor-pointer">
                  Tags
                </li>
              </ul>
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download the App
            </Button>
            <Button className="gap-2">
              <LogIn className="h-4 w-4" />
              Sign Up/Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => console.log("Open mobile menu")}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
