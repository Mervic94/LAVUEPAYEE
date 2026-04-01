
Objectif: connecter votre domaine personnalisé à votre site LaVuePayee publié sur Lovable.

Ce qu’il faut vérifier d’abord
1. Le projet doit déjà être publié.
   - Votre URL publique actuelle est: `https://lavuepayee.lovable.app`
   - Donc vous pouvez connecter un domaine personnalisé.

Étapes à faire dans Lovable

Desktop
1. Ouvrez le projet.
2. Cliquez sur le nom du projet en haut à gauche.
3. Ouvrez `Settings`.
4. Allez dans `Domains`.
5. Cliquez sur `Connect Domain`.
6. Saisissez votre domaine:
   - exemple racine: `monsite.com`
   - puis ajoutez aussi `www.monsite.com`
7. Suivez l’assistant Lovable.

Mobile
1. Ouvrez le projet.
2. En mode Chat, touchez le nom du projet en haut ou le bouton `...` en bas à droite.
3. Ouvrez `Settings`.
4. Allez dans `Domains`.
5. Touchez `Connect Domain`.
6. Ajoutez:
   - `monsite.com`
   - `www.monsite.com`
7. Suivez les instructions affichées.

Configuration DNS à mettre chez votre hébergeur de domaine
Si vous faites la configuration manuelle, ajoutez:

```text
Type   Nom        Valeur
A      @          185.158.133.1
A      www        185.158.133.1
TXT    _lovable   lovable_verify=ABC
```

Important:
- la valeur exacte du TXT vous sera donnée par Lovable
- ajoutez bien le domaine racine ET le sous-domaine `www`
- ensuite choisissez lequel sera le domaine principal

Si vous utilisez Cloudflare
- Dans l’écran `Connect Domain`, ouvrez `Advanced`
- Activez l’option indiquant que le domaine utilise Cloudflare ou un proxy similaire
- Dans ce cas, Lovable adaptera la méthode de configuration

Délais
- La propagation DNS peut prendre quelques minutes à 72h
- Après vérification, Lovable active automatiquement le SSL/HTTPS

États possibles du domaine
- `Verifying`: DNS en cours de propagation
- `Setting up`: SSL en cours
- `Active`: domaine opérationnel
- `Action required`: configuration incomplète
- `Offline`: le DNS ne pointe plus correctement
- `Failed`: certificat SSL non généré, il faut corriger puis relancer

Conseils pratiques
1. Connectez d’abord `monsite.com`
2. Connectez ensuite `www.monsite.com`
3. Définissez un domaine principal
4. Vérifiez qu’aucun ancien enregistrement A ne pointe vers un autre service
5. Si cela bloque, vérifiez aussi les éventuels enregistrements CAA

Si vous voulez, une fois votre nom de domaine acheté, je pourrai vous préparer un plan précis selon votre registrar:
- Namecheap
- GoDaddy
- Hostinger
- OVH
- IONOS
- Cloudflare

Détails techniques
- Le projet doit être publié avant de pouvoir lier un domaine
- Lovable sert ensuite votre site sur ce domaine avec certificat HTTPS automatique
- Si le site publié est privé, il faut aussi vérifier la visibilité de publication pour qu’il soit accessible publiquement
