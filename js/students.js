const studentsTableBody = document.getElementById("studentsTableBody");


function formatDate(dateString) {
    const parts = dateString.split("-");

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return day + "." + month + "." + year;
}


async function loadStudents() {
    try {
        const students = await getAllStudents();

        studentsTableBody.textContent = "";

        students.forEach(function (student) {
            const row = document.createElement("tr");


            const fullNameCell = document.createElement("td");
            fullNameCell.textContent = student.fullName;


            const groupCell = document.createElement("td");
            groupCell.textContent = student.group;


            const isuIdCell = document.createElement("td");
            isuIdCell.textContent = student.isuId;


            const dormitoryCell = document.createElement("td");
            dormitoryCell.textContent = student.dormitoryNumber;


            const roomCell = document.createElement("td");
            roomCell.textContent = student.roomNumber;


            const moveInDateCell = document.createElement("td");
            moveInDateCell.textContent = formatDate(student.moveInDate);

            const actionsCell = document.createElement("td");

            const actions = document.createElement("div");
            actions.classList.add("actions");


            const detailsButton = document.createElement("button");
            detailsButton.textContent = "Подробнее";

            detailsButton.addEventListener("click", function () {
                window.location.href = "student-details.html?id=" + student.id;
            });


            const editButton = document.createElement("button");
            editButton.textContent = "Редактировать";

            editButton.addEventListener("click", function () {
                window.location.href = "student-form.html?id=" + student.id;
            });


            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Удалить";

            deleteButton.addEventListener("click", async function () {
                const shouldDelete = confirm("Удалить студента " + student.fullName + "?");

                if (!shouldDelete) {
                    return;
                }

                try {
                    await deleteStudent(student.id);

                    await loadStudents();
                } catch (error) {
                    console.error("Ошибка удаления студента:", error);
                }
            });

            actions.appendChild(detailsButton);
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);

            actionsCell.appendChild(actions);


            row.appendChild(fullNameCell);
            row.appendChild(groupCell);
            row.appendChild(isuIdCell);
            row.appendChild(dormitoryCell);
            row.appendChild(roomCell);
            row.appendChild(moveInDateCell);
            row.appendChild(actionsCell);


            studentsTableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Ошибка загрузки студентов:", error);
    }
}


loadStudents();