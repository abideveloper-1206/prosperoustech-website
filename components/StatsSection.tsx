"use client";

import styles from "./StatsSection.module.css";
import { useInView } from "@/lib/useInView";
import { useCountUp } from "@/lib/useCountUp";
import { STATS } from "@/lib/content";

function StatCard({
  value,
  decimals,
  suffix,
  label,
  start,
  delay,
}: {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  start: boolean;
  delay: number;
}) {
  const display = useCountUp(value, start, { decimals });

  return (
    <div
      className={`${styles.stat} ${start ? styles.revealed : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.value}>
        {display}
        {suffix}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.row}>
        {STATS.map((stat, i) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            decimals={stat.decimals}
            suffix={stat.suffix}
            label={stat.label}
            start={inView}
            delay={i * 110}
          />
        ))}
      </div>
    </section>
  );
}
