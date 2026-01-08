// import { useEffect, useState } from "react";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
// } from "chart.js";
// import { Pie, Bar, Line } from "react-chartjs-2";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement
// );

// function App() {
//   /* ================= TRANSACTIONS ================= */
//   const [transactions, setTransactions] = useState(() => {
//     const saved = localStorage.getItem("transactions");
//     return saved ? JSON.parse(saved) : [];
//   });

//   /* ================= BUDGETS ================= */
//   const [budgets, setBudgets] = useState(() => {
//     const saved = localStorage.getItem("budgets");
//     return saved ? JSON.parse(saved) : {};
//   });

//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("Food");
//   const [customCategory, setCustomCategory] = useState("");
//   const [type, setType] = useState("Income");

//   const [selectedMonth, setSelectedMonth] = useState(
//     new Date().getMonth()
//   );
//   const currentYear = new Date().getFullYear();
//   const monthKey = `${currentYear}-${String(selectedMonth + 1).padStart(2, "0")}`;

//   /* ================= PERSISTENCE ================= */
//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//   }, [transactions]);

//   useEffect(() => {
//     localStorage.setItem("budgets", JSON.stringify(budgets));
//   }, [budgets]);

//   /* ================= FILTERED DATA ================= */
//   const filteredTransactions = transactions.filter((t) => {
//     const d = new Date(t.date);
//     return d.getMonth() === selectedMonth && d.getFullYear() === currentYear;
//   });

//   const income = filteredTransactions
//     .filter((t) => t.type === "Income")
//     .reduce((s, t) => s + t.amount, 0);

//   const expense = filteredTransactions
//     .filter((t) => t.type === "Expense")
//     .reduce((s, t) => s + t.amount, 0);

//   const balance = income - expense;

//   /* ================= ADD TRANSACTION ================= */
//   function addTransaction() {
//     if (!amount) return;
//     const value = Number(amount);

//     if (type === "Expense" && value > balance) return;

//     const finalCategory =
//       category === "Other" ? customCategory.trim() : category;
//     if (!finalCategory) return;

//     setTransactions([
//       ...transactions,
//       {
//         amount: value,
//         category: finalCategory,
//         type,
//         date: new Date(currentYear, selectedMonth, 1).toISOString(),
//       },
//     ]);

//     setAmount("");
//     setCustomCategory("");
//     setCategory("Food");
//   }

//   function deleteTransaction(index) {
//     const tx = filteredTransactions[index];
//     setTransactions(transactions.filter((t) => t !== tx));
//   }

//   /* ================= BUDGET HELPERS ================= */
//   const monthBudget = budgets[monthKey]?.monthly || 0;
//   const categoryBudgets = budgets[monthKey]?.categories || {};

//   const monthlyUsage =
//     monthBudget > 0 ? (expense / monthBudget) * 100 : 0;

//   const categoryExpenses = {};
//   filteredTransactions
//     .filter((t) => t.type === "Expense")
//     .forEach((t) => {
//       categoryExpenses[t.category] =
//         (categoryExpenses[t.category] || 0) + t.amount;
//     });

//   function getBarState(percent) {
//     if (percent >= 100) return "danger";
//     if (percent >= 80) return "warning";
//     return "normal";
//   }

//   function updateMonthlyBudget(value) {
//     setBudgets({
//       ...budgets,
//       [monthKey]: {
//         ...budgets[monthKey],
//         monthly: Number(value),
//         categories: budgets[monthKey]?.categories || {},
//       },
//     });
//   }

//   function updateCategoryBudget(cat, value) {
//     setBudgets({
//       ...budgets,
//       [monthKey]: {
//         monthly: budgets[monthKey]?.monthly || 0,
//         categories: {
//           ...budgets[monthKey]?.categories,
//           [cat]: Number(value),
//         },
//       },
//     });
//   }

//   /* ================= MONTHS ================= */
//   const months = [
//     "January","February","March","April","May","June",
//     "July","August","September","October","November","December"
//   ];

//   /* ================= UI ================= */
//   return (
//     <div className="app">
//       <div className="container">
//         <h1>Expense Tracker</h1>

//         <div className="month-selector">
//           <label>Month:</label>
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(Number(e.target.value))}
//           >
//             {months.map((m, i) => (
//               <option key={i} value={i}>{m}</option>
//             ))}
//           </select>
//         </div>

//         {/* ===== SUMMARY ===== */}
//         <div className="summary">
//           <div className="card"><span>Balance</span><h2>₹{balance}</h2></div>
//           <div className="card income"><span>Income</span><h2>₹{income}</h2></div>
//           <div className="card expense"><span>Expense</span><h2>₹{expense}</h2></div>
//         </div>

