import re

class HealthAgent:
    def __init__(self):
        pass

    def compress_data(self, medical_history, wellness_data):
        """
        Simulates 'compression' by extracting key structured insights 
        from unstructured text.
        """
        profile = {
            "conditions": [],
            "metrics": {},
            "risk_level": "Low"
        }

        # Simple keyword extraction for 'Medical History' (Compression simulation)
        history_lower = medical_history.lower()
        if "diabetes" in history_lower:
            profile["conditions"].append("Type 2 Diabetes")
        if "hypertension" in history_lower or "high blood pressure" in history_lower:
            profile["conditions"].append("Hypertension")
        if "asthma" in history_lower:
            profile["conditions"].append("Asthma")
        
        # Extract numbers from 'Wellness Data' (Compression simulation)
        # Looking for things like "2000 steps", "6 hours sleep"
        steps_match = re.search(r'(\d+)\s+steps', wellness_data.lower())
        sleep_match = re.search(r'(\d+)\s+hours?', wellness_data.lower())
        
        if steps_match:
            profile["metrics"]["Steps"] = int(steps_match.group(1))
        if sleep_match:
            profile["metrics"]["Sleep"] = int(sleep_match.group(1))
            
        # Determine basic risk level
        if len(profile["conditions"]) > 1 or profile["metrics"].get("Sleep", 8) < 5:
            profile["risk_level"] = "Moderate"
        if len(profile["conditions"]) > 2:
            profile["risk_level"] = "High"
            
        return profile

    def get_recommendations(self, compressed_profile):
        """
        Generates personalized recommendations based on the compressed profile.
        """
        recs = []
        
        conditions = compressed_profile["conditions"]
        metrics = compressed_profile["metrics"]
        
        # Condition-based recommendations
        if "Type 2 Diabetes" in conditions:
            recs.append("Monitor blood sugar levels daily. Limit refined carbs.")
        if "Hypertension" in conditions:
            recs.append("Reduce sodium intake. Try the DASH diet.")
        if "Asthma" in conditions:
            recs.append("Keep inhaler nearby during exercise. Monitor air quality.")
            
        # Metric-based recommendations
        steps = metrics.get("Steps", 10000)
        if steps < 5000:
            recs.append(f"Activity is low ({steps} steps). Aim for a 20-minute walk today.")
        elif steps > 10000:
            recs.append("Great job on activity! Maintain hydration.")
            
        sleep = metrics.get("Sleep", 7)
        if sleep < 6:
            recs.append("Sleep deprivation detected. Establish a cooling wind-down routine.")
            
        if not recs:
            recs.append("Maintenance: Continue with your balanced routine.")
            
        return recs
