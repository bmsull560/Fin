import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Loading..." }: LoadingScreenProps) => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
