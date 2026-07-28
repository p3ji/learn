import pandas as pd

def load_and_clean_data(raw_path, processed_path):
    """Loads raw data, cleans it, and saves to processed directory."""
    print(f"Loading raw data from: {raw_path}")
    df = pd.read_csv(raw_path)
    
    # Cleaning Step: Drop rows with missing values
    df_clean = df.dropna()
    
    print(f"Saving cleaned data to: {processed_path}")
    df_clean.to_csv(processed_path, index=False)
    
    return df_clean
