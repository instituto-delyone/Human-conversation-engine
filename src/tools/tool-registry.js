export class ToolRegistry {
  constructor(){this.tools=new Map();}
  register(name,handler,meta={}){this.tools.set(name,{handler,meta});}
  has(name){return this.tools.has(name);}
  describe(){return [...this.tools.entries()].map(([name,x])=>({name,...x.meta}));}
  async execute(name,input){
    const tool=this.tools.get(name);
    if(!tool) throw new Error(`Unknown tool: ${name}`);
    const result=await tool.handler(input);
    return {tool:name,result};
  }
}
