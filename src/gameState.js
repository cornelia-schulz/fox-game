import { modFox, modScene } from './ui';
import { 
  RAIN_CHANCE,
  SCENES, DAY_LENGTH,
  NIGHT_LENGTH,
  getNextHungerTime,
  getNextDieTime
} from './constants';

const gameState = {
  current: 'INIT',
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,

  tick() {
    this.clock++;

    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    }

    return this.clock;
  },
  startGame() {
    this.current = 'HATCHING';
    this.wakeTime = this.clock + 3;
    modFox('egg');
    modScene('day');
  },
  wake() {
    this.current = 'IDLING';
    this.wakeTime = -1;
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);
    // this.dieTime = getNextDieTime(this.clock);
    modFox('idling');
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
  },
  sleep() {
    this.current = 'SLEEPING';
    modFox('sleep');
    modScene('night');
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  getHungry() {
    this.current = 'HUNGRY';
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox('hungry');
  },
  die() {
    this.current = ('DEAD');
    modFox('dead');
    modScene('dead');
  },
  handleUserAction(icon) {
    // can't do actions while in these states
    if (['POOPING', 'SLEEPING', 'FEEDING', 'CELEBRATING', 'HATCHING'].includes(this.current)) {
      // do nothing
      return;
    }

    if (this.current === 'INIT' || this.current === 'DEAD') {
      this.startGame();
      return;
    }

    // execute the currently selected action
    switch (icon) {
      case 'weather':
        this.changeWeather();
        break;
      case 'poop':
        this.cleanUpPoop();
        break;
      case 'fish':
        this.feed();
        break;
    }
  },
  changeWeather() {
    console.log('changeWeather');
  },
  cleanUpPoop() {
    console.log('cleanUpPoop');
  },
  feed() {
    console.log('feed');
  },
};

export const handleUserAction = gameState.handleUserAction.bind(gameState);

export default gameState;