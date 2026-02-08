// Academic Contributions Data Structure
// Easy to update - just add new entries to the appropriate category

const academicContributions = {
  researchArticles: [
    {
      title: "Assessment of Land Use and Land Cover Mapping Using Object-Based Classification Techniques for the Eastern Districts of Tamil Nadu",
      authors: "Karthikkumar A, R Kumaraperumal, S Pazhanivelan, D Muthumanickam, K P Ragunath, S Selvakumar, <b> Kamalesh Kanna Shanmuganathan </b>",
      authorsUrl: "https://www.researchgate.net/profile/Kamalesh-Kanna-Shanmuganathan",
      url: "https://doi.org/10.14719/pst.6260",
      year: "2025",
      journal: "Plant Science Today 12 (2)",
      doi: "10.14719/pst.6260",
      abstract: "LULC (Land use and land cover) mapping is crucial for understanding environmental monitoring, supporting sustainable development, and managing natural resources. This study evaluated the accuracy of object-based LULC classification using Sentinel-2 data and machine learning classifiers in the Ariyalur, Perambalur, and Mayiladuthurai districts of Tamil Nadu during the kharif season of 2023. OBIA (Object-based image analysis) clusters pixels based on their spectral and spatial characteristics, utilizing segmentation to generate masks that effectively represent the image content. The OBIA methodology involves multiresolution segmentation using eCognition software to delineate homogeneous image objects based on spectral, spatial, and contextual characteristics. Several widely used machine learning algorithms, including Random forest (RF), Support vector machine (SVM), Decision Tree (DT), Naive bayes (NB) and k-nearest Neighbor (k-NN), were evaluated to improve classification accuracy. The classification results varied across the districts, with the RF algorithm consistently demonstrating high performance. The Perambalur and Mayiladuthurai RF achieved an overall accuracy of 88 %, with a kappa coefficient of 0.76 and 83 % and a kappa coefficient of 0.66. In Ariyalur, the DT model was used, with an accuracy of 85 % and a kappa coefficient of 0.70. The NB and k-NN classifiers achieved lower accuracies in all districts. In contrast, the RF algorithm was the most reliable for LULC classification in these areas, highlighting its strength and efficiency in accurately identifying complex land cover patterns."
    },
    {
      title: "Data mining techniques for LULC analysis using sparse labels and multisource data integration for the hilly terrain of Nilgiris district, Tamil Nadu, India",
      authors: "Kumaraperumal, NivasRaj, Pazhanivelan, Jagadesh, Duraisamy, Muthumanickam, Jagadeeswaran, Karthikkumar,<b> Kamalesh Kanna S </b>",
      authorsUrl: "https://www.researchgate.net/profile/Kamalesh-Kanna-Shanmuganathan",
      url: "https://doi.org/10.1007/s12145-024-01586-y",
      year: "2024",
      journal: "Earth Science Informatics 18 (1): 1-16",
      doi: "10.1007/s12145-024-01586-y",
      abstract: "Accurate and quantitative assessment of Land Use and Land Cover (LULC) changes is crucial for understanding the spatial dynamics and environmental impacts within specific regions. In hilly terrains like the Nilgiris district in Tamil Nadu, India, these assessments are particularly challenging due to the complex topography and when classified using sparse ground truth labels. With numerous data mining algorithms being validated for several earth observation applications, demands are also increasing in selecting the best classifier algorithm for LULC mapping. Popularly implemented pixel-based data mining classifiers such as Random Forest (RF), Support Vector Machine (SVM), C5.0 Decision trees (C50), Naive Bayes (NB), Multinomial Logistic Regression (MLR), AdaBoost, Bagged CART, Nearest Shrunken Centroids (NSC), Genetic Algorithm based CART (Evetree), Neural Networks with PCA (NNPCA), k-Nearest Neighbours (k-NN), Multi-Layer Perceptron (MLP), and 1 Dimensional – Convoluted Neural Networks (1DCNN) were studied by integrating different auxiliary variables with sparse ground truth labels (391 Nos.). The accuracy of the predictions was then validated using Overall Accuracy (OA), Kappa, and disagreement measures based on the validation datasets. The most influential auxiliary variables contributing to the classification determined through PFI (Permutation Feature Importance) analysis, resulted with Digital Elevation Model (DEM) being the most influential auxiliary variable, among others. From the validation measures and the visual assessment facilitated for each algorithm, the effective performance in classification was depicted by Support Vector Machine - Linear Kernel (SVM - L) and followed by Random Forest (RF) algorithms with OA of 88%; 85% and Kappa of 0.84; 0.82, respectively. The algorithms also yielded the least disagreement measures for both algorithms. The findings of the research described the effective performance of the SVM and RF algorithms for classifying LULC at 10 m resolution through multisource data integration and under limited sampling and parameterization conditions. The statistical insights derived indicated a 4.3% decrease in the forest area with 7.2% increase in agricultural area in the last 2 years and 6.6% increase in the tea plantation area in the last 5 years."
    }
  ],

  reviewArticles: [
    {
      title: "YOLO deep learning algorithm for object detection in agriculture: a review",
      authors: "<b> Kamalesh Kanna Shanmuganathan </b>, Kumaraperumal Ramalingam, Sellaperumal Pazhanivelan, Ramasamy Jagadeeswaran, P. C. Prabu",
      authorsUrl: "https://www.researchgate.net/profile/Kamalesh-Kanna-Shanmuganathan",
      url: "https://doi.org/10.4081/jae.2024.1641",
      year: "2024",
      journal: "Journal of Agricultural Engineering 55 (4)",
      doi: "10.4081/jae.2024.1641",
      abstract: "YOLO represents the one-stage object detection also called regression-based object detection. Object in the given input is directly classified and located instead of using the candidate region. The accuracy from two-stage detection is higher than one-stage detection where one-stage object detection speed is higher than two-stage object detection. YOLO has become popular because of its Detection accuracy, good generalization, open-source, and speed. YOLO boasts exceptional speed due to its approach of using regression problems for frame detection, eliminating the need for a complex pipeline.  In agriculture, using remote sensing and drone technologies YOLO classifies and detects crops, diseases, and pests, and is also used for land use mapping, environmental monitoring, urban planning, and wildlife. Recent research highlights YOLO's impressive performance in various agricultural applications. For instance, YOLOv4 demonstrated high accuracy in counting and locating small objects in UAV-captured images of bean plants, achieving an AP of 84.8% and a recall of 89%. Similarly, YOLOv5 showed significant precision in identifying rice leaf diseases, with a precision rate of 90%. In this review, we discuss the basic principles behind YOLO, different versions of YOLO, limitations, and YOLO application in agriculture and farming."
    }
  ],

  books: [
    {
      title: "Soil Resource Characterization and Evaluation of the Coimbatore Forest Division",
      authors: "<b> Kamalesh Kanna Shanmuganathan </b>",
      authorsUrl: "https://www.researchgate.net/profile/Kamalesh-Kanna-Shanmuganathan",
      url: "#",
      year: "2025",
      publisher: "Tamil Nadu Agricultural University",
      isbn: "978-93-49673-48-9",
      abstract: "A comprehensive resource characterization and evaluation study of soil resources in the Coimbatore Forest Division, providing detailed insights into soil properties, classification, and management recommendations for sustainable forest management."
    }
  ],

  bookChapters: [
    {
      title: "Remote Sensing Applications in Sustainable Agriculture and Food Systems",
      authors: "Devasri Moovendran, Arunpandi Palpandi, <b> Kamalesh Kanna Shanmuganathan </b>, Vasanthakumar Muruganantham",
      authorsUrl: "https://www.researchgate.net/profile/Kamalesh-Kanna-Shanmuganathan",
      url: "#",
      year: "2025",
      bookTitle: "Advances in Sustainable Agriculture and Food Systems",
      publisher: "Academic Publisher",
      isbn: "978-93-342-0566-4",
      abstract: "Remote sensing is a transformative tool in sustainable agriculture, enabling precise monitoring and management of crops, soil, and water resources. By integrating Geographic Information Systems (GIS), the Internet of Things (IoT), and Artificial Intelligence (AI), remote sensing enhances precision farming, optimizes resource use, and improves food security. The evolution of remote sensing in agriculture has advanced from aerial photography to satellite-based monitoring. India’s space agency ISRO has contributed significantly through satellites like RISAT-1, Cartosat-1, and Resourcesat-2, aiding in crop identification, yield prediction, and climate variability assessment. Key techniques include optical, multispectral, hyperspectral, microwave, and thermal sensing, which help detect crop stress, monitor soil moisture, and map flood risks. Precision agriculture, supported by Digital Soil Mapping (DSM), allows site-specific crop management, reducing resource wastage and environmental impact. Remote sensing also plays a crucial role in drought and flood risk assessments, providing real-time rainfall, soil moisture, and vegetation monitoring. India’s Drought Early Warning System (DEWS) and satellite-based flood mapping have improved disaster preparedness and mitigation. Artificial Intelligence (AI) and machine learning further expand remote sensing capabilities, enabling automated disease detection, yield estimation, and climate monitoring. IoT-enabled sensor networks enhance real-time data collection for better farm management. Despite high costs and data limitations, policy initiatives like the National Action Plan on Climate Change (NAPCC) and the United Nations Sustainable Development Goals (SDGs) promote remote sensing for sustainable agriculture. In conclusion, remote sensing revolutionizes agriculture by fostering sustainability, improving climate resilience, and optimizing productivity. Future advancements in AI, hyperspectral imaging, and IoT driven remote sensing will further enhance agricultural efficiency and global food security."
    },
    {
      title: "Soil Moisture Evaluation by Artificial Intelligence and Computer Vision",
      authors: "Manimaran Gajendiran, Avinash Kanagaraj, Mageshen Vr, <b> Kamalesh Kanna Shanmuganathan </b>, Aswitha Kannan",
      authorsUrl: "https://www.researchgate.net/profile/Kamalesh-Kanna-Shanmuganathan",
      url: "https://doi.org/10.1201/9781003518778-16",
      year: "2025",
      bookTitle: "Artificial Intelligence and Computer Vision for Ecological Informatics",
      publisher: "CRC Press",
      doi: "10.1201/9781003518778-16",
      abstract: "Soil moisture evaluation plays a crucial role in agriculture, forestry, hydrology, and climate science, essential for sustainability. Recently, Artificial Intelligence (AI) and computer vision have reshaped ecological informatics, offering advanced tools for assessing soil moisture. This chapter explores AI and computer vision approaches applied to soil moisture evaluation, addressing the limitations of labour-intensive ground-based sensors and traditional gravimetric methods. By leveraging AI-driven machine learning and deep learning, along with computer vision techniques such as neural networks that process complex data patterns from remote sensing platforms like satellites and drones, it allows for scale-dependent soil moisture evaluation. The chapter also discusses practical applications across various fields, including precision agriculture, forestry management, and water resource management. Limitations such as ensuring data quality, addressing calibration issues, and navigating ethical concerns that could be overcome by integrating hybrid models will be discussed. Further advances in algorithms, better integration with IoT, and addressing current challenges promise to further revolutionize soil moisture evaluation, supporting broader ecological sustainability goals. By examining these cutting-edge approaches, this chapter aims to provide insights into the role of AI and computer vision in soil moisture evaluation."
    }
  ],

  conferencePapers: [
    {
      title: "Soil Order Classification Using Deep Learning Architecture and Multimodal Covariate Integration",
      authors: "N. R. Moorthi, K. Ramalingam, M. Dhanraju, J. Ramasamy, P. Prajesh, <b> Kamalesh Kanna Shanmuganathan </b>",
      authorsUrl: "https://www.researchgate.net/profile/Kamalesh-Kanna-Shanmuganathan",
      url: "https://doi.org/10.1109/InGARSS61818.2024.10984388",
      year: "2024",
      conference: "IEEE India Geoscience and Remote Sensing Symposium (InGARSS 2024)",
      location: "Goa, India",
      doi: "10.1109/InGARSS61818.2024.10984388",
      abstract: "Digital soil mapping (DSM) and its related studies are gaining momentum considering the need for an assorted database on soil resources required for several policy decisions. With numerous machine learning (ML) based algorithms being standardized for operational use, the inclusion of the deep learning architectures for DSM is still under the research phase. The study explores the utility of multiclass deep learning approach to characterize the soil order classes using multimodal covariate datasets. Six covariate information, including Mean annual air temperature, Elevation, Normalized Difference Vegetation Index (NDVI), Ferrous Minerals Difference Ratio (FMDR), VV, and VH representing the SCORPAN model, were downloaded and derived for the Madurai district, Tamil Nadu, India. Legacy soil order information of the study area was used as a labelled dataset to train the model using a standard U-Net deep learning architecture. Six soil order classes were found representing the study area, which was then classified besides other landform features with a mean IoU score of 0.62, obtained from evaluating the validation image patches.",
      presentationType: "Oral"
    },
    {
      title: "Deep Learning for Jasmine Bud Classification: Advancing Smart Agriculture Through Yolo-Based Vision Systems",
      authors: "<b> Kamalesh Kanna Shanmuganathan </b>, Keerthivasan M",
      authorsUrl: "https://www.researchgate.net/profile/Kamalesh-Kanna-Shanmuganathan",
      url: "#",
      year: "2025",
      conference: "Agricultural Graduate Student Conference",
      location: "Tamil Nadu Agricultural University",
      abstract: "This study develops a real-time vision system for automated classification of jasmine buds using YOLO-based deep learning models. The work addresses a major bottleneck in jasmine supply chains—manual bud sorting, which is slow, inconsistent, and highly dependent on skilled labor. The research evaluates multiple YOLO variants (YOLOv5, YOLOv7, and YOLOv8) for detecting and classifying jasmine buds at different developmental stages under variable field and packhouse lighting conditions. A curated dataset of jasmine bud images was annotated for size category, maturity stage, and quality grade. Models were trained and optimized using data augmentation, hyperparameter tuning, and lightweight architectures to enable deployment on edge devices. Performance was assessed using mean Average Precision (mAP), precision–recall metrics, inference latency, and robustness to occlusion and background noise. The best-performing YOLO architecture demonstrated high detection accuracy with real-time inference suitable for integration into automated grading lines, low-cost sorting devices, and mobile decision-support tools for farmers. The system has practical applications in floriculture supply chains, helping improve grading consistency, reduce postharvest losses, and support scalable precision agriculture solutions for jasmine growers.",
      presentationType: "Oral"
    }
  ],

  others: [
    {
      title: "Reviewer - Journal of the Indian Society of Remote Sensing",
      authors: "<b> Kamalesh Kanna Shanmuganathan </b>",
      authorsUrl: "https://www.researchgate.net/profile/Kamalesh-Kanna-Shanmuganathan",
      url: "https://orcid.org/0009-0003-8971-9221",
      year: "2024-Current",
      type: "Peer Reviewer",
      abstract: "Serving as a peer reviewer for the Journal of the Indian Society of Remote Sensing (Springer), contributing to the quality assessment and advancement of remote sensing research publications."
    }
  ]
};
