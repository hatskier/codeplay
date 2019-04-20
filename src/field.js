import Position from './position';
import ObjectOnField from './objectOnField';
import Page from './page';
// import Logger from './logger';

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
  // TODO in future we should handle real tree
  async run(codeTree) {
    for (let codeLine of codeTree) {
      await this.methods[codeLine].run({field: this});
    }
    return this.grade({field: this});
  }

  findById(id) {
    return this.objects[id];
  }

  async safeMove(id, offset) {
    let obj = this.findById(id);
    let newPos = Position.safeAdd(obj.pos, offset);
    await Page.changeObjectPos(id, newPos);
    obj.pos = newPos;
  }

  checkPosById(id, pos) {
    return JSON.stringify(this.findById(id).pos) === JSON.stringify(pos);
  }

}

export default Field;