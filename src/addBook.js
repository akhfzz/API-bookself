const { nanoid } = require('nanoid');
const bookSelf = require('./arr');

const addBookSelf = (request, h) => {
    const id = nanoid(16);
    const { 
        name, year, author, 
        summary, publisher, pageCount, 
        readPage,  reading
    } = request.payload;

    const insertedAt = updatedAt = new Date().toISOString();


    let finished = '';

    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }

    if(pageCount !== readPage){
        finished= false;
    }else{
        finished = true;
    }

    const varTambah = {
        id, name, year, author, summary, publisher, 
        pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    if(name === undefined){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }

    bookSelf.push(varTambah);
    
    const checkInput = bookSelf.filter(bs => bs.id === id).length > 0;
    
    if(checkInput){
        const response = h.response({
            status: 'success',
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id
            }
        })
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan'
    })
    response.code(500);
    return response;
}

module.exports = addBookSelf;