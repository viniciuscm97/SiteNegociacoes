class Bind {
    constructor(model, view, ...props) {
        let proxy = Factory.createProxy(model,
            props,
         model => view.update(model))

         view.update(model)
         
         return proxy

    }
}

