const iconImportant = "Iimportant fas fa-star";
const iconNonImportant = "iImportant far fa-star";
var important = false;
var panelVisible = true;
var total = 0;

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
    $("#btnTogglePanel").text("<show");
    panelVisible = false;
  } else {
    $("#form").show();
    $("#btnTogglePanel").text(">hide");
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
  console.log(JSON.stringify(task));

  $.ajax({
    type: "post",
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function (res) {
      console.log("Task saved", res);
      displayTask(task);
      clearform();

      total += 1;
      $("#headCount").text("You have " + total + " tasks");
    },
    error: function (errorDetails) {
      console.error("Save failed", errorDetails);
    },
  });
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
  </div>
  `;

  $("#tasks").append(syntax);
}

function fetchTasks() {
  $.ajax({
    type: "get",
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    success: function (res) {
      console.log(res);
      let data = JSON.parse(res);
      console.log(data);

      total = 0;

      for (let i = 0; i < data.length; i++) {
        let task = data[i];

        if (task.name == "Astrid") {
          total += 1;
          displayTask(task);
        }
      }

      $("#Count").text("You have " + total + " tasks!");
    },

    error: function (err) {
      console.error("Error retrieving data", err);
    },
  });
}

function clearform() {
  $("txttitle").val("");
  $("txtdescript").val("");
  $("txtimportant").val("");
  $("txtdate").val("");
}

function clearAllTasks() {
  $.ajax({
    type: "delete",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Astrid",
    data: JSON.stringify(),
    success: function () {
      location.reload();
    },
    error: function (err) {
      console.log("Error clearing tasks", err);
    },
  });
}

function init() {
  console.log("Task manager page");
  console.log();
  //assign events
  $("#iImportant").click(toggleImportance);
  $("#btnTogglePanel").click(togglePanel);
  $("#btnSave").click(saveTask);
  $("#delbtn").click(clearAllTasks);
}

fetchTasks();

window.onload = init;
