import userEvent from '@testing-library/user-event';

test('delegació d\'events: elimina carta en clicar el botó', () => {
    document.body.innerHTML = `
        <div id="contenidorCartes">
            <div class="carta" data-id="1">
                <button class="btn-eliminar">Eliminar</button>
            </div>
        </div>
    `;

    // Simula la teva funció de delegació
    const contenidor = document.getElementById('contenidorCartes');
    contenidor.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar')) {
            const carta = e.target.closest('.carta');
            carta.remove();
        }
    });

    const btn = document.querySelector('.btn-eliminar');
    userEvent.click(btn);

    expect(document.querySelectorAll('.carta').length).toBe(0);
});
