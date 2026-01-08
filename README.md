🎯 About the Project

The Expense Tracker Web App is designed to help users:
• Monitor where their money goes
• Control overspending with budgets and alerts
• Understand spending patterns through charts and insights
• Maintain financial discipline month-by-month

All data is stored locally using browser localStorage, making it lightweight and easy to use without any backend.

🌟 Features
💵 Expense & Income Management
• Add Income and Expense transactions
• Built-in categories:
  • Food, Rent, Travel, Shopping, Salary, Bonus, Pocket Money
  • Custom category support (Other)
• Delete transactions
• Prevents expenses that exceed available balance

📅 Month-wise Tracking
• Select any month (January–December)
• Transactions are:
  • Added to the selected month
  • Displayed month-wise
  • Calculated independently per month

📊 Financial Summary
• Monthly:
  • Total Income
  • Total Expenses
  • Remaining Balance
• Updates instantly when data changes

📈 Charts & Visualization
• Pie Chart – Category-wise spending
• Bar Chart – Income vs Expense
• Line Chart – Balance trend over time
• Built using Chart.js
• Fully responsive and dynamic

🎯 Budgeting & Overspending Alerts
• Monthly Budget
  • Set a monthly spending limit
  • Real-time progress bar
  • Usage percentage calculation
• Category-wise Budget
  • Set budgets per category
  • Categories without budgets are ignored
• Alerts
  • 🟢 Within budget
  • 🟡 Approaching limit (≥ 80%)
  • 🔴 Budget exceeded (≥ 100%)

🧠 Smart Financial Insights (Notice Board)
• Displayed in a notice-board style UI:
  • 🧾 Highest spending category
  • 📈 Month-over-month expense comparison
  • ⚠️ Budget pressure alerts
  • 💰 Savings health insight
  • All insights update automatically.

🌗 Light / Dark Mode
• Toggle between Light and Dark themes
• Theme preference is saved
• Smooth transitions using CSS variables

📩 Contact & Support
• “Contact Us” section for users
• Displays developer contact information
• Simulated message submission (frontend-only)

🛠 Tech Stack
• React.js (Vite)
• Chart.js & react-chartjs-2
• CSS (custom styling & animations)
• LocalStorage for persistence

🛠 Installation & Setup

Follow these steps to run the project locally:

1️⃣ Clone the Repository
git clone https://github.com/mihika1110/expense-tracker-web.git

2️⃣ Navigate to the Project Folder
cd expense-tracker

3️⃣ Install Dependencies
npm install

4️⃣ Run the App
npm run dev

5️⃣ Open in Browser
http://localhost:5173/

🧩 Project Structure
expense-tracker/
│
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── public/
├── package.json
├── vite.config.js
└── README.md

👩‍💻 About the Author
Mihika
Third-year CSE Undergraduate
📧 Email: mihika11saxena@gmail.com

📜 License

This project is created for learning and portfolio purposes.
You are free to explore, modify, and improve it.

⭐ If you like this project, feel free to star the repository!
