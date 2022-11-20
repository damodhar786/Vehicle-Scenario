//  Add Scenario 

$("#add").click(function(){

    $("#name-error").hide();
    $("#time-error").hide();

    let scenarioName = $("#scenario-name").val();
    let scenarioTime = $("#scenario-time").val();

    if (scenarioName == '' || scenarioName == null) {
          
        // $('.error').text("Please Enter the value");
        $("#name-error").show();
    }
    if(scenarioTime == '' || scenarioTime == null){
        // $('.error').text("Please Enter the value");
        $("#time-error").show();
    }

    if(scenarioName !== '' && scenarioTime !== ''){

        var localData = localStorage.getItem('scenario');

        if(localData !== null && localData !== '' && localData !== 'undefined')
        {
            var dataConvert = JSON.parse(localData);
            var scenario =
                {
                    "scenario_id": dataConvert.length + 1,
                    "scenario_name": scenarioName,
                    "scenario_time": scenarioTime
                };

            dataConvert.push(scenario);
            localStorage.setItem('scenario',JSON.stringify(dataConvert));

            alert("your scenario added");
                $("#scenario-name").val('');
                $("#scenario-time").val('');

            
        }else{

            var scenario = [
                {
                    "scenario_id": 1,
                    "scenario_name": scenarioName,
                    "scenario_time": scenarioTime
                }
            ];

            localStorage.setItem('scenario',JSON.stringify(scenario));
            alert("your scenario added");           

        }
    }
});

// Reset

$("#reset").click(function(){
    $("#scenario-name").val('');
    $("#scenario-time").val('');
});