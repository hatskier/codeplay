import Position from './position';
import ObjectOnField from './object-on-field';
import Page from './page';
import Logger from './logger';

const DEFAULT_TICK_TIME = 500;

class Field {
  constructor({bg, objects, methods, size, tickHooks, images}) {
    this.objects = {};
    this.images = images; // It's important to assign images before object initializing
    for (let obj of objects) {
      let objOnField = new ObjectOnField(obj, this);
      this.objects[objOnField.id] = objOnField;
    }
    this.tickHooks = tickHooks;
    this.methods = methods;
    this.bg = images[bg];
    this.size = size;
    this.tickTime = DEFAULT_TICK_TIME;

    // TODO maybe it's better to store state outside
    this.state = {};
  }

  init() {
    Page.initEmptyScreen(this.bg, this.size);
    for (let id in this.objects) {
      let curObj = this.objects[id];
      Page.addObject(curObj);
    }
  }

  addObject(obj) {
    const objOnField = new ObjectOnField(obj, this);
    this.objects[objOnField.id] = objOnField;
    Page.addObject(objOnField);
    return objOnField;
  }

  removeObject(id) {
    delete this.objects[id];
    Page.removeObject(id);
  }

  clear() {
    Page.clearAll();
  }

  setSpeed(speed) {
    switch (speed) {
      case 'fast':
        this.tickTime = 100;
        break;
      case 'normal':
        this.tickTime = 400;
        break;
      case 'slow':
        this.tickTime = 1000;
        break;
      default:
        throw new Error(`Case is unknonw: ${this.tickTime}`);
    }
  }

  // TODO in future we can add speed and other motion params
  async run(codeTree, lineHighlighter) {
    // TODO handle while stmt
    let tickNr = 0;

    for (let node of codeTree) {
      switch (node.type) {
        case 'funCall': {
          const context = {field: this, state: this.state};

          const method = this.methods[node.name];
          if (method) {
            // Running pre hook
            Logger.debug(`Running pre hook for tickNr: ${tickNr}`);
            await this.tickHooks.pre(tickNr, context);

            // TODO make running line highlighting better
            if (lineHighlighter) {
              lineHighlighter.start(node.line);
            }
            Logger.debug(`Running ${node.line} line of code`);
            Logger.debug(`Running method ${node.name}, arg list: ${JSON.stringify(node.args)}`);
            await method.run(context, node.args);
            // TODO make running line highlighting better
            if (lineHighlighter) {
              lineHighlighter.stop(node.line);
            }

            // Running post hook
            Logger.debug(`Running post hook for tickNr: ${tickNr}`);
            await this.tickHooks.post(tickNr, context);
            tickNr++;
          } else {
            const errMsg = `Method ${node.name} was not found`;
            Logger.error(errMsg);
            throw new Error(errMsg);
          }
          break;
        }
        case 'ifElseStm': {
          if (node.expr) {
            Logger.debug('Running if statements');
            await this.run(node.ifStmts);
          } else {
            Logger.debug('Running else statements');
            await this.run(node.elseStmts);
          }
          break;
        }
        case 'whileStm': {
          const errMsg = 'While stm not implemented';
          Logger.error(errMsg);
          throw new Error(errMsg);
        }
        default: {
          const errMsg = 'Other statements not allowed';
          Logger.error(errMsg);
          throw new Error(errMsg);
        }
      }
    }
  }

  findById(id) {
    return this.objects[id];
  }

  // TODO refactor - this function could use moveToPos
  async safeMove(id, offset) {
    let obj = this.findById(id);
    let newPos = Position.safeAdd(obj.pos, offset);
    obj.pos = newPos;
    await Page.changeObjectPos(obj, this.tickTime);
  }

  async moveToPos(id, pos) {
    let obj = this.findById(id);
    obj.pos = pos;
    await Page.changeObjectPos(obj, this.tickTime);
  }

  async rotate(id, degrees) {
    const fullCircle = 360;
    let obj = this.findById(id);
    let newRotation = (obj.rotation + degrees) % (fullCircle + 1);
    await Page.changeObjectRotation(id, {
      old: obj.rotation,
      new: newRotation
    });
    obj.rotation = newRotation;
  }

  async changeImage(id, imgKey) {
    const obj = this.findById(id);
    obj.changeImage(imgKey);
    await Page.changeObjectImg(id, obj.img.src);
  }

  sleep(ms) {
    return new Promise(function(resolve) {
      setTimeout(resolve, ms);
    });
  }

  checkPosById(id, pos) {
    return JSON.stringify(this.findById(id).pos) === JSON.stringify(pos);
  }

}

export default Field;