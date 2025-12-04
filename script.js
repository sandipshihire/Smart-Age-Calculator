
window.onload = function() {
    let day = document.getElementById("day");
    let month = document.getElementById("month");
    let year = document.getElementById("year");

    for (let i = 1; i <= 31; i++) day.innerHTML += `<option value="${i}">${i}</option>`;

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    months.forEach((m,i)=> month.innerHTML += `<option value="${i+1}">${m}</option>`);

    let currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1900; y--) year.innerHTML += `<option value="${y}">${y}</option>`;
};

function calculateAge() {
    let d = day.value, m = month.value, y = year.value;
    if (!d || !m || !y) { alert("Select complete DOB"); return; }

    let dob = new Date(`${y}-${m}-${d}`);
    let now = new Date();

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    document.getElementById("result").innerHTML =
        `<b>Your Age</b><br><br>
        ${years} Years<br>
        ${months} Months<br>
        ${days} Days<br>
        ${hours} Hours<br>
        ${minutes} Minutes<br>
        ${seconds} Seconds`;

    setInterval(()=>calculateAge(),1000);
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Smart Age Calculator - Age Report", 10, 10);
  doc.text(document.getElementById("result").innerText, 10, 20);
  doc.save("Age_Report.pdf");
}

function shareWhatsApp() {
    let text = "Check your age instantly: " + window.location.href;
    window.open("https://wa.me/?text=" + encodeURIComponent(text));
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
}

document.getElementById("darkToggle").addEventListener("change", () => {
    document.body.classList.toggle("dark");
});
