// Desc: OpenSearch Node-RED bulk node

const OpenSearch = require('@opensearch-project/opensearch')
const fs = require('fs')

module.exports = function(RED) {
    
    // 客户端节点
    function BulkNode(config) {
        const node = this;
        RED.nodes.createNode(this, config);
        this.server = RED.nodes.getNode(config.server);
        
        let options = {
            node: `${this.server.protocol}://${this.server.username}:${this.server.password}@${this.server.host}:${this.server.port}`,
        }
        if (this.server.protocol === 'https') {
            options.ssl = {
                ca: fs.readFileSync(this.server.ca),
            }
        }

        this.client = new OpenSearch.Client(options);

        this.on('input', async (msg, send)=>{
            send(msg);
        })
    }

    RED.nodes.registerType('bulk', BulkNode)
}