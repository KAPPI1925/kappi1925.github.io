/**
 * ============================================================
 *  ACTIVITIES DATA — Edit this file to update certifications,
 *  courses, workshops, conferences, webinars, and awards
 * ============================================================
 *
 *  HOW TO ADD A NEW ENTRY:
 *  1. Find the correct category array
 *  2. Copy an existing entry as a template
 *  3. Fill in the details
 *  4. Save — done!
 *
 *  ENTRY FORMAT: { title, year, certificatePath, url }
 *  - certificatePath: path to certificate image (for modal popup)
 *    • Use a string for single image: "certifications/..."
 *    • Use an array for multiple images: ["certifications/...", "certifications/..."]
 *    • Omit if no certificate image available
 *  - url: external link (for clickable title)
 * ============================================================
 */

const ACTIVITIES = {

  // ─── Web Courses (by provider) ───────────────────────
  webCourses: {
    "ESRI": [
      { title: "Getting Started with Spatial Analysis", year: "2025", certificatePath: "certifications/Course and Softwares/ESRI/Web Course - ESRI - Getting Started with Spatial Analysis_page_1.jpg" },
      { title: "GIS Basics", year: "2023", certificatePath: "certifications/Course and Softwares/ESRI/Web Course - ESRI - GIS Basics_page_1.jpg" },
      { title: "ArcGIS Online Basics", year: "2023", certificatePath: "certifications/Course and Softwares/ESRI/Web Course - ESRI - ArcGIS Online Basics_page_1.jpg" },
      { title: "ArcGIS Pro Basics", year: "2023", certificatePath: "certifications/Course and Softwares/ESRI/Web Course - ESRI - ArcGIS Pro Basics_page_1.jpg" },
      { title: "Getting Started with Data Management", year: "2023", certificatePath: "certifications/Course and Softwares/ESRI/Web Course - ESRI - Getting Started with Data Management_page_1.jpg" },
      { title: "Getting Started with GIS", year: "2023", certificatePath: "certifications/Course and Softwares/ESRI/Web Course - ESRI - Getting Started with GIS_page_1.jpg" }
    ],
    "ISRO / IIRS": [
      { title: "Primer on Interferometric SAR Remote Sensing (IIRS\u2013NASA)", year: "2025", certificatePath: "certifications/Course and Softwares/ISRO/Internaational Web Course - ISRO, GoI, NASA - Primer on Interferometric SAR Remote Sensing_page_1.jpg" },
      { title: "Remote Sensing and Digital Image Analysis", year: "2025", certificatePath: "certifications/Course and Softwares/ISRO/Web Course - ISRO - Remote Sensing and Digital Image Analysis_page_1.jpg" },
      { title: "Remote Sensing Data Analytics for Crop Production Forecasting", year: "2025", certificatePath: "certifications/Course and Softwares/ISRO/Web Course - ISRO - Remote Sensing Data Analytics for Crop Production Forecasting_page_1.jpg" },
      { title: "Geospatial Technology for Modelling of Urban Environment", year: "2025", certificatePath: "certifications/Course and Softwares/ISRO/Web Course - ISRO - Geospatial technology for modelling of Urban Environment_page_1.jpg" },
      { title: "Space Technology for Disaster Risk Reduction", year: "2025", certificatePath: "certifications/Course and Softwares/ISRO/Web Course - ISRO - Space Technology for Disaster Risk Reduction_page_1.jpg" },
      { title: "Remote Sensing of Soils: Mapping, Classification and Evaluation for Agricultural Land Use Planning", year: "2025", certificatePath: "certifications/Course and Softwares/ISRO/Web Course - ISRO - Remote Sensing of Soils Mapping Classification _page_1.jpg" },
      { title: "AI/ML for Geodata Analysis", year: "2024", certificatePath: "certifications/Course and Softwares/ISRO/Web Course - ISRO - AL and ML GeoData_page_1.jpg" },
      { title: "Automated Feature Extraction from High Resolution Images", year: "2023", certificatePath: "certifications/Course and Softwares/ISRO/Web Course - ISRO - Automated Feature Extraction from HR_page_1.jpg" }
    ],
    "MOOC Programs": [
      { title: "GIS for Climate Action (ESRI)", year: "2026", certificatePath: "certifications/Course and Softwares/MOOC/2026 - MOOC - ESRI - GIS for Climate Action.jpg" },
      { title: "The ArcGIS Imagery MOOC: Foundations and Frontiers (ESRI)", year: "2025", certificatePath: "certifications/Course and Softwares/MOOC/MOOC - ESRI - The ArcGIS Imagery MOOC Foundations and Frontiers_page_1.jpg" },
      { title: "Earth Observation for Climate Action (ISRO)", year: "2025", certificatePath: "certifications/Course and Softwares/MOOC/MOOC - ISRO - Earth Observation for Climate Action_page_1.jpg" },
      { title: "Spatial Data Science: The New Frontier in Analytics (ESRI)", year: "2025", certificatePath: "certifications/Course and Softwares/MOOC/MOOC - ESRI - Spatial Data Science_page_1.jpg" },
      { title: "Cartography (ESRI)", year: "2024", certificatePath: "certifications/Course and Softwares/MOOC/MOOC - ESRI - Cartography_page_1.jpg" },
      { title: "Going Places with Spatial Analysis (ESRI)", year: "2024", certificatePath: "certifications/Course and Softwares/MOOC/MOOC - ESRI - Going Places with Spatial Analysis_page_1.jpg" }
    ],
    "MATLAB (MathWorks)": [
      { title: "MATLAB Onramp", year: "2025", certificatePath: "certifications/Course and Softwares/MatLab/1. Matlab Onramp_page_1.jpg" },
      { title: "MATLAB Simulink Onramp", year: "2025", certificatePath: "certifications/Course and Softwares/MatLab/2. Simulink Onramp_page_1.jpg" },
      { title: "Machine Learning Onramp", year: "2025", certificatePath: "certifications/Course and Softwares/MatLab/3. Machine Learning Onramp_page_1.jpg" }
    ],
    "Self-Paced / Job Simulations": [
      { title: "Roadmap to Become a Machine Learning Engineer (Scaler)", year: "2026", certificatePath: "certifications/Course and Softwares/Course Certificates/Online course Certificates/Scalar - Roadmap to Machine Learning Engineer.png" },
      { title: "GenAI Powered Data Analytics Job Simulation (TATA)", year: "2026", certificatePath: "certifications/Course and Softwares/Course Certificates/Online course Certificates/TATA - GenAI Data Anlaysis_page_1.jpg" },
      { title: "AI Upskilling Certificate (Qualcomm Academy)", year: "2026", certificatePath: "certifications/Course and Softwares/Course Certificates/Online course Certificates/2026 - Qualcomm - AI-Upskilling-certificate_page_1.jpg" },
      { title: "UX Design Advanced Job Simulation (LLOYDS)", year: "2026", certificatePath: "certifications/Course and Softwares/Course Certificates/Online course Certificates/2026 - Forage - Lloyds - UX Design Advanced Job Simulation_page_1.jpg" },
      { title: "Quantitative Research Job Simulation (JPMorgan Chase)", year: "2026", certificatePath: "certifications/Course and Softwares/Course Certificates/Online course Certificates/2026 - Forage - JPMorgan - Quantitative Research Job Simulation_page_1.jpg" },
      { title: "Data Analytics Job Simulation (Deloitte)", year: "2026", certificatePath: "certifications/Course and Softwares/Course Certificates/Online course Certificates/2026 - Forage - Deloitte - Data Analytics Job Simulation_page_1.jpg" },
      { title: "Tech Explorer Job Simulation (Commonwealth Bank)", year: "2026", certificatePath: "certifications/Course and Softwares/Course Certificates/Online course Certificates/2026 - Forage - Commonwealth Bank - Tech Explorer Job Simulation_page_1.jpg" },
      { title: "Data Visualisation Empowering Business (TATA)", year: "2026", certificatePath: "certifications/Course and Softwares/Course Certificates/Online course Certificates/2026 - Forage - TATA - Data Visualisation Empowering Business_page_1.jpg" },
      { title: "Markets Quantitative Analysis (Citi)", year: "2026", certificatePath: "certifications/Course and Softwares/Course Certificates/Online course Certificates/2026 - Forage - Citi - Markets Quantitative Analysis _page_1.jpg" }
    ],
    "Other Platforms": [
      { title: "Adobe Premiere Pro CC 2020: Video Editing for Beginners (Udemy)", year: "2020", certificatePath: "certifications/Course and Softwares/Course -Udemy-Adobe premiere pro_page_1.jpg" },
      { title: "Adobe Lightroom Masterclass \u2013 Beginner to Expert (Udemy)", year: "2020", certificatePath: "certifications/Course and Softwares/Course - Udemy - Adobe LightRoom_page_1.jpg" }
    ]
  },

  // ─── Academic Courses ────────────────────────────────
  courses: [
    { title: "Global Warming and Disaster Prevention in Agriculture (TNAU \u2013 NAHEP)", year: "2023", certificatePath: "certifications/Course and Softwares/Course - NAHEP - Global Warming and Disatser Prevention (0+1)_page_1.jpg" },
    { title: "MS-Office 2007 (SysSoft)", year: "2014", certificatePath: "certifications/Course and Softwares/Course - syssoft MS Office_page_1.jpg" },
    { title: "C Programming (SysSoft)", year: "2014", certificatePath: "certifications/Course and Softwares/Course - syssoft C_page_1.jpg" }
  ],

  // ─── Trainings ───────────────────────────────────────
  trainings: [
    { title: "Bhuvan Overview (ISRO \u2013 NRSC)", year: "2025", certificatePath: "certifications/Training/Bhuvan Overview_page_1.jpg" },
    { title: "Data Analysis with MS-Excel (TNAU \u2013 PS&IT)", year: "2023", certificatePath: "certifications/Training/Training - TNAU - Excel_page_1.jpg" }
  ],

  // ─── Webinars ────────────────────────────────────────
  webinars: [
    { title: "Pharmacovigilance \u2013 Department of Industrial Biotechnology and Faculty of Agricultural Science (Bharath University)", year: "2020", certificatePath: "certifications/Webniar/Webinar - Bharath university - Biotech_page_1.jpg" }
  ],

  // ─── Workshops ───────────────────────────────────────
  workshops: [
    { title: "State Level Awareness Workshop & CBT on e-Governance Standards & Guidelines (MeitY, GoI)", year: "2026", certificatePath: "certifications/Workshop/Workshop - MeiT GoI 2026.jpg" },
    { title: "Empowering Early Career Researchers in Advancing Climate Resilient Agriculture (KSNUAHS \u2013 NRI, UK & ICSSR)", year: "2026", certificatePath: "certifications/Workshop/Workshop - CRARC Shivamogaa 2026_page_1.jpg" },
    { title: "Meeting the Essentials of Academic Deliberation in Graduate Seminar and Thesis Examination (TNAU \u2013 DNRM)", year: "2023", certificatePath: "certifications/Workshop/Workshop - NRM ENS_page_1.jpg" },
    { title: "Edible Mushroom Cultivation for Self-Employment (SRSIAT)", year: "2019", certificatePath: "certifications/Workshop/Workshop - mushroom_page_1.jpg" }
  ],

  // ─── Conferences ─────────────────────────────────────
  conferences: [
    { title: "Sustainable Agriculture and Farmers Well-being: Digitalize, Diversify, Decarbonise and Develop (TNAU \u2013 10th AGSC) [Poster Presentation]", year: "2025", certificatePath: "certifications/conferences/sustainable-agriculture.jpg" },
    { title: "9th Agricultural Graduate Student Conference (TNAU)", year: "2024", certificatePath: "certifications/conferences/agsc-9.jpg" },
    { title: "Globalization of Agriculture: Food, Feed & Fuel (TNAU \u2013 8th AGSC)", year: "2023", certificatePath: "certifications/Conference/Conference AGSC - 8th AGSC_page_1.jpg" }
  ],

  // ─── Invited Talks ───────────────────────────────────
  invitedTalks: [
    { title: "Soil Survey and Digital Mapping using Remote Sensing \u2013 Practical Hands-on Digital Mapping of Western Ghats Forest Soil Resources using QGIS (GPSIAM)", year: "2025", certificatePath: "certifications/invited-talks/soil-survey-qgis.jpg" }
  ],

  // ─── Hackathons ──────────────────────────────────────
  hackathons: [
    { title: "Drone Phenomics Hackathon", year: "2026", certificatePath: ["certifications/Hackathon/Hackathon Fairground 2026.jpg", "certifications/Hackathon/Hackathon Fairground 2026 group.jpeg"] }
  ],

  // ─── Awards & Recognitions ──────────────────────────
  awards: [
    { title: "ICMAAS 2025 \u2013 Young Academician Award", year: "2025", certificatePath: "certifications/Awards/ICMAAS 2025 - Young Academician Award.jpg" },
    { title: "SimplyGIS \u2013 Champion", year: "2025", certificatePath: "certifications/Awards/SimplyGIS - Champion Kamalesh Kanna S.jpg" }
  ],

  // ─── Memberships ─────────────────────────────────────
  memberships: [
    { title: "Geographical Society of India", year: "2025\u2013Present" },
    { title: "Indian Society of Remote Sensing", year: "2024\u2013Present" }
  ]
};
