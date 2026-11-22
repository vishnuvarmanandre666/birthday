'use client';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPrinterSound, playCelebrationChime } from '@/lib/audio';

export default function Stage11TicketPrinter({
  herName = 'Souji',
  yourName = 'Naveen',
  onRestart
}) {
  const [isPrinting, setIsPrinting] = useState(true);
  const [isPrinted, setIsPrinted] = useState(false);

  const startPrintingAnimation = () => {
    setIsPrinting(true);
    setIsPrinted(false);

    // Play printer mechanical stepper sound
    playPrinterSound();

    // After 2.4s, complete printing and celebrate
    setTimeout(() => {
      setIsPrinting(false);
      setIsPrinted(true);
      playCelebrationChime();

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#ffd700', '#ff4d6d', '#8d1326', '#ffffff', '#2a9d8f']
        });
      }
    }, 2400);
  };

  useEffect(() => {
    startPrintingAnimation();
  }, []);

  const handlePrintDownload = () => {
    // Open the official PDF ticket in new tab for direct printing/saving
    window.open('/sabarimala-ticket.pdf', '_blank');
  };

  return (
    <section className="stage-card active-stage stage-ticket-printer-card" aria-label="Sabarimala Virtual-Q Ticket Printer">
      <div className="stage-content text-center">
        {/* Title Header */}
        <div className="ticket-printer-header">
          <span className="sparkle-badge mb-2">🎟️ One More Special Blessing & Surprise</span>
          <h2 className="main-title font-serif" style={{ fontSize: '2.1rem' }}>
            Swamiye Saranam Ayyappa 🙏
          </h2>
          <p className="script-lead" style={{ fontSize: '1.25rem', marginTop: '4px' }}>
            A sacred Darshan journey for {herName} & {yourName}
          </p>
        </div>

        {/* Printer Dispenser Machine Housing */}
        <div className="ticket-dispenser-machine">
          {/* Machine Top Bar */}
          <div className="printer-machine-bar">
            <div className="printer-bar-left">
              <span className={`printer-led ${isPrinting ? 'led-active' : 'led-done'}`}></span>
              <span className="printer-status-text">
                {isPrinting ? 'PRINTING VIRTUAL-Q COUPON...' : '✅ TICKET ISSUED & VERIFIED'}
              </span>
            </div>
            <div className="printer-bar-right">
              <span className="printer-brand">SABARIMALA DISPENSER</span>
            </div>
          </div>

          {/* Machine Paper Slot Mouth */}
          <div className="printer-slot-mouth">
            <div className="slot-shadow-inset"></div>
          </div>

          {/* Paper Feed Slide-out Container */}
          <div className="printer-paper-feed">
            <div className={`ticket-sheet-wrapper ${isPrinting ? 'sheet-printing' : 'sheet-printed'}`}>
              <div className="ticket-paper-card">
                {/* Perforated ticket side cutouts */}
                <div className="ticket-cutout ticket-cutout-left" aria-hidden="true"></div>
                <div className="ticket-cutout ticket-cutout-right" aria-hidden="true"></div>

                {/* The Ticket / Coupon Graphic */}
                <div className="ticket-graphic-container">
                  <img
                    src="/images/sabarimala-coupon.png"
                    alt="Sabarimala Virtual-Q Booking Coupon for Gorsa Naveen"
                    className="ticket-coupon-img"
                  />
                </div>

                {/* Quick Info Summary Pills */}
                <div className="ticket-quick-details">
                  <div className="ticket-info-pill">
                    <span className="pill-label">🗓️ Date of Visit</span>
                    <span className="pill-value">08-01-2027</span>
                  </div>
                  <div className="ticket-info-pill">
                    <span className="pill-label">⏰ Time Slot</span>
                    <span className="pill-value">10:00 - 11:00</span>
                  </div>
                  <div className="ticket-info-pill">
                    <span className="pill-label">👤 Pilgrim</span>
                    <span className="pill-value">GORSA NAVEEN</span>
                  </div>
                  <div className="ticket-info-pill">
                    <span className="pill-label">📍 Route</span>
                    <span className="pill-value">Pamba - Marakkoottam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Relive the Whole Journey Button */}
        <div className="journey-restart-wrap mt-4">
          <p className="music-love-quote">“Wishing you boundless love, joy, and blessed adventures together.” ❤️</p>
          <button
            type="button"
            onClick={onRestart}
            className="pill-btn btn-primary pulse-glow mt-3"
            title="Restart birthday surprise from stage 1"
          >
            ↺ Relive the Entire Journey
          </button>
        </div>
      </div>
    </section>
  );
}
