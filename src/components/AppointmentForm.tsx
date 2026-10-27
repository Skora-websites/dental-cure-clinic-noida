import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { clinic, services } from "@/lib/clinic-data";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z.string().trim().regex(/^(?:\+?91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email address"),
  service: z.string().min(1, "Choose the treatment you are interested in"),
  preferredDate: z.string().min(1, "Choose a preferred date"),
  preferredTime: z.string().min(1, "Choose a preferred time"),
  message: z.string().max(500, "Please keep your note under 500 characters"),
  consent: z.boolean().refine(Boolean, "Please acknowledge the privacy notice"),
});

type FormData = z.infer<typeof schema>;

const timeOptions = ["Morning", "Afternoon", "Evening", "Flexible"];

export default function AppointmentForm() {
  const [searchParams] = useSearchParams();
  const [success, setSuccess] = useState<{ reference: string; name: string } | null>(null);
  const [error, setError] = useState("");
  const requestedService = searchParams.get("service") ?? "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: requestedService, message: "", consent: false },
  });

  async function onSubmit(values: FormData) {
    setError("");
    try {
      const reference = `DCC-${Date.now().toString(36).slice(-6).toUpperCase()}`;
      const existing = JSON.parse(localStorage.getItem("dental-cure-appointments") || "[]");
      existing.push({ ...values, reference, status: "new", createdAt: new Date().toISOString() });
      localStorage.setItem("dental-cure-appointments", JSON.stringify(existing));
      await new Promise((resolve) => setTimeout(resolve, 650));
      setSuccess({ reference, name: values.name });
    } catch {
      setError("We could not save your request. Please try again or call the clinic.");
    }
  }

  if (success) {
    return (
      <div className="surface-card p-6 text-center sm:p-10" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-brand-teal">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold text-brand-ink">Your request is with us</h2>
        <p className="body-text mx-auto mt-4 max-w-lg">
          Thank you, {success.name}. The clinic will contact you to confirm the date, time and treatment. A request is
          not yet a confirmed appointment.
        </p>
        <div className="mx-auto mt-7 max-w-sm rounded-[20px] border border-brand-teal/15 bg-brand-ivory p-6">
          <p className="field-label">Reference number</p>
          <p className="mt-2 font-display text-2xl font-semibold text-brand-teal">{success.reference}</p>
        </div>
        <div className="mt-8 grid gap-3 sm:flex sm:justify-center">
          <a href={clinic.phoneHref} className="action-primary">
            Call the clinic
          </a>
          <Button variant="outline" className="action-secondary" onClick={() => setSuccess(null)}>
            Submit another request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="surface-card p-5 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <Label htmlFor="name" className="field-label">
            Full name *
          </Label>
          <Input id="name" className="field-input" placeholder="Your full name" autoComplete="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.name.message}
            </p>
          )}
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="phone" className="field-label">
            Mobile number *
          </Label>
          <Input id="phone" type="tel" className="field-input" placeholder="98765 43210" autoComplete="tel" {...register("phone")} aria-invalid={!!errors.phone} />
          {errors.phone && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.phone.message}
            </p>
          )}
        </div>

        <div className="min-w-0 space-y-2 sm:col-span-2">
          <Label htmlFor="email" className="field-label">
            Email address *
          </Label>
          <Input id="email" type="email" className="field-input" placeholder="you@example.com" autoComplete="email" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.email.message}
            </p>
          )}
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="service" className="field-label">
            Treatment of interest *
          </Label>
          <Select value={watch("service")} onValueChange={(value) => setValue("service", value)}>
            <SelectTrigger id="service" className="field-input">
              <SelectValue placeholder="Choose a treatment" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.slug} value={service.name}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.service.message}
            </p>
          )}
        </div>

        <div className="min-w-0 space-y-2">
          <Label htmlFor="preferredDate" className="field-label">
            Preferred date *
          </Label>
          <Input id="preferredDate" type="date" className="field-input" min={new Date().toISOString().split("T")[0]} {...register("preferredDate")} aria-invalid={!!errors.preferredDate} />
          {errors.preferredDate && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.preferredDate.message}
            </p>
          )}
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="field-label mb-2">Preferred time *</legend>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {timeOptions.map((time) => {
              const selected = watch("preferredTime") === time;
              return (
                <label
                  key={time}
                  className={`cursor-pointer rounded-[16px] border px-3 py-3 text-center text-sm font-semibold transition focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${
                    selected ? "border-brand-teal bg-accent text-brand-teal" : "border-border bg-white text-brand-deep hover:border-brand-teal/40"
                  }`}
                >
                  <input type="radio" value={time} className="sr-only" {...register("preferredTime")} />
                  {time}
                </label>
              );
            })}
          </div>
          {errors.preferredTime && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.preferredTime.message}
            </p>
          )}
        </fieldset>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="message" className="field-label">
            How can we help? (optional)
          </Label>
          <Textarea
            id="message"
            className="field-input min-h-32"
            placeholder="Briefly describe what you need. Please avoid diagnoses or detailed medical history."
            {...register("message")}
          />
        </div>
      </div>

      <div className="mt-7 flex items-start gap-3 rounded-[20px] border border-border bg-brand-ivory/70 p-4">
        <Checkbox id="consent" className="mt-0.5 shrink-0" checked={watch("consent")} onCheckedChange={(checked) => setValue("consent", checked === true)} aria-invalid={!!errors.consent} />
        <Label htmlFor="consent" className="text-[0.92rem] font-normal leading-6 text-muted-foreground">
          I agree that Dental Cure Clinic may use these details to respond to my request, as described in the{" "}
          <a href="/privacy-policy" className="link-underline font-semibold text-brand-teal">
            privacy notice
          </a>
          . *
        </Label>
      </div>
      {errors.consent && (
        <p className="error-text mt-2" role="alert">
          <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.consent.message}
        </p>
      )}
      {error && (
        <div className="mt-6 rounded-[16px] border border-destructive/25 bg-destructive/10 p-4 text-sm font-semibold text-destructive" role="alert">
          {error}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">Submitting this form does not confirm an appointment.</p>
        <Button type="submit" disabled={isSubmitting} className="action-primary w-full sm:w-auto">
          {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          Submit appointment request
        </Button>
      </div>
    </form>
  );
}
