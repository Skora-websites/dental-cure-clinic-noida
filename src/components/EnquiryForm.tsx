import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { clinic } from "@/lib/clinic-data";

/* The pill field shared with the appointment form. */
const fieldClass =
  "h-auto w-full rounded-pill border-hairline bg-white px-[25px] py-[14px] text-[1rem] text-body shadow-none placeholder:text-body focus-visible:border-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/25 focus-visible:ring-offset-0";

/* Multi-line fields carry the gentler panel radius rather than the pill. */
const areaClass = fieldClass.replace("rounded-pill", "rounded-panel");

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  contact: z.string().trim().min(5, "Enter a valid phone number or email"),
  message: z
    .string()
    .trim()
    .min(10, "Please share a little more detail")
    .max(800, "Please keep your message under 800 characters"),
  consent: z.boolean().refine(Boolean, "Please acknowledge the privacy notice"),
});

type EnquiryData = z.infer<typeof schema>;

export default function EnquiryForm() {
  const [success, setSuccess] = useState<{ reference: string; name: string } | null>(null);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryData>({
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
      setError("The enquiry could not be saved. Try again, or call the clinic and reception will help.");
    }
  }

  if (success) {
    return (
      <div className="surface-card p-7 sm:p-9" role="status">
        <span className="sub-title">Enquiry saved</span>
        <h3 className="mt-6 flex items-center gap-3 text-[1.5rem]">
          <Check className="size-6 text-teal" aria-hidden="true" />
          Thank you, {success.name}
        </h3>
        <p className="body-text mt-3 max-w-[52ch]">
          Note the reference number below, then call or WhatsApp the clinic for an immediate answer.
        </p>
        <div className="mt-6 rounded-panel bg-light p-6">
          <span className="text-[0.85rem] font-semibold text-body">Reference number</span>
          <p className="mt-2 font-display text-[1.5rem] font-semibold text-ink">{success.reference}</p>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={clinic.phoneHref} className="action-primary !min-h-[50px] text-[0.95rem]">
            Call the clinic
          </a>
          <button type="button" className="action-secondary !min-h-[50px] text-[0.95rem]" onClick={() => setSuccess(null)}>
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="surface-card p-6 sm:p-8" noValidate>
      <div className="grid gap-6">
        <div className="min-w-0">
          <Label htmlFor="enquiry-name" className="mb-2.5 block text-[0.95rem] font-semibold text-ink">
            Your name *
          </Label>
          <Input
            id="enquiry-name"
            className={fieldClass}
            placeholder="Full name"
            autoComplete="name"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.name.message}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <Label htmlFor="enquiry-contact" className="mb-2.5 block text-[0.95rem] font-semibold text-ink">
            Phone or email *
          </Label>
          <Input
            id="enquiry-contact"
            className={fieldClass}
            placeholder="How should we reach you?"
            autoComplete="email"
            {...register("contact")}
            aria-invalid={!!errors.contact}
          />
          {errors.contact && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.contact.message}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <Label htmlFor="enquiry-message" className="mb-2.5 block text-[0.95rem] font-semibold text-ink">
            Your message *
          </Label>
          <Textarea
            id="enquiry-message"
            className={`${areaClass} min-h-32`}
            placeholder="How can we help?"
            {...register("message")}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.message.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3 rounded-panel bg-mist p-5">
          <Checkbox
            id="enquiry-consent"
            className="mt-0.5 h-6 w-6 shrink-0 border-hairline data-[state=checked]:border-teal data-[state=checked]:bg-teal"
            checked={watch("consent")}
            onCheckedChange={(checked) => setValue("consent", checked === true)}
            aria-invalid={!!errors.consent}
          />
          <Label htmlFor="enquiry-consent" className="text-[0.95rem] font-normal leading-[1.7] text-body">
            I agree that Dental Cure Clinic may use these details to answer my enquiry. *
          </Label>
        </div>
        {errors.consent && (
          <p className="error-text" role="alert">
            <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.consent.message}
          </p>
        )}

        {error && (
          <div className="rounded-panel border border-destructive/40 bg-destructive/5 p-5 text-[0.95rem] font-semibold text-destructive" role="alert">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9rem] text-body">The clinic replies using the contact details you provide.</p>
          <button type="submit" disabled={isSubmitting} className="action-primary w-full sm:w-auto">
            {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            Send enquiry
          </button>
        </div>
      </div>
    </form>
  );
}
