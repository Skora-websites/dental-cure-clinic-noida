import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  contact: z.string().trim().min(5, "Enter a valid phone number or email"),
  message: z.string().trim().min(10, "Please share a little more detail").max(800, "Please keep your message under 800 characters"),
  consent: z.boolean().refine(Boolean, "Please acknowledge the privacy notice"),
});

export default function EnquiryForm() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState("");
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setError("");
    try {
      const reference = `ENQ-${Date.now().toString(36).slice(-6).toUpperCase()}`;
      const existing = JSON.parse(localStorage.getItem("dental-cure-enquiries") || "[]");
      existing.push({ ...values, reference, status: "new", createdAt: new Date().toISOString() });
      localStorage.setItem("dental-cure-enquiries", JSON.stringify(existing));
      await new Promise((resolve) => setTimeout(resolve, 550));
      setSuccess(reference);
    } catch {
      setError("We could not save your enquiry. Please try again or call the clinic.");
    }
  }

  if (success) return (
    <div className="surface-card p-8 text-center" role="status"><span className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-primary"><CheckCircle2 className="size-7" /></span><h3 className="mt-5 font-display text-2xl font-bold">Enquiry received</h3><p className="mt-3 text-muted-foreground">Thank you. Our team will be in touch shortly.</p><p className="mt-4 font-display font-bold text-primary">{success}</p></div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2"><Label htmlFor="enquiry-name">Your name *</Label><Input id="enquiry-name" placeholder="Full name" {...register("name")} aria-invalid={!!errors.name} />{errors.name && <p className="text-xs font-medium text-destructive">{errors.name.message}</p>}</div>
      <div className="space-y-2"><Label htmlFor="enquiry-contact">Phone or email *</Label><Input id="enquiry-contact" placeholder="How should we reach you?" {...register("contact")} aria-invalid={!!errors.contact} />{errors.contact && <p className="text-xs font-medium text-destructive">{errors.contact.message}</p>}</div>
      <div className="space-y-2"><Label htmlFor="enquiry-message">Your message *</Label><Textarea id="enquiry-message" placeholder="How can we help?" className="min-h-32" {...register("message")} aria-invalid={!!errors.message} />{errors.message && <p className="text-xs font-medium text-destructive">{errors.message.message}</p>}</div>
      <div className="flex items-start gap-3"><Checkbox id="enquiry-consent" className="mt-0.5 shrink-0" checked={watch("consent")} onCheckedChange={(checked) => setValue("consent", checked === true)} /><Label htmlFor="enquiry-consent" className="font-normal leading-5">I agree that the clinic may use these details to respond to my enquiry. *</Label></div>
      {errors.consent && <p className="text-xs font-medium text-destructive">{errors.consent.message}</p>}
      {error && <p className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive" role="alert">{error}</p>}
      <Button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-primary">{isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />} Send enquiry</Button>
    </form>
  );
}
