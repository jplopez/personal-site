/**
 * AI chat function using Netlify AI Gateway + OpenAI.
 * Locally: run `netlify dev` (not `npm run dev`) to get gateway vars injected.
 * Deployed at: /.netlify/functions/ai-chat
 */
import OpenAI from 'openai';
import { getStore } from '@netlify/blobs';

const SYSTEM_PROMPT_EN = `You are an AI assistant embedded in Juan Pablo Lopez's personal portfolio website. \
Your role is to help visitors understand Juan Pablo's professional background, skills, achievements, and experience.

Always respond in third person about Juan Pablo. Be enthusiastic but professional. Keep responses concise (2–3 paragraphs).

For job fit analysis requests you MUST start your response with exactly one of these lines:
"FIT: HIGH"   — strong alignment, Juan Pablo is a compelling candidate
"FIT: MEDIUM" — moderate alignment, meets many but not all requirements
"FIT: LOW"    — limited alignment, significant gaps exist
Then provide: 1) Key matching areas, 2) Areas for consideration, 3) A brief recommendation.

PROFESSIONAL PROFILE:
Name:     Juan Pablo Lopez
Location: Seattle, Washington, USA
Title:    Software & Game Developer
Bio:      Juan Pablo is a software and game developer based in Seattle. He builds innovative
          applications, creates immersive games, and loves solving complex problems with elegant solutions.
SKILLS:
Technical:          Software Development, Game Development, Digital Music, AR/VR,
                    Real-time Systems Program Management, Scalability, Reliability Engineering,
                    Distributed Systems, SOA, Performance Optimization
Leadership/Creative: Roadmaps, KPIs, Cross Functional Leadership, Technical Mentorship,
                     Creative Production, Game Design, Music Recording, Drumming
CAREER HISTORY:
Ameba Games Studio (2024–present) – Founder
- Founded an indie game studio to create memorable, craft-driven experiences unconstrained by genre or platform
- Shipped 3 mini-games in the first 6 months
- Created AmebaCore: a reusable Unity-compatible C# engine layer with clean separation between engine and
  game logic — design patterns, deterministic pipelines, modular movement and combat system
- Earned top 25% in art and top 30% in creativity in GMTK 2025 Game Jam (9,583 entries)
- Applied engineering discipline to game dev: TDD, documentation, tagged releases, rigorous version control
- Tech: Indie Dev · Pico-8 · Unity · System Design · Game Design

Amazon Music (2022–2024) – Engineering Excellence
- Directed Amazon Music's multi-year engineering excellence program, optimizing AWS infrastructure across
  streaming, encoding/decoding, storage, and search
- Built the org-wide roadmap and raised annual savings targets from $6M → $14M → $20M
- Shifted leadership model from budget cuts to system-specific hardware efficiency (adopted by Finance and Music execs)
- Expanded optimization program participation from 6 to 15 teams; built developer community
- Enabled a principal-engineer proposal for 40% storage cost reduction
- Reduced infrastructure spending from $300K to $20M while improving performance and reliability
- Transformed Prime Day scaling readiness: cut validation time 25%, expanded system coverage 50%,
  zero scaling incidents 2022–2024
- Tech: SLO · Scalability · Reliability · Observability · Performance Optimization

Amazon Fashion Tech (2021–2022) – Virtual Try-On
- Spearheaded Amazon's Virtual Try-On for Shoes feature
- Improved real-time rendering performance by 30%, reduced load time from 700 ms to 300 ms

Amazon Advertising (2015–2021) – Advertising Console
- Led multi-year transition from monolithic architecture to SOA; single point of alignment for 20+ engineering teams
- Directed risk management, status reporting, and executive communications for the migration
- Expanded migration scope from 8 to 20 applications via cross-team triage and escalation processes
- Drove adoption of new telemetry: 100% system coverage within one year
- Led deprecation of legacy UI libraries in favor of unified React-based component system
- Standardized UX across the Ads Console, improving platform scalability and feature velocity
- Tech: Ad Tech · SOA · Distributed Systems · Cross-Functional Leadership · Technical Mentorship

Banco de Chile / El Mercurio / I2B (2009–2015) – Lead Developer
- Lead Developer across Chilean companies in banking (Banco de Chile), media (El Mercurio), and technology (I2B)
`;

