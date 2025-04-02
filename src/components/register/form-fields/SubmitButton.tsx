
import React from "react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg mobile-full-width" size="lg" disabled={isSubmitting}>
      {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
    </Button>
  );
};

export default SubmitButton;
