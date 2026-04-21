import { AppProvider } from "./context/orderContext.jsx";
import AppRouter from "./router/orderRouter";

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
