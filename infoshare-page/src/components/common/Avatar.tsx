import React, { useState } from 'react';

interface AvatarProps {
    src?: string | null;
    alt: string;
    iconSize?: string | number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, iconSize = '20px' }) => {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(158, 223, 255, 0.3)',
                color: 'var(--slate-600, #475569)'
            }}>
                <span className="material-symbols-outlined" style={{ fontSize: iconSize }}>
                    person
                </span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={() => setHasError(true)}
        />
    );
};
