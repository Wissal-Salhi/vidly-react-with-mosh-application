import _ from "lodash";

export function paginate (items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1)*pageSize;
    //change the items to a lodash wraper so we can use it's methodes : slice and take
    // we add .value at the end so we can convert the lodash chain to an array at the end
    //this a paganation on the client side (fake server ) , paganation on the server is an entire other story
    return _(items).slice(startIndex).take(pageSize).value();
}