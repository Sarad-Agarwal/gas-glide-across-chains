# 🚀 Gas Glide Across Chains

**Real-Time Cross-Chain Gas Tracker with Wallet Simulation**

A powerful dashboard built with Next.js + Web3 that tracks gas prices across Ethereum, Polygon, and Arbitrum in real-time using native WebSocket RPC connections — no third-party APIs. It also allows users to simulate transactions and compare USD costs across chains using live ETH/USD rates from Uniswap V3, visualized via interactive candlestick charts.

---

## 🔗 Live Preview

👉 **URL** https://gas-glide-across-chains.vercel.app/

---

## 📸 Screenshots
<img width="1809" height="720" alt="Screenshot 2025-07-17 230255" src="https://github.com/user-attachments/assets/370b0825-06e0-41f4-ae78-6ad791aa2a75" />
<img width="1192" height="713" alt="Screenshot 2025-07-17 230243" src="https://github.com/user-attachments/assets/931bb2c8-0e82-424c-82e6-d341e613e1e1" />
<img width="1919" height="1026" alt="Screenshot 2025-07-17 230216" src="https://github.com/user-attachments/assets/adb64974-f7c7-45a4-81da-b8a43bb2f2c4" />
<img width="1912" height="1041" alt="Screenshot 2025-07-17 230200" src="https://github.com/user-attachments/assets/86f07927-4743-4ad3-800c-ea8d130ebd50" />


---

## ✨ Features

### 🔥 Core Features
- ⚡ **Real-Time Gas Tracking** from Ethereum, Polygon, and Arbitrum
- 🔌 **WebSocket Integration** using native RPC endpoints
- 💵 **Live USD Price Feed** via Uniswap V3's ETH/USDC pool (on-chain only)
- 🧪 **Transaction Simulation** to estimate gas costs in USD
- 📈 **Candlestick Charts** for visualizing gas volatility (15-min intervals)
- 📱 **Responsive Design** with mobile-first layout
- 🌒 **Dark Theme** with modern glassmorphism UI
- 🎞️ **Smooth Animations** powered by Framer Motion

### 🎯 Technical Highlights
- 🧠 Zustand for scalable global state management
- 🧾 TypeScript for type-safe development
- 📊 Lightweight Charts (by TradingView) for high-quality candlesticks
- 🔧 Ethers.js for blockchain connection & Uniswap log parsing
- 🎨 Tailwind CSS + shadcn-ui for sleek styling
- 🔁 Robust error handling for WebSocket connections

---

## 📁 Project Structure

Here's the folder structure of the Real-Time Cross-Chain Gas Tracker:

```

src/
├── components/
│   ├── ui/                     # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   ├── GasCard.tsx            # Individual chain gas display
│   ├── GasChart.tsx           # Candlestick volatility chart
│   ├── Header.tsx             # App header with mode toggle
│   └── SimulationPanel.tsx    # Transaction cost simulation
├── config/
│   └── chains.ts              # Chain configurations & RPC URLs
├── hooks/
│   └── use-toast.ts           # Toast notification hook
├── pages/
│   ├── Index.tsx              # Main dashboard page
│   └── NotFound.tsx           # 404 page
├── services/
│   └── web3Service.ts         # Web3 connection & data fetching
├── store/
│   └── gasStore.ts            # Zustand state management
├── types/
│   └── gas.ts                 # TypeScript type definitions
├── lib/
│   └── utils.ts               # Utility functions
└── App.tsx                    # Root app component

````

---

## 🛠️ How to Run Locally

To set up and run the project locally, make sure you have **Node.js** and **npm** (use `nvm` recommended).

### Clone & Install

```bash
# Step 1: Clone the repository
git clone https://github.com/Sarad-Agarwal/gas-glide-across-chains.git

# Step 2: Navigate into the project directory
cd gas-glide-across-chains

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
````

---

## 🧪 How to Use

* ✅ By default, you're in **Live Mode**: real-time gas prices update every 6 seconds via WebSockets.
* 🧪 Switch to **Simulation Mode** using the toggle.
* Enter a transfer value (e.g., `0.5 ETH`, `2 MATIC`) to see:

  * Gas fee in native token
  * USD value of the gas
  * Total estimated transaction cost
* 📈 Check the **Candlestick Chart** to monitor gas volatility per chain.

---

## 🚀 Deployment

This project is deployed via [Vercel](https://vercel.com/) for fast and seamless CI/CD integration.

---

## 📚 Tech Stack

* **Framework**: Next.js (React-based)
* **Language**: TypeScript
* **Web3**: Ethers.js (with `WebSocketProvider`)
* **State Management**: Zustand
* **Charting**: lightweight-charts (TradingView)
* **Styling**: Tailwind CSS + shadcn-ui
* **Animation**: Framer Motion

---

## 🧠 GitHub Repository

🔗 [github.com/Sarad-Agarwal/gas-glide-across-chains](https://github.com/Sarad-Agarwal/gas-glide-across-chains)

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).


