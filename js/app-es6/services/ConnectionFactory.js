var ConnectionFactory = (function () {

    const stores = ['negociacoes']
    const dbName = 'aluraframe'
    const version = 3

    var close = null
    var connection = null

    return class ConnectionFactory {

        constructor() {
            throw new Error("Não é possivel instanciar a classe ConnectionFactory")
        }

        static getConnection(){
            return new Promise((resolve,reject) =>{
                let openRequest = window.indexedDB.open(dbName, version)

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result)
                                
                }
                
                openRequest.onsuccess = e => {
                    if (!connection){
                        connection = e.target.result
                        close = connection.close.bind(connection)
                        // monkey patch
                        connection.close = function () {
                            throw new Error("Você não pode fechar a conexão pelo método close")
                        }
                    }

                    resolve(connection)
                }
                
                openRequest.onerror = e => {
                    console.log(e.target.error)
                    reject(e.target.error.name)
                }
            })
        }
        
        static _createStores(connection){
            stores.forEach(store =>{
                if(connection.ObjectStoreNames.contains(store))
                    connection.DeleteObjectStore(store)
                
                connection.createObjectStore(store,{autoIncrement: true})
            })
            
        }

        static closeConnection(){
            if(connection){
                
                close()
                connection = null
            }
        }
    }

})()