"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./FaqAccordion.module.css";

export interface FAQItem {
  id: number | string;
  question: string;
  answer: string;
  icon?: string | React.ReactNode;
  iconPosition?: "left" | "right";
  category?: string;
}

export interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  timestamp?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export function FaqAccordion({
  data,
  className,
  timestamp = "Every day, 9:01 AM",
  questionClassName,
  answerClassName,
}: FaqAccordionProps) {
  // Allow initial item to be expanded or null (here initially first item or null)
  const [openItem, setOpenItem] = React.useState<string | null>(
    data.length > 0 ? data[0].id.toString() : null
  );

  return (
    <div className={cn(styles.faqContainer, className)}>
      {timestamp && (
        <div className={styles.timestampBar}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>{timestamp}</span>
        </div>
      )}

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={(value) => setOpenItem(value || null)}
      >
        {data.map((item) => {
          const isOpen = openItem === item.id.toString();
          const iconPos = item.iconPosition || "left";

          return (
            <Accordion.Item
              value={item.id.toString()}
              key={item.id}
              className={styles.accordionItem}
            >
              <Accordion.Header className={styles.accordionHeader}>
                <Accordion.Trigger className={styles.accordionTrigger}>
                  <div
                    className={cn(
                      styles.questionBubble,
                      isOpen && styles.questionBubbleOpen,
                      questionClassName
                    )}
                  >
                    {item.icon && (
                      <span
                        className={cn(
                          styles.stickerBadge,
                          iconPos === "right" ? styles.stickerRight : styles.stickerLeft
                        )}
                        style={{
                          transform:
                            iconPos === "right"
                              ? "rotate(7deg)"
                              : "rotate(-4deg)",
                        }}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                    )}

                    {item.category && (
                      <span className={styles.categoryTag}>{item.category}</span>
                    )}

                    <span className={styles.questionText}>{item.question}</span>
                  </div>

                  <span
                    className={cn(
                      styles.toggleIconBox,
                      isOpen && styles.toggleIconBoxOpen
                    )}
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      <Minus size={16} strokeWidth={2.5} />
                    ) : (
                      <Plus size={16} strokeWidth={2.5} />
                    )}
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content asChild forceMount>
                <motion.div
                  initial="collapsed"
                  animate={isOpen ? "open" : "collapsed"}
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={styles.collapsibleContent}
                >
                  <div className={styles.answerWrapper}>
                    <div
                      className={cn(styles.answerBubble, answerClassName)}
                    >
                      {item.answer}
                    </div>
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}

export default FaqAccordion;
