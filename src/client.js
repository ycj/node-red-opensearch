// Desc: OpenSearch Node-RED client node

const OpenSearch = require('@opensearch-project/opensearch')
const fs = require('fs')

module.exports = function(RED) {
    
    // 客户端节点
    function ClientNode(config) {
        const node = this;
        RED.nodes.createNode(this, config);
        node.server = RED.nodes.getNode(config.server);
        
        let options = {
            node: `${node.server.protocol}://${node.server.username}:${node.server.password}@${node.server.host}:${node.server.port}`,
        }
        if (config.protocol === 'https') {
            options.ssl = {
                ca: fs.readFileSync(config.ca),
            }
        }

        this.client = new OpenSearch.Client(options);

        this.on('input', async (msg)=>{
            node.send(msg);
        })
    }

    RED.nodes.registerType('client', ClientNode)
}