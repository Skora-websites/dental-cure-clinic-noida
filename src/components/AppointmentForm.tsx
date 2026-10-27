import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/lib/clinic-data";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z.string().trim().regex(/^(?:\+?91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email address"),
  service: z.string(),
  preferredDate: z.string().min(1, "Choose a preferred date"),
  preferredTime: z.string().min(1, "Choose a preferred time"),
  message: z.string().max(500, "Please keep your note under 500 characters"),
  consent: z.boolean().refine(Boolean, "Please acknowledge the privacy notice"),
});

type FormData = z.infer<typeof schema>;

export default function AppointmentForm() {
  const [success, setSuccess] = useState<{ reference: string } | null>(null);
  const [error, setError] = useState("");
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: "", message: "", consent: false },
  });

  async function onSubmit(values: FormData) {
    setError("");
    try {
      const reference = `DCC-${Date.now().toString(36).slice(-6).toUpperCase()}`;
      const existing = JSON.parse(localStorage.getItem("dental-cure-appointments") || "[]");
      existing.push({ ...values, reference, status: "new", createdAt: new Date().toISOString() });
      localStorage.setItem("dental-cure-appointments", JSON.stringify(existing));
      await new Promise((resolve) => setTimeout(resolve, 650));
      setSuccess({ reference });
    } catch {
      setError("We could not save your request. Please try again or call the clinic.");
    }
  }

  if (success) {
    return (
      <div className="surface-card p-8 text-center sm:p-12" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-secondary text-primary"><CheckCircle2 className="size-8" /></span>
        <h2 className="mt-6 font-display text-3xl font-bold">Your request is with us.</h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">Thank you, {watch("name") || "there"}. Our reception team will contact you to confirm the appointment.</p>
        <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-[#fff4dd] p-5"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Reference number</p><p className="mt-2 font-display text-2xl font-bold text-primary">{success.reference}</p></div>
        <p className="mt-5 text-sm font-semibold text-foreground">This request is not yet a confirmed appointment.</p>
        <Button variant="outline" className="mt-7 rounded-full" onClick={() => setSuccess(null)}>Submit another request</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="surface-card p-6 sm:p-9" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2"><Label htmlFor="name">Full name *</Label><Input id="name" placeholder="Your full name" {...register("name")} aria-invalid={!!errors.name} />{errors.name && <p className="text-xs font-medium text-destructive">{errors.name.message}</p>}</div>
        <div className="space-y-2"><Label htmlFor="phone">Mobile number *</Label><Input id="phone" type="tel" placeholder="98765 43210" {...register("phone")} aria-invalid={!!errors.phone} />{errors.phone && <p className="text-xs font-medium text-destructive">{errors.phone.message}</p>}</div>
        <div className="space-y-2 sm:col-span-2"><Label htmlFor="email">Email address *</Label><Input id="email" type="email" placeholder="you@example.com" {...register("email")} aria-invalid={!!errors.email} />{errors.email && <p className="text-xs font-medium text-destructive">{errors.email.message}</p>}</div>
        <div className="space-y-2"><Label htmlFor="service">Treatment of interest</Label><Select value={watch("service")} onValueChange={(value) => setValue("service", value)}><SelectTrigger id="service"><SelectValue placeholder="Choose a treatment" /></SelectTrigger><SelectContent>{services.map((service) => <SelectItem key={service.slug} value={service.name}>{service.name}</SelectItem>)}</SelectContent></Select></div>
        <div className="space-y-2"><Label htmlFor="preferredDate">Preferred date *</Label><Input id="preferredDate" type="date" min={new Date().toISOString().split("T")[0]} {...register("preferredDate")} aria-invalid={!!errors.preferredDate} />{errors.preferredDate && <p className="text-xs font-medium text-destructive">{errors.preferredDate.message}</p>}</div>
        <div className="space-y-2 sm:col-span-2"><Label>Preferred time *</Label><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{["Morning", "Afternoon", "Evening", "Flexible"].map((time) => <label key={time} className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-semibold transition ${watch("preferredTime") === time ? "border-primary bg-secondary text-primary" : "bg-white hover:border-primary/40"}`}><input type="radio" value={time} className="sr-only" {...register("preferredTime")} />{time}</label>)}</div>{errors.preferredTime && <p className="text-xs font-medium text-destructive">{errors.preferredTime.message}</p>}</div>
        <div className="space-y-2 sm:col-span-2"><Label htmlFor="message">How can we help? (optional)</Label><Textarea id="message" placeholder="Briefly describe what you need. Please do not include sensitive medical details." className="min-h-28" {...register("message")} /><p className="text-xs text-muted-foreground">Please avoid sharing diagnoses or detailed medical history.</p></div>
      </div>
      <div className="mt-7 flex items-start gap-3"><Checkbox id="consent" checked={watch("consent")} onCheckedChange={(checked) => setValue("consent", checked === true)} aria-invalid={!!errors.consent} /><Label htmlFor="consent" className="font-normal leading-5">I acknowledge that the clinic will use my details to respond to this request, as described in the <a href="/privacy-policy" className="font-semibold text-primary underline">privacy notice</a>. *</Label></div>
      {errors.consent && <p className="mt-2 text-xs font-medium text-destructive">{errors.consent.message}</p>}
      {error && <div className="mt-6 rounded-xl bg-destructive/10 p-4 text-sm font-medium text-destructive" role="alert">{error}</div>}
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-5 text-muted-foreground">Submitting a request does not confirm your appointment.</p><Button type="submit" disabled={isSubmitting} className="rounded-full bg-primary px-7">{isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />} Submit request</Button></div>
    </form>
  );
}
