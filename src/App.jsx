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
//   const [transactions, setTransactions] = useState(() => {
//     const saved = localStorage.getItem("transactions");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("Food");
//   const [customCategory, setCustomCategory] = useState("");
//   const [type, setType] = useState("Income");

//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//   }, [transactions]);

//   const income = transactions
//     .filter((t) => t.type === "Income")
//     .reduce((s, t) => s + t.amount, 0);

//   const expense = transactions
//     .filter((t) => t.type === "Expense")
//     .reduce((s, t) => s + t.amount, 0);

//   const balance = income - expense;

//   function addTransaction() {
//     if (!amount) return;

//     const numericAmount = Number(amount);

//     if (type === "Expense" && numericAmount > balance) {
//       alert("Expense exceeds available balance");
//       return;
//     }

//     const finalCategory =
//       category === "Other" ? customCategory.trim() : category;

//     if (!finalCategory) {
//       alert("Enter category");
//       return;
//     }

//     setTransactions([
//       ...transactions,
//       {
//         amount: numericAmount,
//         category: finalCategory,
//         type,
//         date: new Date().toLocaleDateString(),
//       },
//     ]);

//     setAmount("");
//     setCustomCategory("");
//     setCategory("Food");
//   }

//   function deleteTransaction(index) {
//     setTransactions(transactions.filter((_, i) => i !== index));
//   }

//     /* ===== CHART DATA (SMART GROUPING) ===== */

//   const expenseTransactions = transactions.filter(
//     (t) => t.type === "Expense"
//   );

//   const rawTotals = {};
//   expenseTransactions.forEach((t) => {
//     rawTotals[t.category] =
//       (rawTotals[t.category] || 0) + t.amount;
//   });

//   const totalExpense = Object.values(rawTotals).reduce(
//     (sum, v) => sum + v,
//     0
//   );

//   const categoryTotals = {};
//   let othersTotal = 0;

//   Object.entries(rawTotals).forEach(([category, amount]) => {
//     const percentage = (amount / totalExpense) * 100;

//     if (percentage < 3) {
//       othersTotal += amount;
//     } else {
//       categoryTotals[category] = amount;
//     }
//   });

//   if (othersTotal > 0) {
//     categoryTotals["Others"] = othersTotal;
//   }


//   const pieData = {
//     labels: Object.keys(categoryTotals),
//     datasets: [
//       {
//         data: Object.values(categoryTotals),
//         backgroundColor: [
//           "#6366f1",
//           "#22c55e",
//           "#f97316",
//           "#ef4444",
//           "#14b8a6",
//         ],
//       },
//     ],
//   };

//   const pieOptions = {
//     responsive: false, // 👈 important
//     plugins: {
//       legend: {
//         position: "bottom",
//         labels: {
//           boxWidth: 12,
//         },
//       },
//     },
//   };

//   const barData = {
//     labels: ["Income", "Expense"],
//     datasets: [
//       {
//         label: "Amount",
//         data: [income, expense],
//         backgroundColor: ["#22c55e", "#ef4444"],
//       },
//     ],
//   };

//   const lineData = {
//     labels: transactions.map((_, i) => `T${i + 1}`),
//     datasets: [
//       {
//         label: "Balance Trend",
//         data: transactions.reduce((acc, t) => {
//           const prev = acc.length ? acc[acc.length - 1] : 0;
//           acc.push(t.type === "Income" ? prev + t.amount : prev - t.amount);
//           return acc;
//         }, []),
//         borderColor: "#6366f1",
//         tension: 0.4,
//       },
//     ],
//   };

//   return (
//     <div className="app">
//       <div className="container">
//         <h1>Expense Tracker</h1>

//         <div className="summary">
//           <div className="card">
//             <span>Balance</span>
//             <h2>₹{balance}</h2>
//           </div>
//           <div className="card income">
//             <span>Income</span>
//             <h2>₹{income}</h2>
//           </div>
//           <div className="card expense">
//             <span>Expense</span>
//             <h2>₹{expense}</h2>
//           </div>
//         </div>

