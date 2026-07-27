import os
import json
import numpy as np
import pandas as pd

def generate_gss_dataset(output_dir="data", n_samples=1200):
    """
    Generates General Social Survey (GSS) style dataset:
    Demographics, Income, Happiness, Institutional Trust, Political Views.
    """
    os.makedirs(output_dir, exist_ok=True)
    np.random.seed(101)

    respondent_ids = [f"GSS_{2000 + i}" for i in range(n_samples)]
    age_groups = np.random.choice(["18-29", "30-44", "45-59", "60+"], size=n_samples, p=[0.22, 0.33, 0.27, 0.18])
    degree = np.random.choice(["Lt High School", "High School", "Junior College", "Bachelor", "Graduate"], size=n_samples, p=[0.12, 0.48, 0.08, 0.20, 0.12])
    realinc_quartile = np.random.choice(["Q1 (Low)", "Q2 (Mid-Low)", "Q3 (Mid-High)", "Q4 (High)"], size=n_samples)
    polviews = np.random.choice(["Extremely Liberal", "Liberal", "Moderate", "Conservative", "Extremely Conservative"], size=n_samples, p=[0.10, 0.25, 0.35, 0.22, 0.08])

    # Likert Scales & Scores
    happy = np.random.choice(["Pretty Happy", "Very Happy", "Not Too Happy"], size=n_samples, p=[0.55, 0.30, 0.15])
    trust_govt = np.random.randint(1, 6, size=n_samples) # 1-5
    trust_press = np.random.randint(1, 6, size=n_samples)
    trust_science = np.random.randint(1, 6, size=n_samples)

    # Missing values code (-9)
    for arr in [trust_govt, trust_press, trust_science]:
        mask = np.random.rand(n_samples) < 0.05
        arr[mask] = -9

    # Binary Target: High Overall Institutional Confidence
    science_clean = np.where(trust_science == -9, 3, trust_science)
    govt_clean = np.where(trust_govt == -9, 3, trust_govt)
    high_institutional_trust = np.where((science_clean + govt_clean) >= 7, 1, 0)
    survey_weight = np.round(np.random.uniform(0.5, 1.6, size=n_samples), 4)

    df = pd.DataFrame({
        "Respondent_ID": respondent_ids,
        "Age_Group": age_groups,
        "Education_Degree": degree,
        "Income_Quartile": realinc_quartile,
        "Political_Views": polviews,
        "General_Happiness": happy,
        "Trust_Government": trust_govt,
        "Trust_Press": trust_press,
        "Trust_Science": trust_science,
        "High_Institutional_Trust": high_institutional_trust,
        "Survey_Weight": survey_weight
    })

    df.to_csv(os.path.join(output_dir, "gss_survey_data.csv"), index=False)

    codebook = {
        "dataset_name": "General Social Survey (GSS Benchmark)",
        "number_of_respondents": n_samples,
        "missing_value_code": -9,
        "target_variable": "High_Institutional_Trust (Binary 1/0)",
        "features": {
            "Age_Group": "Demographic age brackets",
            "Education_Degree": "Highest degree attained",
            "Income_Quartile": "Family income quartile",
            "Political_Views": "5-point ideological self-identification",
            "General_Happiness": "Self-reported general happiness",
            "Trust_Government": "1-5 Likert scale (-9 = Missing)",
            "Trust_Press": "1-5 Likert scale (-9 = Missing)",
            "Trust_Science": "1-5 Likert scale (-9 = Missing)",
            "Survey_Weight": "GSS probability sampling weight"
        }
    }
    with open(os.path.join(output_dir, "gss_codebook.json"), "w") as f:
        json.dump(codebook, f, indent=2)


