$(function () {});

var date = moment().format("MM Do, YYYY");

var current = moment().format("H A");

var schedule = [
  { time: "9:00 AM", event: "" },
  { time: "10:00 AM", event: "" },
  { time: "11:00 AM", event: "" },
  { time: "12:00 PM", event: "" },
  { time: "1:00 PM", event: "" },
  { time: "2:00 PM", event: "" },
  { time: "3:00 PM", event: "" },
  { time: "4:00 PM", event: "" },
  { time: "5:00 PM", event: "" },
];

var assignments = JSON.parse(localStorage.getItem("workDay"));
if (assignments) {
  schedule = assignments;
}

$("#presentDay").text(date);

schedule.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var blockColor = colorRow(timeLabel);
	var row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

	$(".container").append(row);
});

function colorRow(time) {
	var planNow = moment(current, "H A");
	var planEntry = moment(time, "H A");
	if (planNow.isBefore(planEntry) === true) {
		return "later";
	} else if (planNow.isAfter(planEntry) === true) {
		return "then";
	} else {
		return "now";
	}
}

$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	schedule[blockID].event = userEntry;

	localStorage.setItem("workDay", JSON.stringify(schedule));
});