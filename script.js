// ১২৪০ জন ছাত্রছাত্রীর ডেটাবেস তৈরি করার লুপ (ইংরেজিতে)
window.onload = function() {
    const firstNamesM = ["অয়ন", "রাহুল", "সায়ন", "বিকাশ", "কৌশিক", "সুমন", "দেবরাজ", "রোহিত", "মনোজ", "আরিফ", "সৌরভ", "বিশাল", "অক্ষয়", "শুভম", "তনয়", "প্রতীক", "গৌরব", "রণিত", "বিক্রম", "ইমরান", "সুকান্ত", "দীপঙ্কর", "মন্টু", "সাগর", "অমিত", "সমীর", "অরিন্দম"];
    const firstNamesF = ["শ্রেয়া", "রিতিকা", "অদিতি", "সুস্মিতা", "নবনীতা", "পূজা", "অঞ্জলি", "সুনীতা", "রেশমি", "দিশা", "রিয়া", "নেহা", "ইশিতা", "বৃষ্টি", "সঞ্জনা", "পাপিয়া", "শ্রেয়সী", "জলি", "ফারহানা", "লিপি", "রীতা", "অনিমা", "প্রিয়া", "তানিয়া", "স্বাতী"];
    const lastNamesList = ["মুখার্জী", "দাস", "সেন", "বোস", "কর্মকার", "মিশ্র", "পাত্র", "রায়", "সাহা", "হালদার", "ঘোষ", "চক্রবর্তী", "মল্লিক", "পাসোয়ান", "বিশ্বাস", "বাউড়ি", "প্রামাণিক", "খাতুন", "সেখ", "সেনগুপ্ত", "পাল", "মন্ডল", "গুপ্তা", "শর্মা", "সিং", "গুহ", "মিত্র", "দে", "সরকার", "আলী", "সর্দার"];
    const sectionList = ["একাদশ (বিজ্ঞান)", "একাদশ (কলা)", "একাদশ (বাণিজ্য)", "দ্বাদশ (বিজ্ঞান)", "দ্বাদশ (কলা)", "দ্বাদশ (বাণিজ্য)"];

    let allStudentsHTML = '';
    for(let i=1; i<=1240; i++) {
        let isMale = Math.random() > 0.5;
        let fName = isMale ? firstNamesM[Math.floor(Math.random() * firstNamesM.length)] : firstNamesF[Math.floor(Math.random() * firstNamesF.length)];
        let lName = lastNamesList[Math.floor(Math.random() * lastNamesList.length)];
        let fullName = fName + " " + lName;
        let gender = isMale ? "ছেলে" : "মেয়ে";
        let age = Math.floor(Math.random() * 3) + 16; 
        let section = sectionList[Math.floor(Math.random() * sectionList.length)];
        let rollStr = i.toString().padStart(4, '0');
        let phone = "9" + Math.floor(Math.random() * 900000000 + 100000000); 

        allStudentsHTML += `<tr><td>#ST-2026-${rollStr}</td><td>${fullName}</td><td>${gender}</td><td>${age}</td><td>${section}</td><td>${phone}</td></tr>`;
    }
    
    let dbElement = document.getElementById('fullStudentDatabase');
    if (dbElement) {
        dbElement.innerHTML = allStudentsHTML;
    }
};

function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    filename = filename ? filename + '.xls' : 'excel_data.xls';
    downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], { type: dataType });
        navigator.msSaveOrOpenBlob( blob, filename);
    } else {
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        downloadLink.download = filename;
        downloadLink.click();
    }
}

function searchStudent() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let table = document.getElementById('fullStudentDatabase');
    let rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        let roll = rows[i].getElementsByTagName('td')[0].textContent.toLowerCase();
        let name = rows[i].getElementsByTagName('td')[1].textContent.toLowerCase();
        if (name.includes(input) || roll.includes(input)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

function startLogin() {
    let pass = document.getElementById("adminPassword").value;
    if (pass === "9163966795") {
        document.getElementById('loader').style.display = 'flex';
        
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('landing').classList.remove('active');
            document.getElementById('dashboard').classList.add('active');
            document.getElementById('adminPassword').value = "";
            
            setTimeout(() => { animateCounter('main-student', 1240, false); }, 100); 
            setTimeout(() => { animateCounter('attendance-counter', 92, true); }, 300);
            
            // লগইন হওয়ার পর চার্ট রেন্ডার হবে
            renderChart();
            
        }, 1500);
    } else {
        alert("ভুল এডমিন আইডি! দয়া করে সঠিক নম্বরটি দিন।");
    }
}

function logout() {
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('landing').classList.add('active');
    switchPanel('overviewPanel', 'menu-overview');
}

function switchPanel(panelId, menuId) {
    document.querySelectorAll('.panel-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
    
    document.getElementById(panelId).classList.add('active');
    document.getElementById(menuId).classList.add('active');
}

function changeTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
}

function openModal() { document.getElementById('studentModal').style.display = 'flex'; }
function closeModal() { document.getElementById('studentModal').style.display = 'none'; }

function saveStudent() {
    let name = document.getElementById('studentName').value;
    let subject = document.getElementById('studentSubject').value;
    if (name.trim() === "") { alert("দয়া করে স্টুডেন্টের নাম লিখুন!"); return; }

    let table = document.getElementById('studentTableBody');
    let newRow = table.insertRow(0);
    newRow.innerHTML = `<td>#ST-2026-NEW</td><td>${name}</td><td>${subject}</td><td><button class="btn-delete" onclick="deleteStudent(this)"><i class="fa-solid fa-trash"></i></button></td>`;

    let students = JSON.parse(localStorage.getItem("studentsDatabase")) || [];
    
    let newStudentData = {
        studentName: name,
        studentSubject: subject
    };
    
    students.unshift(newStudentData);
    localStorage.setItem("studentsDatabase", JSON.stringify(students));

    document.getElementById('studentName').value = "";
    closeModal();
}

