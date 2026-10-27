export const clinic = {
  name: "Dental Cure Clinic",
  shortName: "Dental Cure",
  tagline: "Gentle dentistry, thoughtfully delivered.",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "919876543210",
  email: "hello@dentalcureclinic.in",
  address: "24 Green Park Avenue, Koramangala, Bengaluru, Karnataka 560034",
  maps: "https://maps.google.com/?q=Green+Park+Avenue+Koramangala+Bengaluru",
  hours: [
    ["Monday – Friday", "9:00 AM – 8:00 PM"],
    ["Saturday", "9:00 AM – 5:00 PM"],
    ["Sunday", "Closed (emergency support available)"],
  ],
};

export const services = [
  { slug: "preventive-dentistry", name: "Preventive Dentistry", short: "Routine checkups, cleanings and oral-health guidance for every age.", icon: "Sparkles", image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=85", benefits: ["Digital oral examination", "Professional cleaning", "Personalised prevention plan"] },
  { slug: "restorative-dentistry", name: "Restorative Dentistry", short: "Comfortable, durable solutions for damaged or missing teeth.", icon: "ShieldCheck", image: "https://images.unsplash.com/photo-1581585099402-5b7a5e5e0f2d?auto=format&fit=crop&w=1200&q=85", benefits: ["Tooth-coloured fillings", "Crowns and bridges", "Care-focused restoration"] },
  { slug: "cosmetic-dentistry", name: "Cosmetic Dentistry", short: "Subtle enhancements designed around your comfort and natural smile.", icon: "Smile", image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=85", benefits: ["Smile consultation", "Teeth whitening", "Veneer planning"] },
  { slug: "root-canal-treatment", name: "Root Canal Care", short: "Modern, reassuring endodontic care to help save your natural tooth.", icon: "HeartPulse", image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85", benefits: ["Digital assessment", "Gentle treatment", "Clear care timeline"] },
  { slug: "dental-implants", name: "Dental Implants", short: "A thoughtful, staged path to restoring missing teeth.", icon: "Anchor", image: "https://images.unsplash.com/photo-1593871075120-982e042088d8?auto=format&fit=crop&w=1200&q=85", benefits: ["Detailed consultation", "Digital planning", "Dedicated aftercare"] },
  { slug: "child-dentistry", name: "Child Dentistry", short: "Positive, pressure-free dental visits that help kids feel at ease.", icon: "Heart", image: "https://images.unsplash.com/photo-1609840112995-78c2c10b5d0a?auto=format&fit=crop&w=1200&q=85", benefits: ["Friendly first visits", "Early care education", "Preventive focus"] },
];

export const dentists = [
  { slug: "dr-aarav-mehta", name: "Dr. Aarav Mehta", qualification: "BDS, MDS — Prosthodontics", bio: "Known for a calm, conservative approach to restorative and cosmetic dentistry.", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85" },
  { slug: "dr-meera-iyer", name: "Dr. Meera Iyer", qualification: "BDS, MDS — Pedodontics", bio: "Creates warm, reassuring dental experiences for children and anxious patients.", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85" },
  { slug: "dr-kabir-shah", name: "Dr. Kabir Shah", qualification: "BDS, MDS — Endodontics", bio: "Focuses on precise, gentle care that helps patients feel informed at every step.", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=85" },
];

export const faqs = [
  { question: "Does an appointment request confirm my visit?", answer: "No. Your request is sent to our reception team, who will contact you by phone or email to confirm the date and time." },
  { question: "How early should I book?", answer: "For routine consultations, a few days' notice is helpful. For urgent concerns, call the clinic directly so we can guide you appropriately." },
  { question: "What should I bring to my first appointment?", answer: "Please bring any medicines you currently take and any relevant dental records or X-rays you already have." },
  { question: "Can I request an appointment online?", answer: "Yes. Use the appointment form to share your preferred date and time. The clinic will confirm availability manually." },
  { question: "Do you treat children?", answer: "Yes. We offer child-friendly checkups, preventive care and treatment with a focus on making every visit comfortable." },
];

export const testimonials = [
  { quote: "The entire team made me feel genuinely comfortable. Everything was explained before we began, and there was never any pressure to rush.", name: "Placeholder patient A", detail: "Treatment feedback · Demo content" },
  { quote: "My daughter's first dental visit was surprisingly positive. The staff were patient, kind and excellent at explaining each step.", name: "Placeholder parent B", detail: "Child dentistry · Demo content" },
  { quote: "A calm, clean clinic with a very thoughtful team. I appreciated the clear aftercare guidance and follow-up call.", name: "Placeholder patient C", detail: "Restorative care · Demo content" },
];

export const offers = [
  { title: "New patient consultation", description: "A comprehensive first visit with time for your questions and a personalised oral-health plan.", badge: "Sample offer", terms: "Availability and final pricing are confirmed by the clinic." },
  { title: "Family smile check", description: "A convenient way for families to plan routine checkups together. Ask about available family appointments.", badge: "Sample offer", terms: "This demonstration offer is not a confirmed commercial offer." },
];

export const posts = [
  { slug: "five-oral-hygiene-habits", title: "Five small oral-hygiene habits that make a big difference", excerpt: "Simple, sustainable ways to keep your teeth and gums healthy between visits.", date: "12 August 2026", category: "Preventive care", readTime: "4 min read" },
  { slug: "first-dental-visit-guide", title: "A calm guide to your child's first dental visit", excerpt: "How to prepare, what to expect and how to make your child feel comfortable.", date: "28 July 2026", category: "Child dentistry", readTime: "5 min read" },
  { slug: "understanding-tooth-sensitivity", title: "Understanding common causes of tooth sensitivity", excerpt: "Possible triggers, simple precautions and when it is worth speaking to a dentist.", date: "10 July 2026", category: "Oral health", readTime: "6 min read" },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1609840112995-78c2c10b5d0a?auto=format&fit=crop&w=1000&q=85",
];
