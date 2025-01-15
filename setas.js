 const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 400,
  backgroundColor: '#ADDE06',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
  scene: { preload, create, update }
}

 let puntos=0; vidas =4; numSetas=12
let derecha = true
let malo,malo1,malo2
let dude
let dudeStop
let cursors
let hierba
let setas
let piedras

game = new Phaser.Game(config)
function preload() {
  //Sonidos
  this.load.audio("cogeSeta", "cogeSeta.wav");
  this.load.audio("salto", "Salto.wav");
  this.load.audio("paso", "paso.wav");
  this.load.audio("choque", "choque.wav");
  this.load.audio("muerto", "muerto.wav");
  //imagenes
  this.load.image("seta", "seta.png")
  this.load.image("piedra", "piedra.png")
  this.load.image("arbol1", "arbol1.PNG")
  this.load.image("hierba", "hierba2.PNG");
  this.load.image("puerta", "puerta.png");
  //personajes
  this.load.spritesheet("dude", "Run.png",{ frameWidth: 24, frameHeight: 29, spacing: 0 });
  this.load.spritesheet("dudeStop", "Idle-Sheet.png",{ frameWidth: 32, frameHeight: 29, margin: 0 });
  this.load.spritesheet("malo", "Run-Sheet.png",{ frameWidth: 26, frameHeight: 29, margin: 0 });
}

function create() {
  puntosText = this.add.text(16, 10, 'Puntos: 0', { fontSize: '20px', fill: '#000' });
  vidasText = this.add.text(470, 16, 'Vidas: 4', { fontSize: '20px', fill: '#000' });
  setasText = this.add.text(16, 26, 'Setas: 12', { fontSize: '20px', fill: '#000' });
  titulo = this.add.text(160, 5, "PHASER GAME", { fontSize: '40px', fill: '#ff0000' ,fontStyle: 'bold',strokeThickness: 4});
  gameoverText = this.add.text(220, 145, "Game Over", { fontSize: '35px', fill: '#ff0000' ,fontStyle: 'bold',strokeThickness: 4});
  puntosfinalesText = this.add.text(120, 180, ' ', { fontSize: '25px', fill: '#ff0000' });
  
  gameoverText.visible=false
  puntosfinalesText.visible= false

  //SONIDOS------------------------------------
  this.cogeSeta = this.sound.add("cogeSeta");
  this.salto = this.sound.add("salto");
  this.paso = this.sound.add("paso");
  this.choque = this.sound.add("choque");
  this.muerto = this.sound.add("muerto");

  //IMAGENES-------------------------------------
  this.add.image(50, 270, "arbol1").setScale(1)
  this.add.image(550, 270, "arbol1").setScale(1)
  this.add.image(200, 350, "arbol1").setScale(1.5)
  this.add.image(450, 350, "arbol1").setScale(1.5)

  puerta=this.add.image(15, 100, "puerta").setScale(0.8).setVisible(false)

  //GRUPOS----------------------------------------
  setas = this.physics.add.staticGroup()
  hierba = this.physics.add.staticGroup()
  piedras = this.physics.add.staticGroup()
  

 hierbaXY=[
  [20, 130, 6, 0.5], [320, 130, 3, 0.5], [550, 130, 3, 0.5],
  [200, 220, 3, 0.5], [430, 220, 3, 0.5], [50, 300, 3, 0.5],
  [320, 300, 3, 0.5], [560, 300, 3, 0.5], [200, 400, 20, 1]
   ];

for(let i=0; i<hierbaXY.length; i++ ) {
   [x,y,l,a]=hierbaXY[i]
    hierba.create(x,y,"hierba").setScale(l,a).refreshBody();}

 setasXY=[
  [50, 105], [325, 105], [550, 105],
  [200, 195], [430, 195], [10, 275],
  [370, 275], [265, 275], [590, 275],
  [50, 365], [325, 365], [550, 365]];

  numSetas= setasXY.length

  for (let i = 0; i < setasXY.length; i++) {
  const [x,y]= setasXY[i]
    setas.create(x,y, "seta").setScale(2, 2);
  }
  
  piedrasXY=[
    [100,115],[360,115],[150,205],[300,285],[380,375]
  ]
  for ( i =0; i < piedrasXY.length; i++){
     [x,y]= piedrasXY[i]
    piedras.create(x,y, "piedra").setScale(0.5, 0.5)}



  dude = this.physics.add.sprite(280, 10, "dude").setScale(1.1);
  malo = this.physics.add.sprite(0, 300, "malo").setScale(1, 1);
  malo1= this.physics.add.sprite(300, 10, "malo").setScale(1, 1);
  malo2= this.physics.add.sprite(0, 40, "malo").setScale(1, 1);

  dude.setCollideWorldBounds(true);
  malo.setCollideWorldBounds(true);
  malo1.setCollideWorldBounds(true);
  malo2.setCollideWorldBounds(true);

  this.anims.create({
    key: "Run",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 5 }),
    frameRate: 12,
    repeat: -1,
  });

  this.anims.create({
    key: "Runmalo",
    frames: this.anims.generateFrameNumbers("malo", { start: 0, end: 5 }),
    frameRate: 12,
    repeat: -1,
  });

  this.anims.create({
    key: "Stop",
    frames: this.anims.generateFrameNumbers("dudeStop", { start: 0, end: 3 }),
    frameRate: 6,
    repeat: -1,
  });

