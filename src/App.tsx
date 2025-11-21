import { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import { warmUpServer } from "./api/warmUpServer"; 

function App() {
  // 앱 시작 시 실행되는 부분
  useEffect(() => {
    warmUpServer(5); // 5회 웜업
  }, []);

  return <AppRouter />; 
}

export default App;
