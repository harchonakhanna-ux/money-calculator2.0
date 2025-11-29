// Constants for calculations
var FOOD_COST_PER_DAY = 3.54; // cost of food per person per day
var VACCINE_COST = 31; // cost of one vaccination
var SCHOOL_COST = 300000; // cost to build one school
var HOSPITAL_COST = 2000000; // cost to build one hospital
var WELL_COST = 5000; // cost to build one well

// Function to format large numbers
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + ' billion';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + ' million';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + ' thousand';
    }
    return num.toString();
}

// Function to calculate and display results
function calculateAndDisplay() {
    var amount = parseFloat(document.getElementById('amount').value) || 0;
    
    // Calculations
    var peopleFed = Math.floor(amount / FOOD_COST_PER_DAY);
    var peopleVaccinated = Math.floor(amount / VACCINE_COST);
    var schoolsBuilt = Math.floor(amount / SCHOOL_COST);
    var hospitalsBuilt = Math.floor(amount / HOSPITAL_COST);
    var wellsBuilt = Math.floor(amount / WELL_COST);
    
    // Update DOM
    document.getElementById('people-fed').textContent = formatNumber(peopleFed);
    document.getElementById('people-vaccinated').textContent = formatNumber(peopleVaccinated);
    document.getElementById('schools-built').textContent = formatNumber(schoolsBuilt);
    document.getElementById('hospitals-built').textContent = formatNumber(hospitalsBuilt);
    document.getElementById('wells-built').textContent = formatNumber(wellsBuilt);
    
    // Visualization (food icons)
    updateFoodIcons(peopleFed);
}

// Function to update food icons
function updateFoodIcons(peopleFed) {
    var foodIconsContainer = document.getElementById('food-icons');
    foodIconsContainer.innerHTML = '';
    
    // Determine how many icons to display (max 100)
    var iconCount = Math.min(Math.floor(peopleFed / 1000000), 100);
    
    for (var i = 0; i < iconCount; i++) {
        var icon = document.createElement('div');
        icon.className = 'icon';
        icon.innerHTML = '🍽️';
        foodIconsContainer.appendChild(icon);
    }
    
    // If we can feed many people but aren't showing all icons
    if (peopleFed > 1000000 * 100) {
        var moreText = document.createElement('div');
        moreText.textContent = '... and ' + formatNumber(peopleFed - 1000000 * 100) + ' more people';
        moreText.style.marginTop = '10px';
        moreText.style.fontWeight = 'bold';
        foodIconsContainer.appendChild(moreText);
    }
}

// Initialization function
function init() {
    // Handler for input field
    document.getElementById('amount').addEventListener('input', calculateAndDisplay);
    
    // Handlers for buttons
    var presetButtons = document.querySelectorAll('.preset-btn');
    for (var i = 0; i < presetButtons.length; i++) {
        presetButtons[i].addEventListener('click', function() {
            var amount = this.getAttribute('data-amount');
            document.getElementById('amount').value = amount;
            calculateAndDisplay();
        });
    }
    
    // Initial calculation
    calculateAndDisplay();
}

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', init);
