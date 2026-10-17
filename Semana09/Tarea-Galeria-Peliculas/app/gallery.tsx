'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,Search,Film,Clapperboard,Star,X,ArrowRight,Shuffle,Pause,Play,ChevronLeft,ChevronRight} from 'lucide-react';
import type {Movie} from '../lib/omdb';

function Poster({movie,...props}:{movie:Movie;[key:string]:any}) {
 const [failed,setFailed]=useState(false);
 return movie.Poster && movie.Poster!=='N/A' && !failed ? <img src={movie.Poster} alt={movie.Title} onError={()=>setFailed(true)} {...props}/> : <div className="poster-fallback" role="img" aria-label={movie.Title}><Film size={34}/><span>{movie.Title}</span></div>;
}
async function query(params:Record<string,string>,signal?:AbortSignal) {
 const r=await fetch('/api/movies?'+new URLSearchParams(params),{signal});
 const data:any=await r.json();if(!r.ok) throw new Error(data.error || 'No se pudo completar la consulta.');return data;
}
export default function Gallery({initialMovies,initialError}:{initialMovies:Movie[];initialError:string}) {
 const [search,setSearch]=useState(''),[type,setType]=useState(''),[year,setYear]=useState(''),[page,setPage]=useState(1);
 const [movies,setMovies]=useState<Movie[]>(initialMovies),[total,setTotal]=useState(initialMovies.length),[loading,setLoading]=useState(false),[error,setError]=useState(initialError);
 const [selected,setSelected]=useState<Movie|null>(null),[detailLoading,setDetailLoading]=useState(false),[detailError,setDetailError]=useState(''),[paused,setPaused]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null),detailAbort=useRef<AbortController|null>(null),lastFocus=useRef<HTMLElement|null>(null);
 const searching=search.trim().length>=3;
 // CSR: debounce, cancelación y estado local permiten buscar sin recargar.
 useEffect(()=>{
  const controller=new AbortController();
  if(!searching){setMovies(initialMovies.filter(m=>!type || m.Type===type).filter(m=>!year || m.Year.startsWith(year)));setTotal(0);setLoading(false);setError(search.trim() ? 'Escribe al menos 3 caracteres para buscar.' : initialError);return;}
  setLoading(true);setError('');
  const timer=setTimeout(async()=>{
   try {const data=await query({s:search.trim(),type,y:year,page:String(page)},controller.signal);if(!controller.signal.aborted){setMovies(data.Search);setTotal(Number(data.totalResults));}}
   catch(e){if(!controller.signal.aborted){setMovies([]);setTotal(0);setError(e instanceof Error?e.message:'Error de conexión.');}}
   finally{if(!controller.signal.aborted)setLoading(false);}
  },450);
  return ()=>{clearTimeout(timer);controller.abort()};
 },[search,type,year,page,initialMovies,initialError,searching]);
 useEffect(()=>()=>detailAbort.current?.abort(),[]);
 function close(){detailAbort.current?.abort();dialog.current?.close();setSelected(null);document.body.style.overflow='';lastFocus.current?.focus();}
 async function open(movie:Movie){
  detailAbort.current?.abort();const controller=new AbortController();detailAbort.current=controller;
  lastFocus.current=document.activeElement as HTMLElement;setSelected(movie);setDetailError('');setDetailLoading(true);dialog.current?.showModal();document.body.style.overflow='hidden';
  try{const data=await query({i:movie.imdbID},controller.signal);if(!controller.signal.aborted)setSelected(data)}
  catch(e){if(!controller.signal.aborted)setDetailError(e instanceof Error?e.message:'Error al cargar los detalles.')}
  finally{if(!controller.signal.aborted)setDetailLoading(false)}
 }
 function updateType(value:string){setType(value);setPage(1)}
 return <div className={paused?'app motion-paused':'app'}>
  <header className="nav mx-auto flex items-center justify-between">
   <a className="logo" href="/" aria-label="Cineclub, inicio"><span className="logo-icon"><Clapperboard size={23}/></span>cineclub<span className="brand-dot">.</span></a>
   <nav className="flex items-center gap-7" aria-label="Navegación principal"><a className="nav-active" href="#explorar">Explorar</a><a className="hidden sm:block" href="#proyecto">El proyecto <ArrowUpRight size={13}/></a></nav>
   <span className="nav-note hidden md:flex"><span/> HECHO PARA CINÉFILOS</span>
  </header>
  <main>
   <section className="hero">
    <div className="hero-glow"/>
    <div className="poster-wall" aria-hidden="true"><div className="poster-stream">{[...initialMovies,...initialMovies].map((m,i)=><div className="floating-poster" key={i}><Poster movie={m} alt="" loading="lazy"/></div>)}</div></div>
    <div className="hero-content">
     <div className="eyebrow"><span/> UN UNIVERSO DE HISTORIAS</div>
     <h1>Tu próxima<br/>gran <span className="serif">obsesión.</span><span className="spark">✳</span></h1>
     <p>Una película que te cambie el día. Una serie que no puedas soltar.<br className="hidden sm:block"/> Encuentra esa historia que está hecha para ti.</p>
     <div className="hero-actions"><a className="primary" href="#explorar">Encuentra tu historia <ArrowRight size={18}/></a><button className="secondary" disabled={!initialMovies.length} onClick={()=>open(initialMovies[Math.floor(Math.random()*initialMovies.length)])}><Shuffle size={17}/> Sorpréndeme</button></div>
     <div className="hero-caption"><span className="mini-stars">✦ ✦ ✦</span> MENOS SCROLL. MÁS BUEN CINE.</div>
    </div>
    <div className="hero-bottom"><span>01 — TU BUTACA TE ESPERA</span><button onClick={()=>setPaused(!paused)} aria-label={paused?'Activar animaciones':'Pausar animaciones'}>{paused?<Play size={13}/>:<Pause size={13}/>} {paused?'Reanudar fondo':'Pausar fondo'}</button></div>
   </section>
   <div className="ticker" aria-hidden="true"><div>PELÍCULAS QUE SE QUEDAN CONTIGO <span>✳</span> SERIES PARA UN CAPÍTULO MÁS <span>✳</span> HISTORIAS SIN FIN <span>✳</span> PELÍCULAS QUE SE QUEDAN CONTIGO <span>✳</span> SERIES PARA UN CAPÍTULO MÁS <span>✳</span></div></div>
   <section id="explorar" className="explore mx-auto">
    <div className="section-top"><div><div className="eyebrow muted">ELIGE TU PRÓXIMO PLAN</div><h2>Buenas historias.<br className="sm:hidden"/> <span className="serif">Cero spoilers.</span></h2></div><span className="collection-note hidden md:block">TÚ PONES LAS PALOMITAS.<br/>NOSOTROS, LAS IDEAS.</span></div>
    <div className="search-panel"><div className="search-input"><Search size={21}/><label className="sr-only" htmlFor="search">Buscar películas o series</label><input id="search" placeholder="¿Qué historia estás buscando?" value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}}/>{search&&<button onClick={()=>{setSearch('');setPage(1)}} aria-label="Borrar búsqueda"><X size={17}/></button>}<span className="search-hint hidden sm:block">TÍTULO</span></div><label className="year-label"><span>Año</span><input aria-label="Filtrar por año" type="number" min="1888" max={new Date().getFullYear()+2} placeholder="Todos" value={year} onChange={e=>{setYear(e.target.value);setPage(1)}}/></label></div>
    <div className="filters"><div className="tabs">{[['','Todo el universo'],['movie','Películas'],['series','Series']].map(([v,label])=><button key={v} onClick={()=>updateType(v)} aria-pressed={type===v} className={type===v?'active':''}>{v==='movie'?<Film size={15}/>:v==='series'?<Clapperboard size={15}/>:<span>✳</span>}{label}</button>)}</div><span className="result-count" aria-live="polite">{loading?'Buscando…':searching?total+' resultados':'SELECCIÓN CINECLUB'}</span></div>
    <div className="collection-heading"><h3>{searching?'Resultados para “'+search+'”':'En el radar'} <span>↗</span></h3><span>{searching?'Tu próxima historia está aquí':'Grandes títulos para empezar'}</span></div>
    {error&&<div className="notice" role="status">{error}{initialError&&!search&&<p>Puedes probar la búsqueda o configurar tu propia API key siguiendo el README.</p>}</div>}
    <div className="movie-grid" aria-busy={loading}>
     {loading?Array.from({length:8},(_,i)=><div className="skeleton" key={i}><div/><span/><span/></div>):movies.map((movie,i)=><button className="movie-card" key={movie.imdbID} onClick={()=>open(movie)} style={{animationDelay:(i*45)+'ms'}}><div className="poster"><Poster movie={movie} loading="lazy"/><span className="type-badge">{movie.Type==='series'?'SERIE':'PELÍCULA'}</span>{movie.imdbRating&&movie.imdbRating!=='N/A'&&<span className="rating"><Star size={12} fill="currentColor"/> {movie.imdbRating}</span>}<div className="poster-overlay"><span>Descubrir historia <ArrowUpRight size={20}/></span></div><span className="card-number">{String(i+1+(page-1)*10).padStart(2,'0')}</span></div><div className="card-info"><h4>{movie.Title}</h4><ArrowUpRight size={16}/></div><p>{movie.Year} <span>•</span> {movie.Type==='series'?'Serie':'Película'}</p></button>)}
    </div>
    {!loading&&!error&&!movies.length&&<div className="empty"><Film size={32}/><h3>No hay títulos con esos filtros.</h3><button className="secondary" onClick={()=>{setType('');setYear('');setSearch('');setPage(1)}}>Limpiar filtros</button></div>}
    {searching&&total>10&&<div className="pagination"><button disabled={page===1||loading} onClick={()=>setPage(p=>p-1)} aria-label="Página anterior"><ChevronLeft size={18}/></button><span>Página {page} de {Math.min(100,Math.ceil(total/10))}</span><button disabled={page>=Math.min(100,Math.ceil(total/10))||loading} onClick={()=>setPage(p=>p+1)} aria-label="Página siguiente"><ChevronRight size={18}/></button></div>}
    <div className="bottom-callout"><span>✳</span><p>Las mejores historias empiezan con un <em>“a ver qué tal”.</em></p><a href="#search" aria-label="Volver a la búsqueda"><ArrowUpRight size={25}/></a></div>
   </section>
  </main>
  <footer id="proyecto" className="mx-auto"><div className="footer-row"><a className="logo" href="/">cineclub<span className="brand-dot">.</span></a><span>UN PEQUEÑO HOMENAJE A LAS GRANDES HISTORIAS.</span><a href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">Datos de OMDb <ArrowUpRight size={13}/></a></div><details><summary>Detrás de la pantalla · SSR + CSR</summary><p>La portada usa un componente de servidor asíncrono: consulta OMDb con async/await y envía los títulos en el HTML inicial. Así el contenido se puede leer antes de que se active JavaScript. La lista es una selección editorial, no un ranking en tiempo real.</p><p>La búsqueda y el modal usan CSR con la directiva 'use client', useState y useEffect. Los resultados cambian sin recargar, con una espera de 450 ms y cancelación de consultas anteriores. Los detalles se consultan por IMDb ID con plot=full. Una ruta del servidor guarda la clave fuera del navegador.</p></details><div className="footer-bottom"><span>ACTIVIDAD INTEGRADORA · GALERÍA DE PELÍCULAS Y SERIES</span><span>Diseñado para disfrutar el descubrimiento ✦</span></div></footer>
  <dialog ref={dialog} className="detail-modal" aria-labelledby="detail-title" onCancel={e=>{e.preventDefault();close()}} onClick={e=>{if(e.target===dialog.current)close()}}>
   <button className="modal-close" autoFocus onClick={close} aria-label="Cerrar detalles"><X size={21}/></button>
   {selected&&<div className="modal-layout"><div className="modal-poster"><Poster movie={selected}/></div><div className="modal-content"><div className="eyebrow">{selected.Type==='series'?'UNA SERIE PARA QUEDARTE':'DALE PLAY A TU CURIOSIDAD'}</div><h2 id="detail-title">{selected.Title}</h2><div className="detail-meta">{selected.Year} · {selected.Rated&&selected.Rated!=='N/A'?selected.Rated+' · ':''}{selected.Runtime&&selected.Runtime!=='N/A'?selected.Runtime:''}</div>{detailLoading?<p className="detail-loading" role="status">Preparando la función…</p>:detailError?<div role="alert" className="notice">{detailError}<button className="secondary" onClick={()=>open(selected)}>Reintentar</button></div>:<><div className="genre-tags">{selected.Genre?.split(', ').map((g:string)=><span key={g}>{g}</span>)}</div><p className="plot">{selected.Plot==='N/A'?'Sin sinopsis disponible.':selected.Plot}</p><dl>{[['Director','Director'],['Guion','Writer'],['Reparto','Actors'],['Estreno','Released'],['País','Country'],['Idioma','Language'],['Premios','Awards'],['Temporadas','totalSeasons'],['Recaudación','BoxOffice'],['Producción','Production'],['DVD','DVD'],['Metascore','Metascore'],['Votos IMDb','imdbVotes']].map(([label,key])=>selected[key]&&selected[key]!=='N/A'?<div key={key}><dt>{label}</dt><dd>{selected[key]}</dd></div>:null)}</dl><div className="ratings">{selected.Ratings?.map((r:any)=><div key={r.Source}><Star size={15}/><strong>{r.Value}</strong><span>{r.Source}</span></div>)}</div><a className="imdb-link" href={'https://www.imdb.com/title/'+selected.imdbID+'/'} target="_blank" rel="noreferrer">Ver en IMDb <ArrowUpRight size={16}/></a><p className="language-note">La sinopsis y la ficha se muestran en el idioma original que entrega OMDb.</p></>}</div></div>}
  </dialog>
 </div>
}
