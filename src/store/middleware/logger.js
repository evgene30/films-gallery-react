function logger (store) { // приходит наш стор
    return function (next) {
        return function (action) { // приходит текущий экшен
            return next (action); // функция которая передает управление либо следующему мидлвару, либо дальнейшее выполнение (в диспатч)
        }
    }

}
export default logger;
