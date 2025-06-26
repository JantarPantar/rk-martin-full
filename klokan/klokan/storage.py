from django.core.files.storage import Storage

class KlokanStorage(Storage):
    def __init__(self):
        if not option:
            option = settings.CUSTOM_STORAGE_OPTIONS