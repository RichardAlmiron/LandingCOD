'use client';
import React, { useRef, useEffect, useState } from 'react';

interface ProductVideoPlayerProps {
  src: string;
  poster?: string;
  label?: string;
  accentColor?: string;
  aspectRatio?: string;
  rounded?: string;
}

/**
 * Video player que reproduce automáticamente cuando es visible en el viewport.
 * Pausa cuando sale de vista. Muted por defecto (requerido para autoplay).
 * El usuario puede activar sonido con un tap.
 */
export default function ProductVideoPlayer({
  src,
  poster,
  label,
  accentColor = '#6366f1',
  aspectRatio = '16/9',
  rounded = '1.5rem',
}: ProductVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Intersection Observer: autoplay cuando entra en viewport, pausa cuando sale
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [src]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Detectar tipo de video por URL
  const videoType = src.includes('.webm') ? 'video/webm'
    : src.includes('.ogg') ? 'video/ogg'
    : 'video/mp4';

  if (hasError) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        aspectRatio,
        borderRadius: rounded,
        overflow: 'hidden',
        background: '#0a0a0f',
      }}
    >
      <video
        ref={videoRef}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        poster={poster}
        onError={() => setHasError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      >
        <source src={src} type={videoType} />
      </video>

      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          width: 40,
          height: 40,
          borderRadius: 12,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          zIndex: 10,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isMuted ? (
            <>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </>
          ) : (
            <>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </>
          )}
        </svg>
      </button>

      {/* Label badge */}
      {label && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            padding: '4px 12px',
            borderRadius: 8,
            background: accentColor,
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.03em',
            zIndex: 10,
          }}
        >
          {label}
        </div>
      )}

      {/* Play indicator when paused */}
      {!isPlaying && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)',
            zIndex: 5,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