//         <div className="form">
//           <input
//             type="number"
//             placeholder="Amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />

//           <select value={category} onChange={(e) => setCategory(e.target.value)}>
//             <option>Food</option>
//             <option>Rent</option>
//             <option>Travel</option>
//             <option>Shopping</option>
//             <option>Salary</option>
//             <option>Other</option>
//           </select>

//           {category === "Other" && (
//             <input
//               placeholder="Custom category"
//               value={customCategory}
//               onChange={(e) => setCustomCategory(e.target.value)}
//             />
//           )}

//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option>Income</option>
//             <option>Expense</option>
//           </select>

//           <button onClick={addTransaction}>Add</button>
//         </div>

//         <div className="charts">
//           {expenseTransactions.length > 0 && (
//             <div className="chart-card pie-small">
//               <h3>Category-wise Spending</h3>
//               <Pie data={pieData} options={pieOptions} width={260} height={260} />
//             </div>
//           )}

//           <div className="chart-card">
//             <h3>Income vs Expense</h3>
//             <Bar data={barData} />
//           </div>

//           {transactions.length > 1 && (
//             <div className="chart-card">
//               <h3>Balance Trend</h3>
//               <Line data={lineData} />
//             </div>
//           )}
//         </div>

//         <ul className="transactions">
//           {transactions.map((t, i) => (
//             <li key={i} className={t.type.toLowerCase()}>
//               <div>
//                 <strong>{t.category}</strong>
//                 <span>{t.date}</span>
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
//   // ===== STATE =====
//   const [transactions, setTransactions] = useState(() => {
//     const saved = localStorage.getItem("transactions");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("Food");
//   const [customCategory, setCustomCategory] = useState("");
//   const [type, setType] = useState("Income");

//   const [selectedMonth, setSelectedMonth] = useState(
//     new Date().getMonth()
//   );

//   const currentYear = new Date().getFullYear();

//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//   }, [transactions]);

//   // ===== FILTER BY MONTH =====
//   const filteredTransactions = transactions.filter((t) => {
//     const d = new Date(t.date);
//     return (
//       d.getMonth() === selectedMonth &&
//       d.getFullYear() === currentYear
//     );
//   });

//   // ===== CALCULATIONS =====
//   const income = filteredTransactions
//     .filter((t) => t.type === "Income")
//     .reduce((s, t) => s + t.amount, 0);

//   const expense = filteredTransactions
//     .filter((t) => t.type === "Expense")
//     .reduce((s, t) => s + t.amount, 0);

//   const balance = income - expense;

//   // ===== ADD TRANSACTION (FIXED) =====
//   function addTransaction() {
//     if (!amount) return;

//     const value = Number(amount);

//     if (type === "Expense" && value > balance) {
//       alert("Expense exceeds available balance");
//       return;
//     }

//     const finalCategory =
//       category === "Other" ? customCategory.trim() : category;

//     if (!finalCategory) {
//       alert("Enter category");
//       return;
//     }

//     // 🔥 KEY FIX: date uses selectedMonth
//     const transactionDate = new Date(
//       currentYear,
//       selectedMonth,
//       1
//     ).toISOString();

//     setTransactions([
//       ...transactions,
//       {
//         amount: value,
//         category: finalCategory,
//         type,
//         date: transactionDate,
//       },
//     ]);

//     setAmount("");
//     setCustomCategory("");
//     setCategory("Food");
//   }

//   // ===== DELETE TRANSACTION (SAFE) =====
//   function deleteTransaction(index) {
//     const txToDelete = filteredTransactions[index];

//     setTransactions(
//       transactions.filter((t) => t !== txToDelete)
//     );
//   }

//   /* ===== CHART DATA ===== */

//   const expenseTx = filteredTransactions.filter(
//     (t) => t.type === "Expense"
//   );

//   const rawTotals = {};
//   expenseTx.forEach((t) => {
//     rawTotals[t.category] =
//       (rawTotals[t.category] || 0) + t.amount;
//   });

