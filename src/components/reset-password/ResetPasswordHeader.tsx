
import React from "react";

interface ResetPasswordHeaderProps {
  stage: "request" | "reset";
}

const ResetPasswordHeader: React.FC<ResetPasswordHeaderProps> = ({ stage }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">
        {stage === "request" 
          ? "Réinitialiser votre mot de passe" 
          : "Créer un nouveau mot de passe"}
      </h1>
      <p className="text-muted-foreground mt-2">
        {stage === "request"
          ? "Entrez votre adresse email pour recevoir un lien de réinitialisation"
          : "Veuillez entrer votre nouveau mot de passe"}
      </p>
    </div>
  );
};

export default ResetPasswordHeader;
