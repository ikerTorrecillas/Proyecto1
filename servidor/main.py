from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
import json
import os

app = FastAPI()

DATA_FILE = "cartas.json"
def cargar_cartes():
    """Llegeix les cartes del fitxer. Si no existeix, torna una llista buida."""
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def guardar_cartes(cartes):
    """Escriu les cartes al fitxer."""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(cartes, f, indent=2, ensure_ascii=False)
    
cartes = cargar_cartes()

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
    guardar_cartes(cartes)
    return nova_carta

@app.delete("/cartas/{id}")
def eliminar_carta(id: int):
    global cartes
    for c in cartes:
        if c["id"] == id:
            cartes.remove(c)
            guardar_cartes(cartes)
            return {"missatge": "Carta eliminada"}
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Carta no trobada"
    )