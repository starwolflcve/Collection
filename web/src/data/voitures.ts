export type Voiture = {
  id: number;
  slug: string;
  nom: string;
  marque: string;
  annee: number;
  categorie: string;
  moteur: string;
  puissance: string;
  pays: string;
  description: string;
  statut?: string;
  note?: number;
  image: string;
};

type VoitureSeed = Omit<Voiture, 'id' | 'slug' | 'puissance' | 'statut' | 'note'> & {
  puissance: number;
};

const voituresSeed: VoitureSeed[] = [
  {
    nom: 'Porsche 911 Carrera', categorie: 'sportive', annee: 1973,
    description: 'Icône intemporelle du coupé sportif allemand.',
    marque: 'Porsche', moteur: '6 cylindres à plat', puissance: 210,
    pays: 'Allemagne', image: 'porsche911_carrera.png',
  },
  {
    nom: 'Ferrari 308 GTB', categorie: 'sportive', annee: 1975,
    description: 'Célèbre GT italienne au V8 central.',
    marque: 'Ferrari', moteur: 'V8', puissance: 255,
    pays: 'Italie', image: 'ferrari308_GTB.png',
  },
  {
    nom: 'Lamborghini Countach', categorie: 'sportive', annee: 1974,
    description: 'Silhouette futuriste devenue mythique.',
    marque: 'Lamborghini', moteur: 'V12', puissance: 375,
    pays: 'Italie', image: 'lamborghini_countach.png',
  },
  {
    nom: 'Chevrolet Corvette C3', categorie: 'sportive', annee: 1968,
    description: 'Muscle car américaine à la ligne agressive.',
    marque: 'Chevrolet', moteur: 'V8', puissance: 300,
    pays: 'Etats-Unis', image: 'chevrolet_corvette.jpg',
  },
  {
    nom: 'Alpine A110', categorie: 'sportive', annee: 1963,
    description: 'Légère et agile, star des rallyes français.',
    marque: 'Alpine', moteur: '4 cylindres', puissance: 138,
    pays: 'France', image: 'alpine_A110.jpg',
  },
  {
    nom: 'Datsun 240Z', categorie: 'sportive', annee: 1969,
    description: 'Coupé japonais qui a conquis le marché américain.',
    marque: 'Datsun', moteur: '6 cylindres en ligne', puissance: 151,
    pays: 'Japon', image: 'datsun_240z.jpg',
  },
  {
    nom: 'Toyota Supra Mk4', categorie: 'sportive', annee: 1993,
    description: 'Culte auprès des passionnés de tuning.',
    marque: 'Toyota', moteur: '6 cylindres turbo', puissance: 280,
    pays: 'Japon', image: 'toyota_supra_mk4.jpg',
  },
  {
    nom: 'Mazda RX-7', categorie: 'sportive', annee: 1978,
    description: 'Connue pour son moteur rotatif Wankel.',
    marque: 'Mazda', moteur: 'Rotatif', puissance: 200,
    pays: 'Japon', image: 'mazda_Rx7.jpg',
  },
  {
    nom: 'BMW M3 E30', categorie: 'sportive', annee: 1986,
    description: 'Référence des berlines sportives compactes.',
    marque: 'BMW', moteur: '4 cylindres', puissance: 200,
    pays: 'Allemagne', image: 'bmw_m3_e30.jpg',
  },
  {
    nom: 'Jaguar E-Type', categorie: 'sportive', annee: 1961,
    description: "Souvent citée comme l'une des plus belles voitures jamais dessinées.",
    marque: 'Jaguar', moteur: '6 cylindres en ligne', puissance: 265,
    pays: 'Royaume-Uni', image: 'jaguar_Etype.jpg',
  },
  {
    nom: 'Mercedes-Benz 300SL Gullwing', categorie: 'coupe', annee: 1955,
    description: 'Célèbre pour ses portes papillon et son palmarès en course.',
    marque: 'Mercedes-Benz', moteur: '6 cylindres en ligne (injection)', puissance: 215,
    pays: 'Allemagne', image: 'Mercedes_300SL_Gullwing.jpg',
  },
  {
    nom: 'Citroën SM', categorie: 'coupe', annee: 1970,
    description: 'Grand tourisme français à la technologie avant-gardiste.',
    marque: 'Citroën', moteur: 'V6 Maserati', puissance: 170,
    pays: 'France', image: 'Citroën_SM.jpg',
  },
  {
    nom: 'Ford Mustang Fastback', categorie: 'coupe', annee: 1967,
    description: 'Modèle emblématique du pony car américain.',
    marque: 'Ford', moteur: 'V8', puissance: 225,
    pays: 'Etats-Unis', image: 'Ford_Mustang_Fastback.jpg',
  },
  {
    nom: 'Peugeot 504 Coupé', categorie: 'coupe', annee: 1969,
    description: 'Élégance française signée Pininfarina.',
    marque: 'Peugeot', moteur: '4 cylindres', puissance: 97,
    pays: 'France', image: 'Peugeot_504_Coupé.jpg',
  },
  {
    nom: 'Alfa Romeo GTV', categorie: 'coupe', annee: 1976,
    description: 'Coupé italien réputé pour sa tenue de route.',
    marque: 'Alfa Romeo', moteur: 'V6', puissance: 160,
    pays: 'Italie', image: 'Alfa_Romeo_GTV.jpg',
  },
  {
    nom: 'Volvo P1800', categorie: 'coupe', annee: 1961,
    description: 'Ligne racée pour un coupé suédois réputé pour sa fiabilité.',
    marque: 'Volvo', moteur: '4 cylindres', puissance: 100,
    pays: 'Suède', image: 'Volvo_P1800.jpg',
  },
  {
    nom: 'Honda Prelude', categorie: 'coupe', annee: 1987,
    description: 'Coupé japonais réputé pour son châssis équilibré.',
    marque: 'Honda', moteur: '4 cylindres', puissance: 135,
    pays: 'Japon', image: 'Honda_Prelude.jpg',
  },
  {
    nom: 'Opel Manta', categorie: 'coupe', annee: 1970,
    description: 'Rivale allemande directe de la Ford Capri.',
    marque: 'Opel', moteur: '4 cylindres', puissance: 90,
    pays: 'Allemagne', image: 'Opel_Manta.jpg',
  },
  {
    nom: 'Renault Alpine A310', categorie: 'coupe', annee: 1971,
    description: "Silhouette futuriste héritée de l'A110.",
    marque: 'Alpine', moteur: 'V6', puissance: 150,
    pays: 'France', image: 'Renault_Alpine_A310.jpg',
  },
  {
    nom: 'Fiat 130 Coupé', categorie: 'coupe', annee: 1971,
    description: 'Grand coupé italien dessiné par Pininfarina.',
    marque: 'Fiat', moteur: 'V6', puissance: 140,
    pays: 'Italie', image: 'Fiat_130_Coupé.jpg',
  },
  {
    nom: 'Citroën DS', categorie: 'berline', annee: 1955,
    description: 'Révolutionnaire par sa suspension hydropneumatique.',
    marque: 'Citroën', moteur: '4 cylindres', puissance: 75,
    pays: 'France', image: 'Citroën_DS.jpg',
  },
  {
    nom: 'Mercedes-Benz W123', categorie: 'berline', annee: 1976,
    description: 'Réputée pour sa robustesse à toute épreuve.',
    marque: 'Mercedes-Benz', moteur: '4 cylindres', puissance: 95,
    pays: 'Allemagne', image: 'Mercedes-Benz_W123.jpg',
  },
  {
    nom: 'BMW Série 5 E28', categorie: 'berline', annee: 1981,
    description: 'Référence de la berline sportive premium.',
    marque: 'BMW', moteur: '6 cylindres', puissance: 125,
    pays: 'Allemagne', image: 'BMW_Série_5 E28.jpg',
  },
  {
    nom: 'Peugeot 504', categorie: 'berline', annee: 1968,
    description: 'Berline robuste, best-seller africain.',
    marque: 'Peugeot', moteur: '4 cylindres', puissance: 79,
    pays: 'France', image: 'Peugeot 504.jpg',
  },
  {
    nom: 'Volvo 240', categorie: 'berline', annee: 1974,
    description: 'Symbole de sécurité et de longévité suédoises.',
    marque: 'Volvo', moteur: '4 cylindres', puissance: 97,
    pays: 'Suède', image: 'Volvo_240.jpg',
  },
  {
    nom: 'Lancia Beta Berlina', categorie: 'berline', annee: 1972,
    description: 'Berline italienne au design signé Pininfarina.',
    marque: 'Lancia', moteur: '4 cylindres', puissance: 90,
    pays: 'Italie', image: 'Lancia_Beta_Berlina.jpg',
  },
  {
    nom: 'Renault 12', categorie: 'berline', annee: 1969,
    description: 'Berline populaire française à large diffusion.',
    marque: 'Renault', moteur: '4 cylindres', puissance: 54,
    pays: 'France', image: 'Renault_12.jpg',
  },
  {
    nom: 'Toyota Crown', categorie: 'berline', annee: 1971,
    description: 'Berline haut de gamme japonaise.',
    marque: 'Toyota', moteur: '6 cylindres en ligne', puissance: 115,
    pays: 'Japon', image: 'Toyota Crown.jpg',
  },
  {
    nom: 'Audi 100', categorie: 'berline', annee: 1968,
    description: "Première grande berline moderne d'Audi.",
    marque: 'Audi', moteur: '4 cylindres', puissance: 85,
    pays: 'Allemagne', image: 'Audi_100.jpg',
  },
  {
    nom: 'Chevrolet Impala', categorie: 'berline', annee: 1967,
    description: 'Grande berline américaine emblématique.',
    marque: 'Chevrolet', moteur: 'V8', puissance: 250,
    pays: 'Etats-Unis', image: 'Chevrolet_Impala.jpg',
  },
  {
    nom: 'Range Rover Classic', categorie: 'suv', annee: 1970,
    description: 'Pionnier du SUV de luxe britannique.',
    marque: 'Land Rover', moteur: 'V8', puissance: 135,
    pays: 'Royaume-Uni', image: 'Range_Rover_Classic.jpg',
  },
  {
    nom: 'Toyota Land Cruiser 40', categorie: 'suv', annee: 1960,
    description: 'Tout-terrain increvable, culte au Japon comme en Afrique.',
    marque: 'Toyota', moteur: '6 cylindres en ligne', puissance: 105,
    pays: 'Japon', image: 'Toyota_Land_Cruiser_40.jpg',
  },
  {
    nom: 'Jeep CJ-5', categorie: 'suv', annee: 1954,
    description: 'Descendante directe des jeeps militaires américaines.',
    marque: 'Jeep', moteur: '4 cylindres', puissance: 72,
    pays: 'Etats-Unis', image: 'Jeep CJ-5.jpg',
  },
  {
    nom: 'Mercedes-Benz Classe G', categorie: 'suv', annee: 1979,
    description: 'Tout-terrain increvable devenu icône urbaine.',
    marque: 'Mercedes-Benz', moteur: '6 cylindres', puissance: 150,
    pays: 'Allemagne', image: 'Mercedes_Benz_Classe_G.jpg',
  },
  {
    nom: 'Suzuki Jimny', categorie: 'suv', annee: 1970,
    description: 'Petit tout-terrain japonais increvable.',
    marque: 'Suzuki', moteur: '4 cylindres', puissance: 33,
    pays: 'Japon', image: 'Suzuki_Jimny.jpg',
  },
  {
    nom: 'Lada Niva', categorie: 'suv', annee: 1977,
    description: '4x4 soviétique réputé pour sa simplicité mécanique.',
    marque: 'Lada', moteur: '4 cylindres', puissance: 75,
    pays: 'URSS', image: 'Lada_Niva.jpg',
  },
  {
    nom: 'Citroën Type H', categorie: 'utilitaire', annee: 1947,
    description: 'Fourgon tôle ondulée devenu icône rétro française.',
    marque: 'Citroën', moteur: '4 cylindres', puissance: 45,
    pays: 'France', image: 'Citroën_Type_H.jpg',
  },
  {
    nom: 'Volkswagen Combi T1', categorie: 'utilitaire', annee: 1950,
    description: 'Symbole du van vintage, très recherché en collection.',
    marque: 'Volkswagen', moteur: '4 cylindres à plat', puissance: 25,
    pays: 'Allemagne', image: 'Volkswagen Combi T1.jpg',
  },
  {
    nom: 'Renault Estafette', categorie: 'utilitaire', annee: 1959,
    description: 'Utilitaire français à traction avant, très diffusé.',
    marque: 'Renault', moteur: '4 cylindres', puissance: 30,
    pays: 'France', image: 'Renault_Estafette.jpg',
  },
  {
    nom: 'Ford Transit Mk1', categorie: 'utilitaire', annee: 1965,
    description: "Fourgon fondateur d'une longue lignée toujours en production.",
    marque: 'Ford', moteur: '6 cylindres en ligne', puissance: 68,
    pays: 'Royaume-Uni', image: 'Ford_Transit_Mk1.jpg',
  },
];

function creerSlug(nom: string): string {
  return nom
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const voitures: Voiture[] = voituresSeed.map((voiture, index) => ({
  ...voiture,
  id: index + 1,
  slug: creerSlug(voiture.nom),
  puissance: `${voiture.puissance} ch`,
}));