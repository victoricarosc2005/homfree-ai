const $=id=>document.getElementById(id);
const file=$('file'), preview=$('preview'), uploadContent=$('uploadContent'), dropbox=$('dropbox');
$('choose').onclick=()=>file.click();
file.onchange=()=>showFile(file.files[0]);
function showFile(f){if(!f)return;if(!f.type.startsWith('image/'))return;preview.src=URL.createObjectURL(f);preview.hidden=false;uploadContent.hidden=true}
dropbox.ondragover=e=>{e.preventDefault();dropbox.style.borderColor='#a855f7'};
dropbox.ondragleave=()=>dropbox.style.borderColor='#383840';
dropbox.ondrop=e=>{e.preventDefault();dropbox.style.borderColor='#383840';showFile(e.dataTransfer.files[0])};
$('clear').onclick=()=>{$('prompt').value=''};
$('prompt').onkeydown=e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();generate()}};
$('generate').onclick=generate;
$('again').onclick=generate;
async function generate(){
  const p=$('prompt').value.trim();
  if(!p){$('prompt').focus();$('prompt').placeholder='Escreva primeiro o que você quer criar...';return}
  $('modal').hidden=false;$('bar').style.width='0%';$('progress').textContent='Preparando sua cena...';
  const steps=['Analisando o prompt...','Construindo a cena...','Animando elementos...','Renderizando vídeo...','Finalizando...'];
  for(let i=0;i<steps.length;i++){await new Promise(r=>setTimeout(r,650));$('progress').textContent=steps[i];$('bar').style.width=((i+1)*20)+'%'}
  $('modal').hidden=true;$('result').hidden=false;$('result').scrollIntoView({behavior:'smooth'});
}
$('download').onclick=()=>alert('Quando uma API de vídeo estiver conectada, este botão baixará o arquivo MP4 gerado.');
