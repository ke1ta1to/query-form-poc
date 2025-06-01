import { Route, Routes } from "react-router";
import IndexPage from "./routes/IndexPage";

export default function App() {
  return (
    <Routes>
      <Route index element={<IndexPage />} />
    </Routes>
  );
}
