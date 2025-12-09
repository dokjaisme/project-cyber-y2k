document.addEventListener('DOMContentLoaded', () => {
    
    // 1. bagian booting
    const bootLogs = [
        "> INITIALIZING_KERNEL...",
        "> LOADING_DRIVERS: [OK]",
        "> MOUNTING_VOLUMES...",
        "> BYPASSING_SECURITY...",
        "> CONNECTING_TO_SERVER...",
        "> SYSTEM_READY...",
        "> WAITING_FOR_USER_INPUT_ " 
    ];

    let logIndex = 0;
    const logContainer = document.getElementById('boot-log-container');
    const bootScreen = document.getElementById('boot-screen');
    const statusBadge = document.getElementById('status-badge');
    let isSystemLoaded = false; 

    function typeBootLog() {
        if (logIndex < bootLogs.length) {
            const p = document.createElement('p');
            p.innerText = bootLogs[logIndex];
            p.style.margin = "5px 0";
            p.style.fontFamily = "Courier New";
            p.style.color = "#ccff00"; 
            
            if (logIndex === bootLogs.length - 1) {
                p.style.animation = "blink 1s infinite"; 
                p.innerText = "> CLICK_ANYWHERE_TO_START_ >>"; 
                p.style.color = "#ff00ff"; 
            }

            if (logContainer) logContainer.appendChild(p);
            logIndex++;
            setTimeout(typeBootLog, 400); 
        } else {
            console.log("Waiting for user click...");
            document.addEventListener('click', enterSystem);
            document.addEventListener('keydown', enterSystem); 
        }
    }

    function enterSystem() {
        if (isSystemLoaded) return;
        isSystemLoaded = true;

        document.removeEventListener('click', enterSystem);
        document.removeEventListener('keydown', enterSystem);

        if (bootScreen) {
            bootScreen.style.transition = "opacity 0.8s ease-in-out"; 
            bootScreen.style.opacity = "0";
            
            setTimeout(() => {
                bootScreen.style.display = "none";
                
                if(statusBadge) {
                    statusBadge.innerText = "STATUS: ONLINE";
                    statusBadge.style.background = "#ccff00"; 
                    statusBadge.style.color = "black";
                    statusBadge.style.boxShadow = "4px 4px 0 #ff00ff";
                }
                document.body.classList.add('system-online');
            }, 800);
        }
    }

    if (logContainer) typeBootLog();
    updateTime(); 

    // --- 3. CUSTOM POPUP CONTACT FORM (UPDATED!) ---
    const contactForm = document.getElementById('contactForm');
    const alertOverlay = document.getElementById('custom-alert-overlay');
    const alertMsg = document.getElementById('custom-alert-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const senderInput = contactForm.querySelector('input');
            const senderName = senderInput ? senderInput.value : "User";

            // Set pesan di Custom Alert
            if(alertMsg) {
                alertMsg.innerText = `DATA PACKET SENT!\n\nTo: Yuidust\nFrom: ${senderName}\nStatus: 200 OK (DELIVERED)`;
            }
            
            // Munculin Overlay
            if(alertOverlay) {
                alertOverlay.style.display = "flex";
            }
            
            contactForm.reset();
        });
    }

});

// Fungsi Tutup Custom Alert (Dipanggil tombol X dan OK)
function closeCustomAlert() {
    const alertOverlay = document.getElementById('custom-alert-overlay');
    if(alertOverlay) {
        alertOverlay.style.display = "none";
    }
}


// --- 4. TAB SWITCHER ---
function openTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const targetContent = document.getElementById('tab-' + tabName);
    if (targetContent) targetContent.classList.add('active');
    
    buttons.forEach(btn => {
        const onClickAttr = btn.getAttribute('onclick');
        if (onClickAttr && onClickAttr.includes(`'${tabName}'`)) {
            btn.classList.add('active');
        }
    });
}


// --- 5. MEDIA CONTROL ---
function toggleVideo() {
    alert("ACCESS DENIED: Please use the YouTube player controls directly.");
}


// --- 6. JAM DIGITAL ---
function updateTime() {
    const now = new Date();
    const timeString = String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0') + ":" + String(now.getSeconds()).padStart(2, '0');
    const clock = document.getElementById('clock-widget');
    if (clock) clock.innerText = timeString;
}
setInterval(updateTime, 1000);

// --- 7. CERTIFICATE VIEWER LOGIC ---
function openCert(title, imgSrc) {
    const overlay = document.getElementById('cert-overlay');
    const titleEl = document.getElementById('cert-title');
    const imgEl = document.getElementById('cert-img');

    if (overlay && titleEl && imgEl) {
        // Ganti judul jendela
        titleEl.innerText = "EVIDENCE: " + title;
        
        // Ganti gambarnya
        // Kalau gambarnya belum ada/error, dia bakal pake placeholder hitam
        imgEl.src = imgSrc;
        imgEl.onerror = function() {
            this.src = "https://via.placeholder.com/600x400/000000/ff00ff?text=IMAGE+NOT+FOUND";
        };

        // Munculin Overlay
        overlay.style.display = "flex";
    }
}

function closeCert() {
    const overlay = document.getElementById('cert-overlay');
    if (overlay) overlay.style.display = "none";
}