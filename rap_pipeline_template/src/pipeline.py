from pathlib import Path
from clean_data import load_and_clean_data
from run_model import run_regression
import os

# Define relative paths using pathlib so it works on ANY machine
PROJECT_ROOT = Path(__file__).resolve().parent.parent
RAW_DATA_PATH = PROJECT_ROOT / "data" / "raw" / "survey_july.csv"
PROCESSED_DATA_DIR = PROJECT_ROOT / "data" / "processed"
PROCESSED_DATA_PATH = PROCESSED_DATA_DIR / "survey_july_clean.csv"

def run_pipeline():
    print("🚀 Starting RAP Pipeline Execution...")
    
    # Ensure processed directory exists
    os.makedirs(PROCESSED_DATA_DIR, exist_ok=True)
    
    # Step 1: Clean Data
    load_and_clean_data(RAW_DATA_PATH, PROCESSED_DATA_PATH)
    
    # Step 2: Run Model
    run_regression(PROCESSED_DATA_PATH)
    
    print("✅ Pipeline Completed Successfully!")

if __name__ == "__main__":
    run_pipeline()
