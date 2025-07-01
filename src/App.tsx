import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ErrorBoundary } from 'react-error-boundary';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import StudyGroupPage from './pages/StudyGroupPage';
import StudyGroupDetails from './pages/StudyGroupDetails';
import MessagesPage from './pages/Messages'; // 导入消息页面组件

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div className="p-4 bg-red-50 text-red-700">
              <h2 className="font-bold">应用错误</h2>
              <pre>{error.message}</pre>
            </div>
          )}
        >
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
          {/* 👇 新增学习小组相关路由 */}
          {/* 学习小组列表页 */}
          <Route path="/study-group" element={<StudyGroupPage />} /> 
          {/* 学习小组详情页，:id 是动态参数 */}
          <Route path="/groups/:id" element={<StudyGroupDetails />} /> 
          {/* 消息页面 */}
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
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