const enemigos=[malo,malo1,malo2]
  enemigos.forEach(enemigo =>{this.physics.add.collider(enemigo, hierba);})

  this.physics.add.collider(dude, hierba);
  this.physics.add.collider(dude, piedras, choque, null, this);
  this.physics.add.collider(dude, malo, vidamenos, null, this);
  this.physics.add.collider(dude, malo1, vidamenos, null, this);
  this.physics.add.collider(dude, malo2, vidamenos, null, this);
  this.physics.add.overlap(dude, setas, comeseta, null, this);

  malo.anims.play("Runmalo", true);
  malo1.anims.play("Runmalo", true);
  malo2.anims.play("Runmalo", true);

  function comeseta(dude, seta) {
    seta.disableBody(true, true)
    puntos += 10;
    numSetas -= 1;
    puntosText.setText('Puntos: ' + puntos);
    setasText.setText("Setas: "+ numSetas)
    this.cogeSeta.play()
    if (numSetas===0)  puerta.setVisible(true);
  }
  function choque() {
    if (!this.paso.isPlaying) this.choque.play()
  }

  function vidamenos(){
      vidas -= 1;
      vidasText.setText('Vidas: ' + vidas);
      this.muerto.play()
      dude.x=140;
      dude.y=10
      if (vidas===0) {
        gameoverText.visible=true
        puntosfinalesText.setText("Has conseguido "+puntos+" puntos !")
        puntosfinalesText.visible=true
        dude.disableBody(true,true)
        this.scene.pause()
      }
    }
      
  
  cursors = this.input.keyboard.createCursorKeys();
  this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update() {

  dude.setVelocityX(0)
  dude.setFlipX(false)


  if (cursors.left.isDown) {
    dude.setVelocityX(-160);
    dude.anims.play("Run", true)
    dude.setFlipX(true)
    if (!this.paso.isPlaying) this.paso.play();
  }
  else if (cursors.right.isDown) {
    dude.setVelocityX(160)
    dude.anims.play("Run", true)
    dude.setFlipX(false)
    if (!this.paso.isPlaying) this.paso.play()
  } else { dude.anims.play("Stop", true) }

  if  ((this.spaceKey.isDown || cursors.up.isDown) && dude.body.touching.down) {
    dude.setVelocityY(-400);    this.salto.play()
  }
  if (malo.x >= 580) {malo.setVelocityX(-100); malo.setFlipX(true); 
  } else if (malo.x <= 20) {malo.setVelocityX(100); malo.setFlipX(false);  }

  if (malo1.x >= 480) {malo1.setVelocityX(-100);  malo1.setFlipX(true); 
    } else if (malo1.x <= 380) { malo1.setVelocityX(100); malo1.setFlipX(false);}

  if (malo2.x >= 260) {malo2.setVelocityX(-100); malo2.setFlipX(true); 
      } else if (malo2.x <= 140) { malo2.setVelocityX(100); malo2.setFlipX(false);}
}
