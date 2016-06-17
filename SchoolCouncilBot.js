/** This is a sample code for your bot**/
	    function MessageHandler(context, event) {

	    	if(!context.simpledb.roomleveldata.level)
	    		context.simpledb.roomleveldata.level = 0;
	        
	        
	        if ((event.message.toLowerCase() == "hi" || event.message.toLowerCase() == "hey" || event.message.toLowerCase() == "hello") && context.simpledb.roomleveldata.level==0)
	            {
	            	context.sendResponse("Hi, are you a student or a teacher?");
	            	context.simpledb.roomleveldata.level=1;
	            	return;
	            } 
	             
	             
	        if(context.simpledb.roomleveldata.level == 1 && event.message.toLowerCase() == "teacher"){
	            context.sendResponse("Sorry, School Council only serves students...");
	            return;
	        } else if(context.simpledb.roomleveldata.level == 1 && event.message.toLowerCase() == "student") {
	            context.sendResponse("Hi friend! What's your name?");
	            return;
	        } 
	      	


	        if(context.simpledb.roomleveldata.level == 2){
	            context.simpledb.roomleveldata.level=3;
	            context.sendResponse("Hi, " + event.message);
	            context.sendResponse("What category do you want help on? Academic or Club?");
	            return;
	        }

	        if (context.simpledb.roomleveldata.level==3)
	        {
	        	if (event.message !== "")
	        	{
	        	context.simpledb.doPut("Category", event.message);
	           	context.sendResponse("Problem category has been recorded.");
	           	context.simpledb.roomleveldata.level=4;
	           }
	            else context.sendResponse("Please type somthing for problem category. We really need it :)");
	        }
	        
	        if (context.simpledb.roomleveldata.level==4)
	        {
	            //title, description and confirmation
	            if (event.message !== "")
	           {
	           	context.simpledb.doPut("ProblemTitle", event.message);
	           	context.sendResponse("Title has been recorded.");
	           	context.simpledb.roomleveldata.level=5;
	           }
	           else context.sendResponse("Please type somthing for problem description. We really need it :)");
	        }

	        if (context.simpledb.roomleveldata.level==5)
	        {
	        	if (event.message !== "")
	        	{
	        		context.simpledb.doPut("ProblemDescription", event.message);
	        		context.sendResponse("Problem description has been recorded.");
	        		context.simpledb.roomleveldata.level=6;
	        	}
	        	else context.sendResponse("Please type something for problem description.");
	        }

	        if (context.simpledb.roomleveldata.level==6)
	        {
	        	context.sendResponse("Confirm the post?");
	        	if (event.message.toLowerCase() == "no")
	        	{
	        		context.sendResponse("Problem description and problem title have been deleted.");
	        			context.simpledb.doPut("ProblemDescription", "");
	        			context.simpledb.doPut("ProblemTitle", "");
	        	}
	        	else if (event.message.toLowerCase() == "yes")
	        		context.sendResponse("Problem description and problem title have recorded.");
	        }
	        
	        context.console.log("test");
	        if(event.message.toLowerCase() == "httptest") {
	            context.simplehttp.makeGet("http://ip-api.com/json");
	        }
	        else if(event.message.toLowerCase() == "testdbget") {
	            context.simpledb.doGet("putby")
	        }
	        else if(event.message.toLowerCase() == "testdbput") {
	            context.simpledb.doPut("putby", event.sender);
	        }
	        else {
	            context.sendResponse("Sorry, I don't understand what you mean by "+ event.message+" :("); 
	        }
	        
	        
	    }
	    
	    
	    
	    /** Functions declared below are required **/
	    function EventHandler(context, event) {
	        if(! context.simpledb.botleveldata.numinstance)
	            context.simpledb.botleveldata.numinstance = 0;
	        numinstances = parseInt(context.simpledb.botleveldata.numinstance) + 1;
	        context.simpledb.botleveldata.numinstance = numinstances;
	        context.sendResponse("Thanks for adding me. You are:" + numinstances);
	    }
	
	    function HttpResponseHandler(context, event) {
	        // if(event.geturl === "http://ip-api.com/json")
	        context.sendResponse(event.getresp);
	    }
	
	    function DbGetHandler(context, event) {
	        context.sendResponse("testdbput keyword was last get by:" + event.dbval);
	    }
	
	    function DbPutHandler(context, event) {
	        context.sendResponse("testdbput keyword was last put by:" + event.dbval);
	    }