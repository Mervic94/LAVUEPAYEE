## 1. Audit des pages

J'ai parcouru `src/pages/**`. Résultat :

| État | Pages |
|---|---|
| Complètes et fonctionnelles | Index, Login, Register, ResetPassword, VerifyEmail, VerifyPhone, Dashboard, Tasks, Wallet, Profile, Marketplace, Affiliates, Leaderboard, Courses, FAQ, Help, Support, Notifications, Messages, KYC, Analytics, Settings, Onboarding, Exchange, ViewAd, Terms, Privacy, Cookies, admin/Users, admin/Exchanges |
| Complètes mais incohérentes (pas de Navbar, layout admin minimal) | `admin/PlatformMonitor` |
| Vraiment vides | **aucune** (le composant `PlaceholderPage` existe mais n'est plus utilisé nulle part) |
| Zones internes à remplir | `AdCreativeLibrary` → bloc « Modèles à venir » vide ; quelques sous-onglets `Settings` (Apparence/Social) qui ne contiennent qu'un titre |

Conclusion : il n'y a pas de pages blanches — il reste 1 page à harmoniser et 2-3 sections internes à enrichir.

## 2. Causes des 404 / 403 remontés par Google Search Console

1. **Pas de `public/robots.txt`** → Googlebot crawle les routes privées (`/dashboard`, `/wallet`, `/admin/*`, `/kyc`, `/messages`, `/notifications`, `/profile`, `/settings`, `/analytics`, `/onboarding`, `/exchange`, `/tasks`, `/verify-email`, `/verify-phone`, `/reset-password`, `/test-auth`).
2. Ces routes sont protégées par `ProtectedRoute` → redirection vers `/login`. Googlebot voit ça comme **soft-404** ou **403 / accès refusé**.
3. **Pas de `public/sitemap.xml`** → Google ne sait pas quelles pages indexer en priorité, donc il retombe sur des URLs internes ou anciennes.
4. Routes obsolètes éventuellement référencées dans des sitemaps Google historiques (ex. `/test-auth`).

## 3. Plan d'action

### A. Compléter les zones internes encore vides
- `AdCreativeLibrary` → ajouter 3 modèles d'annonce pré-conçus (bannière, vidéo, native) avec aperçu et bouton « Utiliser ce modèle ».
- Vérifier `AppearanceSettings` et `SocialSettings` ; si vides, ajouter respectivement : choix de thème + densité + langue, et liaison des comptes sociaux (lecture seule des champs déjà stockés).
- `admin/PlatformMonitor` : ajouter `<Navbar />`, header glass-card et lien retour Admin pour rester cohérent avec les autres écrans admin.

### B. SEO / corriger les 404-403 Google
- Créer **`public/robots.txt`** :
  ```
  User-agent: *
  Allow: /
  Disallow: /dashboard
  Disallow: /wallet
  Disallow: /profile
  Disallow: /settings
  Disallow: /tasks
  Disallow: /messages
  Disallow: /notifications
  Disallow: /analytics
  Disallow: /kyc
  Disallow: /onboarding
  Disallow: /exchange
  Disallow: /admin
  Disallow: /admin/
  Disallow: /verify-email
  Disallow: /verify-phone
  Disallow: /reset-password
  Disallow: /test-auth
  Sitemap: https://lavuepayee.lovable.app/sitemap.xml
  ```
- Créer **`scripts/generate-sitemap.ts`** (exécuté via `predev` / `prebuild`) qui produit `public/sitemap.xml` avec uniquement les routes publiques : `/`, `/login`, `/register`, `/marketplace`, `/leaderboard`, `/faq`, `/help`, `/support`, `/terms`, `/privacy`, `/cookies`.
- Ajouter les scripts `predev` / `prebuild` dans `package.json`.
- S'assurer que `ProtectedRoute` renvoie un code « noindex » côté méta lorsqu'on est redirigé (ajout d'une balise `<meta name="robots" content="noindex">` dans `Login` et `Unauthorized`) — défense en profondeur si Google ignore robots.txt.
- Vérifier la balise canonical dans `index.html` (ajouter si manquante).

### C. Étapes manuelles côté utilisateur (à faire dans Google Search Console)
- Aller dans GSC → **Pages** → marquer les URLs `/dashboard`, `/wallet`, etc. comme « Validées » après le déploiement.
- Soumettre `https://lavuepayee.lovable.app/sitemap.xml`.

## 4. Détails techniques

```text
Fichiers créés :
  public/robots.txt
  scripts/generate-sitemap.ts
  (public/sitemap.xml généré automatiquement)

Fichiers modifiés :
  package.json                       (scripts predev/prebuild)
  index.html                         (canonical si manquant)
  src/pages/Login.tsx                (meta noindex)
  src/pages/Unauthorized.tsx         (meta noindex)
  src/pages/admin/PlatformMonitor.tsx (Navbar + layout)
  src/components/advertiser/AdCreativeLibrary.tsx (modèles)
  src/components/settings/AppearanceSettings.tsx (si vide)
  src/components/settings/SocialSettings.tsx     (si vide)
```

Souhaitez-vous que je procède avec ce plan, ou voulez-vous restreindre la portée (par ex. uniquement le SEO / uniquement les contenus internes) ?
