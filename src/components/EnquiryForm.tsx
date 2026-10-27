import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
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

type EnquiryData = z.infer<typeof schema>;

export default function EnquiryForm() {
  const [success, setSuccess] = useState<{ reference: string; name: string } | null>(null);
  const [error, setError] = useState("");
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<EnquiryData>({
    resolver: zodResolver(schema),
    defaultValues: { consent: false },
  });

  async function onSubmit(values: EnquiryData) {
    setError("");
    try {
      const reference = `ENQ-${Date.now().toString(36).slice(-6).toUpperCase()}`;
      const existing = JSON.parse(localStorage.getItem("dental-cure-enquiries") || "[]");
      existing.push({ ...values, reference, status: "new", createdAt: new Date().toISOString() });
      localStorage.setItem("dental-cure-enquiries", JSON.stringify(existing));
      await new Promise((resolve) => setTimeout(resolve, 550));
      setSuccess({ reference, name: values.name });
    } catch {
      setError("We could not save your enquiry. Please try again or call the clinic.");
    }
  }

  if (success) {
    return (
      <div className="surface-card p-6 text-center sm:p-10" role="status">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-brand-teal">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-brand-ink">Enquiry received</h3>
        <p className="body-text mt-3">Thank you, {success.name}. The clinic will reply using the contact details you provided.</p>
        <p className="mt-5 rounded-[18px] border border-brand-teal/15 bg-brand-ivory p-4 font-display text-xl font-semibold text-brand-teal">{success.reference}</p>
        <Button variant="outline" className="action-secondary mt-7" onClick={() => setSuccess(null)}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="surface-card p-5 sm:p-8" noValidate>
      <div className="grid gap-5">
        <div className="min-w-0 space-y-2">
          <Label htmlFor="enquiry-name" className="field-label">
            Your name *
          </Label>
          <Input id="enquiry-name" className="field-input" placeholder="Full name" autoComplete="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.name.message}
            </p>
          )}
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="enquiry-contact" className="field-label">
            Phone or email *
          </Label>
          <Input id="enquiry-contact" className="field-input" placeholder="How should we reach you?" autoComplete="email" {...register("contact")} aria-invalid={!!errors.contact} />
          {errors.contact && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.contact.message}
            </p>
          )}
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="enquiry-message" className="field-label">
            Your message *
          </Label>
          <Textarea id="enquiry-message" className="field-input min-h-32" placeholder="How can we help?" {...register("message")} aria-invalid={!!errors.message} />
          {errors.message && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.message.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3 rounded-[20px] border border-border bg-brand-ivory/70 p-4">
          <Checkbox id="enquiry-consent" className="mt-0.5 shrink-0" checked={watch("consent")} onCheckedChange={(checked) => setValue("consent", checked === true)} aria-invalid={!!errors.consent} />
          <Label htmlFor="enquiry-consent" className="text-[0.92rem] font-normal leading-6 text-muted-foreground">
            I agree that Dental Cure Clinic may use these details to respond to my enquiry. *
          </Label>
        </div>
        {errors.consent && (
          <p className="error-text" role="alert">
            <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.consent.message}
          </p>
        )}

        {error && (
          <div className="rounded-[16px] border border-destructive/25 bg-destructive/10 p-4 text-sm font-semibold text-destructive" role="alert">
            {error}
          </div>
        )}

        <Button type="submit" disabled={isSubmitting} className="action-primary w-full">
          {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          Send enquiry
        </Button>
      </div>
    </form>
  );
}
