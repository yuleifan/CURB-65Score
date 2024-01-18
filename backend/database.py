from model import Patient

#MongoDB driver
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
database = client.CurbScore

collection = database.patient


#function

#fetch all
async def fetch_all_patient():
    patients = []
    cursor = collection.find({})

    async for document in cursor:
        patients.append(Patient(**document))
    return patients

#fetch one patient
async def fetch_one_patient(id):
    document = await collection.find_one({"id":id})
    return document


#create
async def create_patient(patient):
    document = patient
    result = await collection.insert_one(document)
    return document


#remove
async def remove_patient(id):
    await collection.delete_one({"id":id})
    return True
