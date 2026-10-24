(()=>{'use strict';
const $=id=>document.getElementById(id),KEY='dealhunter-v3-price-watch';
let items=[];
try{const raw=JSON.parse(localStorage.getItem(KEY)||'[]');if(Array.isArray(raw))items=raw.filter(x=>x&&Array.isArray(x.history)&&(validAsin(x.asin)||validShort(x.shortUrl)));}catch{}
function validAsin(x){return typeof x==='string'&&/^[A-Z0-9]{10}$/.test(x)}
function validShort(x){return typeof x==='string'&&/^https:\/\/a\.co\/[A-Za-z0-9]+$/.test(x)}
const msg=s=>$('message').textContent=s;
const money=n=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(n);
function product(raw){
 let u;try{u=new URL(raw.trim())}catch{throw Error('Enter a complete Amazon.ca or a.co product URL.')}
 if(u.protocol!=='https:'||u.username||u.password||u.port)throw Error('Use a secure Amazon product URL.');
 if(u.hostname==='a.co'){
  if(!/^\/[A-Za-z0-9]+\/?$/.test(u.pathname)||u.search||u.hash)throw Error('Enter a valid a.co product link.');
  return {shortUrl:'https://a.co'+u.pathname.replace(/\/$/,'')};
 }
 if(!['amazon.ca','www.amazon.ca','smile.amazon.ca'].includes(u.hostname))throw Error('Use an Amazon.ca or a.co product URL.');
 const m=u.pathname.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})(?:\/|$)/i);
 if(!m)throw Error('Cannot find a 10-character Amazon ASIN.');
 return {asin:m[1].toUpperCase()};
}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(items));return true}catch{msg('Browser storage is unavailable or full.');return false}}
function render(){
 const root=$('list');root.replaceChildren();
 if(!items.length){root.textContent='No products recorded yet.';return}
 for(const item of items){
  const el=document.createElement('div');el.className='item';
  const title=document.createElement('h3');title.textContent=item.name;el.append(title);
  const link=document.createElement('a');link.href=item.shortUrl||('https://www.amazon.ca/dp/'+item.asin);
  link.target='_blank';link.rel='noopener noreferrer';link.textContent='Open Amazon product ↗';el.append(link);
  if(item.shortUrl){const note=document.createElement('p');note.textContent='Shortened link: product identity not verified.';el.append(note)}
  const h=item.history.filter(x=>Number.isFinite(x.price)&&x.price>0);
  if(h.length){
   const current=h[h.length-1].price,low=Math.min(...h.map(x=>x.price)),first=h[0].price;
   const summary=document.createElement('p');summary.textContent='Latest: '+money(current)+' · Lowest recorded: '+money(low)+' · Change from first: '+money(current-first);el.append(summary);
   const details=document.createElement('details'),summary2=document.createElement('summary');summary2.textContent='Price history ('+h.length+' entries)';details.append(summary2);
   const ul=document.createElement('ul');for(const record of [...h].reverse()){const li=document.createElement('li');li.textContent=new Date(record.date).toLocaleString()+' — '+money(record.price);ul.append(li)}details.append(ul);el.append(details);
  }
  const del=document.createElement('button');del.textContent='Delete product';del.onclick=()=>{
   if(!confirm('Delete this product and its recorded history?'))return;
   items=items.filter(x=>x!==item);persist();render();
  };el.append(del);root.append(el);
 }
}
$('save').onclick=()=>{
 try{
  const identity=product($('url').value),name=$('name').value.trim(),price=Number($('price').value);
  if(!name||name.length>160)throw Error('Enter a product name (up to 160 characters).');
  if(!$('price').value.trim()||!Number.isFinite(price)||price<=0||price>1000000)throw Error('Enter a valid price above zero.');
  let item=items.find(x=>identity.asin?x.asin===identity.asin:x.shortUrl===identity.shortUrl);
  if(!item){item={...identity,name,history:[]};items.unshift(item)}else item.name=name;
  item.history.push({price:Math.round(price*100)/100,date:new Date().toISOString()});
  if(item.history.length>500)item.history=item.history.slice(-500);
  if(items.length>200)items=items.slice(0,200);
  if(persist()){msg(identity.shortUrl?'Price saved locally. Short link identity not verified.':'Price saved locally.');$('price').value='';render()}
 }catch(e){msg(e.message)}
};
$('export').onclick=()=>{
 const blob=new Blob([JSON.stringify({version:3,exported:new Date().toISOString(),products:items},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='deal-hunter-price-watch-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};render();
})();
