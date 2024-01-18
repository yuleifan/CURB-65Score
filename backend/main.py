from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model import Patient

#App object
app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


from database import(
    fetch_one_patient,
    fetch_all_patient,
    create_patient,
    remove_patient,
)


#router
@app.get("/")
def read_root():
    return {"patient curb-65 score":""}

#get all
@app.get("/patient")
async def get_patient():
    response = await fetch_all_patient()
    return response

#get one
@app.get("/patient/{id}", response_model=Patient)
async def get_patient_by_id(id):
    response = await fetch_one_patient(id)
    if response:
        return response
    raise HTTPException(404,f"there is no such patient: {id}")

#create one
@app.post("/patient/", response_model=Patient)
async def post_patient(todo:Patient):
    response = await create_patient(todo.dict())
    if response:
        return response
    raise HTTPException(400,"something went wrong")

#delete one by id
@app.delete("/patient/{id}")
async def delete_patient(id):
    response = await remove_patient(id)
    if response:
        return f"succesfully deleted {id}"
    raise HTTPException(404,f"there is no patient with this id: {id}")
