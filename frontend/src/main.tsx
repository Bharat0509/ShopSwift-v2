import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ThemeProvider/index.tsx";
import "./index.css";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
