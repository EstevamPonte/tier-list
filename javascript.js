let element;
let insertAtSection = true;

function drapStartHandler(e) {
    e.dataTransfer.dropEffect = "move";
    e.currentTarget.classList.add("animate-item");
    e.dataTransfer.setData("id", e.currentTarget.id);
    element = e.currentTarget;
}

function dropHandler(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("id");
    if (insertAtSection && data) {
        e.currentTarget.appendChild(document.getElementById(data));
    }
}

function dragOverHandler(e) {
    e.preventDefault();
    if (!insertAtSection) return;

    if (!e.currentTarget.classList.contains("tier-choices")) {
        e.dataTransfer.dropEffect = "move";
        e.currentTarget.classList.add("animate");
    }

    e.currentTarget.appendChild(element);
}

function dragLeaveHandler(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.currentTarget.classList.remove("animate");
}

function dragEndHandler(e) {
    e.preventDefault();
    const animatedContainer = document.querySelectorAll(".animate");
    e.currentTarget.classList.remove("animate-item");

    animatedContainer.forEach((element) => {
        element.classList.remove("animate");
    });
}

function dragOverItems(e) {
    e.preventDefault();
    insertAtSection = false;
    e.target.insertAdjacentElement("beforebegin", element);
}

function dragLeaveItems(e) {
    insertAtSection = true;
}

const tierItemContainer = document.querySelectorAll(
    ".tier-item__image, .tier-choices"
);

tierItemContainer.forEach((element) => {
    element.addEventListener("drop", dropHandler);
    element.addEventListener("dragover", dragOverHandler);
    element.addEventListener("dragleave", dragLeaveHandler);
});

const imageContainer = document.querySelectorAll(".tier-choices__item");
imageContainer.forEach((element) => {
    element.addEventListener("dragend", dragEndHandler);
    element.addEventListener("dragstart", drapStartHandler);
    element.addEventListener("dragover", dragOverItems);
    element.addEventListener("dragleave", dragLeaveItems);
});
