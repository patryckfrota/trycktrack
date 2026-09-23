/**
 * Express 4 (não o 5) não encaminha rejeição de handler async pra
 * next(err) sozinho — uma exceção num `async (req,res) => {...}` sem
 * try/catch próprio vira uma promise rejeitada que ninguém trata: a
 * resposta HTTP nunca fecha (o cliente fica pendurado esperando) e o
 * erro só aparece como um "unhandled rejection" no log do processo,
 * sem chegar ao middleware de erro nenhum. Embrulha toda rota async
 * nisso pra converter essa rejeição em next(err) de verdade.
 */
export function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

// Aplica o wrap automaticamente em app.get/post/etc — assim novas
// rotas não dependem de ninguém lembrar de envolver na mão.
export function autoWrapAsyncRoutes(appOrRouter) {
    ['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
        const original = appOrRouter[method].bind(appOrRouter);
        appOrRouter[method] = (path, ...handlers) =>
            original(path, ...handlers.map(h => (typeof h === 'function' ? asyncHandler(h) : h)));
    });
    return appOrRouter;
}
