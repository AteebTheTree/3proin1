var camera = document.getElementById('camera')
var scene = document.getElementById('scene')
var boxes = document.getElementsByClassName('target')
console.log(boxes)
var shotCounter=3;

renderText(shotCounter.toString());
boxesLeft()

function boxesLeft(){
  var text = document.createElement("a-text")
  text.setAttribute("value", boxes.length)
  switch(boxes.length){
    case 3:
      text.setAttribute("position", "-0.005 -0.079 -0.680")
      text.setAttribute("value", "3 boxes left")
      break;
    case 2:
      text.setAttribute("position", "-0.005 -0.079 -0.680")
      text.setAttribute("value", "2 boxes left")
      break;
    case 1:
      text.setAttribute("position", "-0.005 -0.079 -0.680")
      text.setAttribute("value", "1 boxe left")
      break;
    case 0: 
    text.setAttribute("position", "-0.005 -0.079 -0.680")
    text.setAttribute("value", "you win!")
      break;
    camera.appendChild(text)
  }
}
function renderText(textToRender) {
  var text = document.createElement("a-text")
  text.setAttribute("value", textToRender)
  switch(shotCounter){
    case 3:
      text.setAttribute("position", "-0.005 -0.079 -0.680")
      break;
    case 2:
      text.setAttribute("position", "0.1 -0.079 -0.680")
      break;
    case 1:
      text.setAttribute("position", "0.2 -0.079 -0.680")
      break;
    case 0:
      text.setAttribute("position", "0.3 -0.079 -0.680")
      break;
  }

  
  camera.appendChild(text);
}

const shoot = () => {
    const bullet = document.createElement("a-sphere");

    let pos = camera.getAttribute("position");

    bullet.setAttribute("position", pos);
    bullet.setAttribute("velocity", getDirection(camera, 30));
    bullet.setAttribute("dynamic-body", true);
    bullet.setAttribute("radius", 0.5);
    bullet.setAttribute("src", "https://i.imgur.com/H8e3Vnu.png");
    scene.appendChild(bullet);
    bullet.addEventListener('collide', shootCollided)
  };
  
  const shootCollided = event => {
    if (event.detail.body.el.id === 'floor') {
      console.log('Hit the floor');
      event.detail.target.el.removeEventListener('collide', shootCollided);
      scene.removeChild(event.detail.target.el);
    } else if (event.detail.body.el.className === 'target') {
      console.log('Hit the target!');
      event.detail.target.el.removeEventListener('collide', shootCollided);
      scene.removeChild(event.detail.target.el);
      scene.removeChild(event.detail.body.el);
    }
  }

  document.onkeydown = event => {
    if (event.which == 32) {
      if(shotCounter>0)
      {
        shoot();
        shotCounter--;
        renderText(shotCounter.toString());
        boxesLeft()
      } 
      console.log(shotCounter)
    }
  };
  