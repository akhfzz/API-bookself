const bookSelf = require('./arr')

const putBook = (request, h) => {
    const { bookId } = request.params;
    
    const { 
        name, year, author, summary,
        publisher, pageCount, readPage, reading 
    } = request.payload;
    
    const updatedAt = new Date().toISOString();

    const checkData = bookSelf.findIndex(bs => bs.id === bookId);
    
    if(name === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });

        response.code(400);

        return response;
    }

    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });

        response.code(400);

        return response;
    }

    const checkId = bookSelf.filter(bs => bs.id === bookId)[0];
    if(checkId === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        });

        response.code(404);

        return response;
    }

    if(checkData !== -1){
        bookSelf[checkData] = {
            ...bookSelf[checkData],
            name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        });

        response.code(200);

        return response;
    }

    const response = h.response({
        status: 'Error',
        message: 'Gagal memperbarui buku.'
    });

    response.code(500);

    return response;
}

module.exports = putBook;