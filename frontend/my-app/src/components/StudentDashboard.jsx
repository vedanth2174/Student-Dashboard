"use client"

import { useState, useEffect, useRef } from "react"

// Logo component
function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="var(--primary)"></circle>
      <path
        d="M7.5 12.5l2.5 2.5 6.5-6.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

// Header component
function Header({ toggleTheme, theme, onHomeClick, stats }) {
  const handleLogout = () => {
    localStorage.removeItem("token")
    // You can add additional logout logic here like redirecting to login page
    window.location.reload() // Optional: reload page after logout
  }

  return (
    <header>
      <div className="header-inner">
        <div className="brand" onClick={onHomeClick}>
          <Logo />
          <span className="brand-name">Student Dashboard</span>
        </div>

        <div className="actions">
          <div className="stats">
            <div className="stat-item">
              <div className="stat-dot usage"></div>
              <span>{stats.usage || 0} calls</span>
            </div>
            <div className="stat-item">
              <div className="stat-dot doubts"></div>
              <span>{stats.doubts || 0} doubts</span>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="btn btn-outline"
            aria-pressed={theme === "dark"}
            aria-label="Toggle theme"
          >
            <span className="sr-only">Toggle theme</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{ display: theme === "dark" ? "none" : "block" }}
            >
              <path
                d="M12 4V2M12 22v-2M4 12H2m20 0h-2M5 5L3.6 3.6M20.4 20.4 19 19M5 19l-1.4 1.4M20.4 3.6 19 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="4" fill="currentColor"></circle>
            </svg>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{ display: theme === "dark" ? "block" : "none" }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"></path>
            </svg>
          </button>

          <button onClick={handleLogout} className="btn btn-outline" aria-label="Logout">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className="sr-only">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

// Dashboard component
function Dashboard({ openNotes, openDoubts, openTest, stats }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-grid">
          <div>
            <h1 className="title">Welcome to your learning dashboard</h1>
            <p className="subtitle">
              Transform your study sessions with AI-powered tools for notes, doubts, and practice tests—all in a clean,
              focused interface.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Learning Tools</h2>
          <p className="muted">Everything you need to study effectively</p>
        </div>

        <div className="grid">
          <div className="card" onClick={openNotes}>
            <div className="card-header">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16v12H4z" fill="var(--primary)" opacity=".15" />
                <path d="M7 9h10M7 12h7M7 15h6" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <h3 className="card-title">Notes Explainer</h3>
            </div>
            <p className="card-desc">
              Upload or paste your notes and get clear, digestible explanations with AI-powered insights.
            </p>
          </div>

          <div className="card" onClick={openDoubts}>
            <div className="card-header">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" fill="var(--accent)" opacity=".2" />
                <path d="M12 8v4m0 4h.01" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <h3 className="card-title">Doubt Solver</h3>
            </div>
            <p className="card-desc">
              Ask any academic question and get instant, step-by-step solutions to clear your doubts.
            </p>
          </div>

          <div className="card" onClick={openTest}>
            <div className="card-header">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="4" y="5" width="16" height="14" rx="2" fill="var(--primary)" opacity=".15" />
                <path d="M8 9h8M8 13h6M8 17h4" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <h3 className="card-title">Practice Tests</h3>
            </div>
            <p className="card-desc">
              Generate custom MCQ tests on any topic and track your progress with detailed scoring.
            </p>
          </div>
        </div>

        <div className="section-header" style={{ marginTop: "3rem" }}>
          <h2>Activity Overview</h2>
          <p className="muted">Track your learning progress</p>
        </div>

        <div className="activity-grid">
          <div className="activity-card">
            <div className="activity-number">{stats.usage || 0}</div>
            <div className="activity-label">API Calls Made</div>
          </div>
          <div className="activity-card">
            <div className="activity-number">{stats.doubts || 0}</div>
            <div className="activity-label">Doubts Solved</div>
          </div>
          <div className="activity-card">
            <div className="activity-number">{stats.tests || 0}</div>
            <div className="activity-label">Tests Taken</div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Chat component
function Chat({ onBack, apiPath, title, updateStats }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const send = async () => {
    if (!input.trim()) return
    const text = input.trim()
    setMessages((m) => [...m, { sender: "user", text, ts: Date.now() }])
    setInput("")
    setLoading(true)

    try {
      // Simulate API call with mock response
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

      const mockResponses = [
        "Based on your question, here's a detailed explanation: The concept you're asking about involves several key principles that work together to form a comprehensive understanding.",
        "Let me break this down step by step: First, we need to understand the fundamental concepts, then we can explore how they apply to your specific question.",
        "This is an excellent question! The answer involves multiple layers of understanding that build upon each other to create a complete picture.",
        "I can help clarify this topic for you. The key points to remember are interconnected and form the foundation for deeper learning in this subject.",
      ]

      const reply = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      setMessages((m) => [...m, { sender: "bot", text: reply, ts: Date.now() }])

      // Update stats
      updateStats((prevStats) => ({
        ...prevStats,
        usage: (prevStats.usage || 0) + 1,
        doubts: apiPath === "/api/ask" ? (prevStats.doubts || 0) + 1 : prevStats.doubts,
      }))
    } catch (e) {
      setMessages((m) => [...m, { sender: "bot", text: "Error contacting server", ts: Date.now() }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      <div className="back-btn" onClick={onBack}>
        ← Back to Dashboard
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-avatar">AI</div>
          <div>
            <h3 className="card-title" style={{ margin: 0 }}>
              {title}
            </h3>
            <p className="muted" style={{ margin: 0, fontSize: "0.875rem" }}>
              Ready to help with your questions
            </p>
          </div>
        </div>

        <div className="chat-messages" ref={messagesRef}>
          {messages.length === 0 && (
            <div className="text-center" style={{ marginTop: "4rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤖</div>
              <h3>Start a conversation!</h3>
              <p className="muted">Ask any academic question or share your notes.</p>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`message ${m.sender}`}>
              <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
            </div>
          ))}

          {loading && (
            <div className="message bot">
              <div className="loading-dots">
                AI is thinking
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            className="chat-input"
            placeholder="Type your question or paste your notes..."
            disabled={loading}
          />
          <button onClick={send} disabled={loading || !input.trim()} className="btn">
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  )
}

// Practice test component
function Practice({ onBack, updateStats }) {
  const [subject, setSubject] = useState("Math")
  const [topic, setTopic] = useState("Algebra")
  const [count, setCount] = useState(5)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)
    try {
      // Simulate API call with mock questions
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockQuestions = Array.from({ length: Number.parseInt(count) }, (_, i) => ({
        question: `Question ${i + 1}: What is the result of solving this ${subject.toLowerCase()} problem in ${topic.toLowerCase()}?`,
        options: [
          `Option A for question ${i + 1}`,
          `Option B for question ${i + 1}`,
          `Option C for question ${i + 1}`,
          `Option D for question ${i + 1}`,
        ],
        answer: Math.floor(Math.random() * 4),
      }))

      setQuestions(mockQuestions)
      setAnswers({})
      setResult(null)
    } catch (e) {
      alert("Error generating test")
    }
    setLoading(false)
  }

  const submit = () => {
    let score = 0
    questions.forEach((q, i) => {
      if (Number(answers[i]) === Number(q.answer)) score++
    })
    setResult({ score, total: questions.length })

    updateStats((prevStats) => ({
      ...prevStats,
      tests: (prevStats.tests || 0) + 1,
    }))
  }

  return (
    <div style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      <div className="back-btn" onClick={onBack}>
        ← Back to Dashboard
      </div>

      <div className="card" style={{ padding: "2rem" }}>
        <div className="section-header">
          <h2>Practice Test Generator</h2>
          <p className="muted">Create custom tests and track your progress</p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="form-input"
              placeholder="e.g., Math"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="form-input"
              placeholder="e.g., Algebra"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Questions</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              min="1"
              max="20"
              className="form-input"
            />
          </div>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <button onClick={generate} disabled={loading} className="btn">
            {loading ? (
              <div className="loading-dots">
                Generating
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              "Generate Test"
            )}
          </button>
        </div>

        {questions.length > 0 && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
            style={{ marginTop: "2rem" }}
          >
            <div className="section-header">
              <h3>
                Test: {subject} - {topic} ({questions.length} questions)
              </h3>
            </div>

            {questions.map((q, i) => (
              <div key={i} className="question-card">
                <div className="question-text">
                  {i + 1}. {q.question}
                </div>
                <div className="options">
                  {q.options.map((option, idx) => (
                    <label key={idx} className="option-label">
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={idx}
                        onChange={() => setAnswers((a) => ({ ...a, [i]: idx }))}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button type="submit" className="btn btn-accent">
              Submit Test
            </button>
          </form>
        )}

        {result && (
          <div className="result-card">
            <div className="result-score">
              {result.score}/{result.total}
            </div>
            <div className="result-text">{Math.round((result.score / result.total) * 100)}% Score</div>
            <div style={{ fontSize: "3rem", marginTop: "1rem" }}>
              {result.score === result.total
                ? "🏆"
                : result.score >= result.total * 0.8
                  ? "🌟"
                  : result.score >= result.total * 0.6
                    ? "👍"
                    : "📚"}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Main App component
export default function StudentDashboard() {
  const [view, setView] = useState("dashboard")
  const [theme, setTheme] = useState("light")
  const [stats, setStats] = useState({ usage: 0, doubts: 0, tests: 0 })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"))
  }

  const goHome = () => {
    setView("dashboard")
  }

  return (
    <div style={{ minHeight: "100vh", width: "100%" }}>
      <style>{`
        :root {
          --bg: #ffffff;
          --fg: #0f172a;
          --muted: #475569;
          --card: #f8fafc;
          --border: #e2e8f0;
          --primary: #2563eb;
          --accent: #f59e0b;
          --ring: 0 0 0 3px color-mix(in oklab, var(--primary) 25%, transparent);
          --radius: 12px;
          --shadow-sm: 0 1px 2px rgba(2, 6, 23, 0.06);
          --shadow-md: 0 6px 24px rgba(2, 6, 23, 0.08);
        }
        html[data-theme="dark"] {
          --bg: #0b1220;
          --fg: #e5e7eb;
          --muted: #94a3b8;
          --card: #111827;
          --border: #1f2937;
          --primary: #60a5fa;
          --accent: #fbbf24;
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        *, *::before, *::after { box-sizing: border-box; }
        html, body { height: 100%; }
        body {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
          color: var(--fg);
          background: var(--bg);
          line-height: 1.55;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        img { max-width: 100%; display: block; }
        a { color: inherit; text-decoration: none; }
        .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }
        .container { max-width: 1120px; margin-inline: auto; padding-inline: 1rem; }
        header { position: sticky; top: 0; z-index: 10; backdrop-filter: saturate(150%) blur(8px); background: color-mix(in oklab, var(--bg) 85%, transparent); border-bottom: 1px solid var(--border); }
        .header-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 1rem; max-width: 1120px; margin-inline: auto; padding-inline: 1rem; }
        .brand { display: inline-flex; align-items: center; gap: .625rem; cursor: pointer; }
        .brand svg { flex-shrink: 0; }
        .brand-name { font-weight: 700; letter-spacing: -0.01em; }
        .actions { display: flex; align-items: center; gap: .75rem; }
        .stats { display: none; align-items: center; gap: .75rem; color: var(--muted); font-size: 0.875rem; }
        @media (min-width: 640px) { .stats { display: flex; } }
        .stat-item { display: flex; align-items: center; gap: .375rem; }
        .stat-dot { width: 8px; height: 8px; border-radius: 50%; }
        .stat-dot.usage { background: var(--primary); }
        .stat-dot.doubts { background: var(--accent); }
        .btn {
          --btn-bg: var(--primary);
          --btn-fg: white;
          display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
          padding: .625rem .9rem; border-radius: 10px; border: 1px solid color-mix(in oklab, var(--btn-bg) 35%, transparent);
          background: var(--btn-bg); color: var(--btn-fg); font-weight: 600; letter-spacing: 0.01em;
          box-shadow: var(--shadow-sm); cursor: pointer;
          transition: transform .08s ease, background .2s ease, box-shadow .2s ease, color .2s ease;
        }
        .btn:hover { transform: translateY(-1px); box-shadow: var(--shadow-md); }
        .btn:active { transform: translateY(0); }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .btn-outline {
          --btn-bg: transparent; --btn-fg: var(--fg);
          border-color: var(--border);
          background: transparent;
        }
        .btn-outline:hover {
          background: color-mix(in oklab, var(--card) 85%, transparent);
        }
        .btn-accent {
          --btn-bg: var(--accent);
          --btn-fg: #111827;
          border-color: color-mix(in oklab, var(--accent) 40%, transparent);
        }
        .btn-small { padding: .5rem .75rem; font-size: 0.875rem; }
        .content-wrapper { max-width: 1120px; margin-inline: auto; padding-inline: 1rem; }
        .hero { padding-block: 3.5rem; }
        .hero-grid { display: grid; gap: 1.5rem; }
        @media (min-width: 768px) { .hero-grid { grid-template-columns: 1fr; gap: 2rem; } }
        .title { font-size: clamp(1.75rem, 3.5vw, 2.5rem); line-height: 1.2; letter-spacing: -0.02em; margin: .75rem 0; font-weight: 800; }
        .subtitle { color: var(--muted); font-size: 1.05rem; max-width: 56ch; }
        .section { padding-block: 2.25rem; }
        .section h2 { font-size: clamp(1.25rem, 1.8vw, 1.5rem); letter-spacing: -0.01em; margin-bottom: 0.5rem; }
        .grid { display: grid; gap: 1rem; }
        @media (min-width: 640px) { .grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }
        @media (min-width: 900px) { .grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
        .card {
          background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 1.5rem; box-shadow: var(--shadow-sm); transition: transform .12s ease, box-shadow .2s ease, border-color .2s ease;
          cursor: pointer;
        }
        .card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: color-mix(in oklab, var(--primary) 35%, var(--border)); }
        .card-header { display: flex; align-items: center; gap: .625rem; margin-bottom: .75rem; }
        .card-title { font-weight: 700; letter-spacing: -0.01em; font-size: 1.125rem; }
        .card-desc { color: var(--muted); font-size: .975rem; line-height: 1.6; }
        .activity-grid { display: grid; gap: 1rem; margin-top: 1.5rem; }
        @media (min-width: 640px) { .activity-grid { grid-template-columns: repeat(3, 1fr); } }
        .activity-card { 
          background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 1.25rem; text-align: center;
        }
        .activity-number { font-size: 2rem; font-weight: 800; color: var(--primary); margin-bottom: 0.25rem; }
        .activity-label { color: var(--muted); font-size: 0.875rem; }
        .chat-container {
          background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
          display: flex; flex-direction: column; height: 70vh; box-shadow: var(--shadow-md);
        }
        .chat-header {
          padding: 1.25rem; border-bottom: 1px solid var(--border);
          display: flex; align-items: center; gap: 0.75rem;
        }
        .chat-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--primary); color: white;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
        }
        .chat-messages {
          flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 1rem;
        }
        .message {
          max-width: 75%; padding: 0.875rem 1.125rem; border-radius: 1rem;
          animation: slideIn 0.3s ease-out;
        }
        .message.user {
          background: var(--primary); color: white; margin-left: auto;
          border-bottom-right-radius: 0.375rem;
        }
        .message.bot {
          background: color-mix(in oklab, var(--card) 50%, var(--bg));
          border: 1px solid var(--border); margin-right: auto;
          border-bottom-left-radius: 0.375rem;
        }
        .chat-input-container {
          padding: 1rem; border-top: 1px solid var(--border);
          display: flex; gap: 0.75rem;
        }
        .chat-input {
          flex: 1; padding: 0.75rem 1rem; border: 1px solid var(--border);
          border-radius: 0.75rem; background: var(--bg); color: var(--fg);
          font-size: 0.875rem;
        }
        .chat-input:focus { outline: none; box-shadow: var(--ring); }
        .form-grid { display: grid; gap: 1rem; }
        @media (min-width: 640px) { .form-grid { grid-template-columns: repeat(3, 1fr); } }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-label { font-weight: 600; font-size: 0.875rem; color: var(--fg); }
        .form-input {
          padding: 0.75rem 1rem; border: 1px solid var(--border);
          border-radius: 0.5rem; background: var(--bg); color: var(--fg);
        }
        .form-input:focus { outline: none; box-shadow: var(--ring); }
        .question-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 1.5rem; margin-bottom: 1rem;
        }
        .question-text { font-weight: 600; margin-bottom: 1rem; font-size: 1.125rem; }
        .options { display: flex; flex-direction: column; gap: 0.75rem; }
        .option-label {
          display: flex; align-items: center; gap: 0.75rem; cursor: pointer;
          padding: 0.75rem; border-radius: 0.5rem; border: 1px solid transparent;
          transition: all 0.2s ease;
        }
        .option-label:hover { background: color-mix(in oklab, var(--primary) 5%, transparent); }
        .option-label input[type="radio"] {
          width: 16px; height: 16px; accent-color: var(--primary);
        }
        .result-card {
          background: color-mix(in oklab, var(--accent) 10%, var(--card));
          border: 1px solid color-mix(in oklab, var(--accent) 30%, var(--border));
          border-radius: var(--radius); padding: 2rem; text-align: center;
          margin-top: 1.5rem;
        }
        .result-score { font-size: 3rem; font-weight: 800; color: var(--accent); margin-bottom: 0.5rem; }
        .result-text { color: var(--muted); font-size: 1.125rem; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .loading-dots {
          display: inline-flex; align-items: center; gap: 0.25rem;
        }
        .loading-dots span {
          width: 6px; height: 6px; border-radius: 50%;
          background: currentColor; animation: bounce 1.4s infinite both;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.16s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.32s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        :focus-visible { outline: none; box-shadow: var(--ring); }
        .muted { color: var(--muted); }
        .text-center { text-align: center; }
        .hidden { display: none; }
        .back-btn {
          color: var(--muted); font-size: 0.875rem; margin-bottom: 1rem;
          display: inline-flex; align-items: center; gap: 0.5rem;
          cursor: pointer; transition: color 0.2s ease;
        }
        .back-btn:hover { color: var(--fg); }
      `}</style>

      <Header toggleTheme={toggleTheme} theme={theme} onHomeClick={goHome} stats={stats} />

      {view === "dashboard" && (
        <div className="content-wrapper">
          <Dashboard
            openNotes={() => setView("notes")}
            openDoubts={() => setView("doubts")}
            openTest={() => setView("test")}
            stats={stats}
          />
        </div>
      )}

      {view === "notes" && (
        <div className="content-wrapper">
          <Chat onBack={goHome} apiPath="/api/explain-notes" title="Notes Explainer" updateStats={setStats} />
        </div>
      )}

      {view === "doubts" && (
        <div className="content-wrapper">
          <Chat onBack={goHome} apiPath="/api/ask" title="Doubt Solver" updateStats={setStats} />
        </div>
      )}

      {view === "test" && (
        <div className="content-wrapper">
          <Practice onBack={goHome} updateStats={setStats} />
        </div>
      )}
    </div>
  )
}
