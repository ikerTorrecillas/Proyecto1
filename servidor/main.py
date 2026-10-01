from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI()

#lista global
cartes = [
    {"id": 1, "remitente": "Mi amego", "contenido": "Hola, que tal"}
]


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
    return cartes[offset:offset+limit]

class Carta(BaseModel):
    remitent: str
    destinatari: str
    contingut: str
    personatge: str 

#GET le pregunta al servidor por información, POST crea o envía nuevos datos
@app.post("/cartas")
def crear_carta(carta: Carta):
    nova_carta = carta.model_dump()          # converteix el model a diccionari
    nova_carta["id"] = len(cartes) + 1  # assigna un ID únic
    cartes.append(nova_carta)
    return nova_carta