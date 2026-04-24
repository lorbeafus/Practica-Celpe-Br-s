import { useState, useRef, useEffect } from "react";

const conjugations = {
  VER: {
    color: "#1a6b3c",
    accent: "#2ecc71",
    tenses: [
      {
        name: "Presente",
        rows: [
          ["eu", "vejo", "yo veo"],
          ["tu", "vês", "vos ves"],
          ["ele/ela/você", "vê", "él ve"],
          ["nós", "vemos", "nosotros vemos"],
          ["vós", "vedes", "vosotros veis"],
          ["eles/vocês", "veem", "ellos ven"],
        ],
        example: {
          pt: "Eu vejo o mar todo dia.",
          es: "Veo el mar todos los días.",
        },
      },
      {
        name: "Pretérito Perfeito",
        rows: [
          ["eu", "vi", "yo vi"],
          ["tu", "viste", "vos viste"],
          ["ele/ela/você", "viu", "él vio"],
          ["nós", "vimos", "nosotros vimos"],
          ["vós", "vistes", "vosotros visteis"],
          ["eles/vocês", "viram", "ellos vieron"],
        ],
        example: {
          pt: "Ontem eu vi um filme incrível.",
          es: "Ayer vi una película increíble.",
        },
      },
      {
        name: "Pretérito Imperfeito",
        rows: [
          ["eu", "via", "yo veía"],
          ["tu", "vias", "vos veías"],
          ["ele/ela/você", "via", "él veía"],
          ["nós", "víamos", "nosotros veíamos"],
          ["vós", "víeis", "vosotros veíais"],
          ["eles/vocês", "viam", "ellos veían"],
        ],
        example: {
          pt: "Quando era criança, via desenhos animados.",
          es: "Cuando era niño, veía dibujitos.",
        },
      },
      {
        name: "Futuro do Presente",
        rows: [
          ["eu", "verei", "yo veré"],
          ["tu", "verás", "vos verás"],
          ["ele/ela/você", "verá", "él verá"],
          ["nós", "veremos", "nosotros veremos"],
          ["vós", "vereis", "vosotros veréis"],
          ["eles/vocês", "verão", "ellos verán"],
        ],
        example: {
          pt: "Amanhã veremos os resultados.",
          es: "Mañana veremos los resultados.",
        },
      },
      {
        name: "Subjuntivo Presente",
        rows: [
          ["eu", "veja", "yo vea"],
          ["tu", "vejas", "vos veas"],
          ["ele/ela/você", "veja", "él vea"],
          ["nós", "vejamos", "nosotros veamos"],
          ["vós", "vejais", "vosotros veáis"],
          ["eles/vocês", "vejam", "ellos vean"],
        ],
        example: {
          pt: "Espero que você veja isso logo.",
          es: "Espero que veas esto pronto.",
        },
      },
    ],
  },
  VIR: {
    color: "#1a3b6b",
    accent: "#3b8beb",
    tenses: [
      {
        name: "Presente",
        rows: [
          ["eu", "venho", "yo vengo"],
          ["tu", "vens", "vos venís"],
          ["ele/ela/você", "vem", "él viene"],
          ["nós", "vimos", "nosotros venimos"],
          ["vós", "vindes", "vosotros venís"],
          ["eles/vocês", "vêm", "ellos vienen"],
        ],
        example: { pt: "Ele vem de São Paulo.", es: "Él viene de São Paulo." },
      },
      {
        name: "Pretérito Perfeito",
        rows: [
          ["eu", "vim", "yo vine"],
          ["tu", "vieste", "vos viniste"],
          ["ele/ela/você", "veio", "él vino"],
          ["nós", "viemos", "nosotros vinimos"],
          ["vós", "viestes", "vosotros vinisteis"],
          ["eles/vocês", "vieram", "ellos vinieron"],
        ],
        example: {
          pt: "Eles vieram à festa ontem.",
          es: "Ellos vinieron a la fiesta ayer.",
        },
      },
      {
        name: "Pretérito Imperfeito",
        rows: [
          ["eu", "vinha", "yo venía"],
          ["tu", "vinhas", "vos venías"],
          ["ele/ela/você", "vinha", "él venía"],
          ["nós", "vínhamos", "nosotros veíamos"],
          ["vós", "vínheis", "vosotros veíais"],
          ["eles/vocês", "vinham", "ellos venían"],
        ],
        example: {
          pt: "Ele sempre vinha cedo ao trabalho.",
          es: "Él siempre venía temprano al trabajo.",
        },
      },
      {
        name: "Futuro do Presente",
        rows: [
          ["eu", "virei", "yo vendré"],
          ["tu", "virás", "vos vendrás"],
          ["ele/ela/você", "virá", "él vendrá"],
          ["nós", "viremos", "nosotros vendremos"],
          ["vós", "vireis", "vosotros vendréis"],
          ["eles/vocês", "virão", "ellos vendrán"],
        ],
        example: {
          pt: "Eles virão no próximo mês.",
          es: "Ellos vendrán el próximo mes.",
        },
      },
      {
        name: "Subjuntivo Presente",
        rows: [
          ["eu", "venha", "yo venga"],
          ["tu", "venhas", "vos vengas"],
          ["ele/ela/você", "venha", "él venga"],
          ["nós", "venhamos", "nosotros vengamos"],
          ["vós", "venhais", "vosotros vengáis"],
          ["eles/vocês", "venham", "ellos vean"],
        ],
        example: {
          pt: "Espero que você venha logo.",
          es: "Espero que vengas pronto.",
        },
      },
    ],
  },
};

