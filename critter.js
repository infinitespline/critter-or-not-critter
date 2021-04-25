
 
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        
         const { attributesManager } = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        let whatcritter="Critter";
        sessionAttributes.whatcritter=whatcritter;
        
        let vowls=["a","e","i","o","u"];
        let res = whatcritter.charAt(0);
        let aan="";
        
        vowls.indexOf(res)<0? aan="a":aan="an";
        sessionAttributes.aan=aan;
        
        
          
       const speakOutput = 'Critter or not a Critter. How many people are around? One of them may be '+ aan + ' '+whatcritter;
       const reprompt ='To start, let me know how many people are around.';

        return handlerInput.responseBuilder
             .speak(speakOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};

const isWhatCritterHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'isWhatCritterIntent';
    },
    handle(handlerInput) {
        
        const { attributesManager } = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        let whatcritter = handlerInput.requestEnvelope.request.intent.slots.whatcritter.value;
        
        whatcritter===undefined? whatcritter="Critter":whatcritter=handlerInput.requestEnvelope.request.intent.slots.whatcritter.value;
        sessionAttributes.whatcritter=whatcritter;
        
        let vowls=["a","e","i","o","u"];
        let res = whatcritter.charAt(0);
        let aan="";
        
        vowls.indexOf(res)<0? aan="a":aan="an";
        sessionAttributes.aan=aan;
        
        const tempCap =whatcritter[0].toUpperCase() + whatcritter.substring(1);
        
       const speakOutput = tempCap +' or not '+ whatcritter +'. How many people are around?';
       const reprompt ='Let me know how many people are around. One of them may be '+ aan + ''+whatcritter;

        return handlerInput.responseBuilder
             .speak(speakOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};

const CapturePlayersHandler = {

    canHandle(handlerInput) {

        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CapturePlayersIntent';

    },

   handle(handlerInput) {
       
        const { attributesManager } = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const howmanycritters =  handlerInput.requestEnvelope.request.intent.slots.howmanycritters.value;
        sessionAttributes.crittersfound=0;
        sessionAttributes.rounds=0;
        sessionAttributes.numberofPlayers=howmanycritters;
        sessionAttributes.originalPlayers=howmanycritters;
        sessionAttributes.currentTurn=1;
        sessionAttributes.solo=false;
        sessionAttributes.critterNumber = Math.floor(Math.random() * howmanycritters)+1;
        
       let whatcritter = sessionAttributes.whatcritter;
       
       let speakOutput="";
       
       if(whatcritter===undefined){
           whatcritter="Critter";
           sessionAttributes.whatcritter=whatcritter;
        
       }
       
        if(howmanycritters<2){
            sessionAttributes.solo=true;
            let tempPlayers=Math.floor(Math.random() * 5)+3;
            sessionAttributes.numberofPlayers=tempPlayers;
            sessionAttributes.originalPlayers=tempPlayers;
            speakOutput = 'I see. You want me to check to see if you are  '+sessionAttributes.aan + ' '+ whatcritter + 'or not. Just say '+whatcritter+' and I will let you know.';

            
            
        }else{
            speakOutput = 'Great! Let\'s find the '+ whatcritter +' hiding among the '+ howmanycritters +' of us! Each person takes a turn and says '+whatcritter+'. Or point at a person and say '+whatcritter+' and I will let you know if they are a '+whatcritter+' or not.';

        }


        //template slot not working for variable, check into later, use old way.
               const reprompt ='Say '+whatcritter+' to start.';
        
        //capture inital players
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(reprompt)
            .getResponse();

    }

};



const isCritterHandler = {

    canHandle(handlerInput) {
        
        const isCurrentlyPlay=false;
        

        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'isCritterIntent';

    },

   handle(handlerInput) {
       
        const { attributesManager } = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const whatsaid = handlerInput.requestEnvelope.request.intent.slots.anycritter.value;
        const currentTurn =sessionAttributes.currentTurn;
        const critterNumber = sessionAttributes.critterNumber;
        const howmanycritters = sessionAttributes.numberofPlayers;
        const rounds=sessionAttributes.rounds;
        let crittersfound =sessionAttributes.crittersfound;
        const whatcritter=sessionAttributes.whatcritter;
        let numberofPlayers=howmanycritters;
        const aan=sessionAttributes.aan;
        
        
        let speakOutput ="";
        
        
        const speakarray=[
            " There's one more! Who will it be?",
            " I knew it would be you.",
            " Another one!",
            " So many.",
            " Where was this one hiding?",
            " I did think it would be you.",
            " Oh no.",
            " Be careful, there's more.",
            " Why are there so many?",
            " Hey there's a lot more here.",
            " Hmmm, I see a trend.",
            " I know there's another one.",
            " That was a loud one.",
            " They almost had me fooled",
            " A very interesting party."
            
            
            ];
        
        
        
        const roundEndArray=[
            ' Only one non-'+whatcritter+' among us left, besides me. Next round.',
            ' All the '+whatcritter+'s found. New round.',
            ' I knew it would be you who wasn\'t the '+whatcritter,
            ' Winner, will the only non-'+whatcritter+' wave. Oh, you just gave away who you are. Run!',
            ' I surely thought you were also one of them. Let\'s go again.',
            ' Did the rest of the '+whatcritter+'s have you fooled? Not me. New round.',
            ' I see a trend here, you hang out with a lot of '+whatcritter+'s',
            ' Hey where was that last one hiding? Let\'s do this again, keep a close eye on that last '+whatcritter,
            ' So many '+whatcritter+'s. A very interesting party. Next round.',
            ' It wasn\'t obvious to me too. Let\'s try this again.',
            ' Very tricky '+whatcritter+' Keep a close watch on them as we do this again.',
            ' Next round.',
            ' Next round let\'s do it faster this time!',
            ' Have each '+whatcritter+' dance around. New round.',
            ' How do you know so many '+whatcritter+ 's?'
            
        ]
        
        
        const roundEndSoloArray=[
            ' Alexa Alexa on the wall, guess who\'s '+ aan +' '+whatcritter+'? Hint, it\'s not me. Try again?',
            ' All this time I expected it was you. Try again?.',
            ' I knew it would be you. How do you like being '+aan + ' '+whatcritter,
            ' I like '+whatcritter+ 's. Let\'s go again.',
            ' Hey '+whatcritter+'. Let\'s do this again.',
            ' So many '+whatcritter+'s. A very interesting party. Next round.',
            ' You had me fooled. Let\'s try this again.',
            ' Very tricky '+whatcritter+'. I\'m going to keep a close ear on you. Try again.',
            ' Congrats! '+whatcritter+'. Try again.'

            
        ]
       
             
        let isCritter=false;
        if(critterNumber===currentTurn){
            isCritter=true;
            numberofPlayers--;
            sessionAttributes.numberofPlayers--;
            sessionAttributes.crittersfound++;
            sessionAttributes.currentTurn=0;
            crittersfound++;
            
            speakOutput ='You\'re '+sessionAttributes.aan +' '+whatcritter+' ';
             //crittersfound+numberofPlayers<speakarray.length-1
            if(crittersfound===1 && sessionAttributes.rounds===0){
                sessionAttributes.critterNumber = Math.floor(Math.random() * numberofPlayers)+1;
                speakOutput+='You found the first '+whatcritter+' That player is out. Keep going. There might be more!';
             }
             
             
            if(numberofPlayers===1){
                sessionAttributes.numberofPlayers=sessionAttributes.originalPlayers;
                sessionAttributes.critterNumber = Math.floor(Math.random() * sessionAttributes.numberofPlayers)+1;
                speakOutput+=roundEndArray[Math.floor(Math.random() * roundEndArray.length-1)];
                
            }
            
            if(sessionAttributes.solo===true){
                speakOutput ='You\'re '+ aan +' '+whatcritter+'. ';
                speakOutput+=roundEndSoloArray[Math.floor(Math.random() * roundEndSoloArray.length-1)];
            }
              
              
           
              
        }else{
            isCritter=false;
            speakOutput ='Not '+whatcritter;
            
           
        }
        
      // speakOutput+='numberofPlayers '+numberofPlayers +' crittersfound '+crittersfound +' howmanycritters '+ howmanycritters +' turns  '+ currentTurn + ' critterNumber '+critterNumber;
      sessionAttributes.currentTurn++;
     

        
        
        

      
        const reprompt = 'I could not hear you.'+ whatcritter +' are usually hard to hear.';
        
        //capture inital players
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(reprompt)
            .getResponse();

    }

};





const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        
          const helpArray=[
              'Next time. Ask me to open Critter not Critter and find frog to find out who\'s a frog among you. Ribit. Ribit',
              'Ask me to open Critter not Critter and find cat find out who\'s a cat among you next time. Meow meow',
              'Bye. Next time say open Critter not Critter and find dog to find out who\'s a dog. Woof Woof',
              'Bye. Next time say open Critter not Critter and find superhero to find out who\'s a superhero among you. Up Up and Hurray!',
              'Bye. Next time say open Critter not Critter and find secret cat to find the secret cat among you. Shhhhh meow.',
              'Bye. Next time say open Critter not Critter and find space alien to find the space alien on your couch. Zap.',
            
            ];
            
        const speakOutput = helpArray[helpArray.length-1];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        
        const helpArray=[
              'Next time. Ask me to open Critter not Critter and find frog to find out who\'s a frog among you. Ribit. Ribit',
              'Ask me to open Critter not Critter and find cat find out who\'s a cat among you next time. Meow meow',
              'Bye. Next time say open Critter not Critter and find dog to find out who\'s a dog. Woof Woof',
              'Bye. Next time say open Critter not Critter and find superhero to find out who\'s a superhero among you. Up Up and Hurray!',
              'Bye. Next time say open Critter not Critter and find secret cat to find the secret cat among you. Shhhhh meow.',
              'Bye. Next time say open Critter not Critter and find space alien to find the space alien on your couch. Zap.',
            
            ];
        const speakOutput = helpArray[helpArray.length-1];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please say something like 5 for the number of players. Or find the elephant find the elephants hiding among your friends.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        isWhatCritterHandler,
        HelpIntentHandler,
        CapturePlayersHandler,
        isCritterHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();