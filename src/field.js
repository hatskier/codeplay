import Position from './position';
import ObjectOnField from './objectOnField';
import Page from './page';
import Logger from './logger';

class Field {
  constructor({bg, objects, methods, size, tickHooks}) {
    this.objects = {};
    for (let obj of objects) {
      let objOnField = new ObjectOnField(obj, this);
      this.objects[objOnField.id] = objOnField;
    }
    this.tickHooks = tickHooks;
    this.methods = methods;
    this.bg = bg;
    this.size = size;

    // TODO maybe it's better to store state outside
    this.state = {};
  }

  init() {
    Page.initEmptyScreen(this.bg, this.size);
    for (let id in this.objects) {
      let curObj = this.objects[id];
      Page.safeAddObject(curObj);
    }
  }

  // TODO in future we can add speed and other motion params
  async run(codeTree, lineHighlighter) {
    // TODO handle while stmt
    let tickNr = 0;

    for (let node of codeTree) {
      switch (node.type) {
        case 'funCall': {
          const method = this.methods[node.name];
          if (method) {
            // Running pre hook
            Logger.info(`Running pre hook for tickNr: ${tickNr}`);
            await this.tickHooks.pre(tickNr);

            // TODO make running line highlighting better
            if (lineHighlighter) {
              lineHighlighter.start(node.line);
            }
            Logger.info(`Running ${node.line} line of code`);
            Logger.info(`Running method ${node.name}, arg list: ${JSON.stringify(node.args)}`);
            await method.run({field: this, state: this.state}, node.args);
            // TODO make running line highlighting better
            if (lineHighlighter) {
              lineHighlighter.stop(node.line);
            }

            // Running post hook
            Logger.info(`Running post hook for tickNr: ${tickNr}`);
            await this.tickHooks.post(tickNr);
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
            Logger.info('Running if statements');
            await this.run(node.ifStmts);
          } else {
            Logger.info('Running else statements');
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

  async safeMove(id, offset) {
    let obj = this.findById(id);
    let newPos = Position.safeAdd(obj.pos, offset);
    obj.pos = newPos;
    await Page.changeObjectPos(obj);
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

  async changeImage(id, url) {
    let obj = this.findById(id);
    await Page.changeObjectImg(id, url);
    obj.img = url;
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