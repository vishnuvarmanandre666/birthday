'use client';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function CustomizeModal({ isOpen, onClose, herName, yourName, letterText, onSave, onReset }) {
  const [her, setHer] = useState(herName || 'Mummylu');
  const [your, setYour] = useState(yourName || 'Nanna (pichi)');
  const [letter, setLetter] = useState(letterText || '');

  useEffect(() => {
    setHer(herName || 'Mummylu');
    setYour(yourName || 'Nanna (pichi)');
    setLetter(letterText || '');
  }, [herName, yourName, letterText]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ herName: her, yourName: your, letterText: letter });
    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 70, origin: { x: 0.5, y: 0.5 } });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>✨ Personalize This Website</h3>
          <button onClick={onClose} className="close-btn" aria-label="Close">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <label htmlFor="inputHerName">Her Name / Nickname:</label>
          <input
            type="text"
            id="inputHerName"
            value={her}
            onChange={(e) => setHer(e.target.value)}
            placeholder="e.g. Mummylu, My Love..."
            className="form-input"
          />

          <label htmlFor="inputYourName">Your Name / Signature:</label>
          <input
            type="text"
            id="inputYourName"
            value={your}
            onChange={(e) => setYour(e.target.value)}
            placeholder="e.g. Nanna (pichi)"
            className="form-input"
          />

          <label htmlFor="inputLetterText">Custom Love Letter Message:</label>
          <textarea
            id="inputLetterText"
            rows={5}
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            placeholder="Write whatever is in your heart..."
            className="form-input form-textarea"
          />

          <div className="modal-footer">
            <button type="submit" className="pill-btn btn-primary">Save &amp; Apply Changes ❤️</button>
            <button type="button" onClick={onReset} className="pill-btn btn-secondary">Reset to Default</button>
          </div>
        </form>
      </div>
    </div>
  );
}