//   const totalExpense = Object.values(rawTotals).reduce(
//     (a, b) => a + b,
//     0
//   );

//   const categoryTotals = {};
//   let others = 0;

//   Object.entries(rawTotals).forEach(([cat, amt]) => {
//     if ((amt / totalExpense) * 100 < 3) others += amt;
//     else categoryTotals[cat] = amt;
//   });

//   if (others > 0) categoryTotals["Others"] = others;

//   const pieData = {
//     labels: Object.keys(categoryTotals),
//     datasets: [
//       {
//         data: Object.values(categoryTotals),
//         backgroundColor: [
//           "#6366f1",
//           "#22c55e",
//           "#f97316",
//           "#ef4444",
//           "#14b8a6",
//         ],
//       },
//     ],
//   };

//   const barData = {
//     labels: ["Income", "Expense"],
//     datasets: [
//       {
//         label: "Amount",
//         data: [income, expense],
//         backgroundColor: ["#22c55e", "#ef4444"],
//       },
//     ],
//   };

//   const lineData = {
//     labels: filteredTransactions.map((_, i) => `T${i + 1}`),
//     datasets: [
//       {
//         label: "Balance Trend",
//         data: filteredTransactions.reduce((acc, t) => {
//           const prev = acc.length ? acc[acc.length - 1] : 0;
//           acc.push(t.type === "Income" ? prev + t.amount : prev - t.amount);
//           return acc;
//         }, []),
//         borderColor: "#6366f1",
//         tension: 0.4,
//       },
//     ],
//   };

//   const months = [
//     "January","February","March","April","May","June",
//     "July","August","September","October","November","December"
//   ];

//   return (
//     <div className="app">
//       <div className="container">
//         <h1>Expense Tracker</h1>

//         {/* MONTH SELECTOR */}
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

//         <div className="summary">
//           <div className="card">
//             <span>Balance</span>
//             <h2>₹{balance}</h2>
//           </div>
//           <div className="card income">
//             <span>Income</span>
//             <h2>₹{income}</h2>
//           </div>
//           <div className="card expense">
//             <span>Expense</span>
//             <h2>₹{expense}</h2>
//           </div>
//         </div>

//         <div className="form">
//           <input
//             type="number"
//             placeholder="Amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />

//           <select value={category} onChange={(e) => setCategory(e.target.value)}>
//             <option>Food</option>
//             <option>Rent</option>
//             <option>Travel</option>
//             <option>Shopping</option>
//             <option>Salary</option>
//             <option>Other</option>
//           </select>

//           {category === "Other" && (
//             <input
//               placeholder="Custom category"
//               value={customCategory}
//               onChange={(e) => setCustomCategory(e.target.value)}
//             />
//           )}

//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option>Income</option>
//             <option>Expense</option>
//           </select>

//           <button onClick={addTransaction}>Add</button>
//         </div>

//         <div className="charts">
//           {expenseTx.length > 0 && (
//             <div className="chart-card pie-small">
//               <h3>Category-wise Spending</h3>
//               <Pie data={pieData} width={240} height={240} />
//             </div>
//           )}

//           <div className="chart-card">
//             <h3>Income vs Expense</h3>
//             <Bar data={barData} />
//           </div>

//           {filteredTransactions.length > 1 && (
//             <div className="chart-card">
//               <h3>Balance Trend</h3>
//               <Line data={lineData} />
//             </div>
//           )}
//         </div>

