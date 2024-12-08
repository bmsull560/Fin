import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, Menu, User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth.tsx";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              RSS Reader
            </h1>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6">
                <li
                  className="text-sm font-medium hover:text-primary cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Home
                </li>
                <li
                  className="text-sm font-medium hover:text-primary cursor-pointer"
                  onClick={() => navigate("/discover")}
                >
                  Discover
                </li>
              </ul>
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.user_metadata?.avatar_url}
                        alt={user.email || ""}
                      />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/settings?tab=billing")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Billing & Subscription</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className="gap-2" onClick={() => navigate("/login")}>
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col h-full">
                <div className="flex-1 py-4">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Menu</h2>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate("/");
                        setIsOpen(false);
                      }}
                    >
                      Home
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate("/discover");
                        setIsOpen(false);
                      }}
                    >
                      Discover
                    </Button>
                  </div>
                </div>

                {/* Mobile User Actions */}
                <div className="border-t py-4">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 px-4">
                        <Avatar>
                          <AvatarImage
                            src={user.user_metadata?.avatar_url}
                            alt={user.email || ""}
                          />
                          <AvatarFallback>{getUserInitials()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            navigate("/settings");
                            setIsOpen(false);
                          }}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            navigate("/settings?tab=billing");
                            setIsOpen(false);
                          }}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Billing & Subscription
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
                          onClick={() => {
                            handleSignOut();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => {
                        navigate("/login");
                        setIsOpen(false);
                      }}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
