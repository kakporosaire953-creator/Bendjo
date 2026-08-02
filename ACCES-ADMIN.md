# 🔐 Accès Panel Administrateur BenDjo

## 📍 Objectif

Ce document explique comment accéder au **Panel d'Administration BenDjo** permettant de gérer le catalogue de produits (ajout, modification, suppression, upload d'images/vidéos).

Pour des raisons de sécurité, le panel n'est **pas accessible via un bouton visible** sur le site. Deux méthodes discrètes ont été mises en place :

---

## 💻 Accès sur Desktop (Ordinateur)

### Méthode : Code clavier secret

**Implémentation technique :**
- Détection des événements `keypress` dans `src/App.tsx`
- Buffer qui capture les 9 derniers caractères tapés
- Si la séquence correspond à `admin2026`, le panel s'ouvre automatiquement

**Comment accéder :**
1. Ouvrez n'importe quelle page du site BenDjo
2. Tapez au clavier : **`admin2026`** (en minuscules)
3. Le panel administrateur s'ouvre instantanément

**Remarques :**
- Pas besoin d'appuyer sur Entrée
- Le code fonctionne sur toutes les pages
- Les caractères ne s'affichent pas à l'écran

**Code secret : `admin2026`**

---

## 📱 Accès sur Mobile (Smartphone/Tablette)

### Méthode : Triple-Tap en bas à droite

**Implémentation technique :**
- Détection des événements `touchend` dans `src/App.tsx`
- Zone de détection : 20% de la largeur écran en bas à droite, 20% de la hauteur depuis le bas
- Triple-tap détecté si 3 taps en moins de 1 seconde dans la zone

**Comment accéder :**
1. Ouvrez n'importe quelle page du site BenDjo
2. **Tapez 3 fois rapidement** dans le **coin en bas à droite** de l'écran
3. Le panel administrateur s'ouvre automatiquement

**Zone de triple-tap :**
```
┌─────────────────────┐
│                     │
│                     │
│      Contenu        │
│       page          │
│                 ┌───┤ 
│                 │XXX│ ← Tapez ici
│                 │XXX│   3 fois rapidement
└─────────────────┴───┘
     Zone active (20% bas-droite)
```

**Remarques importantes :**
- Les 3 taps doivent être faits en **moins d'1 seconde**
- Zone de détection : 20% largeur × 20% hauteur (coin bas-droit)
- Si ça ne fonctionne pas, réessayez plus rapidement

---

## ⚙️ Fonctionnalités du Panel Admin

Une fois connecté au panel d'administration, vous pouvez :

| Fonctionnalité | Description |
|---------------|-------------|
| ✅ **Ajouter produits** | Créer de nouvelles infusions avec nom, prix, description, catégorie |
| ✅ **Modifier produits** | Éditer les informations des produits existants |
| ✅ **Supprimer produits** | Retirer des produits du catalogue |
| ✅ **Gérer médias** | Upload d'images (JPG, PNG, WebP) ou vidéos (MP4) |
| ✅ **Catégories** | Organiser par type (Infusions, Coffrets, Nouveautés) |
| ✅ **Prix FCFA** | Définir les tarifs en Francs CFA |
| ✅ **Réinitialisation** | Restaurer le catalogue d'origine (avec confirmation) |

---

## 🔧 Détails Techniques (Implémentation)

### Fichier : `src/App.tsx`

**1. Détection clavier (Desktop) :**
```typescript
useEffect(() => {
  let buffer = '';
  const handleKeyPress = (e: KeyboardEvent) => {
    buffer += e.key;
    if (buffer.length > 9) buffer = buffer.slice(-9);
    if (buffer === 'admin2026') {
      setAdminPanelOpen(true);
      buffer = '';
    }
  };
  window.addEventListener('keypress', handleKeyPress);
  return () => window.removeEventListener('keypress', handleKeyPress);
}, []);
```

**2. Détection triple-tap (Mobile) :**
```typescript
useEffect(() => {
  let tapCount = 0;
  let tapTimer: NodeJS.Timeout;
  
  const handleTouch = (e: TouchEvent) => {
    const touch = e.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Zone : 20% bas-droite
    if (x > w * 0.8 && y > h * 0.8) {
      tapCount++;
      clearTimeout(tapTimer);
      
      if (tapCount === 3) {
        setAdminPanelOpen(true);
        tapCount = 0;
      } else {
        tapTimer = setTimeout(() => { tapCount = 0; }, 1000);
      }
    }
  };
  
  window.addEventListener('touchend', handleTouch);
  return () => window.removeEventListener('touchend', handleTouch);
}, []);
```

---

## 🔒 Sécurité & Confidentialité

**⚠️ IMPORTANT :**
- Ces méthodes d'accès sont **confidentielles**
- Ne partagez qu'avec les personnes autorisées à gérer le catalogue
- Aucun bouton visible ne permet d'accéder au panel
- Les utilisateurs réguliers ne peuvent pas découvrir ces accès

### Récapitulatif des méthodes :

| Appareil | Méthode | Action | Implémentation |
|----------|---------|--------|----------------|
| 💻 **Desktop** | Clavier | Taper `admin2026` | Événement `keypress` |
| 📱 **Mobile** | Tactile | Triple-tap bas-droite | Événement `touchend` |

---

## 📅 Historique des modifications

| Date | Version | Modifications |
|------|---------|---------------|
| 2026-08-02 | 2.1.0 | Documentation complète avec implémentation technique |
| 2026-08-01 | 2.0.0 | Ajout triple-tap mobile + code clavier desktop |
| 2026-07-30 | 1.0.0 | Version initiale avec bouton Footer (supprimé) |

---

**Maintenu par :** Équipe Dev BenDjo  
**Contact technique :** Via WhatsApp +229 62 01 41 61
