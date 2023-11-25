// Desc: OpenSearch Node-RED config node

module.exports = function(RED) {

    // 配置节点
    function ConfigNode(config) {
        RED.nodes.createNode(this, config);
        this.protocol = config.protocol;
        this.host = config.host;
        this.port = config.port;
        this.username = config.username;
        this.password = config.password;
        this.ca = config.ca;
    }

    RED.nodes.registerType('remote-server', ConfigNode)
}