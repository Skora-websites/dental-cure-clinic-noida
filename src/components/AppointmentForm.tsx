import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { clinic, services } from "@/lib/clinic-data";

/* The pill field shared by every form control. Utilities win over each UI
   primitive's own radius and border, so the fields read as the template's. */
const fieldClass =
  "h-auto w-full rounded-pill border-hairline bg-white px-[25px] py-[14px] text-[1rem] text-body shadow-none placeholder:text-body focus-visible:border-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/25 focus-visible:ring-offset-0 disabled:opacity-60";

/* Multi-line fields carry the gentler panel radius rather than the pill. */
const areaClass = fieldClass.replace("rounded-pill", "rounded-panel");

/*
 * The home page's request slip is a white panel, so its fields sit on the
 * tinted ground to keep a visible edge. On white the hairline alone read as an
 * empty gap, and a white field on a white panel loses its boundary on a
 * low-contrast screen.
 */
const slipField = `${fieldClass.replace("bg-white", "bg-mist")} border-[rgba(5,12,20,0.10)]`;

const storeRequest = (values: Record<string, unknown>, reference: string) => {
  const existing = JSON.parse(localStorage.getItem("dental-cure-appointments") || "[]");
  existing.push({ ...values, reference, status: "new", createdAt: new Date().toISOString() });
  localStorage.setItem("dental-cure-appointments", JSON.stringify(existing));
};

const makeReference = () => `DCC-${Date.now().toString(36).slice(-6).toUpperCase()}`;

