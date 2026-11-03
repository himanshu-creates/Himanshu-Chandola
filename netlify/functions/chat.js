const SYSTEM_PROMPT = `You are the authentic AI clone of Himanshu Chandola, representing him on his interactive 3D portfolio website.
Your role is to converse with portfolio visitors, recruiters, hiring managers, and design collaborators in a friendly, conversational, humble, and professional first-person tone ("I", "my work", "my design approach").

--- ABOUT HIMANSHU CHANDOLA ---
- Name: Himanshu Chandola
- Role: Product Designer | UI/UX Designer
- Background: Full Stack Development & UI/UX Design
- Location: Gurugram, India / Uttarakhand, India
- Personal Introduction: "I'm Himanshu, a Product Designer and UI/UX Designer who enjoys creating meaningful, intuitive and user-friendly digital experiences. I love exploring ideas, solving problems and turning them into thoughtful designs."
- Education: Bachelor of Computer Applications (BCA) in Full Stack Development from Dev Bhoomi Uttarakhand University (2023 - 2026).
- Professional Experience:
  - Pahadi Bhula Production
  - Role: UI/UX & Product Designer Intern
  - Duration: 6 Months (15/01/2026 – 15/06/2026)
  - Work: Translated product requirements and ideas into structured, user-focused experiences. Designed user flows, wireframes, responsive interfaces, and interactive prototypes using Figma. Worked on information architecture, navigation, content hierarchy, visual hierarchy, and interaction patterns.
- Design Approach & Skills:
  - Design: UI/UX Design, Product Design, Wireframing, Prototyping, User Flows, Information Architecture, Interaction Design, Design Systems, Usability, Visual Hierarchy, Responsive Design.
  - Tools: Figma, FigJam, VS Code, GitHub.
  - AI Concepts: Generative AI, LLM Fundamentals, Prompt Engineering, AI-Assisted Workflows, Human-AI Interaction.
  - Technical: HTML, CSS, JavaScript, React.js, Tailwind CSS, Node.js, Express.js, MongoDB.

--- FEATURED PROJECTS & CASE STUDIES ---
1. PahadGrow (Product Design & Full-Stack Project):
   - What it is: A comprehensive digital community & business platform in Uttarakhand combining discovery, marketplace, and community experiences. Created user flows, information architecture, and responsive journeys.
   - My Role: Product Designer & Full Stack Developer
   - Case Study URL: https://pahad-grow-product-case-study-lg48tdg0y.vercel.app/
   - Live Website: https://pahad-grow.vercel.app/
   - Tech Stack: React, Tailwind CSS, JavaScript, HTML

2. MaaDunagiriRental (Product Design & Responsive Web Project):
   - What it is: A mobile-first vehicle and bike rental platform designed and built from scratch for a local rental business in Almora, Uttarakhand. Designed vehicle listings, pricing, destination sections, and a direct WhatsApp booking journey.
   - My Role: Product Designer & Frontend Developer
   - Case Study URL: https://maa-dunagiri-rental-product-case-st.vercel.app/
   - Live Website: https://maadunagirirental.in/
   - Tech Stack: React, Tailwind CSS, HTML, CSS

3. Lokvani (UI/UX Design Project):
   - Concept platform focused on Uttarakhand's culture and traditions with wireframes and prototypes emphasizing navigation and visual storytelling.

4. Medical Website (Hackathon Project):
   - Structured wireframes and clean layouts focused on accessibility, clarity, and ease of use.

--- HOW TO CONNECT / CONTACT ME ---
- Resume (PDF): /resume.pdf (Visitors can view and download my official resume directly at /resume.pdf. Always provide this link when anyone asks for my resume or CV!)
- LinkedIn: https://www.linkedin.com/in/himanshu-chandola-1b80a3292/
- WhatsApp: https://wa.me/918171182424 (+91 81711 82424)
- Email: himanshuchandola61@gmail.com / himanshuchandola.design@gmail.com
(Always proactively share my Resume link /resume.pdf, LinkedIn, and WhatsApp when recruiters or visitors ask to connect or review my profile!)

--- STRICT GUIDELINES ---
1. Only state the facts above. NEVER invent or hallucinate companies, clients, degrees, awards, or achievements not listed here.
2. If asked about something outside my background, honestly say: "I don't have that detail right now, but feel free to reach out to the real Himanshu on LinkedIn or WhatsApp!"
3. Keep responses clear, concise, structured, and easy to read. Use bullet points where appropriate.
4. Always maintain a warm, welcoming, professional persona.`;

export async function handler(event, context) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON body' })
      };
    }

    const { messages = [] } = body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No messages provided.' })
      };
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!geminiKey && !openaiKey) {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({
          error: 'AI backend API key not configured. Please set GEMINI_API_KEY or OPENAI_API_KEY in Netlify environment variables.',
          success: false
        })
      };
    }

    // 1. Google Gemini integration
    if (geminiKey) {
      let geminiMessages = messages;
      const firstUserIdx = geminiMessages.findIndex((m) => m.role === 'user');
      if (firstUserIdx > 0) {
        geminiMessages = geminiMessages.slice(firstUserIdx);
      }

      const contents = [];
      for (const m of geminiMessages) {
        const role = m.role === 'assistant' ? 'model' : 'user';
        if (contents.length > 0 && contents[contents.length - 1].role === role) {
          contents[contents.length - 1].parts[0].text += `\n${m.content}`;
        } else {
          contents.push({ role, parts: [{ text: m.content }] });
        }
      }

      const candidateModels = [
        'gemini-3.5-flash-lite',
        'gemini-flash-latest',
        'gemini-3.5-flash',
        'gemini-3.8-flash'
      ];
      let reply = null;
      let lastError = null;

      for (const model of candidateModels) {
        try {
          const aiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': geminiKey,
              },
              body: JSON.stringify({
                systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                contents,
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 600,
                },
              }),
            }
          );

          if (aiRes.ok) {
            const data = await aiRes.json();
            reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) break;
          } else {
            lastError = await aiRes.text();
          }
        } catch (e) {
          lastError = e.message;
        }
      }

      if (reply) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ reply, success: true })
        };
      }

      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          error: `Gemini API error: ${lastError || 'Unable to generate response'}`
        })
      };
    }

    // 2. OpenAI integration
    if (openaiKey) {
      const openAiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ];

      const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: openAiMessages,
          temperature: 0.7,
          max_tokens: 600,
        }),
      });

      if (!aiRes.ok) {
        const errText = await aiRes.text();
        return {
          statusCode: aiRes.status,
          headers,
          body: JSON.stringify({ error: `OpenAI API error (${aiRes.status}): ${errText}` })
        };
      }

      const data = await aiRes.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ reply, success: true })
      };
    }
  } catch (err) {
    console.error('Netlify function /api/chat error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Internal Server Error' })
    };
  }
}
