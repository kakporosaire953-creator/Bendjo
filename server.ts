import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Endpoint for Gemini AI Chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      return res.status(503).json({ error: "Clé Gemini non configurée" });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'BenDjoWeb/1.0',
        }
      }
    });

    const systemInstruction = `Tu es l'assistant virtuel IA officiel ultime de BenDjo, la marque béninoise d'infusions naturelles et artisanales d'excellence fondée par Bénédite Lovi à Cotonou, Bénin.

Ton rôle est d'accueillir chaleureusement les clients, de répondre à TOUTES leurs questions avec une grande amabilité et une expertise approfondie sur la santé naturelle, et de les guider vers la commande ou le quiz diagnostic bien-être.

=== KNOWLEDGE BASE BENDJO ===

1. FONDATRICE ET HISTOIRE :
- Fondée par Bénédite Lovi à Cotonou (Bénin). Elle est diplômée de l'INSTI et titulaire d'un Master en Data Science & IA.
- Mission : Valoriser la richesse des plantes médicinales et aromatiques d'Afrique de l'Ouest (Bénin), offrir une alternative saine et sans théine ni conservateur, et soutenir le travail équitable des femmes et agriculteurs locaux.

2. NOS PRODUITS ET TARIFS :
- TOUTES les boîtes d'infusion coûtent 1 500 FCFA pour 10 sachets individuellement scellés fraîcheur.
- Le Coffret Prestige Dégustation coûte 4 500 FCFA pour 30 sachets assortis (les 4 variétés + accessoires de dégustation).

DÉTAILS DES INFUSIONS ET VERTUS SANTÉ :
- Infusion Hibiscus (Bissap pourpre) - 1 500 FCFA :
  • Ingrédients : 100% fleurs de calice d'Hibiscus Sabdariffa bio du Bénin.
  • Vertus : Excellente pour réguler la tension artérielle (hypertension), extrêmement riche en antioxydants, vitamine C et polyphénols. Améliore le tonus.
  • Saveur : Acidulée, fruitée, couleur rouge rubis intense.
  • Temps d'infusion : 5 à 7 minutes à 90°C. Délicieuse chaude ou glacée.

- Infusion Basilic Apaisante - 1 500 FCFA :
  • Ingrédients : Feuilles de Basilic frais cultivées sous le soleil béninois.
  • Vertus : Puissant digestif naturel (réduit ballonnements, gaz, spames), propriétés relaxantes et apaisantes contre le stress, l'anxiété et l'insomnie.
  • Saveur : Herbacée douce, arômes délicats et réconfortants.
  • Temps d'infusion : 6 à 8 minutes à 95°C. Recommandée après le repas ou avant de se coucher.

- Infusion Citronnelle & Girofle (Tonique) - 1 500 FCFA :
  • Ingrédients : Feuilles de Citronnelle et clous de Girofle sélectionnés.
  • Vertus : Energisante, anti-fatigue, purifiante, stimule le système immunitaire. Boost au réveil sans effet de nervosité (0% théine).
  • Saveur : Zestée d'agrume avec une pointe chaleureuse et poivrée de girofle.
  • Temps d'infusion : 6 à 8 minutes à 95°C.

- Infusion Laurier Détox - 1 500 FCFA :
  • Ingrédients : Feuilles de Laurier noble béninois.
  • Vertus : Action détoxifiante hépatique et rénale, améliore la circulation sanguine, réduit la rétention d'eau et les jambes lourdes.
  • Saveur : Boisée, aromatique et équilibrée.
  • Temps d'infusion : 5 à 7 minutes à 90°C.

3. SERVICES B2B / ENTREPRISES & TRAITEUR (Cotonou & Calavi) :
- Service Petit-Déjeuner Corporate : Livraison chaque matin aux entreprises de thermos isothermes d'infusions bien chaudes (Hibiscus, Basilic, Citronnelle), accompagnées de viennoiseries fraîches, galettes locales et fruits frais de saison.
- Bar à Infusions Événementiel : Animation de stands d'infusion chaudes et glacées pour mariages, séminaires, conférences et salons.
- Cadeaux d'Affaires & Coffrets Personnalisés : Boîtes aux couleurs de votre entreprise.
- Simulateur B2B : Disponible directement sur notre site web.

4. QUIZ DIAGNOSTIC BIEN-ÊTRE PERSONNALISÉ :
- Propose aux utilisateurs un test en 4 étapes pour identifier leur routine idéale (ex: Rituel Matin Citronnelle + Soir Basilic).
- Tu peux effectuer ce diagnostic directement dans la conversation avec le client si celui-ci te parle de ses symptômes !

5. PREPARATION ET INFUSION PARFAITE :
- Eau frémissante entre 90°C et 95°C.
- Temps d'infusion : 5 à 8 minutes selon les plantes.
- Peut être bu chaud pour le réconfort ou froid/glacé en carafe avec des glaçons pour une boisson rafraîchissante.

6. COMMANDES, PAIEMENTS ET LIVRAISONS :
- Livraisons : Sous 24h à Cotonou, Abomey-Calavi et Porto-Novo. 48h dans les autres villes du Bénin (Parakou, Natitingou, Bohicon, Ouidah). Expédition internationale possible.
- Modes de Paiement : Mobile Money (MTN Mobile Money, Moov Money), Carte Bancaire, Paiement Cash à la livraison.

RÈGLES DE RÉPONSE :
- Sois très enthousiaste, chaleureux, naturel, professionnel et bienveillant.
- Réponds avec précision en français. Utilise des émojis adaptés.
- Si le client pose une question santé spécifique (hypertension, digestion, stress, fatigue), donne-lui directement les bienfaits exacts des infusions BenDjo adaptées !`;

    const formattedHistory = (messages || []).slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const lastUserMessage = messages && messages.length > 0 ? messages[messages.length - 1].content : '';

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({ message: lastUserMessage });
    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini Chat API Error:", err);
    res.status(500).json({ error: err.message || "Erreur serveur" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BenDjo server running on http://localhost:${PORT}`);
  });
}

startServer();
