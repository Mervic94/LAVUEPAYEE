
import React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ThemeToggle({ variant = "dropdown" }: { variant?: "dropdown" | "toggle" }) {
  const { theme, setTheme } = useTheme();

  if (variant === "toggle") {
    return (
      <ToggleGroup type="single" value={theme} onValueChange={(value) => {
        if (value === "light" || value === "dark" || value === "system") {
          setTheme(value);
        }
      }}>
        <ToggleGroupItem value="light" aria-label="Mode clair">
          <Sun className="h-4 w-4" />
          <span className="sr-only">Mode clair</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Mode sombre">
          <Moon className="h-4 w-4" />
          <span className="sr-only">Mode sombre</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="system" aria-label="Mode système">
          <Laptop className="h-4 w-4" />
          <span className="sr-only">Mode système</span>
        </ToggleGroupItem>
      </ToggleGroup>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Clair</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Sombre</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="mr-2 h-4 w-4" />
          <span>Système</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
