 
import { useState, useEffect } from "react";
import styles from "./QuadroDeAulas.module.css";

interface Pill {
  id: number;
  text: string;
  type: string;
}

interface Day {
  day: string;
  status: string;
  aulaBlock: string | null;
  pills: Pill[];
}

export function QuadroDeAulas() {
  const [selectedDay, setSelectedDay] = useState<string>("Segunda-feira");
  const [weekData, setWeekData] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await fetch('/api/mock-data');
        if (!resp.ok) return;
        const data = await resp.json();
        if (!mounted) return;
        setWeekData(data.weekData || []);
      } catch (err) {
        
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <div className={styles.filterBar}>
        <select className={styles.dropdownMes}>
          <option>Mês</option>
        </select>

        <div className={styles.weekControl}>
          <button className={styles.weekArrow}>{"‹"}</button>
          <span className={styles.weekLabel}>Semana 01</span>
          <button className={styles.weekArrow}>{"›"}</button>
        </div>

        <button className={styles.todayButton}>Exibir hoje</button>
      </div>

      <div className={styles.weekGridWrapper}>
        <div className={styles.weekGrid}>
          {loading ? (
            <div>Carregando agenda...</div>
          ) : (
            weekData.map((day) => (
              <div
                key={day.day}
                className={`${styles.dayColumn} ${
                  day.day === selectedDay ? styles.dayColumnActive : ""
                }`}
                onClick={() => setSelectedDay(day.day)}
              >
                <h3
                  className={`${styles.dayHeader} ${
                    day.day === selectedDay ? styles.dayHeaderActive : ""
                  }`}
                >
                  {day.day}
                </h3>

                <div className={styles.dayContent}>
                  {day.aulaBlock && (
                    <div className={styles.aulaBlock}>
                      {day.aulaBlock.split("\n").map((line, i) => (
                        <span key={i}>{line}</span>
                      ))}
                    </div>
                  )}

                  {day.pills.map((pill) => (
                    <div
                      key={pill.id}
                      className={`${styles.pill} ${styles[pill.type]}`}
                    >
                      {pill.text}
                    </div>
                  ))}

                  {(day.status === "empty" || day.status === "holiday") && (
                    <span className={styles.semAula}>(Sem Aula)</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}