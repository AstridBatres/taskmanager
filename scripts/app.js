const iconImportant = "Iimportant fas fa-star";
const iconNonImportant = "iImportant far fa-star";
var important = false;
var panelVisible = true;

function toggleImportance() {
  if (important) {
    //from imp to non imp
    $("#iImportant").removeClass(iconImportant).addClass(iconNonImportant);
    important = false;
  } else {
    //non imp to imp
    $("#iImportant").removeClass(iconNonImportant).addClass(iconImportant);
    important = true;
  }
}

function togglePanel() {
  if (panelVisible) {
    $("#form").hide();
    panelVisible = false;
  } else {
    $("#form").show();
    panelVisible = true;
  }
}

function saveTask() {
  let title = $("#txttitle").val();
  let description = $("#txtdescript").val();
  let important = $("#txtimportant").val();
  let dueDate = $("#txtdate").val();
  let location = $("#txtlocation").val();
  let invites = $("#txtinvites").val();
  let color = $("#selcolor").val();
  let frequency = $("#selfrequency").val();
  let status = $("#selstatus").val();

  console.log(
    important,
    title,
    description,
    dueDate,
    location,
    invites,
    color,
    frequency,
    status
  );

  let task = new Task(
    important,
    title,
    description,
    dueDate,
    location,
    invites,
    color,
    frequency,
    status
  );
  console.log(task);
  displayTask(task);
}

function getStatusText(status) {
  switch (status) {
    case "1":
      return "Pending";
    case "2":
      return "InProgress";
    case "3":
      return "Paused";
    case "4":
      return "Completed";
    case "5":
      return "Abandoned";

    default:
      return "Other";
  }
}

function getFrequencyText(val) {
  switch (val) {
    case "0":
      return "One Time";
    case "1":
      return "Daily";
    case "2":
      return "Weekly";
    default:
      return "";
  }
}

function displayTask(task) {
  let iconClass = iconImportant;
  if (task.important) {
    iconClass = iconImportant;
  }

  let syntax = `<div class="task-item" style="border: 1px solid ${
    task.color
  };"> <div class="icon">
  <i class="${iconClass}"></i>
  </div>
  <h5>${task.title}</h5>
  <p>${task.description}</p>
  </div>
  
  <div class="info-2">
    <label>${task.dueDate}</label>
    <label>${task.location}</label>
  </div>

  <div class="info-3">
  <label>${task.invites}</label>
  </div>

  <div class="info-4">
  <label>${getStatusText(task.status)}</label>
  <label>${getFrequencyText(task.frequency)}</label>
  </div>
  `;

  $("#tasks").append(syntax);
}

function init() {
  console.log("Task manager page");
  console.log();
  //assign events
  $("#iImportant").click(toggleImportance);
  $("#btnTogglePanel").click(togglePanel);
  $("#btnSave").click(saveTask);
}

window.onload = init;
