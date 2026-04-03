'use client';
import React,{useState,useEffect} from 'react';
import {StoreData,Product} from '@/lib/types';
import {Menu,Search,ShoppingCart,User,Star,Truck,RotateCcw,ShieldCheck,Plus,Minus,Check,Cpu,BatteryFull,Shield,Wifi,ScanFace,Droplets,Zap,Heart,Package,PlayCircle,BarChart} from 'lucide-react';
interface PDPProps { data:StoreData; product:Product; variant?:number; }
const C = {bgMain:'#000',bgWhite:'#111',bgImage:'#1A1A1A',textDark:'#FFF',textSub:'#888',primary:'#E02424',border:'#333',star:'#E02424',gradient:'linear-gradient(90deg, #E02424, #9B1C1C)'};
const fT = 'Inter, sans-serif'; const fS = 'Inter, sans-serif';
const REAL_IMG = 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&fit=crop';

export default function PdpCelularesBusiness({data,product}:PDPProps){
  const imgs = product.images?.length ? product.images : [REAL_IMG];
  const p = typeof product.price==='number'?product.price:parseFloat(String(product.price))||0;
  const ai = product.aiContent;
  const sec = ai?.sections;
  const fmtPrice = (n: number) => {
    const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Gs. ${str}`;
  };
  const op = typeof product.originalPrice==='number'?product.originalPrice:parseFloat(String(product.originalPrice))||0;
  const [aS, setAS] = useState<number|null>(null);
  const [aF, setAF] = useState<number|null>(null);
  const [s, setS] = useState(false);
  useEffect(()=>{
    const h = ()=>setS(window.scrollY>500);
    window.addEventListener('scroll',h); return ()=>window.removeEventListener('scroll',h);
  },[]);
  return (
    <div style={{background:C.bgMain,minHeight:'100vh',fontFamily:fS,color:C.textDark,WebkitFontSmoothing:'antialiased'}}>
      <nav style={{background:C.bgWhite,padding:'16px 24px',borderBottom:`2px solid ${C.primary}`,position:'sticky',top:0,zIndex:100}}>
        <div style={{maxWidth:1000,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Menu size={24} color={C.textDark} /><span style={{fontFamily:fT,fontSize:22,fontWeight:900,letterSpacing:'.1em'}}>CORP.COMMS</span>
          <div style={{display:'flex',gap:16}}><User size={20}/><Search size={20}/><ShoppingCart size={20}/></div>
        </div>
      </nav>
      <div style={{maxWidth:1000,margin:'0 auto',padding:'24px 24px 16px',fontSize:13,color:C.textSub,fontWeight:600,textTransform:'uppercase'}}>
        Celulares {'>'} Business {'>'} <span style={{color:C.primary}}>{ai?.enhancedTitle || product.title}</span>
      </div>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <div style={{padding:'0 24px 48px',display:'flex',gap:48,flexWrap:'wrap'}}>
          <div style={{flex:'1 1 400px'}}><div style={{background:C.bgImage,padding:40,height:400,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16,borderLeft:`4px solid ${C.primary}`}}><img src={imgs[0]} alt='' style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}} /></div></div>
          <div style={{flex:'1 1 400px'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'#310b0b',color:C.primary,padding:'6px 12px',fontSize:12,fontWeight:800,textTransform:'uppercase',marginBottom:16,border:`1px solid ${C.primary}`}}>Enterprise Edition</div>
            <h1 style={{fontFamily:fT,fontSize:40,fontWeight:900,lineHeight:1.1,marginBottom:16,textTransform:'uppercase'}}>{ai?.enhancedTitle || product.title}</h1>
            <p style={{fontSize:16,color:C.textSub,lineHeight:1.6,marginBottom:24}}>{ai?.enhancedDescription || product.description||'Rendimiento superior para corporaciones. Encriptación militar de extremo a extremo.'}</p>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:24}}><div style={{display:'flex'}}>{[1,2,3,4,5].map(i=><Star key={i} size={16} fill={C.star} color={C.star}/>)}</div><span style={{fontSize:15,fontWeight:700}}>4.9/5</span><span style={{fontSize:14,color:C.textSub}}>(Verificado B2B)</span></div>
            <button style={{width:'100%',padding:'16px',background:C.primary,color:'#fff',fontSize:16,fontWeight:800,border:'none',cursor:'pointer',marginBottom:16,textTransform:'uppercase'}}>Adquirir - {fmtPrice(p)} {op>p&&<span style={{textDecoration:'line-through',fontWeight:400,marginLeft:8,opacity:0.7}}>({fmtPrice(op)})</span>}</button>
            <div style={{display:'flex',justifyContent:'space-between',borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:'16px 0',marginBottom:16}}>
              <div style={{textAlign:'center',flex:1}}><Shield size={20} color={C.primary} style={{margin:'0 auto 8px'}}/><div style={{fontSize:12,fontWeight:700}}>Seguridad Knox</div></div>
              <div style={{textAlign:'center',flex:1}}><BatteryFull size={20} color={C.primary} style={{margin:'0 auto 8px'}}/><div style={{fontSize:12,fontWeight:700}}>Batería 48hs</div></div>
              <div style={{textAlign:'center',flex:1}}><BarChart size={20} color={C.primary} style={{margin:'0 auto 8px'}}/><div style={{fontSize:12,fontWeight:700}}>Garantía B2B</div></div>
            </div>
          </div>
        </div>
        <div style={{padding:'0 24px 48px',textAlign:'center'}}><p style={{fontSize:12,fontWeight:800,textTransform:'uppercase',letterSpacing:'.1em',marginBottom:24,color:C.textSub}}>Confían en nuestras soluciones:</p><div style={{display:'flex',justifyContent:'center',gap:48,flexWrap:'wrap',opacity:0.6}}>{['FORBES','BLOOMBERG','WSJ','TECHCRUNCH'].map(l=><span key={l} style={{fontFamily:fT,fontSize:20,fontWeight:900,color:C.primary,letterSpacing:'1px'}}>{l}</span>)}</div></div>
      </div>
      <div style={{background:C.bgWhite,padding:'64px 24px',borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}><h2 style={{fontFamily:fT,fontSize:28,fontWeight:900,textAlign:'center',marginBottom:48,textTransform:'uppercase'}}>Productividad.</h2>
          <div style={{display:'flex',gap:32,flexWrap:'wrap'}}>
            {[{i:<Cpu/>,t:'Tensor Gen4',d:'Llamadas 4K sin lag.'},{i:<ShieldCheck/>,t:'Aislamiento',d:'Contenedor cifrado.'},{i:<Wifi/>,t:'Global',d:'5G mundial.'}].map((b,i)=>(
              <div key={i} style={{flex:'1 1 250px',background:C.bgMain,padding:32,border:`1px solid ${C.border}`}}><div style={{marginBottom:20}}>{React.cloneElement(b.i as any,{size:32,color:C.primary})}</div><h4 style={{fontSize:16,fontWeight:800,marginBottom:8,textTransform:'uppercase'}}>{b.t}</h4><p style={{fontSize:14,color:C.textSub,lineHeight:1.6}}>{b.d}</p></div>
            ))}
          </div>
        </div>
      </div>
      <div style={{background:C.bgImage,padding:'80px 24px'}}>
        <div style={{maxWidth:1000,margin:'0 auto',display:'flex',gap:48,alignItems:'center',flexWrap:'wrap'}}>
          <div style={{flex:'1 1 400px'}}><h2 style={{fontFamily:fT,fontSize:32,fontWeight:900,textTransform:'uppercase',marginBottom:16}}>Construcción.</h2><p style={{fontSize:16,color:C.textSub,lineHeight:1.8,marginBottom:24}}>Fibra de carbono con magnesio. Pesa 175g pero soporta impactos severos.</p><button style={{padding:'14px 28px',border:`1px solid ${C.primary}`,background:'transparent',color:C.primary,fontWeight:800,textTransform:'uppercase'}}>Materiales</button></div>
          <div style={{flex:'1 1 400px',height:300,overflow:'hidden',border:`1px solid ${C.border}`}}><img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80" alt="Celular business detalle" style={{width:'100%',height:'100%',objectFit:'cover'}} /></div>
        </div>
      </div>
      <div style={{background:C.bgWhite,padding:'64px 24px',borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}><h2 style={{fontFamily:fT,fontSize:28,fontWeight:900,textAlign:'center',marginBottom:48,textTransform:'uppercase'}}>Flujo Inmediato.</h2>
          <div style={{display:'flex',justifyContent:'space-between',gap:32,flexWrap:'wrap'}}>
            {[{i:<Zap/>,t:'Express',d:'15 min = 50% batería.'},{i:<ScanFace/>,t:'Biometría 3D',d:'Desbloqueo facial.'},{i:<Check/>,t:'Modo Desktop',d:'PC al instante.'}].map((f,i)=>(
              <div key={i} style={{flex:'1 1 250px',textAlign:'center'}}><div style={{marginBottom:16}}>{React.cloneElement(f.i as any,{size:36,color:C.primary})}</div><h4 style={{fontSize:15,fontWeight:800,marginBottom:8,textTransform:'uppercase'}}>{f.t}</h4><p style={{fontSize:14,color:C.textSub,lineHeight:1.6,margin:'0 auto',maxWidth:220}}>{f.d}</p></div>
            ))}
          </div>
        </div>
      </div>
      <div style={{background:C.bgMain,padding:'64px 24px',borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}><h2 style={{fontFamily:fT,fontSize:28,fontWeight:900,textAlign:'center',marginBottom:48,textTransform:'uppercase'}}>Dominio.</h2>
          <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',textAlign:'left',minWidth:600}}><thead><tr><th style={{padding:20,borderBottom:`2px solid ${C.border}`}}></th><th style={{padding:20,background:C.bgImage,borderTop:`2px solid ${C.primary}`,fontWeight:900,color:C.textDark}}>Nuestra Opción</th><th style={{padding:20,borderBottom:`2px solid ${C.border}`,color:C.textSub}}>Consumo</th></tr></thead><tbody>
                {[{f:'Seguridad',c1:'5 Años',c2:'2 Años'},{f:'Chip',c1:<Check size={20} color={C.primary}/>,c2:<Minus size={20} color='#666'/>},{f:'Diseño',c1:<Check size={20} color={C.primary}/>,c2:<Minus size={20} color='#666'/>}].map((r,i)=><tr key={i}><td style={{padding:20,fontWeight:600,borderBottom:`1px solid ${C.border}`,color:C.textSub}}>{r.f}</td><td style={{padding:20,background:C.bgImage,fontWeight:800,color:C.primary,borderBottom:`1px solid ${C.border}`}}>{r.c1}</td><td style={{padding:20,borderBottom:`1px solid ${C.border}`,color:C.textSub}}>{r.c2}</td></tr>)}
          </tbody></table></div>
        </div>
      </div>
      <div style={{background:C.bgWhite,padding:'64px 24px'}}><div style={{maxWidth:1000,margin:'0 auto'}}><h2 style={{fontFamily:fT,fontSize:28,fontWeight:900,textAlign:'center',marginBottom:48,textTransform:'uppercase'}}>Operación.</h2><div style={{display:'flex',gap:32,flexWrap:'wrap'}}>
            {[{t:'1. Log-in',d:'Doble factor rápido.',img:'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80'},{t:'2. Sinc',d:'VPN nativa.',img:'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80'},{t:'3. Acción',d:'Firma PDFs.',img:'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80'}].map((s,i)=><div key={i} style={{flex:'1 1 250px'}}><div style={{borderTop:`2px solid ${C.primary}`,paddingTop:0,marginBottom:16,height:160,overflow:'hidden'}}><img src={s.img} alt={s.t} style={{width:'100%',height:'100%',objectFit:'cover'}} /></div><h4 style={{fontSize:18,fontWeight:800,marginBottom:8}}>{s.t}</h4><p style={{fontSize:14,color:C.textSub}}>{s.d}</p></div>)}
      </div></div></div>
      <div style={{background:C.bgMain,padding:'48px 24px',borderTop:`1px solid ${C.border}`}}><div style={{maxWidth:800,margin:'0 auto'}}><h2 style={{fontFamily:fT,fontSize:24,fontWeight:900,marginBottom:32,textTransform:'uppercase'}}>Hardware.</h2><div style={{borderTop:`1px solid ${C.border}`}}>
            {[{t:'Pantalla Anti-Reflectiva',c:'AMOLED 2500 nits.'},{t:'Cámara OCR',c:'Para escanear documentos.'},{t:'Puertos',c:'USB-C 4.0, DisplayPort.'}].map((s,i)=><div key={i} style={{borderBottom:`1px solid ${C.border}`}}><button onClick={()=>setAS(aS===i?null:i)} style={{width:'100%',padding:'24px 0',border:'none',background:'none',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',textAlign:'left',color:C.textDark}}><span style={{fontSize:15,fontWeight:800,textTransform:'uppercase'}}>{s.t}</span>{aS===i?<Minus size={20} color={C.primary}/>:<Plus size={20} color={C.textSub}/>}</button>{aS===i&&<div style={{paddingBottom:24,fontSize:14,color:C.textSub}}>{s.c}</div>}</div>)}
      </div></div></div>
      <div style={{background:C.bgWhite,padding:'64px 24px',borderTop:`1px solid ${C.border}`}}><div style={{maxWidth:1000,margin:'0 auto'}}><h2 style={{fontFamily:fT,fontSize:28,fontWeight:900,textAlign:'center',marginBottom:48,textTransform:'uppercase'}}>Líderes.</h2><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16}}>
            {[1,2,3,4].map(i=><div key={i} style={{height:250,border:`1px solid ${C.border}`,position:'relative',overflow:'hidden'}}><img src={['https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80','https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80','https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80','https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80'][i-1]} alt={`Caso ${i}`} style={{width:'100%',height:'100%',objectFit:'cover'}} /><div style={{position:'absolute',top:16,left:16,background:C.primary,color:'#fff',fontSize:10,fontWeight:800,padding:'4px 8px',textTransform:'uppercase'}}>Caso de Éxito</div><div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(to top,rgba(0,0,0,0.8),transparent)',padding:20}}><div style={{fontSize:16,fontWeight:800,marginBottom:4,color:'#fff'}}>Corp {i} Mhz</div><div style={{fontSize:12,color:'#ccc'}}>+40% Productividad</div></div></div>)}
      </div></div></div>
      <div style={{background:C.bgImage,padding:'64px 24px',borderTop:`1px solid ${C.border}`}}><div style={{maxWidth:1000,margin:'0 auto',display:'flex',gap:32,flexWrap:'wrap',textAlign:'center'}}>
          {[{t:'Advance Exchange',d:'Reemplazo 24h.',i:<ShieldCheck/>},{t:'Soporte IT',d:'Línea 24/7/365.',i:<User/>},{t:'3 Años Protegido',d:'100% cubierto.',i:<BatteryFull/>}].map((g,i)=><div key={i} style={{flex:'1 1 250px'}}><div style={{marginBottom:16,display:'flex',justifyContent:'center'}}>{React.cloneElement(g.i as any,{size:36,color:C.primary})}</div><h4 style={{fontSize:16,fontWeight:800,marginBottom:8,textTransform:'uppercase'}}>{g.t}</h4><p style={{fontSize:14,color:C.textSub}}>{g.d}</p></div>)}
      </div></div>
      <div style={{background:C.bgWhite,padding:'80px 24px',textAlign:'center'}}><div style={{maxWidth:800,margin:'0 auto'}}><h2 style={{fontFamily:fT,fontSize:36,fontWeight:900,marginBottom:24,textTransform:'uppercase'}}>Ingeniería <span style={{color:C.primary}}>Crítica.</span></h2><p style={{fontSize:16,color:C.textSub,lineHeight:1.8}}>Diseñamos herramientas para misiones empresariales donde parar no es opción.</p></div></div>
      <div style={{background:C.bgMain,padding:'64px 24px',borderTop:`1px solid ${C.border}`}}><div style={{maxWidth:800,margin:'0 auto'}}><h2 style={{fontFamily:fT,fontSize:28,fontWeight:900,textAlign:'center',marginBottom:48,textTransform:'uppercase'}}>FAQS.</h2><div style={{borderTop:`1px solid ${C.border}`}}>
            {[{q:'¿Compatible con MDM?',a:'Sí, 100% Intune.'},{q:'¿Descuento por volumen?',a:'A partir de 20 unidades.'},{q:'¿Cobertura global?',a:'Red en 85 países clave.'}].map((f,i)=><div key={i} style={{borderBottom:`1px solid ${C.border}`}}><button onClick={()=>setAF(aF===i?null:i)} style={{width:'100%',padding:'24px 0',border:'none',background:'none',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',textAlign:'left',color:C.textDark}}><span style={{fontSize:15,fontWeight:800}}>{f.q}</span>{aF===i?<Minus size={20} color={C.primary}/>:<Plus size={20} color={C.textSub}/>}</button>{aF===i&&<div style={{paddingBottom:24,fontSize:14,color:C.textSub}}>{f.a}</div>}</div>)}
      </div></div></div>
      <div style={{background:C.bgWhite,padding:'64px 24px',borderTop:`1px solid ${C.border}`}}><div style={{maxWidth:1000,margin:'0 auto'}}><h2 style={{fontFamily:fT,fontSize:28,fontWeight:900,marginBottom:48,textTransform:'uppercase'}}>Equipamiento Adicional:</h2><div style={{display:'flex',gap:24,flexWrap:'wrap'}}>
            {[{n:'Hub USB-C',img:'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80'},{n:'Cargador GaN',img:'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80'},{n:'Filtro Privacidad',img:'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80'}].map((v,i)=><div key={i} style={{flex:'1 1 250px',background:C.bgMain,padding:32,border:`1px solid ${C.border}`}}><div style={{height:120,borderBottom:`1px solid ${C.border}`,marginBottom:24,overflow:'hidden'}}><img src={v.img} alt={v.n} style={{width:'100%',height:'100%',objectFit:'cover'}} /></div><h4 style={{fontSize:14,fontWeight:800,marginBottom:16,textTransform:'uppercase'}}>{v.n}</h4><button style={{padding:'8px 20px',background:'transparent',color:C.primary,fontWeight:800,border:`1px solid ${C.primary}`,cursor:'pointer',textTransform:'uppercase',fontSize:12}}>Añadir</button></div>)}
      </div></div></div>
      <div style={{background:C.bgImage,padding:'80px 24px',borderTop:`1px solid ${C.border}`}}><div style={{maxWidth:1000,margin:'0 auto'}}><h2 style={{fontFamily:fT,fontSize:28,fontWeight:900,textAlign:'center',marginBottom:64,textTransform:'uppercase'}}>Retroalimentación</h2><div style={{display:'flex',gap:32,flexWrap:'wrap'}}>
            {[{t:'"La batería es excelente."',auth:'CFO'},{t:'"El modo desktop nos salvó laptops."',auth:'Manager'},{t:'"Muy premium."',auth:'Director'}].map((r,i)=><div key={i} style={{flex:'1 1 250px',background:C.bgWhite,padding:32,border:`1px solid ${C.border}`}}><div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}><div style={{width:44,height:44,background:C.bgMain,display:'flex',alignItems:'center',justifyContent:'center',border:`1px solid ${C.border}`}}><User size={20} color={C.textSub}/></div><div style={{display:'flex'}}>{[1,2,3,4,5].map(s=><Star key={s} size={14} fill={C.star} color={C.star}/>)}</div></div><p style={{fontSize:14,color:C.textSub,marginBottom:16}}>{r.t}</p><span style={{fontSize:13,fontWeight:800,textTransform:'uppercase'}}>{r.auth}</span></div>)}
      </div></div></div>
      <footer style={{background:C.bgMain,padding:`80px 24px ${s?120:40}px`,borderTop:`4px solid ${C.primary}`}}><div style={{maxWidth:1000,margin:'0 auto'}}><div style={{display:'flex',gap:48,flexWrap:'wrap',marginBottom:48}}><div style={{flex:'2 1 300px'}}><h4 style={{fontFamily:fT,fontSize:24,fontWeight:900,marginBottom:16,letterSpacing:'.1em'}}>CORP.COMMS</h4><p style={{fontSize:14,color:C.textSub,maxWidth:300}}>Estándar en comunicaciones críticas.</p></div></div><div style={{borderTop:`1px solid ${C.border}`,paddingTop:32,display:'flex',justifyContent:'space-between',fontSize:12,color:C.textSub,fontWeight:600,textTransform:'uppercase'}}><span>© 2026 CORP INC.</span></div></div></footer>
      {s && <div style={{position:'fixed',bottom:0,left:0,right:0,background:C.bgWhite,borderTop:`1px solid ${C.primary}`,padding:'16px 24px',zIndex:100}}><div style={{maxWidth:1000,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontSize:15,fontWeight:900,textTransform:'uppercase'}}>{ai?.enhancedTitle || product.title}</div><div style={{color:C.textSub,fontSize:13,fontWeight:700}}>{fmtPrice(p)}</div></div><button style={{padding:'12px 32px',background:C.primary,color:'#fff',fontSize:14,fontWeight:800,border:'none',cursor:'pointer',textTransform:'uppercase'}}>Cotizar</button></div></div>}
    </div>
  );
}
