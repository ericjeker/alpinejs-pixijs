import './styles/style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import { engine, animate, createSpring } from 'animejs';
import { Application, Assets, Container, PI_2, Sprite } from 'pixi.js';

(async () => {
  // Manually tick Anime.js
  engine.useDefaultMainLoop = false;
  engine.defaults.alternate = true;

  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: '#1099bb', resizeTo: window });

  // Append the application canvas to the document body
  document.querySelector('#app').appendChild(app.canvas);

  // Create and add a container to the stage
  const container = new Container();

  app.stage.addChild(container);

  // Load the bunny texture
  const jsLogoTexture = await Assets.load(javascriptLogo);
  const viteLogoTexture = await Assets.load(viteLogo);

  // Create a 5x5 grid of bunnies in the container
  for (let i = 0; i < 25; i++) {
    const bunny = new Sprite(jsLogoTexture);

    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    container.addChild(bunny);
  }

  // Move the container to the center
  container.x = app.screen.width / 2;
  container.y = app.screen.height / 2;

  animate(container, {
    rotation: PI_2,
    loop: true,
    loopDelay: 300,
    duration: 5000,
    ease: 'inElastic'
  });

  // Center the bunny sprites in local container coordinates
  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;

  const vite = new Sprite(viteLogoTexture);
  vite.x = 100;
  vite.y = 100;

  animate(vite, {
    x: 200,
    y: 200,
    loop: true,
    ease: 'inElastic',
    loopDelay: 250,
  });

  app.stage.addChild(vite);

  // Listen for animate update
  app.ticker.add((time) => {
    // Tick the Anime.js engine
    engine.update();
  });
})();