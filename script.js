document.addEventListener("DOMContentLoaded", () => {
    addItem(); // Initial list setup
});

function addItem() {
    const container = document.getElementById("listContainer");
    const ul = document.createElement("ul");
    const li = createListItem("Sample Item");
    ul.appendChild(li);
    container.appendChild(ul);
}

function createListItem(text) {
    const li = document.createElement("li");
    li.textContent = text;
    li.addEventListener("click", (event) => handleListAction(event, li));
    return li;
}

function handleListAction(event, li) {
    event.stopPropagation();  // Prevent click event from bubbling to parent elements
    const action = document.querySelector("input[name='action']:checked").value;
    const inputText = document.getElementById("itemText").value;

    switch (action) {
        case "add":
            li.parentNode.appendChild(createListItem(inputText || "New Item"));
            break;
        case "insert":
            li.parentNode.insertBefore(createListItem(inputText || "Inserted Item"), li);
            break;
        case "edit":
            if (inputText) {
                li.textContent = inputText;
            } else {
                alert("Please enter some text to update.");
            }
            break;
        case "addSublist":
            if (!li.querySelector("ul")) {
                const subUl = document.createElement("ul");
                const subLi = createListItem(inputText || "Sub-item");
                subUl.appendChild(subLi);
                li.appendChild(subUl);
            } else {
                alert("This item already has a sublist.");
            }
            break;
        case "delete":
            if (li.parentNode) {
                li.parentNode.removeChild(li);
            }
            break;
    }
}