//         {/* ===== MONTHLY BUDGET ===== */}
//         <div className="budget-card">
//           <h3>Monthly Budget</h3>
//           <input
//             type="number"
//             placeholder="Set monthly budget"
//             value={monthBudget || ""}
//             onChange={(e) => updateMonthlyBudget(e.target.value)}
//           />

//           {monthBudget > 0 && (
//             <>
//               <div className={`budget-bar ${getBarState(monthlyUsage)}`}>
//                 <div style={{ width: `${Math.min(monthlyUsage, 100)}%` }} />
//               </div>
//               <p>
//                 ₹{expense} / ₹{monthBudget} used ({monthlyUsage.toFixed(1)}%)
//               </p>
//             </>
//           )}
//         </div>

//         {/* ===== CATEGORY BUDGETS ===== */}
//         <div className="budget-card">
//           <h3>Category Budgets</h3>
//           {Object.keys(categoryExpenses).map((cat) => {
//             const budget = categoryBudgets[cat];
//             if (!budget) return null;

//             const used = categoryExpenses[cat] || 0;
//             const percent = (used / budget) * 100;

//             return (
//               <div key={cat} className="category-budget">
//                 <strong>{cat}</strong>
//                 <div className={`budget-bar ${getBarState(percent)}`}>
//                   <div style={{ width: `${Math.min(percent, 100)}%` }} />
//                 </div>
//                 <small>
//                   ₹{used} / ₹{budget} ({percent.toFixed(1)}%)
//                 </small>
//               </div>
//             );
//           })}

//           <div className="category-inputs">
//             {["Food","Rent","Travel","Shopping"].map((cat) => (
//               <input
//                 key={cat}
//                 type="number"
//                 placeholder={`${cat} budget`}
//                 onBlur={(e) => updateCategoryBudget(cat, e.target.value)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* ===== TRANSACTION FORM ===== */}
//         <div className="form">
//           <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
//           <select value={category} onChange={(e) => setCategory(e.target.value)}>
//             <option>Food</option><option>Rent</option><option>Travel</option>
//             <option>Shopping</option><option>Salary</option><option>Other</option>
//           </select>
//           {category === "Other" && (
//             <input placeholder="Custom category" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} />
//           )}
//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option>Income</option><option>Expense</option>
//           </select>
//           <button onClick={addTransaction}>Add</button>
//         </div>

//         {/* ===== TRANSACTIONS ===== */}
//         <ul className="transactions">
//           {filteredTransactions.map((t, i) => (
//             <li key={i} className={t.type.toLowerCase()}>
//               <div>
//                 <strong>{t.category}</strong>
//                 <span>{months[selectedMonth]} {currentYear}</span>
//               </div>
//               <div>
//                 ₹{t.amount}
//                 <button onClick={() => deleteTransaction(i)}>✕</button>
//               </div>
//             </li>
//           ))}
//         </ul>

//       </div>
//     </div>
//   );
// }

// export default App;










import { useEffect, useState } from "react";

