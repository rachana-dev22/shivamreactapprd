import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../css/ResourceLibrary.css";

const ResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Resource Library
      </Typography>

      <Box sx={{ display: "flex", mb: 3 }}>
        <TextField label="Search Resources" variant="outlined" fullWidth value={searchTerm} onChange={handleSearchChange} sx={{ mr: 2 }} />
        <Button variant="contained" color="primary" onClick={handleSearchSubmit}>
          Search
        </Button>
      </Box>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Categories
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/study-guides")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Study Guides
              </Typography>
              <Typography variant="body2">Comprehensive guides to help you ace your subjects.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/exam-papers")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Exam Papers
              </Typography>
              <Typography variant="body2">Past exam papers for practice and revision.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/practice-tests")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Practice Tests
              </Typography>
              <Typography variant="body2">Timed tests to prepare you for the real exam day.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/video-tutorials")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Video Tutorials
              </Typography>
              <Typography variant="body2">Watch and learn with step-by-step video lessons.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/cheat-sheets")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Cheat Sheets
              </Typography>
              <Typography variant="body2">Quick reference sheets to help you remember key concepts.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/tools-templates")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Tools & Templates
              </Typography>
              <Typography variant="body2">Ready-to-use tools and templates for your projects.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/flashcards")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Flashcards
              </Typography>
              <Typography variant="body2">Digital flashcards to boost your memory retention.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/e-books-articles")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                E-books & Articles
              </Typography>
              <Typography variant="body2">A library of e-books and articles for deep dives into topics.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/interactive-quizzes")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Interactive Quizzes
              </Typography>
              <Typography variant="body2">Engage with interactive quizzes to test your knowledge.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/lab-manuals")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Lab Manuals
              </Typography>
              <Typography variant="body2">Detailed manuals to guide you through lab experiments.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/research-papers")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Research Papers
              </Typography>
              <Typography variant="body2">Access a collection of academic research papers.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/past-projects")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Past Projects
              </Typography>
              <Typography variant="body2">Explore past projects to inspire your own work.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/certification-prep-materials")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Certification Prep Materials
              </Typography>
              <Typography variant="body2">Materials to help you prepare for certification exams.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/webinars-workshops")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Webinars & Workshops
              </Typography>
              <Typography variant="body2">Attend or watch past webinars and workshops.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/career-resources")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Career Resources
              </Typography>
              <Typography variant="body2">Resources to guide you in building a successful career.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/coding-challenges")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Coding Challenges
              </Typography>
              <Typography variant="body2">Sharpen your coding skills with these challenges.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/presentation-templates")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Presentation Templates
              </Typography>
              <Typography variant="body2">Professional templates for your presentations.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/case-studies")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Case Studies
              </Typography>
              <Typography variant="body2">In-depth case studies for various subjects.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/group-study-resources")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Group Study Resources
              </Typography>
              <Typography variant="body2">Tools and resources for group study sessions.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card className="resource-card" onClick={() => navigate("/resources/language-learning-resources")}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Language Learning Resources
              </Typography>
              <Typography variant="body2">Resources to help you master a new language.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourceLibrary;
