class Book:
    def __init__(self, title, author,year,image,description):
        self.title = title
        self.author = author
        self.year = year 
        self.image = image
        self.description = description

    def to_dict(self):
        return {
            'title': self.title, 'author': self.author, 'year': self.year, 'image': self.image, 'description': self.description
        }