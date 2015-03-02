 var container, stats;

 var camera, scene, renderer;

 var cube, plane, cone;

 var targetRotation = 0;
 var targetRotationOnMouseDown = 0;
 var last_rot = -1;

 var mouseX = 0;
 var mouseXOnMouseDown = 0;

 var windowHalfX = window.innerWidth / 2;
 var windowHalfY = window.innerHeight / 2;

 var querySelector = document.querySelector.bind(document);
 var navdrawerContainer = querySelector('.navdrawer-container');
 var appbarElement = querySelector('.app-bar');
 var menuBtn = querySelector('.menu');

 var can_join = true;

 var Pot;

 function closeMenu() {
   appbarElement.classList.remove('open');
   navdrawerContainer.classList.remove('open');
 }

 function toggleMenu() {
   appbarElement.classList.toggle('open');
   navdrawerContainer.classList.toggle('open');
 }
 main.addEventListener('click', closeMenu);
 menuBtn.addEventListener('click', toggleMenu);
 navdrawerContainer.addEventListener('click', function (event) {
   if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
     closeMenu();
   }
 });

 function play_again() {
   //event.preventDefault();
   rapaMap.set('makeMove', 1);
   can_join = false;
   document.addEventListener('mousedown', onDocumentMouseDown, false);
   document.addEventListener('touchstart', onDocumentTouchStart, false);
   document.addEventListener('touchmove', onDocumentTouchMove, false);
   document.addEventListener('touchend', onDocumentTouchEnd, false);
   footer.style.display = "block";
   //alert("teste");
   footer.style.transform = "translate(0, 0)";
   footer.style.transition = "transform 1s ease-out";
   palyers.style.display = "none";
 }

 init();
 animate();

 function init() {
   var footer = document.getElementById('footer');
   var players = document.getElementById('palyers');
   camera = new THREE.PerspectiveCamera(70, (footer.offsetWidth - 5) / (footer.offsetHeight - 5), 1, 1000);
   camera.position.y = 150;
   camera.position.z = 500;

   scene = new THREE.Scene();

   // Cube

   var geometry = new THREE.BoxGeometry(100, 110, 100);


   var materialArray = [];
   materialArray.push(new THREE.MeshBasicMaterial({
     map: THREE.ImageUtils.loadTexture('images/face1.png')
   }));
   materialArray.push(new THREE.MeshBasicMaterial({
     map: THREE.ImageUtils.loadTexture('images/faceT.png')
   }));
   materialArray.push(new THREE.MeshBasicMaterial({
     map: THREE.ImageUtils.loadTexture('images/faceR.png')
   }));
   materialArray.push(new THREE.MeshBasicMaterial({
     map: THREE.ImageUtils.loadTexture('images/faceP.png')
   }));
   materialArray.push(new THREE.MeshBasicMaterial({
     map: THREE.ImageUtils.loadTexture('images/faceP.png')
   }));
   materialArray.push(new THREE.MeshBasicMaterial({
     map: THREE.ImageUtils.loadTexture('images/faceR.png')
   }));
   var MovingCubeMat = new THREE.MeshFaceMaterial(materialArray);

   cube = new THREE.Mesh(geometry, MovingCubeMat);
   cube.position.y = 150;
   scene.add(cube);

   var geometry = new THREE.CylinderGeometry(45, 5, 70, 32, true);
   var material = new THREE.MeshBasicMaterial({
     color: 0x335C85,
     overdraw: 0.5
   });
   cone = new THREE.Mesh(geometry, material);
   cone.position.y = 55;
   scene.add(cone);

   // Plane

   var geometry = new THREE.PlaneGeometry(100, 100);
   geometry.applyMatrix(new THREE.Matrix4()
     .makeRotationX(-Math.PI / 2));

   var material = new THREE.MeshBasicMaterial({
     color: 0xe0e0e0,
     overdraw: 0.5
   });

   plane = new THREE.Mesh(geometry, material);
   scene.add(plane);

   renderer = new THREE.CanvasRenderer();
   renderer.setClearColor(0xf0f0f0);
   renderer.setSize(footer.offsetWidth - 5, footer.offsetHeight - 5);

   footer.appendChild(renderer.domElement);

   //stats = new Stats();
   //stats.domElement.style.position = 'absolute';
   //stats.domElement.style.top = '0px';
   //container.appendChild(stats.domElement);

   //document.addEventListener('mousedown', onDocumentMouseDown, false);
   //document.addEventListener('touchstart', onDocumentTouchStart, false);
   //document.addEventListener('touchmove', onDocumentTouchMove, false);

   //

   window.addEventListener('resize', onWindowResize, false);
   footer.style.display = "none";
 }

 function onWindowResize() {

   windowHalfX = window.innerWidth / 2;
   windowHalfY = window.innerHeight / 2;

   camera.aspect = (footer.offsetWidth - 5) / (footer.offsetHeight - 5);
   camera.updateProjectionMatrix();

   renderer.setSize((footer.offsetWidth - 5), (footer.offsetHeight - 5));

 }

 //

 function onDocumentMouseDown(event) {

   event.preventDefault();

   document.addEventListener('mousemove', onDocumentMouseMove, false);
   document.addEventListener('mouseup', onDocumentMouseUp, false);
   document.addEventListener('mouseout', onDocumentMouseOut, false);

   mouseXOnMouseDown = event.clientX - windowHalfX;
   targetRotationOnMouseDown = targetRotation;

 }

 function onDocumentMouseMove(event) {

   mouseX = event.clientX - windowHalfX;

   targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
   //rotationList.push(targetRotation);
   //rapaMap.set('rotlist', targetRotation);

   //console.log(rapaMap.toString());

 }

 function onDocumentMouseUp(event) {

   document.removeEventListener('mousemove', onDocumentMouseMove, false);
   document.removeEventListener('mouseup', onDocumentMouseUp, false);
   document.removeEventListener('mouseout', onDocumentMouseOut, false);
   document.removeEventListener('mousedown', onDocumentMouseDown, false);

   rapaMap.set('rotlist', targetRotation);
   //console.log(targetRotation);
   //rotationList.push(targetRotation);  
   //console.log(realtimeDoc.getCollaborators());
 }

 function onDocumentMouseOut(event) {
   document.removeEventListener('mousemove', onDocumentMouseMove, false);
   document.removeEventListener('mouseup', onDocumentMouseUp, false);
   document.removeEventListener('mouseout', onDocumentMouseOut, false);
   document.removeEventListener('mousedown', onDocumentMouseDown, false);

   rapaMap.set('rotlist', targetRotation);


 }

 function onDocumentTouchStart(event) {

   if (event.touches.length === 1) {

     event.preventDefault();

     mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
     targetRotationOnMouseDown = targetRotation;

   }

 }

 function onDocumentTouchMove(event) {

   if (event.touches.length === 1) {

     event.preventDefault();

     mouseX = event.touches[0].pageX - windowHalfX;
     targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
     rotationList.push(targetRotation);
     //rapaMap.set('rotlist', rotationList);
   }

 }

 function onDocumentTouchEnd(event) {

   document.removeEventListener('touchend', onDocumentTouchEnd, false);
   document.removeEventListener('touchstart', onDocumentTouchStart, false);
   document.removeEventListener('touchmove', onDocumentTouchMove, false);
   rapaMap.set('rotlist', targetRotation);

 }


 //

 function animate() {

   requestAnimationFrame(animate);

   render();
   //stats.update();

 }

 function game_score(result) {
   can_join = true;
   rapaMap.set('makeMove', 0);
    var collaboratorsList = realtimeDoc.getCollaborators();
   setTimeout(function () {
     footer.style.transform = "translate(" + window.innerWidth + "px, 0)";
     footer.style.transition = "transform 1s ease-out";
     palyers.style.display = "block";
   }, 1000);

  
    
       if (playerPot[index]['pot'] > 0) {
         
           if (result === 'p') {
             Pot++;
             playerPot[index].pot--;
             //console.log(playerPot);
           } else if (result === 'r') {
             playerPot[index].pot += Pot;
             Pot = 0;
           } else if (result === 't') {
             if (Pot > 0) {
               playerPot[index].pot ++;
               Pot--;
             }
           }
         
       }
     
   

   
  
   if (rtclient.params['userId'] === playerList[index]) {
     rapaMap.set('playerPot', playerPot);
     rapaMap.set('totalPot', Pot);
   }

   //console.log(playerList[index]);
   index++;
   if (index >= collaboratorsList.length) {
     //rapaMap.set('nextPlayer', 0);
     index = 0;
   }
   
   for (var i = 0; i < playerPot.length; i++) {
     if (playerPot[i]['id'] === playerList[index] && playerPot[i]['pot'] === 0) {
       index++;
       if (index >= playerList.length) {
         rapaMap.set('nextPlayer', 0);
         index = 0;
       }
     }
   }

   rapaMap.set('nextPlayer', index);
   updateUI();
 }

 var permissionId = 0;

 function render() {
   //console.log(targetRotation);
   cone.rotation.y = plane.rotation.y = cube.rotation.y += (targetRotation - cube.rotation.y) * 0.02;
   var result;
   if (targetRotation - cube.rotation.y < .01 && targetRotation - cube.rotation.y > 0) {
     final_rot = targetRotation % (Math.PI * 2);
     if (final_rot < Math.PI * 0.25 && final_rot > 0) {
       console.log('P');
       result = 'p';
       targetRotation = 0;
       cube.rotation.y = 0;
     } else if (final_rot > Math.PI * 0.25 / 2 && final_rot < Math.PI * 0.75) {
       console.log('T');
       result = 't';
       targetRotation = Math.PI / 2;
       cube.rotation.y = Math.PI / 2;
     } else if (final_rot > Math.PI * 0.75 && final_rot < Math.PI * 1.25) {
       console.log('R');
       result = 'r';
       targetRotation = Math.PI;
       cube.rotation.y = Math.PI;
     } else if (final_rot > Math.PI * 1.25 && final_rot < Math.PI * 1.75) {
       console.log('D');
       result = 'd';
       targetRotation = Math.PI * 1.5;
       cube.rotation.y = Math.PI * 1.5;
     } else {
       console.log('P');
       result = 'p';
       targetRotation = 0;
       cube.rotation.y = 0;
     }
     game_score(result);

   } else {
     if (targetRotation - cube.rotation.y > -.01 && targetRotation - cube.rotation.y < 0) {
       final_rot = targetRotation % (Math.PI * 2) * -1;
       //console.log(final_rot);
       if (final_rot < Math.PI * 0.25 && final_rot > 0) {
         console.log('P');
         result = 'p';
         targetRotation = 0;
         cube.rotation.y = 0;
       } else if (final_rot > Math.PI * 0.25 / 2 && final_rot < Math.PI * 0.75) {
         console.log('D');
         result = 'd';
         targetRotation = Math.PI * 1.5;
         cube.rotation.y = Math.PI * 1.5;
       } else if (final_rot > Math.PI * 0.75 && final_rot < Math.PI * 1.25) {
         console.log('R');
         result = 'r';
         targetRotation = Math.PI;
         cube.rotation.y = Math.PI;
       } else if (final_rot > Math.PI * 1.25 && final_rot < Math.PI * 1.75) {
         console.log('T');
         result = 't';
         targetRotation = Math.PI / 2;
         cube.rotation.y = Math.PI / 2;
       } else {
         console.log('P');
         result = 'p';
         targetRotation = 0;
         cube.rotation.y = 0;
       }
       game_score(result);
     }

   }

   renderer.render(scene, camera);

 }
