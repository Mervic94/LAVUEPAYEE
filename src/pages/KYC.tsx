
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Camera, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '@/components/navbar';

const KYC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [kycData, setKycData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: '',
      address: '',
      city: '',
      postalCode: '',
      country: ''
    },
    documents: {
      idCard: null,
      proofOfAddress: null,
      selfie: null
    },
    verification: {
      status: 'pending',
      submittedAt: null
    }
  });

  const steps = [
    { id: 1, title: 'Informations personnelles', icon: FileText },
    { id: 2, title: 'Documents justificatifs', icon: Upload },
    { id: 3, title: 'Vérification photo', icon: Camera },
    { id: 4, title: 'Validation', icon: Shield }
  ];

  const handleInputChange = (section: string, field: string, value: string) => {
    setKycData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (type: string, file: File) => {
    setKycData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [type]: file
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setKycData(prev => ({
      ...prev,
      verification: {
        status: 'pending',
        submittedAt: new Date().toISOString()
      }
    }));

    toast({
      title: "KYC soumis",
      description: "Votre dossier KYC a été soumis pour vérification. Vous recevrez une réponse sous 24-48h."
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={kycData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={kycData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date de naissance</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={kycData.personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationalité</Label>
                <Select onValueChange={(value) => handleInputChange('personalInfo', 'nationality', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="belgium">Belgique</SelectItem>
                    <SelectItem value="switzerland">Suisse</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Adresse complète</Label>
              <Textarea
                id="address"
                value={kycData.personalInfo.address}
                onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                placeholder="Numéro, rue, ville, code postal"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Documents requis</h3>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Pièce d'identité</h4>
                      <p className="text-sm text-muted-foreground">
                        Carte d'identité, passeport ou permis de conduire
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Justificatif de domicile</h4>
                      <p className="text-sm text-muted-foreground">
                        Facture récente (moins de 3 mois)
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Vérification photo</h3>
              <p className="text-muted-foreground mb-6">
                Prenez une photo de vous avec votre pièce d'identité
              </p>
              
              <Button size="lg">
                <Camera className="h-4 w-4 mr-2" />
                Prendre une photo
              </Button>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Instructions importantes</h4>
                    <ul className="text-sm text-blue-800 mt-2 space-y-1">
                      <li>• Assurez-vous que votre visage et la pièce d'identité sont bien visibles</li>
                      <li>• Utilisez un bon éclairage</li>
                      <li>• Évitez les reflets et les ombres</li>
                      <li>• Tenez fermement les documents</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-lg font-medium mb-2">Vérification complète</h3>
              <p className="text-muted-foreground mb-6">
                Votre dossier KYC est prêt à être soumis
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Informations personnelles</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex justify-between">
                  <span>Documents justificatifs</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex justify-between">
                  <span>Vérification photo</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSubmit} className="w-full" size="lg">
              Soumettre le dossier KYC
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 mx-auto max-w-4xl pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Vérification KYC</h1>
          <p className="text-muted-foreground">
            Vérifiez votre identité pour accéder à toutes les fonctionnalités
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2
                    ${isActive ? 'border-primary bg-primary text-primary-foreground' : 
                      isCompleted ? 'border-green-600 bg-green-600 text-white' : 
                      'border-muted bg-background'}
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-20 h-0.5 mx-2
                      ${isCompleted ? 'bg-green-600' : 'bg-muted'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <span key={step.id} className="text-xs text-muted-foreground w-24 text-center">
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>
              Étape {currentStep} sur {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Précédent
          </Button>
          
          {currentStep < 4 ? (
            <Button onClick={handleNext}>
              Suivant
            </Button>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default KYC;
