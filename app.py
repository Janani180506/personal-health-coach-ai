from flask import Flask, render_template, request, jsonify, send_from_directory
from agent import HealthAgent
import os

# Initialize Flask with template and static folders set to current directory
app = Flask(__name__, template_folder='.', static_folder='.')

agent = HealthAgent()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/style.css')
def styles():
    return send_from_directory('.', 'style.css')

@app.route('/script.js')
def scripts():
    return send_from_directory('.', 'script.js')

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    medical_history = data.get('medical_history', '')
    wellness_data = data.get('wellness_data', '')
    
    # "Compress" the data
    compressed_profile = agent.compress_data(medical_history, wellness_data)
    
    # Get recommendations based on compressed profile
    recommendations = agent.get_recommendations(compressed_profile)
    
    return jsonify({
        'compressed_profile': compressed_profile,
        'recommendations': recommendations
    })

if __name__ == '__main__':
    app.run(debug=True)
