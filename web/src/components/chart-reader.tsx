'use client';

import { FormEvent, useState } from "react";
import clsx from "clsx";
import { ChartInsights, generateChartInsights } from "@/lib/chart";
import styles from "./chart-reader.module.css";

interface FormState {
  name: string;
  birthDate: string;
  birthTime: string;
  location: string;
}

function getDefaultFormState(): FormState {
  const now = new Date();
  const isoDate = now.toISOString().split("T")[0] ?? "1990-03-20";
  const isoTime = now.toTimeString().slice(0, 5);

  return {
    name: "Cosmic Explorer",
    birthDate: isoDate,
    birthTime: isoTime,
    location: "Your Current Coordinates",
  };
}

const INITIAL_FORM_STATE: FormState = getDefaultFormState();

export function ChartReader() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [insights, setInsights] = useState<ChartInsights>(() => generateChartInsights(INITIAL_FORM_STATE));
  const [error, setError] = useState<string>("");

  function handleChange<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const nextInsights = generateChartInsights(form);
      setInsights(nextInsights);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to read your chart right now.");
    }
  }

  return (
    <main className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.titleBlock}>
          <h1>Read My Chart</h1>
          <p>
            Offer your birth details and receive a living, ceremonial interpretation of your solar, lunar, and rising
            signatures — including elemental medicine, house-by-house themes, and practical rituals to anchor today&apos;s
            intentions.
          </p>
        </div>

        <div className={styles.stellarField}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {error ? <p className={styles.error}>{error}</p> : null}
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name or alias</label>
              <input
                id="name"
                name="name"
                placeholder="Celestial being..."
                value={form.name}
                onChange={(event) => handleChange("name", event.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="birthDate">Birth date</label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                required
                value={form.birthDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(event) => handleChange("birthDate", event.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="birthTime">Birth time</label>
              <input
                id="birthTime"
                name="birthTime"
                type="time"
                value={form.birthTime}
                onChange={(event) => handleChange("birthTime", event.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="location">Birth location (or where you are now)</label>
              <input
                id="location"
                name="location"
                placeholder="City, country, or coordinates"
                value={form.location}
                onChange={(event) => handleChange("location", event.target.value)}
              />
            </div>

            <button className={styles.submit} type="submit">
              Generate chart reading
            </button>
          </form>
        </div>
      </section>

      <section className={styles.results}>
        <div className={styles.summary}>
          <article className={styles.summaryCard}>
            <h2>Sun</h2>
            <span>{insights.sun.sign.name}</span>
            <p>{insights.sun.highlight}</p>
            <small>
              {insights.sun.degree.toFixed(1)}° · {insights.sun.sign.element} · {insights.sun.sign.modality}
            </small>
          </article>

          <article className={styles.summaryCard}>
            <h2>Moon</h2>
            <span>{insights.moon.sign.name}</span>
            <p>{insights.moon.focus}</p>
            <small>
              {insights.moon.phase} · {insights.moon.degree.toFixed(1)}° · {insights.moon.sign.element}
            </small>
          </article>

          <article className={styles.summaryCard}>
            <h2>Rising</h2>
            <span>{insights.rising.sign.name}</span>
            <p>{insights.rising.tone}</p>
            <small>
              {insights.rising.degree.toFixed(1)}° · {insights.rising.sign.element} · {insights.rising.sign.modality}
            </small>
          </article>

          <article className={styles.summaryCard}>
            <h2>Elemental Pulse</h2>
            <span>{insights.dominantElement.element}</span>
            <p>{insights.dominantElement.description}</p>
            <small>Score {insights.dominantElement.score.toFixed(1)} · {insights.dominantElement.calibration}</small>
          </article>
        </div>

        <div className={styles.narrative}>
          <h2>
            {insights.name ? `${insights.name}'s` : "Your"} celestial briefing · {insights.formattedDate}
            {insights.locationNote ? ` · ${insights.locationNote}` : ""}
          </h2>
          {insights.summary.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <h3>Rituals</h3>
            <ul>
              {insights.rituals.map((ritual) => (
                <li key={ritual}>{ritual}</li>
              ))}
            </ul>
          </article>

          <article className={styles.card}>
            <h3>Transits & Timing</h3>
            <ul>
              {insights.transits.map((transit) => (
                <li key={transit.title}>
                  <strong>{transit.title}</strong> · {transit.description} <em>({transit.timing})</em>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className={clsx(styles.card, styles.houses)}>
          {insights.houses.map((house) => (
            <div key={house.number} className={styles.houseCard}>
              <h4>House {house.number}</h4>
              <strong>{house.sign.name}</strong>
              <p>{house.theme}</p>
              <p>{house.guidance}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
