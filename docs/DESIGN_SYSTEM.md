# Kaizen Digilabs - Design System
> **Theme:** Kaizen Neo-Minimal
> **Philosophy:** Calm, Precise, Continuous Progress

---

## 1. Core Philosophy

### **Kanso (Simplicity)**
*Eliminate the unnecessary.*
- **UI Principle:** Layouts should be clean and uncluttered. Every element must have a purpose.
- **Implementation:** Avoid decorative elements that don't add function. Use flat design or very subtle depth.

### **Ma (Negative Space)**
*The space between.*
- **UI Principle:** "Whitespace is luxury." Give content room to breathe.
- **Implementation:** Generous padding and margins. Use space to group related content instead of visible borders.

### **Monozukuri (Craftsmanship)**
*Pride in making.*
- **UI Principle:** Attention to minute details. Smooth interactions and polished visuals.
- **Implementation:** Micro-interactions, fluid animations, pixel-perfect alignment.

### **Wabi-Sabi (Imperfect Beauty) & Kanji**
*Cultural roots.*
- **UI Principle:** Use Kanji characters as large, decorative background elements (low opacity) or structural dividers.
- **Implementation:** Use 'Kaizen' (改善) or 'Digital' (デジタル) kanji. Mix of sharp digital lines with organic brush strokes.

---

## 2. Color Palette

### **Contrast (The Split)**
Inspired by editorial design.
- **Primary Split:** 50% Black (`zinc-950`) / 50% White (`zinc-50`) layouts.
- **Red Accent:** `red-600` (Japan Sun) - Used very sparingly for focal points (dots, active states).

### **Accent: Electric Indigo**
Used sparingly for primary actions and brand highlights. Represents "Digital/Tech".
- **Primary:** `indigo-600`
- **Hover:** `indigo-700`
- **Subtle:** `indigo-50` (Backgrounds for active states)

### **Accent: Bamboo Green**
Used for "Growth/Kaizen" indicators and success states.
- **Success:** `emerald-600`
- **Subtle:** `emerald-50`

### **Functional Colors**
- **Error:** `rose-600`
- **Warning:** `amber-500`

---

## 3. Typography

### **Font Family**
- **Primary (Body & Headings):** `Geist Sans`
  - Characteristics: Geometric, humanistic, legible, modern.
- **Secondary (Code/Technical):** `Geist Mono`
  - Characteristics: Technical, precise.

### **Scale & Weight**
- **H1:** `text-4xl` or `text-5xl` | `font-bold` | `tracking-tight`
- **H2:** `text-3xl` | `font-semibold` | `tracking-tight`
- **H3:** `text-2xl` | `font-semibold`
- **Body:** `text-base` | `font-normal` | `leading-relaxed`
- **Small/Caption:** `text-sm` | `text-zinc-500`

---

## 4. Spacing & Layout

### **Grid System**
- Base unit: **4px** (Tailwind default).
- Common spacers: `16px` (4), `24px` (6), `32px` (8), `48px` (12), `64px` (16), `96px` (24).

### **Container**
- **Max Width:** `max-w-7xl` (1280px) for main content.
- **Padding:** `px-4` (mobile), `px-6` (tablet), `px-8` (desktop).

### **Radius**
- **Default:** `rounded-lg` (0.5rem) - Smooth but structured.
- **Buttons:** `rounded-md` or `rounded-full` (depending on context, stick to one).
- **Cards:** `rounded-xl` or `rounded-2xl`.

---

## 5. Components

### **Buttons**
*   **Primary:**
    *   Bg: `bg-zinc-900` (Inverted/High Contrast) or `bg-indigo-600`
    *   Text: `text-white`
    *   Hover: `hover:bg-zinc-800` or `hover:bg-indigo-700`
    *   Transition: `transition-all duration-300`
*   **Secondary:**
    *   Bg: `bg-white`
    *   Border: `border border-zinc-200`
    *   Text: `text-zinc-900`
    *   Hover: `hover:bg-zinc-50`
*   **Ghost:**
    *   Bg: Transparent
    *   Text: `text-zinc-600`
    *   Hover: `text-zinc-900 hover:bg-zinc-100`

### **Cards**
- **Style:** Minimalist, flat or very subtle shadow.
- **Bg:** `bg-white`
- **Border:** `border border-zinc-100`
- **Shadow:** `shadow-sm` (optional, prefer borders for "Neo-Minimal").
- **Hover:** `hover:border-zinc-300 transition-colors`.

### **Inputs**
- **Bg:** `bg-zinc-50`
- **Border:** `border-transparent` (focus on content) or `border-zinc-200`.
- **Focus:** `ring-2 ring-indigo-500/20 border-indigo-500`.

---

## 6. Animation (Monozukuri)

### **Principles**
- **Subtle:** Animations should be felt, not seen.
- **Fluid:** Easing should be smooth (e.g., `ease-out`).
- **Purposeful:** Guide the user's attention.

### **Standard Transitions**
- **Hover:** `duration-200 ease-in-out`
- **Page Load:** Fade up (`opacity-0 translate-y-4` -> `opacity-100 translate-y-0`).

---

## 7. Implementation Checklist
- [ ] Update `globals.css` with base styles.
- [ ] Configure `tailwind.config.ts` (if needed for custom colors/fonts).
- [ ] Create base UI components (Button, Input, Card) in `components/ui`.
