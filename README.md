# Personal Health Coach AI Agent

## Description
This project introduces a **Health Memory Compression AI Agent** that converts long-term medical history and daily wellness data into compact, structured health summaries. This reduces information overload and provides instant, personalized recommendations with lower processing overhead.

## Features
-   **Data Compression**: Extracts key risk factors and metrics (e.g., steps, sleep hours) from unstructured text.
-   **Personalized Recommendations**: Generates actionable advice based on the compressed health profile.
-   **Privacy-First Design**: Processes data locally (simulated) for a secure experience.
-   **Sleek UI**: A clean, premium interface built with Tailwind CSS.

## Project Structure
-   `app.py`: Flask backend serving the app and API.
-   `agent.py`: Core logic for data parsing and recommendation engine.
-   `index.html`: Main user interface.
-   `style.css`: Custom styles and animations.
-   `script.js`: Client-side logic.

## Setup & Run
1.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

2.  **Run the Application**:
    ```bash
    python app.py
    ```

3.  **Access the App**:
    Open your browser and navigate to `http://127.0.0.1:5000`.

## Creative Feature
**Health Data Compression**: Instead of sending pages of medical history to a model every time, this agent "compresses" the history into a state vector (Risk Factors + Recent Metrics), drastically reducing the "context window" needed for continuous monitoring.
