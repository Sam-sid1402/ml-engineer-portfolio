export const SITE = {
  name: "Semyon Sidorov",
  title: "Aspiring Machine Learning Engineer",
  email: "semyon140203@icloud.com",
  github: "https://github.com/Sam-sid1402",
  linkedin: "https://www.linkedin.com/in/sam-sid1402/",
  location: "Available for Remote & Relocation",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export const SKILLS = [
  "Python",
  "scikit-learn",
  "FastAPI",
  "Pandas",
  "NumPy",
  "SQLite",
  "Docker",
  "XGBoost",
  "Feature Engineering",
  "Model Evaluation",
  "Data Pipelines",
] as const;

export const PROJECTS = [
  {
    id: "fraud-detection",
    title: "Real-Time Fraud Detection",
    slug: "fraud-detection",
    description:
      "End-to-end fraud detection system built from raw transaction data through production deployment. Includes feature engineering, XGBoost model training with Optuna hyperparameter optimization, 5-fold cross-validation, threshold tuning, and FastAPI-based inference services deployed with Docker.",
    highlights: [
      "Data preprocessing & feature engineering on transaction signals",
      "XGBoost training with cross-validation and ROC-AUC evaluation",
      "FastAPI batch inference service (POST /predict_batch)",
      "Docker containerization for reproducible deployment",
    ],
    metrics: [
      { label: "ROC-AUC", value: "0.997" },
      { label: "F1 Score", value: "0.861" },
      { label: "Deployment", value: "FastAPI + Docker" },
    ],
    tech: ["Python", "XGBoost", "FastAPI", "Pandas", "Docker", "scikit-learn"],
    github: "https://github.com/Sam-sid1402/Real-Time-Fraud-Detection",
    demoHref: "/demos/fraud-detection",
  },
  {
    id: "exoplanet",
    title: "Exoplanet Host Star Classification",
    slug: "exoplanet",
    description:
          "Binary classification system for identifying stars that are similar to known exoplanet-host stars using Gaia DR3 and NASA Exoplanet Archive data. Includes astrophysical feature engineering, XGBoost model training with cross-validation, model evaluation using ROC-AUC, F1 score, precision, and recall, and deployment through a FastAPI inference service for interactive predictions.",
    highlights: [
      "Gaia DR3 and NASA Exoplanet Archive data preprocessing",
      "Astrophysical feature engineering from stellar parameters",
      "XGBoost model training with cross-validation",
      "Evaluation with ROC-AUC, F1 score, precision, recall, and confusion matrix",
      "FastAPI inference API for interactive host-likeness predictions",
    ],
    metrics: [
      { label: "Accuracy", value: "0.991" },
      { label: "F1 Score", value: "0.912" },
      { label: "Features Used", value: "13" },
    ],
    tech: ["Python", "XGBoost","FastAPI", "scikit-learn", "Pandas", "Docker"],
    github: "https://github.com/Sam-sid1402/Exoplanets_Project",
    demoHref: "/demos/exoplanet",
  },
] as const;

export const FRAUD_ARCHITECTURE_STEPS = [
  {
    title: "Data Preprocessing",
    description: "Clean transaction records, handle missing values, process timestamps, and prepare categorical features for modeling.",
  },
  {
    title: "Feature Engineering",
    description: "Transaction velocity, customer spending behavior, amount ratios, time-based features, and geospatial distance calculations.",
  },
  {
    title: "Model Training",
    description: "XGBoost with Optuna hyperparameter optimization, class imbalance handling, and 5-fold cross-validation.",
  },
  {
    title: "FastAPI Serving",
    description: "Batch inference via POST /predict_batch, containerized with Docker",
  },
  {
    title: "Model Evaluation",
    description: "ROC-AUC, precision-recall curves, and business-aligned fraud metrics",
  },
] as const;
