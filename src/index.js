import axios from "axios";
const api = "https://disease.sh/v3/covid-19/countries";
const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");
const cases = document.querySelector(".cases");
const recovered = document.querySelector(".recovered");
const deaths = document.querySelector(".deaths");
const results = document.querySelector(".result-container");
results.style.display = "none";
loading.style.display = "none";
errors.textContent = "";
// grab the form
const form = document.querySelector(".form-data");
// grab the country name
const country = document.querySelector(".country-name");

// declare a method to search by country name
const searchForCountry = async countryName => {
    loading.style.display = "block";
    errors.textContent = "";
    try {
        const response = await axios.get(`${api}/${countryName}`);
        console.log(`Response :: ${response.data}`);
        loading.style.display = "none";
        cases.textContent = response.data.cases;
        recovered.textContent = response.data.recovered;
        deaths.textContent = response.data.deaths;
        results.style.display = "block";
    } catch (error) {
        loading.style.display = "none";
        results.style.display = "none";
        errors.textContent = "We have no data for the country you have requested.";
    }
};

// declare a function to handle form submission
const handleSubmit = async e => {
    e.preventDefault();
    searchForCountry(country.value);
    console.log(country.value);
};

form.addEventListener("submit", e => handleSubmit(e));