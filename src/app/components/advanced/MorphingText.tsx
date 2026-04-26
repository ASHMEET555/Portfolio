'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface MorphingTextProps {
  words: string[];
  className?: string;
  duration?: number;
  pauseDuration?: number;
  glitchEffect?: boolean;
  typingEffect?: boolean;
}

const MorphingText: React.FC<MorphingTextProps> = ({
  words,
  className = '',
  duration = 2000,
  pauseDuration = 2000,
  glitchEffect = true,
  typingEffect = false
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const currentWord = words[currentWordIndex];
  const nextWord = words[(currentWordIndex + 1) % words.length];

  // Characters for glitch effect
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const techChars = '01ABCDEF<>/\\|';

  useEffect(() => {
    if (words.length === 0) return;

    const morphToNext = () => {
      if (!nextWord) return;

      setIsTransitioning(true);
      let step = 0;
      const maxSteps = Math.max(currentWord.length, nextWord.length) * 2;

      const morphStep = () => {
        if (step >= maxSteps) {
          setDisplayText(nextWord);
          setIsTransitioning(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          
          // Schedule next transition
          timeoutRef.current = setTimeout(morphToNext, pauseDuration);
          return;
        }

        let newText = '';
        const progress = step / maxSteps;
        
        for (let i = 0; i < Math.max(currentWord.length, nextWord.length); i++) {
          const currentChar = currentWord[i] || '';
          const nextChar = nextWord[i] || '';
          
          if (progress < 0.3) {
            // Start morphing - show glitch
            if (Math.random() < 0.7 && glitchEffect) {
              newText += currentChar;
            } else {
              newText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
          } else if (progress < 0.7) {
            // Mid transition - mixed characters
            if (Math.random() < progress) {
              newText += nextChar;
            } else if (glitchEffect && Math.random() < 0.3) {
              newText += techChars[Math.floor(Math.random() * techChars.length)];
            } else {
              newText += currentChar;
            }
          } else {
            // End transition - mostly next word
            if (Math.random() < 0.9) {
              newText += nextChar;
            } else if (glitchEffect) {
              newText += techChars[Math.floor(Math.random() * techChars.length)];
            } else {
              newText += nextChar;
            }
          }
        }
        
        setDisplayText(newText);
        step++;
        
        timeoutRef.current = setTimeout(morphStep, duration / maxSteps);
      };

      morphStep();
    };

    // Start with first word
    setDisplayText(currentWord);
    
    // Start morphing cycle
    timeoutRef.current = setTimeout(morphToNext, pauseDuration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [words, currentWord, nextWord, duration, pauseDuration, glitchEffect]);

  // Typing effect for initial display
  useEffect(() => {
    if (!typingEffect || isTransitioning || words.length === 0) return;

    let typingIndex = 0;
    const targetText = currentWord;
    
    const typeChar = () => {
      if (typingIndex <= targetText.length) {
        setDisplayText(targetText.slice(0, typingIndex));
        typingIndex++;
        timeoutRef.current = setTimeout(typeChar, 100);
      }
    };

    typeChar();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentWordIndex, typingEffect, isTransitioning, currentWord, words.length]);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="relative z-10">
        {displayText}
        {typingEffect && !isTransitioning && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-1"
          >
            |
          </motion.span>
        )}
      </span>
      
      {/* Glitch effect overlay */}
      {glitchEffect && isTransitioning && (
        <>
          <motion.span
            className="absolute inset-0 text-cyberpunk-red"
            style={{ 
              transform: 'translate(-2px, 0)',
              mixBlendMode: 'screen'
            }}
            animate={{
              transform: ['translate(-2px, 0)', 'translate(2px, 0)', 'translate(-2px, 0)']
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatType: 'mirror'
            }}
          >
            {displayText}
          </motion.span>
          
          <motion.span
            className="absolute inset-0 text-cyan-400"
            style={{ 
              transform: 'translate(2px, 0)',
              mixBlendMode: 'screen'
            }}
            animate={{
              transform: ['translate(2px, 0)', 'translate(-2px, 0)', 'translate(2px, 0)']
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatType: 'mirror',
              delay: 0.05
            }}
          >
            {displayText}
          </motion.span>
        </>
      )}
      
      {/* Scan line effect */}
      {isTransitioning && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyberpunk-red to-transparent opacity-30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ height: '2px', top: '50%' }}
        />
      )}
    </motion.div>
  );
};

export default MorphingText;