const exercises = [
  {
    id: 1,
    tipo: "Tarefa 1 — Vídeo + E-mail Formal",
    nivel: "Intermediário Superior",
    nivelColor: "#e67e22",
    videoUrl:
      "https://videohighlight.com/v/xPNyEop0yFc?language=es&utm_source=chatgpt.com",
    contexto:
      "📺 Assista ao vídeo sobre o impacto das redes sociais na educação. Ele aborda benefícios como aprendizagem colaborativa, além de riscos e questões de privacidade.",
    tarefa:
      "Escreva um e-mail formal a um diretor de escola propondo a integração das redes sociais em sala de aula como ferramenta pedagógica. (Mínimo 20 linhas)",
    dicas: [
      "Retome ideias do vídeo: aprendizagem colaborativa, riscos e privacidade",
      "Proponha medidas concretas para implementar essa integração",
      "Mantenha o registro formal adequado (Prezado Diretor, Atenciosamente)",
      "Argumente como isso pode motivar os estudantes no processo de ensino",
    ],
  },
  {
    id: 2,
    tipo: "Tarefa 2 — Notícia + Artigo de Opinião",
    nivel: "Intermediário",
    nivelColor: "#27ae60",
    videoUrl:
      "https://g1.globo.com/economia/noticia/2024/03/15/aumento-do-custo-de-vida-no-brasil.ghtml",
    contexto:
      "📰 Leia a notícia sobre o aumento do custo de vida no Brasil. O texto apresenta dados econômicos e o impacto na vida cotidiana das famílias brasileiras.",
    tarefa:
      "Escreva um artigo de opinião para um blog analisando o aumento do custo de vida. (Mínimo 15 linhas)",
    dicas: [
      "Faça um resumo claro do problema apresentado na notícia",
      "Analise o impacto na sociedade: classes mais afectadas, consequências",
      "Apresente sua postura de forma clara e fundamentada",
      "Proponha possíveis soluções (políticas públicas, hábitos, etc.)",
    ],
  },
  {
    id: 3,
    tipo: "Tarefa 3 — Vídeo + Carta Argumentativa",
    nivel: "Intermediário Superior",
    nivelColor: "#e67e22",
    videoUrl:
      "https://videohighlight.com/v/RRNTwO95fLY?language=es&utm_source=chatgpt.com",
    contexto:
      "📺 Assista ao vídeo sobre o impacto das redes sociais no desempenho escolar. O material destaca temas como comunidade, colaboração e os reflexos acadêmicos.",
    tarefa:
      "Escreva uma carta a uma instituição educativa opinando sobre o uso de redes sociais ou tecnologia no ambiente de estudo. (Mínimo 15 linhas)",
    dicas: [
      "Aborde os conceitos de comunidade e colaboração apresentados no vídeo",
      "Compare as ventajas e desvantagens (rendimento acadêmico vs distractores)",
      "Use exemplos do vídeo para sustentar sua argumentação",
      "Mantenha uma postura clara: defesa ou questionamento do uso das redes",
    ],
  },
  {
    id: 4,
    tipo: "Tarefa 4 — Vídeo + Texto Persuasivo",
    nivel: "Avançado",
    nivelColor: "#c0392b",
    videoUrl: "https://www.youtube.com/watch?v=9ZfN87gSjvI",
    contexto:
      "📺 Assista ao vídeo sobre as consequências do câmbio climático e os desafios que as gerações futuras enfrentarão. O material inclui depoimentos de cientistas e ativistas jovens.",
    tarefa:
      "Escreva um texto persuasivo dirigido a jovens para motivar ações concretas contra o câmbio climático. (Mínimo 25 linhas)",
    dicas: [
      "Use um tom adequado ao público jovem: dinâmico, direto, empático",
      "Convença com dados, emoção e lógica (ethos, pathos, logos)",
      "Inclua um chamado à ação claro e específico no final",
      "Reconheça objeções (é difícil, sou só uma pessoa...) e refute-as",
    ],
  },
];