//         <ul className="transactions">
//           {filteredTransactions.map((t, i) => (
//             <li key={i} className={t.type.toLowerCase()}>
//               <div>
//                 <strong>{t.category}</strong>
//                 <span>
//                   {months[new Date(t.date).getMonth()]} {currentYear}
//                 </span>
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
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [customCategory, setCustomCategory] = useState("");
  const [type, setType] = useState("Income");

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth()
  );

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const filteredTransactions = transactions.filter((t) => {
    const d = new Date(t.date);
    return (
      d.getMonth() === selectedMonth &&
      d.getFullYear() === currentYear
    );
  });

  const income = filteredTransactions
    .filter((t) => t.type === "Income")
    .reduce((s, t) => s + t.amount, 0);

  const expense = filteredTransactions
    .filter((t) => t.type === "Expense")
    .reduce((s, t) => s + t.amount, 0);

  const balance = income - expense;

  function addTransaction() {
    if (!amount) return;

    const value = Number(amount);

    if (type === "Expense" && value > balance) {
      alert("Expense exceeds available balance");
      return;
    }

    const finalCategory =
      category === "Other" ? customCategory.trim() : category;

    if (!finalCategory) {
      alert("Enter category");
      return;
    }

    const transactionDate = new Date(
      currentYear,
      selectedMonth,
      1
    ).toISOString();

    setTransactions([
      ...transactions,
      {
        amount: value,
        category: finalCategory,
        type,
        date: transactionDate,
      },
    ]);

    setAmount("");
    setCustomCategory("");
    setCategory("Food");
  }

  function deleteTransaction(index) {
    const txToDelete = filteredTransactions[index];
    setTransactions(transactions.filter((t) => t !== txToDelete));
  }

  /* ===== PIE CHART DATA ===== */

  const expenseTx = filteredTransactions.filter(
    (t) => t.type === "Expense"
  );

  const rawTotals = {};
  expenseTx.forEach((t) => {
    rawTotals[t.category] =
      (rawTotals[t.category] || 0) + t.amount;
  });

  const totalExpense = Object.values(rawTotals).reduce(
    (a, b) => a + b,
    0
  );

  const categoryTotals = {};
  let others = 0;

  Object.entries(rawTotals).forEach(([cat, amt]) => {
    if ((amt / totalExpense) * 100 < 3) others += amt;
    else categoryTotals[cat] = amt;
  });

  if (others > 0) categoryTotals["Others"] = others;

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#6366f1",
          "#22c55e",
          "#f97316",
          "#ef4444",
          "#14b8a6",
        ],
      },
    ],
  };

  // 🔥 ADD THIS
  const pieOptions = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 12 },
      },
    },
  };

  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [income, expense],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  const lineData = {
    labels: filteredTransactions.map((_, i) => `T${i + 1}`),
    datasets: [
      {
        label: "Balance Trend",
        data: filteredTransactions.reduce((acc, t) => {
          const prev = acc.length ? acc[acc.length - 1] : 0;
          acc.push(t.type === "Income" ? prev + t.amount : prev - t.amount);
          return acc;
        }, []),
        borderColor: "#6366f1",
        tension: 0.4,
      },
    ],
  };

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return (
    <div className="app">
      <div className="container">
        <h1>Expense Tracker</h1>

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

        <div className="summary">
          <div className="card">
            <span>Balance</span>
            <h2>₹{balance}</h2>
          </div>
          <div className="card income">
            <span>Income</span>
            <h2>₹{income}</h2>
          </div>
          <div className="card expense">
            <span>Expense</span>
            <h2>₹{expense}</h2>
          </div>
        </div>

        <div className="form">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Food</option>
            <option>Rent</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Salary</option>
            <option>Other</option>
          </select>

          {category === "Other" && (
            <input
              placeholder="Custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          )}

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Income</option>
            <option>Expense</option>
          </select>

          <button onClick={addTransaction}>Add</button>
        </div>

        <div className="charts">
          {expenseTx.length > 0 && (
            <div className="chart-card pie-small">
              <h3>Category-wise Spending</h3>
              <div className="pie-wrapper">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>
          )}

          <div className="chart-card">
            <h3>Income vs Expense</h3>
            <Bar data={barData} />
          </div>

          {filteredTransactions.length > 1 && (
            <div className="chart-card">
              <h3>Balance Trend</h3>
              <Line data={lineData} />
            </div>
          )}
        </div>

        <ul className="transactions">
          {filteredTransactions.map((t, i) => (
            <li key={i} className={t.type.toLowerCase()}>
              <div>
                <strong>{t.category}</strong>
                <span>{months[new Date(t.date).getMonth()]} {currentYear}</span>
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
