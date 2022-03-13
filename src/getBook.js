const bookSelf = require('./arr');

let obj = (x) => {
    return {
        id: x.id,
        name: x.name,
        publisher: x.publisher
    }
};

const getAllBook = (request, h) => {
    const { name, reading, finished } = request.query;

    if(name){
        const lowerText = name.toLowerCase();
        let books = bookSelf
                    .filter(bs => {
                        let splitter = bs.name.split(" ");
                        let every = splitter.map(z => z.toLowerCase());
                        return every.includes(lowerText);
                    })
                    .map(bk=> (obj(bk)))

        const response = h.response({
            status: 'success',
            data: {
                books
            }
        });
        response.code(200);
        return response;
    }
    if(reading){
        let books = bookSelf
                    .filter(bs => Boolean(bs.reading) === Boolean(reading))
                    .map(bk=> (obj(bk)))
        const response = h.response({
            status: 'success',
            data: {
                books
            }
        });
        response.code(200);
        return response;
    }
    if(finished){
        let books = bookSelf
                    .filter(bs => bs.finished === Boolean(finished))
                    .map(bk=> (obj(bk)))
        const response = h.response({
            status: 'success',
            data: {
                books
            }
        });
        response.code(200);
        return response;
    }
    let books = bookSelf.map(bk => (obj(bk)));
    const response = h.response({
        status: 'success',
        data: {
            books
        }
    });
    response.code(200);

    return response;
    
};

const getBookById = (request, h) => {
    const { bookId } = request.params;
    const book = bookSelf.filter(bs => bs.id === bookId)[0];
    if(book !== undefined){
        const response = h.response({
            status: 'success',
            data: {
                book
            }
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
};

module.exports = {getAllBook, getBookById};