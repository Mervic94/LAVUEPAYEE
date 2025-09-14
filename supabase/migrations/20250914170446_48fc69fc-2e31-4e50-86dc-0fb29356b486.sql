-- Ajouter des données de test pour valider le fonctionnement
-- 1. Insérer des campagnes de test (avec un utilisateur fictif pour les tests)
INSERT INTO public.campaigns (id, advertiser_id, title, description, budget, status) VALUES
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'Campagne Test Vêtements', 'Promotion vêtements écologiques', 1000, 'active'),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'Campagne Test Tech', 'Nouveaux smartphones', 1500, 'active'),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'Campagne Test Voyage', 'Offres voyages', 800, 'active')
ON CONFLICT (id) DO NOTHING;

-- 2. Insérer des publicités de test
INSERT INTO public.ads (id, campaign_id, title, content, type, reward_points, reward_amount, image_url, status) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Nouvelle collection éco', 'Découvrez notre nouvelle gamme de vêtements fabriqués à partir de matériaux recyclés.', 'video', 50, 0.05, '/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png', 'active'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Smartphone révolutionnaire', 'Des performances exceptionnelles dans un design élégant.', 'banner', 75, 0.075, '/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png', 'active'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'Voyages à prix réduit', 'Profitez de nos offres spéciales sur les vols internationaux.', 'native', 40, 0.04, '/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png', 'active'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 'Mode durable', 'La mode responsable à portée de main.', 'popup', 60, 0.06, '/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png', 'active'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', 'Innovation tech', 'Découvrez le futur de la technologie.', 'audio', 30, 0.03, '/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png', 'active')
ON CONFLICT (id) DO NOTHING;