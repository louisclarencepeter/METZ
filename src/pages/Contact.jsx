import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
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

function encodeFormData(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
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

  async function submitForm(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData({ "form-name": "contact", ...form }),
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
        image="/images/pexels-jeshootscom-442580.jpg"
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

        <form
          className="contact-form"
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={submitForm}
        >
          <input type="hidden" name="form-name" value="contact" />
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
            <p
              className={status.type === "error" ? "form-status form-status--error" : "form-status"}
              role="status"
            >
              {status.message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
