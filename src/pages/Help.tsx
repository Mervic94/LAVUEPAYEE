import React from "react";
import { Link } from "react-router-dom";
import { Wrench, MessageCircle, Book, PhoneCall, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Help = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Comment pouvons-nous vous aider ?</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Troubleshooting Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Wrench className="w-6 h-6 mr-2 text-primary" />
            <h2 className="text-xl font-semibold">Dépannage</h2>
          </div>
          <p className="text-gray-600 mb-4">Résolvez les problèmes courants et apprenez à utiliser notre plateforme efficacement.</p>
          <Button asChild variant="outline">
            <Link to="/faq">Consulter le dépannage</Link>
          </Button>
        </div>

        {/* Contact Support Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <MessageCircle className="w-6 h-6 mr-2 text-primary" />
            <h2 className="text-xl font-semibold">Contacter le support</h2>
          </div>
          <p className="text-gray-600 mb-4">Besoin d'une aide personnalisée ? Contactez notre équipe de support dédiée.</p>
          <Button asChild variant="outline">
            <Link to="/messages">Envoyer un message</Link>
          </Button>
        </div>

        {/* Knowledge Base Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Book className="w-6 h-6 mr-2 text-primary" />
            <h2 className="text-xl font-semibold">Base de connaissances</h2>
          </div>
          <p className="text-gray-600 mb-4">Explorez notre base de connaissances pour des guides détaillés et des informations utiles.</p>
          <Button asChild variant="outline">
            <Link to="/faq">Explorer la base de connaissances</Link>
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Book className="w-6 h-6 mr-2 text-primary" />
            <h2 className="text-xl font-semibold">FAQ</h2>
          </div>
          <p className="text-gray-600 mb-4">Trouvez rapidement des réponses aux questions fréquemment posées.</p>
          <Button asChild variant="outline">
            <Link to="/faq">Consulter la FAQ</Link>
          </Button>
        </div>

        {/* Phone Support Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <PhoneCall className="w-6 h-6 mr-2 text-primary" />
            <h2 className="text-xl font-semibold">Support téléphonique</h2>
          </div>
          <p className="text-gray-600 mb-4">Parlez directement à un agent pour une assistance immédiate.</p>
          <Button asChild variant="outline">
            <a href="tel:+2290190069561">+229 01 900 695 61</a>
          </Button>
        </div>

        {/* Email Support Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 mr-2 text-primary" />
            <h2 className="text-xl font-semibold">Support par e-mail</h2>
          </div>
          <p className="text-gray-600 mb-4">Envoyez-nous un e-mail et nous vous répondrons dans les plus brefs délais.</p>
          <Button asChild variant="outline">
            <a href="mailto:contact@lavuepayee.com">Envoyer un e-mail</a>
          </Button>
        </div>
      </div>

      {/* Additional Resources Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Ressources supplémentaires</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>
            <Link to="/terms" className="text-primary hover:underline">
              Conditions d'utilisation
            </Link>
          </li>
          <li>
            <Link to="/privacy" className="text-primary hover:underline">
              Politique de confidentialité
            </Link>
          </li>
          <li>
            <Link to="/cookies" className="text-primary hover:underline">
              Politique de cookies
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
