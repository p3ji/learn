import pandas as pd
from pathlib import Path
import pytest

# Define dynamic relative path using pathlib
PROJECT_ROOT = Path(__file__).resolve().parent.parent
RAW_DATA_PATH = PROJECT_ROOT / "data" / "raw" / "survey_july.csv"

def test_survey_data_quality():
    """
    Automated data quality assertions.
    If this fails, the pipeline halts before modeling starts!
    """
    assert RAW_DATA_PATH.exists(), f"File not found: {RAW_DATA_PATH}"
    df = pd.read_csv(RAW_DATA_PATH)
    
    # Assertion 1: No missing respondent IDs
    assert df["respondent_id"].isnull().sum() == 0, "Error: Missing IDs found!"
    
    # Assertion 2: Age must be positive (THIS WILL FAIL INITIALLY!)
    assert (df["age"] > 0).all(), "Error: Negative or zero age detected in the dataset!"
    
    # Assertion 3: Likert scores strictly between 1 and 5
    assert df["ai_trust_score"].between(1, 5).all(), "Error: Invalid AI Trust Likert scores!"
    assert df["ai_risk_score"].between(1, 5).all(), "Error: Invalid AI Risk Likert scores!"
