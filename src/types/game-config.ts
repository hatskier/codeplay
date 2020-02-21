/////////////////////////////////////////
// TYPE DEFINITIONS FOR CODEPLAY TASKS //
/////////////////////////////////////////

GameConfigT : {
  // Screen
  images: Object<ImgKeyT, UrlT>, // All images that will be used with symbolic names
  size: SizeT,
  bg: ImgKeyT, // Initial background
  objects: [ObjectT], // Initial objects

  // Logic
  methods: Object<MethodNameT, MethodDeclT>,

  // Tick pre hook is executed before each iteration
  // post - after
  tickHooks: {
    pre: TickHookT,
    post: TickHookT,
  },

  // Number of objects in the array defines the number of iterations
  // For each iteration: pre is executed before it, post - after
  iterations: [{
    pre: IterationHookT,
    post: IterationHookT,
  }],

  // Task
  taskDescription: String,
  startCodeVal: String,
  solutionCode: String,
}

ImgKeyT: String // Key names for images
UrlT: String // Real urls
MethodNameT: String // Should not start with . or digit

// Object on field properties
ObjectT: {
  id: String,

  kind: String, // enum: ['html', 'img']
  html: String, // only for 'html' kind 
  img: ImgKeyT, // only for 'img' kind

  style: Object, // with css styles
  size: SizeT,
  startPos: PosT,
}

// Available instructions declaration
MethodDeclT: {
  doc: String, // method description
  examples: String, // method usage example (in html)
  run: Function(context: ContextT, params: Array), // async
}

// Hook functions (allows to implement complicated logic)
TickHookT: Function(tickNr: Number, context: ContextT) // async
IterationHookT: Function(context: ContextT) // async

// Game context
ContextT: {
  field: FieldT, // Field class
  state: StateT,
}

FieldT: {
  changeBg(newBgKey: ImgKeyT),
  addObject(obj: ObjectT) : ObjectT, // returns object with generates id if was not specified
  removeObject(id: String),
  isVariableDeclared(varName: String): Boolean,
  findById(id: String): ObjectT,
  changeImage(id: String, imgKey: ImgKeyT),
  changeImageSize(is: String, newSize: SizeT),

  async safeMove(id: String, offset: PosT, opts: { fast?: Boolean }), // fast means instant
  async moveToPos(id: String, pos: PosT),
  async rotate(id: String, degrees: Number),

  async tickSleep(),
  async sleep(ms: Number),
}

// Helpful object
// You can store custom helpful trash inside
StateT: {
  vars: Object,
  functions: Object,
  funResults: Object, // used to add helpful values, like perfectDistance
}

// Position in percents
PosT: {
  x: Number,
  y: Number,
}

// Size in pixels
SizeT: {
  width: Number,
  height: Number,
}
