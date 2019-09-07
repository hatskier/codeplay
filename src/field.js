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

    this.executionStopped = false;
    this.cbAfterExecutionStopped = null;

    this.log = Page.addLog;

    // TODO maybe it's better to store state outside
    this.state = {
      vars: {},
    };
  }

  init() {
    Page.initEmptyScreen(this.bg, this.size);
    for (let id in this.objects) {
      let curObj = this.objects[id];
      Page.addObject(curObj);
    }
  }

  changeBg(newBgKey) {
    this.bg = this.images[newBgKey];
    Page.setBg(this.bg);
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

  stopExecution(cb) {
    this.executionStopped = true;
    this.cbAfterExecutionStopped = cb;
  }

  checkIfExecutionStopped() {
    // I know that it's not the best way but it kind of works :)
    // In future it should be done nicer
    if (this.executionStopped) {
      if (this.cbAfterExecutionStopped !== null) {
        this.cbAfterExecutionStopped();
      }
      throw new Error('Execution stopped');
    }
  }

  // TODO in future we can add speed and other motion params
  async run(codeTree, lineHighlighter) {
    // TODO handle other types of statement
    this.log("==========================================================");
    this.log("======================= GAME STARTED =====================");
    this.log("==========================================================");

    let tickNr = 0;

    const context = {field: this, state: this.state};

    function getValForExpr(expr, context) {
      if (expr.type == 'exprVal') {
        return expr.value;
      } else if (expr.type == 'funCallExpr') {
        // expr.name
        // return context.state.funtions
        throw 'Not implemented';
      } 
      throw 'Not implemented';
    }

    for (let node of codeTree) {

      this.checkIfExecutionStopped();

      switch (node.type) {
        case 'funCall': {
          Logger.debug('--------------------------------------------------------');
          Logger.debug(context);

          const method = this.methods[node.name];
          if (method) {
            // Running pre hook
            Logger.debug(`Running pre hook for tickNr: ${tickNr}`);
            await this.tickHooks.pre(tickNr, context);

            // TODO make running line highlighting better
            if (lineHighlighter) {
              lineHighlighter.start(node.line);
            }
            // Logger.debug(`Running ${node.line} line of code`);
            // Logger.debug(`Running method ${node.name}, arg list: ${JSON.stringify(node.args)}`);
            // Page.addLog(`Running method ${node.name}, arg list: ${JSON.stringify(node)}`);
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
        case 'varDecl': {
          const val = getValForExpr(node.expr);
          Logger.debug(`Setting val: ${val} for variable: ${node.name}`);
          context.state.vars[node.name] = val;
          break;
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
  async safeMove(id, offset, opts) {
    let obj = this.findById(id);
    let newPos = Position.safeAdd(obj.pos, offset);
    obj.pos = newPos;
    if (opts && opts.fast) {
      await Page.changeObjectPos(obj, 0);
    } else {
      await Page.changeObjectPos(obj, this.tickTime);
    }
    
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

  changeImageSize(id, newSize) {
    const obj = this.findById(id);
    obj.size = Object.assign(obj.size, newSize);
    Page.updateObjectSize(obj);
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