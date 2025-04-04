
import React, { useState } from 'react';
import { ArrowLeft, Upload, ImagePlus, Film, Globe, BarChart2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const campaignFormSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  objective: z.enum(["awareness", "consideration", "conversion"]),
  budget: z.coerce.number().min(100, "Le budget minimum est de 100 LVC"),
  startDate: z.string(),
  endDate: z.string().optional(),
  targetAudience: z.object({
    ageRange: z.string(),
    gender: z.string(),
    location: z.string(),
    interests: z.array(z.string()).optional()
  }),
  adContent: z.object({
    title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
    description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
    callToAction: z.string(),
    mediaType: z.enum(["image", "video", "carousel"]),
  }),
  placement: z.array(z.string()),
  bidType: z.enum(["cpc", "cpm", "cpa"]),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les conditions" }),
  }),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

interface CampaignCreationFormProps {
  onCancel: () => void;
}

const CampaignCreationForm: React.FC<CampaignCreationFormProps> = ({ onCancel }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [dailyBudgetEstimate, setDailyBudgetEstimate] = useState(100);
  const [impressionsEstimate, setImpressionsEstimate] = useState(1000);
  
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: "",
      objective: "awareness",
      budget: 100,
      startDate: new Date().toISOString().split('T')[0],
      targetAudience: {
        ageRange: "all",
        gender: "all",
        location: "all",
        interests: []
      },
      adContent: {
        title: "",
        description: "",
        callToAction: "En savoir plus",
        mediaType: "image",
      },
      placement: ["feed"],
      bidType: "cpc",
      termsAccepted: false
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateBudgetEstimates = (value: number) => {
    setDailyBudgetEstimate(value / 30); // Estimation du budget journalier
    setImpressionsEstimate(value * 10); // Estimation simplifiée des impressions
  };

  const onSubmit = (data: CampaignFormValues) => {
    console.log("Formulaire soumis:", data);
    toast({
      title: "Campagne créée",
      description: "Votre campagne publicitaire a été créée avec succès.",
    });
    onCancel(); // Retour à la liste des campagnes
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onCancel} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h3 className="text-xl font-semibold">Créer une nouvelle campagne</h3>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="w-full flex items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-secondary/50 text-foreground/60'}`}>1</div>
              <div className={`h-1 flex-1 ${step >= 2 ? 'bg-primary' : 'bg-secondary/50'}`}></div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-secondary/50 text-foreground/60'}`}>2</div>
              <div className={`h-1 flex-1 ${step >= 3 ? 'bg-primary' : 'bg-secondary/50'}`}></div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-secondary/50 text-foreground/60'}`}>3</div>
              <div className={`h-1 flex-1 ${step >= 4 ? 'bg-primary' : 'bg-secondary/50'}`}></div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-primary text-white' : 'bg-secondary/50 text-foreground/60'}`}>4</div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-foreground/60">
            <span className="text-center" style={{ marginLeft: "-20px" }}>Informations</span>
            <span className="text-center" style={{ marginLeft: "-10px" }}>Audience</span>
            <span className="text-center" style={{ marginLeft: "-10px" }}>Contenu</span>
            <span className="text-center" style={{ marginRight: "-20px" }}>Budget</span>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium">Informations de la campagne</h4>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de la campagne</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Promotion Été 2025" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ce nom est uniquement visible par vous
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="objective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objectif de la campagne</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un objectif" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="awareness">Notoriété de marque</SelectItem>
                        <SelectItem value="consideration">Considération produit</SelectItem>
                        <SelectItem value="conversion">Conversions et ventes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Cet objectif nous aide à optimiser votre campagne
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de début</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de fin (optionnelle)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>
                      Laissez vide pour une campagne continue
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="button" onClick={() => setStep(2)}>
                  Suivant
                </Button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium">Ciblage de l'audience</h4>
              
              <FormField
                control={form.control}
                name="targetAudience.ageRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tranche d'âge</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une tranche d'âge" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">Tous les âges</SelectItem>
                        <SelectItem value="18-24">18-24 ans</SelectItem>
                        <SelectItem value="25-34">25-34 ans</SelectItem>
                        <SelectItem value="35-44">35-44 ans</SelectItem>
                        <SelectItem value="45-54">45-54 ans</SelectItem>
                        <SelectItem value="55+">55 ans et plus</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="targetAudience.gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="male">Homme</SelectItem>
                        <SelectItem value="female">Femme</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="targetAudience.location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localisation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une localisation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">Toute la France</SelectItem>
                        <SelectItem value="paris">Paris et région parisienne</SelectItem>
                        <SelectItem value="lyon">Lyon et sa périphérie</SelectItem>
                        <SelectItem value="marseille">Marseille et sa périphérie</SelectItem>
                        <SelectItem value="custom">Personnalisé...</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Précédent
                </Button>
                <Button type="button" onClick={() => setStep(3)}>
                  Suivant
                </Button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium">Contenu publicitaire</h4>
              
              <FormField
                control={form.control}
                name="adContent.mediaType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de média</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        className="grid grid-cols-3 gap-4"
                      >
                        <FormItem className="flex flex-col items-center space-y-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="image" className="sr-only" />
                          </FormControl>
                          <ImagePlus className="h-6 w-6" />
                          <FormLabel className="font-normal">Image</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col items-center space-y-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="video" className="sr-only" />
                          </FormControl>
                          <Film className="h-6 w-6" />
                          <FormLabel className="font-normal">Vidéo</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col items-center space-y-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="carousel" className="sr-only" />
                          </FormControl>
                          <Globe className="h-6 w-6" />
                          <FormLabel className="font-normal">Carousel</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="adContent.title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre de l'annonce</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre accrocheur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="adContent.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez votre produit ou service" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <Label>Télécharger votre média</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {previewImage ? (
                    <div className="space-y-2">
                      <img 
                        src={previewImage} 
                        alt="Aperçu" 
                        className="mx-auto max-h-[200px] rounded-lg" 
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPreviewImage(null)}
                      >
                        Changer l'image
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Glissez-déposez votre fichier ou cliquez pour le sélectionner
                      </p>
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file-upload">
                        <Button type="button" variant="outline" size="sm" className="mx-auto">
                          Parcourir les fichiers
                        </Button>
                      </label>
                    </>
                  )}
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="adContent.callToAction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Call-to-Action</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un CTA" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="En savoir plus">En savoir plus</SelectItem>
                        <SelectItem value="Acheter maintenant">Acheter maintenant</SelectItem>
                        <SelectItem value="S'inscrire">S'inscrire</SelectItem>
                        <SelectItem value="Télécharger">Télécharger</SelectItem>
                        <SelectItem value="Contacter">Contacter</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Précédent
                </Button>
                <Button type="button" onClick={() => setStep(4)}>
                  Suivant
                </Button>
              </div>
            </div>
          )}
          
          {step === 4 && (
            <div className="space-y-6">
              <h4 className="text-lg font-medium">Budget et enchères</h4>
              
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget total (LVC)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={100} 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          updateBudgetEstimates(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Budget minimum: 100 LVC
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Estimations de performance
                  </CardTitle>
                  <CardDescription>Basées sur votre budget</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Budget journalier estimé:</span>
                      <span className="font-medium">{dailyBudgetEstimate.toFixed(2)} LVC/jour</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Impressions estimées:</span>
                      <span className="font-medium">{impressionsEstimate.toLocaleString()} impressions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durée estimée:</span>
                      <span className="font-medium">30 jours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <FormField
                control={form.control}
                name="bidType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d'enchère</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type d'enchère" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cpc">Coût par clic (CPC)</SelectItem>
                        <SelectItem value="cpm">Coût par mille impressions (CPM)</SelectItem>
                        <SelectItem value="cpa">Coût par action (CPA)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Détermine comment vous serez facturé pour votre campagne
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="placement"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Emplacements des annonces</FormLabel>
                      <FormDescription>
                        Sélectionnez où vos annonces apparaîtront
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="placement"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes("feed")}
                                onCheckedChange={(checked) => {
                                  const newValues = checked 
                                    ? [...field.value, "feed"] 
                                    : field.value?.filter(v => v !== "feed");
                                  field.onChange(newValues);
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Flux principal</FormLabel>
                              <FormDescription>
                                Annonces dans le flux d'actualités
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="placement"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes("story")}
                                onCheckedChange={(checked) => {
                                  const newValues = checked 
                                    ? [...field.value, "story"] 
                                    : field.value?.filter(v => v !== "story");
                                  field.onChange(newValues);
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Stories</FormLabel>
                              <FormDescription>
                                Format plein écran immersif
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="placement"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes("search")}
                                onCheckedChange={(checked) => {
                                  const newValues = checked 
                                    ? [...field.value, "search"] 
                                    : field.value?.filter(v => v !== "search");
                                  field.onChange(newValues);
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Résultats de recherche</FormLabel>
                              <FormDescription>
                                Apparaît dans les recherches
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="placement"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes("market")}
                                onCheckedChange={(checked) => {
                                  const newValues = checked 
                                    ? [...field.value, "market"] 
                                    : field.value?.filter(v => v !== "market");
                                  field.onChange(newValues);
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Marketplace</FormLabel>
                              <FormDescription>
                                Annonces dans la section achats
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Accepter les conditions</FormLabel>
                      <FormDescription>
                        Je confirme avoir lu et accepté les <a href="#" className="text-primary underline">conditions d'utilisation</a> et les <a href="#" className="text-primary underline">règles publicitaires</a> de LAVUEPAYEE.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(3)}>
                  Précédent
                </Button>
                <Button type="submit">
                  Créer la campagne
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CampaignCreationForm;
