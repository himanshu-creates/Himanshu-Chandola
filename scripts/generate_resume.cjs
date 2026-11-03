const fs = require('fs');

function createSimplePdf() {
  const content = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 595.28 841.89]
  /Contents 4 0 R
  /Resources <<
    /Font <<
      /F1 5 0 R
      /F2 6 0 R
    >>
  >>
>>
endobj
4 0 obj
<<
  /Length 1150
>>
stream
BT
/F1 24 Tf
50 780 Td
(HIMANSHU CHANDOLA) Tj
/F2 14 Tf
0 -26 Td
(Product Designer | UI/UX Designer) Tj
/F2 10 Tf
0 -20 Td
(Devbhoomi Uttarakhand University | BCA - Full Stack Development) Tj
0 -15 Td
(LinkedIn: linkedin.com/in/himanshu-chandola-1b80a3292/) Tj
0 -15 Td
(WhatsApp: +91 81711 82424 | Email: himanshuchandola.design@gmail.com) Tj

0 -30 Td
/F1 14 Tf
(PROFESSIONAL EXPERIENCE) Tj
/F2 10 Tf
0 -18 Td
(Pahadi Bhula Production - UI/UX & Product Designer Intern (6 Months)) Tj
0 -14 Td
(Duration: 15 January - 15 June) Tj
0 -14 Td
(- Designed user-centered flows, interactive prototypes, and digital product experiences.) Tj
0 -14 Td
(- Collaborated closely with development teams bridging design systems and frontend code.) Tj

0 -30 Td
/F1 14 Tf
(FEATURED PROJECTS) Tj
/F2 10 Tf
0 -18 Td
(01. PahadGrow - Community & Business Platform in Uttarakhand) Tj
0 -14 Td
(    Case Study: pahad-grow-product-case-study-lg48tdg0y.vercel.app) Tj
0 -14 Td
(    Live Website: pahad-grow.vercel.app) Tj
0 -18 Td
(02. Maa Dunagiri Rental - Complete Client Website & Rental Platform) Tj
0 -14 Td
(    Case Study: maa-dunagiri-rental-product-case-st.vercel.app) Tj
0 -14 Td
(    Live Website: maadunagirirental.in) Tj

0 -30 Td
/F1 14 Tf
(CORE SKILLS) Tj
/F2 10 Tf
0 -18 Td
(Product Design, UI/UX Design, Figma, Wireframing, Prototyping, User Research,) Tj
0 -14 Td
(Responsive Web Design, HTML, CSS, JavaScript, React, Tailwind CSS, Git & GitHub.) Tj

0 -40 Td
/F2 9 Tf
([PLACEHOLDER RESUME - Replace this file with your official resume PDF at public/resume.pdf]) Tj
ET
endstream
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
6 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000278 00000 n 
0000001480 00000 n 
0000001552 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1619
%%EOF`;

  fs.writeFileSync('public/resume.pdf', content);
  fs.writeFileSync('public/Himanshu_Chandola_Resume.pdf', content);
  console.log('Resume PDF placeholder generated at public/resume.pdf');
}

createSimplePdf();

