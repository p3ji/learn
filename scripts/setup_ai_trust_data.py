import os
import json
import numpy as np
import pandas as pd

def generate_ai_trust_dataset(output_dir="data", n_samples=1200):
    """
    Generates a realistic survey dataset modeled after Kaggle's 'AI Trust Insights'.
    Includes demographics, attitudinal Likert scales, missing codes (-9), survey weights,
    and binary/continuous target variables for Supervised Learning & Google TabFM.
    """
    os.makedirs(output_dir, exist_ok=True)
    np.random.seed(42)

    # 1. Demographics
    respondent_ids = [f"RESP_{1000 + i}" for i in range(n_samples)]
    age_groups = np.random.choice(["18-29", "30-44", "45-59", "60+"], size=n_samples, p=[0.25, 0.35, 0.25, 0.15])
    education_levels = np.random.choice(["High School", "Bachelor's", "Master's", "PhD"], size=n_samples, p=[0.20, 0.50, 0.20, 0.10])
    employment_sectors = np.random.choice(["Tech/Engineering", "Healthcare", "Education", "Finance", "Public Sector", "Other"], size=n_samples, p=[0.20, 0.20, 0.20, 0.15, 0.15, 0.10])
    gender = np.random.choice(["Female", "Male", "Non-Binary/Other"], size=n_samples, p=[0.48, 0.48, 0.04])
    tech_familiarity = np.random.choice(["Novice", "Intermediate", "Advanced"], size=n_samples, p=[0.30, 0.50, 0.20])

    # 2. Likert Scales (1 to 5)
    perceived_risk = np.random.randint(1, 6, size=n_samples)
    perceived_benefit = np.random.randint(1, 6, size=n_samples)
    ethical_concern = np.random.randint(1, 6, size=n_samples)
    privacy_worry = np.random.randint(1, 6, size=n_samples)

    # 3. Sectoral Trust (1 to 10)
    trust_healthcare = np.clip(np.random.normal(6.5, 2.0, size=n_samples).astype(int), 1, 10)
    trust_workplace = np.clip(np.random.normal(5.5, 2.2, size=n_samples).astype(int), 1, 10)
    trust_financial = np.clip(np.random.normal(5.8, 2.1, size=n_samples).astype(int), 1, 10)

    # 4. Inject SAS/Stata style missing codes (-9) into 4% of responses
    for arr in [perceived_risk, perceived_benefit, trust_healthcare, trust_workplace]:
        mask = np.random.rand(n_samples) < 0.04
        arr[mask] = -9

    # 5. Calculate Synthetic Trust Score & High_AI_Trust target
    edu_score = np.where(education_levels == "PhD", 2.0, np.where(education_levels == "Master's", 1.2, np.where(education_levels == "Bachelor's", 0.5, 0.0)))
    tech_score = np.where(tech_familiarity == "Advanced", 1.8, np.where(tech_familiarity == "Intermediate", 0.8, 0.0))
    benefit_clean = np.where(perceived_benefit == -9, 3, perceived_benefit)
    risk_clean = np.where(perceived_risk == -9, 3, perceived_risk)

    latent_trust = 3.0 + edu_score + tech_score + (benefit_clean * 0.8) - (risk_clean * 0.7) + np.random.normal(0, 1.2, size=n_samples)
    trust_score_1_to_10 = np.clip(np.round(latent_trust, 1), 1.0, 10.0)
    high_ai_trust = np.where(trust_score_1_to_10 >= 6.0, 1, 0)

    # 6. Survey Weights
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

    csv_path = os.path.join(output_dir, "ai_trust_insights.csv")
    df.to_csv(csv_path, index=False)
    print(f"Dataset generated at {csv_path} with {len(df)} rows.")

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
            "Survey_Weight": "Probability sampling weight for SAS PROC SURVEYREG / Stata svy"
        }
    }

    codebook_path = os.path.join(output_dir, "ai_trust_codebook.json")
    with open(codebook_path, "w") as f:
        json.dump(codebook, f, indent=2)
    print(f"Codebook generated at {codebook_path}.")

if __name__ == "__main__":
    generate_ai_trust_dataset()
