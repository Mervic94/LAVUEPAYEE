
import React, { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import "../../styles/animated-backgrounds.css";

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
}

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show animation after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      <div className={`app-background ${theme}`} aria-hidden="true" />
      {children}
    </>
  );
}
