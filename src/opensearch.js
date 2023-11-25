// Desc: OpenSearch Node-RED nodes

const OpenSearch = require('@opensearch-project/opensearch')

module.exports = function lowerCase(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.on('input', function (msg) {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType("lower-case", LowerCaseNode);

    // 配置节点
    function ConfigNode(n) {
        RED.nodes.createNode(this, n);
        this.host = n.host;
        this.port = n.port;
        this.protocol = n.protocol;
        this.username = n.username;
        this.password = n.password;
        this.ca = n.ca;
    }

    // 客户端节点
    function ClientNode(n) {
        RED.nodes.createNode(this, n);
        this.config = RED.nodes.getNode(n.config);
        this.client = new OpenSearch.Client({
            node: this.config.protocol + '://' + this.config.host + ':' + this.config.port,
            auth: {
                username: this.config.username,
                password: this.config.password
            }
        });
    }

    // 批量操作节点
    function BulkNode(n) {
        RED.nodes.createNode(this, n);
        this.client = RED.nodes.getNode(n.client);
        var node = this;
        this.on('input', function (msg) {
            this.client.bulk(msg.payload, function (err, resp) {
                if (err) {
                    node.error(err);
                } else {
                    msg.payload = resp;
                    node.send(msg);
                }
            });
        });
    }

    RED.nodes.registerType('config', ConfigNode)
    RED.nodes.registerType('client', ClientNode)
    RED.nodes.registerType('bulk', BulkNode)
}