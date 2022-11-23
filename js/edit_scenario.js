// Edit Scenario

function editScenario(scenario_event){
    var scenarioLocalData = localStorage.getItem('scenario');
    scenarioLocalData = JSON.parse(scenarioLocalData);

    $.each(scenarioLocalData, function(index,value){
        if(value.scenario_id == scenario_event){
           alert("entered the edit");


           
        }
    });

}