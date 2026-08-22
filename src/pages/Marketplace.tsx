import Seo from '@/components/Seo';

import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/navbar';
import ProductCard from '@/components/ProductCard';
import PointsIndicator from '@/components/PointsIndicator';

// Mock data for products
const mockProducts = [
  {
    id: '1',
    name: 'Écouteurs sans fil premium',
    description: 'Profitez d\'un son exceptionnel avec ces écouteurs sans fil de haute qualité.',
    image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVhcnBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    price: 15000
  },
  {
    id: '2',
    name: 'Montre connectée',
    description: 'Suivez votre activité physique et recevez vos notifications sur cette montre élégante.',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    price: 25000
  },
  {
    id: '3',
    name: 'Enceinte Bluetooth portable',
    description: 'Emportez votre musique partout avec cette enceinte portable au son puissant.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    price: 12000
  },
  {
    id: '4',
    name: 'Tablette graphique',
    description: 'Idéale pour les artistes numériques, cette tablette offre une précision exceptionnelle.',
    image: 'https://images.unsplash.com/photo-1561126655-4d48b66f95d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhcGhpYyUyMHRhYmxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    price: 30000
  },
  {
    id: '5',
    name: 'Batterie externe 20000mAh',
    description: 'Ne manquez jamais de batterie avec cette powerbank haute capacité et charge rapide.',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG93ZXIlMjBiYW5rfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    price: 8000
  },
  {
    id: '6',
    name: 'Drone avec caméra HD',
    description: 'Capturez des images aériennes spectaculaires avec ce drone stable et facile à piloter.',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZHJvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    price: 50000
  },
  {
    id: '7',
    name: 'Sac à dos anti-vol',
    description: 'Protégez vos affaires avec ce sac à dos au design moderne et sécurisé.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFja3BhY2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    price: 7500
  },
  {
    id: '8',
    name: 'Kit d\'éclairage pour streaming',
    description: 'Améliorez la qualité de vos vidéos avec ce kit d\'éclairage professionnel.',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZWFtaW5nJTIwbGlnaHR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    price: 18000
  }
];

// Categories for filtering
const categories = [
  'Tous',
  'Électronique',
  'Audio',
  'Accessoires',
  'Photo & Vidéo',
  'Voyage',
  'Mode'
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  
  // Filter products based on search and category
  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Marketplace LAVUEPAYEE - Échangez vos Vuecoins" description="Découvrez les produits disponibles sur la marketplace LAVUEPAYEE et échangez-les contre vos Vuecoins." path="/marketplace" />
      <Navbar />
      
      <main className="container px-6 mx-auto max-w-7xl pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Marketplace</h1>
            <p className="text-foreground/60 mt-2">Échangez vos points contre des produits exclusifs</p>
          </div>
          
          <div className="flex items-center gap-3">
            <PointsIndicator points={1250} size="lg" />
            <button className="btn-secondary">
              Retirer des LVP
            </button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-foreground/40" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter button */}
            <div className="relative">
              <button className="px-4 py-2.5 rounded-lg border border-border bg-white flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <span>Filtres</span>
              </button>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {/* Cash Out Section */}
        <div className="mt-16 pt-12 border-t">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
                <div className="h-4 w-4 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                    alt="Jeton de points LVP" 
                    className="w-full h-full object-contain"
                  />
                </div>
                Conversion de points
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Convertissez vos points en argent réel
              </h2>
              <p className="text-foreground/70 mb-8">
                Vous pouvez convertir vos points en euros et les faire virer sur votre compte bancaire. La conversion commence à partir de 10 000 points.
              </p>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="glass-card rounded-xl p-4 flex-grow text-center">
                  <p className="text-foreground/60 text-sm mb-1">Taux de conversion</p>
                  <p className="text-xl font-semibold">700 LVP = 1 Vc</p>
                </div>
                
                <div className="glass-card rounded-xl p-4 flex-grow text-center">
                  <p className="text-foreground/60 text-sm mb-1">Minimum</p>
                  <p className="text-xl font-semibold">10 000 LVP</p>
                </div>
              </div>
              
              <button className="btn-primary">
                Convertir mes points
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            
            <div className="md:w-1/2">
              <div className="glass-card rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4">Simulateur de conversion</h3>
                
                <div className="mb-6">
                  <label className="block text-foreground/70 mb-2">Points à convertir</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="10000"
                      min="10000"
                      step="1000"
                      className="w-full pl-4 pr-16 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center">
                      <div className="h-5 w-5 rounded-full flex items-center justify-center overflow-hidden">
                        <img 
                          src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                          alt="Jeton de points LVP" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-foreground/70">Taux de conversion</p>
                    <p className="font-medium">700 LVP = 1 Vc</p>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-foreground/70">Frais de transaction</p>
                    <p className="font-medium">2%</p>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-foreground/70">Délai de traitement</p>
                    <p className="font-medium">2-3 jours ouvrés</p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <p className="font-semibold text-lg">Montant estimé</p>
                    <div className="flex items-center">
                      <div className="h-5 w-5 rounded-full flex items-center justify-center overflow-hidden mr-1">
                        <img 
                          src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                          alt="Jeton Vuecoin" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="font-bold text-xl text-primary">14,28</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
