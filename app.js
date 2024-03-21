// console.log("Hola Poke API");
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener('DOMContentLoaded',  () => {
    const random = getRandomInt(1,151);
    fetchData(random);
});

//le pasamos un id  como parametro
const fetchData = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        //crear una  constante que se llame pokemon y que sea tipo objeto
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.species.name,
            id: data.id,
            exp: data.base_experience,
            hp: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            def: data.stats[2].base_stat,
            esp: data.stats[3].base_stat
        }

        //pintas la card con la data que traemos de la info
        pintarCard(pokemon);
    } catch (error) {
        console.log(error);
    }
}

//pintando en el template
const pintarCard = (pokemon) => {
    console.log(pokemon);
    const flex = document.querySelector('.flex');

    const template = document.querySelector('#template-card').content;

    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector('.card-body-img')
    .setAttribute('src', pokemon.img);

    clone.querySelector('.card-body-title')
    .innerHTML = ` ${pokemon.id} ${pokemon.nombre} <span>  <br><p><center> hp: ${pokemon.hp}</p> </span>`;

    clone.querySelector('.card-body-text').textContent = pokemon.exp + ' exp';

    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + 'k';
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.esp + 'k';
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.def + 'k';

    fragment.appendChild(clone);
    flex.appendChild(fragment)
}