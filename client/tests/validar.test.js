import { carregarCartes } from './api.js';
import { renderitzarCartes, mostrarError } from './dom.js';
jest.mock('./dom.js');   // si són funcions separades

test('carregarCartes carrega les cartes correctament', async () => {
    const mockCartes = [{ id: 1, remitent: 'Maria', contingut: 'Hola' }];
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockCartes,
    });

    await carregarCartes();

    expect(renderitzarCartes).toHaveBeenCalledWith(mockCartes);
});

test('carregarCartes mostra error si falla', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    await carregarCartes();

    expect(mostrarError).toHaveBeenCalledWith("No s'han pogut carregar les cartes.");
});