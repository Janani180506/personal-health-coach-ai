document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const medicalHistoryInput = document.getElementById('medicalHistory');
    const wellnessDataInput = document.getElementById('wellnessData');

    const initialState = document.getElementById('initialState');
    const loadingState = document.getElementById('loadingState');
    const resultsState = document.getElementById('resultsState');

    const conditionsTags = document.getElementById('conditionsTags');
    const metricsGrid = document.getElementById('metricsGrid');
    const riskLevel = document.getElementById('riskLevel');
    const recommendationsList = document.getElementById('recommendationsList');

    analyzeBtn.addEventListener('click', async () => {
        const medicalHistory = medicalHistoryInput.value;
        const wellnessData = wellnessDataInput.value;

        if (!medicalHistory && !wellnessData) {
            alert('Please enter some health data.');
            return;
        }

        // Show loading state
        initialState.classList.add('hidden');
        resultsState.classList.add('hidden');
        loadingState.classList.remove('hidden');

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    medical_history: medicalHistory,
                    wellness_data: wellnessData
                })
            });

            const data = await response.json();

            // Artificial delay to show the loading animation (for effect)
            setTimeout(() => {
                displayResults(data);
            }, 800);

        } catch (error) {
            console.error('Error:', error);
            loadingState.classList.add('hidden');
            initialState.classList.remove('hidden');
            alert('An error occurred while analyzing the data.');
        }
    });

    function displayResults(data) {
        const profile = data.compressed_profile;
        const recs = data.recommendations;

        // Populate Conditions
        conditionsTags.innerHTML = '';
        if (profile.conditions.length > 0) {
            profile.conditions.forEach(condition => {
                const tag = document.createElement('span');
                tag.className = 'px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-semibold';
                tag.textContent = condition;
                conditionsTags.appendChild(tag);
            });
        } else {
            conditionsTags.innerHTML = '<span class="text-gray-400 text-xs italic">No specific conditions detected</span>';
        }

        // Populate Metrics
        metricsGrid.innerHTML = '';
        for (const [key, value] of Object.entries(profile.metrics)) {
            const div = document.createElement('div');
            div.className = 'flex flex-col';
            div.innerHTML = `
                <span class="text-xs text-gray-500">${key}</span>
                <span class="font-medium text-gray-800">${value}</span>
            `;
            metricsGrid.appendChild(div);
        }
        if (Object.keys(profile.metrics).length === 0) {
            metricsGrid.innerHTML = '<span class="col-span-2 text-gray-400 text-xs italic">No numeric metrics found</span>';
        }

        // Risk Level
        riskLevel.textContent = profile.risk_level;
        riskLevel.className = 'text-xs font-bold px-2 py-1 rounded';
        if (profile.risk_level === 'Low') {
            riskLevel.classList.add('bg-green-100', 'text-green-700');
        } else if (profile.risk_level === 'Moderate') {
            riskLevel.classList.add('bg-yellow-100', 'text-yellow-700');
        } else {
            riskLevel.classList.add('bg-red-100', 'text-red-700');
        }

        // Recommendations
        recommendationsList.innerHTML = '';
        recs.forEach(rec => {
            const li = document.createElement('li');
            li.className = 'flex items-start gap-2';
            li.innerHTML = `
                <svg class="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span>${rec}</span>
            `;
            recommendationsList.appendChild(li);
        });

        loadingState.classList.add('hidden');
        resultsState.classList.remove('hidden');
    }
});
