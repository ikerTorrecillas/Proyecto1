from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],  # el port del teu client
    allow_credentials=True,
    allow_methods=["*"],      # GET, POST, PUT, DELETE…
    allow_headers=["*"],
)


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

    
@app.get("/cartas/{id}", status_code=status.HTTP_200_OK)
def obtenir_carta(id: int):
    for c in cartes:
        if c.get("id") == id:
            return c
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Carta no trobada"
    )

@app.get("/cartas", status_code=status.HTTP_200_OK)
def llistar_cartes(limit: int = 10, offset: int = 0):
    return cartes[offset:offset+limit]

class Carta(BaseModel):
    remitent: str
    destinatari: str
    contingut: str

#GET le pregunta al servidor por información, POST crea o envía nuevos datos
@app.post("/cartas", status_code=status.HTTP_201_CREATED)
def crear_carta(carta: Carta):
    nova_carta = carta.model_dump()          # converteix el model a diccionari
    nova_carta["id"] = len(cartes) + 1  # assigna un ID únic
    cartes.append(nova_carta)
    guardar_cartes(cartes)
    return nova_carta

@app.delete("/cartas/{id}", status_code=status.HTTP_200_OK)
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