import React, { useEffect } from "react";
import "./App.css";
import { MainTasks } from "./pages/MainTasks/MainTasks";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { CreateOrJoin } from "./pages/CreateOrJoin/CreateOrJoin";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./redux/store";
import { fetchAuthMe } from "./redux/auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { SkeletonBlock } from "./pages/SkeletonBlock/SkeletonBlock";
import { TeamCreating } from "./pages/TeamCreating/TeamCreating";
import { Join } from "./pages/Join/Join";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="content">
        <Routes>
          {/* Защищённые маршруты */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teamcreating"
            element={
              <ProtectedRoute>
                <TeamCreating />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createorjoin"
            element={
              <ProtectedRoute>
                <CreateOrJoin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/join"
            element={
              <ProtectedRoute>
                <Join />
              </ProtectedRoute>
            }
          />
          {/* Публичные маршруты */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Registration />
              </PublicRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
