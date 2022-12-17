import './style.css';

import nlp from 'compromise';

function compromise_process(combination) {
  const result = nlp(combination)
      .out("json")
      .map(x => x.terms.map(x => 
        {
          const [first, ...rest] = x.tags;
          return {name:x.text,type:first,tags:rest}
        }))
  return result;
}

function describe(text)
{
  const parsed = compromise_process(text);
  const container = <div></div>
  
  for(const phrase of parsed)
  {
    const phrase_container = <div class="phrase"></div>
    phrase_container.parent(container)
    for(const word of phrase)
    {
      const ref = {}
      const data = 
      <div class="card">
        <div class="title item">{word.name}</div>
        <div class="item subtitle">{word.type}</div>
        <div class="body item" ref={ref} id="tags"></div>
      </div>
  
      data.parent(phrase_container)
      for(const tag of word.tags)
      {
        const ctag = <div>{tag}</div>
        ctag.parent(ref.tags)
      }
    }
  }
  return container;
}
describe("touch something hot causes you to burn your hands")
.parent(document.body)
