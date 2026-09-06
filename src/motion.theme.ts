import { defineTheme } from "@/components/motion-ui/ui-theme";

export default defineTheme({
  transitions: {
    ui: { stiffness: 250, damping: 28 },
    gentle: { stiffness: 90, damping: 18 },
  },
  stagger: { base: 0.1 },
  travel: { enter: 32, section: 64 },
  inView: { amount: 0.35, once: true },
  reducedMotion: "calm",
});
