import React, { useState, useEffect } from 'react';

export const TypewriterText = ({
  texts = [],
  speed = 35,
  pause = 2500,
  className = '',
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentLength, setCurrentLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts.length) return;
    const fullText = texts[currentTextIndex];

    let timer;
    if (!isDeleting && currentLength < fullText.length) {
      timer = setTimeout(() => {
        setCurrentLength(prev => prev + 1);
      }, speed);
    } else if (!isDeleting && currentLength === fullText.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pause);
    } else if (isDeleting && currentLength > 0) {
      timer = setTimeout(() => {
        setCurrentLength(prev => prev - 1);
      }, speed / 2);
    } else if (isDeleting && currentLength === 0) {
      setIsDeleting(false);
      setCurrentTextIndex(prev => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [currentLength, isDeleting, currentTextIndex, texts, speed, pause]);

  const currentString = texts[currentTextIndex] ? texts[currentTextIndex].substring(0, currentLength) : '';

  return (
    <span className={`inline-block font-mono ${className}`}>
      <span>{currentString}</span>
      <span className="inline-block w-2 h-4 ml-1 bg-[#00E5A0] animate-pulse align-middle" />
    </span>
  );
};
