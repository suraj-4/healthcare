
const apiUrl = "https://fedskillstest.coalitiontechnologies.workers.dev";
const username = "coalition"; 
const password = "skills-test"; 
const auth = btoa(`${username}:${password}`);


// Fetch data from the API
const getPatients = async () => {
    console.log("Getting patients....");
    const response = await fetch(apiUrl, {
        method: "GET", 
        headers: {
            "Authorization": `Basic ${auth}`, 
            "Content-Type": "application/json" 
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const patient = await response.json();

    // Patients List
    const patientListContainer = document.getElementById("patientsList_container");
    patientListContainer.innerHTML = '';
    patient.forEach(patientItem => {
        // console.log(patientItem);
        const htmlString = `<div class="list_item_wrapper">
                                <div class="list_item">
                                    <img src="${patientItem.profile_picture}" alt="profile-sm-img">
                                    <div class="list_item_content">
                                        <h6>${patientItem.name}</h6>
                                        <span>${patientItem.gender},</span>
                                        <span>${patientItem.age}</span>
                                    </div>
                                </div>
                                <img src="./assets/images/icon/horiz_three_dots_icon.svg" class="three_dots_icon" alt="profile-sm-img">
                            </div>`
        patientListContainer.innerHTML += htmlString;
    });

    console.log(patient[3]);

    // Select patient details id
    const patientImg = document.querySelector("#patient_img");
    const patientName = document.querySelector("#patient_name");
    const dob = document.querySelector("#dob");
    const gender = document.querySelector("#gender");
    const mob_no = document.querySelector("#mob_no");
    const eme_no = document.querySelector("#eme_no");
    const ins_type = document.querySelector("#ins_type");

    // Display patient details
    patientImg.src = patient[3].profile_picture;
    patientName.innerHTML = patient[3].name;
    dob.innerHTML = patient[3].date_of_birth;
    gender.innerHTML = patient[3].gender;
    mob_no.innerHTML = patient[3].phone_number;
    eme_no.innerHTML = patient[3].emergency_contact;
    ins_type.innerHTML = patient[3].insurance_type;


    // Diagnosis History
    // const diagnosisHistoryContainer = document.getElementById("diagnosis_history_container");
    const diagnosisHistory = patient[3].diagnosis_history;

    // console.log(diagnosisHistory);
    // console.log(diagnosisHistory[0]);

    const bpbiaValue = document.getElementById("bp_biastolic_val");
    const bpbiaLevel = document.getElementById("bp_biastolic_lev");
    bpbiaValue.innerHTML = diagnosisHistory[0].blood_pressure.diastolic.value;
    bpbiaLevel.innerHTML = diagnosisHistory[0].blood_pressure.diastolic.levels;

    const bpsysValue = document.getElementById("bp_systolic_val");
    const bpsysLevel = document.getElementById("bp_systolic_lev");
    bpsysValue.innerHTML = diagnosisHistory[0].blood_pressure.systolic.value;
    bpsysLevel.innerHTML = diagnosisHistory[0].blood_pressure.systolic.levels;

    const resRateValue = document.getElementById("res_rate_value");
    const resRateLevel = document.getElementById("res_rate_level");
    resRateValue.innerHTML = diagnosisHistory[0].respiratory_rate.value;
    resRateLevel.innerHTML = diagnosisHistory[0].respiratory_rate.levels;

    const tempValue = document.getElementById("temp_value");
    const tempLevel = document.getElementById("temp_level");
    tempValue.innerHTML = diagnosisHistory[0].temperature.value;
    tempLevel.innerHTML = diagnosisHistory[0].temperature.levels;

    const heartRateValue = document.getElementById("heart_rate_value");
    const heartRateLevel = document.getElementById("heart_rate_level");
    heartRateValue.innerHTML = diagnosisHistory[0].heart_rate.value;
    heartRateLevel.innerHTML = diagnosisHistory[0].heart_rate.levels;


    // Diagnostic List
    const diagnosticListContainer = document.getElementById("diagnostic_list_container");
    const diagnosticList = patient[3].diagnostic_list;

    diagnosticListContainer.innerHTML = '';
    diagnosticList.forEach(diagnosticItem => {
        // console.log(diagnosticItem);
        const htmlString = `<tr>
                                <td>${diagnosticItem.name}</td>
                                <td>${diagnosticItem.description}</td>
                                <td>${diagnosticItem.status}</td>
                            </tr>`
        diagnosticListContainer.innerHTML += htmlString;

    });

    // Lab Results
    const labRresultsContainer = document.getElementById("lab_results_container");
    const lab_results = patient[3].lab_results;

    labRresultsContainer.innerHTML = '';
    lab_results.forEach(lab_result => {
        const htmlString = `<div class="list_item_style_three">
                                <p class="lab_result">${lab_result}</p>
                                <a href="javaScipt:void(0)" download>
                                    <img src="./assets/images/icon/download_icon.svg" alt="download_icon">
                                </a>
                            </div>`
        labRresultsContainer.innerHTML += htmlString;
    });


    // Create a new Chart instance
    const ctx = document.getElementById('diagnosis_history');
    console.log(diagnosisHistory);

    let diagnosisHistoryChart = null;

    function createChart(ctx, systolicData, diastolicData) {
        // Destroy existing chart if it exists
        if (diagnosisHistoryChart) {
            diagnosisHistoryChart.destroy();
        }

        diagnosisHistoryChart = new Chart(ctx, {
            type: 'line',
            data: {
                // labels: labels,
                labels: ['oct, 2023', 'Nov, 2023', 'Dec, 2023', 'Jan, 2024', 'Feb, 2024', 'Mar, 2024'],
                datasets: [{
                label: 'Systolic',
                // data: [120,115,160,110,150,155],
                data: systolicData,
                tension: 0.5,
                borderColor: '#C26EB4',
                backgroundColor: '#C26EB4',
                hoverBackgroundColor: '#C26EB4'
                },{
                label: 'Diastolic',
                // data: [110,65,110,95,75,80],
                data: diastolicData,
                tension: 0.5,
                borderColor: '#7E6CAB',
                backgroundColor: '#7E6CAB',
                hoverBackgroundColor: '#7E6CAB'
                }]
            },
            options: {
                animations: {
                    radius: {
                        duration: 400,
                        easing: 'linear',
                        loop: (context) => context.active
                    }
                },
                    hoverRadius: 12,
                    hoverBackgroundColor: '#8C6FE6',
                    interaction: {
                        mode: 'nearest',
                        intersect: false,
                        axis: 'x'
                    },
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    enabled: false
                }
            }
        });
    }

    diagnosisHistory.forEach(diagnosisHist_result => {
        const systolicData = diagnosisHist_result.blood_pressure.systolic;
        const diastolicData = diagnosisHist_result.blood_pressure.diastolic; 

        // console.log(systolicData);
        // console.log(diastolicData);

        createChart(ctx, systolicData, diastolicData);

    });

};

getPatients();
