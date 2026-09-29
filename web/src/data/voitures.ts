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
  statut: string;
  note: number;
  image: string;
};

export const voitures: Voiture[] = [
  {
    id: 1,
    slug: 'mercedes-300sl-gullwing',
    nom: 'Mercedes-Benz 300SL Gullwing',
    marque: 'Mercedes-Benz',
    annee: 1955,
    categorie: 'Sport',
    moteur: '6 cylindres en ligne',
    puissance: '215 ch',
    pays: 'Allemagne',
    description:
      'Voiture iconique de l’ère d’or du design allemand, la 300SL Gullwing reste un symbole de performance, de prestige et de technologie. Son toit papillon et ses lignes sculptées en font l’une des voitures les plus emblématiques de l’histoire automobile.',
    statut: 'En cours de restauration',
    note: 5,
    image: 'Mercedes_300SL_Gullwing.jpg',
  },
  {
    id: 2,
    slug: 'porsche-911-carrera',
    nom: 'Porsche 911 Carrera',
    marque: 'Porsche',
    annee: 1973,
    categorie: 'Sport',
    moteur: '6 cylindres à plat',
    puissance: '200 ch',
    pays: 'Allemagne',
    description:
      'La 911 Carrera associe une silhouette intemporelle à un comportement routier précis et très engageant. Elle incarne l’équilibre parfait entre héritage Porsche et plaisir de conduite pur.',
    statut: 'Très recherchée',
    note: 5,
    image: 'porsche911_carrera.png',
  },
  {
    id: 3,
    slug: 'jaguar-e-type',
    nom: 'Jaguar E-Type',
    marque: 'Jaguar',
    annee: 1961,
    categorie: 'Cabriolet',
    moteur: '6 cylindres en ligne',
    puissance: '265 ch',
    pays: 'Royaume-Uni',
    description:
      'La Jaguar E-Type, souvent considérée comme la plus belle voiture de tous les temps, séduit par ses lignes fluides et son caractère sportif. Une vraie légende des années 1960.',
    statut: 'En collection',
    note: 5,
    image: 'jaguar_Etype.jpg',
  },
  {
    id: 4,
    slug: 'bmw-m3-e30',
    nom: 'BMW M3 E30',
    marque: 'BMW',
    annee: 1987,
    categorie: 'Berline',
    moteur: '4 cylindres en ligne',
    puissance: '195 ch',
    pays: 'Allemagne',
    description:
      'Légendaire chez les passionnés, la BMW M3 E30 est une voiture de course homologuée pour la route. Son caractère brut, sa vivacité et son âme sportive en font un vrai classique.',
    statut: 'À restaurer',
    note: 4,
    image: 'bmw_m3_e30.jpg',
  },
  {
    id: 5,
    slug: 'ferrari-308-gts',
    nom: 'Ferrari 308 GTB',
    marque: 'Ferrari',
    annee: 1975,
    categorie: 'Coupé',
    moteur: 'V8',
    puissance: '240 ch',
    pays: 'Italie',
    description:
      'La Ferrari 308 GTB est l’une des italiennes les plus célèbres, avec un moteur V8 qui a fait son succès mondial. Elle symbolise la passion et l’exigence sportive de la marque au cheval cabré.',
    statut: 'Neuve au garage',
    note: 5,
    image: 'ferrari308_GTB.png',
  },
  {
    id: 6,
    slug: 'citroen-ds',
    nom: 'Citroën DS',
    marque: 'Citroën',
    annee: 1955,
    categorie: 'Berline',
    moteur: '6 cylindres',
    puissance: '75 ch',
    pays: 'France',
    description:
      'La Citroën DS avance comme un chef-d’œuvre de l’ingénierie française. Sa suspension hydropneumatique, son design novateur et son caractère avant-gardiste en ont fait une voiture révolutionnaire.',
    statut: 'Très prisée',
    note: 5,
    image: 'Citroën_DS.jpg',
  },
];
