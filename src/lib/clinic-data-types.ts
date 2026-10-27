import type { dentists, faqs, services, testimonials } from "@/lib/clinic-data";

export type ClinicService = (typeof services)[number];
export type Doctor = (typeof dentists)[number];
export type Faq = (typeof faqs)[number];
export type Review = (typeof testimonials)[number];