def generate_ai_trust_dataset(output_dir="data", n_samples=1200):
    """
    Generates Kaggle AI Trust Insights dataset.
    """
    os.makedirs(output_dir, exist_ok=True)
    np.random.seed(42)

    respondent_ids = [f"RESP_{1000 + i}" for i in range(n_samples)]
    age_groups = np.random.choice(["18-29", "30-44", "45-59", "60+"], size=n_samples, p=[0.25, 0.35, 0.25, 0.15])
    education_levels = np.random.choice(["High School", "Bachelor's", "Master's", "PhD"], size=n_samples, p=[0.20, 0.50, 0.20, 0.10])
    employment_sectors = np.random.choice(["Tech/Engineering", "Healthcare", "Education", "Finance", "Public Sector", "Other"], size=n_samples, p=[0.20, 0.20, 0.20, 0.15, 0.15, 0.10])
    gender = np.random.choice(["Female", "Male", "Non-Binary/Other"], size=n_samples, p=[0.48, 0.48, 0.04])
    tech_familiarity = np.random.choice(["Novice", "Intermediate", "Advanced"], size=n_samples, p=[0.30, 0.50, 0.20])

    perceived_risk = np.random.randint(1, 6, size=n_samples)
    perceived_benefit = np.random.randint(1, 6, size=n_samples)
    ethical_concern = np.random.randint(1, 6, size=n_samples)
    privacy_worry = np.random.randint(1, 6, size=n_samples)

    trust_healthcare = np.clip(np.random.normal(6.5, 2.0, size=n_samples).astype(int), 1, 10)
    trust_workplace = np.clip(np.random.normal(5.5, 2.2, size=n_samples).astype(int), 1, 10)
    trust_financial = np.clip(np.random.normal(5.8, 2.1, size=n_samples).astype(int), 1, 10)

    for arr in [perceived_risk, perceived_benefit, trust_healthcare, trust_workplace]:
        mask = np.random.rand(n_samples) < 0.04
        arr[mask] = -9

    edu_score = np.where(education_levels == "PhD", 2.0, np.where(education_levels == "Master's", 1.2, np.where(education_levels == "Bachelor's", 0.5, 0.0)))
    tech_score = np.where(tech_familiarity == "Advanced", 1.8, np.where(tech_familiarity == "Intermediate", 0.8, 0.0))
    benefit_clean = np.where(perceived_benefit == -9, 3, perceived_benefit)
    risk_clean = np.where(perceived_risk == -9, 3, perceived_risk)

    latent_trust = 3.0 + edu_score + tech_score + (benefit_clean * 0.8) - (risk_clean * 0.7) + np.random.normal(0, 1.2, size=n_samples)
    trust_score_1_to_10 = np.clip(np.round(latent_trust, 1), 1.0, 10.0)
    high_ai_trust = np.where(trust_score_1_to_10 >= 6.0, 1, 0)
    survey_weight = np.round(np.random.uniform(0.6, 1.5, size=n_samples), 4)

    df = pd.DataFrame({
        "Respondent_ID": respondent_ids,
        "Age_Group": age_groups,
        "Education_Level": education_levels,
        "Employment_Sector": employment_sectors,
        "Gender": gender,
        "Tech_Familiarity": tech_familiarity,
        "Perceived_AI_Risk": perceived_risk,
        "Perceived_AI_Benefit": perceived_benefit,
        "Ethical_Concern_Level": ethical_concern,
        "Privacy_Worry": privacy_worry,
        "Trust_Healthcare_AI": trust_healthcare,
        "Trust_Workplace_AI": trust_workplace,
        "Trust_Financial_AI": trust_financial,
        "Trust_Score_1_to_10": trust_score_1_to_10,
        "High_AI_Trust": high_ai_trust,
        "Survey_Weight": survey_weight
    })

    df.to_csv(os.path.join(output_dir, "ai_trust_insights.csv"), index=False)

    codebook = {
        "dataset_name": "Kaggle AI Trust Insights (Sociological Survey)",
        "number_of_respondents": n_samples,
        "missing_value_code": -9,
        "target_variables": {
            "High_AI_Trust": "Binary classification target (1 = High Trust >= 6.0, 0 = Low/Skeptical Trust)",
            "Trust_Score_1_to_10": "Continuous composite trust score from 1.0 to 10.0"
        },
        "features": {
            "Age_Group": "Categorical: 18-29, 30-44, 45-59, 60+",
            "Education_Level": "Categorical: High School, Bachelor's, Master's, PhD",
            "Employment_Sector": "Categorical: Tech/Engineering, Healthcare, Education, Finance, Public Sector, Other",
            "Gender": "Categorical: Female, Male, Non-Binary/Other",
            "Tech_Familiarity": "Ordinal: Novice, Intermediate, Advanced",
            "Perceived_AI_Risk": "Likert Scale 1-5 (1=Very Low, 5=Very High, -9=Missing/Refused)",
            "Perceived_AI_Benefit": "Likert Scale 1-5 (1=Very Low, 5=Very High, -9=Missing/Refused)",
            "Ethical_Concern_Level": "Likert Scale 1-5 (1=Not Concerned, 5=Extremely Concerned)",
            "Privacy_Worry": "Likert Scale 1-5 (1=Unconcerned, 5=High Worry)",
            "Trust_Healthcare_AI": "Score 1-10 (-9=Missing)",
            "Trust_Workplace_AI": "Score 1-10 (-9=Missing)",
            "Trust_Financial_AI": "Score 1-10",
            "Survey_Weight": "Probability sampling weight"
        }
    }
    with open(os.path.join(output_dir, "ai_trust_codebook.json"), "w") as f:
        json.dump(codebook, f, indent=2)

if __name__ == "__main__":
    generate_gss_dataset()
    generate_ai_trust_dataset()
    print("Successfully generated both GSS and AI Trust datasets in data/ directory!")