function loadSavedStudents() {
    let students = JSON.parse(localStorage.getItem("studentsDatabase")) || [];
    let table = document.getElementById('studentTableBody');
    if(!table) return;
    
    students.slice().reverse().forEach(function(student) {
        let newRow = table.insertRow(0);
        newRow.innerHTML = `<td>#ST-2026-NEW</td><td>${student.studentName}</td><td>${student.studentSubject}</td><td><button class="btn-delete" onclick="deleteStudent(this)"><i class="fa-solid fa-trash"></i></button></td>`;
    });
}

window.addEventListener('load', loadSavedStudents);

function deleteStudent(button) {
    if (confirm("আপনি কি সত্যিই এই ডেটা ডিলিট করতে চান?")) {
        let row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}

// মারাত্মক এডভান্স ডুয়েল-কোর ইঞ্জিন (ভয়েস এআই সহ - ইংরেজি নম্বর)
let lastSpokenTime = ""; 

function startHUDClock() {
    function speakTime(text) {
        let speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'bn-IN'; 
        speech.rate = 0.9;
        window.speechSynthesis.speak(speech);
    }

    setInterval(() => {
        let ms = new Date().getMilliseconds();
        let msElement = document.getElementById('hud-msec');
        if(msElement) msElement.innerText = ms.toString().padStart(3, '0');
    }, 50);

    setInterval(() => {
        let now = new Date();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let ampm = h >= 12 ? 'PM' : 'AM';
        
        let hour12 = h % 12 || 12;

        let hrEl = document.getElementById('hud-hr');
        let minEl = document.getElementById('hud-min');
        let secEl = document.getElementById('hud-sec');
        let ampmEl = document.getElementById('hud-ampm');
        let fillEl = document.getElementById('hud-sec-fill');
        let dateEl = document.getElementById('hud-date');

        if(hrEl) hrEl.innerText = hour12.toString().padStart(2, '0');
        if(minEl) minEl.innerText = m.toString().padStart(2, '0');
        if(secEl) secEl.innerText = s.toString().padStart(2, '0');
        if(ampmEl) ampmEl.innerText = ampm;

        let secPercentage = (s / 59) * 100;
        if(fillEl) fillEl.style.width = secPercentage + '%';

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        if(dateEl) dateEl.innerText = now.toLocaleDateString('en-IN', options);

        let currentKey = h + ":" + m; 
        
        if ((m === 0 || m === 30) && lastSpokenTime !== currentKey) {
            let banglaTimes = {1: 'একটা', 2: 'দুটো', 3: 'তিনটে', 4: 'চারটে', 5: 'পাঁচটা', 6: 'ছটা', 7: 'সাতটা', 8: 'আটটা', 9: 'নটা', 10: 'দশটা', 11: 'এগারোটা', 12: 'বারোটা'};

            if (m === 0) {
                speakTime(`রুদ্র স্যার, এখন ঠিক ${banglaTimes[hour12]} বাজে।`);
            } else {
                let halfText = (hour12 === 1) ? "দেড়টা" : (hour12 === 2) ? "আড়াইটে" : `সাড়ে ${banglaTimes[hour12]}`;
                speakTime(`রুদ্র স্যার, এখন ${halfText} বাজে।`);
            }
            
            lastSpokenTime = currentKey; 
        }

    }, 1000);
}

window.addEventListener('load', startHUDClock);

function animateCounter(id, targetNum, isPercentage) {
    let currentNum = 0;
    let speed = targetNum > 100 ? 15 : 30; 
    let element = document.getElementById(id);
    if(!element) return;
    
    let timer = setInterval(function() {
        currentNum += (targetNum > 100 ? 15 : 1); 
        
        if(currentNum >= targetNum) {
            currentNum = targetNum;
            clearInterval(timer);
        }
        
        let formattedNum = currentNum.toString();
        
        if(targetNum === 1240 && currentNum >= 1000) {
            formattedNum = "1," + formattedNum.substring(1);
        }
        
        element.innerText = formattedNum + (isPercentage ? "%" : "");
    }, speed);
}

window.addEventListener('load', function() {
    setTimeout(function() {
        let preloader = document.getElementById('cyber-preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }, 2500); 
});

// লাইভ চার্ট তৈরি করার ফাংশন (১২ মাসের ডেটা সহ)
function renderChart() {
    const canvas = document.getElementById('feesChart');
    if(!canvas) return;
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            // ১২ মাসের নাম
            labels: ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে'],
            datasets: [{
                label: 'কালেকশন (৳)',
                // ১২ মাসের আলাদা আলাদা টাকার অঙ্ক
                data: [15000, 22000, 18000, 25400, 21000, 28000, 19500, 23000, 27000, 20000, 24500, 30000],
                backgroundColor: '#3b82f6',
                borderRadius: 6,
                hoverBackgroundColor: '#2563eb'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // এই লাইনটাই চার্টকে চিপটে ছোট রাখবে
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#94a3b8' },
                    grid: { color: 'rgba(148, 163, 184, 0.1)' }
                },
                x: {
                    ticks: { color: '#94a3b8', font: { weight: 'bold' } },
                    grid: { display: false }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}