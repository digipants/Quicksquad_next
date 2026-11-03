export interface Plan {
  title: string;
  price: number;
  displayPrice: string;
  features: string[];
}

// Keep checkout amounts, prices, and entitlements together as the source of truth.
export const plans: Plan[] = [
  {
    title: "Basic Plan",
    price: 2000,
    displayPrice: "$20/month",
    features: [
      "Access to everyday consultation guidance",
      "Help with common questions and planning decisions",
      "Email and chat assistance",
      "Clear next-step recommendations",
    ],
  },
  {
    title: "Premium Plan",
    price: 7500,
    displayPrice: "$75/month",
    features: [
      "Everything in the Basic Plan",
      "Priority consultation handling",
      "Deeper research and comparison guidance",
      "Complex case coordination",
    ],
  },
  {
    title: "Enterprise Plan",
    price: 0,
    displayPrice: "Custom Pricing",
    features: [
      "Tailored solutions for businesses",
      "Dedicated account manager",
      "Phone, email, and chat consultation access",
      "Scalability for teams, departments, and workflows",
    ],
  },
];
