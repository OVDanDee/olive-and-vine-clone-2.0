"use client";

import { useState, useEffect, useRef } from 'react';

interface AnimatedHeadlineProps {
  words: string[];
  className?: string;
  interval?: number;
}

export default function AnimatedHeadline({ words, className = '', interval = 3000 }: AnimatedHeadlineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwirlingOut, setIsSwirlingOut] = useState(false);
  const [isSwirlingIn, setIsSwirlingIn] = useState(false);
  const [displayWord, setDisplayWord] = useState(words[0] || '');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const nestedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (words.length === 0) return;
    setDisplayWord(words[0]);
    setCurrentIndex(0);
  }, [words]);

  useEffect(() => {
    if (words.length === 0) return;

    const timer = setInterval(() => {
      setIsSwirlingOut(true);
      
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % words.length;
          setDisplayWord(words[nextIndex]);
          setIsSwirlingOut(false);
          setIsSwirlingIn(true);
          
          nestedTimeoutRef.current = setTimeout(() => {
            setIsSwirlingIn(false);
          }, 600);
          
          return nextIndex;
        });
      }, 600);
    }, interval);

    return () => {
      clearInterval(timer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (nestedTimeoutRef.current) clearTimeout(nestedTimeoutRef.current);
    };
  }, [words, interval]);

  if (words.length === 0) return null;

  const letters = displayWord.split('');
  const animationClass = isSwirlingOut ? 'swirl-out' : isSwirlingIn ? 'swirl-in' : '';

  return (
    <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-[74px] text-white text-center ${className}`}>
      <span className="animated-headline-wrapper inline-block relative">{letters.map((letter, index) => (<span key={`${letter}-${index}-${currentIndex}-${displayWord}`} className={`animated-headline-letter inline-block ${animationClass}`} style={{ animationDelay: `${index * 0.05}s` }}>{letter === ' ' ? '\u00A0' : letter}</span>))}</span>
    </h2>
  );
}
