export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
};

export const products: Product[] = [
  {
    id: "vivaldi-follia",
    name: "Antonio Vivaldi - La Follia",
    price: 19.9,
    image: "/Antonio Vivaldi - La Follia_good.webp",
    description: "A fiery Baroque set dressed for modern quartet.",
  },
  {
    id: "kancheli-tango",
    name: "Giya Kancheli - Instead of a Tango",
    price: 14.9,
    image: "/Giya_Kancheli_Instead_of_a_Tango.webp",
    description: "Kancheli's smoky miniature with lyrical whispers.",
  },
  {
    id: "piazzolla-verano",
    name: "Astor Piazzolla - Verano Porteño",
    price: 14.9,
    image: "/Astor Piazzolla - Verano Porteño.webp",
    description: "Summer in Buenos Aires with taut rhythmic edges.",
  },
  {
    id: "piazzolla-otono",
    name: "Astor Piazzolla - Otoño Porteño",
    price: 19.9,
    image: "/Astor Piazzolla - Otoño Porteño.webp",
    description: "Autumnal tango with amber-toned harmonies.",
  },
  {
    id: "piazzolla-invierno",
    name: "Astor Piazzolla - Invierno Porteño",
    price: 19.9,
    image: "/Astor Piazzolla - Invierno Porteño.webp",
    description: "Winter in Buenos Aires, glassy and intimate.",
  },
  {
    id: "piazzolla-primavera",
    name: "Astor Piazzolla - Primavera Porteña",
    price: 19.9,
    image: "/Astor Piazzolla - Primavera Porteña.webp",
    description: "Spring blossoms with shimmering counter-lines.",
  },
  {
    id: "piazzolla-cuatro-estaciones",
    name: "Astor Piazzolla - Las Cuatro Estaciones Porteñas",
    price: 69.9,
    image: "/Astor Piazzolla - Las Cuatro Estaciones Porteñas.webp",
    description: "The full cycle: four portraits of Buenos Aires.",
  },
];
