
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Phone, Mail, Clock, Search, Send, HelpCircle, Book, Video } from 'lucide-react';
import Navbar from '@/components/navbar';
import Seo from '@/components/Seo';

const Support = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
    email: ''
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ticket créé",
      description: "Votre demande de support a été envoyée. Nous vous répondrons sous 24h."
    });
    setTicketForm({
      subject: '',
      category: '',
      priority: '',
      description: '',
      email: ''
    });
  };

  const faqData = [
    {
      question: "Comment gagner des points LPV ?",
      answer: "Vous pouvez gagner des points en regardant des publicités, en cliquant sur des liens, en partageant du contenu et en invitant des amis."
    },
    {
      question: "Comment retirer mes gains ?",
      answer: "Rendez-vous dans votre portefeuille, sélectionnez 'Retrait', choisissez votre méthode de paiement et suivez les instructions."
    },
    {
      question: "Quel est le minimum de retrait ?",
      answer: "Le montant minimum de retrait est de 10€ pour tous les modes de paiement."
    },
    {
      question: "Combien de temps prend la vérification KYC ?",
      answer: "La vérification KYC prend généralement 24 à 48 heures ouvrées."
    },
    {
      question: "Comment fonctionne le système de parrainage ?",
      answer: "Invitez vos amis avec votre code de parrainage. Vous recevez 100 points par filleul actif, et votre filleul reçoit 50 points de bonus."
    }
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Chat en direct",
      description: "Assistance instantanée",
      availability: "Lun-Ven 9h-18h",
      action: "Démarrer le chat"
    },
    {
      icon: Mail,
      title: "Email",
      description: "support@lavuepayee.com",
      availability: "Réponse sous 24h",
      action: "Envoyer un email"
    },
    {
      icon: Phone,
      title: "Téléphone",
      description: "+33 1 23 45 67 89",
      availability: "Lun-Ven 9h-17h",
      action: "Appeler"
    }
  ];

  const tutorials = [
    {
      title: "Premiers pas sur LaVuePayee",
      description: "Guide complet pour débuter",
      duration: "5 min",
      type: "video"
    },
    {
      title: "Maximiser ses gains",
      description: "Stratégies et astuces",
      duration: "8 min",
      type: "article"
    },
    {
      title: "Processus de vérification KYC",
      description: "Étapes détaillées",
      duration: "3 min",
      type: "video"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Support LAVUEPAYEE - Nous contacter" description="Contactez l'équipe support LAVUEPAYEE pour toute question sur votre compte, vos points ou vos retraits." path="/support" />
      <Navbar />
      
      <main className="container px-4 md:px-6 mx-auto max-w-6xl pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Centre d'aide</h1>
          <p className="text-muted-foreground">
            Trouvez des réponses à vos questions ou contactez notre équipe
          </p>
        </div>

        {/* Barre de recherche */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans l'aide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Nous contacter</TabsTrigger>
            <TabsTrigger value="tutorials">Tutoriels</TabsTrigger>
            <TabsTrigger value="ticket">Créer un ticket</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Questions fréquentes
                </CardTitle>
                <CardDescription>
                  Trouvez rapidement des réponses aux questions les plus courantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportChannels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="text-center">
                      <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <CardTitle className="text-lg">{channel.title}</CardTitle>
                      <CardDescription>{channel.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-4">
                        <Clock className="h-4 w-4" />
                        {channel.availability}
                      </div>
                      <Button className="w-full">{channel.action}</Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  Guides et tutoriels
                </CardTitle>
                <CardDescription>
                  Apprenez à utiliser toutes les fonctionnalités de LaVuePayee
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tutorials.map((tutorial, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {tutorial.type === 'video' ? (
                              <Video className="h-4 w-4 text-primary" />
                            ) : (
                              <Book className="h-4 w-4 text-primary" />
                            )}
                            <span className="text-sm text-muted-foreground">
                              {tutorial.duration}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-medium mb-2">{tutorial.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {tutorial.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ticket" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Créer un ticket de support
                </CardTitle>
                <CardDescription>
                  Décrivez votre problème en détail pour une assistance personnalisée
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={ticketForm.email}
                        onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Catégorie</Label>
                      <Select onValueChange={(value) => setTicketForm({...ticketForm, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="account">Compte</SelectItem>
                          <SelectItem value="payment">Paiements</SelectItem>
                          <SelectItem value="technical">Technique</SelectItem>
                          <SelectItem value="kyc">Vérification KYC</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject">Sujet</Label>
                      <Input
                        id="subject"
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                        placeholder="Résumé du problème"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority">Priorité</Label>
                      <Select onValueChange={(value) => setTicketForm({...ticketForm, priority: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Basse</SelectItem>
                          <SelectItem value="normal">Normale</SelectItem>
                          <SelectItem value="high">Élevée</SelectItem>
                          <SelectItem value="urgent">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description détaillée</Label>
                    <Textarea
                      id="description"
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                      placeholder="Décrivez votre problème en détail..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer le ticket
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Support;
