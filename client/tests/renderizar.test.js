import '@testing-library/jest-dom';
import { renderitzarCartes } from '../js/scripts.js';

test('renderitza les cartes correctament amb destinatari', () => {
    const cartes = [
        { id: 1, remitent: 'Maria', destinatari: 'Joan', contingut: 'Hola!' },
        { id: 2, remitent: 'Joan', destinatari: 'Maria', contingut: 'Com estàs?' }
    ];
    document.body.innerHTML = `<div id="contenidorCartes"></div>`;

    renderitzarCartes(cartes);

    const cartesElements = document.querySelectorAll('.carta');
    expect(cartesElements.length).toBe(2);

    // Comprovem la primera carta
    expect(cartesElements[0].querySelector('h3').textContent).toBe('De: Maria');
    
    // Obtenim tots els paràgrafs <p> de la primera carta
    const paragrafs = cartesElements[0].querySelectorAll('p');
    expect(paragrafs[0].textContent).toBe('Per a: Joan');
    expect(paragrafs[1].textContent).toBe('Hola!');
});