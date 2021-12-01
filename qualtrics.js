Qualtrics.SurveyEngine.addOnload(function () {

	/*Place your JavaScript here to run when the page loads*/
	
	/* Change 1: Hiding the Next button */
	// Retrieve Qualtrics object and save in qthis
	var qthis = this;
	
	// Hide buttons
	qthis.hideNextButton();
	
	/* Change 2: Defining and load required resources */
	var task_github = "https://tritchey.github.io/reading-span/"; // https://<your-github-username>.github.io/<your-experiment-name>
	
	// requiredResources must include all the JS files that demo-simple-rt-task-transformed.html uses.
	var requiredResources = [
		"https://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js",
		task_github + "jspsych-6.0.2/jspsych.js",
		task_github + "jspsych-6.0.2/plugins/jspsych-audio-keyboard-response.js",
		task_github + "jspsych-6.0.2/plugins/jspsych-audio-button-response.js",
		task_github + "jspsych-6.0.2/plugins/jspsych-html-keyboard-response.js",
		task_github + "jspsych-6.0.2/plugins/jspsych-image-keyboard-response.js",
		task_github + "jspsych-6.0.2/plugins/jspsych-html-button-response.js",
		task_github + "jspsych-6.0.2/plugins/jspsych-fullscreen.js",
		task_github + "jspsych-6.0.2/plugins/jspsych-external-html.js",
		task_github + "jspsych-6.0.2/plugins/jspsych-survey-text.js",
		task_github + "jspsych-6.0.2/plugins/jspsych-survey-likert.js",
		task_github + "rspan.js",
		task_github + "reading-span-main.js"
	];
	
	function loadScript(idx) {
		console.log("Loading ", requiredResources[idx]);
		jQuery.getScript(requiredResources[idx], function () {
			if ((idx + 1) < requiredResources.length) {
				loadScript(idx + 1);
			} else {
				initExp();
			}
		});
	}

	if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
		loadScript(0);
	}
	
	/* Change 3: Appending the display_stage Div using jQuery */
	// jQuery is loaded in Qualtrics by default
	jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
	jQuery("<div id = 'display_stage'></div>").appendTo('body');


	/* Change 4: Wrapping jsPsych.init() in a function */
	function initExp() {
	
		jsPsych.init({
			timeline: timeline,
			display_element: 'display_stage',
	
			/* Change 5: Adding the clean up and continue functions.*/
			on_finish: function (data) {	
				var finalSentenceACC = Math.round(arrAvg(sentenceACC)*100); //sentence accuracy
				var sentenceCutoff = Math.round(arrAvg(calibRT));
				var summaryData = {
					designation: 'SUMMARY',
					RSPAN_TOTAL: RSPAN_TOTAL,
					RSPAN_ABS: RSPAN_ABS,
					SENT_ACC: finalSentenceACC,
					SENT_RT: sentenceCutoff
				};
				jsPsych.data.addDataToLastTrial(summaryData);
				Qualtrics.SurveyEngine.setEmbeddedData("RSPAN_ABS", RSPAN_ABS);

				// clear the stage
				jQuery('display_stage').remove();
				jQuery('display_stage_background').remove();

				// simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
				qthis.clickNextButton();
			}
		});
	}
});

Qualtrics.SurveyEngine.addOnReady(function () {
/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
/*Place your JavaScript here to run when the page is unloaded*/

});