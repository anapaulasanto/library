from app import mongo
from app.models.book_models import Book
from bson.objectid import ObjectId

def add_book(data):
    book = Book(**data)
    result = mongo.db.books.insert_one(book.to_dict())
    return str(result.inserted_id)

def get_book(book_id):
    book = mongo.db.books.find_one({"_id": ObjectId(book_id)})
    if book:
        book['_id'] = str(book['_id'])
    return book

def search_books(query):
    books = mongo.db.books.find({"title": {"$regex": query, "$options": "i"}})
    result = []
    for book in books:
        book['_id'] = str(book['_id'])
        result.append(book)
    return result

def delete_book(book_id):
    result = mongo.db.books.delete_one({"_id": ObjectId(book_id)})
    return result.deleted_count == 1
