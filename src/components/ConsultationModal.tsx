'use client';

import { useEffect, useRef, useState } from 'react';

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState<1 | 2>(1);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setStep(1);
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent('Consultation Inquiry — Camel Caravan');
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
        window.open(`mailto:info@camelcaravan.co?subject=${subject}&body=${body}`, '_blank');
        onClose();
    };

    return (
        <div className="consultation-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className="consultation-modal" ref={modalRef}>
                {/* Close button */}
                <button className="modal-close" onClick={onClose} aria-label="Close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Decorative arch */}
                <div className="modal-arch">
                    <svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120 L0 60 Q0 0 200 0 Q400 0 400 60 L400 120" stroke="rgba(198,153,62,0.3)" strokeWidth="1" fill="none" />
                        <path d="M30 120 L30 65 Q30 15 200 15 Q370 15 370 65 L370 120" stroke="rgba(198,153,62,0.15)" strokeWidth="0.8" fill="none" />
                        <circle cx="200" cy="8" r="4" fill="rgba(198,153,62,0.5)" />
                    </svg>
                </div>

                {step === 1 ? (
                    <>
                        {/* Step 1: Overview */}
                        <div className="modal-header">

                            <h2>Let&apos;s Create Something <em>Beautiful</em></h2>

                        </div>

                        <div className="modal-services">
                            {[
                                { icon: '🏡', title: 'Home Visit', desc: 'We come to you for precise measurements' },
                                { icon: '✏️', title: 'Custom Design', desc: 'Co-create a design that fits your space' },
                                { icon: '🤲', title: 'Handcrafted', desc: '100% handmade with premium materials' },
                                { icon: '📦', title: 'Delivered & Installed', desc: 'White-glove delivery and setup' },
                            ].map((s) => (
                                <div key={s.title} className="modal-service-item">
                                    <span className="modal-service-icon">{s.icon}</span>
                                    <div>
                                        <strong>{s.title}</strong>
                                        <span>{s.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="modal-actions">
                            <a
                                href="https://wa.me/6588151459"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="modal-btn-primary"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.116 1.52 5.849L.053 23.537a.5.5 0 00.607.608l5.712-1.476A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.348-1.558l-.384-.23-3.386.876.9-3.404-.248-.394A9.94 9.94 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                                </svg>
                                WhatsApp Us
                            </a>
                            <button
                                className="modal-btn-secondary"
                                onClick={() => setStep(2)}
                            >
                                Send an Inquiry →
                            </button>
                        </div>

                        <p className="modal-footer-note">
                            Free consultation · No obligations · Response within 24 hours
                        </p>
                    </>
                ) : (
                    <>
                        {/* Step 2: Inquiry Form */}
                        <div className="modal-header">
                            <span className="modal-label">✦ Tell Us More</span>
                            <h2>Send Your <em>Inquiry</em></h2>
                            <p className="modal-subtitle">
                                Share your vision and we&apos;ll get back to you within 24 hours.
                            </p>
                        </div>

                        <form className="modal-form" onSubmit={handleSubmit}>
                            <div className="modal-form-group">
                                <label htmlFor="inquiry-name">Your Name</label>
                                <input
                                    id="inquiry-name"
                                    type="text"
                                    placeholder="e.g. Ahmed Al-Rashid"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-form-group">
                                <label htmlFor="inquiry-email">Email Address</label>
                                <input
                                    id="inquiry-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-form-group">
                                <label htmlFor="inquiry-message">Tell us about your project</label>
                                <textarea
                                    id="inquiry-message"
                                    rows={4}
                                    placeholder="I'm looking for a custom majlis set for my living room..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="modal-btn-secondary" onClick={() => setStep(1)}>
                                    ← Back
                                </button>
                                <button type="submit" className="modal-btn-primary" style={{ background: 'var(--desert-gold)' }}>
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                    Send Inquiry
                                </button>
                            </div>
                        </form>

                        <p className="modal-footer-note">
                            We respect your privacy · No spam, ever
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
