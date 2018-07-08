function doSomething(event){
    console.log(event.target);
}
addEventListener('click', doSomething);

const dblclickParagraph = document.getElementById('dblclick');
dblclickParagraph.addEventListener('dblclick', highlight);
function highlight(event){
event.target.classList.toggle('highlight');
}
const mouseParagraph = document.getElementById('mouse');
mouseParagraph.addEventListener('mouseover', highlight);
mouseParagraph.addEventListener('mouseout', highlight);
mouseParagraph.addEventListener('mousemove', () => console.log('You Moved!') );