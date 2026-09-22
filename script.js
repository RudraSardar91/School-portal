// ==========================================
// FIREBASE CLOUD DATABASE SETUP (Rudra Admin)
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyCMkOWz5XfmhsHp48wOhvgj_0v0b700DG8",
    authDomain: "admin-portal-b7c76.firebaseapp.com",
    databaseURL: "https://admin-portal-b7c76-default-rtdb.firebaseio.com",
    projectId: "admin-portal-b7c76",
    storageBucket: "admin-portal-b7c76.firebasestorage.app",
    messagingSenderId: "23197614932",
    appId: "1:23197614932:web:bf531dbb7c51ae3281fec1"
};

// ফায়ারবেস ক্লাউড ইঞ্জিন চালু করা হলো
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
// ==========================================

// ১২৪০ জন ছাত্রছাত্রীর ডামি ডেটাবেস তৈরি করার লুপ
window.addEventListener('load', function() {
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
});

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
            
            renderChart(); // লগইন হওয়ার পর চার্ট রেন্ডার হবে
            
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


// ==========================================
// ১. ক্লাউডে নতুন স্টুডেন্ট সেভ করা (ফায়ারবেস রিয়েল-টাইম)
// ==========================================
function saveStudent() {
    let name = document.getElementById('studentName').value;
    let subject = document.getElementById('studentSubject').value;
    if (name.trim() === "") { alert("দয়া করে স্টুডেন্টের নাম লিখুন!"); return; }

    // ডেটা সরাসরি গুগলের সার্ভারে পাঠানো হচ্ছে
    let newStudentRef = database.ref('admissions_2026').push();
    newStudentRef.set({
        studentName: name,
        studentSubject: subject,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });

    document.getElementById('studentName').value = "";
    closeModal();
}

// ==========================================
// ২. ক্লাউড থেকে রিয়েল-টাইমে ডেটা পড়া (সব ফোনে সিঙ্ক হবে)
// ==========================================
function loadSavedStudents() {
    let table = document.getElementById('studentTableBody');
    if(!table) return;

    // ক্লাউড ডেটাবেসে পরিবর্তন হলেই এই ফাংশন নিজে থেকে চলবে
    database.ref('admissions_2026').on('value', function(snapshot) {
        
        // ডিফল্ট দুটো ডামি স্টুডেন্ট যাতে ডিলিট না হয়ে যায়
        let defaultRows = `
            <tr><td>#ST-2026-01</td><td>অয়ন মুখার্জী</td><td>একাদশ (বিজ্ঞান)</td><td><button class="btn-delete" onclick="deleteStudent('default1')"><i class="fa-solid fa-trash"></i></button></td></tr>
            <tr><td>#ST-2026-02</td><td>শ্রেয়া দাস</td><td>একাদশ (কলা)</td><td><button class="btn-delete" onclick="deleteStudent('default2')"><i class="fa-solid fa-trash"></i></button></td></tr>
        `;
        table.innerHTML = defaultRows;
        
        let data = snapshot.val();
        if(data) {
            let studentsArray = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            
            // নতুন অ্যাড করা স্টুডেন্টগুলো ওপরের দিকে দেখানোর জন্য
            studentsArray.reverse().forEach(function(student) {
                let newRow = table.insertRow(0);
                // এখান থেকে নীল রঙের স্টাইলটা সরিয়ে দেওয়া হয়েছে, এখন সব সাধারণ কালারে আসবে
                newRow.innerHTML = `<td>#ST-2026-NEW</td><td>${student.studentName}</td><td>${student.studentSubject}</td><td><button class="btn-delete" onclick="deleteStudent('${student.id}')"><i class="fa-solid fa-trash"></i></button></td>`;
            });
        }
    });
}
// পেজ লোড হলেই ক্লাউড ডেটাবেস চেক করবে
window.addEventListener('load', loadSavedStudents);

// ==========================================
// ৩. ক্লাউড থেকে ডেটা ডিলিট করা
// ==========================================
function deleteStudent(id) {
    if (confirm("আপনি কি সত্যিই এই ডেটা ডিলিট করতে চান? (সব ডিভাইস থেকে মুছে যাবে)")) {
        if(id === 'default1' || id === 'default2') {
            alert("এই ডিফল্ট ডেটা ডিলিট করা যাবে না। নতুন অ্যাড করা ডেটা ডিলিট করে দেখুন।");
            return;
        }
        // ফায়ারবেস থেকে ডেটা মুছে ফেলা হচ্ছে
        database.ref('admissions_2026/' + id).remove();
    }
}


// ==========================================
// মারাত্মক এডভান্স ডুয়েল-কোর ইঞ্জিন (ভয়েস এআই সহ)
// ==========================================
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

// লাইভ ডেটা চার্ট রেন্ডারিং (১২ মাস)
function renderChart() {
    const canvas = document.getElementById('feesChart');
    if(!canvas) return;
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে'],
            datasets: [{
                label: 'কালেকশন (৳)',
                data: [15000, 22000, 18000, 25400, 21000, 28000, 19500, 23000, 27000, 20000, 24500, 30000],
                backgroundColor: '#3b82f6',
                borderRadius: 6,
                hoverBackgroundColor: '#2563eb'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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