import React, { useState, useEffect } from "react";
import {
  Heart,
  Calendar,
  Sparkles,
  HelpCircle,
  Tv,
  Image as ImageIcon,
  ShieldCheck,
  Settings,
  LogOut,
  Send,
  Plus,
  Trash2,
  Trophy,
  MessageCircle,
  Lock,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Download,
  Upload
} from "lucide-react";

export default function App() {
  // --- KULLANICI & KİMLİK DOĞRULAMA ---
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("love_app_user") || null;
  });
  const [authForm, setAuthForm] = useState({ user: "batuhan", password: "" });
  const [authError, setAuthError] = useState("");

  // --- GENEL AYARLAR & SİSTEM VERİSİ ---
  const defaultSettings = {
    startDate: "2026-06-18T00:00:00",
    passwords: {
      melike: "melike123",
      batuhan: "batuhan123"
    },
    quizReward: "Boğaz Manzaralı Romantik Akşam Yemeği & Tatlı 🍰",
    dailyQuestion: "Bizimle ilgili ilk aklına gelen ve seni en çok güldüren anı nedir?"
  };

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("love_settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [activeTab, setActiveTab] = useState("counter");

  // --- İLİŞKİ SAYACI STATE ---
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // --- GÜNLÜK SÖZLER & NOTLAR ---
  const initialQuotes = [
    "Seninle geçen her an, hayatımın en güzel hediyesi.",
    "Gözlerinin içine baktığımda bütün dünya sessizleşiyor.",
    "İyi ki varsın sevgilim, iyi ki yollarımız birleşti.",
    "Gülüşün dünyanın en güzel manzarası."
  ];
  const [quotes, setQuotes] = useState(() => {
    const saved = localStorage.getItem("love_quotes");
    return saved ? JSON.parse(saved) : initialQuotes;
  });
  const [newQuoteInput, setNewQuoteInput] = useState("");

  // --- GÜNLÜK SORU CEVAPLARI ---
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("love_answers");
    return saved ? JSON.parse(saved) : { batuhan: "", melike: "" };
  });
  const [answerInput, setAnswerInput] = useState("");

  // --- VİDEO & SOHBET ---
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=kJQP7kiw5Fk");
  const [videoInput, setVideoInput] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("love_messages");
    return saved
      ? JSON.parse(saved)
      : [
          { sender: "batuhan", text: "Film gecesi başlasın mı sevgilim? ❤️", time: "20:00" },
          { sender: "melike", text: "Mısırlar hazır bile! 🥰", time: "20:02" }
        ];
  });
  const [chatInput, setChatInput] = useState("");

  // --- ANILAR (GALERİ) ---
  const initialMemories = [
    {
      id: 1,
      title: "İlk Tanışma",
      date: "18 Haziran 2026",
      desc: "Her şeyin başladığı, kalbimin ilk defa böyle hızlı çarptığı gün...",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Ortak Kahve Molası",
      date: "Güneşli bir öğleden sonra",
      desc: "Sohbetin hiç bitmesin istediğimiz o sıcak an.",
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80"
    }
  ];
  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem("love_memories");
    return saved ? JSON.parse(saved) : initialMemories;
  });
  const [memoryForm, setMemoryForm] = useState({ title: "", date: "", desc: "", image: "" });

  // --- AJANDA / TAKVİM ---
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("love_events");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "Yıldönümümüz 🎉", date: "2027-06-18", category: "Yıldönümü" },
          { id: 2, title: "Melike'nin Doğum Günü 🎂", date: "2027-07-11", category: "Doğum Günü" }
        ];
  });
  const [eventForm, setEventForm] = useState({ title: "", date: "", category: "Buluşma" });

  // --- ÖDÜLLÜ QUIZ (10 SORU) ---
  const defaultQuestions = [
    { id: 1, author: "batuhan", q: "Benim en sevdiğim kahve hangisi?", options: ["Latte", "Americano", "Filtre Kahve", "Mocha"], correct: 2 },
    { id: 2, author: "batuhan", q: "İlk buluştuğumuzda giydiğim üst ne renkti?", options: ["Beyaz", "Siyah", "Mavi", "Bej"], correct: 0 },
    { id: 3, author: "melike", q: "Benim en sevdiğim çiçek hangisidir?", options: ["Kırmızı Gül", "Papatya", "Lale", "Şakayık"], correct: 3 },
    { id: 4, author: "melike", q: "Beni en çok mutlu eden tatlı hangisi?", options: ["Cheesecake", "Waffle", "Sufle", "Magnolia"], correct: 0 }
  ];
  const [quizQuestions, setQuizQuestions] = useState(() => {
    const saved = localStorage.getItem("love_quiz_questions");
    return saved ? JSON.parse(saved) : defaultQuestions;
  });
  const [quizScores, setQuizScores] = useState(() => {
    const saved = localStorage.getItem("love_quiz_scores");
    return saved ? JSON.parse(saved) : { batuhan: 0, melike: 0 };
  });
  const [newQuestionForm, setNewQuestionForm] = useState({
    q: "",
    options: ["", "", "", ""],
    correct: 0
  });

  // LocalStorage senkronizasyonu
  useEffect(() => {
    localStorage.setItem("love_settings", JSON.stringify(settings));
  }, [settings]);
  useEffect(() => {
    localStorage.setItem("love_quotes", JSON.stringify(quotes));
  }, [quotes]);
  useEffect(() => {
    localStorage.setItem("love_answers", JSON.stringify(answers));
  }, [answers]);
  useEffect(() => {
    localStorage.setItem("love_messages", JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    localStorage.setItem("love_memories", JSON.stringify(memories));
  }, [memories]);
  useEffect(() => {
    localStorage.setItem("love_events", JSON.stringify(events));
  }, [events]);
  useEffect(() => {
    localStorage.setItem("love_quiz_questions", JSON.stringify(quizQuestions));
  }, [quizQuestions]);
  useEffect(() => {
    localStorage.setItem("love_quiz_scores", JSON.stringify(quizScores));
  }, [quizScores]);

  // Sayacı her saniye güncelleme
  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(settings.startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [settings.startDate]);

  // Giriş Yapma
  const handleLogin = (e) => {
    e.preventDefault();
    const targetPassword = settings.passwords[authForm.user];
    if (authForm.password === targetPassword || authForm.password === "aşkımız") {
      setCurrentUser(authForm.user);
      localStorage.setItem("love_app_user", authForm.user);
      setAuthError("");
    } else {
      setAuthError("Şifre yanlış sevgilim, lütfen tekrar dene ❤️");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("love_app_user");
  };

  // Video ID Çıkarma
  const getEmbedUrl = (url) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11
        ? `https://www.youtube.com/embed/${match[2]}`
        : url;
    } catch {
      return url;
    }
  };

  // Sohbet Mesajı Gönderme
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages([...messages, { sender: currentUser, text: chatInput, time: timeStr }]);
    setChatInput("");
  };

  // Quiz Sorusu Ekleme
  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionForm.q || newQuestionForm.options.some((o) => !o.trim())) return;
    const newQ = {
      id: Date.now(),
      author: currentUser,
      q: newQuestionForm.q,
      options: [...newQuestionForm.options],
      correct: parseInt(newQuestionForm.correct)
    };
    setQuizQuestions([...quizQuestions, newQ]);
    setNewQuestionForm({ q: "", options: ["", "", "", ""], correct: 0 });
  };

  // Quiz Cevaplama
  const handleAnswerQuiz = (qId, optionIndex) => {
    const question = quizQuestions.find((q) => q.id === qId);
    if (!question) return;
    if (question.correct === optionIndex) {
      alert("Tebrikler! Doğru cevap +10 Puan kazandın! 🎉❤️");
      setQuizScores({
        ...quizScores,
        [currentUser]: (quizScores[currentUser] || 0) + 10
      });
    } else {
      alert("Ah olamaz, yanlış cevap! Ama seni yine de çok seviyorum 🥰");
    }
  };

  // Anı Ekleme
  const handleAddMemory = (e) => {
    e.preventDefault();
    if (!memoryForm.title) return;
    const newM = {
      id: Date.now(),
      ...memoryForm,
      image: memoryForm.image || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80"
    };
    setMemories([newM, ...memories]);
    setMemoryForm({ title: "", date: "", desc: "", image: "" });
  };

  // Etkinlik Ekleme
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date) return;
    setEvents([...events, { id: Date.now(), ...eventForm }]);
    setEventForm({ title: "", date: "", category: "Buluşma" });
  };

  // JSON Yedek Export
  const handleExportData = () => {
    const allData = {
      settings,
      quotes,
      answers,
      memories,
      events,
      quizQuestions,
      quizScores
    };
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `love-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  // JSON Yedek Import
  const handleImportData = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.quotes) setQuotes(parsed.quotes);
        if (parsed.memories) setMemories(parsed.memories);
        if (parsed.events) setEvents(parsed.events);
        if (parsed.quizQuestions) setQuizQuestions(parsed.quizQuestions);
        alert("Yedek başarıyla yüklendi! ❤️");
      } catch {
        alert("Geçersiz yedek dosyası!");
      }
    };
  };

  // --- KİLİT / GİRİŞ EKRANI ---
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-100 via-pink-100 to-red-100">
        <div className="bg-white/85 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full border border-pink-200 text-center">
          <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg animate-pulse">
            <Heart className="w-10 h-10 fill-current" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight font-romantic text-4xl mb-1 text-rose-600">
            Melike & Batuhan
          </h1>
          <p className="text-sm text-slate-500 mb-6">Sadece bize özel aşk günlüğü ve anı dünyası</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex gap-3 justify-center mb-4">
              <button
                type="button"
                onClick={() => setAuthForm({ ...authForm, user: "melike" })}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all border ${
                  authForm.user === "melike"
                    ? "bg-rose-500 text-white border-rose-500 shadow-md scale-105"
                    : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                }`}
              >
                Melike 👑
              </button>
              <button
                type="button"
                onClick={() => setAuthForm({ ...authForm, user: "batuhan" })}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all border ${
                  authForm.user === "batuhan"
                    ? "bg-rose-600 text-white border-rose-600 shadow-md scale-105"
                    : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                }`}
              >
                Batuhan 🎩
              </button>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder={`${authForm.user === "batuhan" ? "Batuhan" : "Melike"} için şifre giriniz...`}
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-rose-50/50 border border-rose-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition text-sm"
                required
              />
              <Lock className="w-5 h-5 text-rose-400 absolute left-3 top-3.5" />
            </div>

            {authError && <p className="text-xs text-red-500 font-semibold">{authError}</p>}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-rose-200 transition active:scale-95"
            >
              Kapıyı Aç ve Dünyamıza Gir ❤️
            </button>
          </form>
          <div className="mt-6 text-xs text-slate-400">
            Varsayılan Şifreler: Melike: <code>melike123</code> | Batuhan: <code>batuhan123</code>
          </div>
        </div>
      </div>
    );
  }

  // --- ANA UYGULAMA PANELİ ---
  return (
    <div className="min-h-screen flex flex-col">
      {/* ÜST BİLGİ & MENÜ ÇUBUĞU */}
      <header className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-md">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="font-romantic text-2xl font-bold text-rose-600 leading-none">Melike & Batuhan</h1>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                Giriş Yapan: <strong className="text-rose-600 uppercase">{currentUser}</strong>
                {currentUser === "batuhan" && (
                  <span className="bg-rose-100 text-rose-700 text-[10px] px-1.5 py-0.5 rounded font-bold">
                    YÖNETİCİ
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Menü Sekmeleri */}
          <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "counter", label: "Bizim Dünyamız", icon: Heart },
              { id: "calendar", label: "Ajanda", icon: Calendar },
              { id: "cinema", label: "Birlikte İzle & Sohbet", icon: Tv },
              { id: "quiz", label: "Ödüllü Quiz", icon: Trophy },
              { id: "memories", label: "Anılar", icon: ImageIcon },
              ...(currentUser === "batuhan"
                ? [{ id: "admin", label: "Yönetim", icon: Settings }]
                : [])
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                      : "text-slate-600 hover:bg-rose-50 hover:text-rose-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <button
              onClick={handleLogout}
              title="Çıkış Yap"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>

      {/* İÇERİK ALANI */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* 1. BİZİM DÜNYAMIZ & İLİŞKİ SAYACI */}
        {activeTab === "counter" && (
          <div className="space-y-6">
            {/* Canlı Sayaç Kartı */}
            <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden text-center">
              <div className="relative z-10">
                <span className="text-rose-100 text-xs sm:text-sm uppercase tracking-widest font-bold">
                  Birlikte Geçen Her An Çok Değerli
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold mt-2 font-romantic">Sonsuz Aşkımız</h2>
                <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto mt-6">
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/20">
                    <span className="block text-2xl sm:text-4xl font-extrabold">{timeTogether.days}</span>
                    <span className="text-xs uppercase text-rose-100">Gün</span>
                  </div>
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/20">
                    <span className="block text-2xl sm:text-4xl font-extrabold">{timeTogether.hours}</span>
                    <span className="text-xs uppercase text-rose-100">Saat</span>
                  </div>
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/20">
                    <span className="block text-2xl sm:text-4xl font-extrabold">{timeTogether.minutes}</span>
                    <span className="text-xs uppercase text-rose-100">Dakika</span>
                  </div>
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/20">
                    <span className="block text-2xl sm:text-4xl font-extrabold">{timeTogether.seconds}</span>
                    <span className="text-xs uppercase text-rose-100">Saniye</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-rose-100 mt-4">
                  Başlangıç Tarihi: {new Date(settings.startDate).toLocaleDateString("tr-TR")}
                </p>
              </div>
            </div>

            {/* Günün Sözü & Günlük Soru Çifti */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Günün Sevgi Sözü */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-rose-500 mb-3">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="font-bold text-slate-800">Günün Sevgi Sözü</h3>
                  </div>
                  <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-100 text-center my-4">
                    <p className="text-lg italic font-romantic text-rose-700">
                      "{quotes[Math.floor(Math.random() * quotes.length)] || "Seni her şeyden çok seviyorum..."}"
                    </p>
                  </div>
                </div>
                <div className="text-xs text-slate-400 text-center">
                  Havuzda toplam {quotes.length} özel söz bulunuyor.
                </div>
              </div>

              {/* Günün Romantik Sorusu */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-pink-500 mb-3">
                    <HelpCircle className="w-5 h-5" />
                    <h3 className="font-bold text-slate-800">Günün Özel Sorusu</h3>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 mb-4">{settings.dailyQuestion}</p>
                  
                  {/* Cevaplar */}
                  <div className="space-y-2 mb-4">
                    <div className="p-3 bg-slate-50 rounded-xl text-xs">
                      <strong className="text-rose-600">Melike'nin Cevabı:</strong>{" "}
                      {answers.melike || <span className="text-slate-400 italic">Henüz yanıtlamadı...</span>}
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl text-xs">
                      <strong className="text-rose-600">Batuhan'ın Cevabı:</strong>{" "}
                      {answers.batuhan || <span className="text-slate-400 italic">Henüz yanıtlamadı...</span>}
                    </div>
                  </div>
                </div>

                {/* Kendi Cevabını Yaz */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Senin cevabın sevgilim..."
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                  <button
                    onClick={() => {
                      if (!answerInput.trim()) return;
                      setAnswers({ ...answers, [currentUser]: answerInput });
                      setAnswerInput("");
                    }}
                    className="px-4 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold hover:bg-rose-600 transition"
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. AJANDA & ÖNEMLİ GÜNLER */}
        {activeTab === "calendar" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-rose-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-rose-500" />
                Önemli Gün Ekle
              </h3>
              <form onSubmit={handleAddEvent} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Etkinlik Başlığı</label>
                  <input
                    type="text"
                    placeholder="Örn: İlk Sinema Buluşmamız"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 outline-none mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Tarih</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 outline-none mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Kategori</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 outline-none mt-1"
                  >
                    <option value="Yıldönümü">Yıldönümü 💖</option>
                    <option value="Doğum Günü">Doğum Günü 🎂</option>
                    <option value="Buluşma">Özel Buluşma ☕</option>
                    <option value="Seyahat">Tatil & Gezi ✈️</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs shadow-md transition"
                >
                  Ajandaya Kaydet
                </button>
              </form>
            </div>

            <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-rose-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Takvimdeki Önemli Tarihler</h3>
              <div className="space-y-3">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-center justify-between p-4 bg-rose-50/50 border border-rose-100 rounded-2xl hover:bg-rose-50 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                        {ev.category === "Yıldönümü" ? "💖" : ev.category === "Doğum Günü" ? "🎂" : "📅"}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{ev.title}</h4>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-rose-400" />
                          {new Date(ev.date).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setEvents(events.filter((e) => e.id !== ev.id))}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. BİRLİKTE VİDEO İZLE & CANLI SOHBET */}
        {activeTab === "cinema" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white p-4 rounded-3xl shadow-sm border border-rose-100 flex gap-2">
                <input
                  type="text"
                  placeholder="YouTube Video Bağlantısı Yapıştırın..."
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  className="flex-1 px-4 py-2 border border-rose-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400 outline-none"
                />
                <button
                  onClick={() => {
                    if (!videoInput) return;
                    setVideoUrl(videoInput);
                    setVideoInput("");
                  }}
                  className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5" /> Oynat
                </button>
              </div>

              {/* Video Oynatıcı Çerçevesi */}
              <div className="bg-black rounded-3xl overflow-hidden aspect-video shadow-lg relative border-4 border-white">
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  title="Love Cinema"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Yan Canlı Sohbet */}
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-rose-100 flex flex-col h-[520px]">
              <div className="flex items-center space-x-2 text-rose-500 border-b border-rose-100 pb-3 mb-3">
                <MessageCircle className="w-5 h-5" />
                <h3 className="font-bold text-slate-800 text-sm">Film Sırasında Sohbet</h3>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === currentUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs shadow-sm ${
                        m.sender === currentUser
                          ? "bg-rose-500 text-white rounded-tr-none"
                          : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200"
                      }`}
                    >
                      <p>{m.text}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1">
                      {m.sender.toUpperCase()} • {m.time}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Mesaj yaz..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 outline-none"
                />
                <button
                  type="submit"
                  className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 4. ÖDÜLLÜ AŞK QUIZI (10'AR SORU) */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            {/* Skor Tablosu & Ödül */}
            <div className="bg-gradient-to-r from-amber-400 to-rose-400 rounded-3xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold opacity-80">Büyük Ödüllü Yarışma</span>
                <h3 className="text-xl sm:text-2xl font-extrabold mt-1">Büyük Ödül: {settings.quizReward}</h3>
                <p className="text-xs opacity-90 mt-1">Kim daha çok biliyorsa ödülü o kazanır!</p>
              </div>
              <div className="flex gap-4 bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30 text-center">
                <div>
                  <span className="text-xs block font-bold">Melike</span>
                  <span className="text-2xl font-black">{quizScores.melike || 0} P</span>
                </div>
                <div className="w-px bg-white/40"></div>
                <div>
                  <span className="text-xs block font-bold">Batuhan</span>
                  <span className="text-2xl font-black">{quizScores.batuhan || 0} P</span>
                </div>
              </div>
            </div>

            {/* Soru Listesi & Soru Ekleme Formu */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Soru Ekleme */}
              <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-rose-100">
                <h3 className="text-md font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-rose-500" /> Sevgiline Soru Hazırla
                </h3>
                <form onSubmit={handleAddQuestion} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Soru Metni</label>
                    <input
                      type="text"
                      placeholder="Örn: En sevdiğim film hangisi?"
                      value={newQuestionForm.q}
                      onChange={(e) => setNewQuestionForm({ ...newQuestionForm, q: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl outline-none mt-1"
                      required
                    />
                  </div>
                  {newQuestionForm.options.map((opt, i) => (
                    <div key={i}>
                      <label className="text-[10px] font-semibold text-slate-500">Seçenek {i + 1}</label>
                      <input
                        type="text"
                        placeholder={`Seçenek ${i + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const updated = [...newQuestionForm.options];
                          updated[i] = e.target.value;
                          setNewQuestionForm({ ...newQuestionForm, options: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs border border-rose-200 rounded-xl outline-none mt-0.5"
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Doğru Seçenek Numarası</label>
                    <select
                      value={newQuestionForm.correct}
                      onChange={(e) => setNewQuestionForm({ ...newQuestionForm, correct: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl outline-none mt-1"
                    >
                      <option value={0}>1. Seçenek</option>
                      <option value={1}>2. Seçenek</option>
                      <option value={2}>3. Seçenek</option>
                      <option value={3}>4. Seçenek</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition shadow-md"
                  >
                    Soruyu Kaydet
                  </button>
                </form>
              </div>

              {/* Soruları Cevaplama Alanı */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-md font-bold text-slate-800">Yayındaki Sorular</h3>
                <div className="space-y-4">
                  {quizQuestions.map((item, idx) => (
                    <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm border border-rose-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-rose-500">Soru #{idx + 1}</span>
                        <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-bold">
                          Hazırlayan: {item.author.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-bold text-slate-800 text-sm mb-3">{item.q}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => handleAnswerQuiz(item.id, oIdx)}
                            className="p-2.5 text-left text-xs bg-slate-50 hover:bg-rose-50 hover:border-rose-300 border border-slate-200 rounded-xl transition"
                          >
                            <strong>{String.fromCharCode(65 + oIdx)})</strong> {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. ANILAR (FOTOĞRAF PANOSU) */}
        {activeTab === "memories" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100">
              <h3 className="text-md font-bold text-slate-800 mb-4 flex items-center gap-1.5">
                <ImageIcon className="w-5 h-5 text-rose-500" /> Yeni Bir Anı Ölümsüzleştir
              </h3>
              <form onSubmit={handleAddMemory} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Başlık (Örn: İlk Kahve)"
                  value={memoryForm.title}
                  onChange={(e) => setMemoryForm({ ...memoryForm, title: e.target.value })}
                  className="px-3 py-2 text-xs border border-rose-200 rounded-xl outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Tarih veya Zaman"
                  value={memoryForm.date}
                  onChange={(e) => setMemoryForm({ ...memoryForm, date: e.target.value })}
                  className="px-3 py-2 text-xs border border-rose-200 rounded-xl outline-none"
                />
                <input
                  type="text"
                  placeholder="Görsel URL (İsteğe bağlı)"
                  value={memoryForm.image}
                  onChange={(e) => setMemoryForm({ ...memoryForm, image: e.target.value })}
                  className="px-3 py-2 text-xs border border-rose-200 rounded-xl outline-none"
                />
                <input
                  type="text"
                  placeholder="Kısa Açıklama"
                  value={memoryForm.desc}
                  onChange={(e) => setMemoryForm({ ...memoryForm, desc: e.target.value })}
                  className="px-3 py-2 text-xs border border-rose-200 rounded-xl outline-none"
                />
                <button
                  type="submit"
                  className="sm:col-span-2 lg:col-span-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition shadow-md"
                >
                  Anıyı Panoya As ❤️
                </button>
              </form>
            </div>

            {/* Polaroid Tarzı Anı Kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {memories.map((m) => (
                <div
                  key={m.id}
                  className="bg-white p-4 pb-6 rounded-3xl shadow-sm border border-rose-100 hover:shadow-md transition"
                >
                  <div className="h-52 rounded-2xl overflow-hidden mb-3 bg-slate-100">
                    <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-800 text-sm">{m.title}</h4>
                    <span className="text-[10px] text-rose-500 font-semibold">{m.date}</span>
                  </div>
                  <p className="text-xs text-slate-500">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. BATUHAN YÖNETİM PANELİ (SADECE BATUHAN GÖREBİLİR) */}
        {activeTab === "admin" && currentUser === "batuhan" && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex items-center justify-between">
              <div>
                <span className="text-rose-400 text-xs uppercase tracking-widest font-bold">
                  Sistem Yöneticisi
                </span>
                <h2 className="text-2xl font-bold mt-1">Batuhan Yönetim & Kontrol Paneli</h2>
                <p className="text-slate-400 text-xs mt-1">
                  İlişki ayarlarını, şifreleri, söz havuzunu ve yedekleri buradan yönetebilirsin.
                </p>
              </div>
              <ShieldCheck className="w-12 h-12 text-rose-500 hidden sm:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tarih & Büyük Ödül Ayarı */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <Settings className="w-4 h-4 text-rose-500" /> Temel Ayarlar
                </h3>
                <div>
                  <label className="text-xs font-semibold text-slate-600">İlişki Başlangıç Tarihi</label>
                  <input
                    type="datetime-local"
                    value={settings.startDate.slice(0, 16)}
                    onChange={(e) => setSettings({ ...settings, startDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl outline-none mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Büyük Quiz Ödülü</label>
                  <input
                    type="text"
                    value={settings.quizReward}
                    onChange={(e) => setSettings({ ...settings, quizReward: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl outline-none mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Günün Ortak Sorusu</label>
                  <input
                    type="text"
                    value={settings.dailyQuestion}
                    onChange={(e) => setSettings({ ...settings, dailyQuestion: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl outline-none mt-1"
                  />
                </div>
              </div>

              {/* Şifre Yönetimi */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-rose-500" /> Giriş Şifreleri
                </h3>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Melike'nin Şifresi</label>
                  <input
                    type="text"
                    value={settings.passwords.melike}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        passwords: { ...settings.passwords, melike: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl outline-none mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Batuhan'ın Şifresi</label>
                  <input
                    type="text"
                    value={settings.passwords.batuhan}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        passwords: { ...settings.passwords, batuhan: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl outline-none mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Günün Sözleri Havuz Yönetimi */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100">
              <h3 className="font-bold text-slate-800 text-sm mb-3">Sevgi Sözleri Havuzu ({quotes.length})</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Melike için yeni güzel söz ekle..."
                  value={newQuoteInput}
                  onChange={(e) => setNewQuoteInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-rose-200 rounded-xl outline-none"
                />
                <button
                  onClick={() => {
                    if (!newQuoteInput.trim()) return;
                    setQuotes([...quotes, newQuoteInput]);
                    setNewQuoteInput("");
                  }}
                  className="px-4 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold hover:bg-rose-600 transition"
                >
                  Ekle
                </button>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {quotes.map((q, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-rose-50/50 rounded-xl text-xs">
                    <span className="italic text-slate-700">"{q}"</span>
                    <button
                      onClick={() => setQuotes(quotes.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Veri Yedekleme & Geri Yükleme */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Verileri Dışa Aktar / Yedekle</h4>
                <p className="text-xs text-slate-500">Tüm sohbetleri, fotoğrafları, soruları ve ayarları JSON olarak kaydet.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleExportData}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Download className="w-4 h-4" /> Yedeği İndir (JSON)
                </button>
                <label className="px-4 py-2 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition">
                  <Upload className="w-4 h-4" /> Yedeği Yükle
                  <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
