# Plan d'implémentation

## 1. Sécurisation des rôles (base de données)

**Problème actuel :** Le rôle est stocké dans `public.users.role` (TEXT), modifiable par l'utilisateur via `UPDATE` (policy "Users can update their own profile"). C'est une **faille critique d'escalade de privilèges** : un consumer peut se promouvoir admin.

**Correction :**
- Créer un enum `app_role` (`admin`, `consumer`, `advertiser`)
- Créer une table dédiée `public.user_roles (user_id, role)` avec RLS stricte (lecture seule pour l'utilisateur, écriture réservée au `service_role`)
- Créer la fonction `has_role(_user_id, _role)` en `SECURITY DEFINER`
- Migrer les rôles existants de `users.role` vers `user_roles`
- Restreindre l'`UPDATE` sur `public.users` pour empêcher la modification de la colonne `role` (via trigger ou policy avec colonne exclue)
- Mettre à jour `handle_new_user()` pour insérer dans `user_roles`

## 2. Vérification Google OAuth

- Vérifier en console les logs auth (déjà visibles : redirections OK vers Google)
- Tester le flow complet et corriger d'éventuels bugs dans `useGoogleAuth` / `login.ts`
- S'assurer que le trigger `handle_new_user` crée bien le profil + rôle

## 3. Page d'onboarding `/onboarding`

- Route protégée affichée après première connexion (flag `onboarded` sur `users`)
- Affiche le rôle assigné avec un visuel distinct (admin/consumer/advertiser)
- 3 cartes "première action" selon le rôle :
  - **Admin** → "Gérer les utilisateurs"
  - **Consumer** → "Voir une première publicité"
  - **Advertiser** → "Créer ma première campagne"
- Bouton "Commencer" qui marque `onboarded=true` et redirige

## 4. Protection par rôle (frontend + backend)

**Frontend :**
- Étendre `ProtectedRoute` pour accepter `allowedRoles: string[]`
- Hook `useRole()` qui appelle `has_role` via RPC
- Routes restreintes :
  - `/admin/*` → admin uniquement
  - `/analytics`, création d'ads → advertiser + admin
  - `/exchange` → consumer + admin

**Backend (RLS) :** policies `user_roles` + `has_role()` partout où nécessaire.

## 5. Dashboard admin `/admin`

- Liste des utilisateurs (table avec recherche, filtres rôle/statut)
- Action : changer le rôle d'un utilisateur (via edge function avec service_role pour bypass RLS)
- Historique des points par utilisateur (lecture de `transactions` filtrée par `user_id`)
- Statistiques globales (nb users, points distribués, échanges en attente)

## 6. Système d'échange de points

**Nouvelles tables :**
- `products` : catalogue (nom, description, image, coût en points, stock)
- `exchange_requests` : demandes (user_id, type [`product` | `fiat`], product_id?, amount_points, amount_fiat?, status [`pending` | `approved` | `rejected`], admin_note, created_at, processed_at, processed_by)

**RLS :**
- Users : voir/créer leurs propres demandes
- Admin : tout voir, mettre à jour le statut (via `has_role`)

**Pages :**
- `/exchange` (consumer) : catalogue produits + formulaire retrait fiat + historique
- `/admin/exchanges` : file d'attente des demandes à valider

**Edge function `process-exchange`** : valide la demande, déduit les points, enregistre la transaction, notifie l'utilisateur.

## Détails techniques

```text
Migrations SQL (1 seule) :
  - CREATE TYPE app_role
  - CREATE TABLE user_roles + GRANT + RLS + policies
  - CREATE FUNCTION has_role
  - Migration data users.role -> user_roles
  - UPDATE handle_new_user
  - ALTER policy users (empêcher self-update du role)
  - CREATE TABLE products + GRANT + RLS
  - CREATE TABLE exchange_requests + GRANT + RLS
  - ALTER users ADD COLUMN onboarded BOOLEAN DEFAULT false

Fichiers frontend :
  - src/hooks/useRole.tsx (nouveau)
  - src/components/ProtectedRoute.tsx (étendre avec allowedRoles)
  - src/pages/Onboarding.tsx (nouveau)
  - src/pages/admin/Users.tsx, Exchanges.tsx (nouveaux)
  - src/pages/Exchange.tsx (nouveau)
  - src/App.tsx (nouvelles routes)
  - src/components/dashboards/AdminDashboard.tsx (enrichir)

Edge functions :
  - supabase/functions/admin-update-role/index.ts
  - supabase/functions/process-exchange/index.ts
```

## Étapes manuelles requises (utilisateur)

1. **Google Cloud Console** : OAuth Client ID Web avec :
   - Origine : `https://lavuepayee.lovable.app`
   - Redirect : `https://dfgvpaauwcbnmeitbxdx.supabase.co/auth/v1/callback`
2. **Supabase → Auth → Providers → Google** : activer + coller Client ID/Secret
3. **Supabase → Auth → URL Configuration** : Site URL + redirect URLs avec `lavuepayee.lovable.app/*`

## Ordre d'exécution

1. Migration SQL (sécurité rôles + nouvelles tables)
2. Hook `useRole` + `ProtectedRoute` étendu
3. Page Onboarding
4. Dashboard admin (gestion users + historique)
5. Système d'échange (catalogue + demandes + admin queue)
6. Edge functions
7. Tests end-to-end

Souhaitez-vous que je procède avec ce plan ?
