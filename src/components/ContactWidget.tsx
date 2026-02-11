"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Phone, Video, X, PhoneCall } from 'lucide-react';

export default function ContactWidget() {
    const [isOpen, setIsOpen] = useState(false);

    const [isMounted, setIsMounted] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);
    const hasOpened = useRef(false);

    const PHONE_NUMBER = "6588151459";
    const PHONE_DISPLAY = "+65 8815 1459";

    useEffect(() => {
        setIsMounted(true);
        const timer = setTimeout(() => {
            if (!hasOpened.current && window.innerWidth > 768) {
                setIsOpen(true);
                hasOpened.current = true;
            }
        }, 2500);

        const handleClickOutside = (event: MouseEvent) => {
            if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (isOpen && !isMessageVisible) {
            setIsTyping(true);
            const typingTimer = setTimeout(() => {
                setIsTyping(false);
                setIsMessageVisible(true);
            }, 2500);
            return () => clearTimeout(typingTimer);
        }
    }, [isOpen, isMessageVisible]);

    if (!isMounted) return null;

    const handleWhatsAppClick = () => {
        setIsOpen(!isOpen);
        setIsOpen(!isOpen);
    };



    const handleStartChat = () => {
        window.open(`https://wa.me/${PHONE_NUMBER}`, '_blank');
    };

    return (
        <div ref={widgetRef} className="contact-widget">
            {/* WhatsApp Chat Window */}
            <div className={`contact-widget-chat ${isOpen ? 'contact-widget-chat--open' : ''}`}>
                {/* Header */}
                <div className="contact-widget-header">
                    <div className="contact-widget-header-left">
                        <div className="contact-widget-avatar">
                            <img src="/images/logo.png" alt="Ali Caravan" className="contact-widget-avatar-img" />
                            <div className="contact-widget-online" />
                        </div>
                        <div>
                            <h3>Ali Caravan</h3>
                            <p>Your Design Assistant</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="contact-widget-close-btn" aria-label="Close chat">
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="contact-widget-body">
                    {isTyping && (
                        <div className="contact-widget-bubble">
                            <div className="contact-widget-typing">
                                <div className="typing-dot" />
                                <div className="typing-dot" />
                                <div className="typing-dot" />
                            </div>
                        </div>
                    )}
                    {isMessageVisible && (
                        <div className="contact-widget-bubble contact-widget-bubble--visible">
                            <p>Salaam! 👋</p>
                            <p>How can we help you with your furnishing journey today?</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="contact-widget-footer">
                    <button onClick={handleStartChat} className="contact-widget-start-chat">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                        </svg>
                        <span>Start Chat</span>
                    </button>
                </div>
            </div>



            <div className="contact-widget-buttons">
                <button
                    onClick={handleWhatsAppClick}
                    className="contact-widget-btn-whatsapp"
                    aria-label="Toggle WhatsApp Chat"
                >
                    <div className="contact-widget-btn-whatsapp-inner">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                        </svg>
                        <span className="contact-widget-badge">1</span>
                    </div>
                </button>
            </div>
        </div >
    );
}
