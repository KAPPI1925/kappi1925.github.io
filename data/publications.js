/**
 * ============================================================
 *  PUBLICATIONS DATA — Edit this file to update your academic works
 * ============================================================
 *
 *  HOW TO ADD A NEW PUBLICATION:
 *  1. Find the correct category array (researchArticles, reviewArticles, etc.)
 *  2. Copy an existing entry as a template
 *  3. Fill in the new details
 *  4. Save — done!
 *
 *  CATEGORY OPTIONS:
 *  - researchArticles: Original research papers in journals
 *  - reviewArticles: Review/survey papers
 *  - popularArticles: Articles in popular science magazines
 *  - books: Authored books
 *  - bookChapters: Chapters in edited volumes
 *  - conferencePapers: Conference presentations & proceedings
 *  - reviewerRoles: Journal reviewing / editorial roles
 * ============================================================
 */

const PUBLICATIONS = {

  // ─── Research Articles ────────────────────────────────
  researchArticles: [
    {
      title: "Beyond Parallel Trends: A Confounder-Adjusted, Spatially Explicit Test of Climate–Land-Use Associations in a Western Ghats-Adjacent Semi-Arid District, South India",
      authors: "M. Vasanthakumar, R. Sakthivel, <b>Kamalesh Kanna Shanmuganathan</b>, A. Mathesh Siva, A. Geethakarthi",
      year: "2026",
      journal: "Asian Journal of Geographical Research, 9(4): 153–163",
      doi: "https://doi.org/10.9734/ajgr/2026/v9i4475",
      url: "https://www.researchgate.net/publication/414900871_Beyond_Parallel_Trends_A_Confounder-Adjusted_Spatially_Explicit_Test_of_Climate-Land-Use_Associations_in_a_Western_Ghats-Adjacent_Semi-Arid_District_South_India",
      abstract: "This study tests whether land-use/land-cover change and climate trends in Erode District, Tamil Nadu (a semi-arid district adjacent to the Western Ghats) remain associated after accounting for topographic and anthropogenic confounders. Sentinel-2 imagery for 2016 and 2024 was classified with Random Forest (overall accuracy 75.7% and 74.8%). Climate trends at 156 gridded nodes (1990–2025) were evaluated with autocorrelation-aware Mann-Kendall tests; minimum temperature rose significantly at all nodes. Logistic regression on a 1 km grid showed that the agriculture-to-built-up transition stayed significantly associated with the local minimum-temperature trend after adjusting for elevation, slope, distance to road and population, offering a replicable, non-causal testing framework.",
      tags: ["LULC Change", "Climate Trends", "Mann-Kendall", "Sentinel-2", "Spatial Statistics"],
      coverImage: ""
    },
    {
      title: "Assessment of Land Use and Land Cover Mapping Using Object-Based Classification Techniques for the Eastern Districts of Tamil Nadu",
      authors: "Karthikkumar A, R Kumaraperumal, S Pazhanivelan, D Muthumanickam, K P Ragunath, S Selvakumar, <b>Kamalesh Kanna Shanmuganathan</b>",
      year: "2025",
      journal: "Plant Science Today, 12(2)",
      doi: "https://doi.org/10.14719/pst.6260",
      url: "https://doi.org/10.14719/pst.6260",
      abstract: "LULC mapping is crucial for understanding environmental monitoring, supporting sustainable development, and managing natural resources. This study evaluated the accuracy of object-based LULC classification using Sentinel-2 data and machine learning classifiers in the Ariyalur, Perambalur, and Mayiladuthurai districts of Tamil Nadu during the kharif season of 2023. OBIA clusters pixels based on their spectral and spatial characteristics, utilizing segmentation to generate masks that effectively represent the image content. The Random Forest algorithm consistently demonstrated high performance with overall accuracy of 88% and kappa coefficient of 0.76.",
      tags: ["LULC", "OBIA", "Random Forest", "Sentinel-2", "Machine Learning"],
      coverImage: ""
    },
    {
      title: "Data Mining Techniques for LULC Analysis Using Sparse Labels and Multisource Data Integration for the Hilly Terrain of Nilgiris District, Tamil Nadu, India",
      authors: "Kumaraperumal R, NivasRaj D, Pazhanivelan S, Jagadesh K, Duraisamy D, Muthumanickam D, Jagadeeswaran R, Karthikkumar A, <b>Kamalesh Kanna Shanmuganathan</b>",
      year: "2024",
      journal: "Earth Science Informatics, 18(1): 1–16",
      doi: "https://doi.org/10.1007/s12145-024-01586-y",
      url: "https://doi.org/10.1007/s12145-024-01586-y",
      abstract: "Accurate and quantitative assessment of LULC changes is crucial for understanding spatial dynamics and environmental impacts. In hilly terrains like the Nilgiris district, assessments are particularly challenging due to complex topography and sparse ground truth labels. The study evaluated 13 data mining classifiers including Random Forest, SVM, and 1D-CNN, integrating auxiliary variables with sparse ground truth labels (391 samples). SVM-Linear Kernel achieved the highest OA of 88% with Kappa of 0.84.",
      tags: ["LULC", "Data Mining", "Sparse Labels", "Nilgiris", "SVM", "Random Forest"],
      coverImage: ""
    }
  ],

  // ─── Review Articles ──────────────────────────────────
  reviewArticles: [
    {
      title: "Geospatial Methods for SDG Aligned Natural Resource Management through Bibliometric and Systematic Review",
      authors: "M. Ajay Prakash, K. P. Ragunath, S. Pazhanivelan, D. Muthumanickam, A. P. Sivamurugan, G. Vanitha, Fawaz Parapurath, <b>Kamalesh Kanna Shanmuganathan</b>, D. Sivakumar, Kumar Veluswamy",
      year: "2026",
      journal: "Discover Sustainability (Springer Nature)",
      doi: "https://doi.org/10.1007/s43621-026-04510-0",
      url: "https://link.springer.com/article/10.1007/s43621-026-04510-0",
      abstract: "A bibliometric analysis of 335 articles (2021–2026) combined with a PRISMA-based systematic review of 59 studies maps global research on geospatial methods for land and water resource management. Groundwater potential mapping was the most studied application, and machine learning consistently outperformed the widely used AHP (mean ROC-AUC 0.860 vs 0.748). Model accuracy was poorly predicted by the number of thematic input layers, and 92% of comparative studies found that urban and agricultural expansion reduces groundwater or water-body extent, supporting SDG 6 and SDG 15 monitoring. Real-time monitoring, Explainable AI and climate-resilient frameworks are identified as priorities.",
      tags: ["Bibliometrics", "Systematic Review", "SDGs", "Groundwater", "Machine Learning", "GIS"],
      coverImage: ""
    },
    {
      title: "YOLO Deep Learning Algorithm for Object Detection in Agriculture: A Review",
      authors: "<b>Kamalesh Kanna Shanmuganathan</b>, Kumaraperumal Ramalingam, Sellaperumal Pazhanivelan, Ramasamy Jagadeeswaran, P. C. Prabu",
      year: "2024",
      journal: "Journal of Agricultural Engineering, 55(4)",
      doi: "https://doi.org/10.4081/jae.2024.1641",
      url: "https://doi.org/10.4081/jae.2024.1641",
      abstract: "YOLO represents one-stage regression-based object detection that directly classifies and locates objects. This review discusses the basic principles behind YOLO, different versions from YOLOv1 to YOLOv11, and their applications in agriculture including crop detection, disease identification, pest recognition, and yield estimation. YOLOv4 demonstrated an AP of 84.8% for bean plant counting, while YOLOv5 achieved 90% precision in rice leaf disease identification.",
      tags: ["YOLO", "Object Detection", "Deep Learning", "Agriculture", "Review"],
      coverImage: ""
    }
  ],

  // ─── Popular Articles ────────────────────────────────
  popularArticles: [
    {
      title: "YOLO in Floriculture: The Next Big Shift in Smart Flower Farming",
      authors: "Keerthivasan Ragupathi, <b>Kamalesh Kanna Shanmuganathan</b>, Nithish Kumar G, Akshya A",
      year: "2025",
      publisher: "Floriculture Today",
      url: "https://www.researchgate.net/publication/398995759_YOLO_in_Floriculture_The_Next_Big_Shift_in_Smart_Flower_Farming",
      abstract: "Indian floriculture faces 25-35% post-harvest losses due to labour shortages, inconsistent grading, and late disease detection. YOLO (You Only Look Once) stands out for its speed, accuracy, and practicality as an advanced object detection model. This article explores how YOLO can transform flower farming through automated grading, disease detection, and quality assessment.",
      tags: ["YOLO", "Floriculture", "Smart Farming", "Computer Vision"],
      coverImage: ""
    }
  ],

  // ─── Books ───────────────────────────────────────────
  books: [
    {
      title: "Soil Resource Characterization and Evaluation of the Coimbatore Forest Division",
      authors: "<b>Kamalesh Kanna Shanmuganathan</b>",
      year: "2025",
      publisher: "Tamil Nadu Agricultural University",
      isbn: "978-93-49673-48-9",
      url: "#",
      abstract: "A comprehensive resource characterization and evaluation study of soil resources in the Coimbatore Forest Division, providing detailed insights into soil properties, classification, and management recommendations for sustainable forest management.",
      tags: ["Soil Science", "Forest Soils", "Resource Evaluation"],
      coverImage: ""
    }
  ],

  // ─── Book Chapters ───────────────────────────────────
  bookChapters: [
    {
      title: "Computer Vision and Image Processing Techniques for Crop Monitoring and Disease Detection (Chapter 3)",
      authors: "<b>Kamalesh Kanna Shanmuganathan</b> (co-author)",
      year: "2027",
      bookTitle: "Intelligent Agro-Technological Ecosystems: Architectures, Analytics, and Autonomous Innovations for Next-Generation Precision Agriculture",
      publisher: "Intelligent Agro-Technological Ecosystems (eds. P. R. Anisha, Sarah Angeline, C. Kishor Kumar Reddy, Inam Ullah Khan, G. Tanusha) – NIPA, New Delhi (forthcoming)",
      isbn: "978-81-674-2052-7 (Print) / 978-81-674-2053-4 (eBook)",
      url: "https://www.nipaers.com/book/9788167420527/intelligent-agro-technological-ecosystems-architectures-analytics-and-autonomous-innovations-for-next-generation-precision-agriculture",
      tags: ["Computer Vision", "Image Processing", "Crop Monitoring", "Disease Detection", "Precision Agriculture"],
      coverImage: ""
    },
    {
      title: "Maximising Crop Yield: AI Strategies for Improved Agricultural Output (Chapter 10)",
      authors: "<b>Kamalesh Kanna Shanmuganathan</b>, Elanselvi A, Athira A Nair, Barathraj D, Keerthivasan Ragupathi",
      year: "2027",
      bookTitle: "Transforming Agriculture Through Artificial Intelligence: A New Era of Smart Farming",
      publisher: "Transforming Agriculture Through Artificial Intelligence: A New Era of Smart Farming – NIPA, New Delhi, pp. 205–230",
      isbn: "978-93-7219-738-9 (Print) / 978-93-7219-740-2 (eBook)",
      url: "https://www.nipaers.com/book/9789372197389/transforming-agriculture-through-artificial-intelligence-a-new-era-of-smart-farming",
      abstract: "This chapter reviews how artificial intelligence can raise crop productivity while reducing resource use. It covers AI models that combine soil, weather, crop-growth and remote sensing data for yield forecasting, fertiliser and water optimisation, genomic selection and market intelligence, and discusses the challenges of data availability, cost and model reliability.",
      tags: ["Artificial Intelligence", "Crop Yield", "Yield Forecasting", "Smart Farming", "Remote Sensing"],
      coverImage: ""
    },
    {
      title: "Coastal Vulnerability Mapping Using Multi-criteria Decision Making (MCDM) Process",
      authors: "<b>Kamalesh Kanna Shanmuganathan</b>, Sivakumar Palraj, Athira A. Nair, V. P. Nithya Segar, Avinash Kanagaraj, Manimaran Gajendiran, Bharathi Mohandass",
      year: "2026",
      bookTitle: "Geospatial Application of Coastal Hazards",
      publisher: "Springer Water, Springer Nature (Cham), pp. 163–189",
      isbn: "978-3-032-20075-4",
      doi: "https://doi.org/10.1007/978-3-032-20076-1_8",
      url: "https://link.springer.com/chapter/10.1007/978-3-032-20076-1_8",
      abstract: "Low-lying coastal areas are increasingly exposed to erosion, flooding, sea-level rise and extreme events, worsened by tourism, industry, agriculture and urbanisation. This chapter reviews multi-criteria decision-making methods (fuzzy logic, the Analytical Hierarchy Process and Weighted Linear Combination) and their integration with GIS for coastal vulnerability assessment and mapping, showing how spatial analysis and decision-support tools improve the precision of vulnerability assessments for coastal management and resilience planning.",
      tags: ["Coastal Vulnerability", "MCDM", "AHP", "GIS", "Climate Hazards"],
      coverImage: ""
    },
    {
      title: "Remote Sensing Applications in Sustainable Agriculture and Food Systems",
      authors: "Devasri Moovendran, Arunpandi Palpandi, <b>Kamalesh Kanna Shanmuganathan</b>, Vasanthakumar Muruganantham",
      year: "2025",
      bookTitle: "Advances in Sustainable Agriculture and Food Systems",
      publisher: "Academic Publishers",
      isbn: "978-93-342-0566-4",
      url: "https://www.researchgate.net/publication/391700516_Remote_Sensing_Applications_in_Sustainable_Agriculture_and_Food_Systems",
      abstract: "This chapter explores how remote sensing transforms sustainable agriculture through integration with GIS, IoT, and AI. It covers the evolution from aerial photography to satellite monitoring, ISRO's contributions through RISAT-1 and Resourcesat-2, and key techniques including optical, multispectral, hyperspectral, microwave, and thermal sensing for crop stress detection, soil moisture monitoring, and flood risk mapping.",
      tags: ["Remote Sensing", "Sustainable Agriculture", "IoT", "AI", "Precision Farming"],
      coverImage: "images/covers/Book chapter - Remote Sensing Applications in Sustainable Agriculture and Food Systems.png"
    },
    {
      title: "Soil Moisture Evaluation by Artificial Intelligence and Computer Vision",
      authors: "Manimaran Gajendiran, Avinash Kanagaraj, Mageshen VR, <b>Kamalesh Kanna Shanmuganathan</b>, Aswitha Kannan",
      year: "2025",
      bookTitle: "Artificial Intelligence and Computer Vision for Ecological Informatics",
      publisher: "CRC Press",
      doi: "https://doi.org/10.1201/9781003518778-16",
      url: "https://doi.org/10.1201/9781003518778-16",
      abstract: "This chapter explores AI and computer vision approaches for soil moisture evaluation, addressing limitations of ground-based sensors and traditional gravimetric methods. It discusses machine learning, deep learning, and neural networks for processing data from remote sensing platforms including satellites and drones, with applications in precision agriculture, forestry management, and water resource management.",
      tags: ["Soil Moisture", "AI", "Computer Vision", "Ecological Informatics"],
      coverImage: "images/covers/Book chapter - Soil Moisture Evaluation by Artificial Intelligence and Computer Vision.jpg"
    }
  ],

  // ─── Conference Papers ────────────────────────────────
  conferencePapers: [
    {
      title: "Soil Order Classification Using Deep Learning Architecture and Multimodal Covariate Integration",
      authors: "N. R. Moorthi, K. Ramalingam, M. Dhanraju, J. Ramasamy, P. Prajesh, <b>Kamalesh Kanna Shanmuganathan</b>",
      year: "2024",
      conference: "IEEE India Geoscience and Remote Sensing Symposium (InGARSS 2024)",
      location: "Goa, India",
      doi: "https://doi.org/10.1109/InGARSS61818.2024.10984388",
      url: "https://doi.org/10.1109/InGARSS61818.2024.10984388",
      type: "Oral Presentation",
      abstract: "This study explores multiclass deep learning (U-Net) for characterizing soil order classes using multimodal covariate datasets representing the SCORPAN model. Six covariates including temperature, elevation, NDVI, FMDR, VV, and VH were integrated for the Madurai district. Six soil order classes were classified with a mean IoU score of 0.62.",
      tags: ["Digital Soil Mapping", "U-Net", "Deep Learning", "Soil Classification"],
      coverImage: ""
    },
    {
      title: "Deep Learning for Jasmine Bud Classification: Advancing Smart Agriculture Through YOLO-Based Vision Systems",
      authors: "<b>Kamalesh Kanna Shanmuganathan</b>, Keerthivasan M",
      year: "2025",
      conference: "Agricultural Graduate Student Conference",
      location: "Tamil Nadu Agricultural University, Coimbatore",
      url: "https://www.researchgate.net/publication/398109797_DEEP_LEARNING_FOR_JASMINE_BUD_CLASSIFICATION_ADVANCING_SMART_AGRICULTURE_THROUGH_YOLO-BASED_VISION_SYSTEMS",
      type: "Oral Presentation",
      abstract: "This study develops a real-time vision system for automated classification of jasmine buds using YOLO-based deep learning models. Multiple YOLO variants (YOLOv5, YOLOv7, YOLOv8) were evaluated for detecting and classifying jasmine buds at different developmental stages. The best-performing architecture demonstrated high detection accuracy with real-time inference suitable for integration into automated grading lines.",
      tags: ["YOLO", "Jasmine", "Floriculture", "Object Detection", "Smart Agriculture"],
      coverImage: "images/covers/Conference Presentations - Deep Learning for Jasmine Bud Classification.png"
    }
  ],

  // ─── Reviewer Roles ──────────────────────────────────
  reviewerRoles: [
    {
      title: "Peer Reviewer",
      journal: "Journal of the Indian Society of Remote Sensing (Springer)",
      year: "2025",
      url: "https://orcid.org/0009-0003-8971-9221",
      description: "Contributing to quality assessment and advancement of remote sensing research publications.",
      abstract: "Recognised by Springer Nature with a reviewer certificate for reviewing 7 manuscripts in 2025 for the Journal of the Indian Society of Remote Sensing.",
      certificatePath: "certifications/Reviewer certificate/Spinger 2025 reviewer certificate_page_1.jpg"
    }
  ],

  // ─── Patents & Design Registrations ─────────────────
  patents: [
    {
      title: "Soil Organic Matter Monitoring Device",
      authors: "B. R. Iniyalakshimi, Avinash K, K. Chitra Devi, Bharathi M, <b>Kamalesh Kanna Shanmuganathan</b>, Sivakumar P, Avinash C",
      year: "2026",
      publisher: "Registered Design No. 491836-001 (Class 15-03), The Patent Office, Government of India · Registered 19 Feb 2026, certificate issued 27 May 2026",
      tags: ["Soil Organic Matter", "Sensor Device", "Design Registration"],
      certificatePath: "certifications/Patent/2026 SOIL ORGANIC MATTER MONITORING DEVICE.jpg"
    }
  ]
};
