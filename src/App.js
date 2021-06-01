import "./App.scss";
import { ToastContainer } from "react-toastify";

import background from "./assets/image/bg-2.jpeg";
import Landing from "./components/Landing";
import "react-toastify/dist/ReactToastify.css";

function App(store) {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          width: "100%",
          opacity: "0.5",
          position: "absolute",
        }}
      ></div>
      <ToastContainer hideProgressBar limit={1} autoClose={6000} />
      <Landing store={store} />
    </div>
  );
}

export default App;
