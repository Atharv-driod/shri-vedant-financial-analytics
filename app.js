(async () => {
    function parseCSV(text) {
        const rows = [];
        let row = [], field = "", quoted = false;

        for (let i = 0; i < text.length; i++) {
            const ch = text[i], next = text[i + 1];

            if (quoted) {
                if (ch === '"' && next === '"') {
                    field += '"';
                    i++;
                } else if (ch === '"') {
                    quoted = false;
                } else {
                    field += ch;
                }
            } else {
                if (ch === '"') quoted = true;
                else if (ch === ',') {
                    row.push(field);
                    field = "";
                } else if (ch === '\n') {
                    row.push(field);
                    rows.push(row);
                    row = [];
                    field = "";
                } else if (ch !== '\r') {
                    field += ch;
                }
            }
        }

        if (field || row.length) {
            row.push(field);
            rows.push(row);
        }

        const headers = rows.shift().map((h, i) =>
            i === 0 ? h.replace(/^\uFEFF/, "").trim() : h.trim()
        );

        return rows.filter(r => r.some(v => v.trim()))
            .map(r => Object.fromEntries(
                headers.map((h, i) => [h, (r[i] || "").trim()])
            ));
    }

    async function loadCSV(file, dateColumn) {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error("Unable to load " + file);
        }

        const records = parseCSV(await response.text());

        if (dateColumn) {
            records.forEach(r => {
                const match = r[dateColumn]?.match(
                    /^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/
                );

                if (match) {
                    const months = {
                        Jan:"01", Feb:"02", Mar:"03",
                        Apr:"04", May:"05", Jun:"06",
                        Jul:"07", Aug:"08", Sep:"09",
                        Oct:"10", Nov:"11", Dec:"12"
                    };

                    r[dateColumn] =
                        `${match[3]}-${months[match[2]]}-${match[1].padStart(2,"0")}`;
                }
            });
        }

        return records;
    }

    const [sales, products, expenses, purchases, vendors] =
        await Promise.all([
            loadCSV("sales.csv", "Date"),
            loadCSV("products.csv"),
            loadCSV("expenses.csv", "Date"),
            loadCSV("purchases.csv", "Purchase Date"),
            loadCSV("Vendors.csv")
        ]);

    const D = { sales, products, expenses, purchases, vendors };
const $ = id => document.getElementById(id);
const fmt = n => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(Number(n)||0);
const num = n => Number(n)||0;
const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const monthKey = s => {const d=new Date(s+'T00:00:00');return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`};
const monthLabel = k => {const [y,m]=k.split('-');return `${monthNames[Number(m)-1]} ${y}`};
const allMonths = [...new Set(D.sales.map(x=>monthKey(x.Date)))].sort();
allMonths.forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=monthLabel(k);$('monthFilter').appendChild(o)});
let selected='all';
$('monthFilter').addEventListener('change',e=>{selected=e.target.value;render()});
$('resetFilter').addEventListener('click',()=>{$('monthFilter').value='all';selected='all';render()});
const filtered = rows => selected==='all'?rows:rows.filter(x=>monthKey(x.Date||x['Purchase Date'])===selected);
function aggregate(rows,key,value){const m={};rows.forEach(r=>{const k=r[key]||'Unspecified';m[k]=(m[k]||0)+num(r[value])});return m}
function sum(rows,key){return rows.reduce((a,r)=>a+num(r[key]),0)}
function setKpi(id,value,cls=''){const el=$(id);el.textContent=value;el.className=cls}
function canvas(id){const c=$(id),ctx=c.getContext('2d'),w=c.clientWidth,h=Number(c.getAttribute('height'))||260,dpr=window.devicePixelRatio||1;c.width=w*dpr;c.height=h*dpr;ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);return {ctx,w,h}}
const palette=['#2f6fb3','#1a9a91','#8b6bb1','#e29b43','#d35d67','#5b8f72','#6d829e','#b28a55'];
function drawBars(id,labels,values,{horizontal=false,color='#2f6fb3',money=true}={}){
 const {ctx,w,h}=canvas(id),left=horizontal?125:42,right=18,top=12,bottom=horizontal?20:38;
 const max=Math.max(1,...values.map(Math.abs))*1.12;
 ctx.font='11px Segoe UI';ctx.fillStyle='#738196';ctx.strokeStyle='#e8edf3';ctx.lineWidth=1;
 if(horizontal){
  const row=(h-top-bottom)/Math.max(labels.length,1);
  labels.forEach((l,i)=>{let y=top+i*row+row*.2,bh=row*.58,bw=(w-left-right)*Math.max(0,values[i])/max;ctx.fillStyle='#627187';ctx.textAlign='right';ctx.fillText(l,left-9,y+bh*.75);ctx.fillStyle=Array.isArray(color)?color[i%color.length]:color;ctx.fillRect(left,y,bw,bh);ctx.fillStyle='#637186';ctx.textAlign='left';ctx.fillText(money?fmt(values[i]):String(Math.round(values[i])),Math.min(left+bw+5,w-right-48),y+bh*.75)});
 }else{
  const plotH=h-top-bottom,plotW=w-left-right;
  for(let i=0;i<4;i++){let y=top+plotH*i/3;ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(w-right,y);ctx.stroke();ctx.fillStyle='#8390a1';ctx.textAlign='right';ctx.fillText(money?fmt(max*(1-i/3)).replace('₹','₹ '):String(Math.round(max*(1-i/3))),left-6,y+4)}
  const slot=plotW/Math.max(labels.length,1),bw=Math.min(34,slot*.56);
  labels.forEach((l,i)=>{let bh=plotH*Math.max(0,values[i])/max,x=left+i*slot+(slot-bw)/2,y=top+plotH-bh;ctx.fillStyle=color;ctx.fillRect(x,y,bw,bh);ctx.fillStyle='#66758a';ctx.textAlign='center';ctx.fillText(l,x+bw/2,h-12)});
 }
}
function drawMulti(id,labels,series){
 const {ctx,w,h}=canvas(id),left=58,right=18,top=18,bottom=38,plotW=w-left-right,plotH=h-top-bottom;
 const max=Math.max(1,...series.flatMap(s=>s.values))*1.12;
 ctx.font='10px Segoe UI';ctx.strokeStyle='#e8edf3';ctx.fillStyle='#7c899a';ctx.textAlign='right';
 for(let i=0;i<=4;i++){let y=top+plotH*i/4;ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(w-right,y);ctx.stroke();ctx.fillText(fmt(max*(1-i/4)),left-7,y+4)}
 const xAt=i=>left+(labels.length<=1?0:i*plotW/(labels.length-1));
 labels.forEach((l,i)=>{ctx.fillStyle='#6e7d90';ctx.textAlign='center';ctx.fillText(l,xAt(i),h-12)});
 series.forEach(s=>{ctx.beginPath();s.values.forEach((v,i)=>{let x=xAt(i),y=top+plotH-(v/max)*plotH;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.strokeStyle=s.color;ctx.lineWidth=2.5;ctx.stroke();s.values.forEach((v,i)=>{let x=xAt(i),y=top+plotH-(v/max)*plotH;ctx.beginPath();ctx.arc(x,y,3.5,0,Math.PI*2);ctx.fillStyle=s.color;ctx.fill()})});
 const legendY=12;let lx=left;series.forEach(s=>{ctx.fillStyle=s.color;ctx.fillRect(lx,legendY-7,9,9);ctx.fillStyle='#65748a';ctx.textAlign='left';ctx.fillText(s.name,lx+13,legendY+1);lx+=ctx.measureText(s.name).width+35});
}
function drawDonut(id,labels,values){
 const {ctx,w,h}=canvas(id),total=values.reduce((a,b)=>a+b,0)||1,cx=w/2,cy=h/2,r=Math.min(w,h)*.34,ri=r*.58;let a=-Math.PI/2;
 values.forEach((v,i)=>{let b=a+Math.PI*2*v/total;ctx.beginPath();ctx.arc(cx,cy,r,a,b);ctx.arc(cx,cy,ri,b,a,true);ctx.closePath();ctx.fillStyle=palette[i%palette.length];ctx.fill();a=b});
 ctx.textAlign='center';ctx.fillStyle='#17314e';ctx.font='bold 17px Segoe UI';ctx.fillText(fmt(total),cx,cy+2);ctx.font='10px Segoe UI';ctx.fillStyle='#8290a2';ctx.fillText('Revenue',cx,cy+18);
 $('categoryLegend').innerHTML=labels.map((l,i)=>`<span><i class="dot" style="background:${palette[i%palette.length]}"></i>${l}: ${((values[i]/total)*100).toFixed(1)}%</span>`).join('');
}
function fillTable(id,rows){$(id).innerHTML=rows.join('')||'<tr><td colspan="5">No records for this selection</td></tr>'}
function render(){
 const s=filtered(D.sales),e=filtered(D.expenses),revenue=sum(s,'Total Revenue'),cogs=sum(s,'Total Cost (COGS)'),gp=sum(s,'Gross Profit'),ex=sum(e,'Amount (₹)'),op=gp-ex,gm=revenue?gp/revenue*100:0;
 setKpi('kpiRevenue',fmt(revenue));setKpi('kpiGross',fmt(gp));setKpi('kpiGrossMargin',gm.toFixed(1)+'%');setKpi('kpiOperating',fmt(op),op<0?'negative':'positive');setKpi('kpiExpenses',fmt(ex));setKpi('kpiInventory',fmt(sum(D.products,'Inventory Value (₹)')));
 $('profitNote').innerHTML=op<0?`<b>Management observation:</b> Recorded expenses exceed gross profit by ${fmt(Math.abs(op))} for the selected period. Review expense drivers and gross margin improvement opportunities. This is a simplified operating result from the supplied records.`:`<b>Management observation:</b> Gross profit exceeds recorded expenses by ${fmt(op)} for the selected period. Continue monitoring category and product-level margins.`;
 const months=allMonths.filter(k=>selected==='all'||k===selected);
 const revBy=aggregate(s,'__month','Total Revenue');
 const monthlyRows=months.map(k=>{const sr=s.filter(x=>monthKey(x.Date)===k),er=e.filter(x=>monthKey(x.Date)===k);return {k,rev:sum(sr,'Total Revenue'),gp:sum(sr,'Gross Profit'),ex:sum(er,'Amount (₹)')}});
 drawMulti('monthlyChart',monthlyRows.map(x=>monthNames[Number(x.k.slice(5))-1]),[
  {name:'Revenue',values:monthlyRows.map(x=>x.rev),color:'#2f6fb3'},
  {name:'Gross profit',values:monthlyRows.map(x=>x.gp),color:'#1a9a91'},
  {name:'Expenses',values:monthlyRows.map(x=>x.ex),color:'#d58b3b'}
 ]);
 const cat=aggregate(s,'Category','Total Revenue');const catEntries=Object.entries(cat).sort((a,b)=>b[1]-a[1]);drawDonut('categoryChart',catEntries.map(x=>x[0]),catEntries.map(x=>x[1]));
 const pay=aggregate(s,'Payment Mode','Total Revenue');const payE=Object.entries(pay).sort((a,b)=>b[1]-a[1]);drawBars('paymentChart',payE.map(x=>x[0]),payE.map(x=>x[1]),{horizontal:true});
 const ec=aggregate(e,'Expense Category','Amount (₹)'),ee=Object.entries(ec).sort((a,b)=>b[1]-a[1]);drawBars('expenseChart',ee.map(x=>x[0]),ee.map(x=>x[1]),{horizontal:true});
 const pAgg={};s.forEach(r=>{let p=r['Product Name'];pAgg[p]=(pAgg[p]||0)+num(r['Gross Profit'])});const top=Object.entries(pAgg).sort((a,b)=>b[1]-a[1]).slice(0,5);drawBars('productChart',top.map(x=>x[0]),top.map(x=>x[1]),{horizontal:true});
 const profitRows=Object.entries(pAgg).map(([name,profit])=>{const rows=s.filter(r=>r['Product Name']===name),rev=sum(rows,'Total Revenue');return {name,profit,rev,margin:rev?profit/rev*100:0}}).sort((a,b)=>b.profit-a.profit);
 fillTable('profitTable',profitRows.slice(0,12).map(x=>`<tr><td>${x.name}</td><td>${fmt(x.rev)}</td><td>${fmt(x.profit)}</td><td>${x.margin.toFixed(1)}%</td></tr>`));
 const stocks=D.products.slice().sort((a,b)=>num(a['Closing Stock'])-num(b['Closing Stock']));
 fillTable('stockTable',stocks.map(x=>`<tr><td>${x['Product Name']}</td><td>${num(x['Closing Stock']).toLocaleString('en-IN')}</td><td>${fmt(x['Inventory Value (₹)'])}</td><td class="${String(x['Stock Status']).toLowerCase().includes('low')?'status-low':'status-ok'}">${x['Stock Status']}</td></tr>`));
 const ven=aggregate(D.purchases,'Vendor Name','Purchase Value (₹)'),vqty=aggregate(D.purchases,'Vendor Name','Quantity Purchased');const ve=Object.entries(ven).sort((a,b)=>b[1]-a[1]);
 fillTable('vendorTable',ve.map(x=>`<tr><td>${x[0]}</td><td>${fmt(x[1])}</td><td>${num(vqty[x[0]]).toLocaleString('en-IN')}</td></tr>`));
 const expAll=aggregate(e,'Expense Category','Amount (₹)'),expTot=sum(e,'Amount (₹)'),exEntries=Object.entries(expAll).sort((a,b)=>b[1]-a[1]);
 fillTable('expenseTable',exEntries.map(x=>`<tr><td>${x[0]}</td><td>${fmt(x[1])}</td><td>${expTot?(x[1]/expTot*100).toFixed(1):'0.0'}%</td></tr>`));
 $('dataQuality').textContent=`Data coverage: sales ${D.sales.length} transactions; expenses ${D.expenses.length} records; purchases ${D.purchases.length} purchase lines; ${D.products.length} products; ${D.vendors.length} vendors. Sales and expense charts respond to the month filter. Inventory and procurement tables use their full supplied datasets.`;
}
render();
window.addEventListener('resize',()=>render());
})();