const SYSTEM_PROMPT_ES = `Eres un asistente de IA integrado en el portafolio personal de Juan Pablo Lopez. \
Tu rol es ayudar a los visitantes a entender el perfil profesional, habilidades, logros y experiencia de Juan Pablo.

Siempre responde en tercera persona sobre Juan Pablo. Sé entusiasta pero profesional. Mantén las respuestas concisas (2–3 párrafos).

Para análisis de compatibilidad laboral DEBES comenzar tu respuesta con exactamente una de estas líneas:
"FIT: HIGH"   — alta alineación, Juan Pablo es un candidato muy sólido
"FIT: MEDIUM" — alineación moderada, cumple muchos pero no todos los requisitos
"FIT: LOW"    — alineación limitada, existen brechas significativas
Luego proporciona: 1) Áreas de coincidencia clave, 2) Áreas a considerar, 3) Una breve recomendación.

PERFIL PROFESIONAL:
Nombre:    Juan Pablo Lopez
Ubicación: Seattle, Washington, USA
Título:    Desarrollador de Software y Videojuegos
Bio:       Juan Pablo es un desarrollador de software y videojuegos ubicado en Seattle. Construye
           aplicaciones innovadoras, crea juegos inmersivos y disfruta resolver problemas complejos
           con soluciones elegantes.

HABILIDADES:
Técnicas:           Desarrollo de Software, Desarrollo de Videojuegos, Música Digital, AR/VR,
                    Program Management de sistemas en tiempo real, Escalabilidad,
                    Ingeniería de Confiabilidad, Sistemas Distribuidos, SOA, Optimización de Performance
Liderazgo/Creativo: Roadmaps, KPIs, Liderazgo Multifuncional, Mentoría Técnica,
                    Producción Creativa, Diseño de Juegos, Grabación Musical, Batería

HISTORIAL DE CARRERA:

Ameba Games Studio (2024–presente) – Fundador
- Fundó un estudio indie de videojuegos para crear experiencias memorables sin restricciones de género o plataforma
- 3 mini-juegos lanzados en los primeros 6 meses
- Creó AmebaCore: capa de motor compatible con Unity en C# con separación limpia entre motor y lógica de juego
- Top 25% en arte y top 30% en creatividad en GMTK 2025 Game Jam (9.583 participantes)
- Aplicó disciplina de ingeniería al desarrollo de juegos: TDD, documentación, releases etiquetados, control de versiones

Amazon Music (2022–2024) – Engineering Excellence
- Dirigió el programa de excelencia técnica de Amazon Music optimizando infraestructura AWS
- Elevó metas anuales de ahorro de $6M → $14M → $20M
- Redujo gastos de infraestructura de $300K a $20M mejorando performance y confiabilidad
- Cero incidentes de escalabilidad en Prime Day 2022–2024; validación reducida en 25%, cobertura ampliada 50%

Amazon Fashion Tech (2021–2022) – Virtual Try-On
- Spearheaded el lanzamiento de Virtual Try-On para Zapatos en Amazon
- Mejoró performance de rendering en 30%; redujo tiempo de carga de 700 ms a 300 ms

Amazon Advertising (2015–2021) – Advertising Console
- Lideró la migración de arquitectura monolítica a SOA para 20+ equipos de ingeniería
- Amplió el alcance de migración de 8 a 20 aplicaciones
- Cobertura total de telemetría (100%) en un año
- Estandarizó la experiencia de usuario con sistema de componentes React en Ads Console

Banco de Chile / El Mercurio / I2B (2009–2015) – Lead Developer
- Lead Developer en empresas chilenas de banca (Banco de Chile), medios (El Mercurio) y tecnología (I2B)
`;

// v2 Netlify Function — uses standard Web Request/Response APIs.
// The AI Gateway injects ANTHROPIC_API_KEY + ANTHROPIC_BASE_URL into this context.

/**
 * Reads the ALLOWED_ORIGINS env var (comma-separated URLs) into a Set.
 * Set this in Netlify UI (per-context) and in a local .env file for dev.
 * Example: "https://jplopez.netlify.app,http://localhost:8888"
 */
