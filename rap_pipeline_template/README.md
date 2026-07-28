# RAP Pipeline Template

This folder contains a fully functioning, executable example of a Reproducible Analytical Pipeline (RAP). It perfectly mirrors the "Monthly Survey Report" scenario described in the RAP Studio module.

## The Friction Point (Why RAP matters)
Inside `data/raw/survey_july.csv`, we have deliberately added a row of "bad data" (a survey respondent with an age of -5). 

If you were running this the **Legacy Way** (just running a loose python or SAS script), the script would execute perfectly, and the regression model would silently include that bad data in the final report.

## The RAP Solution
By running tests *before* the pipeline executes, we guarantee our output is untainted.

### How to Run This Example

1. **Install Dependencies:**
   Make sure you have `pytest`, `pandas`, and `statsmodels` installed (as defined in `pyproject.toml`).

2. **Run the Defensive Tests (It will fail!):**
   ```bash
   python -m pytest tests/
   ```
   *Notice how the test immediately catches the negative age and halts!*

3. **Fix the Data:**
   Open `data/raw/survey_july.csv` and change the `-5` age to `55`.

4. **Run the Tests Again (It will pass!):**
   ```bash
   python -m pytest tests/
   ```

5. **Run the Pipeline:**
   Now that you know the data is safe, execute the orchestrator script from the `src/` directory. Note how we don't have to specify any C: drives; `pathlib` handles the routing automatically!
   ```bash
   python src/pipeline.py
   ```
   *This will load the data, clean it, save a processed version to `data/processed/`, and print out the regression model results.*
