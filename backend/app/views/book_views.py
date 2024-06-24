from flask import Blueprint, request, jsonify
from app.controllers.book_controller import add_book, get_book, search_books, delete_book

book_bp = Blueprint('book', __name__)

@book_bp.route('/books', methods=['POST'])
def create_book():
    data = request.get_json()
    book_id = add_book(data)
    return jsonify({"id": book_id}), 201

@book_bp.route('/books/<book_id>', methods=['GET'])
def retrieve_book(book_id):
    book = get_book(book_id)
    if book:
        return jsonify(book)
    else:
        return jsonify({"error": "Book not found"}), 404

@book_bp.route('/books', methods=['GET'])
def list_books():
    query = request.args.get('q', '')
    books = search_books(query)
    return jsonify(books)

@book_bp.route('/books/<book_id>', methods=['DELETE'])
def remove_book(book_id):
    success = delete_book(book_id)
    if success:
        return jsonify({"msg": "Book deleted"})
    else:
        return jsonify({"error": "Book not found"}), 404
