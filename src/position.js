let Position = {

  add(pos, offset) {
    return {
      x: pos.x + offset.x,
      y: pos.y + offset.y
    };
  },

  safeAdd(pos, offset) {
    return {
      x: Math.max(0, Math.min(100, pos.x + offset.x)),
      y: Math.max(0, Math.min(100, pos.y + offset.y))
    };
  }

}

export default Position;