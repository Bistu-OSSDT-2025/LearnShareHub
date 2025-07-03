import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateStudyGroupPage from './pages/CreateStudyGroupPage';
import StudyGroupPage from './pages/StudyGroupPage';
import StudyGroupDetails from './pages/StudyGroupDetails';
import CreatePostPage from '@/pages/CreatePostPage';
import PopularSubjectsPage from './pages/PopularSubjectsPage';
import SubjectsPage from './pages/SubjectsPage';
import MessagesPage from "./pages/Messages";
import StabilityTestPage from './pages/StabilityTestPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
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
          <Route 
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            }
          />
          {/* 👇 新增学习小组相关路由 */}
          {/* 学习小组列表页 */}
          <Route path="/study-group" element={<StudyGroupPage />} /> 
          {/* 学习小组详情页，:id 是动态参数 */}
          <Route path="/groups/:id" element={<StudyGroupDetails />} /> 
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route 
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/popular-subjects" element={<PopularSubjectsPage />} />
          <Route 
            path="/stability-test"
            element={
              <ProtectedRoute>
                <StabilityTestPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
