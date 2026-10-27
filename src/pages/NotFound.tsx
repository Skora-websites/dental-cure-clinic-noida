import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import PublicLayout, { PageMeta } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <PublicLayout><PageMeta title="Page Not Found" description="The page you requested could not be found." /><section className="section-padding"><div className="page-container text-center"><span className="font-display text-8xl font-extrabold text-secondary">404</span><h1 className="mt-6 font-display text-4xl font-bold">This page has wandered off.</h1><p className="mx-auto mt-4 max-w-lg text-muted-foreground">The link may be outdated, but your next step is easy. Explore our treatments or request an appointment.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild className="rounded-full bg-primary"><Link to="/"><Home className="mr-2 size-4" /> Back home</Link></Button><Button asChild variant="outline" className="rounded-full"><Link to="/appointment">Book an appointment <ArrowRight className="ml-2 size-4" /></Link></Button></div></div></section></PublicLayout>;
}
