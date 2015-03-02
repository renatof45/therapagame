var playerList = [];

var index = 0;

var realtimeDoc;

var rapaMap;

var fileID;

var playerPot = [];

/**
 * This function is called the first time that the Realtime model is created
 * for a file. This function should be used to initialize any values of the
 * model. In this case, we just create the single string model that will be
 * used to control our text box. The string has a starting value of 'Hello
 * Realtime World!', and is named 'text'.
 * @param model {gapi.drive.realtime.Model} the Realtime root model object.
 */
function initializeModel(model) {
    var map = model.createMap();
    model.getRoot().set('rapamap', map);
    // model.getRoot().set('rotation', model.createList());
}


/**
 * This function is called when the Realtime file has been loaded. It should
 * be used to initialize any user interface components and event handlers
 * depending on the Realtime model. In this case, create a text control binder
 * and bind it to our string model that we created in initializeModel.
 * @param doc {gapi.drive.realtime.Document} the Realtime document.
 */
function onFileLoaded(doc) {
    realtimeDoc = doc;
    rapaMap = doc.getModel().getRoot().get('rapamap');
    //console.log(doc.getCollaborators().length)

    console.log(rtclient);

    var onRotationListValuesAdded = function(e) {
        //console.log(e.property);
        if (e.property === 'rotlist')
            targetRotation = e.newValue;
        if (e.property === 'makeMove' && e.newValue === 1) {
            footer.style.display = "block";
            //alert("teste");
            footer.style.transform = "translate(0, 0)";
            footer.style.transition = "transform 1s ease-out";
            palyers.style.display = "none";
        }

    };
    //rapaMap.set('playerPot', playerPot);
    //rapaMap.set('nextPlayer',0);
    //rapaMap.set('playerList', []);
    //rapaMap.set('totalPot',2);
    var collaboratorsList = realtimeDoc.getCollaborators();
    playerList.push(collaboratorsList[0].userId);
    var player_is_logged = false;
    console.log(playerList);
    playerPot = Utils.SortArrayByKey(Utils.PlayersPottoArray(rapaMap.get('playerPot')),'id');
    //console.log(playerPot.prototype);
    
    for (var i = 0; i < playerPot.length; i++) {
        if (collaboratorsList[0].userId === playerPot[i]['id']) {
            player_is_logged = true;
        }
    }
    if (!player_is_logged) {

        var usrid = collaboratorsList[0].userId;
        playerPot.push({
            'id': collaboratorsList[0].userId,
            'pot': 2
        });
        rapaMap.set('playerPot', playerPot);
        //Pot=1;
    }
    
    //playerList.push()
    //console.log(typeof(playerList));
    //playerList.push(collaboratorsList[0].userId);
    //console.log(playerList);
    //rapaMap.set('playerList', playerList);
    //rapaMap.set('playerList', playerList);
    //console.log(playerPot);
    index = rapaMap.get('nextPlayer');
    if (collaboratorsList.length===1){
        index=0;
        rapaMap.set('nextPlayer',0);
    }
    //console.log(playerList);
    Pot = rapaMap.get('totalPot');
    rapaMap.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, onRotationListValuesAdded);
    doc.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_JOINED, onCollaboratorJoined);
    doc.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_LEFT, onCollaboratorLeft);
    document.getElementById("groups").style.display = "none";
    document.getElementById("palyers").style.display = "block";
    //console.log(playerPot);
    updateUI();
    //console.log(realtimeDoc.getCollaborators());
}


onCollaboratorJoined = function(event) {
    //console.log(event);
    playerList.push(event.collaborator.userId);
    playerList.sort();
    console.log(playerList);
    playerPot = Utils.SortArrayByKey(Utils.PlayersPottoArray(rapaMap.get('playerPot')),'id');
    updateUI();
};

