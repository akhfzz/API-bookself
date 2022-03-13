const pathArray = [
                    require('./addBook'), require('./getBook'),
                    require('./putBook'), require('./delBook')
                ];

const [addBookSelf, {getAllBook, getBookById}, putBook, delBook]  = pathArray;

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler:  addBookSelf
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBook
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookById
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: putBook
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: delBook
    }
];

module.exports = routes;