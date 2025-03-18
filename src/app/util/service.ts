// export default class Service {
//   private static instance: Service | null = null;

//   private constructor() {
//     // Private constructor prevents external instantiation
//   }

//   static getInstance(): Service {
//     if (!Service.instance) {
//       Service.instance = new Service();
//     }
//     return Service.instance;
//   }
// }

export default class Service {
  private static instances: Map<string, Service> = new Map();

  protected constructor() {
    // Protected constructor to prevent direct instantiation
  }

  static getInstance<T extends Service>(this: new () => T): T {
    const className = this.name;

    if (!Service.instances.has(className)) {
      Service.instances.set(className, new this());
    }

    return Service.instances.get(className) as T;
  }

  // Example shared method
  log(message: string): void {
    console.log(`[${this.constructor.name}]: ${message}`);
  }
}
