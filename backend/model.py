from pydantic import BaseModel

class Patient(BaseModel):
    id: str
    confusion: int
    bunValue: int
    respiratoryRate: int
    systolicBP: int
    dob: str