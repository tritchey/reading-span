//Define Timeline
var timeline = []; 

//Function to give the option for a local save of the data
var localSave;

function saveData() {
	if(localSave == 1) {
		var identifier = 'RSPAN_'+Math.round(new Date().getTime()/1000)+'.csv';
		jsPsych.data.get().localSave('csv',identifier);
		alert("You may now close this tab.");
	} else {
		alert("You may now close this tab.");
		}
	};	

//Final screen
var save_data = {
	type: 'html-button-response',
	stimulus: '<p>Would you like to save the data?</p>',
	choices: ['No','Yes'],
	on_finish: function(data){
		localSave = jsPsych.data.get().last(1).values()[0].button_pressed;			
	}		
};

timeline.push(rspan_final);
timeline.push(save_data);
