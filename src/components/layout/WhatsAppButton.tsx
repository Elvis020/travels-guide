"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// WhatsApp Floating Button
// Fixed position chat button for quick contact
// ═══════════════════════════════════════════════════════════════════════════

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export function WhatsAppButton({
  phoneNumber,
  message = "Hello! I'm interested in booking a trip.",
}: WhatsAppButtonProps) {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {!isFooterVisible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[var(--z-toast)] flex items-center gap-2 bg-secondary text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="font-medium hidden sm:inline">Chat with us</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default WhatsAppButton;
