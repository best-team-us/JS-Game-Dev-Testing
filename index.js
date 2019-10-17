        //Aliases
        let Application = PIXI.Application,
            Container = PIXI.Container,
            loader = PIXI.Loader.shared,
            resources = PIXI.Loader.shared.resources,
            TextureCache = PIXI.utils.TextureCache,
            Sprite = PIXI.Sprite,
            Rectangle = PIXI.Rectangle;
        
        //Create a Pixi Application
        let app = new Application({ 
            width: 512, 
            height: 512,                       
            antialias: true, 
            transparent: false, 
            resolution: 1
          }
        );
        
        //Add the canvas that Pixi automatically created for you to the HTML document
        document.body.appendChild(app.view);
        
        //load a JSON file and run the `setup` function when it's done
        loader
          .add("images/mercmale.png")
          .load(setup);
        
        //Define variables that might be used in more 
        //than one function
        let mercMale;
        let mercMaleTexture;
        let mercMaleDirection = 4; //1:left 2:up 3:down 4:right
        let tick = true;
        const moveSpeed = 5;
        const leftAnim = [new Rectangle(0,0,75,75), new Rectangle(75,0,75,75), new Rectangle(150,0,75,75), new Rectangle(225,0,75,75)];
        const rightAnim = [new Rectangle(0,225,75,75), new Rectangle(75,225,75,75), new Rectangle(150,225,75,75), new Rectangle(225,225,75,75)];
        const delay = 20;
        let elapsed = 0;
        let currentFrame = 0;
        const totalFrames = 3;
        const animLoop = false;
        
        function setup() {
        
          //There are 3 ways to make sprites from textures atlas frames
        
          // //1. Access the `TextureCache` directly
          mercMaleTexture = TextureCache["images/mercmale.png"];
          mercMale = new Sprite(mercMaleTexture);
          app.stage.addChild(mercMale);
          
          
          mercMaleTexture.frame = rightAnim[0];

          //Start the game loop by adding the `gameLoop` function to
          //Pixi's `ticker` and providing it with a `delta` argument.
          app.ticker.add(delta => gameLoop(delta));
        }
        


        function gameLoop(delta){
          walkLeftAndRight();
          animationUpdater();
        }
