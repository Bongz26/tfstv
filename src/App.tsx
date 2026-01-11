import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize, Settings } from 'lucide-react';
import { slides } from './slides';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [duration, setDuration] = useState(5000);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = setInterval(nextSlide, duration);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, nextSlide]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div
      className="slideshow-container"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className="slide-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Background Blurred Layer for filling space if ratio differs */}
          <div
            className="slide-bg"
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          />

          {/* Main Image with randomized Cinematic Ken Burns effect */}
          <motion.img
            src={slides[currentIndex].url}
            alt={slides[currentIndex].title || 'Slide'}
            className="slide-image"
            // We use a key change to trigger re-render of animation on same slide if we wanted, 
            // but here currentIndex changing is enough.
            // diverse animation set
            initial={{
              scale: currentIndex % 2 === 0 ? 1.0 : 1.15,
              x: currentIndex % 3 === 0 ? '0%' : (currentIndex % 3 === 1 ? '5%' : '-5%'),
              y: currentIndex % 4 === 0 ? '0%' : (currentIndex % 4 === 1 ? '5%' : '-5%')
            }}
            animate={{
              scale: currentIndex % 2 === 0 ? 1.15 : 1.0,
              x: currentIndex % 3 === 0 ? '0%' : (currentIndex % 3 === 1 ? '-5%' : '5%'),
              y: currentIndex % 4 === 0 ? '0%' : (currentIndex % 4 === 1 ? '-5%' : '5%')
            }}
            transition={{ duration: duration / 1000 + 2, ease: "linear" }}
          />

          {/* Text Overlay */}
          <div className={`text-overlay ${currentIndex % 2 === 0 ? 'text-left' : 'text-right'}`}>
            {slides[currentIndex].title && (
              <motion.h1
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8, type: "spring", bounce: 0.4 }}
              >
                {slides[currentIndex].title}
              </motion.h1>
            )}
            {slides[currentIndex].subtitle && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.0, duration: 1.2, ease: "circOut" }}
                style={{ height: "2px", background: "white", marginBottom: "1rem", opacity: 0.6 }}
              />
            )}
            {slides[currentIndex].subtitle && (
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {slides[currentIndex].subtitle}
              </motion.p>
            )}
          </div>

          {/* Subtle Brand Watermark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{
              position: 'absolute',
              top: '40px',
              right: '40px',
              zIndex: 5,
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.2rem',
              fontWeight: 600,
              color: 'white',
              letterSpacing: '0.1em',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <img
              src="/logo-header.png"
              alt="Thusanang Funeral Services"
              style={{
                height: '120px',
                width: 'auto',
                filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))'
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <motion.div
        className="controls-bar"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showControls || !isPlaying ? 1 : 0, y: showControls || !isPlaying ? 0 : 50 }}
        transition={{ duration: 0.3 }}
      >
        <button onClick={prevSlide} className="control-btn" title="Previous"><ChevronLeft /></button>
        <button onClick={() => setIsPlaying(!isPlaying)} className="control-btn-primary" title={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
        </button>
        <button onClick={nextSlide} className="control-btn" title="Next"><ChevronRight /></button>

        <div className="divider" />

        <div className="duration-control">
          <Settings size={16} />
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="duration-select"
            title="Slide Duration"
          >
            <option value={3000}>3s</option>
            <option value={5000}>5s</option>
            <option value={8000}>8s</option>
            <option value={10000}>10s</option>
            <option value={15000}>15s</option>
          </select>
        </div>

        <button onClick={toggleFullScreen} className="control-btn" title="Fullscreen"><Maximize /></button>
      </motion.div>

      {/* Persistent Progress Bar at bottom */}
      <div className="progress-container">
        {slides.map((_, idx) => (
          <div key={idx} className="progress-segment">
            {/* If we want a continuous line we can just use one bar, but segments are nicer for "slide indicators" */}
            <div
              className={`progress-fill ${idx === currentIndex ? 'active' : ''} ${idx < currentIndex ? 'completed' : ''}`}
              style={idx === currentIndex && isPlaying ? { animationDuration: `${duration}ms` } : {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
