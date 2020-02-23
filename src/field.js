import Position from './position';
import ObjectOnField from './object-on-field';
import Page from './page';
import Logger from './logger';
// import Translation from './translation';

const DEFAULT_TICK_TIME = 500;
const WHILE_LOOP_MAX_ITERATIONS_NUMBER = 30;

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

    this.state = {
      vars: {},
      functions: {},
      funResults: {},
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

  removeObjects({ filter }) {
    for (let objectId in this.objects) {
      let object = this.objects[objectId];
      if (!filter || filter(object)) {
        this.removeObject(objectId);
      }
    }
  }

  // Should not be used from game config level
  clear() {
    Page.clearAll();
  }

  setSpeed(speed) {
    switch (speed) {
      case 'fast':
        this.tickTime = 200;
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

  //////////////////////////
  // Functions for variables
  //////////////////////////

  isVariableDeclared(varName) {
    return (varName in this.state.vars);
  }

  getValForExpr(expr) {
    if (expr.type == 'exprVal') {
      return expr.value;
    } else if (expr.type == 'varExpr') {
      if (!this.isVariableDeclared(expr.name)) {
        this.log(`You were trying to use an undeclared variable "${expr.name}"`, { error: true });
        throw new Error(`Trying to use an undeclared variable "${expr.name}"`);
      }

      const val = this.state.vars[expr.name];

      if (val == null) {
        this.log(`You were trying to use an empty variable "${expr.name}"`
                 + 'Please assign it with some value before', { error: true });
        throw new Error(`Trying to use an empty variable "${expr.name}"`);
      }

      return this.state.vars[expr.name];
    } else if (expr.type == 'exprPlus') {
      return this.getValForExpr(expr.exprs[0])
             + this.getValForExpr(expr.exprs[1]);
    } else if (expr.type == 'exprMinus') {
      return this.getValForExpr(expr.exprs[0])
             - this.getValForExpr(expr.exprs[1]);
    } else if (expr.type == 'funCallExpr') {
      // TODO it's hacky but it is enough for now
      return this.state.funResults[expr.name];
    }
    throw 'Not implemented';
  }

  getBoolValForExpr(expr) {
    switch (expr.type) {
      case 'gtExpr': {
        return this.getValForExpr(expr.exprs[0]) > this.getValForExpr(expr.exprs[1]);
      }
      case 'ltExpr': {
        return this.getValForExpr(expr.exprs[0]) < this.getValForExpr(expr.exprs[1]);
      }
      case 'eqExpr': {
        return this.getValForExpr(expr.exprs[0]) == this.getValForExpr(expr.exprs[1]);
      }
      case 'neqExpr': {
        return this.getValForExpr(expr.exprs[0]) != this.getValForExpr(expr.exprs[1]);
      }
      case 'exprVal': {
        if (expr.value == true) {
          return true;
        }
        if (expr.value == false) {
          return false;
        }

        // TODO refactor it
        let errMsg = 'Bad condition inside ()';
        this.log(errMsg, {error: true});
        throw new Error(errMsg);
      }
      default: {
        let errMsg = 'Bad condition inside ()';
        this.log(errMsg, {error: true});
        throw new Error(errMsg);
      }
    }
  }

  setVariableValue(varName, val, mustBeDeclared) {
    if (mustBeDeclared && !this.isVariableDeclared(varName)) {
      const errMsg =
        `Variable "${varName}" does not exist. It can be created using "var ${varName};"`;
      this.log(errMsg, {error: true});
      Logger.error(errMsg);
      throw new Error(errMsg);
    }

    Logger.debug(`Setting val: ${val} for variable: ${varName}`);
    this.state.vars[varName] = val;
  }


  // Functions for functions
  setFunArgsAndStatements(funName, args, stmts) {
    Logger.debug(`Function declaration: ${funName}`);
    this.state.functions[funName] = {
      args,
      stmts,
    };
  }

  isFunctionDeclared(funName) {
    return (funName in this.state.functions);
  }

  showProgramState() {
    // this.log('-----------------------------');
    for (let varName in this.state.vars) {
      let val = this.state.vars[varName];
      
      // if (val == null) {
      //   this.log(`Переменная "${varName}" пока пустая`);
      // } else {
      //   this.log(`Переменная "${varName}" равняется ${val}`);
      // }
    }
    // this.log('-----------------------------');

    // Update variables in variables tables
    Page.updateVariablesTable(this.state.vars);
  }

  //////////////////////////

  // TODO in future we can add speed and other motion params
  async run(codeTree, lineHighlighter) {
    // TODO handle other types of statement
    this.log("====================================================");
    this.log("=================== ИГРА НАЧАЛАСЬ ==================");
    this.log("====================================================");

    // TODO remove
    console.log(codeTree);

    let tickNr = 0;

    const context = {field: this, state: this.state};

    // To prevent showing non-friendly message that "codeTree is not iterable"
    if (!codeTree || !Array.isArray(codeTree)) {
      throw new Error('The code is incorrect. It should contain at least one instruction. Green lines (with //) are ignored by program executor');
    }

    for (let node of codeTree) {

      this.checkIfExecutionStopped();

      if (lineHighlighter) {
        lineHighlighter.start(node.line);
      }

      switch (node.type) {
        case 'funCall': {
          // Logger.debug('--------------------------------------------------------');
          // Logger.debug(context);

          const method = this.methods[node.name];
          if (method) {
            // Running pre hook
            Logger.debug(`Running pre hook for tickNr: ${tickNr}`);
            await this.tickHooks.pre(tickNr, context);

            // TODO make running line highlighting better
            // if (lineHighlighter) {
            //   lineHighlighter.start(node.line);
            // }
            // Logger.debug(`Running ${node.line} line of code`);
            // Logger.debug(`Running method ${node.name}, arg list: ${JSON.stringify(node.args)}`);
            // Page.addLog(`Running method ${node.name}, arg list: ${JSON.stringify(node)}`);

            // Evaluate values for each argument
            let argValues = [];
            if (node.args && node.args.length > 0) {
              node.args.forEach(function(nodeArg) {
                let argVal = context.field.getValForExpr(nodeArg);
                argValues.push(argVal);
              });
            }

            await method.run(context, argValues);
            // TODO make running line highlighting better
            // if (lineHighlighter) {
            //   lineHighlighter.stop(node.line);
            // }

            // Running post hook
            Logger.debug(`Running post hook for tickNr: ${tickNr}`);
            await this.tickHooks.post(tickNr, context);
            tickNr++;
          } else if (this.isFunctionDeclared(node.name)) {
            // TODO implement argument support for function calls
            await this.tickSleep();
            let { args, stmts } = this.state.functions[node.name];
            if (stmts.length > 0) {
              await this.run(stmts, lineHighlighter);
            }
          } else {
            const errMsg = `Instruction ${node.name} was not found`;
            Logger.error(errMsg);
            throw new Error(errMsg);
          }
          break;
        }
        case 'ifElseStm': {
          await this.tickSleep();
          if (this.getBoolValForExpr(node.expr)) {
            Logger.debug('Running if statements');
            if (node.ifStmts.length > 0) {
              await this.run(node.ifStmts, lineHighlighter);
            }
          } else {
            Logger.debug('Running else statements');
            if (node.ifStmts.length > 0) {
              await this.run(node.elseStmts, lineHighlighter);  
            }
          }
          break;
        }
        // TODO test this case
        case 'whileStm': {
          await this.tickSleep();
          let loopCounter = 0;
          while (this.getBoolValForExpr(node.expr)) {
            // Highligh line with the condition expression in each loop iteration
            lineHighlighter.start(node.line);
            await this.tickSleep();

            Logger.debug(`Running while iteration nr: ${loopCounter}`);
            loopCounter++;
            if (node.stmts.length > 0) {
              await this.run(node.stmts, lineHighlighter);
            }
            if (loopCounter > WHILE_LOOP_MAX_ITERATIONS_NUMBER) {
              throw new Error('Maximum loop iterations number exceeded');
              break;
            }
          }
          break;
        }
        case 'funDecl': {
          await this.tickSleep();
          this.setFunArgsAndStatements(node.name, node.args, node.stmts);
          break;
        }
        case 'varDeclEmpty': {
          await this.tickSleep();
          // TODO alex 123
          alert('Here it is 1');
          this.setVariableValue(node.name, null, false);
          break;
        }
        case 'varDecl': {
          await this.tickSleep();
          const val = this.getValForExpr(node.expr, false);
          this.setVariableValue(node.name, val);
          break;
        }
        case 'varAssign': {
          await this.tickSleep();
          const val = this.getValForExpr(node.expr);
          this.setVariableValue(node.name, val, true);
          break;
        }
        default: {
          const errMsg = 'Other statements not allowed';
          Logger.error(errMsg);
          throw new Error(errMsg);
        }
      }

      this.showProgramState();
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

  // TODO
  // check why this function even exists
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

  changeImage(id, imgKey) {
    const obj = this.findById(id);
    obj.changeImage(imgKey);
    Page.changeObjectImg(id, obj.img.src);
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

  async tickSleep() {
    await this.sleep(this.tickTime);
  }

  // TODO remove
  // Looks like deprecated functions
  checkPosById(id, pos) {
    return JSON.stringify(this.findById(id).pos) === JSON.stringify(pos);
  }

}

export default Field;