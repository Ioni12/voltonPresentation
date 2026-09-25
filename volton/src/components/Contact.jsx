import React, { useState } from "react";
import { useReveal } from "../hooks/useReveal";

// Brand green — keep in sync with the other components.
const BRAND = "#16a34a";

// TODO: replace with Volton's real email address.
const CONTACT_EMAIL = "info@volton.al";
const PHONE = "+355 67 4001 007";
const ADDRESS = "Rruga Rezervat e Shtetit, Lundër 1, Tirana 1001";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.2807450518317!2d19.862343799999994!3d41.280994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350370070222d61%3A0x454bdb391b4fda38!2sVolton!5e0!3m2!1sen!2s!4v1744729913421!5m2!1sen!2s";

// Same easings as the Drift contact section.
const GROW_EASE = "cubic-bezier(.5,0,.2,1)";
const SOFT_EASE = "cubic-bezier(.16,.84,.24,1)";

// Field that grows out of a thin green line, then reveals its input.
// `revealed` comes from the parent's observer (a wrapper that is never hidden).
function Field({
  revealed,
  delayMs = 0,
  area = false,
  className = "",
  children,
}) {
  return (
    <div
      className={`overflow-hidden ${area ? "rounded-2xl" : "rounded-full"} ${className}`}
      style={{
        transform: revealed ? "scaleY(1)" : "scaleY(0.06)",
        transformOrigin: "center",
        opacity: revealed ? 1 : 0.5,
        backgroundColor: revealed ? "transparent" : BRAND,
        transition: `transform 650ms ${GROW_EASE}, opacity 400ms ease, background-color 400ms ease 300ms`,
        transitionDelay: revealed ? `${delayMs}ms` : "0ms",
      }}
    >
      <div
        style={{
          opacity: revealed ? 1 : 0,
          transition: "opacity 300ms ease",
          transitionDelay: revealed ? `${delayMs + 350}ms` : "0ms",
        }}
      >
        {children}
      </div>
    </div>
  );
}

const fieldBase =
  "block w-full border border-[#0f1a14]/15 bg-white px-6 py-4 text-[0.96rem] text-[#0f1a14] outline-none transition-colors duration-300 placeholder:text-[#0f1a14]/40 focus:border-[#16a34a] dark:border-white/15 dark:bg-[#08160e] dark:text-white dark:placeholder:text-white/40 dark:focus:border-[#16a34a]";

function InfoRow({ label, children, icon }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="flex h-11 w-11 flex-none items-center justify-center rounded-full border"
        style={{
          borderColor: `${BRAND}40`,
          background: `${BRAND}0f`,
          color: BRAND,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          {icon}
        </svg>
      </div>
      <div>
        <div className="mb-0.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#0f1a14]/50 dark:text-white/50">
          {label}
        </div>
        <div className="text-[0.98rem] leading-snug">{children}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  // Each observed element is a wrapper that is never hidden or clipped.
  const [infoRef, infoRevealed] = useReveal(0.2);
  const [mapRef, mapRevealed] = useReveal(0.2);
  const [formRef, formRevealed] = useReveal(0.2);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // Opens the visitor's email app with the fields prefilled.
  function handleSubmit(e) {
    e.preventDefault();
    const subject = form.subject || `Inquiry from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section
      id="contact"
      className="relative bg-[#f4faf6] px-[6vw] py-[12vh] font-sans text-[#0f1a14] dark:bg-[#08160e] dark:text-white"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-[6vw] md:grid-cols-2">
        {/* Left: info + map */}
        <div>
          <div ref={infoRef}>
            <div
              style={{
                opacity: infoRevealed ? 1 : 0,
                transform: infoRevealed ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 700ms ${SOFT_EASE}, transform 700ms ${SOFT_EASE}`,
              }}
            >
              <div className="mb-5 inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[#0f1a14]/60 dark:text-white/60">
                <span
                  className="h-[1.5px] w-8 rounded-full"
                  style={{ background: BRAND }}
                />
                Contact Us
              </div>
              <h2 className="mb-5 max-w-[20ch] text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.1] tracking-tight">
                Get a <span style={{ color: BRAND }}>Personalized Offer</span>
              </h2>
              <p className="mb-10 max-w-[44ch] text-[1.02rem] leading-[1.75] text-[#0f1a14]/65 dark:text-white/60">
                For a custom quote or more information, reach out to us and our
                team will get back to you.
              </p>

              <div className="mb-10 flex flex-col gap-6">
                <InfoRow
                  label="Phone"
                  icon={
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                  }
                >
                  <a
                    href={`tel:${PHONE.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-[#16a34a]"
                  >
                    {PHONE}
                  </a>
                </InfoRow>

                <InfoRow
                  label="Email"
                  icon={
                    <>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </>
                  }
                >
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="transition-colors hover:text-[#16a34a]"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </InfoRow>

                <InfoRow
                  label="Address"
                  icon={
                    <>
                      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
                      <circle cx="12" cy="9.5" r="2.5" />
                    </>
                  }
                >
                  {ADDRESS}
                </InfoRow>
              </div>
            </div>
          </div>

          {/* Map: drops in with the same bounce as the Drift pin */}
          <div ref={mapRef}>
            <div
              className="overflow-hidden rounded-2xl border border-[#0f1a14]/10 dark:border-white/10"
              style={{
                opacity: mapRevealed ? 1 : 0,
                transform: mapRevealed ? "translateY(0)" : "translateY(-40px)",
                transition:
                  "opacity 300ms ease, transform 500ms cubic-bezier(.3,1.6,.4,1)",
                transitionDelay: mapRevealed ? "150ms" : "0ms",
              }}
            >
              <iframe
                title="Volton location"
                src={MAP_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[260px] w-full border-0 transition-[filter] duration-500 dark:[filter:invert(90%)_hue-rotate(180deg)_saturate(0.8)_brightness(0.95)_contrast(0.9)]"
              />
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div ref={formRef}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center rounded-3xl border border-[#0f1a14]/10 bg-white p-8 shadow-[0_30px_60px_-40px_rgba(15,26,20,0.25)] dark:border-white/10 dark:bg-[#0e2016] dark:shadow-none md:p-10"
          >
            <div className="mb-4 flex flex-col gap-4 sm:flex-row">
              <Field revealed={formRevealed} delayMs={0} className="flex-1">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={form.name}
                  onChange={update("name")}
                  className={`${fieldBase} rounded-full`}
                />
              </Field>
              <Field revealed={formRevealed} delayMs={100} className="flex-1">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={form.email}
                  onChange={update("email")}
                  className={`${fieldBase} rounded-full`}
                />
              </Field>
            </div>

            <Field revealed={formRevealed} delayMs={200} className="mb-4">
              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={update("subject")}
                className={`${fieldBase} rounded-full`}
              />
            </Field>

            <Field revealed={formRevealed} delayMs={300} area className="mb-6">
              <textarea
                required
                placeholder="Message"
                value={form.message}
                onChange={update("message")}
                className={`${fieldBase} min-h-[150px] resize-y rounded-2xl`}
              />
            </Field>

            <button
              type="submit"
              className="self-start rounded-full px-9 py-4 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{
                background: BRAND,
                opacity: formRevealed ? 1 : 0,
                transition: "opacity 400ms ease 500ms, transform 300ms",
              }}
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
