import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHero } from "../components/PageSections.jsx";
import { company, services } from "../data/content.js";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: services[0].title,
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function submitForm(event) {
    event.preventDefault();

    const subject = encodeURIComponent(`Project inquiry from ${form.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || "Not provided"}`,
        `Service: ${form.service}`,
        "",
        form.message,
      ].join("\n"),
    );

    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setStatus("Your email app has been opened with the inquiry details.");
  }

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Contact"
        title="Start with the project details you already have."
        body="Share the scope, location, timeline, and the type of construction support you need. METZ can respond with the next practical step."
        image="/images/pexels-jeshootscom-442580.jpg"
      />

      <section className="content-band contact-layout">
        <aside className="contact-panel">
          <p className="eyebrow">Direct line</p>
          <h2>Reach METZ Engineering</h2>
          <a href={`tel:${company.phonePrimary}`}>
            <Phone size={18} aria-hidden="true" />
            {company.phonePrimary}
          </a>
          <a href={`tel:${company.phoneSecondary}`}>
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

        <form className="contact-form" onSubmit={submitForm}>
          <div className="field-grid">
            <label>
              Name
              <input name="name" type="text" value={form.name} onChange={updateField} required />
            </label>

            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={updateField} required />
            </label>
          </div>

          <div className="field-grid">
            <label>
              Phone
              <input name="phone" type="tel" value={form.phone} onChange={updateField} />
            </label>

            <label>
              Service
              <select name="service" value={form.service} onChange={updateField}>
                {services.map((service) => (
                  <option key={service.title}>{service.title}</option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Project message
            <textarea
              name="message"
              rows="7"
              value={form.message}
              onChange={updateField}
              placeholder="Tell us about the site, scope, timeline, and budget if available."
              required
            />
          </label>

          <button className="button button-primary" type="submit">
            <Send size={18} aria-hidden="true" />
            Prepare email
          </button>
          {status && <p className="form-status" role="status">{status}</p>}
        </form>
      </section>
    </main>
  );
}
