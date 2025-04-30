document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const jobId = params.get("id");

    if (!jobId) {
        document.body.innerHTML = "<p>Invalid job ID.</p>";
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const job = await response.json();

        document.getElementById("job-title").innerText = job.title;
        document.getElementById("job-location").innerText = `📍 ${job.location}`;
        document.getElementById("job-brief").innerText = job.brief;

        populateList("job-responsibilities", job.responsibilities);
        populateList("job-qualifications", job.qualifications);
        populateList("job-skills", job.skills);

    } catch (error) {
        console.error("Error fetching job details:", error);
        document.body.innerHTML = "<p>Error loading job details.</p>";
    }
});

function populateList(elementId, items) {
    const list = document.getElementById(elementId);
    if (!items || items.length === 0) {
        list.innerHTML = "<li>Not specified</li>";
        return;
    }
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}

function goBack() {
    window.history.back();
}
