import Position from './position';
import ObjectOnField from './objectOnField';
import Page from './page';
import Logger from './logger';

class Field {
  constructor({bg, objects, methods, grade, size}) {
    this.objects = {};
    for (let obj of objects) {
      this.objects[obj.id] = new ObjectOnField(obj, this);
    }
    this.methods = methods;
    this.bg = bg;
    this.grade = grade;
    this.size = size;
  }

  init() {
    Page.initEmptyScreen(this.bg, this.size);
    for (let id in this.objects) {
      let curObj = this.objects[id];
      Page.addObject(curObj);
    }
  }

  // TODO in future we can add speed and other motion params
  async run(codeTree) {
    // TODO handle while stmt
    for (let node of codeTree) {
      switch (node.type) {
        case 'funCall': {
          const method = this.methods[node.name];
          if (method) {
            Logger.info(`Running method ${node.name}, arg list: ${JSON.stringify(node.args)}`);
            await method.run({field: this}, node.args);
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
    return this.grade({field: this});
  }

  findById(id) {
    return this.objects[id];
  }

  async safeMove(id, offset) {
    let obj = this.findById(id);
    let newPos = Position.safeAdd(obj.pos, offset);
    await Page.changeObjectPos(id, newPos, obj.size);
    obj.pos = newPos;
  }

  checkPosById(id, pos) {
    return JSON.stringify(this.findById(id).pos) === JSON.stringify(pos);
  }

}

export default Field;