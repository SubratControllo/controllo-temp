import { useRef, useState } from "react";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { Analytics } from "../services/analytics";
import { LeadService } from "../services/leadService";

const initial = {
  name: "",
  email: "",
  company: "",
  size: "",
  role: "",
  consent: false,
  website: "",
};
const labelClass = "grid gap-2 text-[.7rem]";
const fieldClass =
  "h-12 w-full rounded-xl border border-line bg-field px-[13px] py-0 text-navy [font:inherit]";
const errorClass = "mt-[5px] block text-[.61rem] text-error";

export default function LeadForm({ onSubmit = LeadService.submit }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");
  const submitted = useRef(false);
  const update = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      nextErrors.email = "Enter your work email.";
    if (!form.company.trim()) nextErrors.company = "Enter your company.";
    if (!form.size) nextErrors.size = "Choose your company size.";
    if (!form.consent)
      nextErrors.consent = "Confirm that you have read the privacy policy.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length || form.website || submitted.current)
      return;
    submitted.current = true;
    setState("loading");
    setMessage("");
    try {
      await onSubmit({
        ...form,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        company: form.company.trim(),
        source: "enterprise-site",
      });
      Analytics.track("lead_submitted", {
        companySize: form.size,
        role: form.role || "not_provided",
      });
      setState("success");
    } catch (error) {
      submitted.current = false;
      setState("error");
      setMessage(error.message);
    }
  };

  if (state === "success")
    return (
      <div
        className="grid min-h-130 place-content-center text-center"
        role="status"
      >
        <CheckCircle2
          className="mx-auto mt-0 mb-6 size-14.5 text-teal"
          aria-hidden="true"
        />
        <h2>Your request is in.</h2>
        <p className="max-w-92.5 leading-[1.7] text-muted">
          We’ll follow up with a focused readiness conversation. No generic
          product tour.
        </p>
        {import.meta.env.VITE_DEMO_CALENDAR_URL && (
          <a
            className="button button--mint mx-auto mt-6 mb-0"
            href={import.meta.env.VITE_DEMO_CALENDAR_URL}
          >
            <CalendarDays aria-hidden="true" /> Choose a time
          </a>
        )}
      </div>
    );

  return (
    <form className="grid gap-4.5" noValidate onSubmit={handleSubmit}>
      <div>
        <label className={labelClass}>
          Full name
          <input
            className={fieldClass}
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={update}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </label>
        {errors.name && (
          <small className={errorClass} id="name-error">
            {errors.name}
          </small>
        )}
      </div>
      <div>
        <label className={labelClass}>
          Work email
          <input
            className={fieldClass}
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={update}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </label>
        {errors.email && (
          <small className={errorClass} id="email-error">
            {errors.email}
          </small>
        )}
      </div>
      <div>
        <label className={labelClass}>
          Company
          <input
            className={fieldClass}
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={update}
          />
        </label>
        {errors.company && (
          <small className={errorClass}>{errors.company}</small>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 max-[760px]:grid-cols-1">
        <div>
          <label className={labelClass}>
            Company size
            <select
              className={fieldClass}
              name="size"
              value={form.size}
              onChange={update}
            >
              <option value="">Select</option>
              <option value="1-50">1–50</option>
              <option value="51-200">51–200</option>
              <option value="201-1000">201–1,000</option>
              <option value="1000+">1,000+</option>
            </select>
          </label>
          {errors.size && <small className={errorClass}>{errors.size}</small>}
        </div>
        <div>
          <label className={labelClass}>
            Your role
            <select
              className={fieldClass}
              name="role"
              value={form.role}
              onChange={update}
            >
              <option value="">Select</option>
              <option>GRC / Compliance</option>
              <option>Security</option>
              <option>Executive</option>
              <option>Engineering</option>
            </select>
          </label>
        </div>
      </div>
      <label className="absolute left-[-9999px]" aria-hidden="true">
        Website
        <input
          name="website"
          tabIndex="-1"
          autoComplete="off"
          value={form.website}
          onChange={update}
        />
      </label>
      <div>
        <label className="flex items-start gap-2.25 text-[.64rem] leading-normal text-muted">
          <input
            name="consent"
            type="checkbox"
            checked={form.consent}
            onChange={update}
          />
          I have read the{" "}
          <a className="text-teal underline" href="/privacy-policy">
            privacy policy
          </a>{" "}
          and agree to be contacted.
        </label>
        {errors.consent && (
          <small className={errorClass}>{errors.consent}</small>
        )}
      </div>
      {state === "error" && (
        <p className="text-[.68rem] text-error" role="alert">
          {message}
        </p>
      )}
      <button
        className="button button--mint mt-2 w-full"
        type="submit"
        disabled={state === "loading"}
      >
        {state === "loading" ? "Sending…" : "Request my demo"}
      </button>
    </form>
  );
}
