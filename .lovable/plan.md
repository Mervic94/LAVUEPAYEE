
## Objectif

1. Attribuer automatiquement les rôles aux 3 comptes Gmail indiqués.
2. Vérifier et corriger l'inscription/connexion via Google (OAuth).

## 1. Attribution des rôles

Mapping demandé :
- `melvicsotch@gmail.com` → **admin**
- `vicsotchenou@gmail.com` → **consumer**
- `victorsotch@gmail.com` → **advertiser**

Actions (migration SQL) :
- **UPDATE** sur `public.users` pour forcer ces 3 rôles si les comptes existent déjà (créés par signup).
- Mettre à jour la fonction `handle_new_user()` pour qu'à chaque nouvelle inscription, si l'email correspond à un des 3 ci-dessus, le rôle correct soit assigné automatiquement (au lieu de `consumer` par défaut).
- Aucune création manuelle de compte côté DB (Supabase Auth ne permet pas d'insérer dans `auth.users` via migration sans mot de passe) — les comptes seront créés par la connexion Google.

## 2. Inscription / Connexion Google

Diagnostic du code actuel :
- `useGoogleAuth` et `login.ts` appellent correctement `supabase.auth.signInWithOAuth({ provider: 'google', redirectTo: window.location.origin + '/dashboard' })`.
- Le trigger `handle_new_user` crée bien le profil dans `users` et `profiles` à partir de `raw_user_meta_data` (avatar, prénom, nom).
- Le client Supabase est en `flowType: 'pkce'` avec `detectSessionInUrl: true` ✅.

Corrections côté code :
- **Bug potentiel** : `useGoogleAuth` ne remet pas `googleLoading=false` en cas de succès (uniquement en cas d'erreur). Comme la page redirige, ce n'est généralement pas bloquant, mais on ajoute un `finally` propre.
- Le redirect `window.location.origin + '/dashboard'` doit être listé dans les **Redirect URLs** Supabase (action manuelle, voir ci-dessous).
- Vérifier que `Register.tsx` propose bien le bouton Google (composant `SocialAuth` existe déjà ✅).
- S'assurer qu'après login Google, le nouvel utilisateur tombe sur `/dashboard` même si son profil vient juste d'être créé par le trigger.

Actions manuelles indispensables (à faire dans la console Supabase + Google Cloud) — non automatisables par Lovable :

a. **Google Cloud Console** → OAuth Client ID type "Web application" :
   - Authorized JavaScript origin : `https://lavuepayee.lovable.app` (et l'URL preview)
   - Authorized redirect URI : `https://dfgvpaauwcbnmeitbxdx.supabase.co/auth/v1/callback`

b. **Supabase Dashboard → Authentication → Providers → Google** :
   - Activer le provider
   - Coller le Client ID + Client Secret de Google

c. **Supabase Dashboard → Authentication → URL Configuration** :
   - Site URL : `https://lavuepayee.lovable.app`
   - Redirect URLs : `https://lavuepayee.lovable.app/*`, URL de preview Lovable, `http://localhost:*`

## Détails techniques

```text
SQL migration (résumé) :
1. UPDATE public.users SET role='admin' WHERE email='melvicsotch@gmail.com';
2. UPDATE public.users SET role='consumer' WHERE email='vicsotchenou@gmail.com';
3. UPDATE public.users SET role='advertiser' WHERE email='victorsotch@gmail.com';
4. CREATE OR REPLACE FUNCTION public.handle_new_user() -- avec CASE sur NEW.email
   pour attribuer le bon rôle à la création.
```

Fichiers code modifiés :
- `src/hooks/useGoogleAuth.tsx` (ajout `finally`)
- `src/contexts/auth/services/login.ts` (idem)

## Livrable utilisateur

Après implémentation, je vous fournirai :
- Le récap des étapes manuelles à faire dans Google Cloud + Supabase
- Confirmation que les 3 comptes auront automatiquement leur rôle dès leur première connexion Google
