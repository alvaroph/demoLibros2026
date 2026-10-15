//COMMUNICATION MANAGER
//GESTIONA LES CRIDES
const URL=`http://aperezh.daw.inspedralbes.cat/libros.php`

export async function getLlibres() {
    const url = `${URL}`
    const resposta = await fetch(url)
    const dades = await resposta.json()
    console.log(dades)
    return dades.libros
}
