import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Send, X, Minimize2, Sparkles, Film, Ticket, HelpCircle, MessageSquare } from 'lucide-react';
import { getMovies, getShows, getBookings, getOffers } from '../../services/storage';
import '../../styles/chatbot.css';

const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: "👋 Hi! I'm MovieBot, your AI cinema concierge. Ask me for movie recommendations, showtimes, your tickets, or promo codes!",
    time: 'Now'
  }
];

const MovieBot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Rule-based intent parser
  const processUserInput = (rawText) => {
    const text = rawText.toLowerCase().trim();

    if (text.includes('movie') || text.includes('showing') || text.includes('browse') || text.includes('list')) {
      const movies = getMovies().slice(0, 4);
      const list = movies.map((m, i) => `${i + 1}. ${m.title} (${m.rating}★ • ${m.certification})`).join('\n');
      return {
        text: `🎬 Here are top movies playing today:\n\n${list}\n\nType the movie name (e.g. "Avengers") to view available showtimes!`,
        action: { label: 'Browse All Movies', url: '/movies' }
      };
    }

    if (text.includes('avenger') || text.includes('endgame')) {
      return {
        text: `🎟️ Shows for Avengers: Endgame at PVR Nexus (IMAX):\n• 10:30 AM (Available)\n• 02:00 PM (Filling Fast)\n• 05:30 PM (Filling Fast)\n• 08:30 PM (2D)`,
        action: { label: 'Book Avengers Tickets', url: '/shows/MOV001' }
      };
    }

    if (text.includes('interstellar')) {
      return {
        text: `🚀 Interstellar Re-Release opens on Sep 20 in IMAX 70mm at Galaxy IMAX Hub! You can set an advance notification.`,
        action: { label: 'View Interstellar', url: '/movies/MOV003' }
      };
    }

    if (text.includes('batman') || text.includes('dark knight')) {
      return {
        text: `🦇 The Batman is showing at PVR Nexus Screen 2 at 08:30 PM (Dolby Atmos).`,
        action: { label: 'Book The Batman', url: '/shows/MOV004' }
      };
    }

    if (text.includes('show') || text.includes('time') || text.includes('theatre') || text.includes('cinema')) {
      return {
        text: `🏛️ Top Theatres Near You:\n1. PVR Nexus (IMAX, 4DX, Dolby Atmos)\n2. INOX Central (2D, 3D, Food Court)\n3. Galaxy IMAX Hub (70mm Laser IMAX)`,
        action: { label: 'View All Theatres', url: '/theatres' }
      };
    }

    if (text.includes('booking') || text.includes('ticket') || text.includes('history')) {
      const bookings = getBookings();
      const active = bookings.filter((b) => b.bookingStatus === 'CONFIRMED');
      if (active.length === 0) {
        return {
          text: `You have no active confirmed bookings right now. Ready to book your next movie?`,
          action: { label: 'Explore Movies', url: '/movies' }
        };
      }
      const latest = active[0];
      return {
        text: `🎫 Your upcoming booking:\n• ${latest.movieTitle}\n• ${latest.theatreName} (${latest.seats.join(', ')})\n• ${latest.date} at ${latest.time}\n• ID: ${latest.id}`,
        action: { label: 'View My Bookings', url: '/bookings' }
      };
    }

    if (text.includes('cancel') || text.includes('refund')) {
      return {
        text: `🔄 You can cancel your booking anytime up to 2 hours before showtime from the "My Bookings" page with 100% instant demo refund!`,
        action: { label: 'Go to My Bookings', url: '/bookings' }
      };
    }

    if (text.includes('offer') || text.includes('coupon') || text.includes('discount') || text.includes('promo')) {
      const offers = getOffers();
      const codes = offers.map((o) => `• ${o.code}: ${o.description}`).join('\n');
      return {
        text: `🎉 Active Deals & Coupon Codes:\n\n${codes}\n\nApply any code on the checkout screen!`,
        action: { label: 'View Offers Page', url: '/offers' }
      };
    }

    if (text.includes('admin') || text.includes('saas') || text.includes('dashboard')) {
      return {
        text: `🛡️ You can switch to the Cinema SaaS Management Portal to inspect live revenue, manage screens, and add movies.`,
        action: { label: 'Open Admin SaaS', url: '/admin' }
      };
    }

    // Default Fallback
    return {
      text: `🤖 I can help you with:\n• "Show movies"\n• "Book Avengers"\n• "Showtimes & Theatres"\n• "My bookings"\n• "Offers & Coupons"\n• "Cancel booking"`,
      action: null
    };
  };

  const handleSend = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    // Append user message
    const userMsg = { sender: 'user', text: query, time: 'Now' };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      const botResponse = processUserInput(query);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse.text,
          action: botResponse.action,
          time: 'Now'
        }
      ]);
    }, 600);
  };

  return (
    <div className="chatbot-wrapper">
      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-title-box">
              <div className="bot-avatar">
                <Bot size={16} />
              </div>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#fff', display: 'block' }}>MovieBot AI</strong>
                <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 600 }}>● Online Concierge</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.2rem' }}
                aria-label="Minimize Chatbot"
              >
                <Minimize2 size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages-list">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.sender}`}>
                <div style={{ whiteSpace: 'pre-line' }}>{m.text}</div>
                {m.action && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    style={{ marginTop: '0.6rem', width: '100%', fontSize: '0.75rem', padding: '0.4rem' }}
                    onClick={() => {
                      setIsOpen(false);
                      navigate(m.action.url);
                    }}
                  >
                    <span>{m.action.label} ➔</span>
                  </button>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble bot" style={{ display: 'flex', gap: '4px', padding: '0.6rem 0.8rem' }}>
                <span style={{ animation: 'bounceDot 1s infinite' }}>●</span>
                <span style={{ animation: 'bounceDot 1s infinite 0.2s' }}>●</span>
                <span style={{ animation: 'bounceDot 1s infinite 0.4s' }}>●</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="quick-prompts-bar">
            {['Show Movies', 'Book Avengers', 'Showtimes', 'My Bookings', 'Offers', 'Help'].map((p) => (
              <button
                key={p}
                type="button"
                className="prompt-chip"
                onClick={() => handleSend(p)}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            className="chatbot-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              className="chat-input"
              placeholder="Ask MovieBot anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="chat-send-btn" aria-label="Send message">
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        type="button"
        className="chatbot-launcher"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open MovieBot Assistant"
        title="Chat with MovieBot AI"
      >
        {isOpen ? <X size={24} /> : <Bot size={26} />}
        {!isOpen && <div className="chatbot-pulse-dot"></div>}
      </button>
    </div>
  );
};

export default MovieBot;

