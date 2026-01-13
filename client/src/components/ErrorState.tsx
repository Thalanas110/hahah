import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = "Something went wrong" }: ErrorStateProps) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-red-300">
      <div className="bg-red-900/20 p-4 rounded-full mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <p className="font-display text-xl mb-2">Error Loading Content</p>
      <p className="font-sans text-sm opacity-70">{message}</p>
    </div>
  );
}
