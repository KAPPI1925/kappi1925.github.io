/**
 * ============================================================
 *  PROFILE DATA — Edit this file to update your personal info
 * ============================================================
 *
 *  HOW TO UPDATE:
 *  1. Change any text value in quotes ("...")
 *  2. Add/remove items in arrays [...]
 *  3. Save the file — changes appear instantly on your site
 *
 *  TIPS:
 *  - For special characters, use Unicode (e.g. \u00e9 for é)
 *  - Keep URLs starting with https://
 *  - DOIs should be full URLs for clickable links
 * ============================================================
 */

const PROFILE = {
  // ─── Personal Information ─────────────────────────────
  name: "Kamalesh Kanna S",
  title: "Ph.D. Research Scholar",
  department: "Department of Remote Sensing and GIS",
  university: "Tamil Nadu Agricultural University (TNAU), Coimbatore, India",
  tagline: "Remote Sensing & GIS Specialist | Precision Agriculture Researcher",
  email: "kamaleshkanna.skk@gmail.com",
  orcid: "https://orcid.org/0009-0003-8971-9221",
  researchGate: "https://www.researchgate.net/profile/Kamalesh-Kanna",
  github: "https://github.com/KAPPI1925",
  profileImage: "images/kamalesh.gif",

  // ─── Bio / About Section ─────────────────────────────
  // Each item in the array is a paragraph. Add/remove paragraphs as needed.
  bio: [
    "I am Kamalesh Kanna S, a Ph.D. Research Scholar in the Department of Natural Resource Management at Tamil Nadu Agricultural University (TNAU), Coimbatore. My research focuses on the intersection of remote sensing, geographic information systems (GIS), and deep learning for applications in precision agriculture, soil science, and environmental monitoring.",
    "I hold an M.Sc. (Ag.) in Remote Sensing and GIS from TNAU (87.40%) and a B.Sc. (Hons) in Agriculture from SRS Institute of Agricultural and Technology (76.50%). My work integrates satellite imagery, drone-based data acquisition, machine learning algorithms, and spatial analysis techniques to address real-world challenges in agricultural and environmental domains.",
    "My research interests include digital soil mapping using deep learning architectures (U-Net), land use and land cover classification with object-based image analysis (OBIA), YOLO-based object detection for agricultural applications, soil moisture evaluation through AI and computer vision, and multi-source geospatial data integration for hilly terrain analysis.",
    "I have published research articles in peer-reviewed journals including Earth Science Informatics (Springer), Plant Science Today, and Journal of Agricultural Engineering. I have also contributed book chapters published by CRC Press and Academic Publishers. Additionally, I serve as a peer reviewer for the Journal of the Indian Society of Remote Sensing (Springer).",
    "Beyond research, I am passionate about science communication and knowledge dissemination. I conduct invited talks and hands-on workshops on GIS and digital soil mapping, and I run a YouTube channel (My Desktop Tech) where I create educational content on technology and geospatial tools."
  ],

  // ─── Research Interests ──────────────────────────────
  // Add or remove research interest items as needed
  researchInterests: [
    { icon: "fa-satellite", label: "Remote Sensing & Satellite Image Analysis" },
    { icon: "fa-map-marked-alt", label: "Geographic Information Systems (GIS)" },
    { icon: "fa-brain", label: "Deep Learning for Geospatial Applications" },
    { icon: "fa-seedling", label: "Precision Agriculture & Crop Monitoring" },
    { icon: "fa-mountain", label: "Digital Soil Mapping & Classification" },
    { icon: "fa-helicopter", label: "Drone-Based Remote Sensing & UAV Imagery" },
    { icon: "fa-layer-group", label: "Land Use / Land Cover Change Analysis" },
    { icon: "fa-eye", label: "Object Detection (YOLO) in Agriculture" },
    { icon: "fa-water", label: "Soil Moisture Evaluation & Hydrology" }
  ],

  // ─── Research Statistics ─────────────────────────────
  stats: {
    publications: 8,
    citations: 58,
    hIndex: 2,
    researchInterest: 81.9
  },

  // ─── Education ────────────────────────────────────────
  // Add new entries at the top of the array
  education: [
    {
      degree: "Ph.D. (Pursuing)",
      field: "Natural Resource Management (Remote Sensing & GIS)",
      institution: "Tamil Nadu Agricultural University, Coimbatore",
      year: "2024 – 2027 (Expected)",
      marks: "—",
      details: "Research focus: Digital Soil Mapping using Deep Learning (U-Net Architecture) and Multimodal Covariate Integration"
    },
    {
      degree: "M.Sc. (Ag.)",
      field: "Remote Sensing and GIS",
      institution: "Tamil Nadu Agricultural University, Coimbatore",
      year: "2022 – 2024",
      marks: "87.40%",
      details: "Specialized in geospatial technologies, satellite image processing, and spatial data analysis for agricultural applications"
    },
    {
      degree: "B.Sc. (Hons)",
      field: "Agriculture",
      institution: "SRS Institute of Agricultural and Technology",
      year: "2018 – 2022",
      marks: "76.50%",
      details: "Foundation in agricultural sciences, agronomy, soil science, and crop management"
    }
  ],

  // ─── Skills ──────────────────────────────────────────
  // Organized by category. Add new categories or skills as needed.
  skillCategories: [
    {
      name: "Remote Sensing & GIS",
      icon: "fa-satellite",
      skills: [
        { name: "ArcGIS Pro" },
        { name: "QGIS" },
        { name: "Google Earth Engine" },
        { name: "eCognition (OBIA)" },
        { name: "SAGA GIS" },
        { name: "Pix4D (Drone Mapping)" },
        { name: "ERDAS Imagine" },
        { name: "SNAP (ESA Sentinel)" },
        { name: "BHUVAN (ISRO)" }
      ]
    },
    {
      name: "Programming & Data Science",
      icon: "fa-code",
      skills: [
        { name: "Python" },
        { name: "R / RStudio" },
        { name: "Google Earth Engine JS" },
        { name: "MATLAB" },
        { name: "Kotlin" },
        { name: "SQL" }
      ]
    },
    {
      name: "Deep Learning & AI",
      icon: "fa-brain",
      skills: [
        { name: "TensorFlow / Keras" },
        { name: "PyTorch" },
        { name: "YOLO (v5/v7/v8)" },
        { name: "U-Net Architecture" },
        { name: "Scikit-learn" }
      ]
    },
    {
      name: "Creative & Media",
      icon: "fa-palette",
      skills: [
        { name: "Adobe Premiere Pro" },
        { name: "Adobe After Effects" },
        { name: "Adobe Photoshop" },
        { name: "Adobe Illustrator" },
        { name: "Adobe InDesign" },
        { name: "Photography" }
      ]
    }
  ],

  // ─── Social & Professional Links ─────────────────────
  // Add or remove links as needed
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/kamalesh-kanna-s/", icon: "fa-linkedin" },
    { label: "ResearchGate", url: "https://www.researchgate.net/profile/Kamalesh-Kanna", icon: "fa-brands fa-researchgate" },
    { label: "GitHub", url: "https://github.com/KAPPI1925", icon: "fa-github" },
    { label: "ORCID", url: "https://orcid.org/0009-0003-8971-9221", icon: "a-brands fa-orcid" },
    { label: "YouTube", url: "https://www.youtube.com/@MyDesktopTech", icon: "fa-youtube" },
    { label: "Blog", url: "https://kamaleshkanna.medium.com/", icon: "fa-medium" },
    { label: "Instagram", url: "https://www.instagram.com/kamaleshkanna_s/", icon: "fa-instagram" },
    { label: "X (Twitter)", url: "https://x.com/kamalesh0109", icon: "fa-x-twitter" }
  ],

  // ─── Footer ──────────────────────────────────────────
  copyright: "© 2025 Kamalesh Kanna S. All Rights Reserved."
};
