document.addEventListener("DOMContentLoaded", () => {
  const staffForm = document.getElementById("staffForm");
  const staffTableBody = document.querySelector("#staffTable tbody");

  // If we're on add-staff.html
  if (staffForm) {
    staffForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("staffName").value.trim();
      const position = document.getElementById("staffPosition").value.trim();
      const phone = document.getElementById("staffPhone").value.trim();

      if (!name || !position || !phone) {
        alert("Please fill all fields");
        return;
      }

      const staffList = JSON.parse(localStorage.getItem("staffList")) || [];
      staffList.push({ name, position, phone });
      localStorage.setItem("staffList", JSON.stringify(staffList));

      alert("Staff added successfully!");
      staffForm.reset();
    });
  }

  // If we're on staff-attendance.html
  if (staffTableBody) {
    const staffList = JSON.parse(localStorage.getItem("staffList")) || [];

    if (staffList.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="4">No staff found</td>`;
      staffTableBody.appendChild(tr);
    } else {
      staffList.forEach((staff, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${staff.name}</td>
          <td>${staff.position}</td>
          <td>${staff.phone}</td>
        `;
        staffTableBody.appendChild(tr);
      });
    }
  }
});
