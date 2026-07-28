import pandas as pd
import statsmodels.formula.api as smf

def run_regression(processed_path):
    """Runs an OLS regression on the clean data."""
    print(f"Running model on: {processed_path}")
    df = pd.read_csv(processed_path)
    
    # Simple model: Does Trust and Age predict Risk perception?
    model = smf.ols('ai_risk_score ~ ai_trust_score + age', data=df)
    results = model.fit()
    
    print("\n--- Model Results ---")
    print(results.summary().tables[1])
    return results
