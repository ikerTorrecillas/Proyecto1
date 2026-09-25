from fastapi import FastAPI, HTTPException, status

app = FastAPI()

@app.get("/")
def root():
    return {"missatge": "Hola, món!"}

@app.get("/cartas/{id}")
def obtenir_carta(id: int):
    # datos simulados por ahora
    cartes = [
        {"id": 1, "remitente": "Mi amego", "contenido": "Hola, que tal"},
        {"id": 2, "remitente": "Iker", "contenido": "Te escribo del pasado"},
        {"id": 3, "remitente": "Victor", "contenido": "Distracciones"},
        {"id": 4, "remitente": "Melqui", "contenido": "Si"},
        {"id": 5, "remitente": "Eric", "contenido": "Albion online"}
    ]
    for c in cartes:
        if c["id"] == id:
            return c
            
    #  AQUÍ ESTÁ EL CAMBIO: lanzamos una excepción HTTP
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Carta no trobada"
    )

@app.get("/cartas")
def llistar_cartes(limit: int = 10, offset: int = 0):
    cartes = [
        {"id": 1, "remitente": "Mi amego", "contenido": "Hola, que tal"},
        {"id": 2, "remitente": "Iker", "contenido": "Te escribo del pasado"},
        {"id": 3, "remitente": "Victor", "contenido": "Distracciones"},
        {"id": 4, "remitente": "Melqui", "contenido": "Si"},
        {"id": 5, "remitente": "Eric", "contenido": "Albion online"}
    ]
    return cartes[offset:offset+limit]