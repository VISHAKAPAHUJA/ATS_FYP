document.addEventListener("DOMContentLoaded", async () => {
    const jobGrid = document.querySelector(".job-grid");

    try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const jobs = await response.json();

        if (!jobs || jobs.length === 0) {
            jobGrid.innerHTML = "<p>No jobs available at the moment.</p>";
            return;
        }

        jobGrid.innerHTML = ""; // Clear existing content

        jobs.forEach(job => {
            const jobCard = document.createElement("div");
            jobCard.classList.add("job-card");

            // Extract initials from job title (max 2 characters)
            let initials = job.title
                .split(" ")
                .map(word => word[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

            jobCard.innerHTML = `
                <div class="job-logo">${initials}</div>
                <h4>${job.title}</h4>
                <p>${job.location}</p>
                <p>${job.brief}</p>
                <button onclick="viewJobDetails('${job._id}')">Details</button>
            `;

            jobGrid.appendChild(jobCard);
        });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        jobGrid.innerHTML = "<p>Error loading jobs. Please try again later.</p>";
    }
});

// Function to redirect to job-details.html with job ID
function viewJobDetails(jobId) {
    window.location.href = `job-details.html?id=${jobId}`;
}
