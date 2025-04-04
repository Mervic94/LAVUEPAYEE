
import React from 'react';
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const LoginFooter: React.FC = () => {
  return (
    <>
      <Separator className="my-6" />
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Vous n'avez pas de compte?{" "}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginFooter;
