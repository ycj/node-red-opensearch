// Desc: OpenSearch Node-RED client node

const OpenSearch = require('@opensearch-project/opensearch')
const fs = require('fs')

module.exports = function(RED) {
    
    // 客户端节点
    function ClientNode(config) {
        RED.nodes.createNode(this, config);
        this.server = RED.nodes.getNode(config.server);
        
        let options = {
            node: `${this.server.protocol}://${this.server.username}:${this.server.password}@${this.server.host}:${this.server.port}`,
        }
        if (config.protocol === 'https') {
            options.ssl = {
                ca: fs.readFileSync(config.server.ca),
            }
        }

        this.client = new OpenSearch.Client(options);

        this.on('input', async (msg, send)=>{
            send(msg);
        })
    }

    RED.nodes.registerType('client', ClientNode)
}