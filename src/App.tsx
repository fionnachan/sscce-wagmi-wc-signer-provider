import "./App.css";
import AppContent from "./AppContent";
import { WagmiProvider } from "./WagmiProvider";

function App() {
  return (
    <WagmiProvider>
      <AppContent />
    </WagmiProvider>
  );
}

export default App;