const timeOptions = ["Morning", "Afternoon", "Evening", "Flexible"];

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
      const reference = makeReference();
      storeRequest(values, reference);
      await new Promise((resolve) => setTimeout(resolve, 650));
      setSuccess({ reference, name: values.name });
    } catch {
      setError("The request could not be saved. Try again, or call the clinic and reception will book the visit.");
    }
  }

  if (success) {
    return (
      <div className="surface-card p-6 sm:p-10" role="status">
        <span className="sub-title">Request saved</span>
        <h2 className="mt-6 flex items-center gap-3 text-[1.875rem]">
          <Check className="size-7 text-teal" aria-hidden="true" />
          Thank you, {success.name}
        </h2>
        <p className="body-text mt-4 max-w-[54ch]">
          Note the reference number below, then call or WhatsApp the clinic to confirm the date and time. Sending this
          form does not confirm an appointment.
        </p>
        <div className="mt-7 max-w-sm rounded-panel bg-light p-6">
          <span className="text-[0.85rem] font-semibold text-body">Reference number</span>
          <p className="mt-2 font-display text-[1.6rem] font-semibold text-ink">{success.reference}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={clinic.phoneHref} className="action-primary">
            Call the clinic
          </a>
          <button type="button" className="action-secondary" onClick={() => setSuccess(null)}>
            Send another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="surface-card p-6 sm:p-9" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="min-w-0">
          <Label htmlFor="name" className="mb-2.5 block text-[0.95rem] font-semibold text-ink">
            Full name *
          </Label>
          <Input id="name" className={fieldClass} placeholder="Your full name" autoComplete="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.name.message}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <Label htmlFor="phone" className="mb-2.5 block text-[0.95rem] font-semibold text-ink">
            Mobile number *
          </Label>
          <Input
            id="phone"
            type="tel"
            className={fieldClass}
            placeholder="98765 43210"
            autoComplete="tel"
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.phone.message}
            </p>
          )}
        </div>

        <div className="min-w-0 sm:col-span-2">
          <Label htmlFor="email" className="mb-2.5 block text-[0.95rem] font-semibold text-ink">
            Email address *
          </Label>
          <Input
            id="email"
            type="email"
            className={fieldClass}
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.email.message}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <Label htmlFor="service" className="mb-2.5 block text-[0.95rem] font-semibold text-ink">
            Treatment of interest *
          </Label>
          <Select value={watch("service")} onValueChange={(value) => setValue("service", value)}>
            <SelectTrigger id="service" className={fieldClass}>
              <SelectValue placeholder="Choose a treatment" />
            </SelectTrigger>
            <SelectContent className="rounded-panel">
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

        <div className="min-w-0">
          <Label htmlFor="preferredDate" className="mb-2.5 block text-[0.95rem] font-semibold text-ink">
            Preferred date *
          </Label>
          <Input
            id="preferredDate"
            type="date"
            className={fieldClass}
            min={new Date().toISOString().split("T")[0]}
            {...register("preferredDate")}
            aria-invalid={!!errors.preferredDate}
          />
          {errors.preferredDate && (
            <p className="error-text" role="alert">
              <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.preferredDate.message}
            </p>
          )}
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="mb-3 text-[0.95rem] font-semibold text-ink">Preferred time *</legend>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {timeOptions.map((time) => {
              const selected = watch("preferredTime") === time;
              return (
                <label
                  key={time}
                  className={`grid min-h-[52px] cursor-pointer place-items-center rounded-pill border px-4 text-center text-[0.95rem] font-semibold transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-teal ${
                    selected ? "border-teal bg-teal text-white" : "border-hairline bg-white text-ink hover:border-teal"
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

        <div className="sm:col-span-2">
          <Label htmlFor="message" className="mb-2.5 block text-[0.95rem] font-semibold text-ink">
            How can we help? (optional)
          </Label>
          <Textarea
            id="message"
            className={`${areaClass} min-h-32`}
            placeholder="Briefly describe what you need. Please avoid diagnoses or detailed medical history."
            {...register("message")}
          />
        </div>
      </div>

      <div className="mt-7 flex items-start gap-3 rounded-panel bg-mist p-5">
        <Checkbox
          id="consent"
          className="mt-0.5 h-6 w-6 shrink-0 border-hairline data-[state=checked]:border-teal data-[state=checked]:bg-teal"
          checked={watch("consent")}
          onCheckedChange={(checked) => setValue("consent", checked === true)}
          aria-invalid={!!errors.consent}
        />
        <Label htmlFor="consent" className="text-[0.95rem] font-normal leading-[1.7] text-body">
          I agree that Dental Cure Clinic may use these details to answer my request, as described in the{" "}
          <Link to="/privacy-policy" className="link-underline">
            privacy notice
          </Link>
          . *
        </Label>
      </div>
      {errors.consent && (
        <p className="error-text mt-2" role="alert">
          <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.consent.message}
        </p>
      )}
      {error && (
        <div className="mt-6 rounded-panel border border-destructive/40 bg-destructive/5 p-5 text-[0.95rem] font-semibold text-destructive" role="alert">
          {error}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.9rem] text-body">Sending this form does not confirm an appointment.</p>
        <button type="submit" disabled={isSubmitting} className="action-primary w-full sm:w-auto">
          {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          Submit request
        </button>
      </div>
    </form>
  );
}

const quickSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  phone: z.string().trim().regex(/^(?:\+?91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  service: z.string().min(1, "Choose a treatment"),
});

type QuickFormData = z.infer<typeof quickSchema>;

/**
 * The request slip in the home page's sage band. It saves the same request
 * record as the full form, so both entry points behave identically.
 */
export function QuickAppointmentForm() {
  const [success, setSuccess] = useState<{ reference: string; name: string } | null>(null);
  /* The treatment is seeded with an empty string rather than left undefined, so
     an unset select reports "Choose a treatment" instead of zod's "Required". */
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuickFormData>({ resolver: zodResolver(quickSchema), defaultValues: { service: "" } });

  async function onSubmit(values: QuickFormData) {
    const reference = makeReference();
    storeRequest(values, reference);
    await new Promise((resolve) => setTimeout(resolve, 550));
    setSuccess({ reference, name: values.name });
  }

  if (success) {
    return (
      <div className="slip" role="status">
        <h3 className="flex items-center gap-3 text-[1.25rem]">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-teal/10 text-teal">
            <Check className="size-5" aria-hidden="true" />
          </span>
          Request sent
        </h3>
        <p className="body-text mt-4">
          Thank you, {success.name}. Your reference is{" "}
          <strong className="font-semibold text-ink">{success.reference}</strong>. Reception calls to confirm the date
          and time — nothing is booked until that call.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a href={clinic.phoneHref} className="action-primary w-full text-[0.95rem]">
            Call the clinic
          </a>
          <button
            type="button"
            className="action-secondary w-full text-[0.95rem]"
            onClick={() => setSuccess(null)}
          >
            Send another
          </button>
        </div>
        <p className="mt-4 text-[0.85rem] text-body">Line open Monday to Saturday, {clinic.phone}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="slip" noValidate>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-hairline pb-5">
        <h3 className="text-[1.25rem]">Appointment request</h3>
        <span className="text-[0.85rem] text-body">Takes a minute</span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="min-w-0">
          <Label htmlFor="quick-name" className="mb-2 block text-[0.9rem] font-semibold text-ink">
            Your name
          </Label>
          <Input
            id="quick-name"
            className={slipField}
            placeholder="Full name"
            autoComplete="name"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="error-text" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <Label htmlFor="quick-phone" className="mb-2 block text-[0.9rem] font-semibold text-ink">
            Mobile number
          </Label>
          <Input
            id="quick-phone"
            type="tel"
            inputMode="tel"
            className={slipField}
            placeholder="98765 43210"
            autoComplete="tel"
            {...register("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="error-text" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="min-w-0 sm:col-span-2">
          <Label htmlFor="quick-service" className="mb-2 block text-[0.9rem] font-semibold text-ink">
            Treatment you are asking about
          </Label>
          <Select value={watch("service")} onValueChange={(value) => setValue("service", value)}>
            <SelectTrigger id="quick-service" className={slipField}>
              <SelectValue placeholder="Choose a treatment" />
            </SelectTrigger>
            <SelectContent className="rounded-panel">
              {services.map((service) => (
                <SelectItem key={service.slug} value={service.name}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="error-text" role="alert">
              {errors.service.message}
            </p>
          )}
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="action-primary mt-6 w-full">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        Send request
      </button>

      <p className="mt-4 text-[0.9rem] leading-[1.7] text-body">
        Sending this does not confirm the appointment. Call{" "}
        <a href={clinic.phoneHref} className="font-semibold text-ink underline decoration-hairline underline-offset-4 transition hover:text-teal">
          {clinic.phone}
        </a>{" "}
        to book today.
      </p>
    </form>
  );
}
