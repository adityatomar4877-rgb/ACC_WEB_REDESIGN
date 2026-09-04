'use client';

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentPropsWithoutRef
} from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import styles from './SmoothInput.module.css';

const PASSWORD_CHAR =
  typeof navigator !== 'undefined' && navigator.userAgent.match(/firefox|fxios/i)
    ? '\u25CF'
    : '\u2022';

export interface SmoothInputProps extends ComponentPropsWithoutRef<'input'> {
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  caretColor?: string;
  stiffness?: number;
  damping?: number;
  mass?: number;
}

const SmoothInput = forwardRef<HTMLInputElement, SmoothInputProps>(function SmoothInput(
  {
    className,
    wrapperClassName,
    wrapperStyle,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    onClick,
    onKeyUp,
    onKeyDown,
    type = 'text',
    placeholder,
    style,
    caretColor,
    stiffness = 500,
    damping = 30,
    mass = 0.5,
    ...props
  },
  forwardedRef
) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const caretX = useMotionValue(0);
  const caretOpacity = useMotionValue(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Expose internal inputRef to external forwardRef
  useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

  const isControlled = value !== undefined;
  const inputValue = isControlled ? String(value ?? '') : String(internalValue ?? '');

  const springCaretX = useSpring(
    caretX,
    prefersReducedMotion
      ? { stiffness: 10000, damping: 100, mass: 0.1 }
      : { stiffness, damping, mass }
  );

  const syncMeasureSpan = () => {
    const input = inputRef.current;
    const measureSpan = measureRef.current;
    if (!input || !measureSpan) return;

    const computed = window.getComputedStyle(input);
    const isPassword = type === 'password';

    let fontSize = computed.fontSize;
    if (
      PASSWORD_CHAR === '\u2022' &&
      isPassword &&
      typeof navigator !== 'undefined' &&
      !navigator.userAgent.match(/chrome|chromium|crios/i)
    ) {
      fontSize = `${parseFloat(fontSize) + 6.25}px`;
    }

    measureSpan.style.font = `${computed.fontStyle} ${computed.fontWeight} ${fontSize} ${computed.fontFamily}`;
    measureSpan.style.letterSpacing = computed.letterSpacing;
    measureSpan.style.fontFeatureSettings = computed.fontFeatureSettings;
    measureSpan.style.fontVariationSettings = computed.fontVariationSettings;
  };

  const measurePrefixWidth = (text: string) => {
    const input = inputRef.current;
    const measureSpan = measureRef.current;
    if (!input || !measureSpan) return null;

    syncMeasureSpan();
    measureSpan.textContent = text;

    const paddingLeft = parseFloat(window.getComputedStyle(input).paddingLeft) || 0;

    return text.length > 0
      ? measureSpan.offsetWidth + paddingLeft
      : paddingLeft - 1;
  };

  const scrollCaretIntoView = (
    target: HTMLInputElement,
    absoluteWidth: number
  ) => {
    if (!target) return;
    const computed = window.getComputedStyle(target);
    const paddingLeft = parseFloat(computed.paddingLeft) || 0;
    const paddingRight = parseFloat(computed.paddingRight) || 0;
    const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth);
    const visibleRight = target.scrollLeft + target.clientWidth - paddingRight;
    const visibleLeft = target.scrollLeft + paddingLeft;

    if (absoluteWidth > visibleRight) {
      target.scrollLeft = Math.min(
        absoluteWidth - target.clientWidth + paddingRight,
        maxScroll
      );
      return;
    }

    if (absoluteWidth < visibleLeft) {
      target.scrollLeft = Math.max(0, absoluteWidth - paddingLeft);
    }
  };

  const getCaretIndex = (target: HTMLInputElement | null) => {
    if (!target) return 0;
    let selectionStart = 0;
    let selectionEnd = 0;
    let selectionDirection = 'forward';

    try {
      selectionStart = target.selectionStart ?? target.value.length;
      selectionEnd = target.selectionEnd ?? target.value.length;
      selectionDirection = target.selectionDirection ?? 'forward';
    } catch {
      // In some browsers, inputs like type="email" or type="number" throw on selectionStart
      selectionStart = target.value.length;
      selectionEnd = target.value.length;
    }

    if (selectionStart === selectionEnd) {
      return selectionStart;
    }

    return selectionDirection === 'backward'
      ? selectionStart
      : selectionEnd;
  };

  const updateCaretFromInput = (target?: HTMLInputElement | null) => {
    const input = target || inputRef.current;
    if (!input) return;

    let selectionStart = 0;
    let selectionEnd = 0;
    try {
      selectionStart = input.selectionStart ?? input.value.length;
      selectionEnd = input.selectionEnd ?? input.value.length;
    } catch {
      selectionStart = input.value.length;
      selectionEnd = input.value.length;
    }

    const hasSelection = selectionStart !== selectionEnd;
    const caretIndex = getCaretIndex(input);
    const isPassword = type === 'password';
    const textBeforeCaret = isPassword
      ? PASSWORD_CHAR.repeat(caretIndex)
      : input.value.slice(0, caretIndex);

    const absoluteWidth = measurePrefixWidth(textBeforeCaret);
    if (absoluteWidth === null) return;

    scrollCaretIntoView(input, absoluteWidth);

    const computed = window.getComputedStyle(input);
    const paddingLeft = parseFloat(computed.paddingLeft) || 0;
    const paddingRight = parseFloat(computed.paddingRight) || 0;
    const caretPosition = absoluteWidth - input.scrollLeft;
    const minX = paddingLeft - 1;
    const maxX = input.clientWidth - paddingRight;
    const isCaretVisible = caretPosition >= minX && caretPosition <= maxX + 1;

    caretX.set(Math.min(Math.max(minX, caretPosition), maxX));

    if (!isCaretVisible || hasSelection) {
      caretOpacity.set(0);
      return;
    }

    caretOpacity.set(1);
  };

  const updateCaretRef = useRef(updateCaretFromInput);
  updateCaretRef.current = updateCaretFromInput;
  const caretOpacityRef = useRef(caretOpacity);
  caretOpacityRef.current = caretOpacity;

  useEffect(() => {
    const input = inputRef.current;
    if (input && document.activeElement === input) {
      updateCaretRef.current(input);
    }
  }, [inputValue, type]);

  useEffect(() => {
    const input = inputRef.current;
    const container = containerRef.current;
    if (!input || !container) return;

    const updateCaretIfFocused = () => {
      if (document.activeElement === input) {
        updateCaretRef.current(input);
      }
    };

    const handleSelectionChange = () => {
      if (document.activeElement !== input) return;

      requestAnimationFrame(() => {
        if (document.activeElement === input) {
          updateCaretRef.current(input);
        }
      });
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    if (document.fonts) {
      document.fonts.addEventListener('loadingdone', updateCaretIfFocused);
      void document.fonts.ready.then(updateCaretIfFocused);
    }
    input.addEventListener('scroll', updateCaretIfFocused);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateCaretIfFocused);
      resizeObserver.observe(container);
    }

    updateCaretIfFocused();

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      if (document.fonts) {
        document.fonts.removeEventListener('loadingdone', updateCaretIfFocused);
      }
      input.removeEventListener('scroll', updateCaretIfFocused);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(styles.wrapper, wrapperClassName)}
      style={wrapperStyle}
    >
      <input
        {...props}
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={inputValue}
        className={cn(styles.inputField, className)}
        style={style}
        onChange={(e) => {
          if (!isControlled) setInternalValue(e.target.value);
          onChange?.(e);
          const el = inputRef.current;
          requestAnimationFrame(() => {
            if (el) updateCaretRef.current(el);
          });
        }}
        onFocus={(e) => {
          onFocus?.(e);
          const el = inputRef.current;
          requestAnimationFrame(() => {
            if (el) updateCaretRef.current(el);
          });
        }}
        onBlur={(e) => {
          caretOpacityRef.current.set(0);
          onBlur?.(e);
        }}
        onClick={(e) => {
          onClick?.(e);
          const el = inputRef.current;
          requestAnimationFrame(() => {
            if (el) updateCaretRef.current(el);
          });
        }}
        onKeyUp={(e) => {
          onKeyUp?.(e);
          const el = inputRef.current;
          requestAnimationFrame(() => {
            if (el) updateCaretRef.current(el);
          });
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          const el = inputRef.current;
          requestAnimationFrame(() => {
            if (el) updateCaretRef.current(el);
          });
        }}
      />
      <span
        ref={measureRef}
        aria-hidden="true"
        className={styles.measureSpan}
      />
      <motion.div
        aria-hidden="true"
        className={styles.caret}
        style={{
          x: springCaretX,
          opacity: caretOpacity,
          ...(caretColor ? { backgroundColor: caretColor, boxShadow: `0 0 8px ${caretColor}` } : {})
        }}
      />
    </div>
  );
});

// Alias exports to match user's snippet
const Input = SmoothInput;
const Skiper106 = SmoothInput;

export default SmoothInput;
export { SmoothInput, Input, Skiper106 };
