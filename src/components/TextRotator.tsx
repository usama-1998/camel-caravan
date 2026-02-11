'use client';

import { useEffect, useState } from 'react';

interface TextRotatorProps {
    words: string[];
    className?: string;
    color?: string;
    interval?: number;
}

export default function TextRotator({
    words,
    className = '',
    color = 'inherit',
    interval = 3000,
}: TextRotatorProps) {
    const [index, setIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length);
                setIsFading(false);
            }, 500); // 500ms fade out
        }, interval);

        return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
        <em
            className={className}
            style={{
                color,
                display: 'inline-block',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                opacity: isFading ? 0 : 1,
                transform: isFading ? 'translateY(10px)' : 'translateY(0)',
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 400,
            }}
        >
            {words[index]}
        </em>
    );
}
