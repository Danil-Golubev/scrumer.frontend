import React, { useEffect } from "react";
import "./App.css";
import { MainTasks } from "./pages/MainTasks/MainTasks";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { CreateOrJoin } from "./pages/CreateOrJoin/CreateOrJoin";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAppDispatch } from "./redux/store";
import { fetchAuthMe } from "./redux/auth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { TeamCreating } from "./pages/TeamCreating/TeamCreating";
import { Join } from "./pages/Join/Join";
import { TaskCreate } from "./pages/TaskCreate/TaskCreate";
import { AiHelper } from "./pages/AiHelper/AiHelper";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch, location.pathname]);

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
            path="/createtask"
            element={
              <ProtectedRoute>
                <TaskCreate />
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

          <Route
            path="/aihelper"
            element={
              <ProtectedRoute>
                <AiHelper />
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
