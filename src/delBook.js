const bookSelf = require('./arr');

const deleteBook = (request, h) => {
    const { bookId } = request.params;
    const checkId = bookSelf.findIndex(bs => bs.id === bookId);
    if(checkId !== -1){
        bookSelf.splice(checkId, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;
}

module.exports = deleteBook;