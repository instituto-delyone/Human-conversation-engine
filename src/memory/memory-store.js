export class MemoryStore {
  constructor(){this.shortTerm=[];this.longTerm=[];}
  addTurn(turn){this.shortTerm.push(turn);if(this.shortTerm.length>20)this.shortTerm.shift();}
  remember(item){if(item && !this.longTerm.some(x=>x.key===item.key)) this.longTerm.push(item);}
  retrieve(query="",limit=8){
    const q=query.toLowerCase();
    const score=x=>String(x.text||x.value||x.key||"").toLowerCase().split(/\\s+/).filter(Boolean).filter(w=>q.includes(w)).length;
    return [...this.longTerm.map(x=>({...x,source:"long_term"})),...this.shortTerm.map(x=>({...x,source:"short_term"}))]
      .map(x=>({...x,_score:score(x)})).sort((a,b)=>b._score-a._score).slice(0,limit);
  }
  snapshot(){return {shortTerm:this.shortTerm,longTerm:this.longTerm};}
}
