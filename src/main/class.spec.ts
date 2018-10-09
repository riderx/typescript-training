describe('class', () => {

  it('has a constructor for initialization', () => {
    // Create a Musician class
    // Add a constructor that takes one param, the instrument.
    // Set this.instrument to the instrument passed in
    class Musician {
      instrument: String;
      constructor(instrument: string) {
        this.instrument = instrument;
      }
    }

    const musician = new Musician()
    const ringo = new Musician('drums')

    expect(musician.instrument).toBeUndefined()
    expect(ringo.instrument).toBe('drums')
  })

  it('constructor can have default param values', () => {
    // Create a Musician class with a constructor
    // Make your class default (using default params) the instrument to 'guitar'
    class Musician {
      public instrument: String;
      constructor(public anInstrument: string = "guitar") {
        this.instrument = anInstrument;
      }
    }

    const john = new Musician()
    const ringo = new Musician('drums')

    expect(john.instrument).toBe('guitar')
    expect(ringo.instrument).toBe('drums')
  })

  it('can have instance methods', () => {
    // Create a Musician class, pass in the instrument to the constructor,
    // and add a play function to the class definition
    class Musician {
      instrument: String;
      constructor(instrument: string) {
        this.instrument = instrument;
      }
      public play() {
        return "I'm playing drums"
      }
    }

    const musician = new Musician()

    expect(musician.play).toBeDefined()
    // expect(Musician.play).toBeUndefined()
    expect(musician.play()).toBe("I'm playing drums")
  })

  it('can have static methods and properties', () => {
    // Create a Musician class, pass in the instrument to the constructor,
    // create a static property instances (that will hold all created instances) and
    // create a static method create that encapsulates calling constructor
    //   and storing the reference (in instances array) and returns the instance
    class Musician {
      public instrument: String;
      public static instances: Array<Musician> = [];
      constructor(instrument: string) {
        this.instrument = instrument;
      }
      public static create(instrument: string) {
        let instance;
        if (instrument) {
          instance = new Musician(instrument);
        } else {
          instance = new Musician();
        }
        Musician.instances.push(instance);
        return instance;
      }
    }

    expect(Musician.create).toBeDefined()
    expect(Musician.instances.length).toBe(0)

    const john = Musician.create()
    // expect(john.create).toBeUndefined()
    expect(Musician.instances.length).toBe(1)

    const ringo = Musician.create('drums')
    // expect(ringo.create).toBeUndefined()
    expect(Musician.instances.length).toBe(2)
  })

  it('can extend another class', () => {
    // Create a Musician class
    // Create a Rockman class that extends Musician
    // Add play method to Musician
    class Musician {
      instrument: String;
      constructor(instrument: string) {
        this.instrument = instrument;
      }
      public play() {
        return "I'm playing guitar"
      }
    }

    class Rockman extends Musician {
      instrument: String;
      constructor(instrument: string) {
        super(instrument);
      }
    }

    const rockman = new Rockman()

    expect(rockman instanceof Rockman).toBe(true)
    expect(rockman instanceof Musician).toBe(true)
    expect(rockman.play()).toBe("I'm playing guitar")
  })

  it('can use property setters and getters', () => {
    // Create a Musician class, pass in the instrument to the constructor,
    // Add property getter for description
    class Musician {
      private _instrument: String;

      constructor(instrument: string) {
        this._instrument = instrument;
      }
      get description(): String {
        return "this musician plays " + this._instrument;
      }
    }

    const guitarist = new Musician('guitar')
    const drummer = new Musician('drums')

    expect(guitarist.description).toBe('this musician plays guitar')
    expect(drummer.description).toBe('this musician plays drums')
  })

  it('can use property setters and getters', () => {
    // Create a Musician class
    // Add property getter for allBands
    // - it will return a string describing all the bands that this musician played in
    // Add property setter for band
    // - it will add this band to the list of musician's bands'. How to store them?
    class Musician {
      private _instrument: String;
      private _band: String;
      private _allbands: Array<String> = [];

      constructor(instrument: string, band: string) {
        this._instrument = instrument;
      }
      get allBands(): String {
        let res = "this musician played in ";
        for (let i = 0; i < this._allbands.length; i++) {
          if (i === 0 && this._allbands.length === 1) {
            res = res + this._allbands[i];
          } else {
            if (i + 1 === this._allbands.length) {
              res = res + this._allbands[i];
            } else {
              res = res + this._allbands[i] + ", ";
            };
          };
        };
        return res;
      };
      set band(aband: String) {
        this._band = aband;
        this._allbands.push(this._band);
      }
    }

    const musician = new Musician()

    musician.band = 'ABBA'
    expect(musician.allBands).toBe('this musician played in ABBA')
    musician.band = 'Rolling Stones'
    expect(musician.allBands).toBe('this musician played in ABBA, Rolling Stones')
    musician.band = 'Iron Maiden'
    expect(musician.allBands).toBe('this musician played in ABBA, Rolling Stones, Iron Maiden')
  })
})
