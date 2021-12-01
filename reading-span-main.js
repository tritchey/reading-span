//Define Timeline
var timeline = []; 

//Final screen
var rspan_thankyou = {
		type: "html-button-response",
		stimulus: "<p>Thank you for your responses.</br></br>This completes the reading and memory task.</p>",
		choices: ['CONTINUE'],
		button_html: '<button class="buttonStyle">%choice%</button>',
	}
timeline.push(rspan_final);
timeline.push(rspan_thankyou);

