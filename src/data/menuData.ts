import type { MenuCategory } from "../types/cafeTypes";

export const MENU_DATA: MenuCategory[] = [
  {
    name: "Coffee",
    items: [
      {
        id: "c1",
        name: "Signature Espresso",
        price: "$3.50",
        description: "Bold single-origin espresso with rich crema.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "c2",
        name: "Oat Milk Latte",
        price: "$5.00",
        description: "Smooth espresso with creamy oat milk, served hot or iced.",
        image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "c3",
        name: "Cold Brew",
        price: "$4.50",
        description: "Steeped for 18 hours, naturally smooth and low-acid.",
        image: "https://images.unsplash.com/photo-1508175800969-525c72a047dd?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "c4",
        name: "Flat White",
        price: "$4.00",
        description: "Velvety microfoam over a double ristretto shot.",
        image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Tea",
    items: [
      {
        id: "t1",
        name: "Matcha Latte",
        price: "$5.50",
        description: "Ceremonial-grade matcha whisked with steamed milk.",
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "t2",
        name: "Earl Grey",
        price: "$3.00",
        description: "Classic bergamot-infused black tea, served with lemon.",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "t3",
        name: "Chai Brew",
        price: "$4.00",
        description: "Spiced masala chai with cinnamon, cardamom, and ginger.",
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Snacks",
    items: [
      {
        id: "s1",
        name: "Avocado Toast",
        price: "$8.00",
        description: "Sourdough with smashed avocado, chili flakes, and a poached egg.",
        image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "s2",
        name: "Cheese Croissant",
        price: "$4.50",
        description: "Buttery croissant filled with gruyère and fresh herbs.",
        image: "https://images.unsplash.com/photo-1568471173242-461f0a730452?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "s3",
        name: "Granola Bowl",
        price: "$7.00",
        description: "House granola with Greek yogurt, honey, and seasonal fruit.",
        image: "https://images.unsplash.com/photo-1654923064926-be7e64267a31?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  {
    name: "Desserts",
    items: [
      {
        id: "d1",
        name: "Tiramisu",
        price: "$7.50",
        description: "Classic Italian dessert with espresso-soaked ladyfingers.",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "d2",
        name: "Lemon Tart",
        price: "$6.00",
        description: "Buttery pastry crust with zesty lemon curd and meringue.",
        image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "d3",
        name: "Chocolate Fondant",
        price: "$8.00",
        description: "Warm molten chocolate cake served with vanilla ice cream.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
];