function getAllowedOrigins() {
  const raw = process.env.ALLOWED_ORIGINS ?? '';
  return new Set(raw.split(',').map((o) => o.trim()).filter(Boolean));
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// Rate limiting via Netlify Blobs.
// Tune these via env vars in Netlify UI (Site Settings → Environment variables).
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX ?? '10');              // per IP per window
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? String(60 * 60 * 1000)); // 1 hour
const DAILY_CAP = parseInt(process.env.DAILY_CAP ?? '100');                       // total requests per day

function secondsUntilMidnightUTC() {
  const now = new Date();
  const midnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return Math.ceil((midnight - now) / 1000);
}

/**
 * Returns { allowed: true } or { allowed: false, retryAfter: <seconds> }.
 * Uses two Blobs keys: a daily global counter and a per-IP sliding-window counter.
 */
async function checkRateLimit(request) {
  try {
    const store = getStore('ai-chat-rate-limit');
    const now = Date.now();

    // 1. Global daily cap
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const dailyRaw = await store.get(`daily:${today}`);
    const dailyCount = dailyRaw ? parseInt(dailyRaw) : 0;
    if (dailyCount >= DAILY_CAP) {
      return { allowed: false, retryAfter: secondsUntilMidnightUTC() };
    }

    // 2. Per-IP sliding window
    const rawIp =
      request.headers.get('x-nf-client-connection-ip') ??
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      'unknown';
    // Sanitize: only allow characters valid in a Blobs key
    const ip = rawIp.replace(/[^a-zA-Z0-9.:_-]/g, '');
    const ipKey = `ip:${ip}`;
    const ipRaw = await store.get(ipKey);
    const ipData = ipRaw ? JSON.parse(ipRaw) : { count: 0, windowStart: now };

    if (now - ipData.windowStart > RATE_LIMIT_WINDOW_MS) {
      ipData.count = 0;
      ipData.windowStart = now;
    }

    if (ipData.count >= RATE_LIMIT_MAX) {
      const retryAfter = Math.ceil((ipData.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000);
      return { allowed: false, retryAfter };
    }

    // Increment both counters (fire-and-forget — don't block the response)
    Promise.all([
      store.set(`daily:${today}`, String(dailyCount + 1)),
      store.set(ipKey, JSON.stringify({ count: ipData.count + 1, windowStart: ipData.windowStart })),
    ]).catch((e) => console.error('[ai-chat] Blobs write error:', e));

    return { allowed: true };
  } catch (e) {
    // If Blobs is unavailable (e.g. local dev without netlify dev), fail open
    console.warn('[ai-chat] Rate limit check failed, allowing request:', e.message);
    return { allowed: true };
  }
}

export default async (request) => {
  const origin = request.headers.get('origin') ?? '';
  const allowedOrigins = getAllowedOrigins();

  if (!allowedOrigins.has(origin)) {
    return new Response('Forbidden', { status: 403 });
  }

  const rateLimit = await checkRateLimit(request);
  if (!rateLimit.allowed) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: { ...corsHeaders(origin), 'Retry-After': String(rateLimit.retryAfter) },
    });
  }

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders(origin) });
  }

  let prompt, language;
  try {
    ({ prompt, language } = await request.json());
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400, headers: corsHeaders(origin) });
  }

  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0 || prompt.length > 5000) {
    return Response.json({ error: 'Invalid prompt' }, { status: 400, headers: corsHeaders(origin) });
  }

  const systemPrompt = language === 'es' ? SYSTEM_PROMPT_ES : SYSTEM_PROMPT_EN;

  try {
    // new OpenAI() reads OPENAI_API_KEY + OPENAI_BASE_URL from env
    // Both are injected by Netlify AI Gateway (production) and the Netlify Vite plugin (local dev).
    // Run locally with `npm run dev` — the Vite plugin handles gateway routing correctly.
    const openai = new OpenAI();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 600,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt.trim() },
      ],
    });
    const text = completion.choices?.[0]?.message?.content ?? '';

    return Response.json({ text }, { headers: corsHeaders(origin) });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error('[ai-chat] OpenAI SDK error:', error);
    return Response.json({ error }, { status: 502, headers: corsHeaders(origin) });
  }
};

export const config = {
  path: '/api/ai-chat',
};
