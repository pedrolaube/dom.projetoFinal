const pets=[
 {name:"Toby",age:"2 anos",sex:"Macho",breed:"SRD",loc:"São Paulo, SP",desc:"Brincalhão e cheio de energia, adora um passeio no parque."},
 {name:"Nina",age:"4 anos",sex:"Fêmea",breed:"Labrador",loc:"Campinas, SP",desc:"Calma e carinhosa, se dá bem com crianças e outros pets."},
 {name:"Bento",age:"1 ano",sex:"Macho",breed:"Vira-lata",loc:"Guarulhos, SP",desc:"Filhote curioso, ainda aprendendo o mundo e cheio de amor."},
 {name:"Mel",age:"6 anos",sex:"Fêmea",breed:"Poodle",loc:"São Paulo, SP",desc:"Tranquila e companheira, ideal para quem busca sossego."},
 {name:"Zeca",age:"3 anos",sex:"Macho",breed:"Beagle",loc:"Santo André, SP",desc:"Late pouco, ama comida e uma boa soneca ao sol."},
 {name:"Luna",age:"8 meses",sex:"Fêmea",breed:"SRD",loc:"Osasco, SP",desc:"Filhote esperta, já entende comandos básicos."}
];
const dogSvg=`<svg viewBox="0 0 100 90" fill="var(--green-dark)"><ellipse cx="50" cy="65" rx="34" ry="20"/><ellipse cx="38" cy="42" rx="6" ry="8" fill="var(--cream)"/><ellipse cx="62" cy="42" rx="6" ry="8" fill="var(--cream)"/><path d="M22 20c-6-9-4-19 4-19s9 10 6 18" stroke-width="7" stroke="currentColor" fill="none" stroke-linecap="round"/><path d="M78 20c6-9 4-19-4-19s-9 10-6 18" stroke-width="7" stroke="currentColor" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="55" rx="7" ry="5" fill="var(--brown)"/></svg>`;
const grid=document.getElementById('petsGrid');
pets.forEach(p=>{
  const c=document.createElement('div');c.className='pet-card';
  c.innerHTML=`<div class="pet-photo">${dogSvg}</div><div class="pet-body">
   <div class="pet-name-row"><h3>${p.name}</h3><span class="pet-age">${p.age}</span></div>
   <div class="pet-meta">${p.sex} · ${p.breed}</div>
   <div class="pet-meta">${p.loc}</div>
   <div class="pet-desc">${p.desc}</div>
   <a class="btn btn-outline">Ver detalhes</a></div>`;
  grid.appendChild(c);
});
function go(view){
  document.getElementById('view-home').classList.toggle('active',view==='home');
  document.getElementById('view-cadastro').classList.toggle('active',view==='cadastro');
  document.querySelectorAll('.nav-a').forEach(a=>a.classList.toggle('active',a.dataset.view===view));
  document.getElementById('navlinks').classList.remove('open');
  window.scrollTo(0,0);
  location.hash=view;
}
go(location.hash==='#cadastro'?'cadastro':'home');