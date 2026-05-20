import { useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHero } from "../components/PageSections.jsx";
import { company, services } from "../data/content.js";
import { useI18n } from "../i18n.jsx";
import { telHref } from "../utils/format.js";

function makeInitial(t) {
  return {
    name: "",
    email: "",
    phone: "",
    service: t(services[0].title),
    message: "",
    "bot-field": "",
  };
}

export default function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState(() => makeInitial(t));
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function startNewInquiry() {
    setForm(makeInitial(t));
    setStatus({ type: "", message: "" });
  }

  async function submitForm(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Submission failed (${response.status})`);
      }

      setStatus({
        type: "success",
        message: t("contact.form.success"),
      });
      setForm(makeInitial(t));
    } catch (error) {
      setStatus({
        type: "error",
        message: t("contact.form.error"),
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main id="main-content">
      <PageHero
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        body={t("contact.body")}
        image="/images/hero-building.webp"
      />

      <section className="content-band contact-layout">
        <aside className="contact-panel">
          <p className="eyebrow">{t("contact.directLine")}</p>
          <h2>{t("contact.reach")}</h2>
          <a href={telHref(company.phonePrimary)}>
            <Phone size={18} aria-hidden="true" />
            {company.phonePrimary}
          </a>
          <a href={telHref(company.phoneSecondary)}>
            <Phone size={18} aria-hidden="true" />
            {company.phoneSecondary}
          </a>
          <a href={`mailto:${company.email}`}>
            <Mail size={18} aria-hidden="true" />
            {company.email}
          </a>
          <p>
            <MapPin size={18} aria-hidden="true" />
            {company.address}
          </p>
        </aside>

        {status.type === "success" ? (
          <section className="contact-confirmation" role="status" aria-live="polite">
            <span className="contact-confirmation__icon">
              <CheckCircle2 size={34} aria-hidden="true" />
            </span>
            <p className="eyebrow">{t("contact.form.successEyebrow")}</p>
            <h2>{t("contact.form.successTitle")}</h2>
            <p>{status.message}</p>
            <p>{t("contact.form.successBody")}</p>
            <button className="button button-primary" type="button" onClick={startNewInquiry}>
              {t("contact.form.sendAnother")}
            </button>
          </section>
        ) : (
          <form
            className="contact-form"
            name="contact"
            method="POST"
            onSubmit={submitForm}
          >
            <p hidden>
              <label>
                {t("contact.form.honeypot")}
                <input
                  name="bot-field"
                  value={form["bot-field"]}
                  onChange={updateField}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </label>
            </p>

            <div className="field-grid">
              <label>
                {t("contact.form.name")}
                <input name="name" type="text" value={form.name} onChange={updateField} required />
              </label>

              <label>
                {t("contact.form.email")}
                <input name="email" type="email" value={form.email} onChange={updateField} required />
              </label>
            </div>

            <div className="field-grid">
              <label>
                {t("contact.form.phone")}
                <input name="phone" type="tel" value={form.phone} onChange={updateField} />
              </label>

              <label>
                {t("contact.form.service")}
                <select name="service" value={form.service} onChange={updateField}>
                  {services.map((service) => {
                    const label = t(service.title);
                    return <option key={label}>{label}</option>;
                  })}
                </select>
              </label>
            </div>

            <label>
              {t("contact.form.message")}
              <textarea
                name="message"
                rows="7"
                value={form.message}
                onChange={updateField}
                placeholder={t("contact.form.placeholder")}
                required
              />
            </label>

            <button className="button button-primary" type="submit" disabled={submitting}>
              <Send size={18} aria-hidden="true" />
              {submitting ? t("contact.form.submitting") : t("contact.form.submit")}
            </button>
            {status.message && (
              <p className="form-status form-status--error" role="status">
                {status.message}
              </p>
            )}
          </form>
        )}
      </section>
    </main>
  );
}
