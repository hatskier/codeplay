class ObjectOnField {
  constructor({id, img, startPos, size, kind, html}, field) {
    if (id) {
      this.id = id;
    } else {
      this.id = 'random-id-' + Math.round(Math.random() * 10000000000000000);
    }
    this.pos = startPos;
    this.kind = kind;
    this.startPos = startPos;
    this.img = img;
    if (html) {
      this.html = html.replace('___ID___', this.id);
    }
    this.size = size;
    this.field = field;
    this.rotation = 0;

    /* TODO this class is created with thoughts about the future
      when (probably) we will want to take some separate logic for objects */
  }
}

export default ObjectOnField;