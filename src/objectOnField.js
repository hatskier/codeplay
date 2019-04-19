class ObjectOnField {
  constructor({id, img, startPos, size}, field) {
    this.id = id;
    this.pos = startPos;
    this.img = img;
    this.size = size;
    this.field = field;

    /* TODO this class is created with thoughts about the future
      when (probably) we will want to take some separate logic for objects */
  }
}

export default ObjectOnField;