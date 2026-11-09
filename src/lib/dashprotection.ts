// Service topics and plan descriptions migrated from the DashProtection website.
// Operational availability is confirmed with the customer, not presumed.
export const dashCategories = [
  { slug: "cameras", title: "Cameras & Camcorders", description: "Care and service enquiries for DSLRs, mirrorless and superzoom cameras, lenses, tough cameras and accessories.", short: "Cameras, lenses and accessories", icon: "camera" },
  { slug: "mobile", title: "Mobile Phones", description: "Phone and accessory assistance, including Bluetooth connectivity, speakers and mobile camera concerns.", short: "Phones, Bluetooth and accessories", icon: "phone" },
  { slug: "computers", title: "Computers & Tablets", description: "Computer, laptop, tablet, desktop, monitor, printer, scanner, storage, networking, eReader and software-related service enquiries.", short: "PCs, laptops, tablets and peripherals", icon: "monitor" },
  { slug: "appliances", title: "Kitchen Appliances", description: "Service enquiries for refrigerators, dishwashers, microwaves, purifiers, dryers, heaters, ovens, cookers and coffee machines.", short: "Everyday kitchen and home appliances", icon: "appliance" },
  { slug: "smart-home", title: "Smart Home Devices", description: "Help exploring care options for smart clocks, locks, doorbells, lights, Bluetooth products and connected-home devices.", short: "Connected home and smart devices", icon: "home" },
  { slug: "car-electronics", title: "Car Electronics", description: "Enquiries about vehicle electronic accessories, remote controls and integrated smart-car systems.", short: "Connected vehicle accessories", icon: "car" },
] as const;

export const dashSpecialties = [
  { title: "Network Connections", description: "Wi-Fi connectivity, network equipment, routers and related device-connection concerns." },
  { title: "Server Issues", description: "Server and connected-system enquiries, with scope and business requirements assessed before service." },
] as const;

// Separate DashProtection benefits from ResolveUS's existing consultation plans.
export const dashPlans = [
  { name: "Basic", price: "$20", unit: "/month", description: "For common device and software concerns.", features: ["Online support access", "Basic software and device troubleshooting", "Installation and update assistance", "Email and chat support"] },
  { name: "Premium", price: "$75", unit: "/month", description: "For more involved devices and connectivity needs.", features: ["Everything in Basic", "Advanced hardware and network troubleshooting", "Remote desktop assistance where appropriate", "Device performance and optimization assistance"] },
  { name: "Enterprise", price: "Custom", unit: "quote", description: "For business devices and wider team requirements.", features: ["Tailored business solutions", "Dedicated account management when contracted", "Phone, email and chat support options", "Multiple-device and team coordination"] },
] as const;

export const dashFaqs = [
  { question: "Is DashProtection part of ResolveUS?", answer: "Yes. DashProtection is the device-care service experience within ResolveUS. You can contact the same customer service team using support@resolve-us.com or (833) 216-2311." },
  { question: "Can you assist remotely or at my location?", answer: "DashProtection handles enquiries for remote and on-site device services. Availability of remote access, technician visits, in-store assistance and supported locations must be confirmed with our team before booking. Never share passwords or one-time codes in this form." },
  { question: "Are repairs or replacements guaranteed?", answer: "No repair outcome, technician visit or replacement is guaranteed by submitting an enquiry. We first review the device, location, issue and available service options and confirm any applicable scope and costs." },
  { question: "Are protection plans billed automatically on this website?", answer: "No. The displayed monthly amounts are plan rates for enquiries. This website does not take payments or initiate renewals; our team confirms coverage, available features, service period and payment arrangements separately before you agree." },
  { question: "How do refunds work?", answer: "Contact support@resolve-us.com. Refund eligibility depends on the agreed service and applicable law. Approved eligible refunds are issued within 14 calendar days of approval, subject to payment-provider posting times. See the ResolveUS Refund Policy." },
] as const;
