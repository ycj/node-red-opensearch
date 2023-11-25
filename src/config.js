// Desc: OpenSearch Node-RED config node

module.exports = function(RED) {

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

    RED.nodes.registerType('remote-server', ConfigNode)
}