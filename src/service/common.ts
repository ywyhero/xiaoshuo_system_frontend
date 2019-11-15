import http from '../config/http';
const Common = {
    login(data: any) {
        return http('POST', '/login', data);
    },
    logout(data: any) {
        return http('POST', '/logout', data);
    },
    upload(data: any) {
        return http('POST', '/upload', data);
    },
    books(data: any) {
        return http('POST', '/books', data);
    },
    types(data: any) {
        return http('POST', '/types', data);
    },
    bookLists(data: any) {
        return http('POST', '/booklists', data);
    },
    deleteBook(data: any) {
        return http('POST', '/deletebook', data);
    },
    addChapter(data: any) {
        return http('POST', '/addChapter', data);
    },
    getChapters(data: any) {
        return http('POST', '/getChapters', data);
    },
    getChapterDetail(data: any) {
        return http('POST', '/getChapterDetail', data);
    },
    deleteChapter(data: any) {
        return http('POST', '/deleteChapter', data);
    },
    stoyLogs(data: any) {
        return http('POST', '/storyLogs', data);
    },
    optionsLogs(data: any) {
        return http('POST', '/optionsLogs', data);
    },

};
export default Common;