onCollaboratorLeft = function(event) {
    playerList.splice(playerList.indexOf(event.collaborator.userId),1);
    var collaboratorsList = realtimeDoc.getCollaborators();
    //console.log(playerList);
    if(collaboratorsList.length===1){
        index=0;
    }
    if(collaboratorsList.length===index+1)
        index=0;
    rapaMap.set('nextPlayer', index);
    updateUI();
};


updateUI = function() {
        var pot_player;
        var collaboratorsList = realtimeDoc.getCollaborators();
        console.log(collaboratorsList.length);
        if (collaboratorsList.length>1) {
            
            document.getElementById("online_palyers").innerHTML = 'Total in table : ' + Pot + '</br></br>';
            for (var i = 0; i < collaboratorsList.length; i = i + 1) {
                for (var j = 0; j < playerPot.length; j++) {
                    if (playerPot[j]['pot'] > 0 && collaboratorsList[i].userId===playerPot[j].id) {
                        pot_player = playerPot[j]['pot'];
                        break;
                    } else
                        pot_player = 'Game Over';
                }
                var collaborator = collaboratorsList[i];
                if (playerList[index] === collaborator.userId)
                    var nextPlayer = collaborator.displayName;
                var imgSrc = collaborator.photoUrl == null ? 'images/anon.jpeg' : collaborator.photoUrl;
                document.getElementById("online_palyers").innerHTML += '<img src=' + imgSrc + ' title=' + collaborator.displayName + ' height="50" width="50"></img></br>';
                document.getElementById("online_palyers").innerHTML += collaborator.displayName + (collaborator.isMe ? " (Me)" : "") + ' -   Chips : ' + pot_player + '</br></br>';
            }
            if (rtclient.params['userId'] !== playerList[index]) {
                document.getElementById('play_again').style.display = 'none';
                document.getElementById('nextMove').style.display = 'block';
                document.getElementById('nextMove').innerHTML = 'Next player : ' + nextPlayer;
            } else {
                document.getElementById('play_again').style.display = 'block';

                document.getElementById('nextMove').style.display = 'none';
            }
        } else {
            document.getElementById('nextMove').style.display = 'none'; 
            document.getElementById("online_palyers").innerHTML = "There are no players On-line!"
        }

    }
    /**
     * Options for the Realtime loader.
     */
var realtimeOptions = {
    /**
     * Clien88888t ID from the console.
     */
    clientId: '1083629863330-4k94hjvh45g633o79pvgv1qarmfmiu26.apps.googleusercontent.com',

    /**
     * The ID of the button to click to authorize. Must be a DOM element ID.
     */
    authButtonElementId: 'authorizeButton',

    /**
     * Function to be called when a Realtime model is first created.
     */
    initializeModel: initializeModel,

    /** 
     * Autocreate files right after auth automatically.
     */
    autoCreate: false,

    /**
     * The name of newly created Drive files.
     */
    defaultTitle: "The rapa game",

    /**
     * The MIME type of newly created Drive Files. By default the application
     * specific MIME type will be used:
     *     application/vnd.google-apps.drive-sdk.
     */
    newFileMimeType: null, // Using default.

    /**
     * Function to be called every time a Realtime file is loaded.
     */
    onFileLoaded: onFileLoaded,

    /**
     * Function to be called to inityalize custom Collaborative Objects types.
     */
    registerTypes: null, // No action.

    /**
     * Function to be called after authorization and before loading files.
     */
    afterAuth: loadGroups // 
}

var realtimeLoader;

function loadGroups() {
   realtimeLoader.listGroups(function(groups) {
       for (var i = 0; i < groups.length; i++) {
            document.getElementById("groups").innerHTML += '<button onclick="openGroup(\'' + groups[i].id + '\')">' + groups[i].title + '</button>';
        }
    });

}

function openGroup(fileId) {
        //alert(realtimeLoader.authorizer.userId);
        fileID = fileId;
        realtimeLoader.redirectTo(fileId, realtimeLoader.authorizer.userId);
    }
    /**
     * Start the Realtime loader with the options.
     */
function startRealtime() {

    realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
    realtimeLoader.start();
    //console.log(realtimeLoader);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}
