# CalculatorApp

A minimal Angular 18.1.1. application that implements a basic calculator (addition, subtraction, multiplication, division, clear, negate, percent) with custom SCSS—no external CSS libraries. Demonstrates core Angular building blocks: **Router**, **Component**, and **Service**.

---

## 🚀 Development server

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/CalculatorApp.git
   cd CalculatorApp

2. **Install dependencies**
   ```bash
   npm install
2. **Run dev server**
   ```bash
   ng serve
   
> **Note**: Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload when changes are detected.

## 🧩 How It Works

1. **Router**  
   - `app.routes.ts` defines a single route (`''`) that displays the `CalculatorComponent`.  
   - `AppComponent` (`app.component.ts`) uses `<router-outlet>` to render routed views.

2. **Component**  
   - `CalculatorComponent` handles user interaction and UI.  
   - Its template (`.html`) defines a display area and a grid of buttons.  
   - SCSS (`.scss`) styles the calculator entirely with custom CSS Grid and variables—no external libraries.

3. **Service**  
   - `CalculatorService` (`calculator.service.ts`) contains all business logic and state:  
     - **State:** current input string, stored previous value, pending operator, “start new number” flag.  
     - **Methods:**  
       - `handleInput(key: string)` routes each button press.  
       - `addDigit()`, `setOperator()`, `equals()`, `percent()`, `toggleSign()`, `clear()`.  
       - `display` getter formats the current value with comma-separators.

---

## ⚖️ Design Decisions & Assumptions

- **Standalone Components:** uses Angular 17’s standalone component API—no `AppModule`.  
- **Routing:** included even for a single-page app to show familiarity; can be extended to multiple views.  
- **String-based input:** maintain `currentValue` as a string to preserve leading zeros and decimals.  
- **Comma formatting:** always show thousands separators in the display.  
- **SCSS only:** custom variables and CSS Grid for layout; demonstrates ability to hand-write styles.

---

## 🧮 Algorithm & Edge Cases

### Digit entry
- If starting a new number, overwrite; else append.  
- Block multiple decimal points.

### Operator entry
- If an operator is already pending and you press another, compute intermediate result first.

### Equals
- Perform the pending operation and show result.

### Negation & Percentage
- Negation toggles leading `-`.  
- `%` divides the current value by 100.

### Clear (AC)
- Resets all state.

### Formatting
- Always insert commas into the integer part.  
- Show `"Error"` for divide-by-zero or invalid operations.

---

### Edge Cases Handled
- **Divide by zero** → displays `Error`.  
- **Leading zeros prevented** (`0005` → `5`).  
- **Excessively long input** gets truncated by maximum input length.

---

## 🔮 Future Development
- Keyboard input support.
- Calculation history.
- Memory functions (M+, M-, MR).
- Scientific operations (sin, cos, log, etc.).
