import multigrainAttaImg from '../assets/images/multigrain-atta.png';
import multigrainAttaDetailImg from '../assets/images/multigrain-atta-detail.png';
import grainWheelImg from '../assets/images/grain-wheel.png';
import sugarControlAttaImg from '../assets/images/sugar-control-atta.png';
import sugarControlAttaDetailImg from '../assets/images/sugar-control-atta-detail.png';
import sugarControlGrainWheelImg from '../assets/images/sugar-control-grain-wheel.png';
import mixedMilletMurmuraImg from '../assets/images/mixed-millet-murmura.png';
import mixedMilletMurmuraDetailImg from '../assets/images/mixed-millet-murmura-detail.png';
import kidsMilletMurmuraImg from '../assets/images/kids-millet-murmura.png';
import kidsMilletMurmuraDetailImg from '../assets/images/kids-millet-murmura-detail.png';

export const products = [
  {
    id: "multigrain-atta",
    name: "Multigrain Atta",
    tagline: "Mill से दिल तक",
    description: "A wholesome blend of 9 grains — stone ground & cold milled for maximum nutrition. High fibre, protein-rich, and zero preservatives.",
    features: [
      "Rich in dietary fibre for better digestion",
      "High protein content — 12g per 100g",
      "Crafted with 9 healthy blend of grains",
      "No maida, no preservatives, no additives"
    ],
    badges: ["High Fibre", "Protein-Rich"],
    image: multigrainAttaImg,
    detailImage: multigrainAttaDetailImg,
    grainWheel: grainWheelImg,
    variants: [
      { weight: "1 Kg", price: 72, mrp: 99 },
      { weight: "5 Kg", price: 360, mrp: 495 },
      { weight: "10 Kg", price: 720, mrp: 990 }
    ],
    category: "atta"
  },
  {
    id: "sugar-control-atta",
    name: "Sugar-Control Atta",
    tagline: "For Balanced Sugar Control",
    description: "A 12-grain power blend crafted for diabetes care. Low glycemic index ingredients, heart friendly, and made with premium MP Sharbati wheat.",
    features: [
      "Low Glycaemic Index — manages blood sugar",
      "High fibre slows glucose absorption",
      "Fenugreek husk for sugar control",
      "Ideal for diabetics & pre-diabetic",
      "Nutritionist recommended formulation"
    ],
    badges: ["Low Glycemic Index", "Diabetes Care"],
    image: sugarControlAttaImg,
    detailImage: sugarControlAttaDetailImg,
    grainWheel: sugarControlGrainWheelImg,
    variants: [
      { weight: "1 Kg", price: 99, mrp: 149 },
      { weight: "5 Kg", price: 495, mrp: 749 },
      { weight: "10 Kg", price: 990, mrp: 1499 }
    ],
    category: "atta"
  },
  {
    id: "mixed-millet-murmura",
    name: "Mixed Millet Murmura",
    tagline: "Goodness of Ragi, Jowar & Bajra",
    description: "A crunchy, nutritious snack made from goodness of Ragi, Jowar & Bajra. No preservatives, no artificial stuff — just pure millet crunch.",
    features: [
      "Zero preservatives — pure and natural",
      "High fibre content from premium millets",
      "Scientifically balanced nutrition",
      "No artificial colours or additives",
      "Healthy and tasty"
    ],
    badges: ["Nutritious", "No Preservatives"],
    image: mixedMilletMurmuraImg,
    detailImage: mixedMilletMurmuraDetailImg,
    grainWheel: null,
    variants: [
      { weight: "150 gm", price: 99, mrp: 149 }
    ],
    category: "snack"
  },
  {
    id: "kids-millet-murmura",
    name: "Kids Special Millet Murmura",
    tagline: "Specially Made for Kids",
    description: "A specially crafted nutritious snack for kids made from goodness of Ragi, Jowar & Bajra. Packed with essential nutrients for growing children. No preservatives, no artificial stuff.",
    features: [
      "Zero preservatives — pure and natural",
      "Scientifically balanced nutrition",
      "No artificial colours or additives",
      "Healthy and tasty",
      "Nutritious and kid friendly snack"
    ],
    badges: ["Kids Special", "Nutrient-Rich", "No Preservatives"],
    image: kidsMilletMurmuraImg,
    detailImage: kidsMilletMurmuraDetailImg,
    grainWheel: null,
    variants: [
      { weight: "150 gm", price: 99, mrp: 149 }
    ],
    category: "snack"
  }

];

export const getProduct = (id) => products.find(p => p.id === id);