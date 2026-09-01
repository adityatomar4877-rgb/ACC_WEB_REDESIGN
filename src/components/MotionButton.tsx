'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Props {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const MotionButton: FC<Props> = ({ label, href, onClick, className = '' }) => {
  const content = (
    <>
      <span className="motion-btn__circle" aria-hidden="true" />
      <div className="motion-btn__icon">
        <ArrowRight size={22} />
      </div>
      <span className="motion-btn__label">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`motion-btn ${className}`} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={`motion-btn ${className}`} onClick={onClick}>
      {content}
    </button>
  );
};

export default MotionButton;