export default function CelpeBras() {
  const [tab, setTab] = useState("ejercicios");
  const [verbTab, setVerbTab] = useState("VER");
  const [tenseIdx, setTenseIdx] = useState(0);
  const [exIdx, setExIdx] = useState(0);
  const [respuesta, setRespuesta] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [videoUrl, setVideoUrl] = useState(exercises[0].videoUrl || "");
  const [inputMode, setInputMode] = useState("text");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const fileRef = useRef();

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const verb = conjugations[verbTab];
  const tense = verb.tenses[tenseIdx];
  const ex = exercises[exIdx];

  const handleText = (e) => {
    const val = e.target.value;
    setRespuesta(val);
    setWordCount(val.trim() ? val.trim().split(/\s+/).length : 0);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const base64 = dataUrl.split(",")[1];
      setUploadedImage({ base64, preview: dataUrl, mediaType: file.type });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const buildMessages = () => {
    const prompt = `Você é um avaliador certificado do Celpe-Bras. Avalie a redação abaixo de um candidato hispanofalante.

TAREFA: ${ex.tipo}
CONTEXTO: ${ex.contexto}
TAREFA SOLICITADA: ${ex.tarefa}

${uploadedImage ? "A redação foi enviada como imagem manuscrita. Transcreva-a primeiro, depois avalie." : `REDAÇÃO:\n${respuesta}`}

Avalie por: (1) Competência textual, (2) Léxico-gramatical, (3) Adequação ao contexto, (4) Pertinência do conteúdo. Dê nota 0–4 para cada critério e nível geral estimado. Aponte 3 pontos fortes, 3 a melhorar com exemplos, e erros típicos de hispanófonos. Responda em português.`;

    if (uploadedImage) {
      return [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: uploadedImage.mediaType,
                data: uploadedImage.base64,
              },
            },
            { type: "text", text: prompt },
          ],
        },
      ];
    }
    return [{ role: "user", content: prompt }];
  };

  const avaliar = async () => {
    const canEvaluate =
      inputMode === "image" ? !!uploadedImage : wordCount >= 30;
    if (!canEvaluate) return;
    setLoading(true);
    setFeedback("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 1500,
          messages: buildMessages(),
        }),
      });
      const data = await res.json();
      const text =
        data.content?.map((b) => b.text || "").join("") || "Erro ao processar.";
      setFeedback(text);
    } catch {
      setFeedback("Erro de conexão. Tente novamente.");
    }
    setLoading(false);
  };

  const canSubmit = inputMode === "image" ? !!uploadedImage : wordCount >= 30;

  /* ───── styles ───── */
  const s = {
    wrap: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a1628 0%, #1a2a1a 100%)",
      fontFamily: "'Georgia', serif",
      color: "#e8dcc8",
    },
    flagStripe: {
      background:
        "linear-gradient(90deg, #006847 0%, #009c3b 50%, #ffdf00 100%)",
      padding: "3px 0",
    },
    header: {
      background: "rgba(0,0,0,0.6)",
      padding: "24px 20px 16px",
      textAlign: "center",
      borderBottom: "1px solid rgba(255,223,0,0.3)",
    },
    subtitle: {
      fontSize: "11px",
      letterSpacing: "4px",
      color: "#ffdf00",
      marginBottom: "6px",
      fontFamily: "monospace",
    },
    h1: {
      margin: 0,
      fontSize: "clamp(20px,4vw,28px)",
      fontWeight: "bold",
      color: "#fff",
      letterSpacing: "1px",
    },
    dateText: { fontSize: "12px", color: "#aaa", marginTop: "4px" },
    tabBar: {
      display: "flex",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
    },
    tab: (active) => ({
      flex: 1,
      padding: "14px",
      background: active ? "rgba(255,223,0,0.1)" : "transparent",
      border: "none",
      borderBottom: active ? "2px solid #ffdf00" : "2px solid transparent",
      color: active ? "#ffdf00" : "#888",
      cursor: "pointer",
      fontSize: "14px",
      fontFamily: "inherit",
      transition: "all 0.2s",
    }),
    content: { padding: "20px 16px", maxWidth: "800px", margin: "0 auto" },
    chip: (active, color) => ({
      padding: "6px 14px",
      background: active ? color || "#ffdf00" : "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "20px",
      color: active ? (color ? "#fff" : "#000") : "#aaa",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: active ? "bold" : "normal",
      transition: "all 0.2s",
    }),
    card: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "12px",
      overflow: "hidden",
      marginBottom: "16px",
    },
    cardHead: {
      padding: "12px 16px",
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    badge: (color) => ({
      fontSize: "11px",
      padding: "3px 10px",
      borderRadius: "12px",
      background: color + "33",
      color: color,
      border: `1px solid ${color}66`,
    }),
    stimulus: {
      background: "rgba(0,104,71,0.2)",
      border: "1px solid rgba(0,104,71,0.4)",
      borderRadius: "8px",
      padding: "14px",
      marginBottom: "14px",
      fontSize: "14px",
      lineHeight: "1.6",
    },
    labelSmall: {
      fontSize: "11px",
      color: "#ffdf00",
      marginBottom: "8px",
      letterSpacing: "1px",
    },
    input: {
      flex: 1,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: "8px",
      padding: "10px 12px",
      color: "#e8dcc8",
      fontSize: "13px",
      fontFamily: "inherit",
      outline: "none",
    },
    textarea: {
      width: "100%",
      minHeight: "230px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: "8px",
      padding: "14px",
      color: "#e8dcc8",
      fontSize: "14px",
      lineHeight: "1.7",
      fontFamily: "Georgia, serif",
      resize: "vertical",
      boxSizing: "border-box",
      outline: "none",
    },
    btn: (disabled) => ({
      width: "100%",
      padding: "14px",
      background: disabled
        ? "rgba(255,255,255,0.05)"
        : "linear-gradient(135deg, #ffdf00, #f39c12)",
      border: "none",
      borderRadius: "10px",
      color: disabled ? "#555" : "#000",
      fontSize: "15px",
      fontWeight: "bold",
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "inherit",
      transition: "all 0.2s",
      letterSpacing: "0.5px",
    }),
    feedbackBox: {
      marginTop: "20px",
      background: "rgba(0,104,71,0.12)",
      border: "1px solid rgba(0,104,71,0.35)",
      borderRadius: "12px",
      padding: "20px",
      lineHeight: "1.8",
      fontSize: "14px",
      whiteSpace: "pre-wrap",
    },
    tenseBtn: (active, accent) => ({
      padding: "8px 14px",
      background: active ? accent + "22" : "rgba(255,255,255,0.04)",
      border: `1px solid ${active ? accent : "rgba(255,255,255,0.1)"}`,
      borderRadius: "8px",
      color: active ? accent : "#888",
      cursor: "pointer",
      fontSize: "12px",
      fontFamily: "inherit",
      transition: "all 0.2s",
    }),
    th: (c) => ({
      padding: "10px 14px",
      textAlign: "left",
      color: c,
      fontSize: "11px",
      letterSpacing: "1px",
      fontWeight: "bold",
      background: "rgba(0,0,0,0.2)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }),
    td: {
      padding: "10px 14px",
      fontSize: "13px",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    },
  };

  return (
    <div style={s.wrap}>
      {/* Flag stripe */}
      <div style={s.flagStripe} />

      {/* Header */}
      <header style={s.header}>
        <div style={s.subtitle}>REPÚBLICA FEDERATIVA DO BRASIL</div>
        <h1 style={s.h1}>Celpe-Bras</h1>
        <p style={s.dateText}>Preparação para a prova · Próxima terça-feira</p>

        {/* Timer */}
        <div style={{ marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 16px", background: "rgba(255,223,0,0.1)", borderRadius: "20px", border: "1px solid rgba(255,223,0,0.3)" }}>
          <span style={{ fontSize: "18px", fontFamily: "monospace", color: time > 2700 ? "#e74c3c" : "#ffdf00", fontWeight: "bold" }}>
            ⏱️ {formatTime(time)}
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <button onClick={() => setIsActive(!isActive)} style={{ background: "#ffdf00", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>
              {isActive ? "⏸️" : "▶️"}
            </button>
            <button onClick={() => { setIsActive(false); setTime(0); }} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "24px", height: "24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#fff" }}>
              🔄
            </button>
          </div>
          {time > 2700 && <span style={{ fontSize: "10px", color: "#e74c3c", marginLeft: "4px" }}>Tempo ideal excedido (45m)</span>}
        </div>
      </header>

      {/* Tabs */}
      <nav style={s.tabBar}>
        {[
          { id: "ejercicios", label: "📝 Ejercicios" },
          { id: "conjugaciones", label: "📊 Conjugaciones" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={s.tab(tab === t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main style={s.content}>
        {/* ── EJERCICIOS ── */}
        {tab === "ejercicios" && (
          <section>
            {/* Exercise selector */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "16px",
                flexWrap: "wrap",
              }}
            >
              {exercises.map((e, i) => (
                <button
                  key={e.id}
                  onClick={() => {
                    setExIdx(i);
                    setFeedback("");
                    setRespuesta("");
                    setWordCount(0);
                    setVideoUrl(exercises[i].videoUrl || "");
                    setUploadedImage(null);
                  }}
                  style={s.chip(exIdx === i)}
                >
                  Tarefa {e.id}
                </button>
              ))}
            </div>

            {/* Exercise card */}
            <div style={s.card}>
              <div style={s.cardHead}>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#ffdf00",
                  }}
                >
                  {ex.tipo}
                </span>
                <span style={s.badge(ex.nivelColor)}>{ex.nivel}</span>
              </div>
              <div style={{ padding: "16px" }}>
                {/* Estímulo */}
                <div style={s.stimulus}>
                  <div style={s.labelSmall}>ESTÍMULO</div>
                  {ex.contexto}
                </div>

                {/* Material link button */}
                {ex.videoUrl && (
                  <div style={{ marginBottom: "14px" }}>
                    <div style={s.labelSmall}>📖 MATERIAL DE APOIO</div>
                    <a
                      href={ex.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "16px 20px",
                        background:
                          "linear-gradient(135deg, rgba(255,223,0,0.1), rgba(255,223,0,0.05))",
                        border: "1px solid rgba(255,223,0,0.3)",
                        borderRadius: "12px",
                        color: "#ffdf00",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "bold",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(135deg, rgba(255,223,0,0.2), rgba(255,223,0,0.1))";
                        e.currentTarget.style.borderColor =
                          "rgba(255,223,0,0.5)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(135deg, rgba(255,223,0,0.1), rgba(255,223,0,0.05))";
                        e.currentTarget.style.borderColor =
                          "rgba(255,223,0,0.3)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>
                        {ex.videoUrl.includes("youtube") ||
                        ex.videoUrl.includes("youtu.be")
                          ? "📺"
                          : "📰"}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "rgba(255,223,0,0.7)",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            marginBottom: "2px",
                          }}
                        >
                          Clique para abrir o material
                        </div>
                        <div style={{ wordBreak: "break-all", opacity: 0.9 }}>
                          {ex.videoUrl}
                        </div>
                      </div>
                      <span style={{ fontSize: "18px" }}>↗</span>
                    </a>
                  </div>
                )}

                {/* Tarefa */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    padding: "14px",
                    marginBottom: "14px",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#aaa",
                      marginBottom: "6px",
                      letterSpacing: "1px",
                    }}
                  >
                    TAREFA
                  </div>
                  {ex.tarefa}
                </div>

                {/* Dicas */}
                <div>
                  <div style={s.labelSmall}>💡 DICAS</div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {ex.dicas.map((d, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: "12px",
                          color: "#ccc",
                          paddingLeft: "12px",
                          borderLeft: "2px solid rgba(255,223,0,0.3)",
                        }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Input mode toggle */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              {[
                { id: "text", label: "⌨️ Digitar" },
                { id: "image", label: "📷 Foto do manuscrito" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setInputMode(m.id);
                    setFeedback("");
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background:
                      inputMode === m.id
                        ? "rgba(255,223,0,0.15)"
                        : "rgba(255,255,255,0.04)",
                    border: `1px solid ${inputMode === m.id ? "#ffdf00" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: "8px",
                    color: inputMode === m.id ? "#ffdf00" : "#888",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Text mode */}
            {inputMode === "text" && (
              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#ccc" }}>
                    Sua redação:
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: wordCount >= 30 ? "#2ecc71" : "#e74c3c",
                    }}
                  >
                    {wordCount} palavras
                  </span>
                </div>
                <textarea
                  value={respuesta}
                  onChange={handleText}
                  placeholder="Escreva aqui sua redação em português..."
                  style={s.textarea}
                />
              </div>
            )}

            {/* Image mode */}
            {inputMode === "image" && (
              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#ccc",
                    marginBottom: "8px",
                  }}
                >
                  Foto da redação manuscrita:
                </div>
                {!uploadedImage ? (
                  <div
                    onClick={() => fileRef.current?.click()}
                    style={{
                      border: "2px dashed rgba(255,223,0,0.35)",
                      borderRadius: "10px",
                      padding: "40px 20px",
                      textAlign: "center",
                      cursor: "pointer",
                      background: "rgba(255,223,0,0.03)",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                      📷
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#ffdf00",
                        marginBottom: "4px",
                      }}
                    >
                      Toque para subir uma foto
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      JPG, PNG ou WEBP · A IA vai transcrever e avaliar
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <img
                      src={uploadedImage.preview}
                      alt="Redação manuscrita"
                      style={{
                        width: "100%",
                        display: "block",
                        maxHeight: "420px",
                        objectFit: "contain",
                        background: "#111",
                      }}
                    />
                    <button
                      onClick={removeImage}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "rgba(0,0,0,0.75)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ✖
                    </button>
                    <div
                      style={{
                        padding: "8px 12px",
                        background: "rgba(0,0,0,0.5)",
                        fontSize: "12px",
                        color: "#aaa",
                      }}
                    >
                      ✅ Imagem carregada · A IA vai transcrever e avaliar
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={avaliar}
              disabled={!canSubmit || loading}
              style={s.btn(!canSubmit || loading)}
            >
              {loading ? "⌛ Avaliando..." : "🤖 Avaliar com IA"}
            </button>

            {!canSubmit && inputMode === "text" && (
              <div
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  color: "#666",
                  marginTop: "8px",
                }}
              >
                Mínimo 30 palavras para avaliar
              </div>
            )}

            {/* Feedback */}
            {feedback && (
              <div style={s.feedbackBox}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <div style={s.labelSmall}>✨ AVALIAÇÃO DO CELPE-BRAS</div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(feedback);
                      alert("Copiado!");
                    }}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "4px",
                      color: "#ccc",
                      fontSize: "11px",
                      padding: "4px 8px",
                      cursor: "pointer",
                    }}
                  >
                    Copiar
                  </button>
                </div>
                {feedback}
              </div>
            )}
          </section>
        )}

        {/* ── CONJUGACIONES ── */}
        {tab === "conjugaciones" && (
          <section>
            {/* Verb selector */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              {Object.entries(conjugations).map(([v, data]) => (
                <button
                  key={v}
                  onClick={() => {
                    setVerbTab(v);
                    setTenseIdx(0);
                  }}
                  style={{
                    ...s.chip(verbTab === v, data.accent),
                    padding: "8px 20px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Tense tabs */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "16px",
                flexWrap: "wrap",
              }}
            >
              {verb.tenses.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setTenseIdx(i)}
                  style={s.tenseBtn(tenseIdx === i, verb.accent)}
                >
                  {t.name}
                </button>
              ))}
            </div>

            {/* Table */}
            <div style={s.card}>
              <div
                style={{
                  ...s.cardHead,
                  borderBottom: `2px solid ${verb.accent}33`,
                }}
              >
                <span
                  style={{
                    color: verb.accent,
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  {verbTab} — {tense.name}
                </span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={s.th("#aaa")}>PRONOME</th>
                    <th style={s.th(verb.accent)}>PORTUGUÊS</th>
                    <th style={s.th("#e8dcc8")}>ESPAÑOL</th>
                  </tr>
                </thead>
                <tbody>
                  {tense.rows.map(([pron, pt, es], i) => (
                    <tr
                      key={i}
                      style={{
                        background:
                          i % 2 === 0
                            ? "rgba(255,255,255,0.02)"
                            : "transparent",
                      }}
                    >
                      <td
                        style={{ ...s.td, color: "#888", fontStyle: "italic" }}
                      >
                        {pron}
                      </td>
                      <td
                        style={{
                          ...s.td,
                          color: verb.accent,
                          fontWeight: "bold",
                        }}
                      >
                        {pt}
                      </td>
                      <td style={{ ...s.td, color: "#e8dcc8" }}>{es}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Example */}
            <div
              style={{
                background: `${verb.accent}11`,
                border: `1px solid ${verb.accent}33`,
                borderRadius: "10px",
                padding: "16px",
                marginTop: "8px",
              }}
            >
              <div style={{ ...s.labelSmall, color: verb.accent }}>
                💬 EXEMPLO
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#e8dcc8",
                  marginBottom: "6px",
                  lineHeight: 1.6,
                }}
              >
                🇧🇷 {tense.example.pt}
              </div>
              <div style={{ fontSize: "14px", color: "#aaa", lineHeight: 1.6 }}>
                🇦🇷 {tense.example.es}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
