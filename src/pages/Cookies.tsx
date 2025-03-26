import React from 'react';
import Navbar from '@/components/navbar';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Politique de Cookies</h1>
        
        <div className="prose prose-green max-w-none">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. 
              Les cookies sont largement utilisés pour faire fonctionner les sites web ou les rendre plus efficaces, 
              ainsi que pour fournir des informations aux propriétaires du site.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Comment nous utilisons les cookies</h2>
            <p>
              LAVUEPAYEE utilise des cookies pour diverses raisons détaillées ci-dessous. Malheureusement, dans la plupart des cas, 
              il n'existe pas d'options standard pour désactiver les cookies sans désactiver complètement les fonctionnalités 
              et caractéristiques qu'ils ajoutent à ce site. Il est recommandé de laisser tous les cookies si vous n'êtes pas sûr 
              d'en avoir besoin ou non, au cas où ils seraient utilisés pour fournir un service que vous utilisez.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Les cookies que nous utilisons</h3>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                <strong>Cookies liés à l'authentification</strong>
                <p>Nous utilisons des cookies lorsque vous êtes connecté afin de nous souvenir de ce fait. Cela vous évite d'avoir à vous connecter chaque fois que vous visitez une nouvelle page. Ces cookies sont généralement supprimés ou effacés lorsque vous vous déconnectez pour garantir que vous ne pouvez accéder qu'aux fonctionnalités et zones restreintes lorsque vous êtes connecté.</p>
              </li>
              <li className="mb-2">
                <strong>Cookies liés aux formulaires</strong>
                <p>Lorsque vous soumettez des données via un formulaire comme ceux présents sur les pages de contact ou les formulaires de commentaires, les cookies peuvent être configurés pour se souvenir de vos informations utilisateur pour une future correspondance.</p>
              </li>
              <li className="mb-2">
                <strong>Cookies de préférences du site</strong>
                <p>Afin de vous offrir une grande expérience sur ce site, nous fournissons la fonctionnalité pour définir vos préférences quant au fonctionnement de ce site lorsque vous l'utilisez. Afin de mémoriser vos préférences, nous devons définir des cookies afin que ces informations puissent être appelées chaque fois que vous interagissez avec une page affectée par vos préférences.</p>
              </li>
              <li className="mb-2">
                <strong>Cookies de partenaires publicitaires</strong>
                <p>Étant donné que nous montrons des publicités de différents partenaires, comme Google, Facebook, et autres, ces entreprises peuvent définir des cookies sur votre navigateur pour analyser votre comportement publicitaire.</p>
              </li>
            </ul>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Contrôle de vos cookies</h2>
            <p>
              Vous pouvez empêcher l'installation de cookies en modifiant les paramètres de votre navigateur (consultez l'aide de votre navigateur pour savoir comment procéder). 
              Sachez que la désactivation des cookies affectera la fonctionnalité de ce site et de nombreux autres sites que vous visitez. 
              La désactivation des cookies entraînera généralement la désactivation de certaines fonctionnalités et caractéristiques de ce site. 
              Il est donc recommandé de ne pas désactiver les cookies.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Plus d'informations</h2>
            <p>
              Si vous avez des questions concernant notre utilisation des cookies, n'hésitez pas à nous contacter à l'adresse suivante : contact@lavuepayee.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Cookies;
