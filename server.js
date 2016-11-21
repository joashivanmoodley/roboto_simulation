var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
var current_position = [0, 0, "North"]
var place = -1
app.get('/', function(req, res){
  // index page for setting and displaying data.
  res.render('index.html');
});

app.post('/api/place/:x/:y/:f', function(req, res){
//sets starting position of toy
  x = parseInt(req.params.x)
  y = parseInt(req.params.y)
  f = req.params.f.toString().toUpperCase()
    place = 1
    current_position = [x,y,f]

  res.send('done');
});

app.post('/api/move', function(req, res){
  //creates movement for roboto
  send_msg = 'done'
  if(place !=-1){
    f = current_position[2].toString().toUpperCase()
    switch(f) {
    case "NORTH":
        if(current_position[1] <4){
          current_position[1] += 1
        } else{
          send_msg = "Fail Robo Will Fall"
        }
        break;
    case "SOUTH":
    if(current_position[1] >0){
        current_position[1] -= 1
    } else{
      send_msg = "Fail Robo Will Fall"
    }
        break;
    case "EAST":
    if(current_position[0] < 4){
      current_position[0] += 1
    }else{
      send_msg = "Fail Robo Will Fall"
    }
        break;
    case "WEST":
    if(current_position[0] > 0){
      current_position[0] -= 1
    } else{
      send_msg = "Fail Robo Will Fall"
    }
        break;
}

    res.send(send_msg);
  }else{
     res.send("Select Starting Point");
  }
});

app.post('/api/left', function(req, res){
  // function pivits roboto position 90 degrees to the left
  if(place !=-1){
    f = current_position[2].toString().toUpperCase()
    switch(f) {
    case "NORTH":
        current_position[2] = 'WEST'
        break;
    case "SOUTH":
        current_position[2] = 'EAST'
        break;
    case "EAST":
      current_position[2] = 'NORTH'
        break;
    case "WEST":
      current_position[2] = 'SOUTH'
        break;
}
    res.send('done');
  }else{
     res.send("Select Starting Point");
  }
});

app.post('/api/right', function(req, res){
  if(place !=-1){
     // function pivits roboto position 90 degrees to the right
    f = current_position[2].toString().toUpperCase()
    switch(f) {
    case "NORTH":
        current_position[2] = 'EAST'
        break;
    case "SOUTH":
        current_position[2] = 'WEST'
        break;
    case "EAST":
      current_position[2] = 'SOUTH'
        break;
    case "WEST":
      current_position[2] = 'NORTH'
        break;
}

    res.send('done');
  }else{
     res.send("Select Starting Point");
  }
});

app.post('/api/report', function(req, res){
   // function returns current position of roboto
  if(place !=-1){

    res.send(current_position);
  }else{
     res.send("Select Starting Point");
  }
});
app.listen(3000);
