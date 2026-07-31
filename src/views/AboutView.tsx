import React from 'react';
import { PageView } from '../types';
import { TestimonialsSection } from '../components/TestimonialsSection';
import founderImg from '../assets/images/bendjo_founder_benedite_1785483963462.jpg';
import standImg from '../assets/images/bendjo_stand_event_1785483952441.jpg';
import { motion } from 'framer-motion';
import {
  Leaf,
  Heart,
  Award,
  Users,
  Target,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface AboutViewProps {
  setCurrentView: (view: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setCurrentView }) => {
  return (
    <div className="pt-28 pb-16 space-y-16 overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[#FFF7ED] via-[#FAF6F0] to-[#FAF6F0] py-16 border-b border-[#EA580C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EA580C]/30 text-[#EA580C] text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Leaf className="w-3.5 h-3.5" />
            <span>Notre ADN & Notre Vision</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#1F2421] max-w-3xl mx-auto leading-tight">
            Redonner au terroir béninois la place d'honneur qu'il mérite
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto leading-relaxed">
            Née à Cotonou, BenDjo est bien plus qu'une marque de tisanes : c'est un hommage vibrant aux plantes bienfaisantes du Bénin et à un art de vivre sain et moderne.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 1. NAISSANCE DE BENDJO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#EA580C]">
              01. Naissance de BenDjo
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1F2421]">
              Pourquoi et comment l'aventure a démarré à Cotonou
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Le constat sur le marché béninois était saisissant : alors que le Bénin regorge de plantes aromatiques et médicinales d'une richesse exceptionnelle (Hibiscus d'Afrique de l'Ouest, Basilic, Citronnelle vivifiante, Laurier, Clou de Girofle), les consommateurs et les entreprises de Cotonou s'orientaient trop souvent vers des sodas industriels hyper-sucrés et des thés synthétiques importés.
            </p>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              C'est pour corriger cette situation et offrir une alternative pure, moderne et élégante qu'a été créée la marque <strong>BenDjo</strong>. L'ambition : sublimer les feuilles et fleurs locales en sachets individuellement scellés (proposés à <strong>1500 FCFA</strong> le paquet), tout en instaurant des pauses gourmandes et équilibrées dans les entreprises.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white"
            >
              <img
                src={standImg}
                alt="Plantes naturelles et stands événements BenDjo"
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="text-xs font-extrabold text-[#F97316] uppercase">
                  Engagement Terroir Pur
                </div>
                <div className="font-heading font-extrabold text-base">
                  100% Ingrédients du Bénin sans aucun additif chimique
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. POURQUOI CE DOMAINE */}
        <section className="p-6 sm:p-10 rounded-3xl bg-white border border-[#EA580C]/20 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#EA580C]">
              02. Pourquoi ce Domaine
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1F2421]">
              Infusions naturelles & Restauration en entreprise : Une synergie évidente
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-[#FFF7ED] border border-[#EA580C]/20 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center font-extrabold">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-[#1F2421]">
                Valorisation de la Santé & du Terroir
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Les tisanes Hibiscus, Basilic et Citronnelle apportent de véritables bienfaits : hydratation profonde, apaisement du stress, stimulation digestive et apport en vitamines C et antioxydants. Chaque tasse réaffirme la fierté de nos racines béninoises.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFF7ED] border border-[#EA580C]/20 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A36]/10 text-[#2D5A36] flex items-center justify-center font-extrabold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-[#1F2421]">
                Restauration Corporate & Bien-être au Travail
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                En proposant des petits-déjeuners équilibrés accompagnés de thé chaud naturel, BenDjo redynamise le quotidien des équipes dans plus de 50 entreprises partenaires à Cotonou et Abomey-Calavi.
              </p>
            </div>
          </div>
        </section>

        {/* 3. PRÉSENTATION DE LA CO-FONDATRICE */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1F2421] via-[#2D5A36] to-[#1C261D] text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border border-[#D64545]/30">
          <div className="lg:col-span-5 relative space-y-4">
            <div className="w-full h-[420px] rounded-2xl overflow-hidden border-2 border-white/20 relative shadow-2xl">
              <img
                src={founderImg}
                alt="Bénédite Lovi - Co-fondatrice de BenDjo & Fondatrice de TTI"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <div className="font-heading font-extrabold text-xl text-white">
                  Bénédite Lovi
                </div>
                <div className="text-xs text-[#E895A3] font-extrabold uppercase tracking-wider">
                  Co-fondatrice de BenDjo • Présidente Fondatrice de TTI
                </div>
              </div>
            </div>

            {/* Honors & Key Milestones Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#D64545] text-white shadow-xs">
                INSTI Bénin (Électronique-Électrotechnique)
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#2D5A36] text-white border border-white/20">
                Master Data Science & IA
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-500 text-stone-900 font-bold">
                Prix SUNA 2022 (Smart Agri)
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-blue-600 text-white">
                DSI AWARDS 2023 (Kids Innov)
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E895A3]">
                03. Parcours de la Co-fondatrice
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-tight">
                Bénédite Lovi — Entrepreneure Tech & Co-fondatrice de BenDjo
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
              <p>
                Titulaire d'un diplôme en électronique-électrotechnique, obtenu à l'Institut National Supérieur de Technologie Industrielle (INSTI Bénin), <strong>Bénédite Lovi</strong> est la présidente fondatrice de TTI - Taka Tech Innov by Human AI, une start-up lancée en 2020 au Bénin pour offrir des services technologiques de pointe. Co-fondatrice visionnaire de la marque <strong>BenDjo</strong>, elle met sa rigueur scientifique et son leadership d'excellence au service de la valorisation des ressources botaniques et du patrimoine naturel béninois.
              </p>
              <p>
                Son entreprise a mis en œuvre des projets phares à fort impact social et technologique :
              </p>
              <ul className="space-y-2 pl-4 list-disc text-stone-300 text-xs">
                <li>
                  <strong className="text-white">LOVLAV :</strong> Un dispositif d'hygiène et de lavage des mains automatique soutenu par l’Agence Universitaire de la Francophonie (AUF) dès 2020.
                </li>
                <li>
                  <strong className="text-white">Smart Agri :</strong> Une solution d'irrigation autonome primée au Salon des Utilisateurs et des promoteurs du Numérique dans l’Agriculture (SUNA) 2022.
                </li>
                <li>
                  <strong className="text-white">Kids Innov Class :</strong> Un programme initiant les enfants à l'électronique et à la programmation dans les écoles primaires et secondaires, distingué par la deuxième place aux DSI AWARDS 2023 dans la catégorie meilleure école de formation.
                </li>
              </ul>
              <p>
                Passionnée par la data science et l'application de l'IA dans des contextes urbains durables, elle se consacre actuellement à un Master spécialisé afin d'enrichir son expertise. À travers ses fonctions de coordonnatrice Afrique de Human AI et son rôle de chef de projet, elle déploie des compétences de premier plan en gestion d'équipe et en pilotage de solutions technologiques.
              </p>
              <p>
                Sa maîtrise de l'intelligence artificielle et ses réussites d'envergure lui valent d'être régulièrement invitée à travers l'Afrique pour intervenir lors de conférences prestigieuses, telles que l'Africa Smart City Forum. Elle est également honorée en France et au Maroc lors de la Semaine l'Afrique des Solutions (SAS) 2024 pour faire rayonner l'innovation béninoise.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 text-xs text-stone-200 space-y-3">
              <p className="italic leading-relaxed">
                « Allier l'exigence de la technologie moderne à la pureté des plantes aromatiques du Bénin : c'est ainsi que BenDjo réinvente l'art de l'infusion et le bien-être de nos communautés. »
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10">
                <span className="font-brittany text-3xl sm:text-4xl text-amber-200 font-normal leading-none select-none">
                  Bénédite Lovi
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E895A3]">
                  Co-fondatrice de BenDjo & Fondatrice de TTI
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ANCRAGE LOCAL & ENGAGEMENTS */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#EA580C]">
              Nos Engagements Éthiques
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1F2421]">
              Une entreprise responsable basée à Cotonou
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#EA580C]/20 space-y-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center mx-auto font-extrabold">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold font-heading text-base text-[#1F2421]">Emploi Local Béninois</h4>
              <p className="text-xs text-stone-600">
                Une équipe basée à Cotonou valorisant les compétences et le savoir-faire local.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EA580C]/20 space-y-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#2D5A36]/10 text-[#2D5A36] flex items-center justify-center mx-auto font-extrabold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold font-heading text-base text-[#1F2421]">Circuits Courts Directs</h4>
              <p className="text-xs text-stone-600">
                Sourcing direct auprès des groupements d'agriculteurs du Bénin pour garantir la traçabilité.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#EA580C]/20 space-y-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center mx-auto font-extrabold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold font-heading text-base text-[#1F2421]">Emballages Éco-Conçus</h4>
              <p className="text-xs text-stone-600">
                Étuis soignés avec sachets individuellement scellés assurant une fraîcheur maximale.
              </p>
            </div>
          </div>
        </section>

        {/* 5. TÉMOIGNAGES CLIENTS ANONYMES */}
        <TestimonialsSection />

        {/* CTA towards Services */}
        <div className="p-8 rounded-3xl bg-[#FFF7ED] border border-[#EA580C]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold font-heading text-[#1F2421]">
              Découvrez toutes nos offres & services
            </h3>
            <p className="text-xs text-stone-600">
              Tisanes en paquets de 1500 FCFA, petits-déjeuners B2B et traiteur événementiel à Cotonou.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentView('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#d94e02] text-white font-extrabold text-xs transition-all shrink-0 flex items-center gap-2 shadow-sm"
          >
            <span>Voir la page Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

