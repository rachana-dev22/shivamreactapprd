import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import ServerBrowser from "./components/ServerBrowser";
import ProfileTab from "./components/ProfileTab";
import ChatTab from "./components/ChatTab";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./components/NotFound";
import ResourceLibrary from "./components/ResourceLibrary";
import StudyGuides from "./components/categories/StudyGuides";
import ExamPapers from "./components/categories/ExamPapers";
import PracticeTests from "./components/categories/PracticeTests";
import VideoTutorials from "./components/categories/VideoTutorials";
import CheatSheets from "./components/categories/CheatSheets";
import ToolsAndTemplates from "./components/categories/ToolsAndTemplates";
import Flashcards from "./components/categories/FlashCards";
import EBooksAndArticles from "./components/categories/EBooksAndArticles";
import InteractiveQuizzes from "./components/categories/InteractiveQuizzes";
import LabManuals from "./components/categories/LabManuals";
import ResearchPapers from "./components/categories/ResearchPapers";
import PastProjects from "./components/categories/PastProjects";
import CertificationPrepMaterials from "./components/categories/CertificationPrepMaterials";
import WebinarsAndWorkshops from "./components/categories/WebinarsAndWorkshops";
import CareerResources from "./components/categories/CareerResources";
import CodingChallenges from "./components/categories/CodingChallenges";
import PresentationTemplates from "./components/categories/PresentationTemplates";
import CaseStudies from "./components/categories/CaseStudies";
import GroupStudyResources from "./components/categories/GroupStudyResources";
import LanguageLearningResources from "./components/categories/LanguageLearningResources";
import "./css/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="*" element={<NotFound />} />
        {isAuthenticated && (
          <>
            <Route
              path="/launchpad"
              element={
                <DashboardLayout>
                  <ServerBrowser />
                </DashboardLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <DashboardLayout>
                  <ProfileTab />
                </DashboardLayout>
              }
            />
            <Route
              path="/chat"
              element={
                <DashboardLayout>
                  <ChatTab />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources"
              element={
                <DashboardLayout>
                  <ResourceLibrary />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/study-guides"
              element={
                <DashboardLayout>
                  <StudyGuides />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/exam-papers"
              element={
                <DashboardLayout>
                  <ExamPapers />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/practice-tests"
              element={
                <DashboardLayout>
                  <PracticeTests />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/video-tutorials"
              element={
                <DashboardLayout>
                  <VideoTutorials />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/cheat-sheets"
              element={
                <DashboardLayout>
                  <CheatSheets />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/tools-templates"
              element={
                <DashboardLayout>
                  <ToolsAndTemplates />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/flashcards"
              element={
                <DashboardLayout>
                  <Flashcards />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/e-books-articles"
              element={
                <DashboardLayout>
                  <EBooksAndArticles />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/interactive-quizzes"
              element={
                <DashboardLayout>
                  <InteractiveQuizzes />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/lab-manuals"
              element={
                <DashboardLayout>
                  <LabManuals />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/research-papers"
              element={
                <DashboardLayout>
                  <ResearchPapers />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/past-projects"
              element={
                <DashboardLayout>
                  <PastProjects />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/certification-prep-materials"
              element={
                <DashboardLayout>
                  <CertificationPrepMaterials />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/webinars-workshops"
              element={
                <DashboardLayout>
                  <WebinarsAndWorkshops />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/career-resources"
              element={
                <DashboardLayout>
                  <CareerResources />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/coding-challenges"
              element={
                <DashboardLayout>
                  <CodingChallenges />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/presentation-templates"
              element={
                <DashboardLayout>
                  <PresentationTemplates />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/case-studies"
              element={
                <DashboardLayout>
                  <CaseStudies />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/group-study-resources"
              element={
                <DashboardLayout>
                  <GroupStudyResources />
                </DashboardLayout>
              }
            />
            <Route
              path="/resources/language-learning-resources"
              element={
                <DashboardLayout>
                  <LanguageLearningResources />
                </DashboardLayout>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
