# **Kaizen Digilabs — Typography Guideline**

A modern Japanese-inspired typography system that balances elegance, clarity, and professionalism. This guideline ensures consistency across the entire Kaizen Digilabs brand.

---

## **1. Font Families**

### **Primary Heading Font — Geist Sans**

*   **Use for:** H1, H2, H3, Hero Titles
*   **Weights:** 600–800 (use 700–800 for H1/H2)
*   **Tone:** Modern, clean, precise, neo-minimal
*   **Why:** Provides a sharp, contemporary look that aligns with the "Kaizen" philosophy of continuous improvement and modernity.

### **Primary Body & UI Font — Noto Sans JP**

*   **Use for:** Paragraphs, buttons, navigation, labels, UI elements, **Kanji Decoration**
*   **Weights:** 400–500 (Body), 700 (Kanji Decoration)
*   **Tone:** Clean, readable, balanced
*   **Why:** Excellent readability for long text + full Kanji support.

### **Mono Utility Font — Geist Mono**

*   **Use for (only):**
    *   Numbering: `<span className="font-mono text-xs tracking-wider text-muted-foreground">01</span>`
    *   Code blocks: `<pre className="font-mono text-sm bg-secondary/40 p-4">...</pre>`
    *   Article meta: `<span className="font-mono text-[11px] text-muted-foreground">2024 • 8 min read</span>`
    *   Brand Labels: "KAIZEN DIGILABS"
*   **Weights:** 400
*   **Tone:** Functional, neutral, technical
*   **Class:** `font-mono`

---

## **2. Font Scaling & Hierarchy**

A consistent typographic scale ensures rhythm and visual harmony.

### **Display / Hero Heading (H1)**

*   **Font:** Geist Sans
*   **Size:** 48–64px (Mobile), 64–96px (Desktop)
*   **Weight:** 700–800
*   **Letter spacing:** -0.02em to -0.04em (Tighter for impact)
*   **Line height:** 0.9–1.0
*   **Case:** Uppercase (Editorial Style)

### **Section Heading (H2)**

*   **Font:** Geist Sans
*   **Size:** 32–40px
*   **Weight:** 600–700
*   **Letter spacing:** -0.02em
*   **Line height:** 1.2

### **Subheading (H3)**

*   **Font:** Geist Sans
*   **Size:** 24–28px
*   **Weight:** 600
*   **Line height:** 1.3

### **Body Text (Paragraph)**

*   **Font:** Noto Sans JP
*   **Size:** 15–16px
*   **Weight:** 400
*   **Line height:** 1.6–1.8
*   **Use case:** Articles, descriptions, service explanations

### **Small Text / UI Labels**

*   **Font:** Noto Sans JP
*   **Size:** 11–12px
*   **Weight:** 500
*   **Letter spacing:** +0.05em to +0.15em
*   **Tone:** Japanese minimal editorial
*   **Use case:**
    *   SECTION LABELS: "PROCESS", "WORKS", "ARTICLES"
    *   Meta info: dates, tags, category labels

### **Buttons / CTAs**

*   **Font:** Noto Sans JP
*   **Size:** 12–14px
*   **Weight:** 500–600
*   **Letter spacing:** +0.05em
*   **Case:** Uppercase recommended for clarity

---

## **3. Line Length (Measure)**

To keep reading comfortable and visually balanced:

*   **Body paragraphs:** 55–70 characters per line
*   **Headings:** Keep short, ideally 1–3 lines max
*   **Hero text:** Avoid exceeding 30–35 characters per line

---

## **4. Vertical Rhythm & Spacing**

Consistent spacing amplifies elegance.

### **Recommended spacing scale:**

*   **XS:** 4px
*   **S:** 8px
*   **M:** 16px
*   **L:** 24px
*   **XL:** 32px
*   **2XL:** 48px
*   **3XL:** 64px

### **Examples:**

*   Space between heading and paragraph: **M–L (16–24px)**
*   Space between sections: **2XL–3XL (48–64px)**
*   Space between UI label & heading: **S (8px)**

---

## **5. Typographic Tone & Style Rules**

These rules shape the overall Kaizen Digilabs identity:

### **✔ Use Geist Sans for Headline Impact**

*   Hero lines
*   Section titles
*   Emphasized quotes or big statements

### **✔ Use Noto Sans JP for Clarity & Kanji**

*   Long form reading
*   Controls, UI, lists, captions
*   **Decorative Kanji Overlays** (Use Bold/Black weights)

### **✔ Strong Use of Negative Space (間 - Ma)**

*   Let typography breathe
*   Create calm, high-end Japanese aesthetic

### **✔ Avoid Overuse of Weight Variations**

Stick mainly to:

*   Heading → 600–800
*   Body → 400–500

### **✔ Small Caps / Uppercase Meta Labels**

*   Reinforces editorial, disciplined Japanese design

---

## **6. Special Kanji Considerations**

Because Kaizen Digilabs includes decorative Japanese content:

### **Decorative Kanji (Watermarks)**

*   **Font:** Noto Sans JP
*   **Weight:** 700 (Bold) or 900 (Black)
*   **Style:** Large scale, low opacity (5-10%), or mix-blend-mode
*   **Purpose:** Visual texture, reinforcing the "Kaizen" identity

---

## **7. Sample Tailwind Configuration**

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'], // Geist Sans
        body: ['var(--font-body)', 'sans-serif'], // Noto Sans JP
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular'], // Geist Mono
      },
    },
  },
};
```

---

## **8. Visual Examples**

### **Hero Example**

*   H1 (Geist Sans, 64px+, 800, Uppercase):
    *   "TRANSFORM YOUR BRAND"
*   Subtitle (Noto Sans JP, 16px, 400)
*   CTA Button (Noto Sans JP, 13px, 500, uppercase)
*   Kanji Overlay (Noto Sans JP, 400px, 700, Opacity 5%)

### **Article Title**

*   H2 (Geist Sans, 40px, 700)
  　

### **Body Example**

*   P (Noto Sans JP, 16px, 400, lh 1.75)

---

## **Conclusion**

This typography system represents:

*   **Modern Precision** (Geist Sans)
*   **Human Clarity** (Noto Sans JP)
*   **Consistent Kanji + Latin support**
*   **A calm, premium, neo-minimal brand tone**

This is the recommended final typographic guideline for Kaizen Digilabs.
