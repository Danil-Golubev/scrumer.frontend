import { motion } from "framer-motion";
import { Header } from "../../components/Header/Header";
import styles from "./style.module.css";
import { useEffect, useState, useRef } from "react";

export const AiHelper = () => {
  const [mousePosition, setMousePosition] = useState({ x: 2000, y: 1000 });

  // Ссылки на глаза
  const leftEyeRef = useRef<HTMLDivElement | null>(null);
  const rightEyeRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: { clientX: number; clientY: number }) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculatePupilPosition = (eyeRect: DOMRect) => {
    const { x, y } = mousePosition;
    const eyeCenter = {
      x: eyeRect.left + eyeRect.width / 3,
      y: eyeRect.top + eyeRect.height / 3,
    };
    const angle = Math.atan2(y - eyeCenter.y, x - eyeCenter.x);
    const distance = Math.min(eyeRect.width / 6, eyeRect.height / 6); // Ограничиваем расстояние зрачка
    return {
      left: eyeCenter.x + Math.cos(angle) * distance - eyeRect.left,
      top: eyeCenter.y + Math.sin(angle) * distance - eyeRect.top,
    };
  };

  return (
    <div>
      <Header />
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className={styles.mainBlock}>
          <p className={styles.title}>AI-ассистент "Скрамер" </p>
          <div className={styles.robotHead}>
            <div className={styles.robotEye} ref={leftEyeRef}>
              <div
                className={styles.robotPupil}
                style={{
                  left: leftEyeRef.current
                    ? `${
                        calculatePupilPosition(
                          leftEyeRef.current.getBoundingClientRect()
                        ).left
                      }px`
                    : "0px",
                  top: leftEyeRef.current
                    ? `${
                        calculatePupilPosition(
                          leftEyeRef.current.getBoundingClientRect()
                        ).top
                      }px`
                    : "0px",
                }}
              />
            </div>
            <div className={styles.robotEye} ref={rightEyeRef}>
              <div
                className={styles.robotPupil}
                style={{
                  left: rightEyeRef.current
                    ? `${
                        calculatePupilPosition(
                          rightEyeRef.current.getBoundingClientRect()
                        ).left
                      }px`
                    : "0px",
                  top: rightEyeRef.current
                    ? `${
                        calculatePupilPosition(
                          rightEyeRef.current.getBoundingClientRect()
                        ).top
                      }px`
                    : "0px",
                }}
              />
            </div>
          </div>
          <div className={styles.blocks}>
            <div className={styles.block}></div>
            <div className={styles.block}>
              <div className={styles.rows}></div>
            </div>
          </div>
          <button type="submit">Создать задачу</button>
        </div>
      </motion.div>
    </div>
  );
};
