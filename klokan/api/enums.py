from enum import IntEnum

class StateEnum(IntEnum):
    Available = 1
    Sold = 2
    Reserved = 3

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]

class TypeEnum(IntEnum):
    Apartment = 1
    House = 2
    Land = 3
    Commercial = 4
    Other = 5

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]