function App() {
  /* ================= STATE ================= */
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem("budgets");
    return saved ? JSON.parse(saved) : {};
  });

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [customCategory, setCustomCategory] = useState("");
  const [type, setType] = useState("Income");

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const currentYear = new Date().getFullYear();
  const monthKey = `${currentYear}-${String(selectedMonth + 1).padStart(2, "0")}`;

  /* ================= PERSIST ================= */
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  /* ================= FILTERED TRANSACTIONS ================= */
  const filteredTransactions = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === selectedMonth && d.getFullYear() === currentYear;
  });

  const income = filteredTransactions
    .filter((t) => t.type === "Income")
    .reduce((s, t) => s + t.amount, 0);

  const expense = filteredTransactions
    .filter((t) => t.type === "Expense")
    .reduce((s, t) => s + t.amount, 0);

  const balance = income - expense;

  /* ================= ADD TRANSACTION ================= */
  function addTransaction() {
    if (!amount) return;
    const value = Number(amount);

    if (type === "Expense" && value > balance) return;

    const finalCategory =
      category === "Other" ? customCategory.trim() : category;

    if (!finalCategory) return;

    setTransactions([
      ...transactions,
      {
        amount: value,
        category: finalCategory,
        type,
        date: new Date(currentYear, selectedMonth, 1).toISOString(),
      },
    ]);

    setAmount("");
    setCustomCategory("");
    setCategory("Food");
  }

  function deleteTransaction(index) {
    const tx = filteredTransactions[index];
    setTransactions(transactions.filter((t) => t !== tx));
  }

  /* ================= BUDGET LOGIC ================= */
  const monthBudget = budgets[monthKey]?.monthly || "";
  const categoryBudgets = budgets[monthKey]?.categories || {};

  const monthlyUsage =
    monthBudget > 0 ? (expense / monthBudget) * 100 : 0;

  const categoryExpenses = {};
  filteredTransactions
    .filter((t) => t.type === "Expense")
    .forEach((t) => {
      categoryExpenses[t.category] =
        (categoryExpenses[t.category] || 0) + t.amount;
    });

  function budgetState(p) {
    if (p >= 100) return "danger";
    if (p >= 80) return "warning";
    return "normal";
  }

  function budgetMessage(p) {
    if (p >= 100) return "Budget exceeded ❌";
    if (p >= 80) return "Approaching budget limit ⚠️";
    return "Within budget ✅";
  }

  function updateMonthlyBudget(value) {
    setBudgets({
      ...budgets,
      [monthKey]: {
        ...budgets[monthKey],
        monthly: Number(value),
        categories: budgets[monthKey]?.categories || {},
      },
    });
  }

  function updateCategoryBudget(cat, value) {
    setBudgets({
      ...budgets,
      [monthKey]: {
        monthly: budgets[monthKey]?.monthly || 0,
        categories: {
          ...budgets[monthKey]?.categories,
          [cat]: Number(value),
        },
      },
    });
  }

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const budgetCategories = ["Food", "Rent", "Travel", "Shopping"];

  /* ================= UI ================= */
  return (
    <div className="app">
      <div className="container">
        <h1>Expense Tracker</h1>

        {/* MONTH SELECTOR */}
        <div className="month-selector">
          <label>Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {months.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>
        </div>

        {/* SUMMARY */}
        <div className="summary">
          <div className="card"><span>Balance</span><h2>₹{balance}</h2></div>
          <div className="card income"><span>Income</span><h2>₹{income}</h2></div>
          <div className="card expense"><span>Expense</span><h2>₹{expense}</h2></div>
        </div>

        {/* MONTHLY BUDGET */}
        <div className="budget-card">
          <h3>Monthly Budget</h3>
          <input
            type="number"
            placeholder="Set monthly budget"
            value={monthBudget}
            onChange={(e) => updateMonthlyBudget(e.target.value)}
          />

          {monthBudget && (
            <>
              <div className={`budget-bar ${budgetState(monthlyUsage)}`}>
                <div style={{ width: `${Math.min(monthlyUsage, 100)}%` }} />
              </div>
              <p>
                ₹{expense} / ₹{monthBudget} used ({monthlyUsage.toFixed(1)}%)
              </p>
              <small>{budgetMessage(monthlyUsage)}</small>
            </>
          )}
        </div>

        {/* CATEGORY BUDGETS */}
        <div className="budget-card">
          <h3>Category Budgets</h3>

          {budgetCategories.map((cat) => {
            const budget = categoryBudgets[cat];
            const spent = categoryExpenses[cat] || 0;

            if (!budget) return null;

            const percent = (spent / budget) * 100;

            return (
              <div key={cat} className="category-budget">
                <strong>{cat}</strong>
                <div className={`budget-bar ${budgetState(percent)}`}>
                  <div style={{ width: `${Math.min(percent, 100)}%` }} />
                </div>
                <small>
                  ₹{spent} / ₹{budget} ({percent.toFixed(1)}%) —{" "}
                  {budgetMessage(percent)}
                </small>
              </div>
            );
          })}

          <div className="category-inputs">
            {budgetCategories.map((cat) => (
              <div key={cat} className="category-input">
                <label>{cat} Budget</label>
                <input
                  type="number"
                  value={categoryBudgets[cat] || ""}
                  onChange={(e) =>
                    updateCategoryBudget(cat, e.target.value)
                  }
                  placeholder={`Set ${cat} budget`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* TRANSACTION FORM */}
        <div className="form">
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Food</option><option>Rent</option><option>Travel</option>
            <option>Shopping</option><option>Salary</option><option>Other</option>
          </select>
          {category === "Other" && (
            <input placeholder="Custom category" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} />
          )}
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Income</option><option>Expense</option>
          </select>
          <button onClick={addTransaction}>Add</button>
        </div>

        {/* TRANSACTIONS */}
        <ul className="transactions">
          {filteredTransactions.map((t, i) => (
            <li key={i} className={t.type.toLowerCase()}>
              <div>
                <strong>{t.category}</strong>
                <span>{months[selectedMonth]} {currentYear}</span>
              </div>
              <div>
                ₹{t.amount}
                <button onClick={() => deleteTransaction(i)}>✕</button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;
