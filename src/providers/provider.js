export class Provider {
  async generate(){throw new Error("Provider.generate() must be implemented");}
}

export class EchoProvider extends Provider {
  async generate({message}) { return {text:`Entendi: ${message}`,citations:[]}; }
}
