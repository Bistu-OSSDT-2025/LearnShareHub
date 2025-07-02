import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateStudyGroupPage from './pages/CreateStudyGroupPage';
import StudyGroupPage from './pages/StudyGroupPage';
import StudyGroupDetails from './pages/StudyGroupDetails';
import MessagesPage from "./pages/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          // 在 Routes 中添加
          <Route 
            path="/create-study-group"
            element={
              <ProtectedRoute>
                <CreateStudyGroupPage />
              </ProtectedRoute>
            }
          />
          {/* 👇 新增学习小组相关路由 */}
          {/* 学习小组列表页 */}
          <Route path="/study-group" element={<StudyGroupPage />} /> 
          {/* 学习小组详情页，:id 是动态参数 */}
          <Route path="/groups/:id" element={<StudyGroupDetails />} /> 
          <Route 
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
